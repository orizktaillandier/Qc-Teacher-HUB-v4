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

// Available moods for kawaii characters
type Mood = 'sad' | 'shocked' | 'happy' | 'blissful' | 'lovestruck' | 'excited' | 'ko';

// Character themes for consistent styling
export type CharacterTheme = 'cat' | 'ghost' | 'planet' | 'icecream' | 'backpack' | 'mug' | 'browser' | 'chocolate' | 'astronaut' | 'cyborg' | 'humancat' | 'humandinosaur' | 'random';

// Illustration categories for different subjects and topics
export interface IllustrationConfig {
  component: any;
  mood: Mood;
  color: string;
  size?: number;
  keywords: string[];
}

// Fun color palette for kids
const kidColors = {
  pink: '#FFB3E6',
  purple: '#B19CD9',
  blue: '#87CEEB',
  green: '#90EE90',
  yellow: '#FFEB9C',
  orange: '#FFB366',
  red: '#FF9999',
  teal: '#40E0D0',
  mint: '#98FB98',
  coral: '#FF9999',
  lavender: '#DDA0DD',
  peach: '#FFDAB9'
};

// Map topics to fun illustrations
const topicIllustrations: Record<string, IllustrationConfig[]> = {
  // Mathematics
  'addition': [
    { component: Cat, mood: 'happy', color: kidColors.blue, keywords: ['addition', 'plus', 'ajouter'] },
    { component: IceCream, mood: 'blissful', color: kidColors.pink, keywords: ['addition', 'total'] }
  ],
  'soustraction': [
    { component: Ghost, mood: 'sad', color: kidColors.purple, keywords: ['soustraction', 'moins', 'enlever'] },
    { component: Chocolate, mood: 'ko', color: kidColors.orange, keywords: ['reste', 'difference'] }
  ],
  'multiplication': [
    { component: Planet, mood: 'excited', color: kidColors.green, keywords: ['multiplication', 'fois', 'multiplier'] },
    { component: Cat, mood: 'lovestruck', color: kidColors.pink, keywords: ['produit', 'multiple'] }
  ],
  'division': [
    { component: IceCream, mood: 'shocked', color: kidColors.yellow, keywords: ['division', 'diviser', 'partager'] },
    { component: Chocolate, mood: 'happy', color: kidColors.coral, keywords: ['quotient', 'parts'] }
  ],
  'fractions': [
    { component: IceCream, mood: 'happy', color: kidColors.mint, keywords: ['fraction', 'partie', 'demi'] },
    { component: Chocolate, mood: 'blissful', color: kidColors.peach, keywords: ['quart', 'tiers'] }
  ],
  'geometry': [
    { component: Planet, mood: 'happy', color: kidColors.teal, keywords: ['cercle', 'rond', 'sphere'] },
    { component: Browser, mood: 'blissful', color: kidColors.blue, keywords: ['carre', 'rectangle', 'forme'] }
  ],
  'angles': [
    { component: Folder, mood: 'excited', color: kidColors.purple, keywords: ['angle', 'droit', 'aigu'] },
    { component: File, mood: 'happy', color: kidColors.orange, keywords: ['obtus', 'degres'] }
  ],
  'mesure': [
    { component: Mug, mood: 'happy', color: kidColors.blue, keywords: ['litre', 'volume', 'capacite'] },
    { component: Backpack, mood: 'blissful', color: kidColors.green, keywords: ['poids', 'masse', 'gramme'] }
  ],

  // French
  'lecture': [
    { component: File, mood: 'happy', color: kidColors.lavender, keywords: ['lire', 'lecture', 'livre'] },
    { component: SpeechBubble, mood: 'excited', color: kidColors.pink, keywords: ['histoire', 'conte'] }
  ],
  'grammaire': [
    { component: Browser, mood: 'blissful', color: kidColors.mint, keywords: ['grammaire', 'verbe', 'nom'] },
    { component: Folder, mood: 'happy', color: kidColors.coral, keywords: ['adjectif', 'pronom'] }
  ],
  'vocabulaire': [
    { component: SpeechBubble, mood: 'excited', color: kidColors.yellow, keywords: ['mot', 'vocabulaire', 'dictionnaire'] },
    { component: Cat, mood: 'happy', color: kidColors.purple, keywords: ['synonyme', 'antonyme'] }
  ],

  // Science
  'animaux': [
    { component: Cat, mood: 'happy', color: kidColors.orange, keywords: ['animal', 'mammifere', 'vivant'] },
    { component: Ghost, mood: 'excited', color: kidColors.teal, keywords: ['espece', 'habitat'] }
  ],
  'plantes': [
    { component: Planet, mood: 'blissful', color: kidColors.green, keywords: ['plante', 'feuille', 'fleur'] },
    { component: Browser, mood: 'happy', color: kidColors.mint, keywords: ['arbre', 'racine'] }
  ],
  'espace': [
    { component: Planet, mood: 'excited', color: kidColors.blue, keywords: ['planete', 'espace', 'soleil'] },
    { component: Ghost, mood: 'lovestruck', color: kidColors.purple, keywords: ['lune', 'etoile', 'galaxie'] }
  ],
  'matiere': [
    { component: Mug, mood: 'happy', color: kidColors.teal, keywords: ['liquide', 'solide', 'gaz'] },
    { component: IceCream, mood: 'blissful', color: kidColors.pink, keywords: ['fusion', 'evaporation'] }
  ],

  // Default/General
  'default': [
    { component: Cat, mood: 'happy', color: kidColors.blue, keywords: [] },
    { component: Ghost, mood: 'excited', color: kidColors.purple, keywords: [] },
    { component: Planet, mood: 'blissful', color: kidColors.green, keywords: [] },
    { component: IceCream, mood: 'happy', color: kidColors.pink, keywords: [] }
  ]
};

