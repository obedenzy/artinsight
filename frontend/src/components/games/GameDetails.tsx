import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGameDetails } from '../../hooks/useGameDetails';
import { BackButton } from '../../components/artwork/BackButton';
import { DollarSign, Gift, Users, Clock, Trophy } from 'lucide-react';

export function GameDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { game, isLoading } = useGameDetails(id || '');

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="h-96 bg-gray-200 rounded-lg"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!game) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800">Game not found</h1>
            <button
              onClick={() => navigate('/games')}
              className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Return to Games
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <BackButton />
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
            <div className="aspect-[16/9] relative">
              <img
                src={game.artwork.imageUrl}
                alt={game.artwork.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h1 className="text-3xl font-bold mb-2">{game.title}</h1>
              <p className="text-gray-600">{game.description}</p>
            </div>
          </div>

          {/* Game Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <div className="flex items-center gap-2 text-purple-600">
                <Users className="w-5 h-5" />
                <span className="font-medium">Players</span>
              </div>
              <p className="text-2xl font-bold mt-1">
                {game.participants.length}/{game.maxParticipants}
              </p>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-md">
              <div className="flex items-center gap-2 text-purple-600">
                <Clock className="w-5 h-5" />
                <span className="font-medium">Time</span>
              </div>
              <p className="text-2xl font-bold mt-1">{game.timeLimit}m</p>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-md">
              <div className="flex items-center gap-2 text-purple-600">
                <Trophy className="w-5 h-5" />
                <span className="font-medium">Entry</span>
              </div>
              <p className="text-2xl font-bold mt-1">${game.entryFee}</p>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-md">
              <div className="flex items-center gap-2 text-purple-600">
                <DollarSign className="w-5 h-5" />
                <span className="font-medium">Status</span>
              </div>
              <p className="text-2xl font-bold mt-1">
                {game.isFinished ? 'Ended' : 'Active'}
              </p>
            </div>
          </div>

          {/* Prize Distribution */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-bold mb-4">Prize Distribution</h2>
            <div className="space-y-3">
              {game.prizes.map((prize) => (
                <div key={prize.rank} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-4">
                    {prize.type === 'monetary' ? (
                      <DollarSign className="w-5 h-5 text-purple-600" />
                    ) : (
                      <Gift className="w-5 h-5 text-purple-600" />
                    )}
                    <div>
                      <span className="font-medium">
                        {prize.rank}{prize.rank === 1 ? 'st' : prize.rank === 2 ? 'nd' : prize.rank === 3 ? 'rd' : 'th'} Place
                      </span>
                      {prize.type === 'custom' && prize.description && (
                        <p className="text-sm text-gray-600">{prize.description}</p>
                      )}
                    </div>
                  </div>
                  {prize.type === 'monetary' && (
                    <span className="text-lg font-bold text-purple-600">
                      ${prize.amount}
                    </span>
                  )}
                  {prize.type === 'custom' && prize.imageUrl && (
                    <img 
                      src={prize.imageUrl} 
                      alt={prize.description || 'Prize'} 
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Join Game Button */}
          {!game.isFinished && (
            <div className="text-center">
              <button
                className="px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-lg font-medium"
              >
                Join Game for ${game.entryFee}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
