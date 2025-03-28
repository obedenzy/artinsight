import React from 'react';
import { UseFormRegister, UseFormWatch, UseFormSetValue } from 'react-hook-form';
import { ColorPicker } from '../ColorPicker';
import { Combobox } from '../Combobox';
import { COMMON_TECHNIQUES } from '../../../data/formOptions';

interface Props {
  register: UseFormRegister<any>;
  watch: UseFormWatch<any>;
  setValue: UseFormSetValue<any>;
  errors: any;
}

export function TechnicalForm({ register, watch, setValue, errors }: Props) {
  const colorPalette = watch('colorPalette') || [];

  const handleAddColor = (color: string) => {
    if (!colorPalette.includes(color)) {
      setValue('colorPalette', [...colorPalette, color]);
    }
  };

  const handleRemoveColor = (index: number) => {
    setValue('colorPalette', colorPalette.filter((_, i) => i !== index));
  };

  const handleTechniqueSelect = (value: string) => {
    setValue('techniques', value);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Technical Details</h2>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Techniques Used</label>
          <Combobox
            options={COMMON_TECHNIQUES}
            onSelect={handleTechniqueSelect}
            placeholder="Select or enter techniques"
            {...register('techniques', { required: 'Techniques are required' })}
          />
          {errors.techniques && (
            <p className="mt-1 text-sm text-red-600">{errors.techniques.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Composition</label>
          <input
            type="text"
            {...register('composition', { required: 'Composition is required' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            placeholder="e.g., Rule of thirds"
          />
          {errors.composition && (
            <p className="mt-1 text-sm text-red-600">{errors.composition.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Perspective</label>
          <input
            type="text"
            {...register('perspective', { required: 'Perspective is required' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            placeholder="e.g., One-point perspective, Bird's eye view"
          />
          {errors.perspective && (
            <p className="mt-1 text-sm text-red-600">{errors.perspective.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Texture</label>
          <input
            type="text"
            {...register('texture', { required: 'Texture is required' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            placeholder="e.g., Smooth, Rough, Impasto"
          />
          {errors.texture && (
            <p className="mt-1 text-sm text-red-600">{errors.texture.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Lighting</label>
          <input
            type="text"
            {...register('lighting', { required: 'Lighting is required' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            placeholder="e.g., Natural light, Chiaroscuro, Dramatic shadows"
          />
          {errors.lighting && (
            <p className="mt-1 text-sm text-red-600">{errors.lighting.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Dimensions</label>
          <div className="grid grid-cols-3 gap-2">
            <div>
              <input
                type="number"
                {...register('dimensions.height', { required: 'Height is required' })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                placeholder="Height"
              />
              {errors.dimensions?.height && (
                <p className="mt-1 text-sm text-red-600">{errors.dimensions.height.message}</p>
              )}
            </div>
            <div>
              <input
                type="number"
                {...register('dimensions.width', { required: 'Width is required' })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                placeholder="Width"
              />
              {errors.dimensions?.width && (
                <p className="mt-1 text-sm text-red-600">{errors.dimensions.width.message}</p>
              )}
            </div>
            <select
              {...register('dimensions.unit')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            >
              <option value="cm">cm</option>
              <option value="in">in</option>
              <option value="m">m</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Color Palette</label>
          <ColorPicker
            colors={colorPalette}
            onAddColor={handleAddColor}
            onRemoveColor={handleRemoveColor}
          />
          {errors.colorPalette && (
            <p className="mt-1 text-sm text-red-600">{errors.colorPalette.message}</p>
          )}
        </div>
      </div>
    </div>
  );
}
