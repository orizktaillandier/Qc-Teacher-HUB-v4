// Core type definitions for Quebec Teacher Hub v5

// Theme Types
export interface CardTheme {
  name: string;
  gradient?: string;
  background?: string;
  pattern?: string;
  cardBackground?: string;
  primary: string;
  secondary: string;
  accent?: string;
  text: string;
  border?: string;
  contentBorder?: string;
  contentBorderStyle?: string;
  shadow?: string;
  decorativeElements?: string[];
  illustration?: string;
  category?: 'cute' | 'elegant' | 'fun' | 'educational' | 'seasonal';
  season?: string;
}

// Card Types
export interface Card {
  number: number;
  question: string;
  answer?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  subject?: string;
  grade?: string;
  theme?: CardTheme;
}

// Generation Types
export interface GenerationParams {
  subject: string;
  grade: string;
  topic: string;
  difficulty?: string;
  count?: number;
  language?: 'fr' | 'en';
  includeAnswers?: boolean;
}

// Knowledge Types
export interface KnowledgeQuery {
  subjectKey: string;
  notionKey?: string;
  cycleKeys?: string[];
  maxTokens?: number;
}

export interface KnowledgeResult {
  content: string;
  tokens: number;
  chunks: number;
  metadata?: {
    subject: string;
    notion?: string;
    cycles?: string[];
  };
}

// Illustration Types
export type IllustrationTheme =
  | 'watermelon' | 'pineapple' | 'sunglasses' | 'pencil' | 'book' | 'star' | 'maple'
  | 'kawaii-cat' | 'kawaii-ghost' | 'kawaii-planet' | 'kawaii-icecream'
  | 'learning' | 'teaching' | 'reading' | 'science' | 'math'
  | 'art' | 'music' | 'sports' | 'nature' | 'technology'
  | 'collaboration' | 'celebration' | 'creativity' | 'discovery'
  | 'family' | 'childhood' | 'playtime' | 'friendship'
  | 'gaming' | 'outdoor' | 'wellness' | 'birthday'
  | 'avatars-beam' | 'avatars-marble' | 'avatars-pixel'
  | 'nice-avatar-boy' | 'nice-avatar-girl' | 'nice-avatar-teacher'
  | 'digital' | 'social' | 'video'
  | 'random' | 'mixed' | 'surprise';

export interface IllustrationConfig {
  type: 'kawaii' | 'undraw' | 'icon' | 'emoji' | 'avatar';
  theme: IllustrationTheme;
  size?: number;
  color?: string;
  mood?: 'sad' | 'shocked' | 'happy' | 'blissful' | 'lovestruck' | 'excited' | 'ko';
}

// Transform Types for positioning
export interface Transform {
  x: number;
  y: number;
  scale: number;
  rotation: number;
}

export interface Position {
  x: number;
  y: number;
}