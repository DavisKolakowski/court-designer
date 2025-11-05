import { create } from 'zustand';
import { persist, createJSONStorage, StateStorage } from 'zustand/middleware';
import { devtools } from 'zustand/middleware';
import { CourtType, ElementType, CourtOverlays } from '../types/court';
import { getDefaultElementColors } from '../utils/courtHelpers';

type CourtElements = Partial<Record<ElementType, string>>;

interface CourtDesign {
  elements: CourtElements;
  showAccessories: boolean;
}

interface FullDesignState {
  basketball: CourtDesign;
  tennis: CourtDesign;
  pickleball: CourtDesign;
  overlays: CourtOverlays;
}

interface CourtDesignState {
  // Core state
  selectedCourt: CourtType;
  selectedColor: string;
  selectedElement: ElementType;
  designState: FullDesignState;
  isHydrated: boolean;

  // Actions
  updateState: (updates: Partial<Pick<CourtDesignState, 'selectedCourt' | 'selectedColor' | 'selectedElement'>>) => void;
  updateCourtColor: (court: CourtType, element: ElementType, color: string) => void;
  updateCourtAccessories: (court: CourtType, showAccessories: boolean) => void;
  updateOverlays: (overlays: Partial<CourtOverlays>) => void;
  resetState: (preserveCurrentCourt?: boolean) => void;
  setHydrated: (hydrated: boolean) => void;

  // Utilities
  getCurrentCourtDesign: () => CourtDesign;
  getCourtColor: (court: CourtType, element: ElementType) => string;
  getDesignSummary: () => Record<string, any>;
  generateShareableUrl: () => string;
}

const storage: StateStorage = {
  getItem: (name) => localStorage.getItem(name),
  setItem: (name, value) => localStorage.setItem(name, value),
  removeItem: (name) => localStorage.removeItem(name),
};

const getDefaultCourtDesign = (): CourtDesign => {
  const defaultColors = getDefaultElementColors();
  return {
    elements: { ...defaultColors },
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

const getInitialState = () => {
  const initialElement = 'base-background' as ElementType;
  const initialCourt = 'basketball' as CourtType;
  const defaultColors = getDefaultElementColors();
  const initialColor = defaultColors[initialElement] || '#6c6d6f';
  
  return {
    selectedCourt: initialCourt,
    selectedColor: initialColor,
    selectedElement: initialElement,
    designState: getDefaultDesignState(),
    isHydrated: false,
  };
};

export const useCourtDesignStore = create<CourtDesignState>()(
  devtools(
    persist(
      (set, get) => ({
        ...getInitialState(),

        updateState: (updates) => {
          try {
            set((state) => ({ ...state, ...updates }), false, 'updateState');
          } catch (error) {
            console.error('Error updating state:', error);
          }
        },

        updateCourtColor: (court, element, color) => {
          try {
            set((state) => ({
              designState: {
                ...state.designState,
                [court]: {
                  ...state.designState[court],
                  elements: {
                    ...state.designState[court].elements,
                    [element]: color
                  }
                }
              }
            }), false, 'updateCourtColor');
          } catch (error) {
            console.error('Error updating court color:', error);
          }
        },

        updateCourtAccessories: (court, showAccessories) => {
          try {
            set((state) => ({
              designState: {
                ...state.designState,
                [court]: {
                  ...state.designState[court],
                  showAccessories
                }
              }
            }), false, 'updateCourtAccessories');
          } catch (error) {
            console.error('Error updating court accessories:', error);
          }
        },

        updateOverlays: (overlays) => {
          try {
            set((state) => ({
              designState: {
                ...state.designState,
                overlays: {
                  ...state.designState.overlays,
                  ...overlays
                }
              }
            }), false, 'updateOverlays');
          } catch (error) {
            console.error('Error updating overlays:', error);
          }
        },

        resetState: (preserveCurrentCourt = false) => {
          try {
            const initialElement = 'base-background' as ElementType;
            const initialCourt = preserveCurrentCourt ? get().selectedCourt : 'basketball' as CourtType;
            const defaultColors = getDefaultElementColors();
            const initialColor = defaultColors[initialElement] || '#6c6d6f';
            
            set({
              selectedCourt: initialCourt,
              selectedColor: initialColor,
              selectedElement: initialElement,
              designState: getDefaultDesignState()
            }, false, 'resetState');
          } catch (error) {
            console.error('Error resetting state:', error);
          }
        },

        setHydrated: (hydrated) => {
          set({ isHydrated: hydrated }, false, 'setHydrated');
        },

        getCurrentCourtDesign: () => {
          const state = get();
          return state.designState[state.selectedCourt];
        },

        getCourtColor: (court, element) => {
          const state = get();
          return state.designState[court].elements[element] || getDefaultElementColors()[element] || '#6c6d6f';
        },

        getDesignSummary: () => {
          const state = get();
          const summary: Record<string, any> = {};
          
          (['basketball', 'tennis', 'pickleball'] as CourtType[]).forEach(court => {
            const design = state.designState[court];
            const colors: Record<string, string> = {};
            
            // Get all defined colors for this court
            Object.entries(design.elements).forEach(([element, color]) => {
              if (color) colors[element] = color;
            });
            
            summary[court] = {
              colors,
              showAccessories: design.showAccessories
            };
          });
          
          summary.overlays = state.designState.overlays;
          return summary;
        },

        generateShareableUrl: () => {
          const state = get();
          const designSummary = state.getDesignSummary();
          const encodedState = btoa(JSON.stringify(designSummary));
          return `${window.location.origin}/${state.selectedCourt}?design=${encodedState}`;
        },
      }),
      {
        name: 'court-design-storage',
        storage: createJSONStorage(() => storage),
        onRehydrateStorage: () => (state) => {
          state?.setHydrated(true);
        },
      }
    ),
    {
      name: 'CourtDesignStore',
      enabled: import.meta.env.DEV,
    }
  )
);
