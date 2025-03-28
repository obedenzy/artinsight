import React from 'react';
import { UseFormRegister } from 'react-hook-form';
import { COMMON_MEDIUMS } from '../../../data/formOptions';
import { Combobox } from '../Combobox';

interface Props {
  register: UseFormRegister<any>;
  errors: any;
  setValue: any;
}

export function BasicInfoForm({ register, errors, setValue }: Props) {
  const handleMediumSelect = (value: string) => {
    setValue('medium', value);
  };

  const currentYear = new Date().getFullYear();

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            {...register('title', { required: 'Title is required' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Artist Name</label>
          <input
            type="text"
            {...register('artist', { required: 'Artist name is required' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
          />
          {errors.artist && (
            <p className="mt-1 text-sm text-red-600">{errors.artist.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Date Created</label>
          <input
            type="text"
            {...register('dateCreated', {
              required: 'Date is required',
              pattern: {
                value: /^(1[0-9]{3}|20[0-2][0-9]|2030)$/,
                message: 'Please enter a valid year between 1000 and 2030'
              }
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            placeholder="Enter year (e.g., 2024)"
          />
          {errors.dateCreated && (
            <p className="mt-1 text-sm text-red-600">{errors.dateCreated.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Medium</label>
          <Combobox
            options={COMMON_MEDIUMS}
            onSelect={handleMediumSelect}
            placeholder="Select or enter medium"
            {...register('medium', { required: 'Medium is required' })}
          />
          {errors.medium && (
            <p className="mt-1 text-sm text-red-600">{errors.medium.message}</p>
          )}
        </div>
      </div>
    </div>
  );
}
