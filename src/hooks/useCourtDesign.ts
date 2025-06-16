import { useState, useEffect } from 'react';
import { CourtType, ElementType, CourtOverlays } from '../types/court';
import { getDefaultElementColors } from '../utils/courtHelpers';

// Comprehensive design state for all court components
interface CourtComponentColors {
  'base-background': string;
  'playing-area'?: string;
  'lines'?: string;
  'three-point'?: string;
  'center-circle'?: string;
  'three-second-area'?: string;
  'tennis-playing-area'?: string;
  'tennis-lines'?: string;
  'pickleball-kitchen'?: string;
  'pickleball-service-area'?: string;
  'pickleball-lines'?: string;
}

interface CourtDesign {
  colors: CourtComponentColors;
  showAccessories: boolean;
}

interface FullDesignState {
  basketball: CourtDesign;
  tennis: CourtDesign;
  pickleball: CourtDesign;
  overlays: CourtOverlays;
}

interface CourtDesignState {
  selectedCourt: CourtType;
  selectedColor: string;
  selectedElement: ElementType;
  designState: FullDesignState;
}

const STORAGE_KEY = 'court-design-state';

const getDefaultCourtDesign = (): CourtDesign => {
  const defaultColors = getDefaultElementColors();
  return {
    colors: {
      'base-background': defaultColors['base-background'],
    },
    showAccessories: true,
  };
};

const getDefaultDesignState = (): FullDesignState => ({
  basketball: getDefaultCourtDesign(),
  tennis: getDefaultCourtDesign(),
  pickleball: getDefaultCourtDesign(),
  overlays: {
    tennis: false,
    pickleball: false,
    basketball: false
  }
});

export const useCourtDesign = () => {
  const [state, setState] = useState<CourtDesignState>(() => {
    // Try to load from localStorage on initial render
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Ensure all courts have the required structure
        return {
          selectedCourt: parsed.selectedCourt || 'basketball',
          selectedColor: parsed.selectedColor || '#233e6d',
          selectedElement: parsed.selectedElement || 'base-background',
          designState: {
            basketball: { ...getDefaultCourtDesign(), ...parsed.designState?.basketball },
            tennis: { ...getDefaultCourtDesign(), ...parsed.designState?.tennis },
            pickleball: { ...getDefaultCourtDesign(), ...parsed.designState?.pickleball },
            overlays: { ...getDefaultDesignState().overlays, ...parsed.designState?.overlays }
          }
        };
      } catch (error) {
        console.warn('Failed to parse saved court design state:', error);
      }
    }
      // Default state
    const initialElement = 'base-background' as ElementType;
    const initialCourt = 'basketball' as CourtType;
    const defaultColors = getDefaultElementColors();
    const initialColor = defaultColors[initialElement] || '#6c6d6f';
    
    return {
      selectedCourt: initialCourt,
      selectedColor: initialColor,
      selectedElement: initialElement,
      designState: getDefaultDesignState()
    };
  });

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const updateState = (updates: Partial<CourtDesignState>) => {
    setState(prev => ({ ...prev, ...updates }));
  };

  // Update color for specific court and element
  const updateCourtColor = (court: CourtType, element: ElementType, color: string) => {
    setState(prev => ({
      ...prev,
      designState: {
        ...prev.designState,
        [court]: {
          ...prev.designState[court],
          colors: {
            ...prev.designState[court].colors,
            [element]: color
          }
        }
      }
    }));
  };

  // Update accessories for specific court
  const updateCourtAccessories = (court: CourtType, showAccessories: boolean) => {
    setState(prev => ({
      ...prev,
      designState: {
        ...prev.designState,
        [court]: {
          ...prev.designState[court],
          showAccessories
        }
      }
    }));
  };

  // Update overlay settings
  const updateOverlays = (overlays: Partial<CourtOverlays>) => {
    setState(prev => ({
      ...prev,
      designState: {
        ...prev.designState,
        overlays: {
          ...prev.designState.overlays,
          ...overlays
        }
      }
    }));
  };

  // Get current court's design
  const getCurrentCourtDesign = () => state.designState[state.selectedCourt];
  // Get color for specific court and element
  const getCourtColor = (court: CourtType, element: ElementType) => {
    return state.designState[court].colors[element] || getDefaultElementColors()[element] || '#6c6d6f';
  };

  // Generate design summary for email
  const getDesignSummary = () => {
    const summary: Record<string, any> = {};
    
    (['basketball', 'tennis', 'pickleball'] as CourtType[]).forEach(court => {
      const design = state.designState[court];
      const colors: Record<string, string> = {};
      
      // Get all defined colors for this court
      Object.entries(design.colors).forEach(([element, color]) => {
        if (color) colors[element] = color;
      });
      
      summary[court] = {
        colors,
        showAccessories: design.showAccessories
      };
    });
    
    summary.overlays = state.designState.overlays;
    return summary;
  };

  // Generate shareable URL with full state
  const generateShareableUrl = () => {
    const designSummary = getDesignSummary();
    const encodedState = btoa(JSON.stringify(designSummary));
    return `${window.location.origin}/${state.selectedCourt}?design=${encodedState}`;
  };  const resetState = (preserveCurrentCourt: boolean = false) => {
    const initialElement = 'base-background' as ElementType;
    const initialCourt = preserveCurrentCourt ? state.selectedCourt : 'basketball' as CourtType;
    const defaultColors = getDefaultElementColors();
    const initialColor = defaultColors[initialElement] || '#6c6d6f';
    
    setState({
      selectedCourt: initialCourt,
      selectedColor: initialColor,
      selectedElement: initialElement,
      designState: getDefaultDesignState()
    });
  };

  return {
    // Current UI state
    selectedCourt: state.selectedCourt,
    selectedColor: state.selectedColor,
    selectedElement: state.selectedElement,
    
    // Current court design
    ...getCurrentCourtDesign(),
    overlays: state.designState.overlays,
    
    // Actions
    updateState,
    updateCourtColor,
    updateCourtAccessories,
    updateOverlays,
    resetState,
    
    // Utilities
    getCurrentCourtDesign,
    getCourtColor,
    getDesignSummary,
    generateShareableUrl
  };
};
