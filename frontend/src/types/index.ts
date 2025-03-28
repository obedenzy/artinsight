export interface Artwork {
  id: string;
  title: string;
  imageUrl: string;
  artist: string;
  uploadedBy: string;
  analysis?: ArtworkAnalysis;
  createdAt: Date;
}

export interface ArtworkAnalysis {
  style: string;
  period: string;
  medium: string;
  colors: string[];
  subjects: string[];
  confidence: number;
}

export interface Game {
  id: string;
  title: string;
  artworkId: string;
  type: 'quiz' | 'matching' | 'timeline';
  questions: GameQuestion[];
  createdBy: string;
  price: number;
}
