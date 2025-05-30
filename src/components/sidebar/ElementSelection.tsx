import React from 'react';
import { CourtType, ElementType } from '../../types/court';

interface ElementSelectionProps {
  selectedCourt: CourtType;
  selectedElement: ElementType;
  onElementSelect: (element: ElementType) => void;
  className?: string;
}

const ELEMENT_LABELS: Record<ElementType, string> = {
  // Common elements
  'base-background': 'Background',
  // Basketball elements
  'playing-area': 'Playing Area',
  'lines': 'Court Lines',
  'three-point': 'Three Point Area',
  'center-circle': 'Center Circle',
  'three-second-area': 'Three Second Area',
  // Tennis elements
  'tennis-playing-area': 'Playing Area',
  'tennis-lines': 'Court Lines',
  // Pickleball elements
  'pickleball-kitchen': 'Kitchen',
  'pickleball-service-area': 'Service Area',
  'pickleball-lines': 'Court Lines'
};

const getElementsForCourt = (court: CourtType): ElementType[] => {
  switch (court) {
    case 'basketball':
      return ['base-background', 'playing-area', 'lines', 'three-point', 'center-circle', 'three-second-area'];
    case 'tennis':
      return ['base-background', 'tennis-playing-area', 'tennis-lines'];
    case 'pickleball':
      return ['base-background', 'pickleball-kitchen', 'pickleball-service-area', 'pickleball-lines'];
    default:
      return ['base-background', 'playing-area', 'lines'];
  }
};

const getElementLabel = (element: ElementType): string => {
  return ELEMENT_LABELS[element] || element;
};

const ElementSelection: React.FC<ElementSelectionProps> = ({
  selectedCourt,
  selectedElement,
  onElementSelect,
  className = ""
}) => {
  const elements = getElementsForCourt(selectedCourt);

  return (
    <section className={className}>
      <h3 className="font-medium text-gray-800 mb-4">Apply Color To</h3>
      <div className="space-y-2">
        {elements.map((element) => {
          const isSelected = selectedElement === element;
          
          return (
            <button
              key={element}
              onClick={() => onElementSelect(element)}
              className={`w-full text-left p-3 rounded-lg border transition-colors ${
                isSelected
                  ? 'bg-primary border-primary text-white font-medium'
                  : 'bg-gray-50 hover:bg-gray-100 border-gray-200 text-gray-700'
              }`}
            >
              {getElementLabel(element)}
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default ElementSelection;
