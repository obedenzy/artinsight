import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, Image } from 'lucide-react';
import { useManualArtworks } from '../hooks/useManualArtworks';
import { AnalyzedArtworkCard } from '../components/analyzed/AnalyzedArtworkCard';

export function MyArts() {
  const { artworks, isLoading, removeArtwork } = useManualArtworks();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">My Artworks</h1>
          <Link
            to="/artwork/add"
            className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span>Add New Artwork</span>
          </Link>
        </div>

        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-96 bg-gray-200 animate-pulse rounded-lg" />
            ))}
          </div>
        ) : artworks.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {artworks.map((artwork) => (
              <AnalyzedArtworkCard
                key={artwork.id}
                artwork={artwork}
                onRemove={removeArtwork}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Image className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-600 mb-2">
              No artworks yet
            </h2>
            <p className="text-gray-500 mb-8">
              Add your first artwork to start building your collection
            </p>
            <Link
              to="/artwork/add"
              className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              <Plus className="w-5 h-5" />
              <span>Add Your First Artwork</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
