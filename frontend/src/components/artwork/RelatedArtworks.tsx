import React from 'react';
import { Link } from 'react-router-dom';
import { Layers } from 'lucide-react';
import { DetailedArtwork } from '../../types/artwork';
import { getRelatedArtworks } from '../../utils/artworkUtils';

interface Props {
  currentArtwork: DetailedArtwork;
}

export function RelatedArtworks({ currentArtwork }: Props) {
  const relatedArtworks = getRelatedArtworks(currentArtwork);

  if (!relatedArtworks.length) return null;

  return (
    <div className="mt-12 bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center gap-2 mb-6">
        <Layers className="w-6 h-6 text-purple-600" />
        <h2 className="text-2xl font-bold">You May Also Like</h2>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {relatedArtworks.map((artwork) => (
          <Link
            key={artwork.id}
            to={`/artwork/${artwork.id}`}
            className="group bg-gray-50 rounded-lg overflow-hidden hover:shadow-lg transition-all"
          >
            <div className="aspect-[4/3] relative">
              <img
                src={artwork.imageUrl}
                alt={artwork.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold group-hover:text-purple-600 transition-colors">
                {artwork.title}
              </h3>
              <p className="text-sm text-gray-600">by {artwork.artist}</p>
              <p className="text-sm text-gray-500 mt-1">{artwork.style}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
