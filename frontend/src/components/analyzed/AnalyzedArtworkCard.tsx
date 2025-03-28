import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import { AnalyzedArtwork } from '../../types/artwork';
import { formatDate } from '../../utils/date';

interface Props {
  artwork: AnalyzedArtwork;
  onRemove: (id: string) => Promise<void>;
}

export function AnalyzedArtworkCard({ artwork, onRemove }: Props) {
  const handleRemove = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (window.confirm('Are you sure you want to remove this artwork?')) {
      await onRemove(artwork.id);
    }
  };

  return (
    <Link
      to={`/artwork/${artwork.id}`}
      className="group bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-[1.02]"
    >
      <div className="relative aspect-[4/3]">
        <img
          src={artwork.imageUrl}
          alt={artwork.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
          <div className="flex justify-between items-center">
            <p className="text-white text-sm">
              {artwork.analyzedAt ? `Analyzed ${formatDate(artwork.analyzedAt)}` : formatDate(artwork.createdAt)}
            </p>
            <button
              onClick={handleRemove}
              className="p-2 text-white opacity-0 group-hover:opacity-100 hover:text-red-400 transition-opacity"
              title="Remove artwork"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2 group-hover:text-purple-600 transition-colors">
          {artwork.title}
        </h3>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Style:</span>
            <span className="font-medium">{artwork.style}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Period:</span>
            <span className="font-medium">{artwork.dateCreated}</span>
          </div>
          {artwork.analysis?.confidence && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Confidence:</span>
              <span className="font-medium">
                {(artwork.analysis.confidence * 100).toFixed(1)}%
              </span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