// Character theme mapping
const characterThemes: Record<CharacterTheme, any> = {
  cat: Cat,
  ghost: Ghost,
  planet: Planet,
  icecream: IceCream,
  backpack: Backpack,
  mug: Mug,
  browser: Browser,
  chocolate: Chocolate,
  astronaut: Astronaut,
  cyborg: Cyborg,
  humancat: HumanCat,
  humandinosaur: HumanDinosaur,
  random: null
};

export class IllustrationService {
  /**
   * Get a fun illustration based on the question content
   */
  static getIllustrationForQuestion(question: string, subject: string, cardIndex: number = 0, characterTheme?: CharacterTheme): IllustrationConfig | null {
    const lowerQuestion = question.toLowerCase();
    const lowerSubject = subject.toLowerCase();

    // Check each topic category
    for (const [topic, configs] of Object.entries(topicIllustrations)) {
      // Check if topic matches subject or question
      if (lowerSubject.includes(topic) || lowerQuestion.includes(topic)) {
        const matchingConfigs = configs.filter(config =>
          config.keywords.length === 0 ||
          config.keywords.some(keyword => lowerQuestion.includes(keyword))
        );

        if (matchingConfigs.length > 0) {
          // Return a deterministic matching illustration based on cardIndex
          return matchingConfigs[cardIndex % matchingConfigs.length];
        }
      }

      // Check if any keywords match
      for (const config of configs) {
        if (config.keywords.some(keyword => lowerQuestion.includes(keyword))) {
          return config;
        }
      }
    }

    // If a character theme is specified, use it consistently
    if (characterTheme && characterTheme !== 'random') {
      const component = characterThemes[characterTheme];
      if (component) {
        const moods: Mood[] = ['happy', 'excited', 'blissful', 'lovestruck'];
        const colors = Object.values(kidColors);
        return {
          component,
          mood: moods[cardIndex % moods.length],
          color: colors[cardIndex % colors.length],
          keywords: []
        };
      }
    }

    // Return a random default illustration with more variety
    const allCharacters = [
      { component: Cat, mood: 'happy' as Mood, color: kidColors.blue, keywords: [] },
      { component: Ghost, mood: 'excited' as Mood, color: kidColors.purple, keywords: [] },
      { component: Planet, mood: 'blissful' as Mood, color: kidColors.green, keywords: [] },
      { component: IceCream, mood: 'happy' as Mood, color: kidColors.pink, keywords: [] },
      { component: Backpack, mood: 'happy' as Mood, color: kidColors.orange, keywords: [] },
      { component: Mug, mood: 'happy' as Mood, color: kidColors.teal, keywords: [] },
      { component: Browser, mood: 'blissful' as Mood, color: kidColors.yellow, keywords: [] },
      { component: SpeechBubble, mood: 'excited' as Mood, color: kidColors.coral, keywords: [] },
      { component: Chocolate, mood: 'happy' as Mood, color: kidColors.lavender, keywords: [] },
      { component: Astronaut, mood: 'happy' as Mood, color: kidColors.mint, keywords: [] },
      { component: File, mood: 'happy' as Mood, color: kidColors.peach, keywords: [] },
      { component: Folder, mood: 'blissful' as Mood, color: kidColors.red, keywords: [] }
    ];
    return allCharacters[cardIndex % allCharacters.length];
  }

