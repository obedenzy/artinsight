import { useState } from 'react';
import { GameType, Game, GameQuestion } from '../types/game';
import { DetailedArtwork } from '../types/artwork';
import { createGame } from '../services/games';
import { generateQuestions } from '../utils/gameGenerators';

export function useGameCreation() {
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createNewGame = async (
    type: GameType,
    artwork: DetailedArtwork,
    settings: Partial<Game> = {}
  ) => {
    setIsCreating(true);
    setError(null);
    
    try {
      const questions = generateQuestions(type, artwork);
      const game = await createGame(type, artwork, questions, settings);
      return game;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create game');
      throw err;
    } finally {
      setIsCreating(false);
    }
  };

  return {
    createNewGame,
    isCreating,
    error
  };
}
