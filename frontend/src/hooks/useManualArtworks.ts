import { useState, useEffect, useCallback } from 'react';
import { AnalyzedArtwork } from '../types/artwork';
import { getManualArtworks, removeArtwork } from '../services/artwork';

export function useManualArtworks() {
  const [artworks, setArtworks] = useState<AnalyzedArtwork[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadArtworks = useCallback(async () => {
    try {
      const data = await getManualArtworks();
      setArtworks(data);
    } catch (error) {
      console.error('Failed to load artworks:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const removeManualArtwork = useCallback(async (id: string) => {
    try {
      await removeArtwork(id);
      await loadArtworks();
    } catch (error) {
      console.error('Failed to remove artwork:', error);
    }
  }, [loadArtworks]);

  useEffect(() => {
    loadArtworks();
  }, [loadArtworks]);

  return { artworks, isLoading, removeArtwork: removeManualArtwork };
}
