import React from 'react';
import { DetailedArtwork } from '../../types/artwork';
import { TrendingUp } from 'lucide-react';
import { MarketTrendChart } from './MarketTrendChart';

interface Props {
  artwork: DetailedArtwork;
}

export function ArtworkMarket({ artwork }: Props) {
  // Add null checks and default values
  const exhibitions = artwork.exhibitions || [];

  const totalMonetaryPrizes = artwork.prizes
    ? artwork.prizes.reduce((sum, prize) => sum + (prize.amount || 0), 0)
    : 0;


  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="w-6 h-6 text-emerald-600" />
        <h2 className="text-2xl font-bold">Market & Popularity</h2>
      </div>

      <div className="space-y-6">
        {artwork.estimatedValue !== undefined && artwork.estimatedValue !== null && (
          <div>
            <h3 className="text-lg font-semibold mb-2">Current Market Value</h3>
            <div className="bg-emerald-50 p-4 rounded-lg">
              <p className="text-2xl font-bold text-emerald-700">
                ${artwork.estimatedValue.toLocaleString()}
              </p>
            </div>
          </div>
        )}

        {artwork.marketTrends && (
          <div>
            <h3 className="text-lg font-semibold mb-2">Market Trends</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <MarketTrendChart data={artwork.marketTrends} />
            </div>
          </div>
        )}

        <div>
          <h3 className="text-lg font-semibold mb-2">Exhibition History</h3>
          <div className="space-y-3">
            {exhibitions.map((exhibition, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg">
                <p className="font-semibold">{exhibition.name}</p>
                <p className="text-gray-600">{exhibition.location}</p>
                <p className="text-gray-500 text-sm">{exhibition.date}</p>
              </div>
            ))}
          </div>
        </div>

        {artwork.popularityMetrics && (
          <div>
            <h3 className="text-lg font-semibold mb-2">Popularity Metrics</h3>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(artwork.popularityMetrics).map(([key, value]) => (
                <div key={key} className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-600 text-sm capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </p>
                  {/* Null check for value */}
                  <p className="text-xl font-semibold">{value?.toLocaleString() ?? 'N/A'}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
