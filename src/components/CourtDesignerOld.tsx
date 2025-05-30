import { useState, useEffect } from "react";
import { ArrowLeft, Mail, Menu, X } from "lucide-react";
import { CourtType, ElementType } from "../types/court";
import Sidebar from "./Sidebar";
import CourtSVG from "./CourtSVG";
import { EmailDesignDialog } from "./EmailDesignDialog";
import { Drawer } from "./ui";
import { useCourtDesign } from "../hooks/useCourtDesign";
import { useMobileDetection } from "../hooks/useMobileDetection";

interface CourtDesignerProps {
  selectedCourt: CourtType;
  onBackToLanding: () => void;
}

const CourtDesigner = ({ selectedCourt, onBackToLanding }: CourtDesignerProps) => {
  const isMobile = useMobileDetection();
  const courtDesign = useCourtDesign();
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [isEmailDialogOpen, setIsEmailDialogOpen] = useState<boolean>(false);
  const [showMobileHint, setShowMobileHint] = useState<boolean>(true);

  // Update court design state when selectedCourt prop changes
  useEffect(() => {
    if (courtDesign.selectedCourt !== selectedCourt) {
      courtDesign.updateState({ selectedCourt });
    }
  }, [selectedCourt, courtDesign]);

  // Hide mobile hint after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMobileHint(false);
    }, 5000);
    
    return () => clearTimeout(timer);
  }, []);

  const getElementDefaultColor = (element: ElementType): string => {
    const defaults: Record<ElementType, string> = {
      // Common elements
      'base-background': '#6c6d6f', // Gray
      // Basketball elements
      'playing-area': '#233e6d', // Standard Blue
      'lines': '#ffffff', // Brilliant White
      'three-point': '#1a3054', // Competition Blue
      'center-circle': '#1a3054', // Competition Blue
      'three-second-area': '#1a3054', // Competition Blue
      // Tennis elements
      'tennis-playing-area': '#7b3522', // Classic Red
      'tennis-lines': '#ffffff', // Brilliant White
      // Pickleball elements
      'pickleball-kitchen': '#233e6d', // Standard Blue
      'pickleball-service-area': '#445f43', // Competition Green
      'pickleball-lines': '#ffffff' // Brilliant White
    };
    return defaults[element] || '#233e6d';
  };

  const getElementCurrentColor = (element: ElementType): string => {
    const key = `${courtDesign.selectedCourt}-${element}`;
    return courtDesign.appliedColors[key] || getElementDefaultColor(element);
  };

  const handleColorSelect = (color: string) => {
    courtDesign.updateState({ selectedColor: color });
    // Auto-apply color to selected element
    applyColorToElement(courtDesign.selectedElement, color);
    
    // Auto-close sidebar on mobile after color selection for better UX
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };

  const applyColorToElement = (element: ElementType, color: string) => {
    const key = `${courtDesign.selectedCourt}-${element}`;
    courtDesign.updateState({ 
      appliedColors: {
        ...courtDesign.appliedColors,
        [key]: color
      }
    });
  };

  const handleElementSelect = (element: ElementType) => {
    const currentColor = getElementCurrentColor(element);
    courtDesign.updateState({ 
      selectedElement: element,
      selectedColor: currentColor
    });
    
    // Auto-close sidebar on mobile after element selection for better UX
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

  const handleEmailDesign = () => {
    setIsEmailDialogOpen(true);
  };

  const getCourtSpecs = () => {
    const specs = {
      basketball: "94' x 50' regulation size",
      tennis: "78' x 36' regulation size", 
      pickleball: "44' x 20' regulation size"
    };
    return specs[courtDesign.selectedCourt] || '';
  };

  const getElementLabel = () => {
    const labels: Record<ElementType, string> = {
      // Common elements
      'base-background': 'Background',
      // Basketball elements
      'playing-area': 'Playing Area',
      'lines': 'Court Lines',
      'three-point': 'Three Point Area',
      'center-circle': 'Center Circle',
      'three-second-area': 'Three Second Area',
      // Tennis elements
      'tennis-playing-area': 'Playing Area',
      'tennis-lines': 'Court Lines',
      // Pickleball elements
      'pickleball-kitchen': 'Kitchen',
      'pickleball-service-area': 'Service Area',
      'pickleball-lines': 'Court Lines'
    };
    return labels[courtDesign.selectedElement] || '';
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header Bar - Fixed positioning */}
      <header className="fixed top-0 left-0 right-0 bg-white shadow-sm border-b border-gray-200 px-4 md:px-6 py-3 md:py-4 z-30">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 md:space-x-4">
            <button 
              onClick={onBackToLanding}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <h1 className="text-lg md:text-xl font-semibold text-gray-800">
              {courtDesign.selectedCourt.charAt(0).toUpperCase() + courtDesign.selectedCourt.slice(1)} Court Designer
            </h1>
          </div>
          
          <div className="flex items-center space-x-2 md:space-x-3">
            {/* Mobile Sidebar Toggle */}
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors relative"
              aria-label={isSidebarOpen ? "Close customization panel" : "Open customization panel"}
            >
              {isSidebarOpen ? (
                <X className="w-5 h-5 text-gray-600" />
              ) : (
                <>
                  <Menu className="w-5 h-5 text-gray-600" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full"></span>
                </>
              )}
            </button>
            
            <button 
              onClick={handleEmailDesign}
              className="flex items-center px-3 md:px-4 py-2 bg-primary text-white rounded-lg hover:bg-opacity-90 transition-colors text-sm md:text-base"
            >
              <Mail className="w-4 h-4 mr-1 md:mr-2" />
              <span className="hidden sm:inline">Email Design</span>
              <span className="sm:hidden">Email</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content - Account for fixed header */}
      <div className="pt-16 md:pt-20 min-h-screen flex flex-col md:flex-row">
        {/* Desktop Sidebar */}
        <div className="hidden md:block md:w-80 md:flex-shrink-0">
          <Sidebar
            selectedCourt={courtDesign.selectedCourt}
            selectedColor={courtDesign.selectedColor}
            selectedElement={courtDesign.selectedElement}
            showAccessories={courtDesign.showAccessories}
            overlays={courtDesign.overlays}
            onColorSelect={handleColorSelect}
            onElementSelect={handleElementSelect}
            onAccessoryToggle={handleAccessoryToggle}
            onOverlayToggle={handleOverlayToggle}
            isMobile={false}
          />
        </div>

        {/* Mobile Sidebar Drawer */}
        <Drawer
          isOpen={isSidebarOpen && isMobile}
          onClose={() => setIsSidebarOpen(false)}
          title="Customize Your Court"
          side="left"
        >
          <Sidebar
            selectedCourt={courtDesign.selectedCourt}
            selectedColor={courtDesign.selectedColor}
            selectedElement={courtDesign.selectedElement}
            showAccessories={courtDesign.showAccessories}
            overlays={courtDesign.overlays}
            onColorSelect={handleColorSelect}
            onElementSelect={handleElementSelect}
            onAccessoryToggle={handleAccessoryToggle}
            onOverlayToggle={handleOverlayToggle}
            isMobile={true}
            onClose={() => setIsSidebarOpen(false)}
          />
        </Drawer>

        {/* Main Court Display */}
        <main className="flex-1 bg-gray-100 flex items-center justify-center p-4 md:p-8 overflow-auto">
          {/* Mobile hint when sidebar is closed */}
          {!isSidebarOpen && showMobileHint && isMobile && (
            <div className="fixed top-20 left-4 right-4 bg-primary/90 text-white text-sm px-4 py-2 rounded-lg shadow-lg z-20 text-center animate-pulse">
              Tap the menu button to customize colors
            </div>
          )}
          
          <div className="bg-white rounded-lg shadow-lg p-3 md:p-6 max-w-5xl w-full">
            <div className="text-center mb-4 md:mb-6">
              <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
                {courtDesign.selectedCourt.charAt(0).toUpperCase() + courtDesign.selectedCourt.slice(1)} Court
              </h2>
              <p className="text-sm md:text-base text-gray-600">Select colors from the sidebar to customize your court design</p>
            </div>
            
            {/* Court SVG Container */}
            <div className="flex justify-center">
              <div className="relative bg-gray-200 rounded-lg p-2 md:p-4 w-full court-container">
                <CourtSVG
                  selectedCourt={courtDesign.selectedCourt}
                  appliedColors={courtDesign.appliedColors}
                  showAccessories={courtDesign.showAccessories}
                  overlays={courtDesign.overlays}
                />
              </div>
            </div>
            
            {/* Court Info Panel */}
            <div className="mt-4 md:mt-6 bg-gray-50 rounded-lg p-3 md:p-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
                <div>
                  <h3 className="font-medium text-gray-800">
                    {courtDesign.selectedCourt.charAt(0).toUpperCase() + courtDesign.selectedCourt.slice(1)} Court
                  </h3>
                  <p className="text-sm text-gray-600">{getCourtSpecs()}</p>
                </div>
                <div className="md:text-right">
                  <p className="text-sm text-gray-600">Selected Element</p>
                  <p className="font-medium text-gray-800">{getElementLabel()}</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Email Design Dialog */}
      <EmailDesignDialog
        isOpen={isEmailDialogOpen}
        onClose={() => setIsEmailDialogOpen(false)}
        courtType={courtDesign.selectedCourt}
        appliedColors={courtDesign.appliedColors}
        selectedColor={courtDesign.selectedColor}
        showAccessories={courtDesign.showAccessories}
        overlays={courtDesign.overlays}
      />
    </div>
  );
};

export default CourtDesigner;
