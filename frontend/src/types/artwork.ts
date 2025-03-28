export interface DetailedArtwork {
      // Basic Information
      id: string;
      title: string;
      artist: string;
      dateCreated: string;
      medium: string;
      dimensions: {
        height: number;
        width: number;
        depth?: number;
        unit: 'cm' | 'in' | 'm';
      };

      // Style and Movement
      style: string;
      movement: string;
      influences: string[];

      // Context
      historicalPeriod: string;
      culturalBackground: string;
      politicalContext?: string;
      philosophicalContext?: string;

      // Subject Matter
      theme: string;
      narrative?: string;
      symbols: Array<{
        element: string;
        meaning: string;
      }>;
      subjectType: 'portrait' | 'still-life' | 'landscape' | 'abstract' | 'other';

      // Technique
      techniques: string[];
      composition: string;
      colorPalette: string[];
      perspective: string;
      texture: string;
      lighting: string;

      // Artist's Intent
      purpose: string;
      inspiration?: string;
      intendedMessage?: string;

      // Provenance
      origin: {
        location: string;
        date: string;
      };
      ownershipHistory: Array<{
        owner: string;
        period: string;
      }>;
      currentLocation: string;
      estimatedValue?: number;

      // Market Info
      exhibitions: Array<{
        name: string;
        location: string;
        date: string;
      }>;
      marketTrends?: {
        dates: string[];
        values: number[];
      };
      popularityMetrics?: {
        monthlyViews: number;
        socialMentions: number;
        academicCitations: number;
      };

      // Impact
      criticalReception: string;
      culturalImpact: string;
      currentSignificance: string;

      // Digital Aspects
      hasDigitalReconstruction: boolean;
      digitalInsights?: {
        reconstruction?: string;
        interactiveFeatures?: string[];
      };
      aiAnalysis?: {
        authenticityScore: number;
        hiddenDetails: string[];
        styleConfidence: number;
      };

      // Analysis
      scholarlyAnalysis: Array<{
        author: string;
        publication: string;
        summary: string;
      }>;
      controversies?: string[];

      // Related Works
      relatedWorks: Array<{
        id: string;
        title: string;
        relationship: string;
      }>;

      // Additional Info
      funFacts: string[];
      artistSignature?: string;
      
      // Metadata
      createdAt: Date;
      updatedAt: Date;
      uploadedBy: string;
      imageUrl: string;
    }

    // Keep AnalyzedArtwork, but it will now get 'analysis' from the backend
    export interface AnalyzedArtwork extends DetailedArtwork {
      analyzedAt: Date;
      analysis: {
        style: string;
        period: string;
        confidence: number;
        colors: string[];
        subjects: string[];
      };
    }
