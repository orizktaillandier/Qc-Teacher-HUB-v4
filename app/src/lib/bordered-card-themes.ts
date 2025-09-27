// Pattern-based professional themes matching GitHub style with proper padding
export interface BorderedCardTheme {
  name: string;
  primary: string;           // Primary accent color
  secondary: string;          // Secondary background color
  cardBackground: string;     // Main card background
  cardBorder: string;        // Card border
  cardRadius: string;        // Border radius
  cardShadow: string;        // Box shadow
  cardPadding?: string;      // Card padding
  pattern?: string;          // Repeating pattern overlay
  patternType?: 'diagonal' | 'vertical' | 'horizontal' | 'dots' | 'grid';
  questionStyle?: {
    background: string;
    border: string;
    borderRadius: string;
    padding: string;
    boxShadow?: string;
  };
}

export const borderedCardThemes: BorderedCardTheme[] = [
  {
    name: '🌊 Bleu Océan',
    primary: '#4A7FE6',
    secondary: '#E8F0FF',
    cardBackground: `
      linear-gradient(135deg, #E8F0FF 0%, #D1E3FF 100%),
      repeating-linear-gradient(
        45deg,
        transparent,
        transparent 35px,
        rgba(74, 127, 230, 0.15) 35px,
        rgba(74, 127, 230, 0.15) 70px
      )
    `,
    cardBorder: '3px solid #4A7FE6',
    cardRadius: '20px',
    cardShadow: '0 10px 30px rgba(74, 127, 230, 0.2)',
    cardPadding: '25px',
    pattern: 'repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(74, 127, 230, 0.15) 35px, rgba(74, 127, 230, 0.15) 70px)',
    patternType: 'diagonal',
    questionStyle: {
      background: 'rgba(255, 255, 255, 0.95)',
      border: '2px solid rgba(74, 127, 230, 0.3)',
      borderRadius: '12px',
      padding: '20px',
      boxShadow: 'inset 0 2px 4px rgba(74, 127, 230, 0.1)'
    }
  },
  {
    name: '🌿 Vert Nature',
    primary: '#52A373',
    secondary: '#E8F5E9',
    cardBackground: `
      linear-gradient(135deg, #E8F5E9 0%, #C8E6C9 100%),
      repeating-linear-gradient(
        90deg,
        transparent,
        transparent 30px,
        rgba(82, 163, 115, 0.12) 30px,
        rgba(82, 163, 115, 0.12) 60px
      )
    `,
    cardBorder: '3px solid #52A373',
    cardRadius: '20px',
    cardShadow: '0 10px 30px rgba(82, 163, 115, 0.2)',
    cardPadding: '25px',
    pattern: 'repeating-linear-gradient(90deg, transparent, transparent 30px, rgba(82, 163, 115, 0.12) 30px, rgba(82, 163, 115, 0.12) 60px)',
    patternType: 'vertical',
    questionStyle: {
      background: 'rgba(255, 255, 255, 0.95)',
      border: '2px solid rgba(82, 163, 115, 0.3)',
      borderRadius: '12px',
      padding: '20px',
      boxShadow: 'inset 0 2px 4px rgba(82, 163, 115, 0.1)'
    }
  },
  {
    name: '☀️ Orange Soleil',
    primary: '#FF8C42',
    secondary: '#FFF3E0',
    cardBackground: `
      linear-gradient(135deg, #FFF3E0 0%, #FFE0B2 100%),
      repeating-linear-gradient(
        45deg,
        transparent,
        transparent 40px,
        rgba(255, 140, 66, 0.1) 40px,
        rgba(255, 140, 66, 0.1) 80px
      )
    `,
    cardBorder: '3px solid #FF8C42',
    cardRadius: '20px',
    cardShadow: '0 10px 30px rgba(255, 140, 66, 0.2)',
    cardPadding: '25px',
    pattern: 'repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(255, 140, 66, 0.1) 40px, rgba(255, 140, 66, 0.1) 80px)',
    patternType: 'diagonal',
    questionStyle: {
      background: 'rgba(255, 255, 255, 0.95)',
      border: '2px solid rgba(255, 140, 66, 0.3)',
      borderRadius: '12px',
      padding: '20px',
      boxShadow: 'inset 0 2px 4px rgba(255, 140, 66, 0.1)'
    }
  },
  {
    name: '💜 Violet Mystique',
    primary: '#8B7FD6',
    secondary: '#F3E5F5',
    cardBackground: `
      linear-gradient(135deg, #F3E5F5 0%, #E1BEE7 100%),
      repeating-linear-gradient(
        135deg,
        transparent,
        transparent 25px,
        rgba(139, 127, 214, 0.08) 25px,
        rgba(139, 127, 214, 0.08) 50px
      )
    `,
    cardBorder: '3px solid #8B7FD6',
    cardRadius: '20px',
    cardShadow: '0 10px 30px rgba(139, 127, 214, 0.2)',
    cardPadding: '25px',
    pattern: 'repeating-linear-gradient(135deg, transparent, transparent 25px, rgba(139, 127, 214, 0.08) 25px, rgba(139, 127, 214, 0.08) 50px)',
    patternType: 'diagonal',
    questionStyle: {
      background: 'rgba(255, 255, 255, 0.95)',
      border: '2px solid rgba(139, 127, 214, 0.3)',
      borderRadius: '12px',
      padding: '20px',
      boxShadow: 'inset 0 2px 4px rgba(139, 127, 214, 0.1)'
    }
  },
  {
    name: '🌸 Rose Tendre',
    primary: '#E91E63',
    secondary: '#FCE4EC',
    cardBackground: `
      linear-gradient(135deg, #FCE4EC 0%, #F8BBD0 100%),
      radial-gradient(circle at 50% 50%, transparent 20%, rgba(233, 30, 99, 0.06) 20%, rgba(233, 30, 99, 0.06) 40%, transparent 40%, transparent)
    `,
    cardBorder: '3px solid #E91E63',
    cardRadius: '20px',
    cardShadow: '0 10px 30px rgba(233, 30, 99, 0.2)',
    cardPadding: '25px',
    pattern: 'radial-gradient(circle at 50% 50%, transparent 20%, rgba(233, 30, 99, 0.06) 20%, rgba(233, 30, 99, 0.06) 40%, transparent 40%, transparent)',
    patternType: 'dots',
    questionStyle: {
      background: 'rgba(255, 255, 255, 0.95)',
      border: '2px solid rgba(233, 30, 99, 0.3)',
      borderRadius: '12px',
      padding: '20px',
      boxShadow: 'inset 0 2px 4px rgba(233, 30, 99, 0.1)'
    }
  },
  {
    name: '🔥 Rouge Érable',
    primary: '#D32F2F',
    secondary: '#FFEBEE',
    cardBackground: `
      linear-gradient(135deg, #FFEBEE 0%, #FFCDD2 100%),
      linear-gradient(90deg, transparent 49.5%, rgba(211, 47, 47, 0.05) 49.5%, rgba(211, 47, 47, 0.05) 50.5%, transparent 50.5%),
      linear-gradient(0deg, transparent 49.5%, rgba(211, 47, 47, 0.05) 49.5%, rgba(211, 47, 47, 0.05) 50.5%, transparent 50.5%)
    `,
    cardBorder: '3px solid #D32F2F',
    cardRadius: '20px',
    cardShadow: '0 10px 30px rgba(211, 47, 47, 0.2)',
    cardPadding: '25px',
    pattern: 'linear-gradient(90deg, transparent 49.5%, rgba(211, 47, 47, 0.05) 49.5%, rgba(211, 47, 47, 0.05) 50.5%, transparent 50.5%)',
    patternType: 'grid',
    questionStyle: {
      background: 'rgba(255, 255, 255, 0.95)',
      border: '2px solid rgba(211, 47, 47, 0.3)',
      borderRadius: '12px',
      padding: '20px',
      boxShadow: 'inset 0 2px 4px rgba(211, 47, 47, 0.1)'
    }
  },
  {
    name: '🌅 Coucher Doré',
    primary: '#FFA726',
    secondary: '#FFF8E1',
    cardBackground: `
      linear-gradient(135deg, #FFF8E1 0%, #FFECB3 100%),
      repeating-linear-gradient(
        0deg,
        transparent,
        transparent 30px,
        rgba(255, 167, 38, 0.08) 30px,
        rgba(255, 167, 38, 0.08) 60px
      )
    `,
    cardBorder: '3px solid #FFA726',
    cardRadius: '20px',
    cardShadow: '0 10px 30px rgba(255, 167, 38, 0.2)',
    cardPadding: '25px',
    pattern: 'repeating-linear-gradient(0deg, transparent, transparent 30px, rgba(255, 167, 38, 0.08) 30px, rgba(255, 167, 38, 0.08) 60px)',
    patternType: 'horizontal',
    questionStyle: {
      background: 'rgba(255, 255, 255, 0.95)',
      border: '2px solid rgba(255, 167, 38, 0.3)',
      borderRadius: '12px',
      padding: '20px',
      boxShadow: 'inset 0 2px 4px rgba(255, 167, 38, 0.1)'
    }
  },
  {
    name: '💎 Turquoise Glacé',
    primary: '#00BCD4',
    secondary: '#E0F7FA',
    cardBackground: `
      linear-gradient(135deg, #E0F7FA 0%, #B2EBF2 100%),
      repeating-linear-gradient(
        45deg,
        transparent,
        transparent 32px,
        rgba(0, 188, 212, 0.1) 32px,
        rgba(0, 188, 212, 0.1) 64px
      )
    `,
    cardBorder: '3px solid #00BCD4',
    cardRadius: '20px',
    cardShadow: '0 10px 30px rgba(0, 188, 212, 0.2)',
    cardPadding: '25px',
    pattern: 'repeating-linear-gradient(45deg, transparent, transparent 32px, rgba(0, 188, 212, 0.1) 32px, rgba(0, 188, 212, 0.1) 64px)',
    patternType: 'diagonal',
    questionStyle: {
      background: 'rgba(255, 255, 255, 0.95)',
      border: '2px solid rgba(0, 188, 212, 0.3)',
      borderRadius: '12px',
      padding: '20px',
      boxShadow: 'inset 0 2px 4px rgba(0, 188, 212, 0.1)'
    }
  },
  {
    name: '🍇 Indigo Royal',
    primary: '#3F51B5',
    secondary: '#E8EAF6',
    cardBackground: `
      linear-gradient(135deg, #E8EAF6 0%, #C5CAE9 100%),
      repeating-linear-gradient(
        135deg,
        transparent,
        transparent 35px,
        rgba(63, 81, 181, 0.08) 35px,
        rgba(63, 81, 181, 0.08) 70px
      )
    `,
    cardBorder: '3px solid #3F51B5',
    cardRadius: '20px',
    cardShadow: '0 10px 30px rgba(63, 81, 181, 0.2)',
    cardPadding: '25px',
    pattern: 'repeating-linear-gradient(135deg, transparent, transparent 35px, rgba(63, 81, 181, 0.08) 35px, rgba(63, 81, 181, 0.08) 70px)',
    patternType: 'diagonal',
    questionStyle: {
      background: 'rgba(255, 255, 255, 0.95)',
      border: '2px solid rgba(63, 81, 181, 0.3)',
      borderRadius: '12px',
      padding: '20px',
      boxShadow: 'inset 0 2px 4px rgba(63, 81, 181, 0.1)'
    }
  },
  {
    name: '🍑 Pêche Délicate',
    primary: '#FF7043',
    secondary: '#FBE9E7',
    cardBackground: `
      linear-gradient(135deg, #FBE9E7 0%, #FFCCBC 100%),
      radial-gradient(circle at 25% 25%, transparent 20%, rgba(255, 112, 67, 0.06) 20%, rgba(255, 112, 67, 0.06) 35%, transparent 35%, transparent)
    `,
    cardBorder: '3px solid #FF7043',
    cardRadius: '20px',
    cardShadow: '0 10px 30px rgba(255, 112, 67, 0.2)',
    cardPadding: '25px',
    pattern: 'radial-gradient(circle at 25% 25%, transparent 20%, rgba(255, 112, 67, 0.06) 20%, rgba(255, 112, 67, 0.06) 35%, transparent 35%, transparent)',
    patternType: 'dots',
    questionStyle: {
      background: 'rgba(255, 255, 255, 0.95)',
      border: '2px solid rgba(255, 112, 67, 0.3)',
      borderRadius: '12px',
      padding: '20px',
      boxShadow: 'inset 0 2px 4px rgba(255, 112, 67, 0.1)'
    }
  },
  {
    name: '🌲 Vert Forêt',
    primary: '#2E7D32',
    secondary: '#E8F5E9',
    cardBackground: `
      linear-gradient(135deg, #E8F5E9 0%, #C8E6C9 100%),
      repeating-linear-gradient(
        90deg,
        transparent,
        transparent 40px,
        rgba(46, 125, 50, 0.08) 40px,
        rgba(46, 125, 50, 0.08) 80px
      )
    `,
    cardBorder: '3px solid #2E7D32',
    cardRadius: '20px',
    cardShadow: '0 10px 30px rgba(46, 125, 50, 0.2)',
    cardPadding: '25px',
    pattern: 'repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(46, 125, 50, 0.08) 40px, rgba(46, 125, 50, 0.08) 80px)',
    patternType: 'vertical',
    questionStyle: {
      background: 'rgba(255, 255, 255, 0.95)',
      border: '2px solid rgba(46, 125, 50, 0.3)',
      borderRadius: '12px',
      padding: '20px',
      boxShadow: 'inset 0 2px 4px rgba(46, 125, 50, 0.1)'
    }
  },
  {
    name: '🌙 Gris Élégant',
    primary: '#607D8B',
    secondary: '#ECEFF1',
    cardBackground: `
      linear-gradient(135deg, #ECEFF1 0%, #CFD8DC 100%),
      repeating-linear-gradient(
        0deg,
        transparent,
        transparent 28px,
        rgba(96, 125, 139, 0.05) 28px,
        rgba(96, 125, 139, 0.05) 56px
      )
    `,
    cardBorder: '3px solid #607D8B',
    cardRadius: '20px',
    cardShadow: '0 10px 30px rgba(96, 125, 139, 0.2)',
    cardPadding: '25px',
    pattern: 'repeating-linear-gradient(0deg, transparent, transparent 28px, rgba(96, 125, 139, 0.05) 28px, rgba(96, 125, 139, 0.05) 56px)',
    patternType: 'horizontal',
    questionStyle: {
      background: 'rgba(255, 255, 255, 0.95)',
      border: '2px solid rgba(96, 125, 139, 0.3)',
      borderRadius: '12px',
      padding: '20px',
      boxShadow: 'inset 0 2px 4px rgba(96, 125, 139, 0.1)'
    }
  },
  {
    name: '🍊 Mandarine',
    primary: '#FF6F00',
    secondary: '#FFF3E0',
    cardBackground: `
      linear-gradient(135deg, #FFF3E0 0%, #FFE0B2 100%),
      repeating-linear-gradient(
        45deg,
        transparent,
        transparent 35px,
        rgba(255, 111, 0, 0.08) 35px,
        rgba(255, 111, 0, 0.08) 70px
      )
    `,
    cardBorder: '3px solid #FF6F00',
    cardRadius: '20px',
    cardShadow: '0 10px 30px rgba(255, 111, 0, 0.2)',
    cardPadding: '25px',
    pattern: 'repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255, 111, 0, 0.08) 35px, rgba(255, 111, 0, 0.08) 70px)',
    patternType: 'diagonal',
    questionStyle: {
      background: 'rgba(255, 255, 255, 0.95)',
      border: '2px solid rgba(255, 111, 0, 0.3)',
      borderRadius: '12px',
      padding: '20px',
      boxShadow: 'inset 0 2px 4px rgba(255, 111, 0, 0.1)'
    }
  },
  {
    name: '🌺 Corail Vif',
    primary: '#FF5252',
    secondary: '#FFEBEE',
    cardBackground: `
      linear-gradient(135deg, #FFEBEE 0%, #FFCDD2 100%),
      radial-gradient(circle at 75% 75%, transparent 20%, rgba(255, 82, 82, 0.06) 20%, rgba(255, 82, 82, 0.06) 40%, transparent 40%, transparent)
    `,
    cardBorder: '3px solid #FF5252',
    cardRadius: '20px',
    cardShadow: '0 10px 30px rgba(255, 82, 82, 0.2)',
    cardPadding: '25px',
    pattern: 'radial-gradient(circle at 75% 75%, transparent 20%, rgba(255, 82, 82, 0.06) 20%, rgba(255, 82, 82, 0.06) 40%, transparent 40%, transparent)',
    patternType: 'dots',
    questionStyle: {
      background: 'rgba(255, 255, 255, 0.95)',
      border: '2px solid rgba(255, 82, 82, 0.3)',
      borderRadius: '12px',
      padding: '20px',
      boxShadow: 'inset 0 2px 4px rgba(255, 82, 82, 0.1)'
    }
  },
  {
    name: '❄️ Bleu Glacier',
    primary: '#03A9F4',
    secondary: '#E1F5FE',
    cardBackground: `
      linear-gradient(135deg, #E1F5FE 0%, #B3E5FC 100%),
      repeating-linear-gradient(
        90deg,
        transparent,
        transparent 30px,
        rgba(3, 169, 244, 0.06) 30px,
        rgba(3, 169, 244, 0.06) 60px
      )
    `,
    cardBorder: '3px solid #03A9F4',
    cardRadius: '20px',
    cardShadow: '0 10px 30px rgba(3, 169, 244, 0.2)',
    cardPadding: '25px',
    pattern: 'repeating-linear-gradient(90deg, transparent, transparent 30px, rgba(3, 169, 244, 0.06) 30px, rgba(3, 169, 244, 0.06) 60px)',
    patternType: 'vertical',
    questionStyle: {
      background: 'rgba(255, 255, 255, 0.95)',
      border: '2px solid rgba(3, 169, 244, 0.3)',
      borderRadius: '12px',
      padding: '20px',
      boxShadow: 'inset 0 2px 4px rgba(3, 169, 244, 0.1)'
    }
  }
];

// Helper function to get bordered theme by index
export function getBorderedThemeByIndex(index: number): BorderedCardTheme {
  return borderedCardThemes[index % borderedCardThemes.length];
}