import React from 'react';
import { AnalyzedArtworks } from '../components/analyzed/AnalyzedArtworks';

export function MyHistory() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">My Analysis History</h1>
        <AnalyzedArtworks />
      </div>
    </div>
  );
}
