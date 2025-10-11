// Image-Integrated Themes - Themes with built-in decorative images
// These themes are designed with specific image placements as part of their core design

export interface ImageIntegratedTheme {
  name: string;
  type: 'image-integrated';

  // Background and pattern
  background: string;
  pattern?: string;

  // Card styles
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

  // Built-in decorative images
  decorativeImages: {
    id: string;
    url: string; // SVG data URI or image URL
    position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center-left' | 'center-right' | 'floating';
    size: string;
    opacity?: number;
    animation?: string;
    zIndex?: number;
  }[];
}

// SVG helper functions for creating inline decorative images
const createSvgDataUri = (svgContent: string): string => {
  return `data:image/svg+xml,${encodeURIComponent(svgContent)}`;
};

// Fun animated balloon SVG
const balloonSvg = createSvgDataUri(`
<svg viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="balloon1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#ff6b6b;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#ff8787;stop-opacity:1" />
    </linearGradient>
  </defs>
  <ellipse cx="50" cy="45" rx="35" ry="42" fill="url(#balloon1)" />
  <path d="M50 87 L45 95 L50 93 L55 95 Z" fill="#ff6b6b" />
  <path d="M50 95 Q50 105 48 115" stroke="#333" stroke-width="1" fill="none" />
</svg>
`);

// Cute rocket ship SVG
const rocketSvg = createSvgDataUri(`
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="rocket1" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#667eea;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#764ba2;stop-opacity:1" />
    </linearGradient>
  </defs>
  <path d="M50 10 C50 10, 35 30, 35 50 L35 70 L65 70 L65 50 C65 30, 50 10, 50 10 Z" fill="url(#rocket1)" />
  <circle cx="50" cy="40" r="8" fill="#e0e7ff" stroke="#667eea" stroke-width="2" />
  <path d="M35 60 L25 75 L35 70 Z" fill="#ff6b6b" />
  <path d="M65 60 L75 75 L65 70 Z" fill="#ff6b6b" />
  <path d="M40 70 L40 80 L45 75 L50 80 L55 75 L60 80 L60 70" fill="#fbbf24" opacity="0.8" />
</svg>
`);

// Friendly sun SVG
const sunSvg = createSvgDataUri(`
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="sun1">
      <stop offset="0%" style="stop-color:#fde047;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#facc15;stop-opacity:1" />
    </radialGradient>
  </defs>
  <circle cx="50" cy="50" r="20" fill="url(#sun1)" />
  <g stroke="#fbbf24" stroke-width="3" stroke-linecap="round">
    <line x1="50" y1="10" x2="50" y2="20" />
    <line x1="50" y1="80" x2="50" y2="90" />
    <line x1="10" y1="50" x2="20" y2="50" />
    <line x1="80" y1="50" x2="90" y2="50" />
    <line x1="25" y1="25" x2="32" y2="32" />
    <line x1="68" y1="68" x2="75" y2="75" />
    <line x1="25" y1="75" x2="32" y2="68" />
    <line x1="68" y1="32" x2="75" y2="25" />
  </g>
  <circle cx="42" cy="45" r="2" fill="#92400e" />
  <circle cx="58" cy="45" r="2" fill="#92400e" />
  <path d="M40 55 Q50 62 60 55" stroke="#92400e" stroke-width="2" fill="none" stroke-linecap="round" />
</svg>
`);

// Rainbow cloud SVG
const rainbowCloudSvg = createSvgDataUri(`
<svg viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="rainbow" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#ef4444" />
      <stop offset="16%" style="stop-color:#f97316" />
      <stop offset="33%" style="stop-color:#eab308" />
      <stop offset="50%" style="stop-color:#22c55e" />
      <stop offset="66%" style="stop-color:#3b82f6" />
      <stop offset="83%" style="stop-color:#8b5cf6" />
      <stop offset="100%" style="stop-color:#ec4899" />
    </linearGradient>
  </defs>
  <path d="M20 60 Q20 30 50 30 T80 60" stroke="url(#rainbow)" stroke-width="8" fill="none" opacity="0.8" />
  <ellipse cx="35" cy="55" rx="20" ry="15" fill="white" opacity="0.9" />
  <ellipse cx="65" cy="55" rx="25" ry="18" fill="white" opacity="0.9" />
  <ellipse cx="50" cy="50" rx="18" ry="13" fill="white" />
</svg>
`);

// Cute star pattern SVG
const starPatternSvg = createSvgDataUri(`
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <g fill="#fbbf24" opacity="0.8">
    <path d="M20 20 L22 26 L28 26 L23 30 L25 36 L20 32 L15 36 L17 30 L12 26 L18 26 Z" />
    <path d="M70 15 L71.5 19 L76 19 L72.5 22 L74 26 L70 23 L66 26 L67.5 22 L64 19 L68.5 19 Z" />
    <path d="M50 60 L52 66 L58 66 L53 70 L55 76 L50 72 L45 76 L47 70 L42 66 L48 66 Z" />
  </g>
  <g fill="#ec4899" opacity="0.6">
    <path d="M80 70 L81 73 L84 73 L81.5 75 L82.5 78 L80 76 L77.5 78 L78.5 75 L76 73 L79 73 Z" />
    <path d="M15 65 L16 68 L19 68 L16.5 70 L17.5 73 L15 71 L12.5 73 L13.5 70 L11 68 L14 68 Z" />
  </g>
</svg>
`);

