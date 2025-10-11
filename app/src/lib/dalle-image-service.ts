// DALL-E Image Service for generating decorative images for cards

export interface DalleImagePrompt {
  id: string;
  name: string;
  description: string;
  prompt: string;
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center' | 'background';
  size: 'small' | 'medium' | 'large';
}

// Predefined image prompts for different subjects and themes
export const imagePromptLibrary: Record<string, DalleImagePrompt[]> = {
  mathematics: [
    {
      id: 'math-numbers',
      name: 'Nombres amusants',
      description: 'Nombres colorés avec des visages souriants',
      prompt: 'Cute cartoon numbers 1-9 with smiling faces, colorful, 3D style, white background, child-friendly',
      position: 'bottom-right',
      size: 'medium'
    },
    {
      id: 'math-shapes',
      name: 'Formes géométriques',
      description: 'Formes géométriques colorées',
      prompt: 'Friendly geometric shapes (circle, square, triangle) with cartoon faces, bright colors, 3D render, transparent background',
      position: 'top-left',
      size: 'small'
    },
    {
      id: 'math-calculator',
      name: 'Calculatrice rigolote',
      description: 'Calculatrice avec personnalité',
      prompt: 'Happy cartoon calculator character with arms and legs, colorful buttons, friendly expression, transparent background',
      position: 'bottom-left',
      size: 'medium'
    }
  ],

  science: [
    {
      id: 'sci-microscope',
      name: 'Microscope magique',
      description: 'Microscope avec des découvertes',
      prompt: 'Cartoon microscope with colorful bacteria and cells visible, magical sparkles, child-friendly science theme, transparent background',
      position: 'center',
      size: 'large'
    },
    {
      id: 'sci-planets',
      name: 'Planètes souriantes',
      description: 'Système solaire amical',
      prompt: 'Cute cartoon planets with faces, solar system, bright colors, smiling sun, transparent background',
      position: 'top-right',
      size: 'medium'
    },
    {
      id: 'sci-lab',
      name: 'Laboratoire amusant',
      description: 'Équipement de laboratoire coloré',
      prompt: 'Cartoon test tubes and beakers with colorful bubbling liquids, friendly science lab equipment, transparent background',
      position: 'bottom-right',
      size: 'small'
    }
  ],

  french: [
    {
      id: 'fr-book',
      name: 'Livre magique',
      description: 'Livre ouvert avec des histoires',
      prompt: 'Open magic book with colorful letters flying out, fairy tale theme, whimsical, transparent background',
      position: 'center',
      size: 'large'
    },
    {
      id: 'fr-alphabet',
      name: 'Lettres dansantes',
      description: 'Lettres de l\'alphabet animées',
      prompt: 'Dancing cartoon alphabet letters A-Z, colorful, playful, 3D style, transparent background',
      position: 'bottom-left',
      size: 'medium'
    },
    {
      id: 'fr-pencil',
      name: 'Crayon créatif',
      description: 'Crayon qui écrit des mots',
      prompt: 'Happy cartoon pencil character writing colorful words, rainbow trail, creative, transparent background',
      position: 'top-right',
      size: 'small'
    }
  ],

  general: [
    {
      id: 'gen-stars',
      name: 'Étoiles brillantes',
      description: 'Étoiles dorées scintillantes',
      prompt: 'Golden stars with sparkles, various sizes, magical glow, transparent background',
      position: 'top-left',
      size: 'small'
    },
    {
      id: 'gen-rainbow',
      name: 'Arc-en-ciel',
      description: 'Arc-en-ciel avec nuages',
      prompt: 'Bright rainbow with fluffy white clouds, cartoon style, cheerful, transparent background',
      position: 'top-right',
      size: 'medium'
    },
    {
      id: 'gen-balloon',
      name: 'Ballons festifs',
      description: 'Ballons colorés flottants',
      prompt: 'Colorful party balloons floating, various colors, shiny, 3D render, transparent background',
      position: 'bottom-left',
      size: 'small'
    },
    {
      id: 'gen-trophy',
      name: 'Trophée champion',
      description: 'Trophée doré brillant',
      prompt: 'Golden trophy with stars, champion cup, shiny, celebration theme, transparent background',
      position: 'center',
      size: 'medium'
    }
  ],

  animals: [
    {
      id: 'ani-lion',
      name: 'Lion amical',
      description: 'Lion souriant et mignon',
      prompt: 'Cute cartoon baby lion, friendly smile, golden mane, sitting pose, transparent background',
      position: 'bottom-right',
      size: 'medium'
    },
    {
      id: 'ani-elephant',
      name: 'Éléphant joyeux',
      description: 'Éléphant avec trompe levée',
      prompt: 'Happy cartoon elephant, trunk up, big ears, friendly expression, pastel colors, transparent background',
      position: 'bottom-left',
      size: 'large'
    },
    {
      id: 'ani-giraffe',
      name: 'Girafe rigolote',
      description: 'Girafe avec long cou',
      prompt: 'Funny cartoon giraffe with spots, long neck, smiling, cute style, transparent background',
      position: 'center',
      size: 'large'
    },
    {
      id: 'ani-penguin',
      name: 'Pingouin mignon',
      description: 'Pingouin avec écharpe',
      prompt: 'Adorable cartoon penguin wearing colorful scarf, waving, happy, transparent background',
      position: 'top-left',
      size: 'small'
    }
  ],

  space: [
    {
      id: 'sp-rocket',
      name: 'Fusée spatiale',
      description: 'Fusée colorée décollant',
      prompt: 'Colorful cartoon rocket ship blasting off, flame trail, stars around, transparent background',
      position: 'center',
      size: 'large'
    },
    {
      id: 'sp-astronaut',
      name: 'Astronaute flottant',
      description: 'Astronaute mignon dans l\'espace',
      prompt: 'Cute cartoon astronaut floating, waving, colorful spacesuit, friendly, transparent background',
      position: 'top-right',
      size: 'medium'
    },
    {
      id: 'sp-alien',
      name: 'Extraterrestre amical',
      description: 'Alien vert souriant',
      prompt: 'Friendly green alien character, three eyes, smiling, cute cartoon style, transparent background',
      position: 'bottom-left',
      size: 'small'
    }
  ],

  ocean: [
    {
      id: 'oc-fish',
      name: 'Poisson tropical',
      description: 'Poisson coloré nageant',
      prompt: 'Bright tropical fish, rainbow colors, swimming, cartoon style, bubbles, transparent background',
      position: 'center',
      size: 'medium'
    },
    {
      id: 'oc-octopus',
      name: 'Pieuvre rigolote',
      description: 'Pieuvre avec huit bras',
      prompt: 'Funny purple octopus with eight arms, big eyes, smiling, cartoon style, transparent background',
      position: 'bottom-right',
      size: 'large'
    },
    {
      id: 'oc-seahorse',
      name: 'Hippocampe mignon',
      description: 'Hippocampe rose',
      prompt: 'Cute pink seahorse, curly tail, friendly expression, underwater theme, transparent background',
      position: 'top-left',
      size: 'small'
    }
  ]
};

