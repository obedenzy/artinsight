// Update the GamePrize interface to support custom prizes
export interface GamePrize {
  rank: number;
  type: 'monetary' | 'custom';
  amount?: number;
  description?: string;
  imageUrl?: string;
}

export interface Game {
  id: string;
  title: string;
  description: string;
  type: GameType;
  artwork: {
    id: string;
    title: string;
    artist: string;
    imageUrl: string;
  };
  questions: GameQuestion[];
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  startDate: Date;
  endDate: Date;
  isFinished: boolean;
  difficulty: 'easy' | 'medium' | 'hard';
  timeLimit: number;
  maxParticipants: number;
  entryFee: number;
  prizes: GamePrize[];
  participants: string[];
  tags: string[];
}
