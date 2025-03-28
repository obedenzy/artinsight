import React from 'react';
import { DetailedArtwork } from '../../types/artwork';

interface Props {
  artwork: DetailedArtwork;
}

export function ArtworkCriticalInfo({ artwork }: Props) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">Critical Reception & Impact</h2>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-2">Critical Reception</h3>
          <p className="text-gray-800">{artwork.criticalReception}</p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Cultural Impact</h3>
          <p className="text-gray-800">{artwork.culturalImpact}</p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Current Significance</h3>
          <p className="text-gray-800">{artwork.currentSignificance}</p>
        </div>

        {artwork.controversies && artwork.controversies.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-2">Controversies</h3>
            <div className="space-y-2">
              {artwork.controversies.map((controversy, index) => (
                <div key={index} className="bg-red-50 p-4 rounded-md text-red-800">
                  {controversy}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
