import React from 'react';
import { GamesList } from '../../components/games/GamesList';
import { GameStats } from '../../components/games/GameStats';
import { useAvailableGames } from '../../hooks/useAvailableGames';

export function GamesMenu() {
  const { games, isLoading } = useAvailableGames();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-6">Art Games</h1>
          <GameStats games={games} />
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-6">Available Games</h2>
          <GamesList games={games} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}
