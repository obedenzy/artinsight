import React from 'react';
import { AnalyzedArtwork } from '../../types/artwork';
import { BasicInfo } from '../analysis/sections/BasicInfo';
import { StyleAnalysis } from '../analysis/sections/StyleAnalysis';
import { ColorAnalysis } from '../analysis/sections/ColorAnalysis';
import { SubjectAnalysis } from '../analysis/sections/SubjectAnalysis';

interface Props {
  artwork: AnalyzedArtwork;
}

export function AnalyzedArtworkView({ artwork }: Props) {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <img
          src={artwork.imageUrl}
          alt={artwork.title}
          className="w-full h-96 object-cover"
        />
        <div className="p-6">
          <BasicInfo artwork={artwork} />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <StyleAnalysis artwork={artwork} />
        <ColorAnalysis artwork={artwork} />
        <SubjectAnalysis artwork={artwork} />
      </div>
    </div>
  );
}
