import React from 'react';
import { AnalyzedArtwork } from '../../../types/artwork';
import { Tag } from 'lucide-react';

interface Props {
  artwork: AnalyzedArtwork;
}

export function SubjectAnalysis({ artwork }: Props) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center gap-2 mb-4">
        <Tag className="w-5 h-5 text-purple-600" />
        <h3 className="text-lg font-semibold">Subject Matter</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {artwork.analysis.subjects.map((subject, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm"
          >
            {subject}
          </span>
        ))}
      </div>
    </div>
  );
}
