import React from 'react';
import { Link } from 'react-router-dom';
import { History } from 'lucide-react';
import { useAnalyzedArtworks } from '../../hooks/useAnalyzedArtworks';
import { AnalyzedArtworkCard } from './AnalyzedArtworkCard';

export function RecentArtworks() {
  const { artworks, isLoading, removeArtwork } = useAnalyzedArtworks();
  const recentArtworks = artworks.slice(0, 3);

  if (isLoading) {
    return (
      <section className="bg-white py-16 px-4">
        <div className="container mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-96 bg-gray-200 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!recentArtworks.length) {
    return null;
  }

  return (
    <section className="bg-white py-16 px-4">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <History className="w-6 h-6 text-purple-600" />
            <h2 className="text-2xl font-bold">Recent Analyses</h2>
          </div>
          <Link 
            to="/my-arts" 
            className="text-purple-600 hover:text-purple-700 transition-colors"
          >
            View All
          </Link>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recentArtworks.map((artwork) => (
            <AnalyzedArtworkCard 
              key={artwork.id} 
              artwork={artwork} 
              onRemove={removeArtwork}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