  /**
   * Get illustration based on difficulty level
   */
  static getIllustrationForDifficulty(difficulty: 'easy' | 'medium' | 'hard', cardIndex: number = 0, characterTheme?: CharacterTheme): IllustrationConfig {
    const difficultyMoods: Record<string, Mood> = {
      easy: 'happy',
      medium: 'excited',
      hard: 'shocked'
    };

    const difficultyColors = {
      easy: kidColors.green,
      medium: kidColors.yellow,
      hard: kidColors.red
    };

    // If a character theme is specified, use it consistently
    if (characterTheme && characterTheme !== 'random') {
      const component = characterThemes[characterTheme];
      if (component) {
        return {
          component,
          mood: difficultyMoods[difficulty],
          color: difficultyColors[difficulty],
          keywords: []
        };
      }
    }

    const difficultyComponents = {
      easy: [Cat, IceCream, Backpack],
      medium: [Planet, Browser, Mug],
      hard: [Ghost, Chocolate, Cyborg]
    };

    const components = difficultyComponents[difficulty];
    const component = components[cardIndex % components.length];

    return {
      component,
      mood: difficultyMoods[difficulty],
      color: difficultyColors[difficulty],
      keywords: []
    };
  }

  /**
   * Get celebration illustration for correct answers
   */
  static getCelebrationIllustration(): IllustrationConfig {
    const celebrationConfigs = [
      { component: Cat, mood: 'lovestruck' as Mood, color: kidColors.pink },
      { component: Ghost, mood: 'blissful' as Mood, color: kidColors.purple },
      { component: Planet, mood: 'excited' as Mood, color: kidColors.yellow },
      { component: IceCream, mood: 'happy' as Mood, color: kidColors.mint },
      { component: Backpack, mood: 'blissful' as Mood, color: kidColors.orange },
      { component: Browser, mood: 'excited' as Mood, color: kidColors.green },
      { component: Chocolate, mood: 'happy' as Mood, color: kidColors.coral },
      { component: SpeechBubble, mood: 'lovestruck' as Mood, color: kidColors.lavender }
    ];

    return {
      ...celebrationConfigs[Math.floor(Math.random() * celebrationConfigs.length)],
      keywords: []
    };
  }

  /**
   * Get encouragement illustration for incorrect answers
   */
  static getEncouragementIllustration(): IllustrationConfig {
    const encouragementConfigs = [
      { component: Cat, mood: 'sad' as Mood, color: kidColors.blue },
      { component: Ghost, mood: 'ko' as Mood, color: kidColors.lavender },
      { component: IceCream, mood: 'shocked' as Mood, color: kidColors.orange },
      { component: Planet, mood: 'sad' as Mood, color: kidColors.mint },
      { component: Mug, mood: 'ko' as Mood, color: kidColors.peach },
      { component: HumanDinosaur, mood: 'shocked' as Mood, color: kidColors.teal }
    ];

    return {
      ...encouragementConfigs[Math.floor(Math.random() * encouragementConfigs.length)],
      keywords: []
    };
  }

  /**
   * Get a random fun color for backgrounds or decorations
   */
  static getRandomKidColor(): string {
    const colors = Object.values(kidColors);
    return colors[Math.floor(Math.random() * colors.length)];
  }

  /**
   * Get available character themes with display names
   */
  static getAvailableCharacters(): { value: CharacterTheme; label: string; icon: string }[] {
    return [
      { value: 'random', label: 'Aléatoire', icon: '🎲' },
      { value: 'cat', label: 'Chat', icon: '🐱' },
      { value: 'ghost', label: 'Fantôme', icon: '👻' },
      { value: 'planet', label: 'Planète', icon: '🪐' },
      { value: 'icecream', label: 'Crème glacée', icon: '🍦' },
      { value: 'backpack', label: 'Sac à dos', icon: '🎒' },
      { value: 'mug', label: 'Tasse', icon: '☕' },
      { value: 'browser', label: 'Navigateur', icon: '🌐' },
      { value: 'chocolate', label: 'Chocolat', icon: '🍫' },
      { value: 'astronaut', label: 'Astronaute', icon: '🚀' },
      { value: 'cyborg', label: 'Cyborg', icon: '🤖' },
      { value: 'humancat', label: 'Chat humain', icon: '😺' },
      { value: 'humandinosaur', label: 'Dinosaure humain', icon: '🦕' }
    ];
  }
}

export { kidColors };
export type { IllustrationConfig, Mood };