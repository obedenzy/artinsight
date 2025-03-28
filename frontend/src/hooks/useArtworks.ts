import { useState, useEffect, useCallback } from 'react';
import { AnalyzedArtwork } from '../types/artwork';
import { getAllArtworks, removeAnalyzedArtwork } from '../services/artwork';

export function useArtworks() {
  const [artworks, setArtworks] = useState<AnalyzedArtwork[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadArtworks = useCallback(async () => {
    try {
      const data = await getAllArtworks();
      setArtworks(data);
    } catch (error) {
      console.error('Failed to load artworks:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const removeArtwork = useCallback(async (id: string) => {
    try {
      await removeAnalyzedArtwork(id);
      await loadArtworks();
    } catch (error) {
      console.error('Failed to remove artwork:', error);
    }
  }, [loadArtworks]);

  useEffect(() => {
    loadArtworks();
  }, [loadArtworks]);

  return { artworks, isLoading, removeArtwork };
}
