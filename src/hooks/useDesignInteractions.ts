import { useNavigate } from 'react-router-dom';
import { CourtType, ElementType } from '../types/court';
import { useCourtDesignStore } from '../stores/courtDesignStore';
import { useMobileDetection } from './useMobileDetection';
import { getElementsForCourt } from '../utils/courtHelpers';

export const useDesignInteractions = (selectedCourt: CourtType) => {
  const navigate = useNavigate();
  const isMobile = useMobileDetection();
  
  const selectedElement = useCourtDesignStore(state => state.selectedElement);
  const updateState = useCourtDesignStore(state => state.updateState);
  const updateCourtColor = useCourtDesignStore(state => state.updateCourtColor);
  const updateCourtAccessories = useCourtDesignStore(state => state.updateCourtAccessories);
  const updateOverlays = useCourtDesignStore(state => state.updateOverlays);
  const getCourtColor = useCourtDesignStore(state => state.getCourtColor);
  const showAccessories = useCourtDesignStore(state => state.designState[selectedCourt].showAccessories);
  const overlays = useCourtDesignStore(state => state.designState.overlays);

  const handleCourtChange = (newCourt: CourtType) => {
    navigate(`/${newCourt}`);
  };

  const handleElementSelect = (element: ElementType, onSidebarClose?: () => void) => {
    const currentColor = getCourtColor(selectedCourt, element);
    updateState({ 
      selectedElement: element,
      selectedColor: currentColor
    });
    if (isMobile && onSidebarClose) {
      onSidebarClose();
    }
  };

  const handleColorSelect = (color: string, onSidebarClose?: () => void) => {
    updateState({ selectedColor: color });
    
    // Auto-apply color to selected element for current court
    updateCourtColor(selectedCourt, selectedElement, color);
    
    if (isMobile && onSidebarClose) {
      onSidebarClose();
    }
  };

  const handleAccessoryToggle = () => {
    updateCourtAccessories(selectedCourt, !showAccessories);
  };

  const handleOverlayToggle = (courtType: CourtType) => {
    updateOverlays({
      [courtType]: !overlays[courtType]
    });
  };

  // Convert to legacy format for CourtSVG component
  const getLegacyAppliedColors = (): Record<string, string> => {
    const legacyColors: Record<string, string> = {};
    
    (['basketball', 'tennis', 'pickleball'] as CourtType[]).forEach(court => {
      const elementsForCourt = getElementsForCourt(court);
      
      elementsForCourt.forEach(element => {
        const color = getCourtColor(court, element);
        legacyColors[`${court}-${element}`] = color;
      });
    });
    
    return legacyColors;
  };

  return {
    handleCourtChange,
    handleElementSelect,
    handleColorSelect,
    handleAccessoryToggle,
    handleOverlayToggle,
    getLegacyAppliedColors
  };
};
