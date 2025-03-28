import React from 'react';
import { Palette } from 'lucide-react';
import { AnalyzedArtwork } from '../../../types/artwork';

interface Props {
  artwork: AnalyzedArtwork;
}

export function ColorSection({ artwork }: Props) {
  return (
    <div className="bg-white rounded-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <Palette className="w-5 h-5 text-purple-600" />
        <h3 className="text-lg font-semibold">Color Analysis</h3>
      </div>
      <div className="space-y-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {artwork.analysis.colors.map((color, index) => (
            <div key={index} className="text-center">
              <div
                className="w-full aspect-square rounded-lg shadow-md mb-2"
                style={{ backgroundColor: color }}
              />
              <p className="text-sm font-mono">{color}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
