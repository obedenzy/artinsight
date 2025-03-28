import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GAME_TEMPLATES } from '../../data/gameTemplates';
import { GameTemplateCard } from './GameTemplateCard';
import { Loader2 } from 'lucide-react';

interface Props {
  isLoading: boolean;
}

export function GameTemplateList({ isLoading }: Props) {
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="w-8 h-8 text-purple-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {GAME_TEMPLATES.map(template => (
        <GameTemplateCard
          key={template.type}
          template={template}
          isAvailable={true}
          onSelect={() => navigate(`/games/create/${template.type}`)}
        />
      ))}
    </div>
  );
}
