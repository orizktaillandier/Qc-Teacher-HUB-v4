import React from 'react';
import {
  Ghost,
  IceCream,
  Planet,
  Backpack,
  Cat,
  CreditCard,
  Mug,
  Browser,
  SpeechBubble,
  File,
  Folder,
  Chocolate,
  Astronaut,
  Cyborg,
  HumanCat,
  HumanDinosaur
} from 'react-kawaii';

// Import education-related icons from lucide-react
import {
  School,
  GraduationCap,
  BookOpen,
  Pencil,
  Calculator,
  Globe,
  Microscope,
  Palette,
  Music,
  Heart,
  Star,
  Trophy,
  Medal,
  Target,
  Lightbulb,
  Brain,
  Rocket,
  Atom,
  FlaskConical,
  Compass,
  Ruler,
  PenTool,
  Eraser,
  Scissors,
  Paperclip,
  Clock,
  Calendar,
  Users,
  User,
  Smile,
  Frown,
  Laugh,
  Baby,
  Bird,
  Fish,
  Flower,
  Trees,
  Sun,
  Moon,
  Cloud,
  Rainbow,
  Sparkles,
  Pizza,
  Apple,
  Cherry,
  Grape,
  Carrot,
  Cookie,
  Cake,
  IceCream2,
  Coffee,
  Gamepad2,
  Dice1,
  Puzzle,
  Drama,
  Camera,
  Headphones,
  Plane,
  Car,
  Bike,
  Train,
  Ship,
  MapPin,
  Home,
  Building,
  Castle,
  TreePine,
  Mountain,
  Waves,
  Zap,
  Flame,
  Droplet,
  Snowflake,
  Wind,
  Bug,
  Cat as CatIcon,
  Dog,
  Rabbit,
  Squirrel,
  Turtle
} from 'lucide-react';

// Available moods for kawaii characters
type Mood = 'sad' | 'shocked' | 'happy' | 'blissful' | 'lovestruck' | 'excited' | 'ko';

// Character themes for consistent styling
export type CharacterTheme =
  | 'cat' | 'ghost' | 'planet' | 'icecream' | 'backpack' | 'mug' | 'browser' | 'chocolate'
  | 'astronaut' | 'cyborg' | 'humancat' | 'humandinosaur'
  | 'school' | 'science' | 'nature' | 'animals' | 'food' | 'sports' | 'music' | 'art'
  | 'random' | 'mixed';

// Illustration types
export type IllustrationType = 'kawaii' | 'icon' | 'emoji';

// Enhanced illustration config
export interface EnhancedIllustrationConfig {
  type: IllustrationType;
  component?: any;
  icon?: any;
  emoji?: string;
  mood?: Mood;
  color?: string;
  size?: number;
  keywords: string[];
  category?: string;
}

// Fun color palette for kids - expanded
const kidColors = {
  // Bright colors
  pink: '#FFB3E6',
  hotPink: '#FF69B4',
  purple: '#B19CD9',
  violet: '#8B7AB8',
  blue: '#87CEEB',
  navy: '#4169E1',
  green: '#90EE90',
  emerald: '#50C878',
  yellow: '#FFEB9C',
  gold: '#FFD700',
  orange: '#FFB366',
  tangerine: '#FF8C00',
  red: '#FF9999',
  crimson: '#DC143C',

  // Soft colors
  teal: '#40E0D0',
  mint: '#98FB98',
  coral: '#FF9999',
  salmon: '#FA8072',
  lavender: '#DDA0DD',
  peach: '#FFDAB9',
  cream: '#FFFDD0',
  sky: '#87CEEB',

  // Fun colors
  bubblegum: '#FFC1CC',
  lemon: '#FFF44F',
  lime: '#32CD32',
  turquoise: '#48D1CC',
  magenta: '#FF00FF',
  cyan: '#00FFFF',
  indigo: '#4B0082',
  rainbow: 'linear-gradient(45deg, #FF0000, #FF7F00, #FFFF00, #00FF00, #0000FF, #4B0082, #9400D3)'
};

