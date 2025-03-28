import React from 'react';
import { DetailedArtwork } from '../../types/artwork';

interface Props {
  artwork: DetailedArtwork;
}

export function ArtworkSubjectInfo({ artwork }: Props) {
  // Add null checks and default values
  const symbols = artwork.symbols || [];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">Subject Matter</h2>
      <div className="space-y-4">
        <div>
          <p className="text-gray-600">Theme</p>
          <p className="font-medium">{artwork.theme}</p>
        </div>
        {artwork.narrative && (
          <div>
            <p className="text-gray-600">Narrative</p>
            <p className="font-medium">{artwork.narrative}</p>
          </div>
        )}
        <div>
          <p className="text-gray-600">Symbols</p>
          <div className="mt-2 space-y-2">
            {symbols.map((symbol, index) => (
              <div key={index} className="bg-gray-50 p-3 rounded-md">
                <p className="font-medium">{symbol.element}</p>
                <p className="text-gray-600 text-sm">{symbol.meaning}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="text-gray-600">Subject Type</p>
          <p className="font-medium capitalize">{artwork.subjectType}</p>
        </div>
      </div>
    </div>
  );
}
