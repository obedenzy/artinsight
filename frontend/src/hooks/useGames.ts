import { useState, useEffect } from 'react';
import { Game } from '../types/game';
import { getGamesByArtist } from '../services/games';

export function useGames() {
  const [games, setGames] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadGames() {
      try {
        // In a real app, you'd get the current user ID from auth
        const currentUserId = 'user'; // Replace with actual user ID
        const userGames = await getGamesByArtist(currentUserId);
        setGames(userGames);
      } finally {
        setIsLoading(false);
      }
    }

    loadGames();
  }, []);

  return { games, isLoading };
}
