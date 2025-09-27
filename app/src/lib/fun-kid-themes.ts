// Fun, engaging card themes designed specifically for kids!
export interface KidFriendlyTheme {
  name: string;
  style: 'adventure' | 'comic' | 'game' | 'nature' | 'space' | 'candy' | 'ocean' | 'dinosaur' | 'superhero' | 'fairy';

  // Card container styles
  cardBackground?: string;
  cardBorder?: string;
  cardShadow?: string;
  cardRadius?: string;
  cardPadding?: string;
  cardTransform?: string;

  // Header/number badge styles
  numberBadgeStyle?: 'star' | 'heart' | 'cloud' | 'speech-bubble' | 'explosion' | 'shield' | 'gem' | 'planet';
  numberBadgeBackground?: string;
  numberBadgeColor?: string;

  // Text styles
  questionStyle?: {
    background?: string;
    border?: string;
    padding?: string;
    borderRadius?: string;
    fontSize?: string;
    color?: string;
    fontFamily?: string;
    textShadow?: string;
  };

  // Fun decorative elements
  decorations?: {
    type: 'stickers' | 'sparkles' | 'bubbles' | 'stars' | 'confetti' | 'emoji';
    elements?: string[];
    animation?: string;
  };

  // Special effects
  effects?: {
    hover?: string;
    animation?: string;
    glow?: boolean;
  };
}

