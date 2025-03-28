import React from 'react';

interface Props {
  formData: {
    difficulty: 'easy' | 'medium' | 'hard';
    timeLimit: number;
    maxParticipants: number;
    startDate: Date;
    endDate: Date;
  };
  onChange: (data: Partial<Props['formData']>) => void;
  onBack: () => void;
  onNext: () => void;
}

export function GameSettings({ formData, onChange, onBack, onNext }: Props) {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Difficulty
        </label>
        <select
          value={formData.difficulty}
          onChange={e => onChange({ difficulty: e.target.value as 'easy' | 'medium' | 'hard' })}
          className="w-full rounded-lg border-gray-300 focus:border-purple-500 focus:ring-purple-500"
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Time Limit (minutes)
        </label>
        <input
          type="number"
          min="1"
          max="60"
          value={formData.timeLimit}
          onChange={e => onChange({ timeLimit: Number(e.target.value) })}
          className="w-full rounded-lg border-gray-300 focus:border-purple-500 focus:ring-purple-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Maximum Participants
        </label>
        <input
          type="number"
          min="2"
          max="1000"
          value={formData.maxParticipants}
          onChange={e => onChange({ maxParticipants: Number(e.target.value) })}
          className="w-full rounded-lg border-gray-300 focus:border-purple-500 focus:ring-purple-500"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Start Date
          </label>
          <input
            type="datetime-local"
            value={formData.startDate.toISOString().slice(0, 16)}
            onChange={e => onChange({ startDate: new Date(e.target.value) })}
            className="w-full rounded-lg border-gray-300 focus:border-purple-500 focus:ring-purple-500"
            min={new Date().toISOString().slice(0, 16)}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            End Date
          </label>
          <input
            type="datetime-local"
            value={formData.endDate.toISOString().slice(0, 16)}
            onChange={e => onChange({ endDate: new Date(e.target.value) })}
            className="w-full rounded-lg border-gray-300 focus:border-purple-500 focus:ring-purple-500"
            min={formData.startDate.toISOString().slice(0, 16)}
          />
        </div>
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          Back
        </button>
        <button
          type="button"
          onClick={onNext}
          className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  );
}
