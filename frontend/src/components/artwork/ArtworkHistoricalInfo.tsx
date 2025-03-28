import React from 'react';
import { DetailedArtwork } from '../../types/artwork';

interface Props {
  artwork: DetailedArtwork;
}

export function ArtworkHistoricalInfo({ artwork }: Props) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">Historical Context</h2>
      <div className="space-y-4">
        <div>
          <p className="text-gray-600">Historical Period</p>
          <p className="font-medium">{artwork.historicalPeriod}</p>
        </div>
        <div>
          <p className="text-gray-600">Cultural Background</p>
          <p className="font-medium">{artwork.culturalBackground}</p>
        </div>
        {artwork.politicalContext && (
          <div>
            <p className="text-gray-600">Political/Social Context</p>
            <p className="font-medium">{artwork.politicalContext}</p>
          </div>
        )}
      </div>
    </div>
  );
}
