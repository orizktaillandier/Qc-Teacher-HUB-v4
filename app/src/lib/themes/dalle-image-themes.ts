// DALL-E Image-Ready Themes
// These themes are designed to work with external images (DALL-E, uploaded, or URLs)

export interface DalleImageTheme {
  name: string;
  type: 'dalle';

  // Background and pattern
  background: string;
  pattern?: string;

  // Card container styles
  cardBackground?: string;
  cardBorder?: string;
  cardRadius?: string;
  cardShadow?: string;
  cardPadding?: string;

  // Question container styles
  questionStyle?: {
    background?: string;
    border?: string;
    borderRadius?: string;
    padding?: string;
    backdropFilter?: string;
  };

  // Number badge styles
  numberBadgeStyle?: 'circle' | 'square' | 'hexagon' | 'star' | 'diamond' | 'cloud' | 'heart' | 'shield';
  numberBadgeBackground?: string;
  numberBadgeColor?: string;

  // DALL-E prompt suggestions for this theme
  dallePrompts?: {
    primary: string;      // Main background/decorative image
    secondary?: string;   // Optional secondary element
    style: string;        // Art style to use (cartoon, watercolor, etc.)
  };

  // Image placement zones (where external images should be placed)
  imageZones?: {
    id: string;
    position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center-left' | 'center-right' | 'background';
    size: string;
    opacity?: number;
    blend?: string;
    zIndex?: number;
  }[];
}

