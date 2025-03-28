import { useState, useEffect, useCallback } from 'react';
    import { AnalyzedArtwork, DetailedArtwork } from '../types/artwork';
    import { getAllArtworks } from '../services/artwork'; // Import the new service function

    export function useAllArtworks() {
      const [artworks, setArtworks] = useState<(AnalyzedArtwork | DetailedArtwork)[]>([]);
      const [isLoading, setIsLoading] = useState(true);

      const loadArtworks = useCallback(async () => {
        try {
          const data = await getAllArtworks(); // Use getAllArtworks
          setArtworks(data);
        } catch (error) {
          console.error('Failed to load all artworks:', error);
        } finally {
          setIsLoading(false);
        }
      }, []);

      useEffect(() => {
        loadArtworks();
      }, [loadArtworks]);

      return { artworks, isLoading };
    }
