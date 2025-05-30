import { PLAYERS_CHOICE_COLORS, SPECIALTY_COLORS } from "../../data/colors";

interface ColorPickerProps {
  selectedColor: string;
  onColorSelect: (color: string) => void;
}

const ColorPicker = ({ selectedColor, onColorSelect }: ColorPickerProps) => {
  const renderColorGrid = (colors: Array<{ name: string; hex: string }>, title: string) => (
    <div>
      <h3 className="font-medium text-gray-800 mb-4">{title}</h3>
      <div className="grid grid-cols-5 gap-2">
        {colors.map((color) => (
          <button
            key={color.hex}
            onClick={() => onColorSelect(color.hex)}
            className={`w-10 h-10 rounded-lg border-2 transition-colors ${
              selectedColor === color.hex 
                ? 'border-gray-800 ring-2 ring-gray-400' 
                : 'border-gray-200 hover:border-gray-400'
            }`}
            style={{ backgroundColor: color.hex }}
            title={color.name}
          />
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {renderColorGrid(PLAYERS_CHOICE_COLORS, "Player's Choice Colors")}
      {renderColorGrid(SPECIALTY_COLORS, "Specialty Colors")}
    </div>
  );
};

export default ColorPicker;
