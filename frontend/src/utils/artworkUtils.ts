import { DetailedArtwork } from '../types/artwork';
import { ARTWORK_DATA } from '../data/mockArtworks';

export function getRelatedArtworks(artwork: DetailedArtwork): DetailedArtwork[] {
  // Get all artworks except current one
  const allArtworks = Object.values(ARTWORK_DATA);
  const otherArtworks = allArtworks.filter(art => art.id !== artwork.id);
  
  // Find artworks with matching style or period
  const styleMatches = otherArtworks.filter(art => 
    art.style === artwork.style || 
    art.historicalPeriod === artwork.historicalPeriod
  );

  // If we have style matches, prioritize them
  if (styleMatches.length >= 3) {
    return styleMatches.slice(0, 3);
  }

  // Otherwise, fill remaining slots with other artworks
  const remainingCount = 3 - styleMatches.length;
  const otherMatches = otherArtworks
    .filter(art => !styleMatches.includes(art))
    .slice(0, remainingCount);

  return [...styleMatches, ...otherMatches];
}
