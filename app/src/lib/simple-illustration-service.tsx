import React from 'react';
import * as UndrawIllustrations from 'react-undraw-illustrations';
import {
  School, GraduationCap, BookOpen, Pencil, Calculator,
  Globe, Microscope, Palette, Music, Heart,
  Star, Trophy, Target, Lightbulb, Brain,
  Rocket, Atom, FlaskConical, Compass, Ruler,
  PenTool, Users, Smile, Baby, Bird,
  Fish, Flower, Trees, Sun, Moon,
  Cloud, Rainbow, Sparkles, Apple, Cherry,
  Cookie, Cake, Gamepad2, Puzzle, Drama,
  Camera, Headphones, Plane, Car, Bike,
  Train, Home, TreePine, Mountain, Waves
} from 'lucide-react';

// Available illustration themes
export type IllustrationTheme =
  | 'learning' | 'teaching' | 'reading' | 'science' | 'math'
  | 'art' | 'music' | 'sports' | 'nature' | 'technology'
  | 'collaboration' | 'celebration' | 'creativity' | 'discovery'
  | 'random';

// Illustration configuration
export interface IllustrationConfig {
  type: 'undraw' | 'icon' | 'emoji';
  component?: React.ComponentType<any>;
  icon?: React.ComponentType<any>;
  emoji?: string;
  primaryColor?: string;
  size?: number;
}

// Map of available Undraw illustrations suitable for education
const educationalUndrawComponents = {
  learning: [
    'UndrawEducation',
    'UndrawStudying',
    'UndrawReading',
    'UndrawBookLover',
    'UndrawBookshelves'
  ],
  teaching: [
    'UndrawTeacher',
    'UndrawTeaching',
    'UndrawProfessor',
    'UndrawPresentation'
  ],
  reading: [
    'UndrawReading',
    'UndrawBookLover',
    'UndrawBookshelves',
    'UndrawBibliophile'
  ],
  science: [
    'UndrawScience',
    'UndrawScientist',
    'UndrawChemistry'
  ],
  math: [
    'UndrawCalculator',
    'UndrawMathematics',
    'UndrawDataReport'
  ],
  art: [
    'UndrawCreativity',
    'UndrawArtist',
    'UndrawDesigner',
    'UndrawPalette'
  ],
  music: [
    'UndrawMusic',
    'UndrawCompose',
    'UndrawPlaylist'
  ],
  sports: [
    'UndrawWorkingOut',
    'UndrawHealthyHabit',
    'UndrawFitness'
  ],
  nature: [
    'UndrawNature',
    'UndrawWalk',
    'UndrawEnvironment'
  ],
  technology: [
    'UndrawProgramming',
    'UndrawCoding',
    'UndrawWebDeveloper'
  ],
  collaboration: [
    'UndrawTeamWork',
    'UndrawCollaboration',
    'UndrawTeamSpirit'
  ],
  celebration: [
    'UndrawCelebration',
    'UndrawWinners',
    'UndrawAwards'
  ],
  creativity: [
    'UndrawCreativity',
    'UndrawCreativeThinking',
    'UndrawIdeas'
  ],
  discovery: [
    'UndrawExploring',
    'UndrawAdventure',
    'UndrawTreasure'
  ]
};

// Icon collections for themes
const themeIcons = {
  learning: [School, BookOpen, Pencil, Brain, Lightbulb],
  teaching: [GraduationCap, Users, BookOpen, School],
  reading: [BookOpen, School, GraduationCap],
  science: [Microscope, Atom, FlaskConical, Brain],
  math: [Calculator, Ruler, Compass],
  art: [Palette, PenTool, Drama],
  music: [Music, Headphones],
  sports: [Trophy, Target],
  nature: [Trees, Flower, Sun, Moon, Cloud, Rainbow],
  technology: [Rocket, Atom],
  collaboration: [Users, Heart],
  celebration: [Trophy, Star, Sparkles],
  creativity: [Lightbulb, Brain, Palette],
  discovery: [Compass, Globe, Mountain]
};

// Educational emojis
const themeEmojis = {
  learning: ['📚', '✏️', '🎓', '💡', '🧠'],
  teaching: ['👨‍🏫', '👩‍🏫', '📝', '🎯', '📖'],
  reading: ['📖', '📚', '📕', '📗', '📘'],
  science: ['🔬', '🧪', '⚗️', '🔭', '🧬'],
  math: ['🔢', '➕', '➖', '✖️', '➗', '📐', '📏'],
  art: ['🎨', '🖌️', '🖍️', '✏️', '🎭'],
  music: ['🎵', '🎶', '🎼', '🎹', '🎸', '🥁'],
  sports: ['⚽', '🏀', '🏈', '⚾', '🎾', '🏐'],
  nature: ['🌳', '🌲', '🌺', '🌻', '🌈', '☀️', '🌙'],
  technology: ['💻', '🖥️', '⌨️', '🖱️', '💾', '🤖'],
  collaboration: ['🤝', '👥', '💪', '🙌', '👫'],
  celebration: ['🎉', '🎊', '🏆', '🥇', '⭐', '🌟'],
  creativity: ['💡', '🎨', '✨', '🌟', '🔮'],
  discovery: ['🔍', '🗺️', '🧭', '🏔️', '🌍']
};

