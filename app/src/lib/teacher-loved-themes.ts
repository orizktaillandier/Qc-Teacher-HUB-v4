// Teacher-loved educational themes inspired by popular teaching resources
// These themes are designed to be fun, engaging, and perfect for classroom use

export interface TeacherTheme {
  name: string;
  background: string;
  pattern?: string;
  contentBackground: string;
  contentBorder: string;
  contentBorderStyle?: string;
  borderRadius: string;
  numberBadge: {
    shape: 'star' | 'circle' | 'cloud' | 'hexagon';
    background: string;
    color: string;
    border?: string;
  };
  decorativeElements?: string[];
  illustration?: string;
  category: 'cute' | 'elegant' | 'fun' | 'educational';
  fontFamily?: string;
}

export const teacherLovedThemes: TeacherTheme[] = [
  // Cute Animal Friends
  {
    name: '🐻 Ourson Mignon',
    background: 'linear-gradient(135deg, #ffeaa7 0%, #fdcb6e 100%)',
    pattern: 'radial-gradient(circle, rgba(255,255,255,0.3) 2px, transparent 2px)',
    contentBackground: '#ffffff',
    contentBorder: '3px solid #fdcb6e',
    contentBorderStyle: 'dashed',
    borderRadius: '25px',
    numberBadge: {
      shape: 'circle',
      background: '#ff7675',
      color: '#ffffff',
      border: '3px solid #ffffff'
    },
    decorativeElements: ['🐻', '🐝', '🌻'],
    category: 'cute',
    fontFamily: '"Fredoka", "Comic Sans MS", cursive'
  },

  // Ice Cream Shop
  {
    name: '🍦 Crèmerie',
    background: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)',
    pattern: 'radial-gradient(circle, rgba(255,255,255,0.4) 8px, transparent 8px)',
    contentBackground: '#ffffff',
    contentBorder: '4px solid #ffffff',
    borderRadius: '30px 30px 10px 10px',
    numberBadge: {
      shape: 'star',
      background: '#ffeaa7',
      color: '#2d3436',
      border: '2px solid #fdcb6e'
    },
    decorativeElements: ['🍦', '🍨', '🧁'],
    category: 'fun',
    fontFamily: '"Bubblegum Sans", "Fredoka", cursive'
  },

  // School Supplies
  {
    name: '✏️ École Joyeuse',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    pattern: 'repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,0.1) 35px, rgba(255,255,255,0.1) 70px)',
    contentBackground: '#ffffff',
    contentBorder: '3px solid #667eea',
    borderRadius: '15px',
    numberBadge: {
      shape: 'hexagon',
      background: '#f39c12',
      color: '#ffffff'
    },
    decorativeElements: ['✏️', '📚', '🎨'],
    category: 'educational',
    fontFamily: '"Quicksand", "Comfortaa", sans-serif'
  },

  // Sweet Donuts
  {
    name: '🍩 Beignets Sucrés',
    background: 'linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)',
    pattern: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
    contentBackground: '#ffffff',
    contentBorder: '3px dashed #ff6b9d',
    borderRadius: '20px',
    numberBadge: {
      shape: 'circle',
      background: 'linear-gradient(135deg, #ff6b9d 0%, #feca57 100%)',
      color: '#ffffff'
    },
    decorativeElements: ['🍩', '🧁', '🍪'],
    category: 'fun',
    fontFamily: '"Kalam", "Patrick Hand", cursive'
  },

  // Ocean Adventure
  {
    name: '🐠 Océan',
    background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    pattern: 'linear-gradient(45deg, rgba(255,255,255,0.1) 25%, transparent 25%, transparent 75%, rgba(255,255,255,0.1) 75%, rgba(255,255,255,0.1))',
    contentBackground: '#ffffff',
    contentBorder: '4px solid #4facfe',
    contentBorderStyle: 'solid',
    borderRadius: '25px 5px 25px 5px',
    numberBadge: {
      shape: 'cloud',
      background: '#ffffff',
      color: '#4facfe',
      border: '2px solid #4facfe'
    },
    decorativeElements: ['🐠', '🐙', '🦀', '⭐'],
    category: 'cute',
    fontFamily: '"Fredoka", "Baloo 2", cursive'
  },

  // Garden Party
  {
    name: '🌻 Jardin Fleuri',
    background: 'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)',
    pattern: 'radial-gradient(ellipse, rgba(255,255,255,0.3) 10%, transparent 10%)',
    contentBackground: '#ffffff',
    contentBorder: '3px solid #84fab0',
    borderRadius: '50px 20px 50px 20px',
    numberBadge: {
      shape: 'star',
      background: '#ff6b9d',
      color: '#ffffff'
    },
    decorativeElements: ['🌻', '🦋', '🐝', '🌺'],
    category: 'cute',
    fontFamily: '"Caveat", "Kalam", cursive'
  },

  // Space Explorer
  {
    name: '🚀 Espace',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    pattern: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
    contentBackground: '#ffffff',
    contentBorder: '3px solid #667eea',
    borderRadius: '15px',
    numberBadge: {
      shape: 'circle',
      background: '#f39c12',
      color: '#ffffff'
    },
    decorativeElements: ['🚀', '🌟', '🪐', '⭐'],
    category: 'educational',
    fontFamily: '"Orbitron", "Russo One", sans-serif'
  },

  // Fruit Market
  {
    name: '🍓 Marché Fruité',
    background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    pattern: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.2) 10px, rgba(255,255,255,0.2) 20px)',
    contentBackground: '#ffffff',
    contentBorder: '3px solid #fa709a',
    contentBorderStyle: 'solid',
    borderRadius: '25px',
    numberBadge: {
      shape: 'star',
      background: '#48dbfb',
      color: '#ffffff'
    },
    decorativeElements: ['🍓', '🍎', '🍊', '🍇'],
    category: 'fun',
    fontFamily: '"Fredoka", "Baloo Bhai 2", cursive'
  },

  // Dinosaur Discovery
  {
    name: '🦕 Dinosaures',
    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    pattern: 'repeating-linear-gradient(90deg, transparent, transparent 50px, rgba(255,255,255,0.1) 50px, rgba(255,255,255,0.1) 100px)',
    contentBackground: '#ffffff',
    contentBorder: '4px solid #4a69bd',
    borderRadius: '20px',
    numberBadge: {
      shape: 'hexagon',
      background: '#6ab04c',
      color: '#ffffff'
    },
    decorativeElements: ['🦕', '🦖', '🌋'],
    category: 'educational',
    fontFamily: '"Creepster", "Fredoka", cursive'
  },

  // Rainbow Dreams
  {
    name: '🌈 Arc-en-ciel',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    pattern: 'linear-gradient(45deg, rgba(255,255,255,0.1) 25%, transparent 25%)',
    contentBackground: '#ffffff',
    contentBorder: '3px dashed #e056fd',
    borderRadius: '30px',
    numberBadge: {
      shape: 'cloud',
      background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      color: '#ffffff'
    },
    decorativeElements: ['🌈', '☁️', '⭐', '✨'],
    category: 'fun',
    fontFamily: '"Pacifico", "Fredoka", cursive'
  },

  // Farm Friends
  {
    name: '🐄 Ferme',
    background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
    pattern: 'repeating-linear-gradient(0deg, transparent, transparent 35px, rgba(255,255,255,0.15) 35px, rgba(255,255,255,0.15) 70px)',
    contentBackground: '#ffffff',
    contentBorder: '3px solid #ff7979',
    borderRadius: '20px',
    numberBadge: {
      shape: 'circle',
      background: '#6ab04c',
      color: '#ffffff'
    },
    decorativeElements: ['🐄', '🐷', '🐓', '🌾'],
    category: 'cute',
    fontFamily: '"Schoolbell", "Kalam", cursive'
  },

  // Music Festival
  {
    name: '🎵 Musique',
    background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    pattern: 'radial-gradient(circle, rgba(255,255,255,0.3) 3px, transparent 3px)',
    contentBackground: '#ffffff',
    contentBorder: '3px solid #ff6b9d',
    borderRadius: '15px 50px 15px 50px',
    numberBadge: {
      shape: 'star',
      background: '#48dbfb',
      color: '#ffffff'
    },
    decorativeElements: ['🎵', '🎸', '🎹', '🎤'],
    category: 'fun',
    fontFamily: '"Concert One", "Fredoka", cursive'
  },

  // Candy Shop
  {
    name: '🍭 Bonbons',
    background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
    pattern: 'repeating-linear-gradient(45deg, #ff6b9d, #ff6b9d 10px, #feca57 10px, #feca57 20px)',
    contentBackground: '#ffffff',
    contentBorder: '4px solid #ff6b9d',
    contentBorderStyle: 'solid',
    borderRadius: '25px',
    numberBadge: {
      shape: 'circle',
      background: 'linear-gradient(135deg, #ff6b9d 0%, #feca57 100%)',
      color: '#ffffff'
    },
    decorativeElements: ['🍭', '🍬', '🍫'],
    category: 'fun',
    fontFamily: '"Bubblegum Sans", "Fredoka", cursive'
  },

  // Forest Adventure
  {
    name: '🦊 Forêt Magique',
    background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    pattern: 'radial-gradient(circle, rgba(255,255,255,0.2) 2px, transparent 2px)',
    contentBackground: '#ffffff',
    contentBorder: '3px solid #27ae60',
    borderRadius: '30px 10px 30px 10px',
    numberBadge: {
      shape: 'star',
      background: '#e67e22',
      color: '#ffffff'
    },
    decorativeElements: ['🦊', '🦌', '🌲', '🍄'],
    category: 'cute',
    fontFamily: '"Patrick Hand", "Caveat", cursive'
  },

  // Weather Station
  {
    name: '☀️ Météo',
    background: 'linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)',
    pattern: 'linear-gradient(to right, rgba(255,255,255,0.1) 50%, transparent 50%)',
    contentBackground: '#ffffff',
    contentBorder: '3px solid #66a6ff',
    borderRadius: '20px',
    numberBadge: {
      shape: 'cloud',
      background: '#feca57',
      color: '#2d3436'
    },
    decorativeElements: ['☀️', '☁️', '🌧️', '⛈️'],
    category: 'educational',
    fontFamily: '"Comfortaa", "Quicksand", sans-serif'
  },

  // NEW THEMES BATCH 2

  // Unicorn Dreams
  {
    name: '🦄 Licorne Magique',
    background: 'linear-gradient(135deg, #fcc5e4 0%, #fda34b 35%, #ff7882 60%, #c8699e 100%)',
    pattern: 'radial-gradient(circle, rgba(255,255,255,0.4) 3px, transparent 3px)',
    contentBackground: '#ffffff',
    contentBorder: '3px dashed #ff7882',
    borderRadius: '30px',
    numberBadge: {
      shape: 'star',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: '#ffffff'
    },
    decorativeElements: ['🦄', '⭐', '💫', '🌈'],
    category: 'cute',
    fontFamily: '"Satisfy", "Pacifico", cursive'
  },

  // Pizza Party
  {
    name: '🍕 Pizza Party',
    background: 'linear-gradient(135deg, #ff9a56 0%, #ff6a88 100%)',
    pattern: 'repeating-linear-gradient(45deg, transparent, transparent 15px, rgba(255,255,255,0.1) 15px, rgba(255,255,255,0.1) 30px)',
    contentBackground: '#ffffff',
    contentBorder: '3px solid #ff6a88',
    borderRadius: '25px',
    numberBadge: {
      shape: 'circle',
      background: '#2ed573',
      color: '#ffffff',
      border: '3px solid #ffffff'
    },
    decorativeElements: ['🍕', '🧀', '🍅', '🌶️'],
    category: 'fun',
    fontFamily: '"Fredoka", "Bubblegum Sans", cursive'
  },

  // Butterfly Garden
  {
    name: '🦋 Jardin Papillons',
    background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
    pattern: 'radial-gradient(ellipse, rgba(255,255,255,0.3) 20%, transparent 20%)',
    contentBackground: '#ffffff',
    contentBorder: '3px solid #fcb69f',
    contentBorderStyle: 'solid',
    borderRadius: '35px 10px 35px 10px',
    numberBadge: {
      shape: 'hexagon',
      background: '#ff6348',
      color: '#ffffff'
    },
    decorativeElements: ['🦋', '🌸', '🌺', '🌼'],
    category: 'cute',
    fontFamily: '"Dancing Script", "Caveat", cursive'
  },

  // Construction Zone
  {
    name: '🚧 Construction',
    background: 'linear-gradient(135deg, #f7b733 0%, #fc4a1a 100%)',
    pattern: 'repeating-linear-gradient(90deg, rgba(0,0,0,0.1) 0px, rgba(0,0,0,0.1) 10px, transparent 10px, transparent 20px)',
    contentBackground: '#ffffff',
    contentBorder: '4px solid #fc4a1a',
    borderRadius: '10px',
    numberBadge: {
      shape: 'square',
      background: '#2d3436',
      color: '#f7b733'
    },
    decorativeElements: ['🚧', '🔨', '👷', '🚜'],
    category: 'educational',
    fontFamily: '"Righteous", "Russo One", sans-serif'
  },

  // Superhero Academy
  {
    name: '🦸 Super-Héros',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    pattern: 'linear-gradient(45deg, rgba(255,255,255,0.1) 25%, transparent 25%, transparent 75%, rgba(255,255,255,0.1) 75%)',
    contentBackground: '#ffffff',
    contentBorder: '3px solid #667eea',
    borderRadius: '15px',
    numberBadge: {
      shape: 'star',
      background: '#feca57',
      color: '#2d3436'
    },
    decorativeElements: ['🦸', '⚡', '💪', '🌟'],
    category: 'fun',
    fontFamily: '"Bangers", "Fredoka", cursive'
  },

  // Bakery Delights
  {
    name: '🥐 Boulangerie',
    background: 'linear-gradient(135deg, #ffeaa7 0%, #fab1a0 100%)',
    pattern: 'radial-gradient(circle, rgba(255,255,255,0.3) 2px, transparent 2px)',
    contentBackground: '#ffffff',
    contentBorder: '3px dashed #fab1a0',
    borderRadius: '20px',
    numberBadge: {
      shape: 'circle',
      background: '#74b9ff',
      color: '#ffffff'
    },
    decorativeElements: ['🥐', '🥖', '🧁', '🍞'],
    category: 'fun',
    fontFamily: '"Patrick Hand", "Kalam", cursive'
  },

  // Safari Adventure
  {
    name: '🦁 Safari',
    background: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)',
    pattern: 'repeating-linear-gradient(0deg, transparent, transparent 20px, rgba(255,255,255,0.1) 20px, rgba(255,255,255,0.1) 40px)',
    contentBackground: '#ffffff',
    contentBorder: '3px solid #fda085',
    borderRadius: '25px',
    numberBadge: {
      shape: 'hexagon',
      background: '#55a3ff',
      color: '#ffffff'
    },
    decorativeElements: ['🦁', '🦒', '🦓', '🐘'],
    category: 'cute',
    fontFamily: '"Baloo 2", "Fredoka", cursive'
  },

  // Art Studio
  {
    name: '🎨 Atelier d\'Art',
    background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    pattern: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.15) 10px, rgba(255,255,255,0.15) 20px)',
    contentBackground: '#ffffff',
    contentBorder: '3px solid #fa709a',
    borderRadius: '20px',
    numberBadge: {
      shape: 'circle',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: '#ffffff'
    },
    decorativeElements: ['🎨', '🖌️', '✏️', '🖍️'],
    category: 'educational',
    fontFamily: '"Indie Flower", "Caveat", cursive'
  },

  // Robot Factory
  {
    name: '🤖 Robots',
    background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    pattern: 'linear-gradient(90deg, transparent 50%, rgba(255,255,255,0.1) 50%)',
    contentBackground: '#ffffff',
    contentBorder: '3px solid #4facfe',
    borderRadius: '10px',
    numberBadge: {
      shape: 'square',
      background: '#ff6b6b',
      color: '#ffffff'
    },
    decorativeElements: ['🤖', '⚙️', '🔧', '💡'],
    category: 'educational',
    fontFamily: '"Orbitron", "Share Tech Mono", monospace'
  },

  // Carnival Fun
  {
    name: '🎪 Carnaval',
    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    pattern: 'repeating-linear-gradient(45deg, #f093fb, #f093fb 10px, #f5576c 10px, #f5576c 20px)',
    contentBackground: '#ffffff',
    contentBorder: '4px solid #f5576c',
    contentBorderStyle: 'solid',
    borderRadius: '25px',
    numberBadge: {
      shape: 'star',
      background: '#feca57',
      color: '#2d3436'
    },
    decorativeElements: ['🎪', '🎠', '🎡', '🎢'],
    category: 'fun',
    fontFamily: '"Bungee", "Fredoka", cursive'
  },

  // Sports Champions
  {
    name: '⚽ Champions',
    background: 'linear-gradient(135deg, #00d2ff 0%, #3a47d5 100%)',
    pattern: 'radial-gradient(circle, rgba(255,255,255,0.2) 1px, transparent 1px)',
    contentBackground: '#ffffff',
    contentBorder: '3px solid #3a47d5',
    borderRadius: '15px',
    numberBadge: {
      shape: 'circle',
      background: '#ff6b6b',
      color: '#ffffff',
      border: '2px solid #ffffff'
    },
    decorativeElements: ['⚽', '🏀', '🏈', '🏆'],
    category: 'fun',
    fontFamily: '"Sigmar One", "Fredoka", cursive'
  },

  // Princess Castle
  {
    name: '👑 Château Royal',
    background: 'linear-gradient(135deg, #fbc2eb 0%, #a18cd1 100%)',
    pattern: 'radial-gradient(circle, rgba(255,255,255,0.4) 4px, transparent 4px)',
    contentBackground: '#ffffff',
    contentBorder: '3px dashed #a18cd1',
    borderRadius: '30px 30px 10px 10px',
    numberBadge: {
      shape: 'star',
      background: 'linear-gradient(135deg, #fbc2eb 0%, #a18cd1 100%)',
      color: '#ffffff'
    },
    decorativeElements: ['👑', '🏰', '✨', '💎'],
    category: 'cute',
    fontFamily: '"Princess Sofia", "Pacifico", cursive'
  },

  // Camping Adventure
  {
    name: '🏕️ Camping',
    background: 'linear-gradient(135deg, #96e6a1 0%, #d4fc79 100%)',
    pattern: 'repeating-linear-gradient(60deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)',
    contentBackground: '#ffffff',
    contentBorder: '3px solid #96e6a1',
    borderRadius: '20px',
    numberBadge: {
      shape: 'hexagon',
      background: '#f39c12',
      color: '#ffffff'
    },
    decorativeElements: ['🏕️', '🔥', '🌲', '⛺'],
    category: 'educational',
    fontFamily: '"Amatic SC", "Kalam", cursive'
  },

  // Birthday Party
  {
    name: '🎂 Fête',
    background: 'linear-gradient(135deg, #ff9ff3 0%, #feca57 100%)',
    pattern: 'radial-gradient(circle, rgba(255,255,255,0.3) 3px, transparent 3px)',
    contentBackground: '#ffffff',
    contentBorder: '3px solid #ff9ff3',
    contentBorderStyle: 'solid',
    borderRadius: '25px',
    numberBadge: {
      shape: 'circle',
      background: 'linear-gradient(135deg, #48dbfb 0%, #0abde3 100%)',
      color: '#ffffff'
    },
    decorativeElements: ['🎂', '🎈', '🎁', '🎉'],
    category: 'fun',
    fontFamily: '"Fredoka", "Bubblegum Sans", cursive'
  },

  // NEW THEMES BATCH 3 - UNIQUE & ORIGINAL

  // Classic Blackboard
  {
    name: '📝 Tableau Noir',
    background: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)',
    pattern: 'repeating-linear-gradient(0deg, transparent, transparent 30px, rgba(255,255,255,0.02) 30px, rgba(255,255,255,0.02) 31px)',
    contentBackground: '#2b3e50',
    contentBorder: '4px solid #f1c40f',
    contentBorderStyle: 'solid',
    borderRadius: '8px',
    numberBadge: {
      shape: 'circle',
      background: '#e74c3c',
      color: '#ffffff',
      border: '2px solid #f1c40f'
    },
    decorativeElements: ['📝', '✏️', '📐', '📏'],
    category: 'educational',
    fontFamily: '"Kalam", "Permanent Marker", cursive'
  },

  // Retro Arcade
  {
    name: '🕹️ Arcade Rétro',
    background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
    pattern: 'radial-gradient(circle, #ff00ff 1px, transparent 1px), radial-gradient(circle, #00ffff 1px, transparent 1px)',
    contentBackground: '#1a1a2e',
    contentBorder: '3px solid #00ff00',
    borderRadius: '0px',
    numberBadge: {
      shape: 'square',
      background: '#ff00ff',
      color: '#00ff00'
    },
    decorativeElements: ['🕹️', '👾', '🎮', '🏆'],
    category: 'fun',
    fontFamily: '"Press Start 2P", "Orbitron", monospace'
  },

  // Vintage Paper
  {
    name: '📜 Papier Ancien',
    background: 'linear-gradient(135deg, #f4e8d0 0%, #e8dab3 100%)',
    pattern: 'repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(139,69,19,0.05) 2px, rgba(139,69,19,0.05) 4px)',
    contentBackground: '#faf6ed',
    contentBorder: '2px solid #8b4513',
    contentBorderStyle: 'double',
    borderRadius: '5px',
    numberBadge: {
      shape: 'circle',
      background: '#8b4513',
      color: '#faf6ed'
    },
    decorativeElements: ['📜', '🪶', '📖', '🕰️'],
    category: 'elegant',
    fontFamily: '"Cinzel", "Playfair Display", serif'
  },

  // Neon Lights
  {
    name: '💡 Néon',
    background: 'linear-gradient(135deg, #0d0d0d 0%, #1a1a1a 100%)',
    pattern: 'linear-gradient(45deg, rgba(255,0,255,0.1) 25%, transparent 25%, transparent 75%, rgba(0,255,255,0.1) 75%)',
    contentBackground: '#0d0d0d',
    contentBorder: '2px solid #ff00ff',
    borderRadius: '20px',
    numberBadge: {
      shape: 'circle',
      background: 'linear-gradient(135deg, #ff00ff 0%, #00ffff 100%)',
      color: '#ffffff'
    },
    decorativeElements: ['💡', '✨', '⚡', '🌟'],
    category: 'fun',
    fontFamily: '"Monoton", "Bungee", cursive'
  },

  // Winter Wonderland
  {
    name: '❄️ Hiver Féerique',
    background: 'linear-gradient(135deg, #e6f2ff 0%, #cce7ff 100%)',
    pattern: 'radial-gradient(circle, #ffffff 2px, transparent 2px)',
    contentBackground: '#ffffff',
    contentBorder: '3px solid #4a90e2',
    contentBorderStyle: 'solid',
    borderRadius: '25px',
    numberBadge: {
      shape: 'hexagon',
      background: '#4a90e2',
      color: '#ffffff'
    },
    decorativeElements: ['❄️', '⛄', '🎿', '🏔️'],
    category: 'cute',
    fontFamily: '"Comfortaa", "Quicksand", sans-serif'
  },

  // Notebook Lines
  {
    name: '📓 Cahier Ligné',
    background: 'linear-gradient(to bottom, #ffffff 0%, #f8f8f8 100%)',
    pattern: 'repeating-linear-gradient(0deg, transparent, transparent 29px, #e0e0e0 29px, #e0e0e0 30px), linear-gradient(90deg, transparent, transparent 49px, #ff7b7b 49px, #ff7b7b 51px, transparent 51px)',
    contentBackground: '#ffffff',
    contentBorder: 'none',
    borderRadius: '0px',
    numberBadge: {
      shape: 'circle',
      background: '#ff7b7b',
      color: '#ffffff'
    },
    decorativeElements: ['📓', '✏️', '📎', '📌'],
    category: 'educational',
    fontFamily: '"Architects Daughter", "Kalam", cursive'
  },

  // Underwater Ocean
  {
    name: '🌊 Fond Marin',
    background: 'linear-gradient(180deg, #006994 0%, #003d5c 50%, #001a2c 100%)',
    pattern: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)',
    contentBackground: 'rgba(0, 105, 148, 0.3)',
    contentBorder: '3px solid #00bfa5',
    borderRadius: '30px',
    numberBadge: {
      shape: 'cloud',
      background: '#00bfa5',
      color: '#ffffff'
    },
    decorativeElements: ['🌊', '🐟', '🪸', '🦈'],
    category: 'cute',
    fontFamily: '"Baloo 2", "Fredoka", cursive'
  },

  // Autumn Leaves
  {
    name: '🍂 Automne Doré',
    background: 'linear-gradient(135deg, #d4a574 0%, #c87941 50%, #a0522d 100%)',
    pattern: 'repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(255,140,0,0.1) 20px, rgba(255,140,0,0.1) 40px)',
    contentBackground: '#fff8f0',
    contentBorder: '3px solid #d2691e',
    contentBorderStyle: 'solid',
    borderRadius: '15px',
    numberBadge: {
      shape: 'star',
      background: '#ff8c00',
      color: '#ffffff'
    },
    decorativeElements: ['🍂', '🍁', '🌰', '🦔'],
    category: 'cute',
    fontFamily: '"Courgette", "Patrick Hand", cursive'
  },

  // Science Lab
  {
    name: '🧪 Laboratoire',
    background: 'linear-gradient(135deg, #f0f0f0 0%, #d0d0d0 100%)',
    pattern: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,150,136,0.05) 10px, rgba(0,150,136,0.05) 20px)',
    contentBackground: '#ffffff',
    contentBorder: '2px solid #009688',
    borderRadius: '10px',
    numberBadge: {
      shape: 'hexagon',
      background: '#4caf50',
      color: '#ffffff'
    },
    decorativeElements: ['🧪', '🔬', '⚗️', '🧬'],
    category: 'educational',
    fontFamily: '"Roboto Mono", "Share Tech Mono", monospace'
  },

  // Comic Book
  {
    name: '💥 Bande Dessinée',
    background: 'linear-gradient(135deg, #ff6b6b 0%, #ffd166 100%)',
    pattern: 'radial-gradient(circle, #000000 1px, transparent 1px)',
    contentBackground: '#ffffff',
    contentBorder: '4px solid #000000',
    borderRadius: '15px',
    numberBadge: {
      shape: 'star',
      background: '#000000',
      color: '#ffd166'
    },
    decorativeElements: ['💥', '💬', '⚡', '🦸'],
    category: 'fun',
    fontFamily: '"Bangers", "Bungee", cursive'
  },

  // ===== DETAILED QUEBEC THEMES =====

  // 1. Cabane à Sucre (Sugar Shack) Theme
  {
    name: '🍁 Cabane à Sucre',
    background: 'linear-gradient(180deg, #8B4513 0%, #A0522D 50%, #DEB887 100%)',
    pattern: `repeating-linear-gradient(
      90deg,
      #6B3410,
      #6B3410 2px,
      #8B4513 2px,
      #8B4513 20px,
      #7B3F1D 20px,
      #7B3F1D 22px,
      #8B4513 22px,
      #8B4513 40px
    )`,
    contentBackground: 'linear-gradient(135deg, #FFF8E7 0%, #FAEBD7 100%)',
    contentBorder: '4px solid #8B4513',
    contentBorderStyle: 'solid',
    borderRadius: '15px',
    numberBadge: {
      shape: 'circle',
      background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
      color: '#8B4513',
      border: '3px solid #8B4513'
    },
    decorativeElements: ['🍁', '🥞', '🍯', '🌳'],
    category: 'educational',
    fontFamily: '"Fredoka", "Cabin Sketch", cursive'
  },

  // 2. Underwater St. Lawrence River Theme
  {
    name: '🌊 Fleuve Saint-Laurent',
    background: 'linear-gradient(180deg, #001f3f 0%, #003366 30%, #004080 60%, #0066cc 100%)',
    pattern: `radial-gradient(ellipse at top, rgba(255,255,255,0.1) 0%, transparent 70%),
              radial-gradient(circle at 20% 80%, rgba(0,255,255,0.2) 0%, transparent 50%),
              radial-gradient(circle at 80% 80%, rgba(0,255,255,0.15) 0%, transparent 50%)`,
    contentBackground: 'radial-gradient(ellipse, rgba(255,255,255,0.95) 0%, rgba(230,248,255,0.9) 100%)',
    contentBorder: '5px solid #003366',
    contentBorderStyle: 'double',
    borderRadius: '50% 50% 45% 45% / 60% 60% 40% 40%',
    numberBadge: {
      shape: 'circle',
      background: 'radial-gradient(circle, #FFD700 0%, #B8860B 100%)',
      color: '#003366',
      border: '3px ridge #8B7355'
    },
    decorativeElements: ['🐟', '🌊', '🦭', '⚓'],
    category: 'educational',
    fontFamily: '"Comfortaa", "Quicksand", sans-serif'
  },

  // 3. Quebec Winter Festival Theme
  {
    name: '❄️ Carnaval d\'Hiver',
    background: 'linear-gradient(135deg, #E0F4FF 0%, #B8E3FF 50%, #87CEEB 100%)',
    pattern: `radial-gradient(circle at 20% 50%, rgba(255,255,255,0.8) 0%, transparent 2%),
              radial-gradient(circle at 80% 30%, rgba(255,255,255,0.6) 0%, transparent 2%),
              radial-gradient(circle at 40% 70%, rgba(255,255,255,0.7) 0%, transparent 2%),
              radial-gradient(circle at 60% 20%, rgba(255,255,255,0.9) 0%, transparent 2%)`,
    contentBackground: 'linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(240,248,255,0.95) 100%)',
    contentBorder: '3px solid #4682B4',
    contentBorderStyle: 'solid',
    borderRadius: '20px',
    numberBadge: {
      shape: 'star',
      background: 'linear-gradient(135deg, #FF6B6B 0%, #DC143C 100%)',
      color: '#FFFFFF',
      border: '2px solid #FFFFFF'
    },
    decorativeElements: ['⛷️', '⛸️', '🎿', '☃️'],
    category: 'fun',
    fontFamily: '"Fredoka", "Bubblegum Sans", cursive'
  },

  // 4. Habitant Farm Theme
  {
    name: '🌾 Ferme Habitant',
    background: 'linear-gradient(180deg, #87CEEB 0%, #87CEEB 40%, #90EE90 40%, #8FBC8F 100%)',
    pattern: `repeating-linear-gradient(
      90deg,
      transparent,
      transparent 20px,
      rgba(139,69,19,0.1) 20px,
      rgba(139,69,19,0.1) 21px
    ),
    repeating-linear-gradient(
      0deg,
      transparent,
      transparent 20px,
      rgba(139,69,19,0.1) 20px,
      rgba(139,69,19,0.1) 21px
    )`,
    contentBackground: 'linear-gradient(135deg, #FFF8DC 0%, #F5DEB3 100%)',
    contentBorder: '3px solid #8B4513',
    contentBorderStyle: 'solid',
    borderRadius: '10px',
    numberBadge: {
      shape: 'hexagon',
      background: '#CD853F',
      color: '#FFFFFF',
      border: '2px solid #8B4513'
    },
    decorativeElements: ['🐄', '🐔', '🌾', '🚜'],
    category: 'educational',
    fontFamily: '"Amatic SC", "Kalam", cursive'
  },

  // 5. Space Exploration Theme
  {
    name: '🚀 Mission Spatiale',
    background: 'linear-gradient(180deg, #000428 0%, #004e92 100%)',
    pattern: `radial-gradient(2px 2px at 20% 30%, white, transparent),
              radial-gradient(2px 2px at 60% 70%, white, transparent),
              radial-gradient(1px 1px at 50% 50%, white, transparent),
              radial-gradient(1px 1px at 80% 20%, white, transparent)`,
    contentBackground: 'linear-gradient(135deg, rgba(20,20,40,0.95) 0%, rgba(40,40,60,0.95) 100%)',
    contentBorder: '2px solid #00FFFF',
    contentBorderStyle: 'solid',
    borderRadius: '15px',
    numberBadge: {
      shape: 'hexagon',
      background: 'linear-gradient(135deg, #FF6B6B 0%, #FFA500 100%)',
      color: '#FFFFFF',
      border: '2px solid #00FFFF'
    },
    decorativeElements: ['🚀', '🛸', '🪐', '⭐'],
    category: 'fun',
    fontFamily: '"Orbitron", "Exo 2", sans-serif'
  },

  // 6. Enchanted Quebec Forest Theme
  {
    name: '🌲 Forêt Enchantée',
    background: 'linear-gradient(180deg, #2d5a2d 0%, #3d7a3d 30%, #4d9a4d 60%, #5dba5d 100%)',
    pattern: `radial-gradient(circle at 30% 20%, rgba(255,255,200,0.3) 0%, transparent 30%),
              radial-gradient(circle at 70% 60%, rgba(255,255,200,0.2) 0%, transparent 25%),
              radial-gradient(circle at 50% 80%, rgba(255,255,200,0.25) 0%, transparent 35%)`,
    contentBackground: 'linear-gradient(135deg, rgba(255,255,240,0.95) 0%, rgba(245,255,245,0.9) 100%)',
    contentBorder: '4px solid #2d5a2d',
    contentBorderStyle: 'solid',
    borderRadius: '25px 25px 20px 20px',
    numberBadge: {
      shape: 'cloud',
      background: 'linear-gradient(135deg, #FFD700 0%, #FFED4B 100%)',
      color: '#2d5a2d',
      border: '2px solid #2d5a2d'
    },
    decorativeElements: ['🦌', '🍄', '🦉', '🌿'],
    category: 'educational',
    fontFamily: '"Patrick Hand", "Kalam", cursive'
  }
];

// Helper to create cloud-shaped border path
export function getCloudBorderPath(): string {
  return 'polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)';
}

// Helper to create scalloped border
export function getScallopedBorder(): string {
  return `
    radial-gradient(circle at 10px 0, transparent 10px, #ffffff 10px) repeat-x,
    radial-gradient(circle at 10px 100%, transparent 10px, #ffffff 10px) repeat-x,
    radial-gradient(circle at 0 10px, transparent 10px, #ffffff 10px) repeat-y,
    radial-gradient(circle at 100% 10px, transparent 10px, #ffffff 10px) repeat-y
  `;
}