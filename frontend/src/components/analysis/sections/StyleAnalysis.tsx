import React from 'react';
import { AnalyzedArtwork } from '../../../types/artwork';
import { Brush } from 'lucide-react';

interface Props {
  artwork: AnalyzedArtwork;
}

export function StyleAnalysis({ artwork }: Props) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center gap-2 mb-4">
        <Brush className="w-5 h-5 text-purple-600" />
        <h3 className="text-lg font-semibold">Style Analysis</h3>
      </div>
      <div className="space-y-4">
        <div>
          <p className="text-gray-600 mb-1">Art Style</p>
          <p className="font-medium">{artwork.analysis.style}</p>
        </div>
        <div>
          <p className="text-gray-600 mb-1">Period</p>
          <p className="font-medium">{artwork.analysis.period}</p>
        </div>
        <div>
          <p className="text-gray-600 mb-1">Confidence Score</p>
          <div className="relative pt-1">
            <div className="overflow-hidden h-2 text-xs flex rounded bg-purple-100">
              <div
                style={{ width: `${artwork.analysis.confidence * 100}%` }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-purple-600"
              />
            </div>
            <p className="text-sm mt-1">
              {(artwork.analysis.confidence * 100).toFixed(1)}% confidence
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
