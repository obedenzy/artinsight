import React from 'react';
import { GameType, GameQuestion } from '../../../types/game';
import { DetailedArtwork } from '../../../types/artwork';
import { generateQuestions } from '../../../utils/gameGenerators';

interface Props {
  type: GameType;
  artwork: DetailedArtwork;
  questions: GameQuestion[];
  onQuestionsGenerated: (questions: GameQuestion[]) => void;
}

export function GameQuestions({ type, artwork, questions, onQuestionsGenerated }: Props) {
  const handleGenerateQuestions = () => {
    const newQuestions = generateQuestions(type, artwork);
    onQuestionsGenerated(newQuestions);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Questions</h3>
        <button
          type="button"
          onClick={handleGenerateQuestions}
          className="text-sm text-purple-600 hover:text-purple-700"
        >
          Regenerate Questions
        </button>
      </div>

      <div className="space-y-4">
        {questions.map((question, index) => (
          <div key={question.id} className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-start mb-2">
              <span className="font-medium">Question {index + 1}</span>
              <span className="text-sm text-gray-500">{question.points} points</span>
            </div>
            <p className="text-gray-800 mb-2">{question.question}</p>
            {question.options && (
              <div className="space-y-2">
                {question.options.map((option, optionIndex) => (
                  <div
                    key={optionIndex}
                    className={`p-2 rounded ${
                      option === question.correctAnswer
                        ? 'bg-green-100 text-green-800'
                        : 'bg-white'
                    }`}
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
