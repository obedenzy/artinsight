import { AnalyzedArtwork } from '../types/artwork';

export function generateMockArtworkData(file: File): AnalyzedArtwork {
  const now = new Date();
  const id = 'upload-' + now.getTime();
  const title = file.name.replace(/\.[^/.]+$/, "").replace(/-|_/g, ' ');

  return {
    id,
    title,
    artist: 'Unknown Artist',
    imageUrl: URL.createObjectURL(file),
    dateCreated: now.getFullYear().toString(),
    medium: 'Digital / Mixed Media',
    dimensions: {
      height: 100,
      width: 150,
      unit: 'cm'
    },
    style: 'Contemporary',
    movement: 'Digital Art',
    influences: ['Modern Art', 'Digital Culture', 'Photography'],
    techniques: ['Digital Photography', 'Post-processing', 'Mixed Media'],
    composition: 'Balanced composition with focal elements',
    colorPalette: ['#2C3E50', '#E74C3C', '#ECF0F1', '#3498DB', '#2ECC71'],
    perspective: 'Mixed perspective',
    texture: 'Digital texture with photographic elements',
    lighting: 'Natural and artificial lighting elements',
    historicalPeriod: 'Contemporary (21st Century)',
    culturalBackground: 'Contemporary Digital Culture',
    politicalContext: 'Modern Digital Era',
    philosophicalContext: 'Intersection of digital and traditional art forms',
    theme: 'Contemporary Expression',
    narrative: 'Modern interpretation of traditional art forms',
    symbols: [
      { element: 'Digital Medium', meaning: 'Contemporary expression' },
      { element: 'Composition', meaning: 'Artistic intent' }
    ],
    subjectType: 'other',
    origin: {
      location: 'Digital Creation',
      date: now.toISOString()
    },
    ownershipHistory: [
      { owner: 'Original Artist', period: now.getFullYear().toString() }
    ],
    currentLocation: 'Digital Archive',
    estimatedValue: 1000,
    exhibitions: [
      {
        name: 'Digital Art Exhibition',
        location: 'Virtual Gallery',
        date: now.getFullYear().toString()
      }
    ],
    marketTrends: {
      dates: [
        '2020',
        '2021',
        '2022',
        '2023',
        now.getFullYear().toString()
      ],
      values: [800, 850, 900, 950, 1000]
    },
    popularityMetrics: {
      monthlyViews: 100,
      socialMentions: 50,
      academicCitations: 0
    },
    criticalReception: 'Recently created digital artwork pending critical review',
    culturalImpact: 'Part of the contemporary digital art movement',
    currentSignificance: 'Represents modern digital art practices',
    hasDigitalReconstruction: true,
    digitalInsights: {
      reconstruction: 'Original digital creation',
      interactiveFeatures: ['Digital viewing', 'Zoom capability']
    },
    aiAnalysis: {
      authenticityScore: 0.95,
      hiddenDetails: ['Digital signature', 'Metadata embedded'],
      styleConfidence: 0.90
    },
    scholarlyAnalysis: [
      {
        author: 'AI Art Analyzer',
        publication: 'Digital Art Review',
        summary: 'Contemporary digital artwork showing modern techniques'
      }
    ],
    relatedWorks: [],
    purpose: 'Digital art expression',
    inspiration: 'Contemporary digital culture',
    intendedMessage: 'Fusion of traditional and digital art forms',
    funFacts: [
      'Created using modern digital techniques',
      'Part of the contemporary digital art movement'
    ],
    artistSignature: 'Digital Signature',
    createdAt: now,
    updatedAt: now,
    uploadedBy: 'user',
    analyzedAt: now,
    analysis: {
      style: 'Contemporary Digital',
      period: now.getFullYear().toString(),
      confidence: 0.95,
      colors: ['#2C3E50', '#E74C3C', '#ECF0F1', '#3498DB', '#2ECC71'],
      subjects: ['digital art', 'contemporary', 'mixed media']
    }
  };
}