// Function to get relevant prompts based on subject/theme
export function getImagePrompts(subject?: string, theme?: string): DalleImagePrompt[] {
  const prompts: DalleImagePrompt[] = [];

  // Add subject-specific prompts
  if (subject && imagePromptLibrary[subject.toLowerCase()]) {
    prompts.push(...imagePromptLibrary[subject.toLowerCase()]);
  }

  // Add theme-specific prompts
  if (theme) {
    if (theme.toLowerCase().includes('space') || theme.toLowerCase().includes('spatial')) {
      prompts.push(...imagePromptLibrary.space);
    }
    if (theme.toLowerCase().includes('ocean') || theme.toLowerCase().includes('mer') || theme.toLowerCase().includes('marin')) {
      prompts.push(...imagePromptLibrary.ocean);
    }
    if (theme.toLowerCase().includes('animal') || theme.toLowerCase().includes('safari')) {
      prompts.push(...imagePromptLibrary.animals);
    }
  }

  // Always add some general prompts
  prompts.push(...imagePromptLibrary.general.slice(0, 2));

  return prompts;
}

// Function to generate DALL-E API request
export function generateDalleRequest(prompt: DalleImagePrompt) {
  return {
    prompt: `${prompt.prompt} Style: Pixar 3D cartoon, vibrant colors, child-friendly, educational. IMPORTANT: transparent or white background for easy integration.`,
    size: '512x512',
    quality: 'standard',
    response_format: 'b64_json' // or 'url'
  };
}

// Function to position image on card
export function getImageStyles(prompt: DalleImagePrompt): React.CSSProperties {
  const sizeMap = {
    small: '60px',
    medium: '100px',
    large: '140px'
  };

  const baseStyles: React.CSSProperties = {
    position: 'absolute',
    width: sizeMap[prompt.size],
    height: 'auto',
    zIndex: 1,
    opacity: 0.8
  };

  // Position based on prompt settings
  switch (prompt.position) {
    case 'top-left':
      return { ...baseStyles, top: '10px', left: '10px' };
    case 'top-right':
      return { ...baseStyles, top: '10px', right: '10px' };
    case 'bottom-left':
      return { ...baseStyles, bottom: '10px', left: '10px' };
    case 'bottom-right':
      return { ...baseStyles, bottom: '10px', right: '10px' };
    case 'center':
      return { ...baseStyles, top: '50%', left: '50%', transform: 'translate(-50%, -50%)' };
    case 'background':
      return { ...baseStyles, top: 0, left: 0, width: '100%', height: '100%', opacity: 0.1 };
    default:
      return baseStyles;
  }
}

// Placeholder images for testing (using emojis as SVG)
export const placeholderImages: Record<string, string> = {
  'math-numbers': "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Ctext x='50' y='50' font-size='60' text-anchor='middle' dominant-baseline='middle'%3E🔢%3C/text%3E%3C/svg%3E",
  'sci-microscope': "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Ctext x='50' y='50' font-size='60' text-anchor='middle' dominant-baseline='middle'%3E🔬%3C/text%3E%3C/svg%3E",
  'fr-book': "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Ctext x='50' y='50' font-size='60' text-anchor='middle' dominant-baseline='middle'%3E📚%3C/text%3E%3C/svg%3E",
  'gen-stars': "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Ctext x='50' y='50' font-size='60' text-anchor='middle' dominant-baseline='middle'%3E⭐%3C/text%3E%3C/svg%3E",
  'ani-lion': "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Ctext x='50' y='50' font-size='60' text-anchor='middle' dominant-baseline='middle'%3E🦁%3C/text%3E%3C/svg%3E",
  'sp-rocket': "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Ctext x='50' y='50' font-size='60' text-anchor='middle' dominant-baseline='middle'%3E🚀%3C/text%3E%3C/svg%3E",
  'oc-fish': "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Ctext x='50' y='50' font-size='60' text-anchor='middle' dominant-baseline='middle'%3E🐠%3C/text%3E%3C/svg%3E"
};

export default {
  imagePromptLibrary,
  getImagePrompts,
  generateDalleRequest,
  getImageStyles,
  placeholderImages
};