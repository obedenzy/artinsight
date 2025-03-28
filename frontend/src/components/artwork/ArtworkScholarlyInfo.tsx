import React from 'react';
import { DetailedArtwork } from '../../types/artwork';

interface Props {
  artwork: DetailedArtwork;
}

export function ArtworkScholarlyInfo({ artwork }: Props) {
  if (!artwork.scholarlyAnalysis?.length) return null;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">Scholarly Analysis</h2>
      <div className="space-y-4">
        {artwork.scholarlyAnalysis.map((analysis, index) => (
          <div key={index} className="bg-gray-50 p-4 rounded-md">
            <blockquote className="text-gray-800 italic mb-2">
              "{analysis.summary}"
            </blockquote>
            <div className="text-sm text-gray-600">
              <p className="font-medium">{analysis.author}</p>
              <p>{analysis.publication}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
