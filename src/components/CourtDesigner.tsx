import { useState, useEffect } from "react";
import { ArrowLeft, Mail, Menu, X } from "lucide-react";
import { CourtType, ElementType, CourtOverlays } from "../types/court";
import Sidebar from "./Sidebar";
import CourtSVG from "./CourtSVG";

interface CourtDesignerProps {
  selectedCourt: CourtType;
  onBackToLanding: () => void;
}

const CourtDesigner = ({ selectedCourt, onBackToLanding }: CourtDesignerProps) => {
  const [selectedColor, setSelectedColor] = useState<string>("#233e6d"); // Standard Blue instead of #193f70
  const [selectedElement, setSelectedElement] = useState<ElementType>("base-background");
  const [showAccessories, setShowAccessories] = useState<boolean>(true);
  const [overlays, setOverlays] = useState<CourtOverlays>({
    tennis: false,
    pickleball: false,
    basketball: false
  });
  const [appliedColors, setAppliedColors] = useState<Record<string, string>>({});
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  // Reset selected element when court type changes
  useEffect(() => {
    const getDefaultElement = (courtType: CourtType): ElementType => {
      switch (courtType) {
        case 'basketball':
          return 'base-background';
        case 'tennis':
          return 'base-background';
        case 'pickleball':
          return 'base-background';
        default:
          return 'base-background';
      }
    };
    
    setSelectedElement(getDefaultElement(selectedCourt));
  }, [selectedCourt]);

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
    const key = `${selectedCourt}-${element}`;
    return appliedColors[key] || getElementDefaultColor(element);
  };

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
    // Auto-apply color to selected element
    applyColorToElement(selectedElement, color);
  };

  const applyColorToElement = (element: ElementType, color: string) => {
    const key = `${selectedCourt}-${element}`;
    setAppliedColors(prev => ({
      ...prev,
      [key]: color
    }));
  };

  const handleElementSelect = (element: ElementType) => {
    setSelectedElement(element);
    // Update selected color to show current applied color for this element
    const currentColor = getElementCurrentColor(element);
    setSelectedColor(currentColor);
  };

  const handleAccessoryToggle = () => {
    setShowAccessories(!showAccessories);
  };

  const handleOverlayToggle = (courtType: CourtType) => {
    setOverlays(prev => ({
      ...prev,
      [courtType]: !prev[courtType]
    }));
  };

  const handleEmailDesign = () => {
    const courtSpecs = generateCourtSpecs();
    const subject = "Court Design Specification";
    const body = encodeURIComponent(courtSpecs);
    const mailto = `mailto:design@sportscourts.com?subject=${subject}&body=${body}`;
    window.location.href = mailto;
  };

  const generateCourtSpecs = () => {
    const courtName = selectedCourt.charAt(0).toUpperCase() + selectedCourt.slice(1);
    const overlayList = Object.entries(overlays)
      .filter(([_, enabled]) => enabled)
      .map(([type, _]) => type.charAt(0).toUpperCase() + type.slice(1))
      .join(', ') || 'None';

    return `Court Design Specifications:

Court Type: ${courtName}
Selected Color: ${selectedColor}
Applied Colors: ${JSON.stringify(appliedColors, null, 2)}
Accessories: ${showAccessories ? 'Enabled' : 'Disabled'}
Overlays: ${overlayList}

Generated on: ${new Date().toLocaleDateString()}`;
  };

  const getCourtSpecs = () => {
    const specs = {
      basketball: "94' x 50' regulation size",
      tennis: "78' x 36' regulation size", 
      pickleball: "44' x 20' regulation size"
    };
    return specs[selectedCourt] || '';
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
    return labels[selectedElement] || '';
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header Bar */}
      <header className="bg-white shadow-sm border-b border-gray-200 px-4 md:px-6 py-3 md:py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 md:space-x-4">
            <button 
              onClick={onBackToLanding}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <h1 className="text-lg md:text-xl font-semibold text-gray-800">
              {selectedCourt.charAt(0).toUpperCase() + selectedCourt.slice(1)} Court Designer
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

      {/* Mobile-first layout: Sidebar on top, court below on mobile */}
      <div className="flex flex-col md:flex-row h-[calc(100vh-80px)]">
        {/* Mobile Sidebar - Collapsible and positioned above court */}
        <div className={`${isSidebarOpen ? 'block' : 'hidden'} md:block md:w-80 md:flex-shrink-0`}>
          <Sidebar
            selectedCourt={selectedCourt}
            selectedColor={selectedColor}
            selectedElement={selectedElement}
            showAccessories={showAccessories}
            overlays={overlays}
            onColorSelect={handleColorSelect}
            onElementSelect={handleElementSelect}
            onAccessoryToggle={handleAccessoryToggle}
            onOverlayToggle={handleOverlayToggle}
            isMobile={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
          />
        </div>

        {/* Main Court Display */}
        <main className="flex-1 bg-gray-100 flex items-center justify-center p-4 md:p-8 overflow-auto">
          <div className="bg-white rounded-lg shadow-lg p-3 md:p-6 max-w-5xl w-full">
            <div className="text-center mb-4 md:mb-6">
              <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
                {selectedCourt.charAt(0).toUpperCase() + selectedCourt.slice(1)} Court
              </h2>
              <p className="text-sm md:text-base text-gray-600">Select colors from the sidebar to customize your court design</p>
            </div>
            
            {/* Court SVG Container */}
            <div className="flex justify-center">
              <div className="relative bg-gray-200 rounded-lg p-2 md:p-4 w-full court-container">
                <CourtSVG
                  selectedCourt={selectedCourt}
                  appliedColors={appliedColors}
                  showAccessories={showAccessories}
                  overlays={overlays}
                />
              </div>
            </div>
            
            {/* Court Info Panel */}
            <div className="mt-4 md:mt-6 bg-gray-50 rounded-lg p-3 md:p-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
                <div>
                  <h3 className="font-medium text-gray-800">
                    {selectedCourt.charAt(0).toUpperCase() + selectedCourt.slice(1)} Court
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
    </div>
  );
};

export default CourtDesigner;
