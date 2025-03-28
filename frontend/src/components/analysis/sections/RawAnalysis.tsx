import React from 'react';
import { ArtAnalysis } from '../../../services/gemini/types';

interface Props {
  analysis: ArtAnalysis;
}

export function RawAnalysis({ analysis }: Props) {
  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-4 font-sans">Raw Analysis Response</h3>
      <pre className="bg-white p-4 rounded-lg overflow-x-auto text-sm font-mono leading-relaxed">
        {JSON.stringify(analysis, null, 2)}
      </pre>
    </div>
  );
}
