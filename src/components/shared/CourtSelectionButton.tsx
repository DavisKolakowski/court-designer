import React from 'react';
import { CourtType } from '../../types/court';

interface CourtSelectionButtonProps {
  courtType: CourtType;
  icon: string;
  label: string;
  borderColor: string;
  hoverBorderColor: string;
  onClick: (court: CourtType) => void;
  className?: string;
}

const CourtSelectionButton: React.FC<CourtSelectionButtonProps> = ({
  courtType,
  icon,
  label,
  borderColor,
  hoverBorderColor,
  onClick,
  className = ""
}) => {
  return (
    <button
      onClick={() => onClick(courtType)}
      className={`flex items-center justify-center px-8 py-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border-2 ${borderColor} ${hoverBorderColor} ${className}`}
    >
      <span className="text-2xl mr-3">{icon}</span>
      <span className="text-lg font-medium text-gray-800">{label}</span>
    </button>
  );
};

export default CourtSelectionButton;
