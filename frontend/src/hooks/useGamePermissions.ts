import { useState, useEffect } from 'react';
import { DetailedArtwork } from '../types/artwork';
import { getExistingGames } from '../services/games';

export function useGamePermissions(artwork: DetailedArtwork | null) {
  const [canCreateGame, setCanCreateGame] = useState(false);
  const [existingGames, setExistingGames] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function checkPermissions() {
      if (!artwork) {
        setIsLoading(false);
        return;
      }

      try {
        // In a real app, you'd get the current user ID from auth
        const currentUserId = 'user'; // Replace with actual user ID
        const isOwner = artwork.uploadedBy === currentUserId;
        
        const games = await getExistingGames(artwork.id);
        const gameTypes = games.map(game => game.type);
        
        setExistingGames(gameTypes);
        setCanCreateGame(isOwner);
      } finally {
        setIsLoading(false);
      }
    }

    checkPermissions();
  }, [artwork]);

  return {
    canCreateGame,
    existingGames,
    isLoading
  };
}
