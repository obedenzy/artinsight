import React from 'react';
import { AnalyzedArtwork } from '../../../types/artwork';
import { formatDate } from '../../../utils/date';

interface Props {
  artwork: AnalyzedArtwork;
}

export function BasicInfo({ artwork }: Props) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-2xl font-bold">{artwork.title}</h3>
        <p className="text-gray-600">by {artwork.artist}</p>
      </div>
      <p className="text-sm text-gray-500">
        Analyzed {formatDate(artwork.analyzedAt)}
      </p>
    </div>
  );
}
