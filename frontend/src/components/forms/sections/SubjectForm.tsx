import React from 'react';
import { UseFormRegister, UseFormWatch, UseFormSetValue } from 'react-hook-form';
import { SUBJECT_TYPES } from '../../../data/formOptions';
import { Plus, X } from 'lucide-react';

interface Props {
  register: UseFormRegister<any>;
  errors: any;
  watch: UseFormWatch<any>;
  setValue: UseFormSetValue<any>;
}

export function SubjectForm({ register, errors, watch, setValue }: Props) {
  const symbols = watch('symbols') || [];

  const addSymbol = () => {
    setValue('symbols', [...symbols, { element: '', meaning: '' }]);
  };

  const removeSymbol = (index: number) => {
    setValue(
      'symbols',
      symbols.filter((_: any, i: number) => i !== index)
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Subject Matter</h2>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Subject Type</label>
          <select
            {...register('subjectType', { required: 'Subject type is required' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
          >
            <option value="">Select a type...</option>
            {SUBJECT_TYPES.map((type) => (
              <option key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            ))}
          </select>
          {errors.subjectType && (
            <p className="mt-1 text-sm text-red-600">{errors.subjectType.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Narrative</label>
          <textarea
            {...register('narrative')}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            placeholder="Describe the story or narrative behind the artwork..."
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-700">Symbols</label>
            <button
              type="button"
              onClick={addSymbol}
              className="inline-flex items-center gap-1 text-sm text-purple-600 hover:text-purple-700"
            >
              <Plus className="w-4 h-4" />
              Add Symbol
            </button>
          </div>
          <div className="space-y-3">
            {symbols.map((symbol: any, index: number) => (
              <div key={index} className="relative">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      {...register(`symbols.${index}.element`)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                      placeholder="Symbol"
                    />
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      {...register(`symbols.${index}.meaning`)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                      placeholder="Meaning"
                    />
                    <button
                      type="button"
                      onClick={() => removeSymbol(index)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-red-500"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {symbols.length === 0 && (
              <p className="text-sm text-gray-500 text-center py-4">
                Click "Add Symbol" to add symbols and their meanings
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
