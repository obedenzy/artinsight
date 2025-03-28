import React from 'react';
import { DetailedArtwork } from '../../types/artwork';
import { Target } from 'lucide-react';

interface Props {
  artwork: DetailedArtwork;
}

export function ArtworkIntention({ artwork }: Props) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center gap-2 mb-4">
        <Target className="w-6 h-6 text-indigo-600" />
        <h2 className="text-2xl font-bold">Artist's Intention</h2>
      </div>
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold mb-2">Purpose</h3>
          <p className="text-gray-800">{artwork.purpose}</p>
        </div>
        {artwork.inspiration && (
          <div>
            <h3 className="text-lg font-semibold mb-2">Inspiration</h3>
            <p className="text-gray-800">{artwork.inspiration}</p>
          </div>
        )}
        {artwork.intendedMessage && (
          <div>
            <h3 className="text-lg font-semibold mb-2">Intended Message</h3>
            <p className="text-gray-800">{artwork.intendedMessage}</p>
          </div>
        )}
      </div>
    </div>
  );
}
