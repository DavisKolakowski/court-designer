import { ColorOption } from '../types/court';

export const PLAYERS_CHOICE_COLORS: ColorOption[] = [
  { name: 'Competition Green', hex: '#445f43' },
  { name: 'Pro Green', hex: '#475b3f' },
  { name: 'Medium Green', hex: '#3d4933' },
  { name: 'Forest Green', hex: '#444b3e' },
  { name: 'Slate', hex: '#525456' },
  { name: 'Gray', hex: '#6c6d6f' },
  { name: 'Competition Blue', hex: '#1a3054' },
  { name: 'Standard Blue', hex: '#233e6d' },
  { name: 'Pro Blue', hex: '#1b3d5c' },
  { name: 'Light Blue', hex: '#23548c' },
  { name: 'Sandstone', hex: '#8c7f6e' },
  { name: 'Beige', hex: '#8e7053' },
  { name: 'Terra Cotta', hex: '#966b53' },
  { name: 'Standard Orange', hex: '#a8593f' },
  { name: 'Classic Red', hex: '#7b3522' },
  { name: 'Brilliant White', hex: '#ffffff' }
];

export const SPECIALTY_COLORS: ColorOption[] = [
  { name: 'Sky Blue', hex: '#82a3d5' },
  { name: 'Caribbean Blue', hex: '#3474a4' },
  { name: 'Sea Green', hex: '#347481' },
  { name: 'Nautical Navy', hex: '#111f2c' },
  { name: 'Pro Purple', hex: '#3f3c5e' },
  { name: 'Ultra Violet', hex: '#542f7e' },
  { name: 'Viva Violet', hex: '#874d97' },
  { name: 'Crimson', hex: '#702c32' },
  { name: 'Bright Red', hex: '#9e2b32' },
  { name: 'Passion Pink', hex: '#e15d96' },
  { name: 'Coral', hex: '#ec6661' },
  { name: 'Bright Orange', hex: '#df7e3b' },
  { name: 'Bright Yellow', hex: '#f3bb47' },
  { name: 'Kiwi', hex: '#79a448' },
  { name: 'Lime', hex: '#5fac45' }
];

export const getColorName = (hex: string): string => {
  const allColors = [...PLAYERS_CHOICE_COLORS, ...SPECIALTY_COLORS];
  const color = allColors.find(c => c.hex.toLowerCase() === hex.toLowerCase());
  return color?.name || 'Custom Color';
};
