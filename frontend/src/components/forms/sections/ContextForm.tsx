import React from 'react';
import { UseFormRegister } from 'react-hook-form';

interface Props {
  register: UseFormRegister<any>;
  errors: any;
}

export function ContextForm({ register, errors }: Props) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Context & Meaning</h2>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Theme</label>
          <input
            type="text"
            {...register('theme')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            placeholder="e.g., Nature, Love, War"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            {...register('description')}
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            placeholder="Describe your artwork..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Inspiration</label>
          <textarea
            {...register('inspiration')}
            rows={2}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            placeholder="What inspired this artwork?"
          />
        </div>
      </div>
    </div>
  );
}
