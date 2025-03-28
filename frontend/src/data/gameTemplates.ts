import { GameTemplate } from '../types/game';
import { 
  Palette, Brain, Eye, Puzzle, Search, 
  Clock, BookOpen, Trophy, Lock, Droplets,
  Calendar, ZoomIn, MessageSquare, DollarSign,
  FileSearch, CheckSquare, Target, RotateCcw, History, User
} from 'lucide-react';

export const GAME_TEMPLATES: GameTemplate[] = [
  {
    type: 'movement',
    title: 'Guess the Art Movement',
    description: 'Identify art movements based on visual clues',
    icon: Palette.name,
    minQuestions: 5,
    maxQuestions: 20,
    supportedQuestionTypes: ['movement']
  },
  {
    type: 'trivia',
    title: 'Trivia Time',
    description: 'Test knowledge about the artist and artwork context',
    icon: Brain.name,
    minQuestions: 10,
    maxQuestions: 30,
    supportedQuestionTypes: ['trivia']
  },
  {
    type: 'spot-fake',
    title: 'Spot the Fake',
    description: 'Identify the fake piece among similar artworks',
    icon: Eye.name,
    minQuestions: 5,
    maxQuestions: 15,
    supportedQuestionTypes: ['spot-fake']
  },
  {
    type: 'puzzle',
    title: 'Complete the Artwork',
    description: 'Piece together a painting in this puzzle challenge',
    icon: Puzzle.name,
    minQuestions: 1,
    maxQuestions: 5,
    supportedQuestionTypes: ['puzzle']
  },
  {
    type: 'symbols',
    title: 'Hidden Symbols',
    description: 'Find hidden symbols or motifs within a piece',
    icon: Search.name,
    minQuestions: 3,
    maxQuestions: 10,
    supportedQuestionTypes: ['symbols']
  },
  {
    type: 'matching',
    title: 'Artistic Match',
    description: 'Match paintings with their titles or artists',
    icon: Lock.name,
    minQuestions: 5,
    maxQuestions: 15,
    supportedQuestionTypes: ['matching']
  },
  {
    type: 'story',
    title: 'What\'s the Story?',
    description: 'Write creative stories inspired by artworks',
    icon: MessageSquare.name,
    minQuestions: 1,
    maxQuestions: 5,
    supportedQuestionTypes: ['story']
  },
  {
    type: 'quiz',
    title: 'Art Quiz Showdown',
    description: 'Compete in multiplayer elimination rounds',
    icon: Trophy.name,
    minQuestions: 10,
    maxQuestions: 30,
    supportedQuestionTypes: ['quiz']
  },
  {
    type: 'mystery',
    title: 'Uncover the Mystery',
    description: 'Solve riddles about enigmatic artworks',
    icon: Search.name,
    minQuestions: 3,
    maxQuestions: 10,
    supportedQuestionTypes: ['mystery']
  },
  {
    type: 'color',
    title: 'The Color Challenge',
    description: 'Match color palettes to specific artworks',
    icon: Droplets.name,
    minQuestions: 5,
    maxQuestions: 15,
    supportedQuestionTypes: ['color']
  },
  {
    type: 'era',
    title: 'Find the Era',
    description: 'Guess the era based on style and elements',
    icon: Calendar.name,
    minQuestions: 5,
    maxQuestions: 15,
    supportedQuestionTypes: ['era']
  },
  {
    type: 'zoom',
    title: 'Zoom In',
    description: 'Identify artworks from zoomed-in portions',
    icon: ZoomIn.name,
    minQuestions: 5,
    maxQuestions: 15,
    supportedQuestionTypes: ['zoom']
  },
  {
    type: 'emoji',
    title: 'Emoji Art Game',
    description: 'Describe artworks using only emojis',
    icon: MessageSquare.name,
    minQuestions: 3,
    maxQuestions: 10,
    supportedQuestionTypes: ['emoji']
  },
  {
    type: 'price',
    title: 'Guess the Price',
    description: 'Estimate artwork auction prices',
    icon: DollarSign.name,
    minQuestions: 5,
    maxQuestions: 15,
    supportedQuestionTypes: ['price']
  },
  {
    type: 'difference',
    title: 'Spot the Difference',
    description: 'Find subtle differences between artwork versions',
    icon: FileSearch.name,
    minQuestions: 5,
    maxQuestions: 15,
    supportedQuestionTypes: ['difference']
  },
  {
    type: 'fact',
    title: 'Fact or Fiction',
    description: 'Determine if artwork facts are true or false',
    icon: CheckSquare.name,
    minQuestions: 5,
    maxQuestions: 15,
    supportedQuestionTypes: ['fact']
  },
  {
    type: 'detail',
    title: 'Name the Detail',
    description: 'Identify hidden elements in complex paintings',
    icon: Target.name,
    minQuestions: 5,
    maxQuestions: 15,
    supportedQuestionTypes: ['detail']
  },
  {
    type: 'reverse',
    title: 'Reverse Artist Guess',
    description: 'Guess which artist inspired an artwork',
    icon: RotateCcw.name,
    minQuestions: 3,
    maxQuestions: 10,
    supportedQuestionTypes: ['reverse']
  },
  {
    type: 'timeline',
    title: 'Time Traveler\'s Art',
    description: 'Place artworks in chronological order',
    icon: History.name,
    minQuestions: 5,
    maxQuestions: 15,
    supportedQuestionTypes: ['timeline']
  },
  {
    type: 'artist',
    title: 'Who Painted It?',
    description: 'Identify artists by their unique styles',
    icon: User.name,
    minQuestions: 5,
    maxQuestions: 15,
    supportedQuestionTypes: ['artist']
  }
];
