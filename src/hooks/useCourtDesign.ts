import { useState, useEffect } from 'react';
import { CourtType, ElementType, CourtOverlays } from '../types/court';

interface CourtDesignState {
  selectedCourt: CourtType;
  selectedColor: string;
  selectedElement: ElementType;
  showAccessories: boolean;
  overlays: CourtOverlays;
  appliedColors: Record<string, string>;
}

const STORAGE_KEY = 'court-design-state';

export const useCourtDesign = () => {
  const [state, setState] = useState<CourtDesignState>(() => {
    // Try to load from localStorage on initial render
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (error) {
        console.warn('Failed to parse saved court design state:', error);
      }
    }
    
    // Default state
    return {
      selectedCourt: 'basketball' as CourtType,
      selectedColor: '#233e6d',
      selectedElement: 'base-background' as ElementType,
      showAccessories: true,
      overlays: {
        tennis: false,
        pickleball: false,
        basketball: false
      },
      appliedColors: {}
    };
  });

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const updateState = (updates: Partial<CourtDesignState>) => {
    setState(prev => ({ ...prev, ...updates }));
  };

  const resetState = () => {
    localStorage.removeItem(STORAGE_KEY);
    setState({
      selectedCourt: 'basketball' as CourtType,
      selectedColor: '#233e6d',
      selectedElement: 'base-background' as ElementType,
      showAccessories: true,
      overlays: {
        tennis: false,
        pickleball: false,
        basketball: false
      },
      appliedColors: {}
    });
  };

  return {
    ...state,
    updateState,
    resetState
  };
};
