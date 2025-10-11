// Fun and creative fonts for teachers
// Using Google Fonts via next/font/google

export interface TeacherFont {
  name: string;
  value: string;
  category: 'playful' | 'elegant' | 'modern' | 'classic' | 'handwritten' | 'display';
  preview?: string; // Preview text
  googleFont: string; // Google Font name
  weights?: number[]; // Available weights
}

export const teacherFonts: TeacherFont[] = [
  // Playful & Fun Fonts
  {
    name: '🎈 Comic Neue',
    value: 'comic-neue',
    category: 'playful',
    googleFont: 'Comic Neue',
    weights: [400, 700],
    preview: 'Une police amusante!'
  },
  {
    name: '🌟 Fredoka',
    value: 'fredoka',
    category: 'playful',
    googleFont: 'Fredoka',
    weights: [400, 600],
    preview: 'Rond et amical'
  },
  {
    name: '🍭 Bubblegum Sans',
    value: 'bubblegum-sans',
    category: 'playful',
    googleFont: 'Bubblegum Sans',
    weights: [400],
    preview: 'Bulles joyeuses'
  },
  {
    name: '💕 Love Ya Like A Sister',
    value: 'love-ya-like-a-sister',
    category: 'playful',
    googleFont: 'Love Ya Like A Sister',
    weights: [400],
    preview: 'Quirky et amical'
  },
  {
    name: '👶 Freckle Face',
    value: 'freckle-face',
    category: 'playful',
    googleFont: 'Freckle Face',
    weights: [400],
    preview: 'Enfance innocente'
  },
  {
    name: '🎮 Luckiest Guy',
    value: 'luckiest-guy',
    category: 'playful',
    googleFont: 'Luckiest Guy',
    weights: [400],
    preview: 'CHANCEUX!'
  },
  {
    name: '🌻 Chewy',
    value: 'chewy',
    category: 'playful',
    googleFont: 'Chewy',
    weights: [400],
    preview: 'Doux et amical'
  },
  {
    name: '🎪 Boogaloo',
    value: 'boogaloo',
    category: 'playful',
    googleFont: 'Boogaloo',
    weights: [400],
    preview: 'Fête amusante'
  },

  // Handwritten Fonts
  {
    name: '✏️ Caveat',
    value: 'caveat',
    category: 'handwritten',
    googleFont: 'Caveat',
    weights: [400, 500, 600, 700],
    preview: 'Écriture manuscrite'
  },
  {
    name: '✍️ Dancing Script',
    value: 'dancing-script',
    category: 'handwritten',
    googleFont: 'Dancing Script',
    weights: [400, 500, 600, 700],
    preview: 'Élégant et fluide'
  },
  {
    name: '📝 Permanent Marker',
    value: 'permanent-marker',
    category: 'handwritten',
    googleFont: 'Permanent Marker',
    weights: [400],
    preview: 'Marqueur permanent'
  },
  {
    name: '🖊️ Architects Daughter',
    value: 'architects-daughter',
    category: 'handwritten',
    googleFont: 'Architects Daughter',
    weights: [400],
    preview: 'Notes architecte'
  },
  {
    name: '📓 Indie Flower',
    value: 'indie-flower',
    category: 'handwritten',
    googleFont: 'Indie Flower',
    weights: [400],
    preview: 'Fleur indie'
  },
  {
    name: '✒️ Satisfy',
    value: 'satisfy',
    category: 'handwritten',
    googleFont: 'Satisfy',
    weights: [400],
    preview: 'Signature élégante'
  },
  {
    name: '🎨 Coming Soon',
    value: 'coming-soon',
    category: 'handwritten',
    googleFont: 'Coming Soon',
    weights: [400],
    preview: 'Écriture familière'
  },
  {
    name: '📚 Kalam',
    value: 'kalam',
    category: 'handwritten',
    googleFont: 'Kalam',
    weights: [300, 400, 700],
    preview: 'Main naturelle'
  },
  {
    name: '🖍️ Schoolbell',
    value: 'schoolbell',
    category: 'handwritten',
    googleFont: 'Schoolbell',
    weights: [400],
    preview: 'Cloche d\'école'
  },
  {
    name: '📖 Reenie Beanie',
    value: 'reenie-beanie',
    category: 'handwritten',
    googleFont: 'Reenie Beanie',
    weights: [400],
    preview: 'Notes rapides'
  },
  {
    name: '✏️ Patrick Hand',
    value: 'patrick-hand',
    category: 'handwritten',
    googleFont: 'Patrick Hand',
    weights: [400],
    preview: 'Main de Patrick'
  },

  // Display & Special Fonts
  {
    name: '🏰 Cinzel',
    value: 'cinzel',
    category: 'display',
    googleFont: 'Cinzel',
    weights: [400, 500, 600, 700, 800, 900],
    preview: 'ÉPIQUE'
  },
  {
    name: '🎭 Righteous',
    value: 'righteous',
    category: 'display',
    googleFont: 'Righteous',
    weights: [400],
    preview: 'Affichage moderne'
  },
  {
    name: '🌈 Pacifico',
    value: 'pacifico',
    category: 'display',
    googleFont: 'Pacifico',
    weights: [400],
    preview: 'Surfeur cool'
  },
  {
    name: '⚡ Bangers',
    value: 'bangers',
    category: 'display',
    googleFont: 'Bangers',
    weights: [400],
    preview: 'BANDE DESSINÉE!'
  },
  {
    name: '🎲 Press Start 2P',
    value: 'press-start-2p',
    category: 'display',
    googleFont: 'Press Start 2P',
    weights: [400],
    preview: 'RETRO GAME'
  },
  {
    name: '🦖 Creepster',
    value: 'creepster',
    category: 'display',
    googleFont: 'Creepster',
    weights: [400],
    preview: 'Effrayant!'
  },
  {
    name: '🌟 Shrikhand',
    value: 'shrikhand',
    category: 'display',
    googleFont: 'Shrikhand',
    weights: [400],
    preview: 'Décoratif vif'
  },
  {
    name: '🎊 Bungee',
    value: 'bungee',
    category: 'display',
    googleFont: 'Bungee',
    weights: [400],
    preview: 'SAUT ÉLASTIQUE'
  },
  {
    name: '🎨 Fredericka the Great',
    value: 'fredericka-the-great',
    category: 'display',
    googleFont: 'Fredericka the Great',
    weights: [400],
    preview: 'Grandiose!'
  },
  {
    name: '🎭 Alfa Slab One',
    value: 'alfa-slab-one',
    category: 'display',
    googleFont: 'Alfa Slab One',
    weights: [400],
    preview: 'GRAS ET FORT'
  },
  {
    name: '🏅 Bowlby One',
    value: 'bowlby-one',
    category: 'display',
    googleFont: 'Bowlby One',
    weights: [400],
    preview: 'CHAMPION!'
  },

  // Elegant Fonts
  {
    name: '💎 Playfair Display',
    value: 'playfair-display',
    category: 'elegant',
    googleFont: 'Playfair Display',
    weights: [400, 500, 600, 700, 800, 900],
    preview: 'Élégance classique'
  },
  {
    name: '🌹 Cormorant Garamond',
    value: 'cormorant-garamond',
    category: 'elegant',
    googleFont: 'Cormorant Garamond',
    weights: [300, 400, 500, 600, 700],
    preview: 'Raffiné'
  },
  {
    name: '👑 Libre Baskerville',
    value: 'libre-baskerville',
    category: 'elegant',
    googleFont: 'Libre Baskerville',
    weights: [400, 700],
    preview: 'Traditionnel'
  },
  {
    name: '🦢 EB Garamond',
    value: 'eb-garamond',
    category: 'elegant',
    googleFont: 'EB Garamond',
    weights: [400, 500, 600, 700, 800],
    preview: 'Classique intemporel'
  },

  // Modern & Clean Fonts
  {
    name: '🔷 Poppins',
    value: 'poppins',
    category: 'modern',
    googleFont: 'Poppins',
    weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
    preview: 'Moderne et net'
  },
  {
    name: '⭐ Raleway',
    value: 'raleway',
    category: 'modern',
    googleFont: 'Raleway',
    weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
    preview: 'Élégant moderne'
  },
  {
    name: '🎯 Montserrat',
    value: 'montserrat',
    category: 'modern',
    googleFont: 'Montserrat',
    weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
    preview: 'Professionnel'
  },
  {
    name: '🌐 Inter',
    value: 'inter',
    category: 'modern',
    googleFont: 'Inter',
    weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
    preview: 'Interface moderne'
  },
  {
    name: '📱 Quicksand',
    value: 'quicksand',
    category: 'modern',
    googleFont: 'Quicksand',
    weights: [300, 400, 500, 600, 700],
    preview: 'Arrondi moderne'
  },
  {
    name: '🎯 Nunito',
    value: 'nunito',
    category: 'modern',
    googleFont: 'Nunito',
    weights: [200, 300, 400, 500, 600, 700, 800, 900],
    preview: 'Rond et lisible'
  },
  {
    name: '🌊 Comfortaa',
    value: 'comfortaa',
    category: 'modern',
    googleFont: 'Comfortaa',
    weights: [300, 400, 500, 600, 700],
    preview: 'Confortable'
  },
  {
    name: '💫 Varela Round',
    value: 'varela-round',
    category: 'modern',
    googleFont: 'Varela Round',
    weights: [400],
    preview: 'Doux et rond'
  },
  {
    name: '🔥 Rubik',
    value: 'rubik',
    category: 'modern',
    googleFont: 'Rubik',
    weights: [300, 400, 500, 600, 700, 800, 900],
    preview: 'Géométrique moderne'
  },

  // Classic & Safe Fonts
  {
    name: '📚 Roboto',
    value: 'roboto',
    category: 'classic',
    googleFont: 'Roboto',
    weights: [100, 300, 400, 500, 700, 900],
    preview: 'Classique fiable'
  },
  {
    name: '📖 Open Sans',
    value: 'open-sans',
    category: 'classic',
    googleFont: 'Open Sans',
    weights: [300, 400, 500, 600, 700, 800],
    preview: 'Lisibilité parfaite'
  },
  {
    name: '📄 Lato',
    value: 'lato',
    category: 'classic',
    googleFont: 'Lato',
    weights: [100, 300, 400, 700, 900],
    preview: 'Simple et clair'
  },
  {
    name: '🔤 Source Sans 3',
    value: 'source-sans-3',
    category: 'classic',
    googleFont: 'Source Sans 3',
    weights: [200, 300, 400, 500, 600, 700, 800, 900],
    preview: 'Sans serif propre'
  },
  {
    name: '📘 Merriweather',
    value: 'merriweather',
    category: 'classic',
    googleFont: 'Merriweather',
    weights: [300, 400, 700, 900],
    preview: 'Lecture agréable'
  },
  {
    name: '📝 PT Sans',
    value: 'pt-sans',
    category: 'classic',
    googleFont: 'PT Sans',
    weights: [400, 700],
    preview: 'Universel et clair'
  },
  {
    name: '🎓 Crimson Text',
    value: 'crimson-text',
    category: 'classic',
    googleFont: 'Crimson Text',
    weights: [400, 600, 700],
    preview: 'Académique'
  },
  {
    name: '📋 Noto Sans',
    value: 'noto-sans',
    category: 'classic',
    googleFont: 'Noto Sans',
    weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
    preview: 'Support universel'
  }
];

// Get fonts by category
export function getFontsByCategory(category: TeacherFont['category']): TeacherFont[] {
  return teacherFonts.filter(font => font.category === category);
}

// Get font by value
export function getFontByValue(value: string): TeacherFont | undefined {
  return teacherFonts.find(font => font.value === value);
}

// Font categories for UI
export const fontCategories = [
  { id: 'playful', name: '🎈 Amusantes', color: 'from-pink-500 to-purple-500' },
  { id: 'handwritten', name: '✏️ Manuscrites', color: 'from-blue-500 to-cyan-500' },
  { id: 'display', name: '🎭 Affichage', color: 'from-orange-500 to-red-500' },
  { id: 'elegant', name: '💎 Élégantes', color: 'from-purple-500 to-pink-500' },
  { id: 'modern', name: '⭐ Modernes', color: 'from-green-500 to-teal-500' },
  { id: 'classic', name: '📚 Classiques', color: 'from-gray-500 to-gray-700' }
] as const;