// Ocean wave SVG
const oceanWaveSvg = createSvgDataUri(`
<svg viewBox="0 0 150 60" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="ocean" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#06b6d4;stop-opacity:0.8" />
      <stop offset="100%" style="stop-color:#0891b2;stop-opacity:0.6" />
    </linearGradient>
  </defs>
  <path d="M0 30 Q25 20 50 30 T100 30 T150 30 L150 60 L0 60 Z" fill="url(#ocean)" />
  <path d="M0 35 Q25 25 50 35 T100 35 T150 35 L150 60 L0 60 Z" fill="#0284c7" opacity="0.5" />
  <circle cx="120" cy="20" r="3" fill="white" opacity="0.8" />
  <circle cx="100" cy="15" r="2" fill="white" opacity="0.6" />
  <circle cx="130" cy="25" r="2" fill="white" opacity="0.7" />
</svg>
`);

// Cute butterfly SVG
const butterflySvg = createSvgDataUri(`
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="wing1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#f472b6;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#ec4899;stop-opacity:1" />
    </linearGradient>
    <linearGradient id="wing2" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#a78bfa;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#8b5cf6;stop-opacity:1" />
    </linearGradient>
  </defs>
  <ellipse cx="50" cy="50" rx="4" ry="15" fill="#4b5563" />
  <ellipse cx="40" cy="40" rx="15" ry="20" fill="url(#wing1)" transform="rotate(-30 40 40)" />
  <ellipse cx="60" cy="40" rx="15" ry="20" fill="url(#wing2)" transform="rotate(30 60 40)" />
  <ellipse cx="40" cy="60" rx="12" ry="18" fill="url(#wing2)" transform="rotate(30 40 60)" />
  <ellipse cx="60" cy="60" rx="12" ry="18" fill="url(#wing1)" transform="rotate(-30 60 60)" />
  <circle cx="48" cy="45" r="1" fill="white" />
  <circle cx="52" cy="45" r="1" fill="white" />
</svg>
`);

// Dinosaur SVG
const dinosaurSvg = createSvgDataUri(`
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="dino" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#86efac;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#22c55e;stop-opacity:1" />
    </linearGradient>
  </defs>
  <ellipse cx="50" cy="60" rx="25" ry="20" fill="url(#dino)" />
  <ellipse cx="50" cy="35" rx="18" ry="15" fill="url(#dino)" />
  <circle cx="45" cy="33" r="3" fill="white" />
  <circle cx="55" cy="33" r="3" fill="white" />
  <circle cx="44" cy="33" r="2" fill="#1e293b" />
  <circle cx="54" cy="33" r="2" fill="#1e293b" />
  <path d="M35 25 L35 20 L38 22 Z" fill="#22c55e" />
  <path d="M45 23 L45 18 L48 20 Z" fill="#22c55e" />
  <path d="M55 23 L55 18 L58 20 Z" fill="#22c55e" />
  <ellipse cx="30" cy="70" rx="8" ry="12" fill="#16a34a" />
  <ellipse cx="70" cy="70" rx="8" ry="12" fill="#16a34a" />
  <path d="M40 42 Q50 46 60 42" stroke="#16a34a" stroke-width="2" fill="none" stroke-linecap="round" />
</svg>
`);

