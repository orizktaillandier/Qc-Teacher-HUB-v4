// Static SVG strings for Kawaii characters that can be used in PDF generation
export const kawaiiSVGs: Record<string, string> = {
  ghost: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" width="60" height="60">
    <path fill="#E0E0E0" d="M120 60c-33.137 0-60 26.863-60 60v60c0 6.627 5.373 12 12 12h12c6.627 0 12-5.373 12-12v-12c0-6.627 5.373-12 12-12s12 5.373 12 12v12c0 6.627 5.373 12 12 12h12c6.627 0 12-5.373 12-12v-12c0-6.627 5.373-12 12-12s12 5.373 12 12v12c0 6.627 5.373 12 12 12h12c6.627 0 12-5.373 12-12v-60c0-33.137-26.863-60-60-60z"/>
    <circle cx="90" cy="100" r="8" fill="#000"/>
    <circle cx="150" cy="100" r="8" fill="#000"/>
    <path fill="#000" d="M100 130c0-11.046 8.954-20 20-20s20 8.954 20 20" opacity="0.2"/>
  </svg>`,

  cat: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" width="60" height="60">
    <ellipse cx="120" cy="130" rx="50" ry="45" fill="#FFA500"/>
    <path fill="#FFA500" d="M70 85 L70 105 L90 95 Z"/>
    <path fill="#FFA500" d="M170 85 L170 105 L150 95 Z"/>
    <circle cx="100" cy="125" r="6" fill="#000"/>
    <circle cx="140" cy="125" r="6" fill="#000"/>
    <path fill="#FF69B4" d="M110 140 Q120 150 130 140" stroke="#000" stroke-width="2" fill="none"/>
  </svg>`,

  icecream: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" width="60" height="60">
    <path fill="#F8BBD0" d="M120 60c-22.091 0-40 17.909-40 40s17.909 40 40 40 40-17.909 40-40-17.909-40-40-40z"/>
    <path fill="#8D6E63" d="M100 140 L120 200 L140 140 Z"/>
    <circle cx="100" cy="95" r="5" fill="#000"/>
    <circle cx="140" cy="95" r="5" fill="#000"/>
    <path fill="#000" d="M105 110c0-8.284 6.716-15 15-15s15 6.716 15 15" opacity="0.2"/>
  </svg>`,

  planet: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" width="60" height="60">
    <circle cx="120" cy="120" r="50" fill="#9C27B0"/>
    <ellipse cx="120" cy="120" rx="70" ry="15" fill="none" stroke="#E91E63" stroke-width="4" opacity="0.6"/>
    <circle cx="100" cy="110" r="6" fill="#000"/>
    <circle cx="140" cy="110" r="6" fill="#000"/>
    <path fill="#000" d="M105 130c0-8.284 6.716-15 15-15s15 6.716 15 15" opacity="0.2"/>
  </svg>`,

  backpack: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" width="60" height="60">
    <rect x="80" y="80" width="80" height="100" rx="10" fill="#4CAF50"/>
    <rect x="95" y="70" width="50" height="20" rx="5" fill="#4CAF50"/>
    <circle cx="100" cy="120" r="6" fill="#000"/>
    <circle cx="140" cy="120" r="6" fill="#000"/>
    <path fill="#000" d="M105 140c0-8.284 6.716-15 15-15s15 6.716 15 15" opacity="0.2"/>
  </svg>`,

  chocolate: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" width="60" height="60">
    <rect x="80" y="80" width="80" height="80" rx="5" fill="#8D6E63"/>
    <line x1="100" y1="80" x2="100" y2="160" stroke="#6D4C41" stroke-width="2"/>
    <line x1="120" y1="80" x2="120" y2="160" stroke="#6D4C41" stroke-width="2"/>
    <line x1="140" y1="80" x2="140" y2="160" stroke="#6D4C41" stroke-width="2"/>
    <line x1="80" y1="100" x2="160" y2="100" stroke="#6D4C41" stroke-width="2"/>
    <line x1="80" y1="120" x2="160" y2="120" stroke="#6D4C41" stroke-width="2"/>
    <line x1="80" y1="140" x2="160" y2="140" stroke="#6D4C41" stroke-width="2"/>
    <circle cx="95" cy="110" r="4" fill="#000"/>
    <circle cx="125" cy="110" r="4" fill="#000"/>
    <path fill="#000" d="M100 125c0-5.523 4.477-10 10-10s10 4.477 10 10" opacity="0.2"/>
  </svg>`,

  mug: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" width="60" height="60">
    <path fill="#FF5722" d="M80 90h60v70c0 10-10 20-30 20s-30-10-30-20V90z"/>
    <path fill="#FF5722" d="M140 110h20c10 0 20 10 20 20s-10 20-20 20h-20"/>
    <circle cx="95" cy="120" r="6" fill="#000"/>
    <circle cx="125" cy="120" r="6" fill="#000"/>
    <path fill="#000" d="M100 140c0-8.284 6.716-15 15-15s15 6.716 15 15" opacity="0.2"/>
  </svg>`,

  // Default fallback
  default: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" width="60" height="60">
    <circle cx="120" cy="120" r="50" fill="#2196F3"/>
    <circle cx="100" cy="110" r="6" fill="#000"/>
    <circle cx="140" cy="110" r="6" fill="#000"/>
    <path fill="#000" d="M105 130c0-8.284 6.716-15 15-15s15 6.716 15 15" opacity="0.2"/>
  </svg>`
};

export function getKawaiiSVG(character: string): string {
  return kawaiiSVGs[character] || kawaiiSVGs.default;
}