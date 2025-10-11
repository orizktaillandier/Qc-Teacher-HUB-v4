// ALL themes from the original GitHub repository and new teacher-loved themes
import {
  originalGitHubThemes,
  professionalThemes,
  pastelGradientThemes,
  illustrationThemes,
  type OriginalGitHubTheme
} from './original-github-themes';

import {
  teacherLovedThemes,
  type TeacherTheme
} from './teacher-loved-themes';

// Unified theme interface that supports both types
export type UnifiedCardTheme = OriginalGitHubTheme | (TeacherTheme & { type?: 'teacher' });

// Convert teacher themes to include type
const teacherThemesWithType = teacherLovedThemes.map(theme => ({
  ...theme,
  type: 'teacher' as const
}));

// All themes combined
export const allCardThemes: UnifiedCardTheme[] = [
  ...originalGitHubThemes,  // 19 themes total (4 professional + 8 pastel + 7 illustration)
  ...teacherThemesWithType   // 40 teacher-loved themes (15 original + 15 batch2 + 10 unique)
];

// Helper function to get theme by index
export function getAllThemeByIndex(index: number): UnifiedCardTheme {
  return allCardThemes[index % allCardThemes.length];
}

// Helper to categorize themes by type
export const themeCategories = {
  professional: {
    name: '💼 Professional Themes',
    startIndex: 0,
    endIndex: professionalThemes.length - 1,
    themes: professionalThemes
  },
  pastel: {
    name: '🎨 Pastel Gradient Themes',
    startIndex: professionalThemes.length,
    endIndex: professionalThemes.length + pastelGradientThemes.length - 1,
    themes: pastelGradientThemes
  },
  illustration: {
    name: '🎈 Fun Illustration Themes',
    startIndex: professionalThemes.length + pastelGradientThemes.length,
    endIndex: originalGitHubThemes.length - 1,
    themes: illustrationThemes
  },
  teacher: {
    name: '🌟 Teacher Favorites',
    startIndex: originalGitHubThemes.length,
    endIndex: originalGitHubThemes.length + teacherLovedThemes.length - 1,
    themes: teacherThemesWithType
  }
};

// Export for backward compatibility
export { originalGitHubThemes, FunIllustrations } from './original-github-themes';