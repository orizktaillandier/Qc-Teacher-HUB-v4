// ALL themes from the original GitHub repository
// These are the exact themes that teachers loved from the original version

export interface OriginalGitHubTheme {
  name: string;
  primary?: string;
  secondary?: string;
  background?: string;
  pattern?: string;
  patternType?: 'diagonal' | 'dots' | 'grid' | 'none' | 'vertical' | 'horizontal';
  gradient?: string;
  illustration?: 'watermelon' | 'pineapple' | 'sunglasses' | 'pencil' | 'book' | 'star' | 'maple';
  type?: 'professional' | 'fun';
  // For compatibility with our theme system
  cardBackground?: string;
  cardBorder?: string;
  cardRadius?: string;
  cardShadow?: string;
  questionStyle?: {
    background: string;
    border: string;
    borderRadius: string;
    padding: string;
  };
  numberBadgeStyle?: 'circle';
  numberBadgeBackground?: string;
  numberBadgeColor?: string;
}

// Professional themes from renderCardProfessional
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
    numberBadgeColor: '#ffffff'
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
    numberBadgeColor: '#ffffff'
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
    numberBadgeColor: '#ffffff'
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
    numberBadgeColor: '#ffffff'
  }
];

// Fun themes with pastel gradients
export const pastelGradientThemes: OriginalGitHubTheme[] = [
  {
    name: '🍑 Peach Sunset',
    gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
    type: 'fun'
  },
  {
    name: '🌊 Ocean Breeze',
    gradient: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)',
    type: 'fun'
  },
  {
    name: '🌿 Fresh Mint',
    gradient: 'linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%)',
    type: 'fun'
  },
  {
    name: '☁️ Cloud Nine',
    gradient: 'linear-gradient(135deg, #cfd9df 0%, #e2ebf0 100%)',
    type: 'fun'
  },
  {
    name: '🌈 Cosmic Purple',
    gradient: 'linear-gradient(135deg, #fccb90 0%, #d57eeb 100%)',
    type: 'fun'
  },
  {
    name: '🌅 Golden Hour',
    gradient: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)',
    type: 'fun'
  },
  {
    name: '🦄 Unicorn Dream',
    gradient: 'linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)',
    type: 'fun'
  },
  {
    name: '🌸 Sakura Bloom',
    gradient: 'linear-gradient(135deg, #fdcbf1 0%, #e6dee9 100%)',
    type: 'fun'
  }
];

// Fun themes with illustrations
export const illustrationThemes: OriginalGitHubTheme[] = [
  {
    name: '🍉 Watermelon Fun',
    gradient: 'linear-gradient(135deg, #ff6b6b 0%, #ffc0cb 100%)',
    illustration: 'watermelon',
    type: 'fun'
  },
  {
    name: '🍍 Tropical Pineapple',
    gradient: 'linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)',
    illustration: 'pineapple',
    type: 'fun'
  },
  {
    name: '😎 Cool Sunglasses',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    illustration: 'sunglasses',
    type: 'fun'
  },
  {
    name: '✏️ School Pencil',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    illustration: 'pencil',
    type: 'fun'
  },
  {
    name: '📚 Book Smart',
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    illustration: 'book',
    type: 'fun'
  },
  {
    name: '⭐ Star Student',
    gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    illustration: 'star',
    type: 'fun'
  },
  {
    name: '🍁 Canadian Maple',
    gradient: 'linear-gradient(135deg, #ff6b6b 0%, #ff8e53 100%)',
    illustration: 'maple',
    type: 'fun'
  }
];

// Export all themes combined - 19 themes total from GitHub
export const originalGitHubThemes: OriginalGitHubTheme[] = [
  ...professionalThemes,
  ...pastelGradientThemes,
  ...illustrationThemes
];

