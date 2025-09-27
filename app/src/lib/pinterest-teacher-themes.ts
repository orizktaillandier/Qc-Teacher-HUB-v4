// Pinterest-style teacher themes - Currently trending on Teachers Pay Teachers & Pinterest
// These are the aesthetics teachers are actively buying and using in 2024-2025

export interface PinterestTeacherTheme {
  name: string;
  cardBackground: string;
  cardBorder: string;
  cardRadius: string;
  cardShadow: string;
  decorativeElement?: string;
  questionStyle?: {
    background: string;
    border: string;
    borderRadius: string;
    padding: string;
    color?: string;
  };
}

export const pinterestTeacherThemes: PinterestTeacherTheme[] = [
  {
    name: '🌈 Boho Rainbow Neutre',
    cardBackground: `
      linear-gradient(180deg,
        #fdf6f0 0%,
        #fdeee5 20%,
        #f8e4d9 40%,
        #e8d5c4 60%,
        #d3c7bd 80%,
        #c9beb5 100%
      )
    `,
    cardBorder: 'none',
    cardRadius: '25px',
    cardShadow: '0 10px 30px rgba(0,0,0,0.08), 0 0 0 1px rgba(255,255,255,0.5) inset',
    questionStyle: {
      background: 'rgba(255, 255, 255, 0.95)',
      border: '2px solid #d3c7bd',
      borderRadius: '20px',
      padding: '25px',
      color: '#5a524c'
    }
  },
  {
    name: '🌿 Eucalyptus Zen',
    cardBackground: `
      linear-gradient(135deg, #f7fdf9 0%, #e8f5ed 100%),
      url("data:image/svg+xml,%3Csvg width='40' height='40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 10 Q25 15 20 20 Q15 15 20 10' fill='%2395b99c' opacity='0.05'/%3E%3C/svg%3E")
    `,
    cardBorder: '1px solid #d4e4d8',
    cardRadius: '20px',
    cardShadow: '0 8px 32px rgba(149, 185, 156, 0.15)',
    decorativeElement: '🌿',
    questionStyle: {
      background: 'linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(247,253,249,0.98) 100%)',
      border: 'none',
      borderRadius: '15px',
      padding: '24px',
      color: '#4a6051'
    }
  },
  {
    name: '🏚️ Farmhouse Chic',
    cardBackground: `
      linear-gradient(180deg, #faf9f7 0%, #f5f1eb 100%),
      repeating-linear-gradient(
        0deg,
        transparent,
        transparent 20px,
        rgba(0,0,0,0.02) 20px,
        rgba(0,0,0,0.02) 21px
      )
    `,
    cardBorder: '3px solid #e8e2d9',
    cardRadius: '10px',
    cardShadow: '0 6px 20px rgba(0,0,0,0.06)',
    questionStyle: {
      background: 'white',
      border: '2px dashed #c4b5a0',
      borderRadius: '8px',
      padding: '22px',
      color: '#3e3832'
    }
  },
  {
    name: '✨ Retro Groovy',
    cardBackground: `
      radial-gradient(ellipse at top left, #ffdfba 0%, transparent 50%),
      radial-gradient(ellipse at bottom right, #ffb3ba 0%, transparent 50%),
      linear-gradient(135deg, #fff5eb 0%, #ffe8e3 100%)
    `,
    cardBorder: '2px solid #ff9a8b',
    cardRadius: '30px 5px 30px 5px',
    cardShadow: '0 12px 24px rgba(255, 154, 139, 0.2)',
    decorativeElement: '✨',
    questionStyle: {
      background: 'rgba(255, 255, 255, 0.95)',
      border: '3px solid #ffb3ba',
      borderRadius: '25px 5px',
      padding: '24px',
      color: '#d4665a'
    }
  },
  {
    name: '🤍 Minimaliste Moderne',
    cardBackground: 'linear-gradient(135deg, #fdfcfb 0%, #f5f4f3 100%)',
    cardBorder: 'none',
    cardRadius: '16px',
    cardShadow: '0 2px 8px rgba(0,0,0,0.04), 0 8px 16px rgba(0,0,0,0.04)',
    questionStyle: {
      background: 'white',
      border: '1px solid #e8e6e3',
      borderRadius: '12px',
      padding: '24px',
      color: '#2c2826'
    }
  },
  {
    name: '🌸 Rose Millénial',
    cardBackground: `
      linear-gradient(135deg, #ffeef8 0%, #ffe0f0 50%, #ffd1e8 100%)
    `,
    cardBorder: '1px solid rgba(255, 192, 232, 0.5)',
    cardRadius: '24px',
    cardShadow: '0 10px 40px rgba(255, 192, 232, 0.3)',
    decorativeElement: '🌸',
    questionStyle: {
      background: 'rgba(255, 255, 255, 0.98)',
      border: 'none',
      borderRadius: '20px',
      padding: '24px',
      color: '#8e5a6f'
    }
  },
  {
    name: '🍑 Pêche & Crème',
    cardBackground: `
      linear-gradient(135deg, #fff5f1 0%, #ffeae0 50%, #ffd9c9 100%)
    `,
    cardBorder: '2px solid #ffc8b4',
    cardRadius: '18px',
    cardShadow: '0 8px 24px rgba(255, 200, 180, 0.25)',
    questionStyle: {
      background: 'rgba(255, 255, 255, 0.97)',
      border: '1px solid #ffd9c9',
      borderRadius: '14px',
      padding: '22px',
      color: '#8b6356'
    }
  },
  {
    name: '🌙 Céleste Doux',
    cardBackground: `
      linear-gradient(180deg, #e6f2ff 0%, #d9e9ff 50%, #ccdeff 100%)
    `,
    cardBorder: '1px solid #b3d1ff',
    cardRadius: '22px',
    cardShadow: '0 12px 28px rgba(179, 209, 255, 0.2)',
    decorativeElement: '⭐',
    questionStyle: {
      background: 'rgba(255, 255, 255, 0.98)',
      border: '2px solid #d9e9ff',
      borderRadius: '18px',
      padding: '24px',
      color: '#4a6b8a'
    }
  },
  {
    name: '🍃 Sauge Désertique',
    cardBackground: `
      linear-gradient(135deg, #e8ebe4 0%, #d9dfd2 50%, #c7d1bb 100%)
    `,
    cardBorder: '2px solid #b5c2a3',
    cardRadius: '15px',
    cardShadow: '0 6px 20px rgba(181, 194, 163, 0.3)',
    questionStyle: {
      background: 'rgba(255, 255, 255, 0.95)',
      border: '1px solid #c7d1bb',
      borderRadius: '12px',
      padding: '22px',
      color: '#546548'
    }
  },
  {
    name: '☕ Café Latte',
    cardBackground: `
      linear-gradient(135deg, #f4ebe4 0%, #e8d5c7 50%, #d4baa3 100%)
    `,
    cardBorder: '2px solid #c4a584',
    cardRadius: '20px',
    cardShadow: '0 8px 25px rgba(196, 165, 132, 0.2)',
    decorativeElement: '☕',
    questionStyle: {
      background: 'rgba(255, 255, 255, 0.96)',
      border: '2px solid #d4baa3',
      borderRadius: '16px',
      padding: '24px',
      color: '#6b4e3d'
    }
  },
  {
    name: '🌾 Blé Doré',
    cardBackground: `
      linear-gradient(180deg, #faf7f0 0%, #f5ead4 50%, #e8d4a8 100%)
    `,
    cardBorder: '2px solid #d4b896',
    cardRadius: '18px',
    cardShadow: '0 10px 30px rgba(212, 184, 150, 0.2)',
    questionStyle: {
      background: 'rgba(255, 255, 255, 0.97)',
      border: '1px solid #e8d4a8',
      borderRadius: '14px',
      padding: '23px',
      color: '#7a6a4f'
    }
  },
  {
    name: '🦋 Lavande Rêveuse',
    cardBackground: `
      linear-gradient(135deg, #f3ebff 0%, #e6d9ff 50%, #d9c6ff 100%)
    `,
    cardBorder: '1px solid #c8b3e6',
    cardRadius: '24px',
    cardShadow: '0 12px 32px rgba(200, 179, 230, 0.25)',
    decorativeElement: '🦋',
    questionStyle: {
      background: 'rgba(255, 255, 255, 0.98)',
      border: '2px solid #e6d9ff',
      borderRadius: '20px',
      padding: '24px',
      color: '#6b5a7d'
    }
  }
];

// Helper function to get theme by index
export function getPinterestThemeByIndex(index: number): PinterestTeacherTheme {
  return pinterestTeacherThemes[index % pinterestTeacherThemes.length];
}