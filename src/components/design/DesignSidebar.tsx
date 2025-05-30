import React from 'react';
import { CourtType, ElementType, CourtOverlays } from '../../types/court';
import { Mail } from 'lucide-react';
import SidebarHeader from '../sidebar/SidebarHeader';
import CourtDropdown from '../shared/CourtDropdown';
import ElementSelection from '../sidebar/ElementSelection';
import ColorPicker from '../shared/ColorPicker';
import AccessoriesToggle from '../sidebar/AccessoriesToggle';
import CourtOverlaysSection from '../sidebar/CourtOverlaysSection';

interface DesignSidebarProps {
  selectedCourt: CourtType;
  selectedElement: ElementType;
  selectedColor: string;
  showAccessories: boolean;
  overlays: CourtOverlays;
  isMobile?: boolean;
  isOpen?: boolean;
  onCourtChange: (court: CourtType) => void;
  onElementSelect: (element: ElementType) => void;
  onColorSelect: (color: string) => void;
  onAccessoryToggle: () => void;
  onOverlayToggle: (courtType: CourtType) => void;
  onRequestQuote: () => void;
  onClose?: () => void;
  className?: string;
}

const DesignSidebar: React.FC<DesignSidebarProps> = ({
  selectedCourt,
  selectedElement,
  selectedColor,
  showAccessories,
  overlays,
  isMobile = false,
  isOpen = true,
  onCourtChange,
  onElementSelect,
  onColorSelect,
  onAccessoryToggle,
  onOverlayToggle,
  onRequestQuote,
  onClose,
  className = ""
}) => {
  const sidebarClasses = `${
    isMobile 
      ? `fixed top-0 left-0 h-full w-80 transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`
      : 'w-80 relative'
  } bg-white border-r border-gray-200 flex flex-col shadow-lg ${className}`;

  return (
    <div className={sidebarClasses}>      
    {/* Header */}      
    <SidebarHeader
        title="Customize Your Court"
        isMobile={isMobile}
        onClose={onClose}
      />

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Court Dropdown */}
        <div className="px-6 pb-4 pt-4">
          <CourtDropdown
            selectedCourt={selectedCourt}
            onCourtChange={onCourtChange}
          />
        </div>
        
        {/* Element Selection */}
        <div className="px-6 pb-6">
          <ElementSelection
            selectedCourt={selectedCourt}
            selectedElement={selectedElement}
            onElementSelect={onElementSelect}
          />
        </div>

        {/* Color Picker */}
        <div className="px-6 pb-6 border-b border-gray-200">
          <ColorPicker
            selectedColor={selectedColor}
            onColorSelect={onColorSelect}
          />
        </div>

        {/* Accessories Toggle */}
        <div className="px-6 py-6 border-b border-gray-200">
          <AccessoriesToggle
            selectedCourt={selectedCourt}
            showAccessories={showAccessories}
            onToggle={onAccessoryToggle}
          />
        </div>

        {/* Court Overlays */}
        <div className="px-6 py-6">
          <CourtOverlaysSection
            selectedCourt={selectedCourt}
            overlays={overlays}
            onOverlayToggle={onOverlayToggle}
          />
        </div>
      </div>

      {/* Quote Button at Bottom */}
      <div className="p-6 border-t border-gray-200">
        <button
          onClick={onRequestQuote}
          className="w-full flex items-center justify-center px-4 py-3 bg-primary text-white rounded-lg hover:bg-opacity-90 transition-colors"
        >
          <Mail className="w-4 h-4 mr-2" />
          Request Quote
        </button>
      </div>
    </div>
  );
};

export default DesignSidebar;
