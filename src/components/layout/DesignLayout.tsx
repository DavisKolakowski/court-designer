import React, { useState } from 'react';
import { CourtType, ElementType, CourtOverlays } from '../../types/court';
import { useMobileDetection } from '../../hooks/useMobileDetection';
import MobileBackdrop from '../shared/MobileBackdrop';
import MobileHeader from '../shared/MobileHeader';
import DesignSidebar from '../design/DesignSidebar';
import CourtDisplay from '../court/CourtDisplay';
import QuoteDialog from '../quote/QuoteDialog';

interface DesignLayoutProps {
  selectedCourt: CourtType;
  selectedElement: ElementType;
  selectedColor: string;
  showAccessories: boolean;
  overlays: CourtOverlays;
  appliedColors: Record<string, string>;
  designSummary: Record<string, any>;
  onCourtChange: (court: CourtType) => void;
  onElementSelect: (element: ElementType) => void;
  onColorSelect: (color: string) => void;
  onAccessoryToggle: () => void;
  onOverlayToggle: (courtType: CourtType) => void;
}

const DesignLayout: React.FC<DesignLayoutProps> = ({
  selectedCourt,
  selectedElement,
  selectedColor,
  showAccessories,
  overlays,
  appliedColors,
  designSummary,
  onCourtChange,
  onElementSelect,
  onColorSelect,
  onAccessoryToggle,
  onOverlayToggle
}) => {
  const isMobile = useMobileDetection();
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile);
  const [isQuoteDialogOpen, setIsQuoteDialogOpen] = useState(false);

  const handleSidebarToggle = () => setIsSidebarOpen(!isSidebarOpen);
  const handleSidebarClose = () => setIsSidebarOpen(false);
  const handleQuoteRequest = () => setIsQuoteDialogOpen(true);
  const handleQuoteDialogClose = () => setIsQuoteDialogOpen(false);

  return (
    <div className="h-screen flex">
      {/* Mobile Backdrop */}
      <MobileBackdrop
        isVisible={isMobile && isSidebarOpen}
        onClick={handleSidebarClose}
      />
      
      {/* Left Sidebar */}
      <DesignSidebar
        selectedCourt={selectedCourt}
        selectedElement={selectedElement}
        selectedColor={selectedColor}
        showAccessories={showAccessories}
        overlays={overlays}
        isMobile={isMobile}
        isOpen={isSidebarOpen}
        onCourtChange={onCourtChange}
        onElementSelect={onElementSelect}
        onColorSelect={onColorSelect}
        onAccessoryToggle={onAccessoryToggle}
        onOverlayToggle={onOverlayToggle}
        onRequestQuote={handleQuoteRequest}
        onClose={handleSidebarClose}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Mobile Header */}
        {isMobile && (
          <MobileHeader
            selectedCourt={selectedCourt}
            onCustomizeClick={handleSidebarToggle}
          />
        )}

        {/* Court Display */}
        <div className="flex-1 p-4 bg-gray-50">
          <CourtDisplay
            selectedCourt={selectedCourt}
            appliedColors={appliedColors}
            showAccessories={showAccessories}
            overlays={overlays}
            selectedElement={selectedElement}
            isMobile={isMobile}
          />
        </div>
      </div>      {/* Quote Dialog */}
      <QuoteDialog
        isOpen={isQuoteDialogOpen}
        onClose={handleQuoteDialogClose}
        courtType={selectedCourt}
        appliedColors={appliedColors}
        showAccessories={showAccessories}
        overlays={overlays}
        designSummary={designSummary}
      />
    </div>
  );
};

export default DesignLayout;
