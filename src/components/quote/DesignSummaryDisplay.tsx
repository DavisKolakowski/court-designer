import React from 'react';
import { CourtType, CourtOverlays } from '../../types/court';
import { getColorName } from '../../data/colors';

interface DesignSummaryDisplayProps {
  courtType: CourtType;
  appliedColors: Record<string, string>;
  showAccessories: boolean;
  overlays: CourtOverlays;
  designSummary?: Record<string, any>;
  className?: string;
}

const ELEMENT_LABELS: Record<string, string> = {
  'base-background': 'Background',
  'playing-area': 'Playing Area',
  'lines': 'Court Lines',
  'three-point': 'Three Point Area',
  'center-circle': 'Center Circle',
  'three-second-area': 'Three Second Area',
  'tennis-playing-area': 'Playing Area',
  'tennis-lines': 'Court Lines',
  'pickleball-kitchen': 'Kitchen',
  'pickleball-service-area': 'Service Area',
  'pickleball-lines': 'Court Lines'
};

const getElementsForCourt = (court: CourtType): string[] => {
  switch (court) {
    case 'basketball':
      return ['base-background', 'playing-area', 'lines', 'three-point', 'center-circle', 'three-second-area'];
    case 'tennis':
      return ['base-background', 'tennis-playing-area', 'tennis-lines'];
    case 'pickleball':
      return ['base-background', 'pickleball-kitchen', 'pickleball-service-area', 'pickleball-lines'];
    default:
      return ['base-background'];
  }
};

const getElementLabel = (element: string): string => {
  return ELEMENT_LABELS[element] || element.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
};

const getElementColor = (
  element: string, 
  courtType: CourtType, 
  appliedColors: Record<string, string>, 
  designSummary?: Record<string, any>
): string => {
  // First try to get from designSummary for current court
  if (designSummary && designSummary[courtType] && designSummary[courtType].colors && designSummary[courtType].colors[element]) {
    return designSummary[courtType].colors[element];
  }
  
  // Fallback to appliedColors (legacy format)
  const legacyKey = `${courtType}-${element}`;
  if (appliedColors[legacyKey]) {
    return appliedColors[legacyKey];
  }
  
  // Default colors
  const defaults: Record<string, string> = {
    'base-background': '#6c6d6f',
    'playing-area': '#233e6d',
    'lines': '#ffffff',
    'three-point': '#1a3054',
    'center-circle': '#1a3054',
    'three-second-area': '#1a3054',
    'tennis-playing-area': '#7b3522',
    'tennis-lines': '#ffffff',
    'pickleball-kitchen': '#233e6d',
    'pickleball-service-area': '#445f43',
    'pickleball-lines': '#ffffff'
  };
  
  return defaults[element] || '#6c6d6f';
};

const DesignSummaryDisplay: React.FC<DesignSummaryDisplayProps> = ({
  courtType,
  appliedColors,
  showAccessories,
  overlays,
  designSummary,
  className = ""
}) => {
  const courtElements = getElementsForCourt(courtType);
  const showAccessoriesValue = designSummary && designSummary[courtType] 
    ? designSummary[courtType].showAccessories 
    : showAccessories;

  const enabledOverlays = Object.entries(overlays)
    .filter(([_, enabled]) => enabled)
    .map(([type, _]) => type.charAt(0).toUpperCase() + type.slice(1))
    .join(', ') || 'None';

  return (
    <section className={`bg-gray-50 rounded-lg p-4 ${className}`}>
      <h3 className="font-medium text-gray-800 mb-3">Your Design Summary</h3>
      <div className="text-sm text-gray-600 space-y-2">
        <p>
          <strong>Primary Court:</strong> {courtType.charAt(0).toUpperCase() + courtType.slice(1)}
        </p>
        
        {/* Show ALL components for current court type */}
        <div className="mt-3">
          <p className="font-medium text-gray-700 mb-2">Court Components:</p>
          <ul className="ml-4 space-y-1">
            {courtElements.map((element) => {
              const color = getElementColor(element, courtType, appliedColors, designSummary);
              return (
                <li key={element} className="flex items-center">
                  <div 
                    className="w-4 h-4 rounded border border-gray-300 mr-2 flex-shrink-0" 
                    style={{ backgroundColor: color }}
                    aria-label={`Color: ${getColorName(color)}`}
                  />
                  <span className="truncate">
                    {getElementLabel(element)}: {getColorName(color)}
                  </span>
                </li>
              );
            })}
            <li>
              <strong>Accessories ({courtType === 'basketball' ? 'Hoops' : 'Net'}):</strong>{' '}
              {showAccessoriesValue ? 'Included' : 'Not Included'}
            </li>
          </ul>
        </div>
        
        <p>
          <strong>Court Overlays:</strong> {enabledOverlays}
        </p>
      </div>
    </section>
  );
};

export default DesignSummaryDisplay;
