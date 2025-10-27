/**
 * TypeScript Type Definitions for Drill Sheets (Fiches d'exercices)
 * Quebec Teacher Hub v5 - Drill Sheet Feature
 */

// =============================================================================
// EXERCISE TYPES
// =============================================================================

/**
 * Difficulty levels for exercises
 */
export type ExerciseDifficulty = 'easy' | 'medium' | 'hard';

/**
 * Difficulty distribution strategies
 */
export type DifficultyStrategy = 'uniform' | 'progressive' | 'mixed';

/**
 * Exercise format styles
 */
export type ExerciseFormat = 'horizontal' | 'vertical' | 'grid' | 'diagram' | 'text';

/**
 * Exercise layout for rendering (affects grid placement)
 */
export type ExerciseLayout = 'compact' | 'full-width';

/**
 * Sub-part of a multi-part exercise
 */
export interface ExerciseSubPart {
  letter: string;                           // Sub-part letter (a, b, c, etc.)
  question: string;                         // The sub-question
  answer: string | number | string[];       // The correct answer
  choices?: string[];                       // Multiple choice options for this sub-part
  imageUrl?: string;                        // Optional image for this sub-part
  requiresDrawing?: boolean;                // This sub-part requires drawing
  drawingShapes?: 'triangle' | 'square' | 'circle' | 'star' | 'rectangle';
  drawingCount?: number;
  workspaceHeight?: number;
}

/**
 * Base interface for all drill exercises
 */
export interface DrillExercise {
  number: number;                           // Exercise number (1, 2, 3...)
  type: string;                             // Exercise type (e.g., 'addition', 'conjugation')
  question: string;                         // The exercise question/prompt
  answer: string | number | string[] | boolean;  // The correct answer(s)
  difficulty?: ExerciseDifficulty;          // Optional difficulty level

  // Optional fields depending on exercise type
  context?: string;                         // Additional context (e.g., reading passage)
  choices?: string[];                       // Multiple choice options
  format?: ExerciseFormat;                  // Visual format preference
  workSpace?: boolean;                      // Show extra space for student work
  imageUrl?: string;                        // URL for diagrams, maps, etc.
  metadata?: Record<string, any>;           // Flexible for future needs

  // NEW: Scoring and drawing features
  points?: number;                          // Point value for this exercise (e.g., 8pts)
  requiresDrawing?: boolean;                // Exercise requires student to draw
  drawingShapes?: 'triangle' | 'square' | 'circle' | 'star' | 'rectangle';  // Shape type for drawing exercises
  drawingCount?: number;                    // Number of shapes to draw
  workspaceHeight?: number;                 // Custom workspace height in pixels

  // NEW: Multi-part questions (sub-parts a, b, c, etc.)
  subParts?: ExerciseSubPart[];             // Array of sub-parts (e.g., a, b, c, d, e, f)
  isMultiPart?: boolean;                    // Flag to indicate this is a multi-part question

  // NEW: Layout control for grid rendering
  layout?: ExerciseLayout;                  // 'compact' for simple calculations (2 per row), 'full-width' for word problems
}

/**
 * Math-specific exercise interface
 */
export interface MathExercise extends DrillExercise {
  type: 'addition' | 'subtraction' | 'multiplication' | 'division' |
        'fraction' | 'decimal' | 'geometry' | 'measurement' |
        'word-problem' | 'pattern' | 'comparison';
  answer: number | string;                  // Number or formatted string (e.g., "3/4")
  showWork?: boolean;                       // Show space for calculation steps
  unit?: string;                            // Unit of measurement (e.g., "cm", "kg", "$")
}

/**
 * French-specific exercise interface
 */
export interface FrenchExercise extends DrillExercise {
  type: 'grammar' | 'conjugation' | 'spelling' | 'vocabulary' |
        'comprehension' | 'writing' | 'identification' | 'agreement';
  answer: string | string[];                // Text answer or multiple answers
  acceptableAnswers?: string[];             // Alternative correct answers
  explanation?: string;                     // Brief explanation for answer key
}

/**
 * Science-specific exercise interface
 */
export interface ScienceExercise extends DrillExercise {
  type: 'true-false' | 'matching' | 'labeling' | 'short-answer' |
        'classification' | 'sequencing';
  answer: string | string[] | boolean;
  diagramId?: string;                       // Reference to diagram image
}

