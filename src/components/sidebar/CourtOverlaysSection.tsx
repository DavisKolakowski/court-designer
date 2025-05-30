import React from 'react';
import { CourtType, CourtOverlays } from '../../types/court';

interface CourtOverlaysProps {
  selectedCourt: CourtType;
  overlays: CourtOverlays;
  onOverlayToggle: (courtType: CourtType) => void;
  className?: string;
}

const ALL_COURT_TYPES: CourtType[] = ['basketball', 'tennis', 'pickleball'];

const getOverlayOptions = (selectedCourt: CourtType): CourtType[] => {
  return ALL_COURT_TYPES.filter(court => court !== selectedCourt);
};

const formatCourtLabel = (courtType: CourtType): string => {
  return courtType.charAt(0).toUpperCase() + courtType.slice(1);
};

const CourtOverlaysSection: React.FC<CourtOverlaysProps> = ({
  selectedCourt,
  overlays,
  onOverlayToggle,
  className = ""
}) => {
  const overlayOptions = getOverlayOptions(selectedCourt);

  return (
    <section className={`bg-gray-50 rounded-lg p-4 ${className}`}>
      <h3 className="font-medium text-gray-800 mb-3">Overlay Other Courts</h3>
      <div className="space-y-2">
        {overlayOptions.map((courtType) => (
          <label key={courtType} className="flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              checked={overlays[courtType]}
              onChange={() => onOverlayToggle(courtType)}
              className="rounded border-gray-300 text-primary focus:ring-primary"
            />
            <span className="ml-2 text-sm text-gray-600">
              Show {formatCourtLabel(courtType)} Lines
            </span>
          </label>
        ))}
      </div>
    </section>
  );
};

export default CourtOverlaysSection;
