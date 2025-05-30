import React from 'react';
import { CourtType } from '../../types/court';
import CourtSelectionButton from './CourtSelectionButton';

interface CourtOption {
  type: CourtType;
  icon: string;
  label: string;
  borderColor: string;
  hoverBorderColor: string;
}

interface CourtSelectionGridProps {
  onCourtSelect: (court: CourtType) => void;
  className?: string;
}

const COURT_OPTIONS: CourtOption[] = [
  {
    type: 'basketball',
    icon: '🏀',
    label: 'Basketball',
    borderColor: 'border-orange-200',
    hoverBorderColor: 'hover:border-orange-300'
  },
  {
    type: 'tennis',
    icon: '🎾',
    label: 'Tennis',
    borderColor: 'border-green-200',
    hoverBorderColor: 'hover:border-green-300'
  },
  {
    type: 'pickleball',
    icon: '🏓',
    label: 'Pickleball',
    borderColor: 'border-purple-200',
    hoverBorderColor: 'hover:border-purple-300'
  }
];

const CourtSelectionGrid: React.FC<CourtSelectionGridProps> = ({
  onCourtSelect,
  className = ""
}) => {
  return (
    <div className={`flex flex-col sm:flex-row sm:justify-center sm:space-x-4 space-y-4 sm:space-y-0 ${className}`}>
      {COURT_OPTIONS.map((option) => (
        <CourtSelectionButton
          key={option.type}
          courtType={option.type}
          icon={option.icon}
          label={option.label}
          borderColor={option.borderColor}
          hoverBorderColor={option.hoverBorderColor}
          onClick={onCourtSelect}
        />
      ))}
    </div>
  );
};

export default CourtSelectionGrid;
