import { CourtType, ElementType } from '../types/court';

export const getElementsForCourt = (courtType: CourtType): ElementType[] => {
  switch (courtType) {
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

export const getElementLabel = (element: ElementType): string => {
  const labels: Record<ElementType, string> = {
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
  return labels[element] || element.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
};

export const getCourtSpecification = (courtType: CourtType): string => {
  const specs = {
    basketball: "94' x 50' regulation size",
    tennis: "78' x 36' regulation size",
    pickleball: "44' x 20' regulation size"
  };
  return specs[courtType] || '';
};

export const getDefaultElementColors = (): Record<string, string> => ({
  'base-background': '#6c6d6f', // Gray
  'playing-area': '#233e6d', // Standard Blue
  'lines': '#ffffff', // White
  'three-point': '#1a3054', // Competition Blue
  'center-circle': '#1a3054', // Competition Blue
  'three-second-area': '#1a3054', // Competition Blue
  'tennis-playing-area': '#7b3522', // Classic Red
  'tennis-lines': '#ffffff', // White
  'pickleball-kitchen': '#233e6d', // Standard Blue
  'pickleball-service-area': '#445f43', // Competition Green
  'pickleball-lines': '#ffffff' // White
});

export const COURT_OPTIONS = [
  { value: 'basketball' as const, label: 'Basketball', icon: '🏀' },
  { value: 'tennis' as const, label: 'Tennis', icon: '🎾' },
  { value: 'pickleball' as const, label: 'Pickleball', icon: '🏓' }
];
