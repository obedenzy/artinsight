import React from 'react';
import { DetailedArtwork } from '../../types/artwork';
import { Sparkles } from 'lucide-react';

interface Props {
  artwork: DetailedArtwork;
}

export function ArtworkFunFacts({ artwork }: Props) {
  if (!artwork.funFacts?.length) return null;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-6 h-6 text-yellow-500" />
        <h2 className="text-2xl font-bold">Fun Facts</h2>
      </div>
      <div className="space-y-3">
        {artwork.funFacts.map((fact, index) => (
          <div
            key={index}
            className="bg-yellow-50 p-4 rounded-md text-yellow-800 border border-yellow-200"
          >
            {fact}
          </div>
        ))}
        {artwork.artistSignature && (
          <div className="mt-4">
            <p className="text-gray-600 mb-2">Artist's Signature</p>
            <div className="bg-gray-50 p-3 rounded-md">
              <p className="font-medium">{artwork.artistSignature}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
