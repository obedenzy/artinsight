import React from 'react';
import { AnalyzedArtworkCard } from './AnalyzedArtworkCard';
import { useAnalyzedArtworks } from '../../hooks/useAnalyzedArtworks';
import { History } from 'lucide-react';

export function AnalyzedArtworks() {
  const { artworks, isLoading, removeArtwork } = useAnalyzedArtworks();

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-8 bg-gray-200 rounded w-1/4"></div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-96 bg-gray-200 rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  if (!artworks.length) {
    return (
      <div className="text-center py-12">
        <History className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-600 mb-2">
          No analyzed artworks yet
        </h3>
        <p className="text-gray-500">
          Upload and analyze your first artwork to see it here
        </p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {artworks.map((artwork) => (
        <AnalyzedArtworkCard 
          key={artwork.id} 
          artwork={artwork} 
          onRemove={removeArtwork}
        />
      ))}
    </div>
  );
}
