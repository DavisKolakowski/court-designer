import React from 'react';
import { CourtType } from '../../types/court';

interface AccessoriesToggleProps {
  selectedCourt: CourtType;
  showAccessories: boolean;
  onToggle: () => void;
  className?: string;
}

const ACCESSORY_LABELS: Record<CourtType, string> = {
  basketball: 'Show Basketball Hoops',
  tennis: 'Show Tennis Net',
  pickleball: 'Show Pickleball Net'
};

const AccessoriesToggle: React.FC<AccessoriesToggleProps> = ({
  selectedCourt,
  showAccessories,
  onToggle,
  className = ""
}) => {
  const label = ACCESSORY_LABELS[selectedCourt];

  return (
    <section className={`bg-gray-50 rounded-lg p-4 ${className}`}>
      <h3 className="font-medium text-gray-800 mb-3">Court Accessories</h3>
      <label className="flex items-center justify-between cursor-pointer">
        <span className="text-sm text-gray-600">{label}</span>
        <div className="relative">
          <input 
            type="checkbox" 
            checked={showAccessories}
            onChange={onToggle}
            className="sr-only"
          />
          <div className={`w-11 h-6 rounded-full shadow-inner transition-colors ${
            showAccessories ? 'bg-primary' : 'bg-gray-300'
          }`} />
          <div className={`absolute inset-y-0 w-6 h-6 bg-white rounded-full shadow transform transition-transform ${
            showAccessories ? 'translate-x-5' : 'translate-x-0'
          }`} />
        </div>
      </label>
    </section>
  );
};

export default AccessoriesToggle;
