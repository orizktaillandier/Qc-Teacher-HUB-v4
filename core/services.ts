// Service interfaces for Quebec Teacher Hub v5
import type {
  CardTheme,
  Card,
  GenerationParams,
  KnowledgeQuery,
  KnowledgeResult,
  IllustrationConfig,
  IllustrationTheme
} from './types';

/**
 * Theme Service Interface
 * Manages all card themes
 */
export interface ThemeService {
  getAllThemes(): CardTheme[];
  getThemeByIndex(index: number): CardTheme;
  getThemesByCategory(category: string): CardTheme[];
  getTeacherLovedThemes(): CardTheme[];
  getOriginalThemes(): CardTheme[];
}

/**
 * Card Generator Service Interface
 * Handles AI-powered card generation
 */
export interface CardGeneratorService {
  generateCards(params: GenerationParams): Promise<Card[]>;
  validateCard(card: Card): boolean;
  enhanceWithKnowledge(card: Card, knowledge: KnowledgeResult): Card;
}

/**
 * Knowledge Service Interface
 * Manages Quebec curriculum knowledge base
 */
export interface KnowledgeService {
  retrieveKnowledge(query: KnowledgeQuery): KnowledgeResult;
  getAvailableSubjects(): string[];
  getNotionsForSubject(subject: string): string[];
  getAvailableCycles(): string[];
}

/**
 * Illustration Service Interface
 * Manages illustration generation and themes
 */
export interface IllustrationService {
  getIllustration(theme: IllustrationTheme, index?: number): IllustrationConfig;
  getAvailableThemes(): Array<{value: string; label: string; icon: string}>;
  getThemeColor(theme: IllustrationTheme): string;
  getSmartIllustration(keywords: string[], index?: number): IllustrationConfig;
}

/**
 * Export Service Interface
 * Handles PDF and image exports
 */
export interface ExportService {
  exportToPDF(cards: Card[], options?: ExportOptions): Promise<Blob>;
  exportToImage(cards: Card[], format?: 'png' | 'jpg'): Promise<Blob>;
  exportToJSON(cards: Card[]): string;
}

export interface ExportOptions {
  includeAnswers?: boolean;
  format?: 'student' | 'teacher';
  theme?: CardTheme;
}