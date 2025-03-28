import React from 'react';
import { Link } from 'react-router-dom';
import { Game } from '../../types/game';
import { Users, Trophy, Calendar } from 'lucide-react';
import { formatDate } from '../../utils/date';

interface Props {
  game: Game;
}

export function GameCard({ game }: Props) {
  const isOngoing = !game.isFinished;
  const totalPrizePool = game.prizes.reduce((sum, prize) => sum + prize.amount, 0);
  const now = new Date();
  const hasStarted = now >= game.startDate;
  const hasEnded = now >= game.endDate;

  return (
    <Link
      to={`/games/${game.id}`}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
    >
      <div className="aspect-[16/9] relative">
        <img
          src={game.artwork.imageUrl}
          alt={game.artwork.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            !hasStarted ? 'bg-yellow-100 text-yellow-800' :
            hasEnded ? 'bg-gray-100 text-gray-800' :
            'bg-green-100 text-green-800'
          }`}>
            {!hasStarted ? 'Upcoming' : hasEnded ? 'Ended' : 'Live'}
          </span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-bold text-lg mb-2">{game.title}</h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-gray-600">
              <Users className="w-4 h-4" />
              <span>{game.participants.length} entries</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Trophy className="w-4 h-4" />
              <span>${totalPrizePool}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar className="w-4 h-4" />
            <span>Ends {formatDate(game.endDate)}</span>
          </div>
          <div className="text-sm text-gray-500">
            Entry fee: ${game.entryFee}
          </div>
        </div>
      </div>
    </Link>
  );
}
