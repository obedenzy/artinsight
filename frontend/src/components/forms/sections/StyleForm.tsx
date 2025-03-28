import React from 'react';
import { UseFormRegister, UseFormWatch, UseFormSetValue } from 'react-hook-form';
import { ART_STYLES } from '../../../data/formOptions';
import { Combobox } from '../Combobox';

interface Props {
  register: UseFormRegister<any>;
  errors: any;
  setValue: UseFormSetValue<any>;
  watch: UseFormWatch<any>;
}

export function StyleForm({ register, errors, setValue, watch }: Props) {
  const influences = watch('influences') || [];

  const handleStyleSelect = (value: string) => {
    setValue('style', value);
  };

  const handleMovementSelect = (value: string) => {
    setValue('movement', value);
  };

  const handleAddInfluence = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const input = e.currentTarget;
      const value = input.value.trim();
      if (value) {
        setValue('influences', [...influences, value]);
        input.value = '';
      }
    }
  };

  const handleRemoveInfluence = (index: number) => {
    setValue(
      'influences',
      influences.filter((_: string, i: number) => i !== index)
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Style & Movement</h2>
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700">Art Style</label>
          <Combobox
            options={ART_STYLES}
            onSelect={handleStyleSelect}
            placeholder="Select or enter style"
            {...register('style', { required: 'Style is required' })}
          />
          {errors.style && (
            <p className="mt-1 text-sm text-red-600">{errors.style.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Art Movement</label>
          <Combobox
            options={ART_STYLES}
            onSelect={handleMovementSelect}
            placeholder="Select or enter movement"
            {...register('movement')}
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Influences</label>
          <div className="mt-1 flex flex-wrap gap-2">
            <input
              type="text"
              className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              placeholder="Add an influence and press Enter"
              onKeyDown={handleAddInfluence}
            />
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {influences.map((influence: string, index: number) => (
              <span
                key={index}
                className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm"
              >
                {influence}
                <button
                  type="button"
                  onClick={() => handleRemoveInfluence(index)}
                  className="hover:text-purple-600"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
