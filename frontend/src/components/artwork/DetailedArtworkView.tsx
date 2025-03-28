import React from 'react';
import { DetailedArtwork } from '../../types/artwork';
import { GameCreationButton } from './GameCreationButton';
import { ArtworkBasicInfo } from './ArtworkBasicInfo';
import { ArtworkStyleInfo } from './ArtworkStyleInfo';
import { ArtworkHistoricalInfo } from './ArtworkHistoricalInfo';
import { ArtworkSubjectInfo } from './ArtworkSubjectInfo';
import { ArtworkTechnicalInfo } from './ArtworkTechnicalInfo';
import { ArtworkProvenanceInfo } from './ArtworkProvenanceInfo';
import { ArtworkCriticalInfo } from './ArtworkCriticalInfo';
import { ArtworkScholarlyInfo } from './ArtworkScholarlyInfo';
import { ArtworkIntention } from './ArtworkIntention';
import { ArtworkPhilosophy } from './ArtworkPhilosophy';
import { ArtworkMarket } from './ArtworkMarket';
import { ArtworkDigital } from './ArtworkDigital';
import { ArtworkRelated } from './ArtworkRelated';

interface Props {
  artwork: DetailedArtwork;
}

export function DetailedArtworkView({ artwork }: Props) {
  const hasPhilosophy = artwork.philosophicalContext || artwork.symbols?.length > 0;
  const hasDigitalInsights = artwork.digitalInsights;
  const hasScholarlyAnalysis = artwork.scholarlyAnalysis?.length > 0;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Hero Section */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
        <img
          src={artwork.imageUrl}
          alt={artwork.title}
          className="w-full h-96 object-cover"
        />
        <div className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold mb-2">{artwork.title}</h1>
              <p className="text-xl text-gray-600">by {artwork.artist}</p>
            </div>
            <GameCreationButton artwork={artwork} />
          </div>
        </div>
      </div>

      {/* Information Sections */}
      <div className="space-y-8">
        <ArtworkBasicInfo artwork={artwork} />
        <ArtworkIntention artwork={artwork} />
        <ArtworkStyleInfo artwork={artwork} />
        <ArtworkHistoricalInfo artwork={artwork} />
        {hasPhilosophy && <ArtworkPhilosophy artwork={artwork} />}
        <ArtworkSubjectInfo artwork={artwork} />
        <ArtworkTechnicalInfo artwork={artwork} />
        <ArtworkMarket artwork={artwork} />
        <ArtworkProvenanceInfo artwork={artwork} />
        {hasDigitalInsights && <ArtworkDigital artwork={artwork} />}
        <ArtworkCriticalInfo artwork={artwork} />
        {hasScholarlyAnalysis && <ArtworkScholarlyInfo artwork={artwork} />}
        <ArtworkRelated artwork={artwork} />
      </div>
    </div>
  );
}
