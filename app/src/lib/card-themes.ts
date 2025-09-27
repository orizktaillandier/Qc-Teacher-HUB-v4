export interface CardTheme {
  name: string;
  primary: string;
  secondary: string;
  accent?: string;
  pattern?: string;
  patternType?: string;
  backgroundImage?: string;
  borderStyle?: string;
  shadowStyle?: string;
  decorativeElements?: string;
}

export const cardThemes: CardTheme[] = [
  // MATERIAL DESIGN INSPIRED - Clean and Modern
  {
    name: '📘 Material Blue',
    primary: '#1976d2',
    secondary: '#e3f2fd',
    accent: '#0d47a1',
    backgroundImage: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
    shadowStyle: '0 3px 5px -1px rgba(0,0,0,0.2), 0 6px 10px 0 rgba(0,0,0,0.14)',
    patternType: 'material-blue'
  },
  {
    name: '💚 Material Green',
    primary: '#388e3c',
    secondary: '#e8f5e9',
    accent: '#1b5e20',
    backgroundImage: 'linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)',
    shadowStyle: '0 3px 5px -1px rgba(0,0,0,0.2), 0 6px 10px 0 rgba(0,0,0,0.14)',
    patternType: 'material-green'
  },
  {
    name: '💜 Material Purple',
    primary: '#7b1fa2',
    secondary: '#f3e5f5',
    accent: '#4a148c',
    backgroundImage: 'linear-gradient(135deg, #f3e5f5 0%, #e1bee7 100%)',
    shadowStyle: '0 3px 5px -1px rgba(0,0,0,0.2), 0 6px 10px 0 rgba(0,0,0,0.14)',
    patternType: 'material-purple'
  },
  {
    name: '🧡 Material Orange',
    primary: '#f57c00',
    secondary: '#fff3e0',
    accent: '#e65100',
    backgroundImage: 'linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%)',
    shadowStyle: '0 3px 5px -1px rgba(0,0,0,0.2), 0 6px 10px 0 rgba(0,0,0,0.14)',
    patternType: 'material-orange'
  },

  // TAILWIND GRADIENTS - Modern and Sleek
  {
    name: '🌊 Ocean Gradient',
    primary: '#0284c7',
    secondary: '#f0f9ff',
    backgroundImage: 'linear-gradient(to right, #0ea5e9, #0284c7, #0369a1)',
    patternType: 'gradient-ocean'
  },
  {
    name: '🌺 Sunset Gradient',
    primary: '#dc2626',
    secondary: '#fef2f2',
    backgroundImage: 'linear-gradient(to right, #fbbf24, #fb923c, #f87171)',
    patternType: 'gradient-sunset'
  },
  {
    name: '🌿 Forest Gradient',
    primary: '#16a34a',
    secondary: '#f0fdf4',
    backgroundImage: 'linear-gradient(to right, #86efac, #4ade80, #22c55e)',
    patternType: 'gradient-forest'
  },
  {
    name: '🔮 Mystic Gradient',
    primary: '#9333ea',
    secondary: '#faf5ff',
    backgroundImage: 'linear-gradient(to right, #c084fc, #a78bfa, #9333ea)',
    patternType: 'gradient-mystic'
  },

  // MINIMALIST - Clean for Education
  {
    name: '⚪ Pure Minimalist',
    primary: '#334155',
    secondary: '#ffffff',
    backgroundImage: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)',
    borderStyle: '1px solid #e2e8f0',
    patternType: 'minimalist-pure'
  },
  {
    name: '🔲 Soft Gray',
    primary: '#475569',
    secondary: '#f8fafc',
    backgroundImage: 'linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%)',
    borderStyle: '1px solid #cbd5e1',
    patternType: 'minimalist-gray'
  },
  {
    name: '📄 Paper White',
    primary: '#1e293b',
    secondary: '#ffffff',
    backgroundImage: 'linear-gradient(180deg, #ffffff 0%, #fafafa 100%)',
    borderStyle: '1px solid #e5e5e5',
    shadowStyle: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
    patternType: 'minimalist-paper'
  },
  {
    name: '☁️ Cloud Soft',
    primary: '#64748b',
    secondary: '#f0f4f8',
    backgroundImage: 'linear-gradient(180deg, #ffffff 0%, #f0f4f8 100%)',
    borderStyle: '1px solid #e2e8f0',
    patternType: 'minimalist-cloud'
  },

  // EDUCATIONAL PASTELS - Friendly and Approachable
  {
    name: '🌸 Pastel Pink',
    primary: '#ec4899',
    secondary: '#fdf2f8',
    backgroundImage: 'linear-gradient(135deg, #fdf2f8 0%, #fce7f3 100%)',
    patternType: 'pastel-pink'
  },
  {
    name: '🌤️ Pastel Yellow',
    primary: '#f59e0b',
    secondary: '#fffbeb',
    backgroundImage: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)',
    patternType: 'pastel-yellow'
  },
  {
    name: '💙 Pastel Blue',
    primary: '#3b82f6',
    secondary: '#eff6ff',
    backgroundImage: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
    patternType: 'pastel-blue'
  },
  {
    name: '🌱 Pastel Mint',
    primary: '#10b981',
    secondary: '#ecfdf5',
    backgroundImage: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)',
    patternType: 'pastel-mint'
  },

  // SUBTLE PATTERNS - Professional with texture
  {
    name: '📐 Subtle Grid',
    primary: '#0f172a',
    secondary: '#f8fafc',
    pattern: 'repeating-linear-gradient(0deg, transparent, transparent 39px, #e2e8f0 39px, #e2e8f0 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, #e2e8f0 39px, #e2e8f0 40px)',
    backgroundImage: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)',
    patternType: 'pattern-grid'
  },
  {
    name: '⭕ Subtle Dots',
    primary: '#1e40af',
    secondary: '#eff6ff',
    backgroundImage: 'radial-gradient(circle, #cbd5e1 0.5px, transparent 0.5px)',
    pattern: 'radial-gradient(circle, #cbd5e1 0.5px, #eff6ff 0.5px)',
    patternType: 'pattern-dots'
  },
  {
    name: '〰️ Subtle Waves',
    primary: '#0891b2',
    secondary: '#ecfeff',
    backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 10 Q 25 5 50 10 T 100 10' stroke='%23e0f2fe' stroke-width='0.5' fill='none'/%3E%3C/svg%3E")`,
    patternType: 'pattern-waves'
  },
  {
    name: '◇ Subtle Diamond',
    primary: '#7c3aed',
    secondary: '#f3e8ff',
    pattern: 'repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(124, 58, 237, 0.03) 20px, rgba(124, 58, 237, 0.03) 40px)',
    backgroundImage: 'linear-gradient(135deg, #f3e8ff 0%, #ede9fe 100%)',
    patternType: 'pattern-diamond'
  },

  // MODERN GLASSMORPHISM - Trendy and Contemporary
  {
    name: '🔷 Glass Blue',
    primary: '#3b82f6',
    secondary: 'rgba(219, 234, 254, 0.7)',
    backgroundImage: 'linear-gradient(135deg, rgba(219, 234, 254, 0.9), rgba(191, 219, 254, 0.7))',
    shadowStyle: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
    borderStyle: '1px solid rgba(255, 255, 255, 0.18)',
    patternType: 'glass-blue'
  },
  {
    name: '💎 Glass Crystal',
    primary: '#8b5cf6',
    secondary: 'rgba(237, 233, 254, 0.7)',
    backgroundImage: 'linear-gradient(135deg, rgba(237, 233, 254, 0.9), rgba(221, 214, 254, 0.7))',
    shadowStyle: '0 8px 32px 0 rgba(139, 92, 246, 0.15)',
    borderStyle: '1px solid rgba(255, 255, 255, 0.18)',
    patternType: 'glass-purple'
  },
  {
    name: '🌟 Glass Gold',
    primary: '#f59e0b',
    secondary: 'rgba(254, 243, 199, 0.7)',
    backgroundImage: 'linear-gradient(135deg, rgba(254, 243, 199, 0.9), rgba(253, 230, 138, 0.7))',
    shadowStyle: '0 8px 32px 0 rgba(245, 158, 11, 0.15)',
    borderStyle: '1px solid rgba(255, 255, 255, 0.18)',
    patternType: 'glass-gold'
  },

  // PROFESSIONAL EDUCATION - Clean and Academic
  {
    name: '📚 Academic Blue',
    primary: '#1e3a8a',
    secondary: '#f0f4ff',
    backgroundImage: 'linear-gradient(180deg, #f0f4ff 0%, #e0e7ff 100%)',
    borderStyle: '2px solid #1e3a8a',
    patternType: 'academic-blue'
  },
  {
    name: '🎓 Scholar Green',
    primary: '#14532d',
    secondary: '#f0fdf4',
    backgroundImage: 'linear-gradient(180deg, #f0fdf4 0%, #dcfce7 100%)',
    borderStyle: '2px solid #14532d',
    patternType: 'academic-green'
  },
  {
    name: '📝 Classic Slate',
    primary: '#1e293b',
    secondary: '#f8fafc',
    backgroundImage: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)',
    borderStyle: '2px solid #334155',
    patternType: 'academic-slate'
  },
  {
    name: '🖊️ Ink Black',
    primary: '#000000',
    secondary: '#ffffff',
    backgroundImage: 'linear-gradient(180deg, #ffffff 0%, #fafafa 100%)',
    borderStyle: '2px solid #000000',
    patternType: 'academic-ink'
  },

  // SOFT MODERN - Trendy but not overwhelming
  {
    name: '🍑 Soft Peach',
    primary: '#fb7185',
    secondary: '#fff1f2',
    backgroundImage: 'linear-gradient(135deg, #fff1f2 0%, #ffe4e6 100%)',
    patternType: 'soft-peach'
  },
  {
    name: '🍃 Soft Sage',
    primary: '#65a30d',
    secondary: '#f7fee7',
    backgroundImage: 'linear-gradient(135deg, #f7fee7 0%, #ecfccb 100%)',
    patternType: 'soft-sage'
  },
  {
    name: '🌙 Soft Lavender',
    primary: '#a855f7',
    secondary: '#faf5ff',
    backgroundImage: 'linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%)',
    patternType: 'soft-lavender'
  },
  {
    name: '🌊 Soft Teal',
    primary: '#14b8a6',
    secondary: '#f0fdfa',
    backgroundImage: 'linear-gradient(135deg, #f0fdfa 0%, #ccfbf1 100%)',
    patternType: 'soft-teal'
  },

  // NATURE INSPIRED - Calming and Educational
  {
    name: '🌲 Pine Forest',
    primary: '#064e3b',
    secondary: '#ecfdf5',
    backgroundImage: 'linear-gradient(180deg, #ecfdf5 0%, #d1fae5 50%, #a7f3d0 100%)',
    patternType: 'nature-pine'
  },
  {
    name: '🌅 Dawn Sky',
    primary: '#be185d',
    secondary: '#fef2f2',
    backgroundImage: 'linear-gradient(180deg, #fef2f2 0%, #fee2e2 50%, #fecaca 100%)',
    patternType: 'nature-dawn'
  },
  {
    name: '🏖️ Beach Sand',
    primary: '#92400e',
    secondary: '#fef3c7',
    backgroundImage: 'linear-gradient(180deg, #fef3c7 0%, #fde68a 50%, #fcd34d 100%)',
    patternType: 'nature-beach'
  },
  {
    name: '💧 Water Drop',
    primary: '#0c4a6e',
    secondary: '#f0f9ff',
    backgroundImage: 'linear-gradient(180deg, #f0f9ff 0%, #e0f2fe 50%, #bae6fd 100%)',
    patternType: 'nature-water'
  }
];

// Helper function to get theme by index
export function getThemeByIndex(index: number): CardTheme {
  return cardThemes[index % cardThemes.length];
}

// Helper function to get random theme
export function getRandomTheme(): CardTheme {
  return cardThemes[Math.floor(Math.random() * cardThemes.length)];
}