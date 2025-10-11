// DALL-E Powered Themes with Static Saved Images
// These themes use pre-generated DALL-E images that are saved locally

export interface DallePoweredTheme {
  name: string;
  type: 'dalle-powered';
  background: string;
  cardBorder?: string;
  cardRadius?: string;
  cardShadow?: string;
  cardPadding?: string;
  questionStyle?: {
    background?: string;
    border?: string;
    borderRadius?: string;
    padding?: string;
    backdropFilter?: string;
  };
  numberBadgeStyle?: 'circle' | 'square' | 'hexagon' | 'star' | 'diamond' | 'cloud' | 'heart';
  numberBadgeBackground?: string;
  numberBadgeColor?: string;
  // Static images - no more API calls needed!
  staticImages: {
    [key: string]: string;
  };
}

// Static DALL-E themes with saved images
export const dallePoweredThemes: DallePoweredTheme[] = [
  {
    name: '🤖 Laboratoire du Futur',
    type: 'dalle-powered',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    cardBorder: '3px solid #667eea',
    cardRadius: '20px',
    cardShadow: '0 20px 40px rgba(102, 126, 234, 0.3)',
    cardPadding: '20px',
    questionStyle: {
      background: 'rgba(255, 255, 255, 0.95)',
      border: '2px solid #e0e7ff',
      borderRadius: '15px',
      padding: '25px',
      backdropFilter: 'blur(10px)'
    },
    numberBadgeStyle: 'hexagon',
    numberBadgeBackground: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    numberBadgeColor: '#ffffff',
    staticImages: {
      'main-1': '/dalle-images/---Laboratoire-du-Futur/main-1.png',
      'decorative1-1': '/dalle-images/---Laboratoire-du-Futur/decorative1-1.png'
    }
  },

  {
    name: '🐲 Terre des Dragons',
    type: 'dalle-powered',
    background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    cardBorder: '3px solid #fa709a',
    cardRadius: '25px',
    cardShadow: '0 20px 40px rgba(250, 112, 154, 0.3)',
    cardPadding: '20px',
    questionStyle: {
      background: 'rgba(255, 255, 255, 0.95)',
      border: '2px solid #ffeaa7',
      borderRadius: '20px',
      padding: '28px',
      backdropFilter: 'blur(10px)'
    },
    numberBadgeStyle: 'diamond',
    numberBadgeBackground: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)',
    numberBadgeColor: '#7c2d12',
    staticImages: {
      'main-2': '/dalle-images/---Terre-des-Dragons/main-2.png',
      'decorative1-2': '/dalle-images/---Terre-des-Dragons/decorative1-2.png',
      'decorative2-2': '/dalle-images/---Terre-des-Dragons/decorative2-2.png'
    }
  },

  {
    name: '🧜‍♀️ Palais Sous-Marin',
    type: 'dalle-powered',
    background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    cardBorder: '3px solid #4facfe',
    cardRadius: '30px',
    cardShadow: '0 20px 40px rgba(79, 172, 254, 0.3)',
    cardPadding: '20px',
    questionStyle: {
      background: 'rgba(255, 255, 255, 0.95)',
      border: '2px solid #a8edea',
      borderRadius: '25px',
      padding: '30px',
      backdropFilter: 'blur(10px)'
    },
    numberBadgeStyle: 'cloud',
    numberBadgeBackground: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    numberBadgeColor: '#0e4f6d',
    staticImages: {
      'main-3': '/dalle-images/------Palais-Sous-Marin/main-3.png',
      'background-3': '/dalle-images/------Palais-Sous-Marin/background-3.png',
      'decorative1-3': '/dalle-images/------Palais-Sous-Marin/decorative1-3.png'
    }
  },

  {
    name: '🏴‍☠️ Île aux Pirates',
    type: 'dalle-powered',
    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    cardBorder: '3px solid #f5576c',
    cardRadius: '20px',
    cardShadow: '0 20px 40px rgba(245, 87, 108, 0.3)',
    cardPadding: '20px',
    questionStyle: {
      background: 'rgba(255, 255, 255, 0.95)',
      border: '2px solid #fda085',
      borderRadius: '18px',
      padding: '26px',
      backdropFilter: 'blur(10px)'
    },
    numberBadgeStyle: 'star',
    numberBadgeBackground: 'linear-gradient(135deg, #fccb90 0%, #d57eeb 100%)',
    numberBadgeColor: '#4a0e0e',
    staticImages: {
      'main-4': '/dalle-images/-------le-aux-Pirates/main-4.png',
      'decorative1-4': '/dalle-images/-------le-aux-Pirates/decorative1-4.png',
      'decorative2-4': '/dalle-images/-------le-aux-Pirates/decorative2-4.png'
    }
  }
];

// Get static images for a theme
export function getStaticImages(themeIndex: number): { [key: string]: string } {
  const theme = dallePoweredThemes[themeIndex];
  return theme ? theme.staticImages : {};
}

export default dallePoweredThemes;