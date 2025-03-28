import { Game, GameType, GameQuestion } from '../types/game';
import { DetailedArtwork } from '../types/artwork';

// Mock storage with initial data
let games: Game[] = [
  {
    id: 'game-1',
    title: 'Starry Night Quiz Challenge',
    description: 'Test your knowledge about Van Gogh\'s masterpiece',
    type: 'quiz',
    artwork: {
      id: '1',
      title: 'Starry Night',
      artist: 'Vincent van Gogh',
      imageUrl: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?auto=format&fit=crop&q=80'
    },
    questions: [],
    createdBy: 'user',
    createdAt: new Date('2024-03-10'),
    updatedAt: new Date('2024-03-10'),
    startDate: new Date('2024-03-10'),
    endDate: new Date('2024-03-17'),
    isFinished: false,
    difficulty: 'medium',
    timeLimit: 10,
    maxParticipants: 100,
    entryFee: 2,
    prizes: [
      { rank: 1, amount: 100 },
      { rank: 2, amount: 50 },
      { rank: 3, amount: 25 }
    ],
    participants: ['user1', 'user2', 'user3', 'user4'],
    tags: ['painting', 'post-impressionism']
  },
  {
    id: 'game-2',
    title: 'Spot the Surreal',
    description: 'Find differences in Dalí\'s masterpiece',
    type: 'spot-fake',
    artwork: {
      id: '2',
      title: 'The Persistence of Memory',
      artist: 'Salvador Dalí',
      imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&q=80'
    },
    questions: [],
    createdBy: 'user',
    createdAt: new Date('2024-03-09'),
    updatedAt: new Date('2024-03-09'),
    startDate: new Date('2024-03-09'),
    endDate: new Date('2024-03-16'),
    isFinished: true,
    difficulty: 'hard',
    timeLimit: 15,
    maxParticipants: 50,
    entryFee: 2,
    prizes: [
      { rank: 1, amount: 150 },
      { rank: 2, amount: 75 }
    ],
    participants: ['user1', 'user2', 'user3', 'user4', 'user5', 'user6'],
    tags: ['surrealism', 'spot-differences']
  },
  {
    id: 'game-3',
    title: 'Pearl Earring Puzzle',
    description: 'Piece together Vermeer\'s famous painting',
    type: 'puzzle',
    artwork: {
      id: '3',
      title: 'Girl with a Pearl Earring',
      artist: 'Johannes Vermeer',
      imageUrl: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&q=80'
    },
    questions: [],
    createdBy: 'user',
    createdAt: new Date('2024-03-08'),
    updatedAt: new Date('2024-03-08'),
    startDate: new Date('2024-03-15'),
    endDate: new Date('2024-03-22'),
    isFinished: false,
    difficulty: 'easy',
    timeLimit: 20,
    maxParticipants: 200,
    entryFee: 2,
    prizes: [
      { rank: 1, amount: 200 },
      { rank: 2, amount: 100 },
      { rank: 3, amount: 50 }
    ],
    participants: ['user1', 'user2'],
    tags: ['baroque', 'puzzle']
  }
];

export async function getAllGames(): Promise<Game[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...games]);
    }, 500);
  });
}

export async function getGameDetails(id: string): Promise<Game | null> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const game = games.find(g => g.id === id) || null;
      resolve(game);
    }, 500);
  });
}

export async function getGamesByArtist(artistId: string): Promise<Game[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const artistGames = games.filter(game => game.createdBy === artistId);
      resolve(artistGames);
    }, 500);
  });
}

export async function getExistingGames(artworkId: string): Promise<Game[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const artworkGames = games.filter(game => game.artwork.id === artworkId);
      resolve(artworkGames);
    }, 500);
  });
}

export async function createGame(
  type: GameType,
  artwork: DetailedArtwork,
  questions: GameQuestion[],
  settings: Partial<Game>
): Promise<Game> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const game: Game = {
        id: `game-${Date.now()}`,
        title: settings.title || `${artwork.title} - ${type}`,
        description: settings.description || `Test your knowledge about ${artwork.title}`,
        type,
        artwork: {
          id: artwork.id,
          title: artwork.title,
          artist: artwork.artist,
          imageUrl: artwork.imageUrl
        },
        questions,
        createdBy: 'user', // Replace with actual user ID when auth is implemented
        createdAt: new Date(),
        updatedAt: new Date(),
        isFinished: false,
        difficulty: settings.difficulty || 'medium',
        timeLimit: settings.timeLimit || 10,
        maxParticipants: settings.maxParticipants || 100,
        entryFee: 2,
        prizes: settings.prizes || [
          { rank: 1, amount: 100 },
          { rank: 2, amount: 50 }
        ],
        participants: [],
        tags: settings.tags || []
      };

      games = [game, ...games];
      resolve(game);
    }, 500);
  });
}

export async function publishGame(id: string): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const game = games.find(game => game.id === id);
      if (game) {
        game.isFinished = true;
        game.updatedAt = new Date();
      }
      resolve();
    }, 500);
  });
}

export async function deleteGame(id: string): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      games = games.filter(game => game.id !== id);
      resolve();
    }, 500);
  });
}
