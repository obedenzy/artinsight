import React from 'react';
import { Eye } from 'lucide-react';
import { AnalyzedArtwork } from '../../../types/artwork';

interface Props {
  artwork: AnalyzedArtwork;
}

export function SubjectSection({ artwork }: Props) {
  return (
    <div className="bg-white rounded-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <Eye className="w-5 h-5 text-purple-600" />
        <h3 className="text-lg font-semibold">Subject Analysis</h3>
      </div>
      <div className="space-y-4">
        <div>
          <p className="text-gray-600">Identified Subjects</p>
          <div className="flex flex-wrap gap-2 mt-2">
            {artwork.analysis.subjects.map((subject, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm"
              >
                {subject}
              </span>
            ))}
          </div>
        </div>
        <div>
          <p className="text-gray-600">Type</p>
          <p className="font-medium capitalize">{artwork.subjectType}</p>
        </div>
      </div>
    </div>
  );
}
