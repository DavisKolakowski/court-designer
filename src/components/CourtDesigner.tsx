import React from "react";
import { CourtType } from "../types/court";
import { useDesignInteractions } from "../hooks/useDesignInteractions";
import { useDesignUrlState } from "../hooks/useDesignUrlState";
import DesignLayout from "./layout/DesignLayout";

interface CourtDesignerProps {
  selectedCourt: CourtType;
}

const CourtDesigner: React.FC<CourtDesignerProps> = ({ selectedCourt }) => {
  const {
    courtDesign,
    handleCourtChange,
    handleElementSelect,
    handleColorSelect,
    handleAccessoryToggle,
    handleOverlayToggle,
    getLegacyAppliedColors
  } = useDesignInteractions(selectedCourt);

  // Handle URL state synchronization
  useDesignUrlState({ courtDesign, selectedCourt });

  return (
    <DesignLayout
      selectedCourt={selectedCourt}
      selectedElement={courtDesign.selectedElement}
      selectedColor={courtDesign.selectedColor}
      showAccessories={courtDesign.showAccessories}
      overlays={courtDesign.overlays}
      appliedColors={getLegacyAppliedColors()}
      designSummary={courtDesign.getDesignSummary()}
      onCourtChange={handleCourtChange}
      onElementSelect={handleElementSelect}
      onColorSelect={handleColorSelect}
      onAccessoryToggle={handleAccessoryToggle}
      onOverlayToggle={handleOverlayToggle}
    />
  );
};

export default CourtDesigner;
