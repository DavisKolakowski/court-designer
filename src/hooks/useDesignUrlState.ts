import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { CourtType, ElementType, CourtOverlays } from "../types/court";
import { getDefaultElementColors, getElementsForCourt } from "../utils/courtHelpers";

interface UseDesignUrlStateProps {
  courtDesign: any; // From useCourtDesign hook
  selectedCourt: CourtType;
}

export const useDesignUrlState = ({
  courtDesign,
  selectedCourt,
}: UseDesignUrlStateProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

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
              courtDesign.updateOverlays(courtData);
            } else if (
              ["basketball", "tennis", "pickleball"].includes(courtType)
            ) {
              const court = courtType as CourtType;
              // Apply colors for this court
              Object.entries(courtData.colors).forEach(
                ([element, color]: [string, any]) => {
                  courtDesign.updateCourtColor(
                    court,
                    element as ElementType,
                    color
                  );
                }
              );
              // Apply accessories setting
              courtDesign.updateCourtAccessories(
                court,
                courtData.showAccessories
              );
            }
          }
        );
      } catch (e) {
        console.warn("Failed to parse design from URL:", e);
      }    } else {
      // If no design param, reset to defaults to ensure clean state but preserve current court
      courtDesign.resetState(true);
    }
    
    // Ensure selectedElement is valid for the current court and selectedColor matches
    const validElements = getElementsForCourt(selectedCourt);
    const currentSelectedElement = courtDesign.selectedElement;
    
    // If current selected element is not valid for this court type, use the first valid element
    if (!validElements.includes(currentSelectedElement)) {
      const firstElement = validElements[0];
      const elementColor = courtDesign.getCourtColor(selectedCourt, firstElement);
      courtDesign.updateState({ 
        selectedCourt,
        selectedElement: firstElement,
        selectedColor: elementColor
      });
    } else {
      // Element is valid, but ensure the color matches
      const elementColor = courtDesign.getCourtColor(selectedCourt, currentSelectedElement);
      courtDesign.updateState({ 
        selectedCourt,
        selectedColor: elementColor
      });
    }
  }, [selectedCourt, searchParams.get("design")]);// Only depend on the actual design param value  // Update URL when significant state changes occur (for sharing)
  useEffect(() => {
    // Only update URL if there's actual design data beyond defaults
    const designSummary = courtDesign.getDesignSummary();
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
    JSON.stringify(courtDesign.getDesignSummary()),
    setSearchParams,
  ]);
};
