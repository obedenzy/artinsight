import React from 'react';
import { RotateCcw } from 'lucide-react';

interface Props {
  text: string;
  onReset: () => void;
}

export function AnalysisResults({ text, onReset }: Props) {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Analysis Results</h2>
        <button
          onClick={onReset}
          className="flex items-center gap-2 px-4 py-2 text-purple-600 hover:text-purple-700 hover:bg-purple-50 rounded-lg transition-colors"
        >
          <RotateCcw className="w-5 h-5" />
          Analyze Another
        </button>
      </div>

      <div className="bg-white rounded-lg p-6 prose prose-purple max-w-none">
        {text.split('\n\n').map((section, index) => (
          <div key={index} className="mb-6 last:mb-0">
            {section.split('\n').map((paragraph, pIndex) => (
              <p key={pIndex} className="mb-2 last:mb-0">
                {paragraph}
              </p>
            ))}
          </div>
        ))}
      </div>

      <div className="flex justify-center">
        <button
          onClick={onReset}
          className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          <RotateCcw className="w-5 h-5" />
          Analyze Another Artwork
        </button>
      </div>
    </div>
  );
}
