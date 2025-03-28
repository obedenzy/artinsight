import React from 'react';
import { ArtworkForm } from '../components/forms/ArtworkForm';
import { BackButton } from '../components/artwork/BackButton';

export function AddArtwork() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <BackButton />
        </div>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">Add Your Artwork</h1>
          <ArtworkForm />
        </div>
      </div>
    </div>
  );
}
