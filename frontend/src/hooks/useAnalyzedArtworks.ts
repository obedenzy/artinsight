import { useState, useEffect, useCallback } from 'react';
import { AnalyzedArtwork } from '../types/artwork';
import { getAnalyzedArtworks, removeArtwork } from '../services/artwork';

export function useAnalyzedArtworks() {
  const [artworks, setArtworks] = useState<AnalyzedArtwork[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadArtworks = useCallback(async () => {
    try {
      const data = await getAnalyzedArtworks();
      setArtworks(data);
    } catch (error) {
      console.error('Failed to load analyzed artworks:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const removeAnalyzedArtwork = useCallback(async (id: string) => {
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

  return { artworks, isLoading, removeArtwork: removeAnalyzedArtwork };
}