// Fun illustrations SVG components
export const FunIllustrations = {
  watermelon: `<svg viewBox="0 0 100 100" style="position: absolute; right: 20px; top: 20px; width: 60px; height: 60px; opacity: 0.3;">
    <path d="M50 10 Q20 30 20 60 Q50 90 80 60 Q80 30 50 10Z" fill="#ff6b6b"/>
    <path d="M50 20 Q30 35 30 55 Q50 75 70 55 Q70 35 50 20Z" fill="#ff8787"/>
    <path d="M50 30 Q35 40 35 50 Q50 65 65 50 Q65 40 50 30Z" fill="#4ecdc4"/>
    <circle cx="45" cy="45" r="2" fill="black"/>
    <circle cx="55" cy="45" r="2" fill="black"/>
    <circle cx="50" cy="52" r="2" fill="black"/>
  </svg>`,

  pineapple: `<svg viewBox="0 0 100 100" style="position: absolute; right: 20px; top: 20px; width: 60px; height: 60px; opacity: 0.3;">
    <ellipse cx="50" cy="60" rx="25" ry="30" fill="#ffd700"/>
    <path d="M50 20 L45 5 L50 15 L55 5 L50 20" stroke="#228b22" stroke-width="2" fill="none"/>
    <path d="M40 20 L35 5 L40 15" stroke="#228b22" stroke-width="2" fill="none"/>
    <path d="M60 20 L65 5 L60 15" stroke="#228b22" stroke-width="2" fill="none"/>
    <pattern id="pineapple-pattern" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
      <path d="M0 5 L5 0 L10 5 L5 10Z" fill="#ffb347"/>
    </pattern>
    <ellipse cx="50" cy="60" rx="25" ry="30" fill="url(#pineapple-pattern)" opacity="0.5"/>
  </svg>`,

  sunglasses: `<svg viewBox="0 0 100 100" style="position: absolute; right: 20px; top: 20px; width: 60px; height: 60px; opacity: 0.3;">
    <rect x="15" y="40" width="30" height="20" rx="10" fill="black"/>
    <rect x="55" y="40" width="30" height="20" rx="10" fill="black"/>
    <path d="M45 50 L55 50" stroke="black" stroke-width="3"/>
  </svg>`,

  pencil: `<svg viewBox="0 0 100 100" style="position: absolute; right: 20px; top: 20px; width: 60px; height: 60px; opacity: 0.3;">
    <rect x="40" y="20" width="20" height="60" fill="#ffd700"/>
    <polygon points="40,80 50,90 60,80" fill="#ffa500"/>
    <polygon points="45,85 50,90 55,85" fill="#333"/>
    <rect x="40" y="20" width="20" height="10" fill="#ff69b4"/>
    <rect x="40" y="20" width="20" height="60" fill="url(#pencil-shade)" opacity="0.3"/>
    <defs>
      <linearGradient id="pencil-shade" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style="stop-color:black;stop-opacity:0.3" />
        <stop offset="100%" style="stop-color:black;stop-opacity:0" />
      </linearGradient>
    </defs>
  </svg>`,

  book: `<svg viewBox="0 0 100 100" style="position: absolute; right: 20px; top: 20px; width: 60px; height: 60px; opacity: 0.3;">
    <rect x="30" y="25" width="40" height="50" fill="#4169e1"/>
    <rect x="35" y="30" width="30" height="2" fill="white"/>
    <rect x="35" y="35" width="30" height="2" fill="white"/>
    <rect x="35" y="40" width="20" height="2" fill="white"/>
  </svg>`,

  star: `<svg viewBox="0 0 100 100" style="position: absolute; right: 20px; top: 20px; width: 60px; height: 60px; opacity: 0.3;">
    <path d="M50,15 L60,40 L85,40 L65,55 L75,80 L50,65 L25,80 L35,55 L15,40 L40,40Z"
          fill="#ffd700" stroke="#daa520" stroke-width="2"/>
  </svg>`,

  maple: `<svg viewBox="0 0 100 100" style="position: absolute; right: 20px; top: 20px; width: 60px; height: 60px; opacity: 0.3;">
    <path d="M50,15 L45,25 L35,20 L40,30 L30,30 L40,35 L35,45 L45,40 L45,50 L50,45 L55,50 L55,40 L65,45 L60,35 L70,30 L60,30 L65,20 L55,25Z"
          fill="#dc143c" stroke="#8b0000" stroke-width="2"/>
  </svg>`
};

// Helper function to get theme by index
export function getOriginalThemeByIndex(index: number): OriginalGitHubTheme {
  return originalGitHubThemes[index % originalGitHubThemes.length];
}