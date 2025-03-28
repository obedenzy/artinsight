import { useState, useEffect } from 'react';
import { Game } from '../types/game';
import { getGameDetails } from '../services/games';

export function useGameDetails(id: string) {
  const [game, setGame] = useState<Game | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadGame() {
      try {
        const gameData = await getGameDetails(id);
        setGame(gameData);
      } finally {
        setIsLoading(false);
      }
    }

    loadGame();
  }, [id]);

  return { game, isLoading };
}