// Color schemes for themes
const themeColors = {
  learning: '#3B82F6',    // Blue
  teaching: '#8B5CF6',    // Purple
  reading: '#10B981',     // Green
  science: '#06B6D4',     // Cyan
  math: '#F59E0B',        // Amber
  art: '#EC4899',         // Pink
  music: '#A78BFA',       // Light Purple
  sports: '#EF4444',      // Red
  nature: '#34D399',      // Emerald
  technology: '#6366F1',  // Indigo
  collaboration: '#F472B6', // Pink
  celebration: '#FBBF24', // Yellow
  creativity: '#C084FC',  // Purple
  discovery: '#14B8A6'    // Teal
};

class SimpleIllustrationService {
  // Get a random element from array
  private getRandomElement<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
  }

  // Get available themes for dropdown
  getAvailableThemes() {
    return [
      { value: 'random', label: '🎲 Aléatoire', icon: '🎲' },
      { value: 'learning', label: '📚 Apprentissage', icon: '📚' },
      { value: 'teaching', label: '👨‍🏫 Enseignement', icon: '👨‍🏫' },
      { value: 'reading', label: '📖 Lecture', icon: '📖' },
      { value: 'science', label: '🔬 Science', icon: '🔬' },
      { value: 'math', label: '🔢 Mathématiques', icon: '🔢' },
      { value: 'art', label: '🎨 Art', icon: '🎨' },
      { value: 'music', label: '🎵 Musique', icon: '🎵' },
      { value: 'sports', label: '⚽ Sports', icon: '⚽' },
      { value: 'nature', label: '🌿 Nature', icon: '🌿' },
      { value: 'technology', label: '💻 Technologie', icon: '💻' },
      { value: 'collaboration', label: '🤝 Collaboration', icon: '🤝' },
      { value: 'celebration', label: '🎉 Célébration', icon: '🎉' },
      { value: 'creativity', label: '✨ Créativité', icon: '✨' },
      { value: 'discovery', label: '🧭 Découverte', icon: '🧭' }
    ];
  }

  // Get theme color
  getThemeColor(theme: IllustrationTheme): string {
    if (theme === 'random') {
      const themes = Object.keys(themeColors) as IllustrationTheme[];
      theme = this.getRandomElement(themes);
    }
    return (themeColors as any)[theme] || '#3B82F6';
  }

  // Get illustration for a theme
  getThemeIllustration(theme: IllustrationTheme, index: number = 0): React.ReactElement | null {
    if (theme === 'random') {
      const themes = Object.keys(themeEmojis) as IllustrationTheme[];
      theme = this.getRandomElement(themes);
    }

    const color = this.getThemeColor(theme);

    // Try to use Undraw illustrations first
    const undrawList = (educationalUndrawComponents as any)[theme];
    if (undrawList && undrawList.length > 0) {
      const componentName = undrawList[index % undrawList.length];
      const Component = (UndrawIllustrations as any)[componentName];

      if (Component) {
        return (
          <div className="illustration-wrapper" style={{ width: '100%', height: '100%' }}>
            <Component primaryColor={color} height="100%" />
          </div>
        );
      }
    }

    // Fallback to icons
    const icons = (themeIcons as any)[theme];
    if (icons && icons.length > 0) {
      const IconComponent = icons[index % icons.length];
      return (
        <div className="illustration-wrapper" style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <IconComponent
            size={80}
            color={color}
            strokeWidth={1.5}
          />
        </div>
      );
    }

    // Final fallback to emojis
    const emojis = (themeEmojis as any)[theme];
    if (emojis && emojis.length > 0) {
      const emoji = emojis[index % emojis.length];
      return (
        <div className="illustration-wrapper" style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '64px'
        }}>
          {emoji}
        </div>
      );
    }

    return null;
  }

  // Get illustration based on content keywords
  getSmartIllustration(keywords: string[], index: number = 0): React.ReactElement | null {
    const keywordLower = keywords.join(' ').toLowerCase();

    // Map keywords to themes
    if (keywordLower.includes('math') || keywordLower.includes('calcul') || keywordLower.includes('nombre')) {
      return this.getThemeIllustration('math', index);
    }
    if (keywordLower.includes('science') || keywordLower.includes('expérience') || keywordLower.includes('découv')) {
      return this.getThemeIllustration('science', index);
    }
    if (keywordLower.includes('lire') || keywordLower.includes('lecture') || keywordLower.includes('livre')) {
      return this.getThemeIllustration('reading', index);
    }
    if (keywordLower.includes('art') || keywordLower.includes('dessin') || keywordLower.includes('couleur')) {
      return this.getThemeIllustration('art', index);
    }
    if (keywordLower.includes('musique') || keywordLower.includes('chanson') || keywordLower.includes('son')) {
      return this.getThemeIllustration('music', index);
    }
    if (keywordLower.includes('sport') || keywordLower.includes('exercice') || keywordLower.includes('jeu')) {
      return this.getThemeIllustration('sports', index);
    }
    if (keywordLower.includes('nature') || keywordLower.includes('animal') || keywordLower.includes('plante')) {
      return this.getThemeIllustration('nature', index);
    }
    if (keywordLower.includes('équipe') || keywordLower.includes('ensemble') || keywordLower.includes('groupe')) {
      return this.getThemeIllustration('collaboration', index);
    }

    // Default to learning theme
    return this.getThemeIllustration('learning', index);
  }
}

// Export singleton instance
const SimpleIllustrationServiceInstance = new SimpleIllustrationService();
export default SimpleIllustrationServiceInstance;