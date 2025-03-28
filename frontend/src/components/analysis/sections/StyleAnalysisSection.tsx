import React from 'react';
import { Brush } from 'lucide-react';
import { AnalyzedArtwork } from '../../../types/artwork';

interface Props {
  artwork: AnalyzedArtwork;
}

export function StyleAnalysisSection({ artwork }: Props) {
  return (
    <div className="bg-white rounded-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <Brush className="w-5 h-5 text-purple-600" />
        <h3 className="text-lg font-semibold">Style Analysis</h3>
      </div>
      <div className="space-y-4">
        <div>
          <p className="text-gray-600">Style</p>
          <p className="font-medium">{artwork.analysis.style}</p>
        </div>
        <div>
          <p className="text-gray-600">Period</p>
          <p className="font-medium">{artwork.analysis.period}</p>
        </div>
        <div>
          <p className="text-gray-600">Confidence</p>
          <div className="mt-1 bg-gray-100 rounded-full h-2">
            <div
              className="bg-purple-600 h-full rounded-full"
              style={{ width: `${artwork.analysis.confidence * 100}%` }}
            />
          </div>
          <p className="text-sm text-gray-600 mt-1">
            {(artwork.analysis.confidence * 100).toFixed(1)}% confidence
          </p>
        </div>
      </div>
    </div>
  );
}