export const dalleImageThemes: DalleImageTheme[] = [
  {
    name: '🎨 Aventure Artistique',
    type: 'dalle',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    cardBackground: 'rgba(255, 255, 255, 0.95)',
    cardBorder: '3px solid #764ba2',
    cardRadius: '20px',
    cardShadow: '0 20px 40px rgba(118, 75, 162, 0.3)',
    cardPadding: '20px',
    questionStyle: {
      background: 'rgba(255, 255, 255, 0.9)',
      border: '2px solid #667eea',
      borderRadius: '15px',
      padding: '25px',
      backdropFilter: 'blur(5px)'
    },
    numberBadgeStyle: 'circle',
    numberBadgeBackground: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    numberBadgeColor: '#ffffff',
    dallePrompts: {
      primary: 'Friendly cartoon paint palette with smiling brushes, colorful and playful',
      secondary: 'Rainbow paint splatters, abstract and fun',
      style: 'Cute cartoon style, bright colors, child-friendly'
    },
    imageZones: [
      {
        id: 'main-character',
        position: 'bottom-right',
        size: '120px',
        opacity: 0.9,
        zIndex: 1
      },
      {
        id: 'background-pattern',
        position: 'center-left',
        size: '200px',
        opacity: 0.2,
        zIndex: 0
      }
    ]
  },

  {
    name: '🚀 Mission Spatiale',
    type: 'dalle',
    background: 'linear-gradient(180deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
    cardBackground: 'rgba(48, 43, 99, 0.9)',
    cardBorder: '3px solid #00ffff',
    cardRadius: '25px',
    cardShadow: '0 0 50px rgba(0, 255, 255, 0.4)',
    cardPadding: '20px',
    questionStyle: {
      background: 'rgba(255, 255, 255, 0.92)',
      border: '3px solid #ff00ff',
      borderRadius: '20px',
      padding: '25px'
    },
    numberBadgeStyle: 'star',
    numberBadgeBackground: 'linear-gradient(135deg, #00ffff 0%, #ff00ff 100%)',
    numberBadgeColor: '#000000',
    dallePrompts: {
      primary: 'Cute cartoon astronaut floating in space, friendly and colorful',
      secondary: 'Cartoon planets and stars, simple and playful',
      style: 'Kawaii style, neon colors on dark background, child-friendly'
    },
    imageZones: [
      {
        id: 'astronaut',
        position: 'center-right',
        size: '100px',
        opacity: 0.8,
        zIndex: 1
      },
      {
        id: 'planets',
        position: 'top-left',
        size: '80px',
        opacity: 0.6,
        zIndex: 0
      }
    ]
  },

  {
    name: '🌊 Monde Marin',
    type: 'dalle',
    background: 'linear-gradient(180deg, #00c9ff 0%, #0077be 50%, #003d5b 100%)',
    cardBackground: 'rgba(0, 119, 190, 0.85)',
    cardBorder: '3px solid #00ff88',
    cardRadius: '30px',
    cardShadow: '0 20px 40px rgba(0, 119, 190, 0.4)',
    cardPadding: '20px',
    questionStyle: {
      background: 'rgba(255, 255, 255, 0.93)',
      border: '3px solid #ffa500',
      borderRadius: '25px',
      padding: '25px'
    },
    numberBadgeStyle: 'circle',
    numberBadgeBackground: 'linear-gradient(135deg, #ffa500 0%, #ff6347 100%)',
    numberBadgeColor: '#ffffff',
    dallePrompts: {
      primary: 'Happy cartoon sea creatures (octopus, fish, seahorse), colorful and friendly',
      secondary: 'Coral reef and seaweed, bright colors',
      style: 'Pixar-style 3D cartoon, vibrant underwater scene'
    },
    imageZones: [
      {
        id: 'sea-creatures',
        position: 'bottom-left',
        size: '110px',
        opacity: 0.85,
        zIndex: 1
      },
      {
        id: 'coral',
        position: 'bottom-right',
        size: '90px',
        opacity: 0.6,
        zIndex: 0
      }
    ]
  },

  {
    name: '🦖 Parc Jurassique',
    type: 'dalle',
    background: 'linear-gradient(135deg, #134e5e 0%, #71b280 100%)',
    cardBackground: 'rgba(113, 178, 128, 0.9)',
    cardBorder: '4px solid #2d5016',
    cardRadius: '20px',
    cardShadow: '0 25px 50px rgba(45, 80, 22, 0.4)',
    cardPadding: '20px',
    questionStyle: {
      background: 'rgba(255, 255, 255, 0.92)',
      border: '3px solid #ff6b6b',
      borderRadius: '15px',
      padding: '25px'
    },
    numberBadgeStyle: 'hexagon',
    numberBadgeBackground: 'linear-gradient(135deg, #ff6b6b 0%, #ff8e53 100%)',
    numberBadgeColor: '#ffffff',
    dallePrompts: {
      primary: 'Friendly cartoon baby dinosaurs playing, cute and colorful',
      secondary: 'Prehistoric plants and volcano in background, soft colors',
      style: 'Cute cartoon style like "The Good Dinosaur", friendly and non-scary'
    },
    imageZones: [
      {
        id: 'dinosaurs',
        position: 'center-left',
        size: '130px',
        opacity: 0.9,
        zIndex: 1
      },
      {
        id: 'landscape',
        position: 'background',
        size: '100%',
        opacity: 0.15,
        zIndex: 0
      }
    ]
  },

  {
    name: '🍭 Royaume Sucré',
    type: 'dalle',
    background: 'linear-gradient(45deg, #ff9a9e 0%, #fecfef 50%, #ffc9cf 100%)',
    cardBackground: 'rgba(255, 255, 255, 0.93)',
    cardBorder: '4px solid #ff6ec7',
    cardRadius: '30px',
    cardShadow: '0 20px 40px rgba(255, 110, 199, 0.3)',
    cardPadding: '20px',
    questionStyle: {
      background: 'rgba(255, 255, 255, 0.95)',
      border: '3px solid #ffb347',
      borderRadius: '20px',
      padding: '25px'
    },
    numberBadgeStyle: 'heart',
    numberBadgeBackground: 'linear-gradient(135deg, #ff6ec7 0%, #ffb347 100%)',
    numberBadgeColor: '#ffffff',
    dallePrompts: {
      primary: 'Cartoon candy land with lollipops, gummy bears, and cupcakes, super colorful',
      secondary: 'Cotton candy clouds and rainbow, pastel colors',
      style: 'Candy Crush style, ultra colorful, 3D cartoon'
    },
    imageZones: [
      {
        id: 'candy-main',
        position: 'bottom-right',
        size: '100px',
        opacity: 0.9,
        zIndex: 1
      },
      {
        id: 'candy-bg',
        position: 'top-left',
        size: '150px',
        opacity: 0.3,
        zIndex: 0
      }
    ]
  }
];

// Function to generate DALL-E API request
export function generateDalleRequest(theme: DalleImageTheme, imageType: 'primary' | 'secondary') {
  const prompt = imageType === 'primary' ? theme.dallePrompts?.primary : theme.dallePrompts?.secondary;
  const style = theme.dallePrompts?.style;

  return {
    prompt: `${prompt}. Style: ${style}. White or transparent background for easy integration.`,
    size: '512x512',
    quality: 'standard',
    style: 'vivid'
  };
}

// Function to apply external images to theme
export function applyExternalImages(theme: DalleImageTheme, images: { [zoneId: string]: string }) {
  // This would be implemented in the CardRenderer to place actual images
  return {
    ...theme,
    externalImages: images
  };
}

export default dalleImageThemes;