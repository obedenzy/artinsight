import React from 'react';
import { DetailedArtwork } from '../../types/artwork';

interface Props {
  artwork: DetailedArtwork;
}

export function ArtworkTechnicalInfo({ artwork }: Props) {
  const techniques = Array.isArray(artwork.techniques) ? artwork.techniques : [];
  const colorPalette = Array.isArray(artwork.colorPalette) ? artwork.colorPalette : [];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">Technique & Craftsmanship</h2>
      <div className="space-y-4">
        <div>
          <p className="text-gray-600">Techniques Used</p>
          <div className="flex flex-wrap gap-2 mt-1">
            {techniques.map((technique, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
              >
                {technique}
              </span>
            ))}
          </div>
        </div>
        <div>
          <p className="text-gray-600">Color Palette</p>
          <div className="flex gap-2 mt-1">
            {colorPalette.map((color, index) => (
              <div
                key={index}
                className="w-8 h-8 rounded-full border border-gray-200"
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
          </div>
        </div>
        <div>
          <p className="text-gray-600">Composition</p>
          <p className="font-medium">{artwork.composition}</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-gray-600">Perspective</p>
            <p className="font-medium">{artwork.perspective}</p>
          </div>
          <div>
            <p className="text-gray-600">Texture</p>
            <p className="font-medium">{artwork.texture}</p>
          </div>
          <div>
            <p className="text-gray-600">Lighting</p>
            <p className="font-medium">{artwork.lighting}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
