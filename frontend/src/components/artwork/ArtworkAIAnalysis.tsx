import React from 'react';
import { DetailedArtwork } from '../../types/artwork';
import { Brain } from 'lucide-react';

interface Props {
  artwork: DetailedArtwork;
}

export function ArtworkAIAnalysis({ artwork }: Props) {
  if (!artwork.aiAnalysis) return null;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center gap-2 mb-4">
        <Brain className="w-6 h-6 text-purple-600" />
        <h2 className="text-2xl font-bold">AI Analysis</h2>
      </div>
      <div className="space-y-4">
        <div>
          <p className="text-gray-600">Authenticity Score</p>
          <div className="mt-1 bg-gray-100 rounded-full h-4">
            <div
              className="bg-purple-600 h-full rounded-full"
              style={{ width: `${artwork.aiAnalysis.authenticityScore * 100}%` }}
            />
          </div>
          <p className="text-sm text-gray-600 mt-1">
            {(artwork.aiAnalysis.authenticityScore * 100).toFixed(1)}% confidence
          </p>
        </div>

        <div>
          <p className="text-gray-600">Hidden Details Discovered</p>
          <ul className="mt-2 space-y-2">
            {artwork.aiAnalysis.hiddenDetails.map((detail, index) => (
              <li key={index} className="bg-purple-50 p-3 rounded-md text-purple-800">
                {detail}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-gray-600">Style Analysis Confidence</p>
          <div className="mt-1 bg-gray-100 rounded-full h-4">
            <div
              className="bg-purple-600 h-full rounded-full"
              style={{ width: `${artwork.aiAnalysis.styleConfidence * 100}%` }}
            />
          </div>
          <p className="text-sm text-gray-600 mt-1">
            {(artwork.aiAnalysis.styleConfidence * 100).toFixed(1)}% match with identified style
          </p>
        </div>
      </div>
    </div>
  );
}
