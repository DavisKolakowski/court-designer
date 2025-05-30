import { useNavigate } from 'react-router-dom';
import { CourtType, ElementType } from '../types/court';
import { useCourtDesign } from './useCourtDesign';
import { useMobileDetection } from './useMobileDetection';

export const useDesignInteractions = (selectedCourt: CourtType) => {
  const navigate = useNavigate();
  const isMobile = useMobileDetection();
  const courtDesign = useCourtDesign();

  const handleCourtChange = (newCourt: CourtType) => {
    navigate(`/${newCourt}`);
  };

  const handleElementSelect = (element: ElementType, onSidebarClose?: () => void) => {
    const currentColor = courtDesign.getCourtColor(selectedCourt, element);
    courtDesign.updateState({ 
      selectedElement: element,
      selectedColor: currentColor
    });
    if (isMobile && onSidebarClose) {
      onSidebarClose();
    }
  };

  const handleColorSelect = (color: string, onSidebarClose?: () => void) => {
    courtDesign.updateState({ selectedColor: color });
    
    // Auto-apply color to selected element for current court
    courtDesign.updateCourtColor(selectedCourt, courtDesign.selectedElement, color);
    
    if (isMobile && onSidebarClose) {
      onSidebarClose();
    }
  };

  const handleAccessoryToggle = () => {
    courtDesign.updateCourtAccessories(selectedCourt, !courtDesign.showAccessories);
  };

  const handleOverlayToggle = (courtType: CourtType) => {
    courtDesign.updateOverlays({
      [courtType]: !courtDesign.overlays[courtType]
    });
  };

  // Convert new color structure to legacy format for CourtSVG
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

  return {
    courtDesign,
    handleCourtChange,
    handleElementSelect,
    handleColorSelect,
    handleAccessoryToggle,
    handleOverlayToggle,
    getLegacyAppliedColors
  };
};