export const imageIntegratedThemes: ImageIntegratedTheme[] = [
  {
    name: '🎈 Fête des Ballons',
    type: 'image-integrated',
    background: 'linear-gradient(135deg, #fce7f3 0%, #fbcfe8 50%, #f9a8d4 100%)',
    cardBorder: '3px solid #ec4899',
    cardRadius: '25px',
    cardShadow: '0 10px 30px rgba(236, 72, 153, 0.2)',
    cardPadding: '20px',
    questionStyle: {
      background: 'rgba(255, 255, 255, 0.95)',
      border: '2px dashed #f472b6',
      borderRadius: '20px',
      padding: '25px',
      backdropFilter: 'blur(10px)'
    },
    numberBadgeStyle: 'cloud',
    numberBadgeBackground: 'linear-gradient(135deg, #f472b6 0%, #ec4899 100%)',
    numberBadgeColor: '#ffffff',
    decorativeImages: [
      {
        id: 'balloon-1',
        url: balloonSvg,
        position: 'bottom-right',
        size: '80px',
        opacity: 0.9,
        animation: 'float',
        zIndex: 1
      },
      {
        id: 'balloon-2',
        url: balloonSvg,
        position: 'top-left',
        size: '60px',
        opacity: 0.7,
        animation: 'float-delayed',
        zIndex: 1
      },
      {
        id: 'stars',
        url: starPatternSvg,
        position: 'center-left',
        size: '100px',
        opacity: 0.3,
        zIndex: 0
      }
    ]
  },

  {
    name: '🚀 Aventure Cosmique',
    type: 'image-integrated',
    background: 'linear-gradient(180deg, #1e1b4b 0%, #312e81 50%, #4c1d95 100%)',
    cardBorder: '3px solid #a78bfa',
    cardRadius: '20px',
    cardShadow: '0 0 40px rgba(167, 139, 250, 0.4)',
    cardPadding: '20px',
    questionStyle: {
      background: 'rgba(255, 255, 255, 0.92)',
      border: '3px solid #8b5cf6',
      borderRadius: '15px',
      padding: '25px'
    },
    numberBadgeStyle: 'star',
    numberBadgeBackground: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
    numberBadgeColor: '#1e1b4b',
    decorativeImages: [
      {
        id: 'rocket',
        url: rocketSvg,
        position: 'center-right',
        size: '100px',
        opacity: 0.85,
        animation: 'hover',
        zIndex: 2
      },
      {
        id: 'stars-bg',
        url: starPatternSvg,
        position: 'top-right',
        size: '120px',
        opacity: 0.4,
        zIndex: 0
      }
    ]
  },

  {
    name: '☀️ Journée Ensoleillée',
    type: 'image-integrated',
    background: 'linear-gradient(135deg, #fef3c7 0%, #fde047 50%, #facc15 100%)',
    cardBorder: '4px solid #f59e0b',
    cardRadius: '30px',
    cardShadow: '0 15px 35px rgba(245, 158, 11, 0.25)',
    cardPadding: '20px',
    questionStyle: {
      background: 'rgba(255, 255, 255, 0.9)',
      border: '3px solid #fbbf24',
      borderRadius: '25px',
      padding: '25px'
    },
    numberBadgeStyle: 'circle',
    numberBadgeBackground: 'linear-gradient(135deg, #fb923c 0%, #f97316 100%)',
    numberBadgeColor: '#ffffff',
    decorativeImages: [
      {
        id: 'sun',
        url: sunSvg,
        position: 'top-right',
        size: '90px',
        opacity: 0.8,
        animation: 'rotate-slow',
        zIndex: 1
      },
      {
        id: 'rainbow-cloud',
        url: rainbowCloudSvg,
        position: 'bottom-left',
        size: '120px',
        opacity: 0.7,
        zIndex: 1
      }
    ]
  },

  {
    name: '🌊 Plage Paradisiaque',
    type: 'image-integrated',
    background: 'linear-gradient(180deg, #e0f2fe 0%, #bae6fd 40%, #7dd3fc 100%)',
    cardBorder: '3px solid #0ea5e9',
    cardRadius: '20px',
    cardShadow: '0 20px 40px rgba(14, 165, 233, 0.2)',
    cardPadding: '20px',
    questionStyle: {
      background: 'rgba(255, 255, 255, 0.93)',
      border: '3px solid #38bdf8',
      borderRadius: '20px',
      padding: '25px',
      backdropFilter: 'blur(5px)'
    },
    numberBadgeStyle: 'circle',
    numberBadgeBackground: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
    numberBadgeColor: '#ffffff',
    decorativeImages: [
      {
        id: 'wave',
        url: oceanWaveSvg,
        position: 'bottom-left',
        size: '150px',
        opacity: 0.8,
        zIndex: 1
      },
      {
        id: 'sun-beach',
        url: sunSvg,
        position: 'top-left',
        size: '70px',
        opacity: 0.6,
        zIndex: 1
      }
    ]
  },

  {
    name: '🦕 Vallée des Dinosaures',
    type: 'image-integrated',
    background: 'linear-gradient(135deg, #d9f99d 0%, #a3e635 50%, #65a30d 100%)',
    cardBorder: '4px solid #16a34a',
    cardRadius: '25px',
    cardShadow: '0 15px 35px rgba(22, 163, 74, 0.3)',
    cardPadding: '20px',
    questionStyle: {
      background: 'rgba(255, 255, 255, 0.92)',
      border: '3px solid #22c55e',
      borderRadius: '20px',
      padding: '25px'
    },
    numberBadgeStyle: 'hexagon',
    numberBadgeBackground: 'linear-gradient(135deg, #84cc16 0%, #65a30d 100%)',
    numberBadgeColor: '#ffffff',
    decorativeImages: [
      {
        id: 'dino',
        url: dinosaurSvg,
        position: 'bottom-right',
        size: '100px',
        opacity: 0.9,
        animation: 'bounce-slow',
        zIndex: 2
      },
      {
        id: 'butterfly',
        url: butterflySvg,
        position: 'top-left',
        size: '60px',
        opacity: 0.7,
        animation: 'float',
        zIndex: 1
      }
    ]
  }
];

// Export for use in CardRenderer
export default imageIntegratedThemes;