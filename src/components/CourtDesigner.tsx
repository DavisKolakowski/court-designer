import React from "react";
import { CourtType } from "../types/court";
import { useCourtDesignStore } from "../stores/courtDesignStore";
import { useDesignInteractions } from "../hooks/useDesignInteractions";
import { useDesignUrlState } from "../hooks/useDesignUrlState";
import DesignLayout from "./layout/DesignLayout";

interface CourtDesignerProps {
  selectedCourt: CourtType;
}

const CourtDesigner: React.FC<CourtDesignerProps> = ({ selectedCourt }) => {
  const {
    handleCourtChange,
    handleElementSelect,
    handleColorSelect,
    handleAccessoryToggle,
    handleOverlayToggle,
    getLegacyAppliedColors
  } = useDesignInteractions(selectedCourt);

  const isHydrated = useCourtDesignStore(state => state.isHydrated);
  const selectedElement = useCourtDesignStore(state => state.selectedElement);
  const selectedColor = useCourtDesignStore(state => state.selectedColor);
  const showAccessories = useCourtDesignStore(state => state.designState[selectedCourt].showAccessories);
  const overlays = useCourtDesignStore(state => state.designState.overlays);
  const getDesignSummary = useCourtDesignStore(state => state.getDesignSummary);

  // Handle URL state synchronization
  useDesignUrlState({ selectedCourt });

  // Show loading state while store is hydrating from localStorage
  if (!isHydrated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <div className="inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-600">Loading your design...</p>
        </div>
      </div>
    );
  }

  return (
    <DesignLayout
      selectedCourt={selectedCourt}
      selectedElement={selectedElement}
      selectedColor={selectedColor}
      showAccessories={showAccessories}
      overlays={overlays}
      appliedColors={getLegacyAppliedColors()}
      designSummary={getDesignSummary()}
      onCourtChange={handleCourtChange}
      onElementSelect={handleElementSelect}
      onColorSelect={handleColorSelect}
      onAccessoryToggle={handleAccessoryToggle}
      onOverlayToggle={handleOverlayToggle}
    />
  );
};

export default CourtDesigner;