// =============================================================================
// DRILL SHEET TYPES
// =============================================================================

/**
 * Theme options for drill sheets
 */
export type DrillSheetTheme = 'simple' | 'colorful' | 'minimal';

/**
 * Decorative border styles for drill sheets
 */
export type DrillSheetBorder = 'none' | 'dots' | 'corners' | 'waves' | 'maple' | 'dashes' | 'stars' | 'brackets' | 'notebook';

/**
 * Request payload for drill sheet generation
 */
export interface DrillSheetGenerationRequest {
  // PFEQ filters (required)
  cycle: string;
  grade: string;
  subject: string;
  notion: string;
  subNotions?: string[];

  // Drill sheet specific settings
  exerciseCount?: number;                   // Default: 15 for math, 12 for french
  difficulty?: DifficultyStrategy;          // Default: 'uniform'
  includeAnswerKey?: boolean;               // Default: true

  // Optional styling hints for prompt
  exerciseTypes?: string[];                 // Specific exercise types to include
  theme?: DrillSheetTheme;                  // Visual theme
}

/**
 * Response from drill sheet generation API
 */
export interface DrillSheetGenerationResponse {
  success: true;
  data: {
    exercises: DrillExercise[];
    metadata: {
      subject: string;
      notion: string;
      subNotions: string[];
      cycle: string;
      grade: string;
      exerciseCount: number;
      difficulty: DifficultyStrategy;
      generatedAt: string;                  // ISO timestamp
      sessionId: string;
      modelUsed: string;                    // 'gpt-5' or 'gpt-5-mini'
    }
  }
}

/**
 * Error response structure
 */
export interface DrillSheetErrorResponse {
  success: false;
  error: string;
  details?: any;
}

/**
 * Combined API response type
 */
export type DrillSheetApiResponse =
  | DrillSheetGenerationResponse
  | DrillSheetErrorResponse;

// =============================================================================
// DRILL SHEET DATA TYPES
// =============================================================================

/**
 * Complete drill sheet data structure (matches Prisma model)
 */
export interface DrillSheetData {
  id: string;
  userId: string;

  // PFEQ metadata
  cycle: string;
  grade: string;
  subject: string;
  notion: string;
  subNotions: string[];                     // Parsed JSON array

  // Drill sheet settings
  exerciseCount: number;
  difficulty: DifficultyStrategy;
  includeAnswerKey: boolean;

  // Styling
  theme: DrillSheetTheme;
  fontFamily?: string;
  fontSize: number;
  isBold?: boolean;
  isItalic?: boolean;
  headerStyle?: HeaderStyle;

  // Grid layout
  gridColumns?: number;
  gridRows?: number;

  // NEW: Decorative borders and scoring
  decorativeBorder?: DrillSheetBorder;      // Decorative border style
  showScoring?: boolean;                    // Show scoring footer (___/total ___%)
  totalPoints?: number;                     // Total points for all exercises

  // Generated content
  exercises: DrillExercise[];

  // Optional customization
  customTitle?: string;
  customInstructions?: string;
  showDifficulty: boolean;

  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Shared drill sheet data (includes sharing metadata)
 */
export interface SharedDrillSheetData extends DrillSheetData {
  authorName?: string;
  authorEmail?: string;
  views: number;
  copies: number;
  sharedAt: Date;
}

/**
 * Header styling options
 */
export interface HeaderStyle {
  color?: string;
  bold?: boolean;
  fontSize?: number;
  backgroundColor?: string;
  borderColor?: string;
}

// =============================================================================
// SAVE / LIBRARY TYPES
// =============================================================================

/**
 * Payload for saving drill sheet to library
 */
export interface SaveDrillSheetRequest {
  // PFEQ metadata
  cycle: string;
  grade: string;
  subject: string;
  notion: string;
  subNotions: string[];

  // Drill sheet settings
  exerciseCount: number;
  difficulty: DifficultyStrategy;
  includeAnswerKey: boolean;

  // Styling
  theme?: DrillSheetTheme;
  fontFamily?: string;
  fontSize?: number;
  headerStyle?: HeaderStyle;

  // Generated content
  exercises: DrillExercise[];

