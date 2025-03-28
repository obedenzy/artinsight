import React from 'react';
import { DetailedArtwork } from '../../types/artwork';

interface Props {
  artwork: DetailedArtwork;
}

export function ArtworkBasicInfo({ artwork }: Props) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">Basic Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-gray-600">Title</p>
          <p className="font-medium">{artwork.title}</p>
        </div>
        <div>
          <p className="text-gray-600">Artist</p>
          <p className="font-medium">{artwork.artist}</p>
        </div>
        <div>
          <p className="text-gray-600">Date Created</p>
          <p className="font-medium">{artwork.dateCreated}</p>
        </div>
        <div>
          <p className="text-gray-600">Medium</p>
          <p className="font-medium">{artwork.medium}</p>
        </div>
        {artwork.dimensions && (
          <div className="md:col-span-2">
            <p className="text-gray-600">Dimensions</p>
            <p className="font-medium">
              {artwork.dimensions.height} × {artwork.dimensions.width}
              {artwork.dimensions.depth ? ` × ${artwork.dimensions.depth}` : ''} {artwork.dimensions.unit}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
