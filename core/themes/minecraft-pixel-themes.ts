// Minecraft and pixel art themes with actual graphics
// These use CSS-based pixel art and SVG patterns for real visual appeal

export interface MinecraftPixelTheme {
  name: string;
  cardBackground: string;
  cardBorder: string;
  cardRadius: string;
  cardShadow: string;
  pixelArt?: string; // CSS pixel art elements
  backgroundPattern?: string; // SVG pattern for backgrounds
  questionStyle?: {
    background: string;
    border: string;
    borderRadius: string;
    padding: string;
    color?: string;
    fontFamily?: string;
  };
}

// Helper function to create pixel art using box-shadow
const createPixelArt = {
  // Minecraft grass block pattern
  grassBlock: `
    box-shadow:
      0 0 0 4px #8B4513,
      4px 0 0 4px #8B4513,
      8px 0 0 4px #8B4513,
      12px 0 0 4px #8B4513,
      0 4px 0 4px #4CAF50,
      4px 4px 0 4px #4CAF50,
      8px 4px 0 4px #4CAF50,
      12px 4px 0 4px #4CAF50
  `,

  // Heart pixel art
  heart: `
    box-shadow:
      2px 0 0 0 #ff0066,
      4px 0 0 0 #ff0066,
      8px 0 0 0 #ff0066,
      10px 0 0 0 #ff0066,
      0 2px 0 0 #ff0066,
      2px 2px 0 0 #ff0066,
      4px 2px 0 0 #ff0066,
      6px 2px 0 0 #ff0066,
      8px 2px 0 0 #ff0066,
      10px 2px 0 0 #ff0066,
      12px 2px 0 0 #ff0066,
      2px 4px 0 0 #ff0066,
      4px 4px 0 0 #ff0066,
      6px 4px 0 0 #ff0066,
      8px 4px 0 0 #ff0066,
      10px 4px 0 0 #ff0066,
      4px 6px 0 0 #ff0066,
      6px 6px 0 0 #ff0066,
      8px 6px 0 0 #ff0066,
      6px 8px 0 0 #ff0066
  `,

  // Star pixel art
  star: `
    box-shadow:
      6px 0 0 0 #ffd700,
      5px 1px 0 0 #ffd700,
      6px 1px 0 0 #ffd700,
      7px 1px 0 0 #ffd700,
      0 2px 0 0 #ffd700,
      1px 2px 0 0 #ffd700,
      2px 2px 0 0 #ffd700,
      3px 2px 0 0 #ffd700,
      4px 2px 0 0 #ffd700,
      5px 2px 0 0 #ffd700,
      6px 2px 0 0 #ffd700,
      7px 2px 0 0 #ffd700,
      8px 2px 0 0 #ffd700,
      9px 2px 0 0 #ffd700,
      10px 2px 0 0 #ffd700,
      11px 2px 0 0 #ffd700,
      12px 2px 0 0 #ffd700,
      1px 3px 0 0 #ffd700,
      2px 3px 0 0 #ffd700,
      3px 3px 0 0 #ffd700,
      4px 3px 0 0 #ffd700,
      5px 3px 0 0 #ffd700,
      6px 3px 0 0 #ffd700,
      7px 3px 0 0 #ffd700,
      8px 3px 0 0 #ffd700,
      9px 3px 0 0 #ffd700,
      10px 3px 0 0 #ffd700,
      11px 3px 0 0 #ffd700,
      2px 4px 0 0 #ffd700,
      3px 4px 0 0 #ffd700,
      4px 4px 0 0 #ffd700,
      5px 4px 0 0 #ffd700,
      6px 4px 0 0 #ffd700,
      7px 4px 0 0 #ffd700,
      8px 4px 0 0 #ffd700,
      9px 4px 0 0 #ffd700,
      10px 4px 0 0 #ffd700,
      3px 5px 0 0 #ffd700,
      4px 5px 0 0 #ffd700,
      5px 5px 0 0 #ffd700,
      6px 5px 0 0 #ffd700,
      7px 5px 0 0 #ffd700,
      8px 5px 0 0 #ffd700,
      9px 5px 0 0 #ffd700,
      0 6px 0 0 #ffd700,
      1px 6px 0 0 #ffd700,
      4px 6px 0 0 #ffd700,
      5px 6px 0 0 #ffd700,
      6px 6px 0 0 #ffd700,
      7px 6px 0 0 #ffd700,
      8px 6px 0 0 #ffd700,
      11px 6px 0 0 #ffd700,
      12px 6px 0 0 #ffd700,
      1px 7px 0 0 #ffd700,
      2px 7px 0 0 #ffd700,
      10px 7px 0 0 #ffd700,
      11px 7px 0 0 #ffd700,
      2px 8px 0 0 #ffd700,
      3px 8px 0 0 #ffd700,
      9px 8px 0 0 #ffd700,
      10px 8px 0 0 #ffd700
  `
};

