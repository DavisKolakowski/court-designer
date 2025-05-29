export type CourtType = 'basketball' | 'tennis' | 'pickleball';

export type ElementType = 
  // Common elements
  | 'base-background'
  // Basketball elements
  | 'playing-area' | 'lines' | 'three-point' | 'center-circle' | 'three-second-area'
  // Tennis elements  
  | 'tennis-playing-area' | 'tennis-lines'
  // Pickleball elements
  | 'pickleball-kitchen' | 'pickleball-service-area' | 'pickleball-lines';

export interface CourtOverlays {
  basketball: boolean;
  tennis: boolean;
  pickleball: boolean;
}

export interface ColorOption {
  name: string;
  hex: string;
}
