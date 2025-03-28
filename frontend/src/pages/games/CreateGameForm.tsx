import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GameType, GameTemplate } from '../../types/game';
import { DetailedArtwork } from '../../types/artwork';
import { GameBasicInfo } from '../../components/games/forms/GameBasicInfo';
import { GameQuestions } from '../../components/games/forms/GameQuestions';
import { GameSettings } from '../../components/games/forms/GameSettings';
import { GamePrizeForm } from '../../components/games/GamePrizeForm';
import { createGame } from '../../services/games';
import { generateQuestions } from '../../utils/gameGenerators';

interface Props {
  template: GameTemplate;
  artwork: DetailedArtwork;
}

export function CreateGameForm({ template, artwork }: Props) {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: `${artwork.title} - ${template.title}`,
    description: '',
    difficulty: 'medium' as 'easy' | 'medium' | 'hard',
    timeLimit: 10,
    maxParticipants: 100,
    startDate: new Date(),
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    prizes: [
      { rank: 1, amount: 100 },
      { rank: 2, amount: 50 }
    ],
    tags: []
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const questions = generateQuestions(template.type, artwork);
      const game = await createGame(template.type, artwork, questions, formData);
      navigate(`/games/${game.id}`);
    } catch (error) {
      console.error('Failed to create game:', error);
      setIsSubmitting(false);
    }
  };

  const updateFormData = (data: Partial<typeof formData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {step === 1 && (
        <GameBasicInfo
          formData={formData}
          onChange={updateFormData}
          onNext={() => setStep(2)}
        />
      )}

      {step === 2 && (
        <GameSettings
          formData={formData}
          onChange={updateFormData}
          onBack={() => setStep(1)}
          onNext={() => setStep(3)}
        />
      )}

      {step === 3 && (
        <div className="space-y-8">
          <GamePrizeForm
            prizes={formData.prizes}
            onChange={prizes => updateFormData({ prizes })}
          />

          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Back
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
            >
              {isSubmitting ? 'Creating...' : 'Create Game'}
            </button>
          </div>
        </div>
      )}
    </form>
  );
}
