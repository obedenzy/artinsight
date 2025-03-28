import React from 'react';
import { ArtAnalysis } from '../../../services/gemini/types';

interface Props {
  analysis: ArtAnalysis;
}

export function StyleSection({ analysis }: Props) {
  return (
    <div className="bg-white rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-4">Style Analysis</h3>
      <div className="space-y-4">
        <div>
          <p className="text-gray-600">Movement</p>
          <p className="font-medium">{analysis.style.movement}</p>
        </div>
        <div>
          <p className="text-gray-600">Period</p>
          <p className="font-medium">{analysis.style.period}</p>
        </div>
        <div>
          <p className="text-gray-600">Characteristics</p>
          <ul className="list-disc list-inside space-y-1">
            {analysis.style.characteristics.map((char, i) => (
              <li key={i} className="text-gray-800">{char}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
