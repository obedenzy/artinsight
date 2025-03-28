import React from 'react';
import * as Icons from 'lucide-react';
import { GameTemplate } from '../../types/game';

interface Props {
  template: GameTemplate;
  isAvailable: boolean;
  onSelect: () => void;
}

export function GameTemplateCard({ template, isAvailable, onSelect }: Props) {
  // Get the icon component from lucide-react
  const IconComponent = Icons[template.icon as keyof typeof Icons];

  return (
    <button
      onClick={onSelect}
      disabled={!isAvailable}
      className={`w-full bg-white p-6 rounded-lg shadow-md text-left transition-all ${
        isAvailable 
          ? 'hover:shadow-lg group cursor-pointer' 
          : 'opacity-50 cursor-not-allowed'
      }`}
    >
      <div className="flex items-center gap-3 mb-3">
        {IconComponent && (
          <IconComponent className={`w-6 h-6 ${
            isAvailable ? 'text-purple-600' : 'text-gray-400'
          }`} />
        )}
        <h3 className={`text-lg font-semibold ${
          isAvailable ? 'group-hover:text-purple-600' : 'text-gray-500'
        } transition-colors`}>
          {template.title}
        </h3>
      </div>
      <p className="text-gray-600 text-sm mb-4">{template.description}</p>
      <div className="flex items-center justify-between text-sm text-gray-500">
        <span>{template.minQuestions}-{template.maxQuestions} questions</span>
        {!isAvailable && <span className="text-red-500">Already Created</span>}
      </div>
    </button>
  );
}
