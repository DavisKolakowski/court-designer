import { CourtType, ElementType, CourtOverlays } from "../types/court";
import ColorPicker from "./ColorPicker";
import { getColorName } from "../data/colors";

interface SidebarProps {
  selectedCourt: CourtType;
  selectedColor: string;
  selectedElement: ElementType;
  showAccessories: boolean;
  overlays: CourtOverlays;
  onColorSelect: (color: string) => void;
  onElementSelect: (element: ElementType) => void;
  onAccessoryToggle: () => void;
  onOverlayToggle: (courtType: CourtType) => void;
  isMobile?: boolean;
  onClose?: () => void;
}

const Sidebar = ({
  selectedCourt,
  selectedColor,
  selectedElement,
  showAccessories,
  overlays,
  onColorSelect,
  onElementSelect,
  onAccessoryToggle,
  onOverlayToggle,
  isMobile = false,
  onClose
}: SidebarProps) => {
  const getAccessoryLabel = () => {
    const labels = {
      basketball: 'Show Basketball Hoops',
      tennis: 'Show Tennis Net',
      pickleball: 'Show Pickleball Net'
    };
    return labels[selectedCourt] || '';
  };

  const getOverlayOptions = () => {
    const allCourts: CourtType[] = ['basketball', 'tennis', 'pickleball'];
    return allCourts.filter(court => court !== selectedCourt);
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
        return ['base-background', 'playing-area', 'lines'];
    }
  };

  const getElementLabel = (element: ElementType): string => {
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
    return labels[element] || element;
  };

  return (
    <aside className={`${isMobile ? 'w-full border-b court-sidebar' : 'w-80 border-r'} bg-white shadow-lg border-gray-200 flex flex-col md:h-full`}>
      {/* Sidebar Header */}
      <div className="p-4 md:p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-1">Customize Your Court</h2>
            <p className="text-sm text-gray-600">Choose colors and toggle accessories</p>
          </div>
          {/* Mobile close button */}
          {isMobile && onClose && (
            <button 
              onClick={onClose}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <span className="sr-only">Close sidebar</span>
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Scrollable Content */}
      <div className={`${isMobile ? 'max-h-96 md:max-h-none' : 'flex-1'} overflow-y-auto sidebar-scroll p-4 md:p-6 space-y-4 md:space-y-6`}>
        
        {/* Court Accessories Toggle */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-medium text-gray-800 mb-3">Court Accessories</h3>
          <label className="flex items-center justify-between">
            <span className="text-sm text-gray-600">{getAccessoryLabel()}</span>
            <div className="relative">
              <input 
                type="checkbox" 
                checked={showAccessories}
                onChange={onAccessoryToggle}
                className="sr-only"
              />
              <div className={`w-11 h-6 rounded-full shadow-inner transition-colors ${showAccessories ? 'bg-primary' : 'bg-gray-300'}`}></div>
              <div className={`absolute inset-y-0 w-6 h-6 bg-white rounded-full shadow transform transition-transform ${showAccessories ? 'translate-x-5' : 'translate-x-0'}`}></div>
            </div>
          </label>
        </div>

        {/* Court Overlays */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-medium text-gray-800 mb-3">Overlay Other Courts</h3>
          <div className="space-y-2">
            {getOverlayOptions().map(courtType => (
              <label key={courtType} className="flex items-center">
                <input 
                  type="checkbox" 
                  checked={overlays[courtType]}
                  onChange={() => onOverlayToggle(courtType)}
                  className="rounded border-gray-300 text-primary focus:ring-primary"
                />
                <span className="ml-2 text-sm text-gray-600">
                  Show {courtType.charAt(0).toUpperCase() + courtType.slice(1)} Lines
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Color Picker */}
        <ColorPicker
          selectedColor={selectedColor}
          onColorSelect={onColorSelect}
        />

        {/* Current Color Selection */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-medium text-gray-800 mb-3">Selected Color</h3>
          <div className="flex items-center space-x-3">
            <div 
              className="w-12 h-12 rounded-lg border-2 border-gray-300"
              style={{ backgroundColor: selectedColor }}
            ></div>
            <div>
              <p className="text-sm font-medium text-gray-800">{getColorName(selectedColor)}</p>
              <p className="text-xs text-gray-600">{selectedColor}</p>
            </div>
          </div>
        </div>

        {/* Element Selection */}
        <div>
          <h3 className="font-medium text-gray-800 mb-4">Apply Color To</h3>
          <div className="space-y-2">
            {getElementsForCourt().map(element => {              
              const isSelected = selectedElement === element;
              
              return (
                <button
                  key={element}
                  onClick={() => onElementSelect(element)}
                  className={`w-full text-left p-3 rounded-lg border transition-colors ${
                    isSelected
                      ? 'bg-primary border-primary text-white font-medium'
                      : 'bg-gray-50 hover:bg-gray-100 border-gray-200 text-gray-700'
                  }`}
                >
                  {getElementLabel(element)}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
