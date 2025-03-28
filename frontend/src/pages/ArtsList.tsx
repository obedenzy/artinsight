import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, Image } from 'lucide-react';
import { useAllArtworks } from '../hooks/useAllArtworks'; // Use the new hook
import { AnalyzedArtworkCard } from '../components/analyzed/AnalyzedArtworkCard';

export function ArtsList() {
  const { artworks, isLoading } = useAllArtworks(); // Get all artworks

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">All Artworks</h1>
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
                onRemove={() => {}} // Pass an empty function.  Removal not allowed on this page.
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
              Be the first to add or analyze an artwork!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
