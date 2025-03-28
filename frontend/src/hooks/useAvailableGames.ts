import { useState, useEffect } from 'react';
import { Game } from '../types/game';
import { getAllGames } from '../services/games';

export function useAvailableGames() {
  const [games, setGames] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadGames() {
      try {
        const allGames = await getAllGames();
        setGames(allGames);
      } finally {
        setIsLoading(false);
      }
    }

    loadGames();
  }, []);

  return { games, isLoading };
}
