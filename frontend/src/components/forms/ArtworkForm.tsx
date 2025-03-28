import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ImageUpload } from './ImageUpload';
import { BasicInfoForm } from './sections/BasicInfoForm';
import { StyleForm } from './sections/StyleForm';
import { TechnicalForm } from './sections/TechnicalForm';
import { SubjectForm } from './sections/SubjectForm';
import { HistoricalForm } from './sections/HistoricalForm';
import { ProvenanceForm } from './sections/ProvenanceForm';
import { ContextForm } from './sections/ContextForm';
import { useArtworkForm } from '../../hooks/useArtworkForm';
import { addArtwork } from '../../services/artwork';

export function ArtworkForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { handleSubmit, register, formState: { errors }, setValue, watch } = useArtworkForm();
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    try {
      setIsSubmitting(true);
      const imageFile = data.imageFile?.[0];
      if (!imageFile) {
        throw new Error('Image is required');
      }

      // Create the artwork data
      const artworkData = {
        ...data,
        imageUrl: URL.createObjectURL(imageFile),
        createdAt: new Date(),
        updatedAt: new Date(),
        uploadedBy: 'user', // Replace with actual user ID when auth is implemented
        id: `artwork-${Date.now()}`
      };

      // Pass false to indicate this is a manually added artwork
      await addArtwork(artworkData, false);
      navigate('/my-arts');
    } catch (error) {
      console.error('Failed to add artwork:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <ImageUpload register={register} watch={watch} setValue={setValue} />
      <BasicInfoForm register={register} errors={errors} setValue={setValue} />
      <StyleForm register={register} errors={errors} setValue={setValue} watch={watch} />
      <TechnicalForm register={register} watch={watch} setValue={setValue} errors={errors} />
      <SubjectForm register={register} errors={errors} setValue={setValue} watch={watch} />
      <HistoricalForm register={register} errors={errors} />
      <ProvenanceForm register={register} errors={errors} />
      <ContextForm register={register} errors={errors} />
      
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Adding...' : 'Add Artwork'}
        </button>
      </div>
    </form>
  );
}