  // Optional customization
  customTitle?: string;
  customInstructions?: string;
  showDifficulty?: boolean;
}

/**
 * Response from save drill sheet API
 */
export interface SaveDrillSheetResponse {
  success: true;
  drillSheetId: string;
}

/**
 * Paginated list of drill sheets
 */
export interface DrillSheetListResponse {
  success: true;
  drillSheets: DrillSheetData[];
  total: number;
  page: number;
  pages: number;
}

// =============================================================================
// PDF EXPORT TYPES
// =============================================================================

/**
 * PDF generation options
 */
export interface DrillSheetPdfOptions {
  drillSheet: DrillSheetData;
  includeAnswerKey: boolean;
  pageSize?: 'a4' | 'letter';                // Default: 'a4'
  orientation?: 'portrait' | 'landscape';    // Default: 'portrait'
  fontSize?: number;
  fontFamily?: string;
}

/**
 * PDF generation result
 */
export interface DrillSheetPdfResult {
  success: boolean;
  filename?: string;
  error?: string;
}

// =============================================================================
// UI STATE TYPES
// =============================================================================

/**
 * UI state for drill generator page
 */
export interface DrillGeneratorState {
  // PFEQ filters
  selectedCycle: string | null;
  selectedGrade: string | null;
  selectedSubject: string | null;
  selectedNotion: string | null;
  selectedSubNotions: string[];

  // Drill sheet options
  exerciseCount: number;
  difficulty: DifficultyStrategy;
  includeAnswerKey: boolean;

  // Generation status
  isGenerating: boolean;
  generationProgress: number;
  generationMessage: string;

  // Generated content
  generatedExercises: DrillExercise[] | null;
  generationMetadata: DrillSheetGenerationResponse['data']['metadata'] | null;

  // Customization
  theme: DrillSheetTheme;
  fontFamily: string;
  fontSize: number;
  customTitle: string;
  customInstructions: string;
  showDifficulty: boolean;

  // PDF export
  isGeneratingPdf: boolean;
}

// =============================================================================
// UTILITY TYPES
// =============================================================================

/**
 * Subject-specific exercise type mapping
 */
export const ExerciseTypesBySubject: Record<string, string[]> = {
  'mathematiques': [
    'addition', 'subtraction', 'multiplication', 'division',
    'fraction', 'decimal', 'geometry', 'measurement',
    'word-problem', 'pattern', 'comparison'
  ],
  'francais-langue-enseignement': [
    'grammar', 'conjugation', 'spelling', 'vocabulary',
    'comprehension', 'writing', 'identification', 'agreement'
  ],
  'science-et-technologie': [
    'true-false', 'matching', 'labeling', 'short-answer',
    'classification', 'sequencing'
  ],
  'univers-social': [
    'geography', 'history', 'citizenship', 'map-reading',
    'timeline', 'scenario-based'
  ]
};

/**
 * Default exercise counts by subject
 */
export const DefaultExerciseCounts: Record<string, number> = {
  'mathematiques': 20,
  'francais-langue-enseignement': 15,
  'science-et-technologie': 12,
  'univers-social': 12
};

/**
 * Exercise count ranges by subject
 */
export const ExerciseCountRanges: Record<string, { min: number; max: number }> = {
  'mathematiques': { min: 10, max: 30 },
  'francais-langue-enseignement': { min: 10, max: 25 },
  'science-et-technologie': { min: 8, max: 20 },
  'univers-social': { min: 8, max: 20 }
};

/**
 * Type guard to check if response is error
 */
export function isErrorResponse(
  response: DrillSheetApiResponse
): response is DrillSheetErrorResponse {
  return !response.success;
}

/**
 * Type guard to check if exercise is MathExercise
 */
export function isMathExercise(exercise: DrillExercise): exercise is MathExercise {
  return ExerciseTypesBySubject['mathematiques'].includes(exercise.type);
}

/**
 * Type guard to check if exercise is FrenchExercise
 */
export function isFrenchExercise(exercise: DrillExercise): exercise is FrenchExercise {
  return ExerciseTypesBySubject['francais-langue-enseignement'].includes(exercise.type);
}

/**
 * Type guard to check if exercise is ScienceExercise
 */
export function isScienceExercise(exercise: DrillExercise): exercise is ScienceExercise {
  return ExerciseTypesBySubject['science-et-technologie'].includes(exercise.type);
}
