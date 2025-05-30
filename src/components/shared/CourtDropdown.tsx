import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { CourtType } from '../../types/court';

interface CourtOption {
  value: CourtType;
  label: string;
  icon: string;
}

interface CourtDropdownProps {
  selectedCourt: CourtType;
  onCourtChange: (court: CourtType) => void;
  className?: string;
}

const COURT_OPTIONS: CourtOption[] = [
  { value: 'basketball', label: 'Basketball', icon: '🏀' },
  { value: 'tennis', label: 'Tennis', icon: '🎾' },
  { value: 'pickleball', label: 'Pickleball', icon: '🏓' }
];

const CourtDropdown: React.FC<CourtDropdownProps> = ({
  selectedCourt,
  onCourtChange,
  className = ""
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = COURT_OPTIONS.find(option => option.value === selectedCourt);

  const handleOptionSelect = (court: CourtType) => {
    onCourtChange(court);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
      >
        <div className="flex items-center">
          <span className="text-lg mr-3">{selectedOption?.icon}</span>
          <span className="font-medium text-gray-800">{selectedOption?.label}</span>
        </div>
        <ChevronDown 
          className={`w-4 h-4 text-gray-500 transform transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`} 
        />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown Menu */}
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
            {COURT_OPTIONS.map((option) => (
              <button
                key={option.value}
                onClick={() => handleOptionSelect(option.value)}
                className={`w-full flex items-center px-4 py-3 text-left hover:bg-gray-50 transition-colors first:rounded-t-lg last:rounded-b-lg ${
                  option.value === selectedCourt ? 'bg-primary/5 text-primary' : 'text-gray-700'
                }`}
              >
                <span className="text-lg mr-3">{option.icon}</span>
                <span className="font-medium">{option.label}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CourtDropdown;
