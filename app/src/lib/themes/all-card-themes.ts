// Theme collection - All themes from original-github-themes
import {
  professionalThemes,
  type OriginalGitHubTheme,
  FunIllustrations
} from './original-github-themes';

// Unified theme interface
export type UnifiedCardTheme = OriginalGitHubTheme;

// All professional themes (30+ themes)
export const allCardThemes: UnifiedCardTheme[] = [
  ...professionalThemes  // All professional themes
];

// Helper function to get theme by index
export function getAllThemeByIndex(index: number): UnifiedCardTheme {
  return allCardThemes[index % allCardThemes.length];
}

// Theme categories
export const themeCategories = {
  professional: {
    name: '💼 Thèmes Créatifs',
    startIndex: 0,
    endIndex: 28,
    themes: professionalThemes
  },
  kidFriendly: {
    name: '🎨 Kid Friendly',
    startIndex: 4,
    endIndex: 8,
    themes: professionalThemes.slice(4, 9)
  }
};

// Export for backward compatibility
export { FunIllustrations } from './original-github-themes';