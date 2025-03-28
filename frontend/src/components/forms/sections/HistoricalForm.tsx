import React from 'react';
import { UseFormRegister } from 'react-hook-form';
import { HISTORICAL_PERIODS } from '../../../data/formOptions';

interface Props {
  register: UseFormRegister<any>;
  errors: any;
}

export function HistoricalForm({ register, errors }: Props) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Historical Context</h2>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Historical Period</label>
          <select
            {...register('historicalPeriod', { required: 'Historical period is required' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
          >
            <option value="">Select a period...</option>
            {HISTORICAL_PERIODS.map((period) => (
              <option key={period} value={period}>{period}</option>
            ))}
          </select>
          {errors.historicalPeriod && (
            <p className="mt-1 text-sm text-red-600">{errors.historicalPeriod.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Cultural Background</label>
          <textarea
            {...register('culturalBackground', { required: 'Cultural background is required' })}
            rows={2}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            placeholder="Describe the cultural context..."
          />
          {errors.culturalBackground && (
            <p className="mt-1 text-sm text-red-600">{errors.culturalBackground.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Political Context</label>
          <textarea
            {...register('politicalContext')}
            rows={2}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            placeholder="Describe any political context..."
          />
        </div>
      </div>
    </div>
  );
}
