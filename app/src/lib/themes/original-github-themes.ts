// Professional themes with clean, structured layouts
export interface OriginalGitHubTheme {
  name: string;
  primary: string;
  secondary?: string;
  gradient?: string;
  pattern?: string;
  patternType?: 'diagonal' | 'dots' | 'grid';
  type: 'professional';

  // Card container styles
  cardBackground?: string;
  cardBorder?: string;
  cardRadius?: string;
  cardShadow?: string;
  cardPadding?: string;

  // Question area styles
  questionStyle?: {
    background?: string;
    border?: string;
    borderRadius?: string;
    padding?: string;
  };

  // Number badge styles
  numberBadgeStyle?: 'circle' | 'square' | 'hexagon' | 'corner' | 'star' | 'diamond' | 'ribbon' | 'cloud';
  numberBadgeBackground?: string;
  numberBadgeColor?: string;

  // Default font for this theme
  defaultFont?: string;
}

// Professional themes with nested structure
export const professionalThemes: OriginalGitHubTheme[] = [
  {
    name: '💙 Professional Blue',
    primary: '#4A7FE6',
    secondary: '#E8F0FF',
    pattern: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(74, 127, 230, 0.15) 35px, rgba(74, 127, 230, 0.15) 70px)`,
    patternType: 'diagonal',
    type: 'professional',
    cardBackground: '#E8F0FF',
    cardBorder: 'none',
    cardRadius: '0',
    cardShadow: 'none',
    questionStyle: {
      background: '#ffffff',
      border: `2px solid #4A7FE6`,
      borderRadius: '12px',
      padding: '15px'
    },
    numberBadgeStyle: 'circle',
    numberBadgeBackground: '#4A7FE6',
    numberBadgeColor: '#ffffff',
    defaultFont: 'poppins'
  },
  {
    name: '💚 Professional Green',
    primary: '#4CB571',
    secondary: '#E8F5ED',
    pattern: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(76, 181, 113, 0.15) 35px, rgba(76, 181, 113, 0.15) 70px)`,
    patternType: 'diagonal',
    type: 'professional',
    cardBackground: '#E8F5ED',
    cardBorder: 'none',
    cardRadius: '0',
    cardShadow: 'none',
    questionStyle: {
      background: '#ffffff',
      border: `2px solid #4CB571`,
      borderRadius: '12px',
      padding: '15px'
    },
    numberBadgeStyle: 'circle',
    numberBadgeBackground: '#4CB571',
    numberBadgeColor: '#ffffff',
    defaultFont: 'quicksand'
  },
  {
    name: '💜 Professional Purple',
    primary: '#9B6DD6',
    secondary: '#F3EDFF',
    pattern: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(155, 109, 214, 0.15) 35px, rgba(155, 109, 214, 0.15) 70px)`,
    patternType: 'diagonal',
    type: 'professional',
    cardBackground: '#F3EDFF',
    cardBorder: 'none',
    cardRadius: '0',
    cardShadow: 'none',
    questionStyle: {
      background: '#ffffff',
      border: `2px solid #9B6DD6`,
      borderRadius: '12px',
      padding: '15px'
    },
    numberBadgeStyle: 'circle',
    numberBadgeBackground: '#9B6DD6',
    numberBadgeColor: '#ffffff',
    defaultFont: 'nunito'
  },
  {
    name: '🧡 Professional Orange',
    primary: '#FF8C42',
    secondary: '#FFF2E8',
    pattern: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255, 140, 66, 0.15) 35px, rgba(255, 140, 66, 0.15) 70px)`,
    patternType: 'diagonal',
    type: 'professional',
    cardBackground: '#FFF2E8',
    cardBorder: 'none',
    cardRadius: '0',
    cardShadow: 'none',
    questionStyle: {
      background: '#ffffff',
      border: `2px solid #FF8C42`,
      borderRadius: '12px',
      padding: '15px'
    },
    numberBadgeStyle: 'circle',
    numberBadgeBackground: '#FF8C42',
    numberBadgeColor: '#ffffff',
    defaultFont: 'comfortaa'
  },

  // NEW CREATIVE THEMES

  // 1. Memphis Design Theme - Bold geometric patterns
  {
    name: '🔺 Memphis Géométrique',
    primary: '#FF1744',
    secondary: '#FFF9C4',
    pattern: `
      repeating-linear-gradient(90deg, #FF1744 0px, #FF1744 20px, #00BCD4 20px, #00BCD4 40px),
      repeating-linear-gradient(0deg, transparent 0px, transparent 20px, #FFD600 20px, #FFD600 40px),
      radial-gradient(circle at 15% 85%, #FF1744 0%, #FF1744 15%, transparent 15%),
      radial-gradient(circle at 85% 15%, #00BCD4 0%, #00BCD4 10%, transparent 10%),
      linear-gradient(45deg, #FFF9C4, #FFF9C4)
    `,
    patternType: 'grid',
    type: 'professional',
    cardBackground: 'linear-gradient(135deg, #FFF9C4 0%, #FFECB3 100%)',
    cardBorder: '4px solid #000000',
    cardRadius: '0',
    cardShadow: '8px 8px 0px #000000',
    questionStyle: {
      background: 'rgba(255, 255, 255, 0.95)',
      border: '3px solid #FF1744',
      borderRadius: '0',
      padding: '20px'
    },
    numberBadgeStyle: 'diamond',
    numberBadgeBackground: '#000000',
    numberBadgeColor: '#FFEB3B',
    defaultFont: 'fredoka'
  },

  // 2. Art Deco Theme - Elegant vintage patterns
  {
    name: '✨ Art Déco Élégant',
    primary: '#D4AF37',
    secondary: '#1A1A2E',
    pattern: `
      repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(212, 175, 55, 0.1) 10px, rgba(212, 175, 55, 0.1) 20px),
      repeating-linear-gradient(-45deg, transparent, transparent 10px, rgba(212, 175, 55, 0.1) 10px, rgba(212, 175, 55, 0.1) 20px),
      radial-gradient(ellipse at top, rgba(212, 175, 55, 0.2), transparent 70%),
      linear-gradient(180deg, #1A1A2E, #16213E)
    `,
    patternType: 'grid',
    type: 'professional',
    cardBackground: 'linear-gradient(135deg, #1A1A2E 0%, #0F3460 50%, #16213E 100%)',
    cardBorder: '2px solid #D4AF37',
    cardRadius: '0',
    cardShadow: '0 10px 30px rgba(212, 175, 55, 0.3)',
    questionStyle: {
      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(250, 248, 240, 0.98) 100%)',
      border: '2px solid #D4AF37',
      borderRadius: '0',
      padding: '25px'
    },
    numberBadgeStyle: 'hexagon',
    numberBadgeBackground: 'linear-gradient(135deg, #D4AF37, #B8961F)',
    numberBadgeColor: '#1A1A2E',
    defaultFont: 'cinzel'
  },

  // 3. Japanese Wave Theme - Seigaiha pattern
  {
    name: '🌊 Vagues Japonaises',
    primary: '#2E7D32',
    secondary: '#E3F2FD',
    pattern: `
      radial-gradient(circle at 10% 20%, transparent 0%, transparent 50%, rgba(46, 125, 50, 0.1) 50%, rgba(46, 125, 50, 0.1) 55%, transparent 55%),
      radial-gradient(circle at 30% 20%, transparent 0%, transparent 50%, rgba(46, 125, 50, 0.15) 50%, rgba(46, 125, 50, 0.15) 55%, transparent 55%),
      radial-gradient(circle at 50% 20%, transparent 0%, transparent 50%, rgba(46, 125, 50, 0.1) 50%, rgba(46, 125, 50, 0.1) 55%, transparent 55%),
      radial-gradient(circle at 70% 20%, transparent 0%, transparent 50%, rgba(46, 125, 50, 0.15) 50%, rgba(46, 125, 50, 0.15) 55%, transparent 55%),
      radial-gradient(circle at 90% 20%, transparent 0%, transparent 50%, rgba(46, 125, 50, 0.1) 50%, rgba(46, 125, 50, 0.1) 55%, transparent 55%),
      linear-gradient(180deg, #E3F2FD, #BBDEFB)
    `,
    patternType: 'dots',
    type: 'professional',
    cardBackground: 'linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%)',
    cardBorder: '3px solid #2E7D32',
    cardRadius: '20px',
    cardShadow: '0 8px 32px rgba(46, 125, 50, 0.15)',
    questionStyle: {
      background: 'rgba(255, 255, 255, 0.95)',
      border: '2px solid #2E7D32',
      borderRadius: '15px',
      padding: '20px'
    },
    numberBadgeStyle: 'cloud',
    numberBadgeBackground: '#2E7D32',
    numberBadgeColor: '#ffffff',
    defaultFont: 'satisfy'
  },

  // 4. Retro Tech Theme - Circuit board pattern
  {
    name: '💻 Technologie Rétro',
    primary: '#00E676',
    secondary: '#263238',
    pattern: `
      linear-gradient(90deg, transparent 79px, rgba(0, 230, 118, 0.3) 79px, rgba(0, 230, 118, 0.3) 81px, transparent 81px),
      linear-gradient(transparent 79px, rgba(0, 230, 118, 0.3) 79px, rgba(0, 230, 118, 0.3) 81px, transparent 81px),
      linear-gradient(90deg, transparent 19px, rgba(0, 230, 118, 0.1) 19px, rgba(0, 230, 118, 0.1) 21px, transparent 21px),
      linear-gradient(transparent 19px, rgba(0, 230, 118, 0.1) 19px, rgba(0, 230, 118, 0.1) 21px, transparent 21px),
      radial-gradient(circle at 20px 20px, #00E676 2px, transparent 2px),
      radial-gradient(circle at 80px 80px, #00E676 2px, transparent 2px),
      linear-gradient(135deg, #263238, #37474F)
    `,
    patternType: 'grid',
    type: 'professional',
    cardBackground: 'linear-gradient(135deg, #263238 0%, #37474F 100%)',
    cardBorder: '2px solid #00E676',
    cardRadius: '8px',
    cardShadow: '0 0 20px rgba(0, 230, 118, 0.4)',
    questionStyle: {
      background: 'rgba(255, 255, 255, 0.95)',
      border: '2px solid #00E676',
      borderRadius: '8px',
      padding: '20px'
    },
    numberBadgeStyle: 'square',
    numberBadgeBackground: '#00E676',
    numberBadgeColor: '#263238',
    defaultFont: 'press-start-2p'
  },

  // 5. Comic Book Theme - Halftone dots and bold outlines
  {
    name: '💥 Bande Dessinée',
    primary: '#FF6B35',
    secondary: '#FFF3E0',
    pattern: `
      radial-gradient(circle, transparent 20%, rgba(255, 107, 53, 0.3) 20%, rgba(255, 107, 53, 0.3) 25%, transparent 25%, transparent 100%),
      radial-gradient(circle, transparent 20%, rgba(255, 107, 53, 0.2) 20%, rgba(255, 107, 53, 0.2) 25%, transparent 25%, transparent 100%),
      linear-gradient(135deg, #FFF3E0 0%, #FFE0B2 100%)
    `,
    patternType: 'dots',
    type: 'professional',
    cardBackground: 'linear-gradient(135deg, #FFF3E0 0%, #FFE0B2 100%)',
    cardBorder: '4px solid #000000',
    cardRadius: '0',
    cardShadow: '6px 6px 0px #000000',
    questionStyle: {
      background: '#FFFFFF',
      border: '3px solid #000000',
      borderRadius: '0',
      padding: '20px'
    },
    numberBadgeStyle: 'star',
    numberBadgeBackground: '#FF6B35',
    numberBadgeColor: '#FFFFFF',
    defaultFont: 'bangers'
  },

  // BATCH 2 - 10 MORE CREATIVE THEMES

  // 6. Moroccan Tile Theme - Islamic geometric patterns
  {
    name: '🕌 Mosaïque Marocaine',
    primary: '#00695C',
    secondary: '#E0F2F1',
    pattern: `
      conic-gradient(from 45deg at 50% 50%, #00695C 0deg, #00897B 45deg, #00695C 90deg, #00897B 135deg, #00695C 180deg, #00897B 225deg, #00695C 270deg, #00897B 315deg, #00695C 360deg),
      repeating-conic-gradient(from 0deg at 50% 50%, transparent 0deg, transparent 10deg, rgba(0, 105, 92, 0.1) 10deg, rgba(0, 105, 92, 0.1) 20deg),
      linear-gradient(135deg, #E0F2F1, #B2DFDB)
    `,
    patternType: 'grid',
    type: 'professional',
    cardBackground: 'linear-gradient(135deg, #E0F2F1 0%, #B2DFDB 100%)',
    cardBorder: '3px solid #00695C',
    cardRadius: '16px',
    cardShadow: '0 12px 24px rgba(0, 105, 92, 0.2)',
    questionStyle: {
      background: 'rgba(255, 255, 255, 0.98)',
      border: '2px solid #00695C',
      borderRadius: '12px',
      padding: '22px'
    },
    numberBadgeStyle: 'hexagon',
    numberBadgeBackground: 'linear-gradient(135deg, #00695C, #00897B)',
    numberBadgeColor: '#E0F2F1',
    defaultFont: 'playfair-display'
  },

  // 7. 70s Groovy Theme - Psychedelic patterns
  {
    name: '🌻 Groovy Rétro',
    primary: '#FF6F00',
    secondary: '#FFF3E0',
    pattern: `
      radial-gradient(ellipse at 25% 25%, #FF6F00 0%, transparent 50%),
      radial-gradient(ellipse at 75% 75%, #E91E63 0%, transparent 50%),
      radial-gradient(ellipse at 75% 25%, #9C27B0 0%, transparent 50%),
      radial-gradient(ellipse at 25% 75%, #FFC107 0%, transparent 50%),
      linear-gradient(45deg, #FFF3E0, #FFE0B2)
    `,
    patternType: 'dots',
    type: 'professional',
    cardBackground: 'linear-gradient(135deg, #FFF3E0 0%, #FFE0B2 100%)',
    cardBorder: '4px solid #FF6F00',
    cardRadius: '30px',
    cardShadow: '0 8px 20px rgba(255, 111, 0, 0.3)',
    questionStyle: {
      background: 'rgba(255, 255, 255, 0.95)',
      border: '3px solid #FF6F00',
      borderRadius: '25px',
      padding: '20px'
    },
    numberBadgeStyle: 'circle',
    numberBadgeBackground: 'linear-gradient(45deg, #FF6F00, #E91E63, #9C27B0)',
    numberBadgeColor: '#FFFFFF',
    defaultFont: 'bungee'
  },

  // 8. Scandinavian Theme - Minimalist with subtle patterns
  {
    name: '🌲 Scandinave Minimaliste',
    primary: '#37474F',
    secondary: '#FAFAFA',
    pattern: `
      repeating-linear-gradient(90deg, transparent, transparent 100px, rgba(55, 71, 79, 0.03) 100px, rgba(55, 71, 79, 0.03) 101px),
      repeating-linear-gradient(0deg, transparent, transparent 100px, rgba(55, 71, 79, 0.03) 100px, rgba(55, 71, 79, 0.03) 101px),
      linear-gradient(180deg, #FAFAFA, #F5F5F5)
    `,
    patternType: 'grid',
    type: 'professional',
    cardBackground: '#FAFAFA',
    cardBorder: '1px solid #E0E0E0',
    cardRadius: '4px',
    cardShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
    questionStyle: {
      background: '#FFFFFF',
      border: '1px solid #37474F',
      borderRadius: '2px',
      padding: '24px'
    },
    numberBadgeStyle: 'square',
    numberBadgeBackground: '#37474F',
    numberBadgeColor: '#FAFAFA',
    defaultFont: 'inter'
  },

  // 9. Street Art Theme - Graffiti style
  {
    name: '🎨 Art de Rue',
    primary: '#D500F9',
    secondary: '#212121',
    pattern: `
      linear-gradient(45deg, transparent 30%, rgba(213, 0, 249, 0.1) 30%, rgba(213, 0, 249, 0.1) 70%, transparent 70%),
      linear-gradient(-45deg, transparent 30%, rgba(0, 230, 118, 0.1) 30%, rgba(0, 230, 118, 0.1) 70%, transparent 70%),
      radial-gradient(circle at 20% 80%, rgba(255, 235, 59, 0.2) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(0, 188, 212, 0.2) 0%, transparent 50%),
      linear-gradient(135deg, #212121, #424242)
    `,
    patternType: 'diagonal',
    type: 'professional',
    cardBackground: 'linear-gradient(135deg, #212121 0%, #424242 100%)',
    cardBorder: '3px solid #D500F9',
    cardRadius: '0',
    cardShadow: '5px 5px 0px #D500F9, 10px 10px 0px #00E676',
    questionStyle: {
      background: 'rgba(255, 255, 255, 0.95)',
      border: '3px solid #D500F9',
      borderRadius: '0',
      padding: '20px'
    },
    numberBadgeStyle: 'star',
    numberBadgeBackground: '#FFEB3B',
    numberBadgeColor: '#212121',
    defaultFont: 'permanent-marker'
  },

  // 10. Neon Cyberpunk Theme
  {
    name: '💜 Néon Cyberpunk',
    primary: '#E91E63',
    secondary: '#0A0E27',
    pattern: `
      linear-gradient(0deg, transparent 24%, rgba(233, 30, 99, 0.05) 25%, rgba(233, 30, 99, 0.05) 26%, transparent 27%, transparent 74%, rgba(233, 30, 99, 0.05) 75%, rgba(233, 30, 99, 0.05) 76%, transparent 77%, transparent),
      linear-gradient(90deg, transparent 24%, rgba(0, 188, 212, 0.05) 25%, rgba(0, 188, 212, 0.05) 26%, transparent 27%, transparent 74%, rgba(0, 188, 212, 0.05) 75%, rgba(0, 188, 212, 0.05) 76%, transparent 77%, transparent),
      linear-gradient(135deg, #0A0E27, #151937)
    `,
    patternType: 'grid',
    type: 'professional',
    cardBackground: 'linear-gradient(135deg, #0A0E27 0%, #151937 100%)',
    cardBorder: '2px solid #E91E63',
    cardRadius: '8px',
    cardShadow: '0 0 30px rgba(233, 30, 99, 0.5), inset 0 0 20px rgba(233, 30, 99, 0.1)',
    questionStyle: {
      background: 'rgba(255, 255, 255, 0.98)',
      border: '2px solid #00BCD4',
      borderRadius: '4px',
      padding: '22px'
    },
    numberBadgeStyle: 'diamond',
    numberBadgeBackground: 'linear-gradient(45deg, #E91E63, #00BCD4)',
    numberBadgeColor: '#FFFFFF',
    defaultFont: 'righteous'
  },

  // 11. Watercolor Theme - Artistic paint splashes
  {
    name: '🎨 Aquarelle Artistique',
    primary: '#7B1FA2',
    secondary: '#FCE4EC',
    pattern: `
      radial-gradient(circle at 30% 20%, rgba(123, 31, 162, 0.2) 0%, transparent 40%),
      radial-gradient(circle at 70% 40%, rgba(233, 30, 99, 0.15) 0%, transparent 40%),
      radial-gradient(circle at 40% 70%, rgba(156, 39, 176, 0.15) 0%, transparent 40%),
      radial-gradient(circle at 80% 80%, rgba(103, 58, 183, 0.1) 0%, transparent 40%),
      linear-gradient(135deg, #FCE4EC, #F8BBD0)
    `,
    patternType: 'dots',
    type: 'professional',
    cardBackground: 'linear-gradient(135deg, #FCE4EC 0%, #F8BBD0 100%)',
    cardBorder: '2px solid #7B1FA2',
    cardRadius: '20px',
    cardShadow: '0 10px 30px rgba(123, 31, 162, 0.15)',
    questionStyle: {
      background: 'rgba(255, 255, 255, 0.9)',
      border: '2px solid transparent',
      borderRadius: '15px',
      padding: '20px'
    },
    numberBadgeStyle: 'cloud',
    numberBadgeBackground: 'linear-gradient(135deg, #7B1FA2, #9C27B0)',
    numberBadgeColor: '#FFFFFF',
    defaultFont: 'dancing-script'
  },

  // 12. Retro Diner Theme - 1950s American diner
  {
    name: '🍔 Diner Américain',
    primary: '#F44336',
    secondary: '#FFEBEE',
    pattern: `
      repeating-linear-gradient(90deg, #F44336 0px, #F44336 20px, #FFFFFF 20px, #FFFFFF 40px),
      repeating-linear-gradient(0deg, transparent 0px, transparent 40px, rgba(244, 67, 54, 0.1) 40px, rgba(244, 67, 54, 0.1) 80px)
    `,
    patternType: 'grid',
    type: 'professional',
    cardBackground: '#FFEBEE',
    cardBorder: '4px solid #F44336',
    cardRadius: '10px',
    cardShadow: '0 6px 12px rgba(244, 67, 54, 0.2)',
    questionStyle: {
      background: '#FFFFFF',
      border: '2px dashed #F44336',
      borderRadius: '8px',
      padding: '20px'
    },
    numberBadgeStyle: 'circle',
    numberBadgeBackground: '#F44336',
    numberBadgeColor: '#FFFFFF',
    defaultFont: 'bowlby-one'
  },

  // 13. Tropical Jungle Theme
  {
    name: '🌺 Jungle Tropicale',
    primary: '#00897B',
    secondary: '#E0F7FA',
    pattern: `
      radial-gradient(ellipse at top left, rgba(0, 137, 123, 0.2) 0%, transparent 50%),
      radial-gradient(ellipse at bottom right, rgba(0, 150, 136, 0.2) 0%, transparent 50%),
      repeating-linear-gradient(45deg, transparent 0px, transparent 10px, rgba(0, 137, 123, 0.05) 10px, rgba(0, 137, 123, 0.05) 20px),
      linear-gradient(135deg, #E0F7FA, #B2EBF2)
    `,
    patternType: 'diagonal',
    type: 'professional',
    cardBackground: 'linear-gradient(135deg, #E0F7FA 0%, #B2EBF2 100%)',
    cardBorder: '3px solid #00897B',
    cardRadius: '25px',
    cardShadow: '0 15px 35px rgba(0, 137, 123, 0.2)',
    questionStyle: {
      background: 'rgba(255, 255, 255, 0.95)',
      border: '2px solid #00897B',
      borderRadius: '20px',
      padding: '22px'
    },
    numberBadgeStyle: 'star',
    numberBadgeBackground: 'linear-gradient(135deg, #00897B, #4DB6AC)',
    numberBadgeColor: '#FFFFFF',
    defaultFont: 'pacifico'
  },

  // 14. Galaxy Theme - Deep space with stars
  {
    name: '🌌 Galaxie Étoilée',
    primary: '#3F51B5',
    secondary: '#000051',
    pattern: `
      radial-gradient(2px 2px at 20px 30px, white, transparent),
      radial-gradient(2px 2px at 40px 70px, white, transparent),
      radial-gradient(1px 1px at 50px 90px, white, transparent),
      radial-gradient(1px 1px at 130px 40px, white, transparent),
      radial-gradient(2px 2px at 140px 120px, white, transparent),
      radial-gradient(ellipse at center top, rgba(63, 81, 181, 0.3) 0%, transparent 50%),
      radial-gradient(ellipse at center bottom, rgba(156, 39, 176, 0.3) 0%, transparent 50%),
      linear-gradient(180deg, #000051, #1A237E, #283593)
    `,
    patternType: 'dots',
    type: 'professional',
    cardBackground: 'linear-gradient(135deg, #000051 0%, #1A237E 50%, #283593 100%)',
    cardBorder: '2px solid #3F51B5',
    cardRadius: '12px',
    cardShadow: '0 20px 40px rgba(63, 81, 181, 0.4), 0 0 60px rgba(63, 81, 181, 0.2)',
    questionStyle: {
      background: 'rgba(255, 255, 255, 0.95)',
      border: '2px solid #3F51B5',
      borderRadius: '10px',
      padding: '20px'
    },
    numberBadgeStyle: 'hexagon',
    numberBadgeBackground: 'linear-gradient(135deg, #3F51B5, #7C4DFF)',
    numberBadgeColor: '#FFFFFF',
    defaultFont: 'raleway'
  },

  // 15. Building Blocks Theme - Lego-inspired
  {
    name: '🧱 Blocs de Construction',
    primary: '#F9A825',
    secondary: '#FFF9C4',
    pattern: `
      repeating-linear-gradient(0deg, transparent, transparent 50px, rgba(249, 168, 37, 0.1) 50px, rgba(249, 168, 37, 0.1) 100px),
      repeating-linear-gradient(90deg, transparent, transparent 50px, rgba(244, 67, 54, 0.1) 50px, rgba(244, 67, 54, 0.1) 100px),
      radial-gradient(circle at 25px 25px, #F44336 8px, transparent 8px),
      radial-gradient(circle at 75px 25px, #4CAF50 8px, transparent 8px),
      radial-gradient(circle at 25px 75px, #2196F3 8px, transparent 8px),
      radial-gradient(circle at 75px 75px, #F9A825 8px, transparent 8px),
      linear-gradient(135deg, #FFF9C4, #FFEB3B)
    `,
    patternType: 'grid',
    type: 'professional',
    cardBackground: 'linear-gradient(135deg, #FFF9C4 0%, #FFEB3B 100%)',
    cardBorder: '4px solid #F9A825',
    cardRadius: '0',
    cardShadow: '4px 4px 0px #F57C00',
    questionStyle: {
      background: '#FFFFFF',
      border: '3px solid #F9A825',
      borderRadius: '0',
      padding: '20px'
    },
    numberBadgeStyle: 'square',
    numberBadgeBackground: '#F44336',
    numberBadgeColor: '#FFFFFF',
    defaultFont: 'luckiest-guy'
  },

  // BATCH 3 - SHAPE-FOCUSED THEMES

  // 16. Hexagonal Honeycomb Theme
  {
    name: '🍯 Alvéoles Hexagonales',
    primary: '#FFA000',
    secondary: '#FFF8E1',
    pattern: `repeating-conic-gradient(from 30deg at 50% 50%, #FFA000 0deg, #FFA000 60deg, transparent 60deg, transparent 120deg, #FFA000 120deg, #FFA000 180deg, transparent 180deg, transparent 240deg, #FFA000 240deg, #FFA000 300deg, transparent 300deg, transparent 360deg)`,
    patternType: 'grid',
    type: 'professional',
    cardBackground: '#FFF8E1',
    cardBorder: '3px solid #FFA000',
    cardRadius: '0',
    cardShadow: '0 8px 16px rgba(255, 160, 0, 0.2)',
    questionStyle: {
      background: 'rgba(255, 255, 255, 0.95)',
      border: '2px solid #FFA000',
      borderRadius: '0',
      padding: '20px'
    },
    numberBadgeStyle: 'hexagon',
    numberBadgeBackground: '#FFA000',
    numberBadgeColor: '#FFFFFF',
    defaultFont: 'comic-neue'
  },

  // 17. Triangular Prism Theme
  {
    name: '🔺 Prismes Triangulaires',
    primary: '#5E35B1',
    secondary: '#EDE7F6',
    pattern: `repeating-linear-gradient(60deg, #5E35B1 0px, #5E35B1 10px, transparent 10px, transparent 20px, #7E57C2 20px, #7E57C2 30px, transparent 30px, transparent 40px)`,
    patternType: 'diagonal',
    type: 'professional',
    cardBackground: '#EDE7F6',
    cardBorder: '3px solid #5E35B1',
    cardRadius: '0',
    cardShadow: '10px 10px 0px rgba(94, 53, 177, 0.2)',
    questionStyle: {
      background: 'rgba(255, 255, 255, 0.98)',
      border: '2px solid #5E35B1',
      borderRadius: '0',
      padding: '25px'
    },
    numberBadgeStyle: 'diamond',
    numberBadgeBackground: '#5E35B1',
    numberBadgeColor: '#FFFFFF',
    defaultFont: 'montserrat'
  },

  // 18. Circular Waves Theme
  {
    name: '⭕ Ondes Circulaires',
    primary: '#00ACC1',
    secondary: '#E0F7FA',
    pattern: `radial-gradient(circle at 50% 50%, transparent 20px, rgba(0, 172, 193, 0.3) 20px, rgba(0, 172, 193, 0.3) 40px, transparent 40px, transparent 60px, rgba(0, 172, 193, 0.2) 60px, rgba(0, 172, 193, 0.2) 80px, transparent 80px)`,
    patternType: 'dots',
    type: 'professional',
    cardBackground: '#E0F7FA',
    cardBorder: 'none',
    cardRadius: '50px',
    cardShadow: '0 10px 30px rgba(0, 172, 193, 0.15)',
    questionStyle: {
      background: 'rgba(255, 255, 255, 0.98)',
      border: '3px solid #00ACC1',
      borderRadius: '30px',
      padding: '25px'
    },
    numberBadgeStyle: 'circle',
    numberBadgeBackground: '#00ACC1',
    numberBadgeColor: '#FFFFFF',
    defaultFont: 'varela-round'
  },

  // 19. Diamond Grid Theme
  {
    name: '💎 Grille de Diamants',
    primary: '#C2185B',
    secondary: '#FCE4EC',
    pattern: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(194, 24, 91, 0.2) 10px, rgba(194, 24, 91, 0.2) 20px), repeating-linear-gradient(-45deg, transparent, transparent 10px, rgba(194, 24, 91, 0.2) 10px, rgba(194, 24, 91, 0.2) 20px)`,
    patternType: 'grid',
    type: 'professional',
    cardBackground: '#FCE4EC',
    cardBorder: '2px solid #C2185B',
    cardRadius: '0',
    cardShadow: '0 6px 20px rgba(194, 24, 91, 0.15)',
    questionStyle: {
      background: 'rgba(255, 255, 255, 0.98)',
      border: '2px solid #C2185B',
      borderRadius: '0',
      padding: '22px'
    },
    numberBadgeStyle: 'diamond',
    numberBadgeBackground: '#C2185B',
    numberBadgeColor: '#FFFFFF',
    defaultFont: 'cormorant-garamond'
  },

  // 20. Zigzag Chevron Theme
  {
    name: '⚡ Chevrons Zigzag',
    primary: '#FF5722',
    secondary: '#FBE9E7',
    pattern: `repeating-linear-gradient(45deg, #FF5722 0px, #FF5722 10px, transparent 10px, transparent 20px, rgba(255, 87, 34, 0.3) 20px, rgba(255, 87, 34, 0.3) 30px, transparent 30px, transparent 40px)`,
    patternType: 'diagonal',
    type: 'professional',
    cardBackground: '#FBE9E7',
    cardBorder: '3px solid #FF5722',
    cardRadius: '0',
    cardShadow: '8px 8px 0px rgba(255, 87, 34, 0.3)',
    questionStyle: {
      background: 'rgba(255, 255, 255, 0.98)',
      border: '3px solid #FF5722',
      borderRadius: '0',
      padding: '20px'
    },
    numberBadgeStyle: 'star',
    numberBadgeBackground: '#FF5722',
    numberBadgeColor: '#FFFFFF',
    defaultFont: 'fredericka-the-great'
  },

  // 21. Overlapping Circles Theme
  {
    name: '🔵 Cercles Superposés',
    primary: '#1976D2',
    secondary: '#E3F2FD',
    pattern: `radial-gradient(circle at 25% 25%, rgba(25, 118, 210, 0.2) 20%, transparent 20%), radial-gradient(circle at 75% 75%, rgba(25, 118, 210, 0.15) 20%, transparent 20%), radial-gradient(circle at 25% 75%, rgba(33, 150, 243, 0.1) 15%, transparent 15%), radial-gradient(circle at 75% 25%, rgba(33, 150, 243, 0.1) 15%, transparent 15%)`,
    patternType: 'dots',
    type: 'professional',
    cardBackground: '#E3F2FD',
    cardBorder: '2px solid #1976D2',
    cardRadius: '20px',
    cardShadow: '0 10px 25px rgba(25, 118, 210, 0.15)',
    questionStyle: {
      background: 'rgba(255, 255, 255, 0.98)',
      border: '2px solid #1976D2',
      borderRadius: '50px',
      padding: '24px'
    },
    numberBadgeStyle: 'circle',
    numberBadgeBackground: '#1976D2',
    numberBadgeColor: '#FFFFFF',
    defaultFont: 'rubik'
  },

  // 22. Isometric Cubes Theme
  {
    name: '🎲 Cubes Isométriques',
    primary: '#424242',
    secondary: '#F5F5F5',
    pattern: `repeating-linear-gradient(30deg, transparent 0px, transparent 20px, rgba(66, 66, 66, 0.2) 20px, rgba(66, 66, 66, 0.2) 40px), repeating-linear-gradient(-30deg, transparent 0px, transparent 20px, rgba(97, 97, 97, 0.2) 20px, rgba(97, 97, 97, 0.2) 40px)`,
    patternType: 'grid',
    type: 'professional',
    cardBackground: '#F5F5F5',
    cardBorder: '2px solid #424242',
    cardRadius: '0',
    cardShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    questionStyle: {
      background: 'rgba(255, 255, 255, 0.98)',
      border: '2px solid #424242',
      borderRadius: '0',
      padding: '22px'
    },
    numberBadgeStyle: 'square',
    numberBadgeBackground: '#424242',
    numberBadgeColor: '#FFFFFF',
    defaultFont: 'roboto'
  },

  // 23. Spiral Pattern Theme
  {
    name: '🌀 Spirale Hypnotique',
    primary: '#00838F',
    secondary: '#E0F7FA',
    pattern: `conic-gradient(from 0deg at 50% 50%, rgba(0, 131, 143, 0.3) 0deg, transparent 30deg, rgba(0, 131, 143, 0.3) 60deg, transparent 90deg, rgba(0, 131, 143, 0.3) 120deg, transparent 150deg, rgba(0, 131, 143, 0.3) 180deg, transparent 210deg, rgba(0, 131, 143, 0.3) 240deg, transparent 270deg, rgba(0, 131, 143, 0.3) 300deg, transparent 330deg, rgba(0, 131, 143, 0.3) 360deg)`,
    patternType: 'dots',
    type: 'professional',
    cardBackground: '#E0F7FA',
    cardBorder: '3px solid #00838F',
    cardRadius: '100%',
    cardShadow: '0 15px 30px rgba(0, 131, 143, 0.2)',
    questionStyle: {
      background: 'rgba(255, 255, 255, 0.98)',
      border: '2px solid #00838F',
      borderRadius: '20px',
      padding: '25px'
    },
    numberBadgeStyle: 'cloud',
    numberBadgeBackground: '#00838F',
    numberBadgeColor: '#FFFFFF',
    defaultFont: 'architects-daughter'
  },

  // 24. Tetris Blocks Theme
  {
    name: '🎮 Blocs Tetris',
    primary: '#4CAF50',
    secondary: '#F1F8E9',
    pattern: `repeating-linear-gradient(90deg, transparent 0px, transparent 30px, rgba(76, 175, 80, 0.3) 30px, rgba(76, 175, 80, 0.3) 60px, transparent 60px, transparent 90px, rgba(255, 152, 0, 0.3) 90px, rgba(255, 152, 0, 0.3) 120px)`,
    patternType: 'grid',
    type: 'professional',
    cardBackground: '#F1F8E9',
    cardBorder: '4px solid #4CAF50',
    cardRadius: '0',
    cardShadow: '0 0 0 2px #2E7D32, 6px 6px 0px #2E7D32',
    questionStyle: {
      background: 'rgba(255, 255, 255, 0.98)',
      border: '3px solid #4CAF50',
      borderRadius: '0',
      padding: '20px'
    },
    numberBadgeStyle: 'square',
    numberBadgeBackground: '#F44336',
    numberBadgeColor: '#FFFFFF',
    defaultFont: 'chewy'
  },

  // 25. Dots and Lines Grid Theme
  {
    name: '⚫ Points et Lignes',
    primary: '#673AB7',
    secondary: '#F3E5F5',
    pattern: `repeating-linear-gradient(0deg, rgba(103, 58, 183, 0.2) 0px, rgba(103, 58, 183, 0.2) 1px, transparent 1px, transparent 50px), repeating-linear-gradient(90deg, rgba(103, 58, 183, 0.2) 0px, rgba(103, 58, 183, 0.2) 1px, transparent 1px, transparent 50px)`,
    patternType: 'grid',
    type: 'professional',
    cardBackground: '#F3E5F5',
    cardBorder: '2px solid #673AB7',
    cardRadius: '8px',
    cardShadow: '0 8px 24px rgba(103, 58, 183, 0.15)',
    questionStyle: {
      background: 'rgba(255, 255, 255, 0.98)',
      border: '2px dashed #673AB7',
      borderRadius: '8px',
      padding: '24px'
    },
    numberBadgeStyle: 'hexagon',
    numberBadgeBackground: '#673AB7',
    numberBadgeColor: '#FFFFFF',
    defaultFont: 'eb-garamond'
  }
];

// Export all themes
export const originalGitHubThemes = professionalThemes;

// Empty placeholder for fun illustrations (not used with professional themes)
export const FunIllustrations: Record<string, string> = {};