import { GameType, GameQuestion } from '../types/game';
import { DetailedArtwork } from '../types/artwork';

const generators: Record<GameType, (artwork: DetailedArtwork) => GameQuestion[]> = {
  movement: (artwork) => ([{
    id: `q-${Date.now()}-1`,
    type: 'movement',
    question: 'Which art movement does this artwork belong to?',
    options: ['Impressionism', artwork.style, 'Surrealism', 'Abstract Expressionism'],
    correctAnswer: artwork.style,
    points: 10,
    imageUrl: artwork.imageUrl
  }]),

  trivia: (artwork) => ([{
    id: `q-${Date.now()}-1`,
    type: 'trivia',
    question: `Who created "${artwork.title}"?`,
    options: ['Claude Monet', artwork.artist, 'Vincent van Gogh', 'Pablo Picasso'],
    correctAnswer: artwork.artist,
    points: 10
  }]),

  'spot-fake': (artwork) => ([{
    id: `q-${Date.now()}-1`,
    type: 'spot-fake',
    question: 'Which version is the original artwork?',
    options: ['Version A', 'Version B', 'Version C', 'Version D'],
    correctAnswer: 'Version A',
    points: 15,
    imageUrl: artwork.imageUrl
  }]),

  puzzle: (artwork) => ([{
    id: `q-${Date.now()}-1`,
    type: 'puzzle',
    question: 'Reconstruct the artwork by arranging the pieces',
    correctAnswer: 'correct-arrangement',
    points: 20,
    imageUrl: artwork.imageUrl
  }]),

  symbols: (artwork) => (artwork.symbols?.map((symbol, index) => ({
    id: `q-${Date.now()}-${index}`,
    type: 'symbols',
    question: 'What does this symbol represent?',
    options: [symbol.meaning, 'Power', 'Nature', 'Love'],
    correctAnswer: symbol.meaning,
    points: 10,
    details: { symbols: [symbol.element] }
  })) || []),

  matching: (artwork) => ([{
    id: `q-${Date.now()}-1`,
    type: 'matching',
    question: 'Match the artwork with its correct title',
    options: [artwork.title, 'Starry Night', 'Mona Lisa', 'The Scream'],
    correctAnswer: artwork.title,
    points: 10
  }]),

  story: (artwork) => ([{
    id: `q-${Date.now()}-1`,
    type: 'story',
    question: 'Write a story inspired by this artwork',
    correctAnswer: '',
    points: 25,
    imageUrl: artwork.imageUrl
  }]),

  quiz: (artwork) => ([{
    id: `q-${Date.now()}-1`,
    type: 'quiz',
    question: `What technique was used in "${artwork.title}"?`,
    options: artwork.techniques || ['Oil painting', 'Watercolor', 'Acrylic', 'Mixed media'],
    correctAnswer: artwork.techniques?.[0] || 'Oil painting',
    points: 10
  }]),

  mystery: (artwork) => ([{
    id: `q-${Date.now()}-1`,
    type: 'mystery',
    question: 'Solve the riddle to reveal a hidden detail',
    hint: 'Look closely at the corners',
    correctAnswer: artwork.symbols?.[0]?.element || '',
    points: 20
  }]),

  color: (artwork) => ([{
    id: `q-${Date.now()}-1`,
    type: 'color',
    question: 'Match the dominant colors in this artwork',
    options: artwork.colorPalette || ['#000000', '#FFFFFF', '#FF0000', '#0000FF'],
    correctAnswer: artwork.colorPalette?.[0] || '#000000',
    points: 15
  }]),

  era: (artwork) => ([{
    id: `q-${Date.now()}-1`,
    type: 'era',
    question: 'Which historical period does this artwork belong to?',
    options: [artwork.historicalPeriod, 'Renaissance', 'Modern', 'Contemporary'],
    correctAnswer: artwork.historicalPeriod,
    points: 15
  }]),

  zoom: (artwork) => ([{
    id: `q-${Date.now()}-1`,
    type: 'zoom',
    question: 'Identify the artwork from this detail',
    imageUrl: artwork.imageUrl,
    options: [artwork.title, 'The Night Watch', 'The Kiss', 'The Birth of Venus'],
    correctAnswer: artwork.title,
    points: 20,
    details: { coordinates: [[100, 100], [200, 200]] }
  }]),

  emoji: (artwork) => ([{
    id: `q-${Date.now()}-1`,
    type: 'emoji',
    question: 'Choose the emojis that best represent this artwork',
    options: ['🎨', '🌟', '🌊', '🌙'],
    correctAnswer: ['🎨', '🌟'],
    points: 10
  }]),

  price: (artwork) => ([{
    id: `q-${Date.now()}-1`,
    type: 'price',
    question: 'Estimate the current market value of this artwork',
    options: [
      `$${artwork.estimatedValue?.toLocaleString() || '1,000,000'}`,
      '$500,000',
      '$2,000,000',
      '$5,000,000'
    ],
    correctAnswer: `$${artwork.estimatedValue?.toLocaleString() || '1,000,000'}`,
    points: 15
  }]),

  difference: (artwork) => ([{
    id: `q-${Date.now()}-1`,
    type: 'difference',
    question: 'Find all differences between these two versions',
    imageUrl: artwork.imageUrl,
    correctAnswer: ['color', 'detail', 'signature'],
    points: 20,
    details: { differences: ['color', 'detail', 'signature'] }
  }]),

  fact: (artwork) => ([{
    id: `q-${Date.now()}-1`,
    type: 'fact',
    question: `True or False: ${artwork.title} was painted in ${artwork.dateCreated}`,
    options: ['True', 'False'],
    correctAnswer: 'True',
    points: 10
  }]),

  detail: (artwork) => ([{
    id: `q-${Date.now()}-1`,
    type: 'detail',
    question: 'Identify this hidden detail in the artwork',
    imageUrl: artwork.imageUrl,
    options: artwork.symbols?.map(s => s.element) || ['Bird', 'Tree', 'House', 'Person'],
    correctAnswer: artwork.symbols?.[0]?.element || 'Bird',
    points: 15,
    details: { coordinates: [[150, 150]] }
  }]),

  reverse: (artwork) => ([{
    id: `q-${Date.now()}-1`,
    type: 'reverse',
    question: 'Which famous artist inspired this work?',
    options: [artwork.influences?.[0] || 'Vincent van Gogh', 'Claude Monet', 'Pablo Picasso', 'Salvador Dalí'],
    correctAnswer: artwork.influences?.[0] || 'Vincent van Gogh',
    points: 20
  }]),

  timeline: (artwork) => ([{
    id: `q-${Date.now()}-1`,
    type: 'timeline',
    question: 'Place this artwork in the correct time period',
    options: [artwork.dateCreated, '1800', '1900', '2000'],
    correctAnswer: artwork.dateCreated,
    points: 15
  }]),

  artist: (artwork) => ([{
    id: `q-${Date.now()}-1`,
    type: 'artist',
    question: 'Who is the artist of this work based on the style?',
    options: [artwork.artist, 'Claude Monet', 'Vincent van Gogh', 'Pablo Picasso'],
    correctAnswer: artwork.artist,
    points: 15
  }])
};

export function generateQuestions(type: GameType, artwork: DetailedArtwork): GameQuestion[] {
  const generator = generators[type];
  if (!generator) {
    throw new Error(`No question generator found for game type: ${type}`);
  }
  return generator(artwork);
}
