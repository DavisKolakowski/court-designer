import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CourtType, ElementType } from "../types/court";
import { useCourtDesign } from "../hooks/useCourtDesign";
import { useMobileDetection } from "../hooks/useMobileDetection";
import CourtSVG from "./CourtSVG";
import ColorPicker from "./ColorPicker";
import { EmailDesignDialog } from "./EmailDesignDialog";
import { Mail, ChevronDown } from "lucide-react";

interface CourtDesignerProps {
  selectedCourt: CourtType;
}

const CourtDesigner = ({ selectedCourt }: CourtDesignerProps) => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const isMobile = useMobileDetection();
  const courtDesign = useCourtDesign();
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile);
  const [isEmailDialogOpen, setIsEmailDialogOpen] = useState(false);
  const [isCourtDropdownOpen, setIsCourtDropdownOpen] = useState(false);

  // Initialize state from URL params
  useEffect(() => {
    const element = searchParams.get('element') as ElementType;
    const color = searchParams.get('color');
    const accessories = searchParams.get('accessories');
    const overlays = searchParams.get('overlays');

    if (element) courtDesign.updateState({ selectedElement: element });
    if (color) courtDesign.updateState({ selectedColor: color });
    if (accessories) courtDesign.updateState({ showAccessories: accessories === 'true' });
    if (overlays) {
      try {
        const overlayData = JSON.parse(overlays);
        courtDesign.updateState({ overlays: overlayData });
      } catch (e) {
        // Invalid JSON, ignore
      }
    }
    
    courtDesign.updateState({ selectedCourt });
  }, [selectedCourt]);

  // Update URL when state changes
  useEffect(() => {
    const params = new URLSearchParams();
    if (courtDesign.selectedElement !== 'base-background') {
      params.set('element', courtDesign.selectedElement);
    }
    if (courtDesign.selectedColor !== '#233e6d') {
      params.set('color', courtDesign.selectedColor);
    }
    if (!courtDesign.showAccessories) {
      params.set('accessories', 'false');
    }
    if (Object.values(courtDesign.overlays).some(v => v)) {
      params.set('overlays', JSON.stringify(courtDesign.overlays));
    }
    
    setSearchParams(params, { replace: true });
  }, [
    courtDesign.selectedElement,
    courtDesign.selectedColor,
    courtDesign.showAccessories,
    courtDesign.overlays,
    setSearchParams
  ]);

  const handleCourtChange = (newCourt: CourtType) => {
    navigate(`/${newCourt}`);
    setIsCourtDropdownOpen(false);
  };
  const handleElementSelect = (element: ElementType) => {
    const currentColor = courtDesign.appliedColors[`${selectedCourt}-${element}`] || '#233e6d';
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
    
    // Auto-apply color to selected element
    const key = `${selectedCourt}-${courtDesign.selectedElement}`;
    courtDesign.updateState({
      appliedColors: {
        ...courtDesign.appliedColors,
        [key]: color
      }
    });
    
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };

  const handleAccessoryToggle = () => {
    courtDesign.updateState({ showAccessories: !courtDesign.showAccessories });
  };

  const handleOverlayToggle = (courtType: CourtType) => {
    courtDesign.updateState({
      overlays: {
        ...courtDesign.overlays,
        [courtType]: !courtDesign.overlays[courtType]
      }
    });
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
      } bg-white border-r border-gray-200 flex flex-col shadow-lg`}>
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Customize Your Court</h2>
            
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
          <div className="p-6 border-t border-gray-200">
            <button
              onClick={() => setIsEmailDialogOpen(true)}
              className="w-full flex items-center justify-center px-4 py-3 bg-primary text-white rounded-lg hover:bg-opacity-90 transition-colors"
            >
              <Mail className="w-4 h-4 mr-2" />
              Email Design            </button>
          </div>
        </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Mobile Header */}
        {isMobile && (
          <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
            <h1 className="text-lg font-semibold">
              {selectedCourt.charAt(0).toUpperCase() + selectedCourt.slice(1)} Court
            </h1>
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 rounded-lg bg-primary text-white"
            >
              Customize
            </button>
          </div>
        )}        {/* Court Display */}
        <div className="flex-1 p-4 bg-gray-50">
          <div className="h-full bg-white rounded-lg shadow-sm p-4 flex items-center justify-center">
            <div className="w-full max-w-4xl">
              <CourtSVG
                selectedCourt={selectedCourt}
                appliedColors={courtDesign.appliedColors}
                showAccessories={courtDesign.showAccessories}
                overlays={courtDesign.overlays}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Email Dialog */}
      <EmailDesignDialog
        isOpen={isEmailDialogOpen}
        onClose={() => setIsEmailDialogOpen(false)}
        courtType={selectedCourt}
        appliedColors={courtDesign.appliedColors}
        selectedColor={courtDesign.selectedColor}
        showAccessories={courtDesign.showAccessories}
        overlays={courtDesign.overlays}
      />
    </div>
  );
};

export default CourtDesigner;
