import { AnalyzedArtwork, DetailedArtwork } from '../types/artwork';
import { USER_ARTWORKS } from '../data/mockUserArtworks';
import { ARTWORK_DATA } from '../data/mockArtworks';

// Mock data storage
let analyzedArtworks: AnalyzedArtwork[] = [];
let manualArtworks: DetailedArtwork[] = [...USER_ARTWORKS];

export async function getAnalyzedArtworks(): Promise<AnalyzedArtwork[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...analyzedArtworks].sort((a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      ));
    }, 500);
  });
}

export async function getManualArtworks(): Promise<DetailedArtwork[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...manualArtworks].sort((a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      ));
    }, 500);
  });
}

// New function to get ALL artworks
export async function getAllArtworks(): Promise<(AnalyzedArtwork | DetailedArtwork)[]> {
    return new Promise((resolve) => {
        setTimeout(() => {
            // Combine analyzed and manual artworks, and add mock data
            const allArtworks = [...analyzedArtworks, ...manualArtworks, ...Object.values(ARTWORK_DATA)];
            resolve(allArtworks.sort((a, b) =>
                new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            ));
        }, 500);
    });
}


export async function addAnalyzedArtwork(artwork: AnalyzedArtwork): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newArtwork = {
        ...artwork,
        analyzedAt: new Date(),
        analysis: {
          style: artwork.style,
          period: artwork.dateCreated,
          confidence: 0.95,
          colors: artwork.colorPalette || [],
          subjects: [artwork.subjectType]
        }
      };
      analyzedArtworks = [newArtwork, ...analyzedArtworks];
      resolve();
    }, 500);
  });
}

export async function addArtwork(artwork: DetailedArtwork, isAnalyzed: boolean): Promise<void> { // Added isAnalyzed parameter
  return new Promise((resolve) => {
    setTimeout(() => {
      if (isAnalyzed) {
        // If it's analyzed, add it to the analyzedArtworks array
        analyzedArtworks = [artwork as AnalyzedArtwork, ...analyzedArtworks];
      } else {
        // Otherwise, add it to the manualArtworks array
        manualArtworks = [artwork, ...manualArtworks];
      }
      resolve();
    }, 500);
  });
}

export async function removeArtwork(id: string): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      analyzedArtworks = analyzedArtworks.filter(artwork => artwork.id !== id);
      manualArtworks = manualArtworks.filter(artwork => artwork.id !== id);
      resolve();
    }, 500);
  });
}
