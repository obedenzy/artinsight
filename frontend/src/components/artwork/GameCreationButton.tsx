import React from 'react';
import { Link } from 'react-router-dom';
import { GamepadIcon, Lock } from 'lucide-react';
import { DetailedArtwork } from '../../types/artwork';
import { useGamePermissions } from '../../hooks/useGamePermissions';

interface Props {
  artwork: DetailedArtwork;
}

export function GameCreationButton({ artwork }: Props) {
  const { canCreateGame, isLoading } = useGamePermissions(artwork);

  if (isLoading) {
    return null;
  }

  if (!canCreateGame) {
    return (
      <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-500 rounded-lg cursor-not-allowed">
        <Lock className="w-5 h-5" />
        <span>Only Artist Can Create Games</span>
      </div>
    );
  }

  return (
    <Link
      to={`/games/create?artworkId=${artwork.id}`}
      className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
    >
      <GamepadIcon className="w-5 h-5" />
      <span>Create Game</span>
    </Link>
  );
}
