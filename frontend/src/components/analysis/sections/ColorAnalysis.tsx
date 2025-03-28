import React from 'react';
import { AnalyzedArtwork } from '../../../types/artwork';
import { Palette } from 'lucide-react';

interface Props {
  artwork: AnalyzedArtwork;
}

export function ColorAnalysis({ artwork }: Props) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center gap-2 mb-4">
        <Palette className="w-5 h-5 text-purple-600" />
        <h3 className="text-lg font-semibold">Color Palette</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {artwork.analysis.colors.map((color, index) => (
          <div key={index} className="space-y-1">
            <div
              className="w-12 h-12 rounded-lg shadow-md"
              style={{ backgroundColor: color }}
            />
            <p className="text-xs text-center font-mono">{color}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
