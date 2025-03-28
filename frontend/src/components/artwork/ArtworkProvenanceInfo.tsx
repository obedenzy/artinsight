import React from 'react';
import { DetailedArtwork } from '../../types/artwork';

interface Props {
  artwork: DetailedArtwork;
}

export function ArtworkProvenanceInfo({ artwork }: Props) {
  const exhibitions = Array.isArray(artwork.exhibitions) ? artwork.exhibitions : [];
  const ownershipHistory = Array.isArray(artwork.ownershipHistory) ? artwork.ownershipHistory : [];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">Provenance & Market History</h2>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-2">Origin</h3>
          <div className="bg-gray-50 p-4 rounded-md">
            <p><span className="text-gray-600">Location:</span> {artwork.origin?.location}</p>
            <p><span className="text-gray-600">Date:</span> {artwork.origin?.date}</p>
          </div>
        </div>

        {ownershipHistory.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-2">Ownership History</h3>
            <div className="space-y-2">
              {ownershipHistory.map((record, index) => (
                <div key={index} className="bg-gray-50 p-3 rounded-md">
                  <p className="font-medium">{record.owner}</p>
                  <p className="text-sm text-gray-600">{record.period}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div>
          <h3 className="text-lg font-semibold mb-2">Current Status</h3>
          <div className="bg-gray-50 p-4 rounded-md">
            <p><span className="text-gray-600">Location:</span> {artwork.currentLocation}</p>
            {artwork.estimatedValue && (
              <p><span className="text-gray-600">Estimated Value:</span> ${artwork.estimatedValue.toLocaleString()}</p>
            )}
          </div>
        </div>

        {exhibitions.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-2">Exhibition History</h3>
            <div className="space-y-2">
              {exhibitions.map((exhibition, index) => (
                <div key={index} className="bg-gray-50 p-3 rounded-md">
                  <p className="font-medium">{exhibition.name}</p>
                  <p className="text-sm text-gray-600">{exhibition.location}</p>
                  <p className="text-sm text-gray-600">{exhibition.date}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
