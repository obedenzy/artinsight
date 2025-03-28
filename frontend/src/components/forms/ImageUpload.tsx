import React from 'react';
import { Image as ImageIcon } from 'lucide-react';
import { UseFormRegister, UseFormWatch, UseFormSetValue } from 'react-hook-form';

interface Props {
  register: UseFormRegister<any>;
  watch: UseFormWatch<any>;
  setValue: UseFormSetValue<any>;
}

export function ImageUpload({ register, watch }: Props) {
  const imageFile = watch('imageFile')?.[0];
  const imagePreview = imageFile ? URL.createObjectURL(imageFile) : null;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Artwork Image</h2>
      <div className="flex items-center gap-8">
        <div className="flex-1">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            id="artwork-image"
            {...register('imageFile', { required: 'Image is required' })}
          />
          <label
            htmlFor="artwork-image"
            className="block w-full aspect-[4/3] rounded-lg border-2 border-dashed border-gray-300 hover:border-purple-400 transition-colors cursor-pointer"
          >
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Artwork preview"
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-gray-500">
                <ImageIcon className="w-12 h-12 mb-2" />
                <p>Click to upload artwork image</p>
                <p className="text-sm">JPG, PNG, WEBP (max 10MB)</p>
              </div>
            )}
          </label>
        </div>
      </div>
    </div>
  );
}
