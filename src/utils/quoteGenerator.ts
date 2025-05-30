import { CourtType, CourtOverlays } from '../types/court';
import { getElementsForCourt, getElementLabel, getDefaultElementColors } from './courtHelpers';
import { getColorName } from '../data/colors';
import { ContactMethod } from '../components/quote/ContactInformationForm';

interface QuoteRequestParams {
  email: string;
  phone: string;
  preferredContact: ContactMethod;
  courtType: CourtType;
  appliedColors: Record<string, string>;
  showAccessories: boolean;
  overlays: CourtOverlays;
  designSummary?: Record<string, any>;
}

export const generateQuoteRequest = ({
  email,
  phone,
  preferredContact,
  courtType,
  appliedColors,
  showAccessories,
  overlays,
  designSummary
}: QuoteRequestParams): string => {
  const courtName = courtType.charAt(0).toUpperCase() + courtType.slice(1);
  
  let request = `COURT DESIGN QUOTE REQUEST\n\n`;
  request += `Customer Contact Information:\n`;
  request += `Email: ${email}\n`;
  if (phone) {
    request += `Phone: ${phone}\n`;
  }
  request += `Preferred Contact Method: ${preferredContact === 'email' ? 'Email' : 'Phone'}\n\n`;
  
  request += `COURT SPECIFICATIONS\n\n`;
  request += `Primary Court: ${courtName}\n`;
  
  // Show ALL components for the current court type
  request += `\n${courtName} Court Components:\n`;
  
  // Get all elements for this court type and show their colors
  const courtElements = getElementsForCourt(courtType);
  const defaults = getDefaultElementColors();
  
  courtElements.forEach(element => {
    const elementLabel = getElementLabel(element);
    const color = getElementColor(element, courtType, appliedColors, designSummary, defaults);
    const colorName = getColorName(color);
    request += `  • ${elementLabel}: ${colorName}\n`;
  });
  
  // Add accessories information
  const showAccessoriesValue = designSummary && designSummary[courtType] 
    ? designSummary[courtType].showAccessories 
    : showAccessories;
  
  request += `  • Accessories (${courtType === 'basketball' ? 'Hoops' : 'Net'}): ${showAccessoriesValue ? 'Included' : 'Not Included'}\n`;
  
  // Add overlay information
  const enabledOverlays = Object.entries(designSummary?.overlays || overlays)
    .filter(([_, enabled]) => enabled)
    .map(([type, _]) => type.charAt(0).toUpperCase() + type.slice(1));
  
  if (enabledOverlays.length > 0) {
    request += `\nCourt Overlays: ${enabledOverlays.join(', ')}\n`;
  } else {
    request += `\nCourt Overlays: None\n`;
  }

  request += `\nRequest Generated: ${new Date().toLocaleDateString()}\n`;
  request += `\nPlease provide a detailed quote for the above court design specifications.`;

  return request;
};

const getElementColor = (
  element: string,
  courtType: CourtType,
  appliedColors: Record<string, string>,
  designSummary?: Record<string, any>,
  defaults?: Record<string, string>
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
  
  // Default colors if not found
  return defaults?.[element] || '#6c6d6f';
};
