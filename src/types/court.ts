export type CourtType = 'basketball' | 'tennis' | 'pickleball';

export type GlobalElement = 'base-background';

export type BasketballElement = 
  | 'playing-area' 
  | 'lines' 
  | 'three-point' 
  | 'center-circle' 
  | 'three-second-area';

export type TennisElement = 
  | 'tennis-playing-area' 
  | 'tennis-lines';

export type PickleballElement = 
  | 'pickleball-kitchen' 
  | 'pickleball-service-area' 
  | 'pickleball-lines';

export type ElementType = 
  | GlobalElement
  | BasketballElement
  | TennisElement
  | PickleballElement;

export interface CourtOverlays {
  basketball: boolean;
  tennis: boolean;
  pickleball: boolean;
}

export interface ColorOption {
  name: string;
  hex: string;
}
