import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { CourtType, ElementType, CourtOverlays } from "../types/court";
import { useCourtDesignStore } from "../stores/courtDesignStore";
import { getDefaultElementColors, getElementsForCourt } from "../utils/courtHelpers";

interface UseDesignUrlStateProps {
  selectedCourt: CourtType;
}

export const useDesignUrlState = ({
  selectedCourt,
}: UseDesignUrlStateProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedElement = useCourtDesignStore(state => state.selectedElement);
  const updateState = useCourtDesignStore(state => state.updateState);
  const updateCourtColor = useCourtDesignStore(state => state.updateCourtColor);
  const updateCourtAccessories = useCourtDesignStore(state => state.updateCourtAccessories);
  const updateOverlays = useCourtDesignStore(state => state.updateOverlays);
  const resetState = useCourtDesignStore(state => state.resetState);
  const getCourtColor = useCourtDesignStore(state => state.getCourtColor);
  const getDesignSummary = useCourtDesignStore(state => state.getDesignSummary);

  // Initialize state from URL params or load from state store
  useEffect(() => {
    const designParam = searchParams.get("design");

    if (designParam) {
      try {
        const decodedDesign = JSON.parse(atob(designParam));
        // Load the design from URL
        Object.entries(decodedDesign).forEach(
          ([courtType, courtData]: [string, any]) => {
            if (courtType === "overlays") {
              updateOverlays(courtData);
            } else if (
              ["basketball", "tennis", "pickleball"].includes(courtType)
            ) {
              const court = courtType as CourtType;
              // Apply colors for this court
              Object.entries(courtData.colors).forEach(
                ([element, color]: [string, any]) => {
                  updateCourtColor(
                    court,
                    element as ElementType,
                    color
                  );
                }
              );
              // Apply accessories setting
              updateCourtAccessories(
                court,
                courtData.showAccessories
              );
            }
          }
        );
      } catch (e) {
        console.warn("Failed to parse design from URL:", e);
      }
    } else {
      // If no design param, reset to defaults to ensure clean state but preserve current court
      resetState(true);
    }
    
    // Ensure selectedElement is valid for the current court and selectedColor matches
    const validElements = getElementsForCourt(selectedCourt);
    const currentSelectedElement = selectedElement;
    
    // If current selected element is not valid for this court type, use the first valid element
    if (!validElements.includes(currentSelectedElement)) {
      const firstElement = validElements[0];
      const elementColor = getCourtColor(selectedCourt, firstElement);
      updateState({ 
        selectedCourt,
        selectedElement: firstElement,
        selectedColor: elementColor
      });
    } else {
      // Element is valid, but ensure the color matches
      const elementColor = getCourtColor(selectedCourt, currentSelectedElement);
      updateState({ 
        selectedCourt,
        selectedColor: elementColor
      });
    }
  }, [selectedCourt, searchParams.get("design")]);

  // Update URL when significant state changes occur (for sharing)
  useEffect(() => {
    // Only update URL if there's actual design data beyond defaults
    const designSummary = getDesignSummary();
    const defaultColors = getDefaultElementColors();

    const hasCustomizations = Object.entries(designSummary).some(
      ([courtType, courtData]) => {
        if (courtType === "overlays") {
          return Object.values(courtData as CourtOverlays).some(Boolean);
        }
        if (
          typeof courtData === "object" &&
          courtData !== null &&
          "colors" in courtData
        ) {
          const courtInfo = courtData as any;

          // Check if accessories are turned off (customization)
          const accessoriesChanged = !courtInfo.showAccessories;

          // Check if any color differs from its default value
          const colorsChanged = Object.entries(courtInfo.colors).some(
            ([element, color]) => {
              const defaultColor = defaultColors[element];
              return defaultColor && color !== defaultColor;
            }
          );

          return accessoriesChanged || colorsChanged;
        }
        return false;
      }
    );

    if (hasCustomizations) {
      const encodedState = btoa(JSON.stringify(designSummary));
      setSearchParams({ design: encodedState }, { replace: true });
    } else {
      // Clear URL params if back to defaults
      setSearchParams({}, { replace: true });
    }
  }, [
    // Use stable serialized state instead of object references
    JSON.stringify(getDesignSummary()),
    setSearchParams,
  ]);
};
