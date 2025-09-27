export interface EnhancedTheme {
  id: string;
  name: string;
  category: string;
  style: {
    type: 'gradient' | 'pattern' | 'solid' | 'animated' | 'image' | 'geometric' | 'artistic';
    background: string;
    cardStyle: string;
    borderStyle?: string;
    decorations?: {
      pattern?: string;
      overlay?: string;
      animation?: string;
    };
  };
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    text: string;
    cardBg: string;
  };
}

export const enhancedThemes: EnhancedTheme[] = [
  // GEOMETRIC PATTERNS
  {
    id: 'polka-dots',
    name: 'Pois Rétro',
    category: 'patterns',
    style: {
      type: 'pattern',
      background: `
        radial-gradient(circle at 20% 50%, transparent 20%, #FFE5B4 20%, #FFE5B4 25%, transparent 25%),
        radial-gradient(circle at 60% 30%, transparent 20%, #FFD700 20%, #FFD700 25%, transparent 25%),
        radial-gradient(circle at 80% 70%, transparent 20%, #FFA500 20%, #FFA500 25%, transparent 25%),
        linear-gradient(135deg, #FFF8DC 0%, #FAEBD7 100%)
      `,
      cardStyle: 'border-radius: 20px; box-shadow: 0 8px 32px rgba(0,0,0,0.1);',
      borderStyle: '3px dotted',
    },
    colors: {
      primary: '#FF6B6B',
      secondary: '#4ECDC4',
      accent: '#FFD93D',
      text: '#2C3E50',
      cardBg: 'rgba(255, 255, 255, 0.95)'
    }
  },
  {
    id: 'stripes',
    name: 'Rayures Candy',
    category: 'patterns',
    style: {
      type: 'pattern',
      background: `
        repeating-linear-gradient(
          45deg,
          #FFB6C1,
          #FFB6C1 10px,
          #FFC0CB 10px,
          #FFC0CB 20px,
          #FFE4E1 20px,
          #FFE4E1 30px
        )
      `,
      cardStyle: 'border-radius: 15px; transform: rotate(-1deg);',
    },
    colors: {
      primary: '#FF1493',
      secondary: '#FF69B4',
      accent: '#FFB6C1',
      text: '#8B008B',
      cardBg: 'rgba(255, 255, 255, 0.98)'
    }
  },
  {
    id: 'chevron',
    name: 'Chevron Moderne',
    category: 'patterns',
    style: {
      type: 'pattern',
      background: `
        repeating-linear-gradient(
          135deg,
          #667eea 0px,
          #667eea 20px,
          #764ba2 20px,
          #764ba2 40px
        )
      `,
      cardStyle: 'clip-path: polygon(0 0, 100% 0, 95% 100%, 5% 100%);',
    },
    colors: {
      primary: '#667eea',
      secondary: '#764ba2',
      accent: '#f093fb',
      text: '#FFFFFF',
      cardBg: 'rgba(255, 255, 255, 0.95)'
    }
  },

  // PAPER & TEXTURE STYLES
  {
    id: 'notebook',
    name: 'Cahier d\'École',
    category: 'paper',
    style: {
      type: 'pattern',
      background: `
        linear-gradient(transparent 29px, #E5E5E5 29px, #E5E5E5 31px, transparent 31px),
        linear-gradient(90deg, transparent 29px, #FFB6C1 29px, #FFB6C1 31px, transparent 31px),
        #FFFEF9
      `,
      cardStyle: 'border: 1px solid #E5E5E5; box-shadow: inset 0 0 10px rgba(0,0,0,0.05);',
      decorations: {
        overlay: 'background-image: url("data:image/svg+xml,%3Csvg width="40" height="40" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" stroke="%23d0d0d0" stroke-width="0.5"%3E%3Cpath d="M0 20h40M20 0v40"/%3E%3C/g%3E%3C/svg%3E");'
      }
    },
    colors: {
      primary: '#2B4C8C',
      secondary: '#FF6B6B',
      accent: '#4ECDC4',
      text: '#2C3E50',
      cardBg: '#FFFEF9'
    }
  },
  {
    id: 'graph-paper',
    name: 'Papier Millimétré',
    category: 'paper',
    style: {
      type: 'pattern',
      background: `
        linear-gradient(rgba(0,100,200,0.1) 1px, transparent 1px),
        linear-gradient(90deg, rgba(0,100,200,0.1) 1px, transparent 1px),
        linear-gradient(rgba(0,100,200,0.05) 2px, transparent 2px),
        linear-gradient(90deg, rgba(0,100,200,0.05) 2px, transparent 2px),
        #FAFAFA
      `,
      cardStyle: 'border: 2px solid #0064C8; background-size: 50px 50px, 50px 50px, 10px 10px, 10px 10px;',
    },
    colors: {
      primary: '#0064C8',
      secondary: '#00A0DC',
      accent: '#FF4500',
      text: '#333333',
      cardBg: 'rgba(255, 255, 255, 0.9)'
    }
  },
  {
    id: 'cork-board',
    name: 'Tableau de Liège',
    category: 'paper',
    style: {
      type: 'pattern',
      background: `
        radial-gradient(circle at 1% 1%, #D2691E 5%, transparent 5%),
        radial-gradient(circle at 99% 99%, #CD853F 5%, transparent 5%),
        linear-gradient(135deg, #DEB887 0%, #F4A460 100%)
      `,
      cardStyle: 'border-radius: 5px; box-shadow: 2px 2px 10px rgba(0,0,0,0.3); transform: rotate(2deg);',
      decorations: {
        overlay: 'filter: drop-shadow(0 0 5px rgba(0,0,0,0.2));'
      }
    },
    colors: {
      primary: '#8B4513',
      secondary: '#D2691E',
      accent: '#FFD700',
      text: '#FFFFFF',
      cardBg: '#FFFACD'
    }
  },

  // NATURE THEMES
  {
    id: 'watercolor',
    name: 'Aquarelle',
    category: 'artistic',
    style: {
      type: 'artistic',
      background: `
        radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3), transparent 50%),
        radial-gradient(circle at 80% 20%, rgba(255, 182, 193, 0.3), transparent 50%),
        radial-gradient(circle at 40% 40%, rgba(255, 218, 185, 0.3), transparent 50%),
        radial-gradient(circle at 60% 60%, rgba(176, 224, 230, 0.3), transparent 50%),
        linear-gradient(to bottom right, #FFEFD5, #F0F8FF)
      `,
      cardStyle: 'border-radius: 0; border: none; filter: blur(0.5px); backdrop-filter: blur(5px);',
      decorations: {
        overlay: 'mix-blend-mode: multiply;'
      }
    },
    colors: {
      primary: '#7877C6',
      secondary: '#FFB6C1',
      accent: '#FFDAB9',
      text: '#4A5568',
      cardBg: 'rgba(255, 255, 255, 0.7)'
    }
  },
  {
    id: 'forest',
    name: 'Forêt Enchantée',
    category: 'nature',
    style: {
      type: 'gradient',
      background: `
        linear-gradient(180deg, #87CEEB 0%, #98D8C8 50%, #7FBF7F 100%)
      `,
      cardStyle: 'border-radius: 50px 10px; border: 3px solid #228B22;',
      decorations: {
        pattern: '🌲🌳🍃🦌🌿'
      }
    },
    colors: {
      primary: '#228B22',
      secondary: '#32CD32',
      accent: '#FFD700',
      text: '#2F4F2F',
      cardBg: 'rgba(240, 255, 240, 0.95)'
    }
  },

  // SPACE & TECH
  {
    id: 'galaxy',
    name: 'Galaxie',
    category: 'space',
    style: {
      type: 'animated',
      background: `
        radial-gradient(ellipse at top, #1B1464, transparent),
        radial-gradient(ellipse at bottom, #3D1F6D, transparent),
        linear-gradient(180deg, #0F0C29, #302B63, #24243E)
      `,
      cardStyle: 'border: 2px solid #FFD700; box-shadow: 0 0 20px rgba(255, 215, 0, 0.5);',
      decorations: {
        animation: 'stars 60s linear infinite',
        pattern: '⭐✨🌟💫🌙'
      }
    },
    colors: {
      primary: '#FFD700',
      secondary: '#FF69B4',
      accent: '#00CED1',
      text: '#FFFFFF',
      cardBg: 'rgba(25, 20, 100, 0.9)'
    }
  },
  {
    id: 'neon',
    name: 'Néon Cyber',
    category: 'tech',
    style: {
      type: 'animated',
      background: '#0A0A0A',
      cardStyle: `
        border: 2px solid #00FFFF;
        box-shadow:
          0 0 10px #00FFFF,
          0 0 20px #00FFFF,
          0 0 30px #00FFFF,
          inset 0 0 10px rgba(0, 255, 255, 0.2);
        animation: neon-glow 1.5s ease-in-out infinite alternate;
      `,
    },
    colors: {
      primary: '#00FFFF',
      secondary: '#FF00FF',
      accent: '#FFFF00',
      text: '#00FFFF',
      cardBg: 'rgba(10, 10, 10, 0.95)'
    }
  },

  // RETRO & VINTAGE
  {
    id: 'retro-80s',
    name: 'Rétro 80s',
    category: 'retro',
    style: {
      type: 'geometric',
      background: `
        linear-gradient(180deg, #FF006E 0%, #8338EC 50%, #3A86FF 100%)
      `,
      cardStyle: 'border: 4px solid #FFBE0B; border-radius: 0; transform: skew(-2deg);',
      decorations: {
        pattern: 'background-image: repeating-linear-gradient(90deg, transparent, transparent 10px, rgba(255, 255, 255, .05) 10px, rgba(255, 255, 255, .05) 20px);'
      }
    },
    colors: {
      primary: '#FF006E',
      secondary: '#8338EC',
      accent: '#FFBE0B',
      text: '#FFFFFF',
      cardBg: 'rgba(58, 134, 255, 0.9)'
    }
  },
  {
    id: 'vintage-postal',
    name: 'Carte Postale',
    category: 'retro',
    style: {
      type: 'pattern',
      background: `
        linear-gradient(105deg, #F5DEB3 0%, #FAEBD7 50%, #FFF8DC 100%)
      `,
      cardStyle: `
        border: 1px solid #8B7355;
        border-radius: 10px;
        box-shadow: 3px 3px 10px rgba(139, 115, 85, 0.3);
        position: relative;
        filter: sepia(0.2);
      `,
      decorations: {
        overlay: 'background-image: url("data:image/svg+xml,%3Csvg width="100" height="100" xmlns="http://www.w3.org/2000/svg"%3E%3Cdefs%3E%3Cfilter id="aged"%3E%3CfeTurbulence baseFrequency="0.04" numOctaves="5" /%3E%3CfeColorMatrix values="0 0 0 0 0.9 0 0 0 0 0.8 0 0 0 0 0.7 0 0 0 1 0"/%3E%3C/filter%3E%3C/defs%3E%3Crect width="100" height="100" filter="url(%23aged)" opacity="0.1"/%3E%3C/svg%3E");'
      }
    },
    colors: {
      primary: '#8B4513',
      secondary: '#A0522D',
      accent: '#B22222',
      text: '#4B3621',
      cardBg: '#FFFAF0'
    }
  },

  // MINIMALIST
  {
    id: 'brutalist',
    name: 'Brutaliste',
    category: 'modern',
    style: {
      type: 'solid',
      background: '#F0F0F0',
      cardStyle: 'border: 5px solid #000000; border-radius: 0; box-shadow: 10px 10px 0 #000000;',
    },
    colors: {
      primary: '#000000',
      secondary: '#FF0000',
      accent: '#0000FF',
      text: '#000000',
      cardBg: '#FFFFFF'
    }
  },
  {
    id: 'swiss',
    name: 'Swiss Design',
    category: 'modern',
    style: {
      type: 'solid',
      background: '#FFFFFF',
      cardStyle: 'border: 1px solid #000000; border-radius: 0;',
      decorations: {
        pattern: 'background-size: 40px 40px; background-image: linear-gradient(to right, #000000 1px, transparent 1px), linear-gradient(to bottom, #000000 1px, transparent 1px);'
      }
    },
    colors: {
      primary: '#FF0000',
      secondary: '#000000',
      accent: '#FFFFFF',
      text: '#000000',
      cardBg: '#FFFFFF'
    }
  },

  // ARTISTIC
  {
    id: 'memphis',
    name: 'Memphis',
    category: 'artistic',
    style: {
      type: 'geometric',
      background: `
        radial-gradient(circle at 20% 50%, #FFD700 0%, #FFD700 10%, transparent 10%),
        radial-gradient(circle at 80% 80%, #FF69B4 0%, #FF69B4 15%, transparent 15%),
        radial-gradient(circle at 40% 80%, #00CED1 0%, #00CED1 8%, transparent 8%),
        linear-gradient(135deg, #FFE4E1 0%, #F0FFFF 100%)
      `,
      cardStyle: 'border: 3px solid #000000; border-radius: 20px; transform: rotate(-1deg);',
      decorations: {
        pattern: 'background-image: repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(0,0,0,.05) 35px, rgba(0,0,0,.05) 70px);'
      }
    },
    colors: {
      primary: '#000000',
      secondary: '#FF69B4',
      accent: '#FFD700',
      text: '#000000',
      cardBg: '#FFFFFF'
    }
  },
  {
    id: 'comic-book',
    name: 'Bande Dessinée',
    category: 'artistic',
    style: {
      type: 'pattern',
      background: `
        radial-gradient(circle, #FFFF00 10%, transparent 10%),
        radial-gradient(circle, #FF0000 10%, transparent 10%),
        #FFFFFF
      `,
      cardStyle: `
        border: 3px solid #000000;
        border-radius: 10px;
        box-shadow: 5px 5px 0 #000000;
        position: relative;
      `,
      decorations: {
        overlay: 'background-size: 30px 30px; background-position: 0 0, 15px 15px;'
      }
    },
    colors: {
      primary: '#FF0000',
      secondary: '#0000FF',
      accent: '#FFFF00',
      text: '#000000',
      cardBg: '#FFFFFF'
    }
  },

  // SEASONAL ADVANCED
  {
    id: 'autumn-leaves',
    name: 'Feuilles d\'Automne',
    category: 'seasonal',
    style: {
      type: 'pattern',
      background: `
        radial-gradient(circle at 25% 25%, rgba(255, 140, 0, 0.3), transparent 50%),
        radial-gradient(circle at 75% 75%, rgba(255, 69, 0, 0.3), transparent 50%),
        radial-gradient(circle at 50% 50%, rgba(255, 215, 0, 0.3), transparent 50%),
        linear-gradient(135deg, #FFA500 0%, #FF6347 100%)
      `,
      cardStyle: 'border-radius: 10px 40px; border: 2px solid #8B4513;',
      decorations: {
        pattern: '🍁🍂🍃🌰🎃'
      }
    },
    colors: {
      primary: '#8B4513',
      secondary: '#FF8C00',
      accent: '#FFD700',
      text: '#4B3621',
      cardBg: 'rgba(255, 248, 220, 0.95)'
    }
  },
  {
    id: 'winter-frost',
    name: 'Givre d\'Hiver',
    category: 'seasonal',
    style: {
      type: 'animated',
      background: `
        radial-gradient(ellipse at top, rgba(255, 255, 255, 0.8), transparent),
        radial-gradient(ellipse at bottom, rgba(173, 216, 230, 0.8), transparent),
        linear-gradient(180deg, #E0F2FF 0%, #B4D4F1 100%)
      `,
      cardStyle: `
        border: 2px solid #4682B4;
        border-radius: 20px;
        box-shadow: 0 0 20px rgba(173, 216, 230, 0.5);
        backdrop-filter: blur(5px);
      `,
      decorations: {
        pattern: '❄️⛄🎿⛸️🏔️',
        animation: 'snow 10s linear infinite'
      }
    },
    colors: {
      primary: '#4682B4',
      secondary: '#87CEEB',
      accent: '#FFFFFF',
      text: '#2C3E50',
      cardBg: 'rgba(240, 248, 255, 0.95)'
    }
  }
];

// CSS animations to inject
export const themeAnimations = `
  @keyframes neon-glow {
    from {
      box-shadow:
        0 0 10px #00FFFF,
        0 0 20px #00FFFF,
        0 0 30px #00FFFF,
        inset 0 0 10px rgba(0, 255, 255, 0.2);
    }
    to {
      box-shadow:
        0 0 20px #00FFFF,
        0 0 30px #00FFFF,
        0 0 40px #00FFFF,
        inset 0 0 15px rgba(0, 255, 255, 0.3);
    }
  }

  @keyframes stars {
    from { background-position: 0 0; }
    to { background-position: -10000px 5000px; }
  }

  @keyframes snow {
    0% { transform: translateY(-100vh); }
    100% { transform: translateY(100vh); }
  }
`;