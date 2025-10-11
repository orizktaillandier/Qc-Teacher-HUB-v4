// Scrapbook & Hand-drawn style themes inspired by educational materials
export interface ScrapbookTheme {
  name: string;
  cardBackground: string;
  cardBorder: string;
  cardRadius: string;
  cardShadow: string;
  decorativeCorners?: string;
  borderImage?: string;
  clipPath?: string;
  pattern?: string;
  questionStyle?: {
    background: string;
    border: string;
    borderRadius: string;
    padding: string;
  };
}

export const scrapbookThemes: ScrapbookTheme[] = [
  {
    name: '📚 Jardin de Vicky',
    cardBackground: `
      linear-gradient(135deg, #fff9e6 0%, #ffedd1 100%),
      repeating-linear-gradient(
        45deg,
        transparent,
        transparent 10px,
        rgba(255, 182, 93, 0.05) 10px,
        rgba(255, 182, 93, 0.05) 20px
      )
    `,
    cardBorder: '8px ridge #8b7355',
    cardRadius: '0',
    cardShadow: '0 0 0 2px white, 0 0 0 4px #d4a574, 5px 5px 15px rgba(0,0,0,0.2)',
    clipPath: 'polygon(2% 0%, 98% 0%, 100% 2%, 100% 98%, 98% 100%, 2% 100%, 0% 98%, 0% 2%)',
    decorativeCorners: '🍃',
    questionStyle: {
      background: 'rgba(255, 255, 255, 0.9)',
      border: '3px dashed #8b7355',
      borderRadius: '0',
      padding: '20px'
    }
  },
  {
    name: '⭐ Étoiles Scintillantes',
    cardBackground: `
      linear-gradient(135deg, #e6f3ff 0%, #ffeee6 100%),
      radial-gradient(circle at 10% 10%, gold 0%, transparent 2%),
      radial-gradient(circle at 90% 10%, gold 0%, transparent 2%),
      radial-gradient(circle at 10% 90%, gold 0%, transparent 2%),
      radial-gradient(circle at 90% 90%, gold 0%, transparent 2%)
    `,
    cardBorder: '6px double #4a90e2',
    cardRadius: '0',
    cardShadow: 'inset 0 0 20px rgba(255, 215, 0, 0.2), 0 5px 15px rgba(0,0,0,0.2)',
    decorativeCorners: '⭐',
    pattern: `url("data:image/svg+xml,%3Csvg width='20' height='20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 0 L12 8 L20 10 L12 12 L10 20 L8 12 L0 10 L8 8 Z' fill='%23ffd700' opacity='0.1'/%3E%3C/svg%3E")`,
    questionStyle: {
      background: 'white',
      border: '2px solid #4a90e2',
      borderRadius: '0',
      padding: '20px'
    }
  },
  {
    name: '🎨 Cahier d\'École',
    cardBackground: `
      linear-gradient(180deg, transparent 29px, #e91e1e 29px, #e91e1e 31px, transparent 31px),
      linear-gradient(90deg, transparent 29px, #e91e1e 29px, #e91e1e 31px, transparent 31px),
      #f5f5dc
    `,
    cardBorder: '5px solid #2c3e50',
    cardRadius: '0',
    cardShadow: '0 0 0 1px white, 0 0 0 3px #2c3e50, 3px 3px 10px rgba(0,0,0,0.3)',
    clipPath: 'polygon(0 0, calc(100% - 15px) 0, 100% 15px, 100% 100%, 0 100%)',
    questionStyle: {
      background: 'rgba(255, 255, 255, 0.95)',
      border: 'none',
      borderRadius: '0',
      padding: '25px'
    }
  },
  {
    name: '🌈 Arc-en-ciel Magique',
    cardBackground: `
      linear-gradient(45deg,
        #ffadad 0%, #ffd6a5 14%, #fdffb6 28%,
        #caffbf 42%, #9bf6ff 56%, #a0c4ff 70%,
        #bdb2ff 84%, #ffc6ff 100%
      )
    `,
    cardBorder: '10px solid transparent',
    borderImage: 'linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4) 10',
    cardRadius: '0',
    cardShadow: '0 0 30px rgba(255, 255, 255, 0.5), 0 10px 30px rgba(0,0,0,0.2)',
    questionStyle: {
      background: 'rgba(255, 255, 255, 0.95)',
      border: '3px dotted #ff6b6b',
      borderRadius: '0',
      padding: '20px'
    }
  },
  {
    name: '🦋 Papillons Joyeux',
    cardBackground: `
      linear-gradient(135deg, #ffeef8 0%, #e6f0ff 100%),
      radial-gradient(ellipse at top left, rgba(255, 182, 193, 0.3) 0%, transparent 40%),
      radial-gradient(ellipse at bottom right, rgba(176, 224, 230, 0.3) 0%, transparent 40%)
    `,
    cardBorder: '6px dashed #ff69b4',
    cardRadius: '0',
    cardShadow: 'inset 0 0 30px rgba(255, 105, 180, 0.1), 0 8px 20px rgba(0,0,0,0.15)',
    decorativeCorners: '🦋',
    questionStyle: {
      background: 'white',
      border: '2px solid #ff69b4',
      borderRadius: '20px',
      padding: '20px'
    }
  },
  {
    name: '🍁 Automne Québécois',
    cardBackground: `
      linear-gradient(135deg, #fff8e1 0%, #ffe0b2 100%),
      radial-gradient(circle at 20% 20%, #d2691e 0%, transparent 3%),
      radial-gradient(circle at 80% 80%, #ff8c00 0%, transparent 3%),
      radial-gradient(circle at 50% 50%, #cd853f 0%, transparent 2%)
    `,
    cardBorder: '8px ridge #8b4513',
    cardRadius: '0',
    cardShadow: '0 0 0 3px #ffe4c4, 0 0 0 6px #8b4513, 5px 5px 20px rgba(139, 69, 19, 0.3)',
    decorativeCorners: '🍁',
    questionStyle: {
      background: 'rgba(255, 255, 255, 0.9)',
      border: '3px dashed #8b4513',
      borderRadius: '0',
      padding: '20px'
    }
  },
  {
    name: '🎪 Cirque Amusant',
    cardBackground: `
      repeating-linear-gradient(
        45deg,
        #ff6b6b,
        #ff6b6b 20px,
        white 20px,
        white 40px,
        #4ecdc4 40px,
        #4ecdc4 60px,
        white 60px,
        white 80px
      )
    `,
    cardBorder: '6px solid #333',
    cardRadius: '0',
    cardShadow: '0 0 0 4px gold, 0 0 0 8px #333, 8px 8px 20px rgba(0,0,0,0.3)',
    decorativeCorners: '🎪',
    questionStyle: {
      background: 'white',
      border: '4px double #333',
      borderRadius: '0',
      padding: '20px'
    }
  },
  {
    name: '🌻 Tournesols Souriants',
    cardBackground: `
      linear-gradient(135deg, #fff9c4 0%, #ffeb3b 100%),
      radial-gradient(circle at 15% 15%, #ffc107 0%, transparent 5%),
      radial-gradient(circle at 85% 15%, #ffc107 0%, transparent 5%),
      radial-gradient(circle at 15% 85%, #ffc107 0%, transparent 5%),
      radial-gradient(circle at 85% 85%, #ffc107 0%, transparent 5%)
    `,
    cardBorder: '6px solid #795548',
    cardRadius: '0',
    cardShadow: 'inset 0 0 30px rgba(255, 193, 7, 0.3), 0 6px 20px rgba(0,0,0,0.2)',
    decorativeCorners: '🌻',
    questionStyle: {
      background: 'rgba(255, 255, 255, 0.95)',
      border: '3px dotted #795548',
      borderRadius: '0',
      padding: '20px'
    }
  },
  {
    name: '🚀 Espace Aventure',
    cardBackground: `
      linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%),
      radial-gradient(circle at 20% 30%, white 0%, transparent 1%),
      radial-gradient(circle at 60% 70%, white 0%, transparent 0.5%),
      radial-gradient(circle at 80% 20%, white 0%, transparent 0.8%),
      radial-gradient(circle at 40% 80%, white 0%, transparent 0.6%)
    `,
    cardBorder: '6px solid #silver',
    cardRadius: '0',
    cardShadow: '0 0 40px rgba(147, 51, 234, 0.5), 0 0 0 3px #9333ea',
    decorativeCorners: '🚀',
    questionStyle: {
      background: 'rgba(255, 255, 255, 0.95)',
      border: '3px solid #9333ea',
      borderRadius: '10px',
      padding: '20px'
    }
  },
  {
    name: '🏰 Château Enchanté',
    cardBackground: `
      linear-gradient(135deg, #e8d5ff 0%, #d4a5ff 100%),
      repeating-linear-gradient(
        90deg,
        transparent,
        transparent 20px,
        rgba(147, 51, 234, 0.1) 20px,
        rgba(147, 51, 234, 0.1) 40px
      )
    `,
    cardBorder: '8px ridge #8b7ab8',
    cardRadius: '0',
    cardShadow: '0 0 0 3px white, 0 0 0 6px #8b7ab8, 0 10px 30px rgba(139, 122, 184, 0.3)',
    clipPath: 'polygon(0 10%, 10% 10%, 10% 0, 20% 0, 20% 10%, 30% 10%, 30% 0, 40% 0, 40% 10%, 50% 10%, 50% 0, 60% 0, 60% 10%, 70% 10%, 70% 0, 80% 0, 80% 10%, 90% 10%, 90% 0, 100% 0, 100% 100%, 0 100%)',
    decorativeCorners: '🏰',
    questionStyle: {
      background: 'rgba(255, 255, 255, 0.9)',
      border: '3px dashed #8b7ab8',
      borderRadius: '0',
      padding: '20px'
    }
  }
];

// Helper function to get theme by index
export function getScrapbookThemeByIndex(index: number): ScrapbookTheme {
  return scrapbookThemes[index % scrapbookThemes.length];
}