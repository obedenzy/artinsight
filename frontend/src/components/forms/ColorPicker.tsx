import React from 'react';
import { X } from 'lucide-react';

interface Props {
  colors: string[];
  onAddColor: (color: string) => void;
  onRemoveColor: (index: number) => void;
}

const PRESET_COLORS = [
  '#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF',
  '#FFFF00', '#FF00FF', '#00FFFF', '#800000', '#008000',
  '#000080', '#808000', '#800080', '#008080', '#808080'
];

export function ColorPicker({ colors, onAddColor, onRemoveColor }: Props) {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {colors.map((color, index) => (
          <div key={index} className="relative group">
            <div
              className="w-8 h-8 rounded border border-gray-200"
              style={{ backgroundColor: color }}
            />
            <button
              type="button"
              onClick={() => onRemoveColor(index)}
              className="absolute -top-1 -right-1 bg-white rounded-full p-0.5 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="w-3 h-3 text-gray-500" />
            </button>
          </div>
        ))}
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Choose from presets or pick a custom color
        </label>
        <div className="flex flex-wrap gap-2">
          {PRESET_COLORS.map((color) => (
            <button
              key={color}
              type="button"
              onClick={() => onAddColor(color)}
              className="w-8 h-8 rounded border border-gray-200 hover:scale-110 transition-transform"
              style={{ backgroundColor: color }}
            />
          ))}
          <input
            type="color"
            onChange={(e) => onAddColor(e.target.value)}
            className="w-8 h-8 p-1 rounded border border-gray-200"
          />
        </div>
      </div>
    </div>
  );
}
