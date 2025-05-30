import React from 'react';
import { CourtType, ElementType, CourtOverlays } from '../../types/court';
import { getCourtSpecification, getElementLabel } from '../../utils/courtHelpers';
import CourtSVG from './CourtSVG';

interface CourtDisplayProps {
  selectedCourt: CourtType;
  appliedColors: Record<string, string>;
  showAccessories: boolean;
  overlays: CourtOverlays;
  selectedElement?: ElementType;
  isMobile?: boolean;
  className?: string;
}

const CourtDisplay: React.FC<CourtDisplayProps> = ({
  selectedCourt,
  appliedColors,
  showAccessories,
  overlays,
  selectedElement,
  isMobile = false,
  className = ""
}) => {
  const courtName = selectedCourt.charAt(0).toUpperCase() + selectedCourt.slice(1);
  const specification = getCourtSpecification(selectedCourt);

  return (
    <div className={`h-full bg-white rounded-lg shadow-sm p-4 flex flex-col ${className}`}>
      {/* Court Header - Desktop only */}
      {!isMobile && (
        <div className="text-center mb-4">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            {courtName} Court
          </h1>
          <p className="text-gray-600">
            Select colors from the sidebar to customize your court design
          </p>
        </div>
      )}

      {/* Mobile Instructions */}
      {isMobile && (
        <div className="text-center mb-4">
          <p className="text-gray-600">
            Tap "Customize" to select colors and customize your court design
          </p>
        </div>
      )}

      {/* Court SVG - Center */}
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-4xl">
          <CourtSVG
            selectedCourt={selectedCourt}
            appliedColors={appliedColors}
            showAccessories={showAccessories}
            overlays={overlays}
          />
        </div>
      </div>

      {/* Mobile Selected Element - Bottom of court container */}
      {isMobile && selectedElement && (
        <div className="text-center p-3 bg-white border-t border-gray-200">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
            Selected Element
          </p>
          <p className="text-sm font-medium text-gray-800">
            {getElementLabel(selectedElement)}
          </p>
        </div>
      )}
      
      {/* Court Info - Bottom (Desktop only) */}
      {!isMobile && (
        <div className="p-4 bg-gray-50 rounded-lg mt-4 flex justify-between items-end">
          {/* Court Specs */}
          <div>
            <h3 className="font-semibold text-gray-800">
              {courtName} Court
            </h3>
            <p className="text-sm text-gray-600">
              {specification}
            </p>
          </div>
          
          {/* Selected Element */}
          {selectedElement && (
            <div className="text-right">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                Selected Element
              </p>
              <p className="text-sm font-medium text-gray-800">
                {getElementLabel(selectedElement)}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CourtDisplay;
