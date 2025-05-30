import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CourtType, ElementType, CourtOverlays } from "../types/court";
import { useCourtDesign } from "../hooks/useCourtDesign";
import { useMobileDetection } from "../hooks/useMobileDetection";
import CourtSVG from "./CourtSVG";
import ColorPicker from "./ColorPicker";
import { QuoteDesignDialog } from "./QuoteDesignDialog";
import { Mail, ChevronDown, X } from "lucide-react";

interface CourtDesignerProps {
  selectedCourt: CourtType;
}

const CourtDesigner = ({ selectedCourt }: CourtDesignerProps) => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const isMobile = useMobileDetection();
  const courtDesign = useCourtDesign();
    const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile);
  const [isQuoteDialogOpen, setIsQuoteDialogOpen] = useState(false);
  const [isCourtDropdownOpen, setIsCourtDropdownOpen] = useState(false);// Initialize state from URL params or load from state store
  useEffect(() => {
    const designParam = searchParams.get('design');
    
    if (designParam) {
      try {
        const decodedDesign = JSON.parse(atob(designParam));
        // Load the design from URL
        Object.entries(decodedDesign).forEach(([courtType, courtData]: [string, any]) => {
          if (courtType === 'overlays') {
            courtDesign.updateOverlays(courtData);
          } else if (['basketball', 'tennis', 'pickleball'].includes(courtType)) {
            const court = courtType as CourtType;
            // Apply colors for this court
            Object.entries(courtData.colors).forEach(([element, color]: [string, any]) => {
              courtDesign.updateCourtColor(court, element as ElementType, color);
            });
            // Apply accessories setting
            courtDesign.updateCourtAccessories(court, courtData.showAccessories);
          }
        });
      } catch (e) {
        console.warn('Failed to parse design from URL:', e);
      }
    } else {
      // If no design param, reset to defaults to ensure clean state
      courtDesign.resetState();
    }
    
    courtDesign.updateState({ selectedCourt });
  }, [selectedCourt, searchParams]);
  // Update URL when significant state changes occur (for sharing)
  useEffect(() => {
    // Only update URL if there's actual design data beyond defaults
    const designSummary = courtDesign.getDesignSummary();
    const hasCustomizations = Object.entries(designSummary).some(([courtType, courtData]) => {
      if (courtType === 'overlays') {
        return Object.values(courtData as CourtOverlays).some(Boolean);
      }
      if (typeof courtData === 'object' && courtData.colors) {
        return Object.keys(courtData.colors).length > 1 || // More than just background
               !courtData.showAccessories; // Accessories turned off
      }
      return false;
    });

    if (hasCustomizations) {
      const encodedState = btoa(JSON.stringify(designSummary));
      setSearchParams({ design: encodedState }, { replace: true });
    } else {
      // Clear URL params if back to defaults
      setSearchParams({}, { replace: true });
    }
  }, [
    courtDesign.colors,
    courtDesign.showAccessories,
    courtDesign.overlays,
    setSearchParams
  ]);

  const handleCourtChange = (newCourt: CourtType) => {
    navigate(`/${newCourt}`);
    setIsCourtDropdownOpen(false);
  };  const handleElementSelect = (element: ElementType) => {
    const currentColor = courtDesign.getCourtColor(selectedCourt, element);
    courtDesign.updateState({ 
      selectedElement: element,
      selectedColor: currentColor
    });
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };

  const handleColorSelect = (color: string) => {
    courtDesign.updateState({ selectedColor: color });
    
    // Auto-apply color to selected element for current court
    courtDesign.updateCourtColor(selectedCourt, courtDesign.selectedElement, color);
    
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };

  const handleAccessoryToggle = () => {
    courtDesign.updateCourtAccessories(selectedCourt, !courtDesign.showAccessories);
  };
  const handleOverlayToggle = (courtType: CourtType) => {
    courtDesign.updateOverlays({
      [courtType]: !courtDesign.overlays[courtType]
    });
  };  // Convert new color structure to legacy format for CourtSVG
  const getLegacyAppliedColors = (): Record<string, string> => {
    const legacyColors: Record<string, string> = {};
    const fullState = courtDesign.getDesignSummary();
    
    (['basketball', 'tennis', 'pickleball'] as CourtType[]).forEach(court => {
      const courtColors = fullState[court]?.colors || {};
      Object.entries(courtColors).forEach(([element, color]) => {
        if (color && typeof color === 'string') {
          legacyColors[`${court}-${element}`] = color;
        }
      });
    });
    
    return legacyColors;
  };

  const getElementsForCourt = (): ElementType[] => {
    switch (selectedCourt) {
      case 'basketball':
        return ['base-background', 'playing-area', 'lines', 'three-point', 'center-circle', 'three-second-area'];
      case 'tennis':
        return ['base-background', 'tennis-playing-area', 'tennis-lines'];
      case 'pickleball':
        return ['base-background', 'pickleball-kitchen', 'pickleball-service-area', 'pickleball-lines'];
      default:
        return ['base-background'];
    }
  };

  const getElementLabel = (element: ElementType): string => {
    const labels: Record<ElementType, string> = {
      'base-background': 'Background',
      'playing-area': 'Playing Area',
      'lines': 'Court Lines',
      'three-point': 'Three Point Area',
      'center-circle': 'Center Circle',
      'three-second-area': 'Three Second Area',
      'tennis-playing-area': 'Playing Area',
      'tennis-lines': 'Court Lines',
      'pickleball-kitchen': 'Kitchen',
      'pickleball-service-area': 'Service Area',
      'pickleball-lines': 'Court Lines'
    };
    return labels[element] || element;
  };
  const courtOptions = [
    { value: 'basketball', label: 'Basketball', icon: '🏀' },
    { value: 'tennis', label: 'Tennis', icon: '🎾' },
    { value: 'pickleball', label: 'Pickleball', icon: '🏓' }
  ];
  
  return (
    <div className="h-screen flex">
      {/* Mobile Backdrop */}
      {isMobile && isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40" 
          onClick={() => setIsSidebarOpen(false)} 
        />
      )}
      
      {/* Left Sidebar */}
      <div className={`${
        isMobile 
          ? `fixed top-0 left-0 h-full w-80 transform transition-transform duration-300 ease-in-out z-50 ${
              isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
            }`
          : 'w-80 relative'
      } bg-white border-r border-gray-200 flex flex-col shadow-lg`}>          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            {/* Mobile close button */}
            {isMobile && (
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Customize Your Court</h2>
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            )}
            
            {!isMobile && (
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Customize Your Court</h2>
            )}
            
            {/* Court Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsCourtDropdownOpen(!isCourtDropdownOpen)}
                className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center">
                  <span className="mr-2">
                    {courtOptions.find(opt => opt.value === selectedCourt)?.icon}
                  </span>
                  <span className="font-medium">
                    {courtOptions.find(opt => opt.value === selectedCourt)?.label}
                  </span>
                </div>
                <ChevronDown className={`w-4 h-4 transition-transform ${isCourtDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isCourtDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
                  {courtOptions.map(option => (
                    <button
                      key={option.value}
                      onClick={() => handleCourtChange(option.value as CourtType)}
                      className={`w-full flex items-center p-3 hover:bg-gray-50 transition-colors first:rounded-t-lg last:rounded-b-lg ${
                        option.value === selectedCourt ? 'bg-blue-50 text-blue-700' : ''
                      }`}
                    >
                      <span className="mr-2">{option.icon}</span>
                      <span>{option.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Element Selection */}
            <div>
              <h3 className="font-medium text-gray-800 mb-4">Apply Color To</h3>
              <div className="space-y-2">
                {getElementsForCourt().map(element => (
                  <button
                    key={element}
                    onClick={() => handleElementSelect(element)}
                    className={`w-full text-left p-3 rounded-lg border transition-colors ${
                      courtDesign.selectedElement === element
                        ? 'bg-primary border-primary text-white'
                        : 'bg-gray-50 hover:bg-gray-100 border-gray-200 text-gray-700'
                    }`}
                  >
                    {getElementLabel(element)}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Picker */}
            <div>
              <h3 className="font-medium text-gray-800 mb-4">Select Color</h3>
              <ColorPicker
                selectedColor={courtDesign.selectedColor}
                onColorSelect={handleColorSelect}
              />
            </div>

            {/* Accessories */}
            <div>
              <h3 className="font-medium text-gray-800 mb-4">Accessories</h3>
              <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">                <span className="text-sm text-gray-600">
                  Show {selectedCourt === 'basketball' ? 'Hoops' : selectedCourt === 'tennis' ? 'Net' : 'Net'}
                </span>
                <input
                  type="checkbox"
                  checked={courtDesign.showAccessories}
                  onChange={handleAccessoryToggle}
                  className="w-4 h-4 text-primary rounded focus:ring-primary"
                />
              </label>
            </div>

            {/* Overlays */}
            <div>
              <h3 className="font-medium text-gray-800 mb-4">Court Overlays</h3>
              <div className="space-y-2">
                {(['basketball', 'tennis', 'pickleball'] as CourtType[])
                  .filter(court => court !== selectedCourt)
                  .map(courtType => (
                    <label key={courtType} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">                      <span className="text-sm text-gray-600">
                        Show {courtType.charAt(0).toUpperCase() + courtType.slice(1)} Lines
                      </span>
                      <input
                        type="checkbox"
                        checked={courtDesign.overlays[courtType]}
                        onChange={() => handleOverlayToggle(courtType)}
                        className="w-4 h-4 text-primary rounded focus:ring-primary"
                      />
                    </label>
                  ))}
              </div>
            </div>
          </div>

          {/* Email Button at Bottom */}
          <div className="p-6 border-t border-gray-200">            <button
              onClick={() => setIsQuoteDialogOpen(true)}
              className="w-full flex items-center justify-center px-4 py-3 bg-primary text-white rounded-lg hover:bg-opacity-90 transition-colors"
            >
              <Mail className="w-4 h-4 mr-2" />
              Request Quote
            </button>
          </div>
        </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">        {/* Mobile Header */}
        {isMobile && (
          <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
            <div>
              <h1 className="text-lg font-semibold">
                {selectedCourt.charAt(0).toUpperCase() + selectedCourt.slice(1)} Court
              </h1>
              <p className="text-sm text-gray-500">
                {selectedCourt === 'basketball' && "94' x 50' regulation size"}
                {selectedCourt === 'tennis' && "78' x 36' regulation size"}
                {selectedCourt === 'pickleball' && "44' x 20' regulation size"}
              </p>
            </div>
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium"
            >
              Customize
            </button>
          </div>
        )}{/* Court Display */}
        <div className="flex-1 p-4 bg-gray-50">
          <div className="h-full bg-white rounded-lg shadow-sm p-4 flex flex-col">
            {/* Court Header - Top */}
            {!isMobile && (
              <div className="text-center mb-4">
                <h1 className="text-2xl font-bold text-gray-800 mb-2">
                  {selectedCourt.charAt(0).toUpperCase() + selectedCourt.slice(1)} Court
                </h1>
                <p className="text-gray-600">
                  Select colors from the sidebar to customize your court design
                </p>
              </div>
            )}            {/* Mobile Instructions */}
            {isMobile && (
              <div className="text-center mb-4">
                <p className="text-gray-600">
                  Tap "Customize" to select colors and customize your court design
                </p>
              </div>
            )}

            {/* Court SVG - Center */}
            <div className="flex-1 flex items-center justify-center">
              <div className="w-full max-w-4xl">
                <CourtSVG
                  selectedCourt={selectedCourt}
                  appliedColors={getLegacyAppliedColors()}
                  showAccessories={courtDesign.showAccessories}
                  overlays={courtDesign.overlays}
                />
              </div>
            </div>

            {/* Mobile Selected Element - Bottom of court container */}
            {isMobile && courtDesign.selectedElement && (
              <div className="text-center p-3 bg-white border-t border-gray-200">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                  Selected Element
                </p>
                <p className="text-sm font-medium text-gray-800">
                  {getElementLabel(courtDesign.selectedElement)}
                </p>
              </div>
            )}
              
            {/* Court Info - Bottom (Desktop only) */}
            {!isMobile && (
              <div className="p-4 bg-gray-50 rounded-lg mt-4 flex justify-between items-end">
                {/* Court Specs */}
                <div>
                  <h3 className="font-semibold text-gray-800">
                    {selectedCourt.charAt(0).toUpperCase() + selectedCourt.slice(1)} Court
                  </h3>
                  <p className="text-sm text-gray-600">
                    {selectedCourt === 'basketball' && "94' x 50' regulation size"}
                    {selectedCourt === 'tennis' && "78' x 36' regulation size"}
                    {selectedCourt === 'pickleball' && "44' x 20' regulation size"}
                  </p>
                </div>
                
                {/* Selected Element */}
                {courtDesign.selectedElement && (
                  <div className="text-right">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                      Selected Element
                    </p>
                    <p className="text-sm font-medium text-gray-800">
                      {getElementLabel(courtDesign.selectedElement)}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>      {/* Quote Dialog */}
      <QuoteDesignDialog
        isOpen={isQuoteDialogOpen}
        onClose={() => setIsQuoteDialogOpen(false)}
        courtType={selectedCourt}
        appliedColors={getLegacyAppliedColors()}
        selectedColor={courtDesign.selectedColor}
        showAccessories={courtDesign.showAccessories}
        overlays={courtDesign.overlays}
        designSummary={courtDesign.getDesignSummary()}
      />
    </div>
  );
};

export default CourtDesigner;
