import React from 'react';
import { Game } from '../../types/game';
import { Users, Trophy, Clock } from 'lucide-react';

interface Props {
  games: Game[];
}

export function GameStats({ games }: Props) {
  const totalParticipants = games.reduce((sum, game) => 
    sum + (game.participants?.length || 0), 0
  );
  const ongoingGames = games.filter(game => !game.isFinished).length;
  const totalPrizePool = games.reduce((sum, game) => 
    sum + game.prizes.reduce((prizeSum, prize) => prizeSum + prize.amount, 0), 0
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="flex items-center gap-3">
          <Users className="w-5 h-5 text-purple-600" />
          <div>
            <p className="text-sm text-gray-600">Total Participants</p>
            <p className="text-2xl font-bold">{totalParticipants}</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="flex items-center gap-3">
          <Clock className="w-5 h-5 text-purple-600" />
          <div>
            <p className="text-sm text-gray-600">Ongoing Games</p>
            <p className="text-2xl font-bold">{ongoingGames}</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="flex items-center gap-3">
          <Trophy className="w-5 h-5 text-purple-600" />
          <div>
            <p className="text-sm text-gray-600">Total Prize Pool</p>
            <p className="text-2xl font-bold">${totalPrizePool}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
