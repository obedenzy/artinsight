import React from 'react';
import { DetailedArtwork } from '../../types/artwork';
import { BookOpen } from 'lucide-react';

interface Props {
  artwork: DetailedArtwork;
}

export function ArtworkPhilosophy({ artwork }: Props) {
  if (!artwork.philosophicalContext) return null;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center gap-2 mb-4">
        <BookOpen className="w-6 h-6 text-violet-600" />
        <h2 className="text-2xl font-bold">Symbolism & Philosophy</h2>
      </div>
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold mb-2">Philosophical Context</h3>
          <p className="text-gray-800">{artwork.philosophicalContext}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Symbolic Elements</h3>
          <div className="grid gap-4 md:grid-cols-2">
            {artwork.symbols.map((symbol, index) => (
              <div key={index} className="bg-violet-50 p-4 rounded-lg">
                <p className="font-semibold text-violet-900">{symbol.element}</p>
                <p className="text-violet-700 mt-1">{symbol.meaning}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
