import React from 'react';
import { Wrench } from 'lucide-react';
import { AnalyzedArtwork } from '../../../types/artwork';

interface Props {
  artwork: AnalyzedArtwork;
}

export function TechnicalSection({ artwork }: Props) {
  return (
    <div className="bg-white rounded-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <Wrench className="w-5 h-5 text-purple-600" />
        <h3 className="text-lg font-semibold">Technical Details</h3>
      </div>
      <div className="space-y-4">
        <div>
          <p className="text-gray-600">Medium</p>
          <p className="font-medium">{artwork.medium}</p>
        </div>
        <div>
          <p className="text-gray-600">Techniques</p>
          <div className="flex flex-wrap gap-2 mt-1">
            {artwork.techniques.map((technique, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm"
              >
                {technique}
              </span>
            ))}
          </div>
        </div>
        <div>
          <p className="text-gray-600">Dimensions</p>
          <p className="font-medium">
            {artwork.dimensions.height} × {artwork.dimensions.width} {artwork.dimensions.unit}
          </p>
        </div>
      </div>
    </div>
  );
}
