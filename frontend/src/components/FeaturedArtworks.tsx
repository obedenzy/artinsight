import React from 'react';
import { Link } from 'react-router-dom';

const FEATURED_ARTWORKS = [
  {
    id: '1',
    title: 'Starry Night',
    artist: 'Vincent van Gogh',
    imageUrl: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?auto=format&fit=crop&q=80',
    analysis: {
      style: 'Post-Impressionism',
      period: '1889',
      confidence: 0.98
    }
  },
  {
    id: '2',
    title: 'The Persistence of Memory',
    artist: 'Salvador Dalí',
    imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&q=80',
    analysis: {
      style: 'Surrealism',
      period: '1931',
      confidence: 0.96
    }
  },
  {
    id: '3',
    title: 'Girl with a Pearl Earring',
    artist: 'Johannes Vermeer',
    imageUrl: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&q=80',
    analysis: {
      style: 'Dutch Golden Age',
      period: '1665',
      confidence: 0.97
    }
  }
];

export function FeaturedArtworks() {
  return (
    <section className="bg-gray-50 py-12 px-4 sm:py-16">
      <div className="container mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center">
          Featured Artworks
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto">
          {FEATURED_ARTWORKS.map((artwork) => (
            <Link
              key={artwork.id}
              to={`/artwork/${artwork.id}`}
              className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-[1.02]"
            >
              <div className="aspect-[4/3] relative">
                <img
                  src={artwork.imageUrl}
                  alt={artwork.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <div className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold mb-2 hover:text-purple-600 transition-colors">
                  {artwork.title}
                </h3>
                <p className="text-gray-600 mb-4">by {artwork.artist}</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Style:</span>
                    <span className="font-medium">{artwork.analysis.style}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Period:</span>
                    <span className="font-medium">{artwork.analysis.period}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Confidence:</span>
                    <span className="font-medium">
                      {(artwork.analysis.confidence * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