// Educational emoji collection
const educationEmojis = {
  // School subjects
  math: ['➕', '➖', '✖️', '➗', '🔢', '📐', '📏', '🧮', '💯', '∑', '∞', '√', 'π', '∆'],
  science: ['🔬', '🧪', '🧫', '🧬', '⚗️', '🔭', '🌡️', '⚡', '🧲', '🔋', '💡', '🌱', '🦴', '🧠'],
  reading: ['📚', '📖', '📕', '📗', '📘', '📙', '📓', '📔', '📒', '📃', '📜', '📰', '🔤', '✏️'],
  art: ['🎨', '🖌️', '🖍️', '✂️', '🖊️', '🖋️', '✒️', '📝', '🎭', '🎪', '🎬', '📸', '🖼️', '🎯'],
  music: ['🎵', '🎶', '🎼', '🎹', '🎸', '🥁', '🎺', '🎷', '🎻', '🎤', '🎧', '🔊', '🔔', '🎛️'],

  // Achievement & rewards
  rewards: ['⭐', '🌟', '✨', '💫', '🏆', '🥇', '🥈', '🥉', '🎖️', '🏅', '👑', '💎', '🎁', '🎉'],
  positive: ['😊', '😄', '🤗', '😎', '🤩', '👍', '👏', '💪', '🙌', '✅', '✔️', '💚', '💙', '💜'],

  // Nature & animals
  animals: ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮', '🐷', '🐸'],
  nature: ['🌈', '☀️', '⛅', '☁️', '🌙', '⭐', '🌟', '🌍', '🌎', '🌏', '🌳', '🌲', '🌴', '🌵'],
  flowers: ['🌸', '🌼', '🌺', '🌻', '🌹', '🌷', '🌿', '🍀', '🍃', '🍂', '🍁', '🌾', '💐', '🌱'],

  // Food & treats
  fruits: ['🍎', '🍏', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🫐', '🍈', '🍒', '🍑', '🥭', '🍍'],
  treats: ['🍦', '🍧', '🍨', '🍩', '🍪', '🧁', '🍰', '🎂', '🍬', '🍭', '🍮', '🍯', '🥧', '🍫'],

  // Activities & games
  sports: ['⚽', '🏀', '🏈', '⚾', '🎾', '🏐', '🏓', '🏸', '🏒', '🏑', '⛳', '🏹', '🎣', '🤸'],
  games: ['🎮', '🕹️', '🎲', '🎯', '🎳', '♟️', '🧩', '🃏', '🎴', '🀄', '🎰', '🎪', '🎭', '🎨'],

  // Transportation
  transport: ['🚗', '🚕', '🚙', '🚌', '🚎', '🏎️', '🚓', '🚑', '🚒', '🚐', '🛻', '🚚', '🚛', '🚜'],
  flying: ['✈️', '🛫', '🛬', '🛩️', '🚁', '🚀', '🛸', '🎈', '🪂', '🛰️', '🌌', '☄️', '💫', '🌠']
};

// Create educational icon sets by subject
const subjectIcons = {
  mathematics: [
    { icon: Calculator, color: kidColors.blue, keywords: ['calcul', 'math', 'nombre'] },
    { icon: Ruler, color: kidColors.green, keywords: ['mesure', 'longueur', 'distance'] },
    { icon: Compass, color: kidColors.purple, keywords: ['geometrie', 'cercle', 'angle'] },
  ],

  science: [
    { icon: Microscope, color: kidColors.teal, keywords: ['science', 'observation', 'recherche'] },
    { icon: FlaskConical, color: kidColors.emerald, keywords: ['chimie', 'experience', 'laboratoire'] },
    { icon: Atom, color: kidColors.violet, keywords: ['atome', 'molecule', 'physique'] },
    { icon: Brain, color: kidColors.pink, keywords: ['cerveau', 'pensee', 'intelligence'] },
    { icon: Rocket, color: kidColors.orange, keywords: ['espace', 'fusee', 'exploration'] },
  ],

  language: [
    { icon: BookOpen, color: kidColors.lavender, keywords: ['lecture', 'livre', 'histoire'] },
    { icon: PenTool, color: kidColors.coral, keywords: ['ecriture', 'redaction', 'texte'] },
    { icon: Drama, color: kidColors.peach, keywords: ['theatre', 'expression', 'dialogue'] },
  ],

  arts: [
    { icon: Palette, color: kidColors.rainbow, keywords: ['art', 'couleur', 'peinture'] },
    { icon: Music, color: kidColors.gold, keywords: ['musique', 'note', 'melodie'] },
    { icon: Camera, color: kidColors.cyan, keywords: ['photo', 'image', 'visuel'] },
  ],

  nature: [
    { icon: Flower, color: kidColors.pink, keywords: ['fleur', 'plante', 'nature'] },
    { icon: Trees, color: kidColors.green, keywords: ['arbre', 'foret', 'environnement'] },
    { icon: Bird, color: kidColors.sky, keywords: ['oiseau', 'animal', 'voler'] },
    { icon: Fish, color: kidColors.turquoise, keywords: ['poisson', 'ocean', 'mer'] },
    { icon: Bug, color: kidColors.lime, keywords: ['insecte', 'papillon', 'coccinelle'] },
  ],

  achievement: [
    { icon: Trophy, color: kidColors.gold, keywords: ['victoire', 'gagnant', 'champion'] },
    { icon: Medal, color: kidColors.silver, keywords: ['medaille', 'recompense', 'prix'] },
    { icon: Star, color: kidColors.yellow, keywords: ['etoile', 'excellent', 'bravo'] },
    { icon: Target, color: kidColors.red, keywords: ['objectif', 'but', 'cible'] },
    { icon: Lightbulb, color: kidColors.yellow, keywords: ['idee', 'decouverte', 'eureka'] },
  ]
};

// Kawaii character mapping
const kawaiiCharacters = {
  cat: { component: Cat, defaultMood: 'happy' as Mood },
  ghost: { component: Ghost, defaultMood: 'happy' as Mood },
  planet: { component: Planet, defaultMood: 'blissful' as Mood },
  icecream: { component: IceCream, defaultMood: 'happy' as Mood },
  backpack: { component: Backpack, defaultMood: 'happy' as Mood },
  mug: { component: Mug, defaultMood: 'happy' as Mood },
  browser: { component: Browser, defaultMood: 'happy' as Mood },
  chocolate: { component: Chocolate, defaultMood: 'happy' as Mood },
  astronaut: { component: Astronaut, defaultMood: 'excited' as Mood },
  cyborg: { component: Cyborg, defaultMood: 'happy' as Mood },
  humancat: { component: HumanCat, defaultMood: 'happy' as Mood },
  humandinosaur: { component: HumanDinosaur, defaultMood: 'happy' as Mood },
};

// Available themes with their associated illustrations
export const themeCollections = {
  school: {
    kawaii: [kawaiiCharacters.backpack, kawaiiCharacters.browser],
    icons: [School, GraduationCap, BookOpen, Pencil],
    emojis: educationEmojis.reading,
    colors: [kidColors.blue, kidColors.green, kidColors.yellow]
  },

  science: {
    kawaii: [kawaiiCharacters.planet, kawaiiCharacters.astronaut, kawaiiCharacters.cyborg],
    icons: subjectIcons.science.map(s => s.icon),
    emojis: educationEmojis.science,
    colors: [kidColors.teal, kidColors.emerald, kidColors.violet]
  },

  nature: {
    kawaii: [kawaiiCharacters.cat, kawaiiCharacters.humancat],
    icons: subjectIcons.nature.map(n => n.icon),
    emojis: [...educationEmojis.nature, ...educationEmojis.animals],
    colors: [kidColors.green, kidColors.lime, kidColors.emerald]
  },

  animals: {
    kawaii: [kawaiiCharacters.cat, kawaiiCharacters.humancat, kawaiiCharacters.humandinosaur],
    icons: [CatIcon, Dog, Rabbit, Bird, Fish, Turtle, Squirrel],
    emojis: educationEmojis.animals,
    colors: [kidColors.peach, kidColors.coral, kidColors.salmon]
  },

  food: {
    kawaii: [kawaiiCharacters.icecream, kawaiiCharacters.chocolate, kawaiiCharacters.mug],
    icons: [Apple, Cherry, Pizza, Coffee, IceCream2, Cake, Cookie],
    emojis: [...educationEmojis.fruits, ...educationEmojis.treats],
    colors: [kidColors.pink, kidColors.orange, kidColors.yellow]
  },

  sports: {
    kawaii: [kawaiiCharacters.backpack],
    icons: [Trophy, Medal, Target, Gamepad2, Dice1],
    emojis: educationEmojis.sports,
    colors: [kidColors.red, kidColors.blue, kidColors.green]
  },

  music: {
    kawaii: [kawaiiCharacters.mug],
    icons: [Music, Headphones],
    emojis: educationEmojis.music,
    colors: [kidColors.purple, kidColors.magenta, kidColors.violet]
  },

  art: {
    kawaii: [kawaiiCharacters.ghost],
    icons: subjectIcons.arts.map(a => a.icon),
    emojis: educationEmojis.art,
    colors: [kidColors.rainbow, kidColors.pink, kidColors.cyan]
  },

  mixed: {
    kawaii: Object.values(kawaiiCharacters),
    icons: [...Object.values(subjectIcons).flat().map(s => s.icon)],
    emojis: [...Object.values(educationEmojis).flat()],
    colors: Object.values(kidColors)
  }
};

class EnhancedIllustrationService {
  // Get a random color for variety
  getRandomColor(): string {
    const colorArray = Object.values(kidColors).filter(c => typeof c === 'string' && !c.includes('gradient'));
    return colorArray[Math.floor(Math.random() * colorArray.length)];
  }

  // Get theme-based illustration
  getThemeIllustration(theme: CharacterTheme, index: number = 0): React.ReactElement | null {
    if (theme === 'random') {
      theme = Object.keys(themeCollections)[Math.floor(Math.random() * Object.keys(themeCollections).length)] as CharacterTheme;
    }

    const collection = themeCollections[theme as keyof typeof themeCollections];
    if (!collection) return null;

    const illustrationType = Math.random();
    const color = collection.colors[index % collection.colors.length] || this.getRandomColor();

    // 40% chance for kawaii, 40% for icons, 20% for emojis
    if (illustrationType < 0.4 && collection.kawaii.length > 0) {
      const kawaii = collection.kawaii[index % collection.kawaii.length];
      const Component = kawaii.component || kawaii;
      const mood = kawaii.defaultMood || 'happy';

      return (
        <Component
          size={80}
          mood={mood}
          color={color}
        />
      );
    } else if (illustrationType < 0.8 && collection.icons.length > 0) {
      const Icon = collection.icons[index % collection.icons.length];
      return (
        <Icon
          size={60}
          color={color}
          strokeWidth={2}
        />
      );
    } else if (collection.emojis.length > 0) {
      const emoji = collection.emojis[index % collection.emojis.length];
      return (
        <span style={{ fontSize: '60px', lineHeight: 1 }}>
          {emoji}
        </span>
      );
    }

    return null;
  }

  // Get illustration by subject keyword
  getSubjectIllustration(subject: string, index: number = 0): React.ReactElement | null {
    const subjectLower = subject.toLowerCase();

    // Check for math keywords
    if (subjectLower.includes('math') || subjectLower.includes('calcul') ||
        subjectLower.includes('nombre') || subjectLower.includes('geometr')) {
      return this.getThemeIllustration('school', index);
    }

    // Check for science keywords
    if (subjectLower.includes('science') || subjectLower.includes('experience') ||
        subjectLower.includes('observation')) {
      return this.getThemeIllustration('science', index);
    }

    // Check for nature keywords
    if (subjectLower.includes('nature') || subjectLower.includes('animal') ||
        subjectLower.includes('plante')) {
      return this.getThemeIllustration('nature', index);
    }

    // Check for art keywords
    if (subjectLower.includes('art') || subjectLower.includes('dessin') ||
        subjectLower.includes('couleur')) {
      return this.getThemeIllustration('art', index);
    }

    // Default to mixed theme for variety
    return this.getThemeIllustration('mixed', index);
  }

  // Get available themes for dropdown
  getAvailableThemes() {
    return [
      { value: 'random', label: '🎲 Aléatoire', icon: '🎲' },
      { value: 'mixed', label: '🌈 Mélangé', icon: '🌈' },
      { value: 'school', label: '🎓 École', icon: '🎓' },
      { value: 'science', label: '🔬 Science', icon: '🔬' },
      { value: 'nature', label: '🌿 Nature', icon: '🌿' },
      { value: 'animals', label: '🐾 Animaux', icon: '🐾' },
      { value: 'food', label: '🍕 Nourriture', icon: '🍕' },
      { value: 'sports', label: '⚽ Sports', icon: '⚽' },
      { value: 'music', label: '🎵 Musique', icon: '🎵' },
      { value: 'art', label: '🎨 Art', icon: '🎨' },
      // Keep legacy kawaii themes for backwards compatibility
      { value: 'cat', label: '🐱 Chat', icon: '🐱' },
      { value: 'ghost', label: '👻 Fantôme', icon: '👻' },
      { value: 'planet', label: '🪐 Planète', icon: '🪐' },
      { value: 'icecream', label: '🍦 Crème glacée', icon: '🍦' },
      { value: 'backpack', label: '🎒 Sac à dos', icon: '🎒' },
      { value: 'mug', label: '☕ Tasse', icon: '☕' },
      { value: 'browser', label: '🌐 Navigateur', icon: '🌐' },
      { value: 'chocolate', label: '🍫 Chocolat', icon: '🍫' },
      { value: 'astronaut', label: '🚀 Astronaute', icon: '🚀' },
      { value: 'cyborg', label: '🤖 Cyborg', icon: '🤖' },
      { value: 'humancat', label: '😺 Chat humain', icon: '😺' },
      { value: 'humandinosaur', label: '🦕 Dinosaure humain', icon: '🦕' }
    ];
  }

  // Legacy support - get specific kawaii character
  getCharacterIllustration(theme: CharacterTheme): React.ReactElement | null {
    // Check if it's a legacy kawaii theme
    if (theme in kawaiiCharacters) {
      const character = kawaiiCharacters[theme as keyof typeof kawaiiCharacters];
      const Component = character.component;
      return (
        <Component
          size={100}
          mood={character.defaultMood}
          color={this.getRandomColor()}
        />
      );
    }

    // Otherwise use the new theme system
    return this.getThemeIllustration(theme, 0);
  }
}

export const EnhancedIllustrationServiceInstance = new EnhancedIllustrationService();
export default EnhancedIllustrationServiceInstance;