export const kidFriendlyThemes: KidFriendlyTheme[] = [
  // ADVENTURE & EXPLORATION THEMES
  {
    name: '🏴‍☠️ Pirate Treasure',
    style: 'adventure',
    cardBackground: 'linear-gradient(135deg, #8B4513 0%, #D2691E 50%, #FFD700 100%)',
    cardBorder: '3px solid #654321',
    cardShadow: '0 8px 16px rgba(139,69,19,0.4)',
    cardRadius: '15px',
    cardPadding: '25px',
    cardTransform: 'rotate(-1deg)',
    numberBadgeStyle: 'star',
    numberBadgeBackground: '#FFD700',
    numberBadgeColor: '#8B4513',
    questionStyle: {
      background: 'transparent',
      padding: '15px',
      borderRadius: '10px',
      color: '#654321',
      fontFamily: '"Pirata One", cursive',
      fontSize: '18px',
      border: '3px dashed #8B4513',
      boxShadow: 'inset 0 0 15px rgba(139,69,19,0.1)'
    },
    decorations: {
      type: 'emoji',
      elements: ['⚓', '🏴‍☠️', '💰', '🦜', '⛵'],
      animation: 'bounce'
    }
  },

  {
    name: '🚀 Space Explorer',
    style: 'space',
    cardBackground: 'radial-gradient(ellipse at top, #0F0C29 0%, #302B63 50%, #24243e 100%)',
    cardBorder: '2px solid #9D4EDD',
    cardShadow: '0 0 30px rgba(157,78,221,0.5), inset 0 0 20px rgba(157,78,221,0.2)',
    cardRadius: '20px',
    cardPadding: '25px',
    numberBadgeStyle: 'planet',
    numberBadgeBackground: 'linear-gradient(45deg, #667EEA, #764BA2)',
    numberBadgeColor: '#FFFFFF',
    questionStyle: {
      background: 'transparent',
      backdropFilter: 'blur(5px)',
      padding: '15px',
      borderRadius: '15px',
      color: '#E0AAFF',
      fontFamily: '"Orbitron", monospace',
      textShadow: '0 0 10px rgba(224,170,255,0.8)',
      border: '2px solid rgba(224,170,255,0.3)',
      boxShadow: '0 0 20px rgba(157,78,221,0.2)'
    },
    decorations: {
      type: 'emoji',
      elements: ['🌟', '✨', '🌙', '⭐', '🪐', '🛸'],
      animation: 'twinkle'
    },
    effects: {
      glow: true,
      animation: 'pulse'
    }
  },

  // COMIC & SUPERHERO THEMES
  {
    name: '💥 Comic Book',
    style: 'comic',
    cardBackground: 'linear-gradient(45deg, #FF6B6B 25%, #FFE66D 25%, #FFE66D 50%, #4ECDC4 50%, #4ECDC4 75%, #FF6B6B 75%)',
    cardBorder: '4px solid #000000',
    cardShadow: '5px 5px 0px #000000',
    cardRadius: '0px',
    cardPadding: '20px',
    cardTransform: 'skewY(-2deg)',
    numberBadgeStyle: 'explosion',
    numberBadgeBackground: '#FF0000',
    numberBadgeColor: '#FFFFFF',
    questionStyle: {
      background: 'rgba(255,255,255,0.8)',
      border: '4px solid #000000',
      padding: '15px',
      borderRadius: '10px',
      color: '#000000',
      fontFamily: '"Bangers", cursive',
      fontSize: '20px',
      textShadow: '2px 2px 0px #FFE66D',
      transform: 'rotate(1deg)'
    },
    decorations: {
      type: 'emoji',
      elements: ['💥', '⚡', '💫', 'POW!', 'BAM!'],
      animation: 'shake'
    }
  },

  {
    name: '🦸 Superhero',
    style: 'superhero',
    cardBackground: 'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)',
    cardBorder: '3px solid #FFD700',
    cardShadow: '0 10px 40px rgba(102,126,234,0.5)',
    cardRadius: '15px',
    cardPadding: '25px',
    numberBadgeStyle: 'shield',
    numberBadgeBackground: 'linear-gradient(45deg, #FF0000, #FFD700)',
    numberBadgeColor: '#FFFFFF',
    questionStyle: {
      background: 'transparent',
      padding: '15px',
      borderRadius: '10px',
      color: '#2D3748',
      fontFamily: '"Russo One", sans-serif',
      fontSize: '18px',
      border: '3px solid rgba(255,215,0,0.5)',
      boxShadow: 'inset 0 0 20px rgba(255,215,0,0.1)'
    },
    decorations: {
      type: 'emoji',
      elements: ['⚡', '🦸', '💪', '⭐', '🛡️'],
      animation: 'fly'
    },
    effects: {
      hover: 'transform: scale(1.05) rotate(1deg)',
      glow: true
    }
  },

  // NATURE & ANIMAL THEMES
  {
    name: '🦖 Dinosaur Park',
    style: 'dinosaur',
    cardBackground: 'linear-gradient(180deg, #87CEEB 0%, #98D98E 60%, #654321 100%)',
    cardBorder: '3px solid #228B22',
    cardShadow: '0 8px 16px rgba(34,139,34,0.3)',
    cardRadius: '20px',
    cardPadding: '25px',
    numberBadgeStyle: 'cloud',
    numberBadgeBackground: '#FF6347',
    numberBadgeColor: '#FFFFFF',
    questionStyle: {
      background: 'transparent',
      padding: '15px',
      borderRadius: '15px',
      color: '#2F4F2F',
      fontFamily: '"Fredoka One", cursive',
      fontSize: '18px',
      border: '3px solid #98D98E',
      boxShadow: 'inset 0 0 10px rgba(152,217,142,0.2)'
    },
    decorations: {
      type: 'emoji',
      elements: ['🦖', '🦕', '🌴', '🌋', '🥚'],
      animation: 'stomp'
    }
  },

  {
    name: '🌊 Under the Sea',
    style: 'ocean',
    cardBackground: 'linear-gradient(180deg, #00CED1 0%, #4682B4 50%, #191970 100%)',
    cardBorder: 'none',
    cardShadow: '0 10px 30px rgba(0,119,190,0.3), inset 0 0 20px rgba(255,255,255,0.1)',
    cardRadius: '25px',
    cardPadding: '25px',
    numberBadgeStyle: 'heart',
    numberBadgeBackground: '#FF69B4',
    numberBadgeColor: '#FFFFFF',
    questionStyle: {
      background: 'transparent',
      backdropFilter: 'blur(3px)',
      padding: '15px',
      borderRadius: '20px',
      color: '#E0FFFF',
      fontFamily: '"Bubblegum Sans", cursive',
      textShadow: '0 2px 4px rgba(0,0,0,0.3)',
      border: '3px solid rgba(255,255,255,0.3)',
      boxShadow: 'inset 0 0 20px rgba(0,119,190,0.1)'
    },
    decorations: {
      type: 'emoji',
      elements: ['🐠', '🐟', '🐡', '🦈', '🐙', '🫧'],
      animation: 'float'
    },
    effects: {
      animation: 'wave'
    }
  },

  {
    name: '🌈 Rainbow Garden',
    style: 'nature',
    cardBackground: 'linear-gradient(45deg, #FF6B9D, #FFC09F, #FFEE93, #C7F0DB, #A8E6CF)',
    cardBorder: '3px solid #FF69B4',
    cardShadow: '0 5px 15px rgba(255,105,180,0.3)',
    cardRadius: '20px',
    cardPadding: '25px',
    numberBadgeStyle: 'heart',
    numberBadgeBackground: 'linear-gradient(45deg, #FF69B4, #FFB6C1)',
    numberBadgeColor: '#FFFFFF',
    questionStyle: {
      background: 'transparent',
      padding: '15px',
      borderRadius: '15px',
      color: '#D8325D',
      fontFamily: '"Kalam", cursive',
      fontSize: '18px',
      border: '3px double #FF69B4',
      boxShadow: 'inset 0 0 15px rgba(255,105,180,0.1)'
    },
    decorations: {
      type: 'emoji',
      elements: ['🌸', '🌺', '🌻', '🦋', '🌈', '🐝'],
      animation: 'sway'
    }
  },

  // CANDY & SWEET THEMES
  {
    name: '🍭 Candy Land',
    style: 'candy',
    cardBackground: 'repeating-linear-gradient(45deg, #FF69B4 0px, #FF69B4 20px, #FFFFFF 20px, #FFFFFF 40px, #87CEEB 40px, #87CEEB 60px, #FFFFFF 60px, #FFFFFF 80px)',
    cardBorder: '4px solid #FF1493',
    cardShadow: '0 8px 16px rgba(255,20,147,0.3)',
    cardRadius: '25px',
    cardPadding: '25px',
    numberBadgeStyle: 'heart',
    numberBadgeBackground: '#FF69B4',
    numberBadgeColor: '#FFFFFF',
    questionStyle: {
      background: 'transparent',
      padding: '15px',
      borderRadius: '20px',
      color: '#D8325D',
      fontFamily: '"Chicle", cursive',
      fontSize: '20px',
      border: '4px dotted #FF69B4',
      boxShadow: '0 0 15px rgba(255,20,147,0.1)'
    },
    decorations: {
      type: 'emoji',
      elements: ['🍬', '🍭', '🧁', '🍩', '🍪'],
      animation: 'spin'
    }
  },

  {
    name: '🍦 Ice Cream Parlor',
    style: 'candy',
    cardBackground: 'conic-gradient(from 180deg, #FFB6C1, #FFE4B5, #E0F2E9, #B0E0E6, #DDA0DD, #FFB6C1)',
    cardBorder: '3px solid #FF69B4',
    cardShadow: '0 8px 20px rgba(255,182,193,0.4)',
    cardRadius: '30px',
    cardPadding: '25px',
    numberBadgeStyle: 'cloud',
    numberBadgeBackground: '#FF6B9D',
    numberBadgeColor: '#FFFFFF',
    questionStyle: {
      background: 'transparent',
      padding: '15px',
      borderRadius: '20px',
      color: '#8B4789',
      fontFamily: '"Pacifico", cursive',
      fontSize: '18px',
      border: '3px wavy #FF69B4',
      boxShadow: 'inset 0 0 10px rgba(255,182,193,0.2)'
    },
    decorations: {
      type: 'emoji',
      elements: ['🍦', '🍨', '🍧', '🎂', '🧋'],
      animation: 'melt'
    }
  },

  // FAIRY TALE & MAGIC THEMES
  {
    name: '✨ Fairy Tale',
    style: 'fairy',
    cardBackground: 'linear-gradient(135deg, #667EEA 0%, #F687B3 50%, #FBB6CE 100%)',
    cardBorder: '3px solid #D8B2FE',
    cardShadow: '0 10px 30px rgba(216,178,254,0.4), 0 0 40px rgba(216,178,254,0.2)',
    cardRadius: '25px',
    cardPadding: '25px',
    numberBadgeStyle: 'star',
    numberBadgeBackground: 'linear-gradient(45deg, #FFD700, #FFA500)',
    numberBadgeColor: '#FFFFFF',
    questionStyle: {
      background: 'transparent',
      padding: '15px',
      borderRadius: '20px',
      color: '#8B5A8F',
      fontFamily: '"Dancing Script", cursive',
      fontSize: '18px',
      textShadow: '1px 1px 2px rgba(216,178,254,0.5)',
      border: '3px solid rgba(216,178,254,0.4)',
      boxShadow: '0 0 25px rgba(216,178,254,0.2)'
    },
    decorations: {
      type: 'sparkles',
      elements: ['✨', '🧚', '🦄', '🌟', '💫', '🏰'],
      animation: 'sparkle'
    },
    effects: {
      glow: true
    }
  },

  {
    name: '🎪 Circus Fun',
    style: 'adventure',
    cardBackground: 'repeating-linear-gradient(90deg, #FF0000 0px, #FF0000 20px, #FFFFFF 20px, #FFFFFF 40px)',
    cardBorder: '4px solid #FFD700',
    cardShadow: '0 8px 16px rgba(255,0,0,0.3)',
    cardRadius: '20px',
    cardPadding: '25px',
    numberBadgeStyle: 'star',
    numberBadgeBackground: '#FFD700',
    numberBadgeColor: '#FF0000',
    questionStyle: {
      background: 'transparent',
      padding: '15px',
      borderRadius: '15px',
      color: '#FF0000',
      fontFamily: '"Bungee", cursive',
      fontSize: '18px',
      border: '3px solid #FFD700',
      boxShadow: 'inset 0 0 15px rgba(255,215,0,0.2)'
    },
    decorations: {
      type: 'emoji',
      elements: ['🎪', '🤹', '🎭', '🎨', '🎠', '🤡'],
      animation: 'juggle'
    }
  },

  // GAME & TECH THEMES
  {
    name: '🎮 Video Game',
    style: 'game',
    cardBackground: 'linear-gradient(135deg, #667EEA 0%, #764BA2 50%, #F093FB 100%)',
    cardBorder: '3px solid #00FF00',
    cardShadow: '0 0 20px rgba(0,255,0,0.5), 0 5px 15px rgba(0,0,0,0.3)',
    cardRadius: '10px',
    cardPadding: '25px',
    numberBadgeStyle: 'gem',
    numberBadgeBackground: '#00FF00',
    numberBadgeColor: '#000000',
    questionStyle: {
      background: 'transparent',
      padding: '15px',
      borderRadius: '5px',
      color: '#00FF00',
      fontFamily: '"Press Start 2P", monospace',
      fontSize: '14px',
      textShadow: '0 0 5px #00FF00',
      border: '2px solid #00FF00',
      boxShadow: '0 0 10px rgba(0,255,0,0.3), inset 0 0 10px rgba(0,255,0,0.1)'
    },
    decorations: {
      type: 'emoji',
      elements: ['🎮', '👾', '🕹️', '⚡', '💎'],
      animation: 'blink'
    },
    effects: {
      animation: 'glitch'
    }
  },

  {
    name: '🎯 Sports Arena',
    style: 'game',
    cardBackground: 'linear-gradient(135deg, #00C851 0%, #FFBB33 100%)',
    cardBorder: '3px solid #FF5722',
    cardShadow: '0 8px 16px rgba(255,87,34,0.3)',
    cardRadius: '15px',
    cardPadding: '25px',
    numberBadgeStyle: 'shield',
    numberBadgeBackground: '#FF5722',
    numberBadgeColor: '#FFFFFF',
    questionStyle: {
      background: 'transparent',
      padding: '15px',
      borderRadius: '10px',
      color: '#212121',
      fontFamily: '"Bebas Neue", cursive',
      fontSize: '20px',
      border: '3px solid #00C851',
      boxShadow: 'inset 0 0 10px rgba(0,200,81,0.1)'
    },
    decorations: {
      type: 'emoji',
      elements: ['⚽', '🏀', '⚾', '🎾', '🏆', '🥇'],
      animation: 'bounce'
    }
  },

  // SEASONAL & HOLIDAY THEMES
  {
    name: '❄️ Winter Wonderland',
    style: 'nature',
    cardBackground: 'linear-gradient(180deg, #B0E0E6 0%, #E0FFFF 50%, #FFFFFF 100%)',
    cardBorder: '3px solid #4682B4',
    cardShadow: '0 8px 20px rgba(70,130,180,0.3), inset 0 0 20px rgba(255,255,255,0.5)',
    cardRadius: '25px',
    cardPadding: '25px',
    numberBadgeStyle: 'cloud',
    numberBadgeBackground: '#4682B4',
    numberBadgeColor: '#FFFFFF',
    questionStyle: {
      background: 'transparent',
      padding: '15px',
      borderRadius: '20px',
      color: '#2C5F7C',
      fontFamily: '"Comfortaa", cursive',
      fontSize: '18px',
      border: '3px solid #B0E0E6',
      boxShadow: 'inset 0 0 20px rgba(176,224,230,0.2)'
    },
    decorations: {
      type: 'emoji',
      elements: ['❄️', '⛄', '🎿', '☃️', '🏔️'],
      animation: 'fall'
    }
  },

  {
    name: '🎃 Spooky Fun',
    style: 'adventure',
    cardBackground: 'linear-gradient(135deg, #FF6600 0%, #663399 50%, #000000 100%)',
    cardBorder: '3px solid #FF6600',
    cardShadow: '0 10px 30px rgba(255,102,0,0.4), 0 0 20px rgba(102,51,153,0.3)',
    cardRadius: '20px',
    cardPadding: '25px',
    numberBadgeStyle: 'star',
    numberBadgeBackground: '#FF6600',
    numberBadgeColor: '#000000',
    questionStyle: {
      background: 'transparent',
      backdropFilter: 'blur(2px)',
      padding: '15px',
      borderRadius: '15px',
      color: '#FFA500',
      fontFamily: '"Creepster", cursive',
      fontSize: '18px',
      textShadow: '2px 2px 4px #663399',
      border: '3px solid rgba(255,102,0,0.5)',
      boxShadow: '0 0 15px rgba(102,51,153,0.3)'
    },
    decorations: {
      type: 'emoji',
      elements: ['🎃', '👻', '🦇', '🕷️', '🌙'],
      animation: 'spooky'
    },
    effects: {
      glow: true
    }
  },

  // === NEW THEMES - More Quebec/Educational Focused ===

  {
    name: '📖 Storybook Magic',
    style: 'fun',
    cardBackground: 'linear-gradient(135deg, #FFF5E6 0%, #FFE0B2 100%)',
    cardBorder: '3px solid #8B4513',
    cardShadow: '0 6px 20px rgba(139, 69, 19, 0.2)',
    cardRadius: '20px',
    numberBadgeStyle: 'bubble',
    numberBadgeBackground: '#D2691E',
    numberBadgeColor: '#FFFFFF',
    primary: '#8B4513',
    questionStyle: {
      background: 'transparent',
      border: '3px dashed #D2691E',
      padding: '20px',
      borderRadius: '15px',
      fontSize: '18px',
      color: '#5D4037',
      fontFamily: '"Georgia", serif',
      boxShadow: 'inset 0 0 15px rgba(210,105,30,0.1)'
    },
    decorations: {
      type: 'shapes',
      elements: ['📚', '✨', '🔮'],
      pattern: 'scattered'
    }
  },

  {
    name: '🍁 Maple Autumn',
    style: 'fun',
    cardBackground: 'linear-gradient(135deg, #FFF8E1 0%, #FFE0B2 100%)',
    cardBorder: '3px solid #D84315',
    cardShadow: '0 8px 25px rgba(216, 67, 21, 0.15)',
    cardRadius: '18px',
    numberBadgeStyle: 'rounded-square',
    numberBadgeBackground: '#E65100',
    numberBadgeColor: '#FFFFFF',
    primary: '#D84315',
    questionStyle: {
      background: 'transparent',
      border: '3px solid #FF6F00',
      padding: '18px',
      borderRadius: '12px',
      fontSize: '17px',
      color: '#4E342E',
      fontFamily: '"Trebuchet MS", sans-serif',
      boxShadow: 'inset 0 0 12px rgba(255,111,0,0.1)'
    },
    decorations: {
      type: 'shapes',
      elements: ['🍁', '🍂', '🌰'],
      pattern: 'corners'
    }
  },

  {
    name: '🎯 Sports Champions',
    style: 'fun',
    cardBackground: 'linear-gradient(135deg, #E8F5E9 0%, #C8E6C9 100%)',
    cardBorder: '3px solid #2E7D32',
    cardShadow: '0 6px 20px rgba(46, 125, 50, 0.2)',
    cardRadius: '15px',
    numberBadgeStyle: 'circle',
    numberBadgeBackground: '#388E3C',
    numberBadgeColor: '#FFFFFF',
    primary: '#2E7D32',
    questionStyle: {
      background: 'transparent',
      border: '3px solid #43A047',
      padding: '16px',
      borderRadius: '10px',
      fontSize: '17px',
      color: '#1B5E20',
      fontFamily: '"Arial Black", sans-serif',
      boxShadow: 'inset 0 0 10px rgba(67,160,71,0.15)'
    },
    decorations: {
      type: 'shapes',
      elements: ['⚽', '🏒', '🏀', '⚾'],
      pattern: 'random'
    }
  },

  {
    name: '🔬 Science Lab',
    style: 'fun',
    cardBackground: 'linear-gradient(135deg, #E1F5FE 0%, #B3E5FC 100%)',
    cardBorder: '3px solid #0277BD',
    cardShadow: '0 8px 24px rgba(2, 119, 189, 0.15)',
    cardRadius: '12px',
    numberBadgeStyle: 'chip',
    numberBadgeBackground: '#01579B',
    numberBadgeColor: '#FFFFFF',
    primary: '#0277BD',
    questionStyle: {
      background: 'transparent',
      border: '3px solid #0288D1',
      padding: '18px',
      borderRadius: '8px',
      fontSize: '16px',
      color: '#01579B',
      fontFamily: '"Courier New", monospace',
      boxShadow: 'inset 0 0 8px rgba(2,136,209,0.1)'
    },
    decorations: {
      type: 'shapes',
      elements: ['🔬', '⚗️', '🧪', '🔭'],
      pattern: 'grid'
    }
  },

  {
    name: '🌍 World Explorer',
    style: 'fun',
    cardBackground: 'linear-gradient(135deg, #F3E5F5 0%, #E1BEE7 100%)',
    cardBorder: '3px solid #6A1B9A',
    cardShadow: '0 6px 20px rgba(106, 27, 154, 0.2)',
    cardRadius: '16px',
    numberBadgeStyle: 'bubble',
    numberBadgeBackground: '#7B1FA2',
    numberBadgeColor: '#FFFFFF',
    primary: '#6A1B9A',
    questionStyle: {
      background: 'transparent',
      border: '3px dashed #8E24AA',
      padding: '18px',
      borderRadius: '12px',
      fontSize: '17px',
      color: '#4A148C',
      fontFamily: '"Verdana", sans-serif',
      boxShadow: 'inset 0 0 12px rgba(142,36,170,0.1)'
    },
    decorations: {
      type: 'shapes',
      elements: ['🌍', '✈️', '🗺️', '🧭'],
      pattern: 'corners'
    }
  },

  {
    name: '🎭 Drama Theatre',
    style: 'fun',
    cardBackground: 'linear-gradient(135deg, #FCE4EC 0%, #F8BBD0 100%)',
    cardBorder: '3px solid #AD1457',
    cardShadow: '0 8px 25px rgba(173, 20, 87, 0.15)',
    cardRadius: '20px',
    numberBadgeStyle: 'rounded-square',
    numberBadgeBackground: '#C2185B',
    numberBadgeColor: '#FFFFFF',
    primary: '#AD1457',
    questionStyle: {
      background: 'transparent',
      border: '3px solid #D81B60',
      padding: '20px',
      borderRadius: '15px',
      fontSize: '18px',
      color: '#880E4F',
      fontFamily: '"Playfair Display", serif',
      boxShadow: 'inset 0 0 15px rgba(216,27,96,0.1)'
    },
    decorations: {
      type: 'shapes',
      elements: ['🎭', '🎬', '🎪', '🎨'],
      pattern: 'scattered'
    }
  },

  {
    name: '🌾 Farm Friends',
    style: 'fun',
    cardBackground: 'linear-gradient(135deg, #FFF9C4 0%, #FFF59D 100%)',
    cardBorder: '3px solid #F57F17',
    cardShadow: '0 6px 18px rgba(245, 127, 23, 0.15)',
    cardRadius: '18px',
    numberBadgeStyle: 'circle',
    numberBadgeBackground: '#F9A825',
    numberBadgeColor: '#FFFFFF',
    primary: '#F57F17',
    questionStyle: {
      background: 'transparent',
      border: '3px dotted #FFB300',
      padding: '18px',
      borderRadius: '12px',
      fontSize: '17px',
      color: '#E65100',
      fontFamily: '"Comic Neue", cursive',
      boxShadow: 'inset 0 0 12px rgba(255,179,0,0.1)'
    },
    decorations: {
      type: 'shapes',
      elements: ['🐄', '🐷', '🐔', '🌾', '🚜'],
      pattern: 'random'
    }
  },

  {
    name: '🏔️ Mountain Adventure',
    style: 'fun',
    cardBackground: 'linear-gradient(135deg, #E0F2F1 0%, #B2DFDB 100%)',
    cardBorder: '3px solid #00695C',
    cardShadow: '0 8px 22px rgba(0, 105, 92, 0.15)',
    cardRadius: '16px',
    numberBadgeStyle: 'chip',
    numberBadgeBackground: '#00796B',
    numberBadgeColor: '#FFFFFF',
    primary: '#00695C',
    questionStyle: {
      background: 'transparent',
      border: '3px solid #00897B',
      padding: '18px',
      borderRadius: '10px',
      fontSize: '17px',
      color: '#004D40',
      fontFamily: '"Montserrat", sans-serif',
      boxShadow: 'inset 0 0 10px rgba(0,137,123,0.1)'
    },
    decorations: {
      type: 'shapes',
      elements: ['🏔️', '⛺', '🥾', '🦌'],
      pattern: 'corners'
    }
  },

  {
    name: '🎼 Music Class',
    style: 'fun',
    cardBackground: 'linear-gradient(135deg, #EDE7F6 0%, #D1C4E9 100%)',
    cardBorder: '3px solid #512DA8',
    cardShadow: '0 6px 20px rgba(81, 45, 168, 0.2)',
    cardRadius: '20px',
    numberBadgeStyle: 'bubble',
    numberBadgeBackground: '#5E35B1',
    numberBadgeColor: '#FFFFFF',
    primary: '#512DA8',
    questionStyle: {
      background: 'transparent',
      border: '3px solid #673AB7',
      padding: '18px',
      borderRadius: '15px',
      fontSize: '17px',
      color: '#311B92',
      fontFamily: '"Dancing Script", cursive',
      boxShadow: 'inset 0 0 15px rgba(103,58,183,0.1)'
    },
    decorations: {
      type: 'shapes',
      elements: ['🎵', '🎼', '🎹', '🎸'],
      pattern: 'scattered'
    }
  },

  {
    name: '🏛️ History Quest',
    style: 'fun',
    cardBackground: 'linear-gradient(135deg, #EFEBE9 0%, #D7CCC8 100%)',
    cardBorder: '3px solid #5D4037',
    cardShadow: '0 8px 24px rgba(93, 64, 55, 0.15)',
    cardRadius: '14px',
    numberBadgeStyle: 'rounded-square',
    numberBadgeBackground: '#6D4C41',
    numberBadgeColor: '#FFFFFF',
    primary: '#5D4037',
    questionStyle: {
      background: 'transparent',
      border: '3px solid #795548',
      padding: '18px',
      borderRadius: '10px',
      fontSize: '17px',
      color: '#3E2723',
      fontFamily: '"Merriweather", serif',
      boxShadow: 'inset 0 0 10px rgba(121,85,72,0.1)'
    },
    decorations: {
      type: 'shapes',
      elements: ['🏛️', '📜', '⚔️', '👑'],
      pattern: 'grid'
    }
  }
];

// Helper function to get theme by index
export function getKidThemeByIndex(index: number | string): KidFriendlyTheme {
  if (typeof index === 'string' && index === 'auto') {
    return kidFriendlyThemes[Math.floor(Math.random() * kidFriendlyThemes.length)];
  }
  const numIndex = typeof index === 'number' ? index : parseInt(index, 10);
  return kidFriendlyThemes[numIndex % kidFriendlyThemes.length];
}

// Get all theme names for selection
export function getKidThemeNames(): Array<{ value: number; label: string }> {
  return kidFriendlyThemes.map((theme, index) => ({
    value: index,
    label: theme.name
  }));
}