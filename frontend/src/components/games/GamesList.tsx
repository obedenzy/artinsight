import React from 'react';
import { GameCard } from './GameCard';
import { Game } from '../../types/game';
import { Loader2 } from 'lucide-react';

interface Props {
  games: Game[];
  isLoading: boolean;
}

export function GamesList({ games, isLoading }: Props) {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="w-8 h-8 text-purple-600 animate-spin" />
      </div>
    );
  }

  if (!games.length) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">No games available at the moment</p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {games.map((game) => (
        <GameCard key={game.id} game={game} />
      ))}
    </div>
  );
}
