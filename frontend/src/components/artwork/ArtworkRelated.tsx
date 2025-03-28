import React from 'react';
import { DetailedArtwork } from '../../types/artwork';
import { Link } from 'react-router-dom';
import { Layers } from 'lucide-react';

interface Props {
  artwork: DetailedArtwork;
}

export function ArtworkRelated({ artwork }: Props) {
  if (!artwork.relatedWorks?.length) return null;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center gap-2 mb-4">
        <Layers className="w-6 h-6 text-blue-600" />
        <h2 className="text-2xl font-bold">Related Artworks</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {artwork.relatedWorks.map((work) => (
          <Link
            key={work.id}
            to={`/artwork/${work.id}`}
            className="group bg-gray-50 p-4 rounded-lg hover:bg-blue-50 transition-colors"
          >
            <p className="font-semibold group-hover:text-blue-700 transition-colors">
              {work.title}
            </p>
            <p className="text-gray-600 text-sm">{work.relationship}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