export const minecraftPixelThemes: MinecraftPixelTheme[] = [
  {
    name: '⛏️ Minecraft Overworld',
    cardBackground: `
      linear-gradient(180deg, #87CEEB 0%, #87CEEB 40%, #90EE90 40%, #90EE90 60%, #8B4513 60%, #8B4513 100%),
      repeating-linear-gradient(
        90deg,
        transparent,
        transparent 8px,
        rgba(0, 0, 0, 0.03) 8px,
        rgba(0, 0, 0, 0.03) 16px
      )
    `,
    cardBorder: '4px solid #333',
    cardRadius: '0',
    cardShadow: '0 0 0 1px #000, 0 0 0 2px #555, 0 0 0 3px #000',
    backgroundPattern: `url("data:image/svg+xml,%3Csvg width='16' height='16' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='8' height='8' fill='%234CAF50'/%3E%3Crect x='8' width='8' height='8' fill='%2366BB6A'/%3E%3Crect y='8' width='8' height='8' fill='%2366BB6A'/%3E%3Crect x='8' y='8' width='8' height='8' fill='%234CAF50'/%3E%3C/svg%3E")`,
    questionStyle: {
      background: 'rgba(255, 255, 255, 0.75)',
      border: '4px solid #333',
      borderRadius: '12px',
      padding: '16px',
      color: '#333',
      fontFamily: '"Minecraft", "Courier New", monospace'
    }
  },
  {
    name: '🔥 Minecraft Nether',
    cardBackground: `
      linear-gradient(135deg, #8B0000 0%, #FF4500 25%, #FF6347 50%, #8B0000 75%, #4B0000 100%),
      repeating-linear-gradient(
        45deg,
        transparent,
        transparent 10px,
        rgba(0, 0, 0, 0.1) 10px,
        rgba(0, 0, 0, 0.1) 20px
      )
    `,
    cardBorder: '4px solid #4B0000',
    cardRadius: '0',
    cardShadow: '0 0 20px rgba(255, 69, 0, 0.5), 0 0 0 2px #000',
    backgroundPattern: `url("data:image/svg+xml,%3Csvg width='20' height='20' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='10' height='10' fill='%238B0000'/%3E%3Crect x='10' width='10' height='10' fill='%23A52A2A'/%3E%3Crect y='10' width='10' height='10' fill='%23A52A2A'/%3E%3Crect x='10' y='10' width='10' height='10' fill='%238B0000'/%3E%3C/svg%3E")`,
    questionStyle: {
      background: 'rgba(255, 248, 220, 0.95)',
      border: '4px solid #8B0000',
      borderRadius: '12px',
      padding: '16px',
      color: '#4B0000'
    }
  },
  {
    name: '💎 Diamond Dimension',
    cardBackground: `
      linear-gradient(45deg, #00CED1 25%, transparent 25%),
      linear-gradient(-45deg, #00CED1 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, #00CED1 75%),
      linear-gradient(-45deg, transparent 75%, #00CED1 75%),
      #E0FFFF
    `,
    cardBorder: '4px solid #00CED1',
    cardRadius: '0',
    cardShadow: '0 0 0 2px #000, 0 0 15px rgba(0, 206, 209, 0.5)',
    backgroundPattern: `url("data:image/svg+xml,%3Csvg width='8' height='8' xmlns='http://www.w3.org/2000/svg'%3E%3Cpolygon points='4,0 8,4 4,8 0,4' fill='%2300CED1' opacity='0.3'/%3E%3C/svg%3E")`,
    questionStyle: {
      background: 'rgba(255, 255, 255, 0.75)',
      border: '3px solid #00CED1',
      borderRadius: '12px',
      padding: '18px',
      color: '#006666'
    }
  },
  {
    name: '🌟 Super Mario World',
    cardBackground: `
      linear-gradient(180deg, #5C94FC 0%, #5C94FC 60%, #F8B800 60%, #F8B800 70%, #AC7C00 70%, #AC7C00 100%),
      repeating-linear-gradient(
        90deg,
        transparent,
        transparent 16px,
        rgba(255, 255, 255, 0.1) 16px,
        rgba(255, 255, 255, 0.1) 32px
      )
    `,
    cardBorder: '3px solid #000',
    cardRadius: '0',
    cardShadow: '4px 4px 0 #000',
    backgroundPattern: `url("data:image/svg+xml,%3Csvg width='32' height='32' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='0' y='0' width='16' height='16' fill='%23F8B800'/%3E%3Crect x='16' y='0' width='16' height='16' fill='%23D89000'/%3E%3Crect x='0' y='16' width='16' height='16' fill='%23D89000'/%3E%3Crect x='16' y='16' width='16' height='16' fill='%23F8B800'/%3E%3Ccircle cx='16' cy='16' r='8' fill='%23FF0000'/%3E%3Ccircle cx='16' cy='16' r='4' fill='%23FFFFFF'/%3E%3C/svg%3E")`,
    questionStyle: {
      background: '#FFFFFF',
      border: '3px solid #000',
      borderRadius: '12px',
      padding: '16px',
      color: '#000'
    }
  },
  {
    name: '👾 Space Invaders',
    cardBackground: `
      linear-gradient(180deg, #000000 0%, #0a0e27 50%, #000000 100%),
      radial-gradient(2px 2px at 20% 30%, white, transparent),
      radial-gradient(2px 2px at 60% 70%, white, transparent),
      radial-gradient(1px 1px at 50% 20%, white, transparent),
      radial-gradient(1px 1px at 80% 10%, white, transparent),
      radial-gradient(2px 2px at 90% 60%, white, transparent),
      radial-gradient(1px 1px at 30% 80%, white, transparent)
    `,
    cardBorder: '3px solid #00ff00',
    cardRadius: '0',
    cardShadow: '0 0 20px #00ff00, inset 0 0 20px rgba(0, 255, 0, 0.1)',
    backgroundPattern: `url("data:image/svg+xml,%3Csvg width='24' height='24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M3,3 h6v3h-6z M15,3 h6v3h-6z M3,9 h18v3h-18z M6,15 h3v3h-3z M15,15 h3v3h-3z M6,18 h3v3h-3z M15,18 h3v3h-3z' fill='%2300ff00' opacity='0.2'/%3E%3C/svg%3E")`,
    questionStyle: {
      background: 'rgba(0, 0, 0, 0.9)',
      border: '2px solid #00ff00',
      borderRadius: '12px',
      padding: '16px',
      color: '#00ff00',
      fontFamily: '"Courier New", monospace'
    }
  },
  {
    name: '🏰 Zelda Dungeon',
    cardBackground: `
      linear-gradient(45deg, #2E7D32 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, #2E7D32 75%),
      linear-gradient(45deg, transparent 25%, #2E7D32 25%),
      linear-gradient(45deg, #2E7D32 75%, transparent 75%),
      #1B5E20
    `,
    cardBorder: '4px solid #FFD700',
    cardRadius: '0',
    cardShadow: '0 0 0 2px #000, 0 0 0 4px #FFD700, 0 0 0 6px #000',
    backgroundPattern: `url("data:image/svg+xml,%3Csvg width='40' height='40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20,5 L25,15 L35,15 L27.5,22.5 L30,35 L20,27.5 L10,35 L12.5,22.5 L5,15 L15,15 Z' fill='%23FFD700' opacity='0.1'/%3E%3C/svg%3E")`,
    questionStyle: {
      background: 'linear-gradient(135deg, #FFF8DC 0%, #FAEBD7 100%)',
      border: '3px solid #8B4513',
      borderRadius: '12px',
      padding: '18px',
      color: '#2E4E2E'
    }
  },
  {
    name: '🎮 Pac-Man Maze',
    cardBackground: `
      linear-gradient(90deg, #000 0%, #000 2%, transparent 2%, transparent 98%, #000 98%, #000 100%),
      linear-gradient(180deg, #000 0%, #000 2%, transparent 2%, transparent 98%, #000 98%, #000 100%),
      repeating-linear-gradient(90deg, transparent, transparent 20px, #0000ff 20px, #0000ff 22px),
      repeating-linear-gradient(180deg, transparent, transparent 20px, #0000ff 20px, #0000ff 22px),
      #000
    `,
    cardBorder: '4px solid #0000ff',
    cardRadius: '0',
    cardShadow: '0 0 20px rgba(255, 255, 0, 0.5)',
    backgroundPattern: `url("data:image/svg+xml,%3Csvg width='20' height='20' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='10' cy='10' r='2' fill='%23FFFF00'/%3E%3C/svg%3E")`,
    questionStyle: {
      background: '#000',
      border: '3px solid #FFFF00',
      borderRadius: '12px',
      padding: '16px',
      color: '#FFFF00',
      fontFamily: '"Courier New", monospace'
    }
  },
  {
    name: '🦔 Sonic Green Hill',
    cardBackground: `
      linear-gradient(180deg, #87CEEB 0%, #87CEEB 30%, #32CD32 30%, #32CD32 50%, #228B22 50%, #228B22 70%, #8B4513 70%, #8B4513 100%),
      repeating-linear-gradient(
        90deg,
        transparent,
        transparent 30px,
        rgba(255, 255, 255, 0.1) 30px,
        rgba(255, 255, 255, 0.1) 60px
      )
    `,
    cardBorder: '4px solid #FFD700',
    cardRadius: '0',
    cardShadow: '0 8px 0 #006400, 0 16px 0 #8B4513',
    backgroundPattern: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30,10 Q20,25 30,40 Q40,25 30,10' fill='%2332CD32' opacity='0.2'/%3E%3Ccircle cx='30' cy='50' r='8' fill='%23FFD700' opacity='0.3'/%3E%3C/svg%3E")`,
    questionStyle: {
      background: 'rgba(255, 255, 255, 0.75)',
      border: '3px solid #0000FF',
      borderRadius: '12px',
      padding: '16px',
      color: '#0000FF'
    }
  },
  {
    name: '🍄 Mario Blocks',
    cardBackground: `
      repeating-linear-gradient(
        0deg,
        #C84C0C 0px,
        #C84C0C 32px,
        #AC3C0C 32px,
        #AC3C0C 64px
      ),
      repeating-linear-gradient(
        90deg,
        transparent,
        transparent 32px,
        rgba(0, 0, 0, 0.1) 32px,
        rgba(0, 0, 0, 0.1) 64px
      )
    `,
    cardBorder: '4px solid #000',
    cardRadius: '0',
    cardShadow: '0 0 0 2px #FFF, 0 0 0 6px #000',
    backgroundPattern: `url("data:image/svg+xml,%3Csvg width='32' height='32' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='32' height='32' fill='%23F8B800'/%3E%3Ctext x='16' y='20' text-anchor='middle' font-size='20' fill='%23000'%3E?%3C/text%3E%3C/svg%3E")`,
    questionStyle: {
      background: '#F8B800',
      border: '4px solid #000',
      borderRadius: '12px',
      padding: '16px',
      color: '#000'
    }
  },
  {
    name: '🐉 Pokemon Battle',
    cardBackground: `
      linear-gradient(135deg, #FF6B6B 0%, #FF6B6B 50%, #FFFFFF 50%, #FFFFFF 100%),
      radial-gradient(circle at 50% 50%, #FFFFFF 30%, #FF6B6B 30%, #FF6B6B 35%, #000000 35%, #000000 40%, transparent 40%)
    `,
    cardBorder: '4px solid #000',
    cardRadius: '50% 50% 0 0',
    cardShadow: '0 0 0 2px #FFF, 0 0 0 4px #000, 0 8px 16px rgba(0, 0, 0, 0.3)',
    backgroundPattern: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='50' cy='50' r='40' fill='none' stroke='%23000' stroke-width='4'/%3E%3Ccircle cx='50' cy='50' r='15' fill='%23FFF' stroke='%23000' stroke-width='4'/%3E%3Ccircle cx='50' cy='50' r='5' fill='%23000'/%3E%3C/svg%3E")`,
    questionStyle: {
      background: 'rgba(255, 255, 255, 0.75)',
      border: '3px solid #000',
      borderRadius: '12px',
      padding: '16px',
      color: '#000'
    }
  },
  {
    name: '🎯 Fortnite Storm',
    cardBackground: `
      radial-gradient(circle at center, transparent 30%, #9C27B0 60%, #512DA8 100%),
      linear-gradient(135deg, #00BCD4 0%, #2196F3 50%, #3F51B5 100%)
    `,
    cardBorder: '3px solid #E91E63',
    cardRadius: '0',
    cardShadow: '0 0 30px rgba(156, 39, 176, 0.5), inset 0 0 30px rgba(33, 150, 243, 0.3)',
    backgroundPattern: `url("data:image/svg+xml,%3Csvg width='40' height='40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20,10 L30,20 L20,30 L10,20 Z' fill='none' stroke='%23E91E63' stroke-width='2' opacity='0.3'/%3E%3C/svg%3E")`,
    questionStyle: {
      background: 'rgba(255, 255, 255, 0.75)',
      border: '3px solid #E91E63',
      borderRadius: '12px',
      padding: '18px',
      color: '#512DA8'
    }
  },
  {
    name: '🏗️ Roblox Builder',
    cardBackground: `
      repeating-linear-gradient(
        45deg,
        #FF0000,
        #FF0000 10px,
        #FFFFFF 10px,
        #FFFFFF 20px,
        #00FF00 20px,
        #00FF00 30px,
        #FFFFFF 30px,
        #FFFFFF 40px,
        #0000FF 40px,
        #0000FF 50px,
        #FFFFFF 50px,
        #FFFFFF 60px
      )
    `,
    cardBorder: '4px solid #000',
    cardRadius: '0',
    cardShadow: '5px 5px 0 #000, 10px 10px 0 #FF0000',
    backgroundPattern: `url("data:image/svg+xml,%3Csvg width='20' height='20' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='20' height='20' fill='%23FFF'/%3E%3Crect x='2' y='2' width='16' height='16' fill='%23FF0000'/%3E%3Ccircle cx='10' cy='10' r='4' fill='%23FFF'/%3E%3C/svg%3E")`,
    questionStyle: {
      background: '#FFFFFF',
      border: '3px solid #FF0000',
      borderRadius: '12px',
      padding: '16px',
      color: '#000'
    }
  }
];

// Helper function to get theme by index
export function getMinecraftThemeByIndex(index: number): MinecraftPixelTheme {
  return minecraftPixelThemes[index % minecraftPixelThemes.length];
}

// Export pixel art creators for use in components
export { createPixelArt };