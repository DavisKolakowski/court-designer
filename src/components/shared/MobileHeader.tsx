import React from 'react';
import { CourtType } from '../../types/court';
import { getCourtSpecification } from '../../utils/courtHelpers';

interface MobileHeaderProps {
  selectedCourt: CourtType;
  onCustomizeClick: () => void;
  className?: string;
}

const MobileHeader: React.FC<MobileHeaderProps> = ({
  selectedCourt,
  onCustomizeClick,
  className = ""
}) => {
  const courtName = selectedCourt.charAt(0).toUpperCase() + selectedCourt.slice(1);
  const specification = getCourtSpecification(selectedCourt);

  return (
    <div className={`bg-white border-b border-gray-200 p-4 flex items-center justify-between ${className}`}>
      <div>
        <h1 className="text-lg font-semibold text-gray-800">
          {courtName} Court
        </h1>
        <p className="text-sm text-gray-500">
          {specification}
        </p>
      </div>
      <button
        onClick={onCustomizeClick}
        className="px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-opacity-90 transition-colors"
      >
        Customize
      </button>
    </div>
  );
};

export default MobileHeader;
