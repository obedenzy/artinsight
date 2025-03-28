import React from 'react';
import { DetailedArtwork } from '../../types/artwork';

interface Props {
  artwork: DetailedArtwork;
}

export function ArtworkStyleInfo({ artwork }: Props) {
  // Add null checks and default values
  const influences = artwork.influences || [];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">Style & Movement</h2>
      <div className="space-y-4">
        <div>
          <p className="text-gray-600">Art Style</p>
          <p className="font-medium">{artwork.style}</p>
        </div>
        <div>
          <p className="text-gray-600">Art Movement</p>
          <p className="font-medium">{artwork.movement}</p>
        </div>
        <div>
          <p className="text-gray-600">Influences</p>
          <div className="flex flex-wrap gap-2 mt-1">
            {influences.map((influence, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm"
              >
                {influence}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
