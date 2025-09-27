// Material UI and Ant Design inspired card themes with professional designs
export interface DiverseCardTheme {
  name: string;
  style: 'material' | 'material-outlined' | 'material-filled' | 'material-elevated' | 'material-pastel' | 'material-gradient' | 'material-glass' | 'material-minimal' | 'antd' | 'antd-colorful' | 'antd-compact' | 'antd-borderless';

  // Card container styles
  cardBackground?: string;
  cardBorder?: string;
  cardShadow?: string;
  cardRadius?: string;
  cardPadding?: string;

  // Header/number badge styles
  numberBadgeStyle?: 'circle' | 'square' | 'rounded-square' | 'chip' | 'bubble';
  numberBadgeBackground?: string;
  numberBadgeColor?: string;
  numberBadgePosition?: string;

  // Text styles
  questionStyle?: {
    background?: string;
    border?: string;
    padding?: string;
    borderRadius?: string;
    fontSize?: string;
    color?: string;
    fontFamily?: string;
  };

  // Decorative elements
  decorations?: {
    type: 'none' | 'subtle-dots' | 'subtle-lines' | 'material-waves';
    elements?: string[];
  };

  // Special effects
  effects?: {
    hover?: boolean;
    animation?: string;
    overlay?: string;
  };
}

export const diverseCardThemes: DiverseCardTheme[] = [
  // MATERIAL DESIGN 3 - CORE THEMES
  {
    name: '🔵 Material Blue',
    style: 'material',
    cardBackground: 'linear-gradient(135deg, #ffffff 0%, #f3f4f6 100%)',
    cardBorder: 'none',
    cardShadow: '0 2px 4px rgba(0,0,0,0.1), 0 8px 16px rgba(0,0,0,0.1)',
    cardRadius: '12px',
    cardPadding: '24px',
    numberBadgeStyle: 'chip',
    numberBadgeBackground: '#1976d2',
    numberBadgeColor: '#ffffff',
    questionStyle: {
      color: '#1e293b',
      fontFamily: '"Roboto", "Inter", system-ui, sans-serif'
    },
    decorations: { type: 'none' },
    effects: { hover: true }
  },

  {
    name: '💚 Material Green',
    style: 'material',
    cardBackground: 'linear-gradient(135deg, #ffffff 0%, #f0fdf4 100%)',
    cardBorder: 'none',
    cardShadow: '0 2px 4px rgba(0,0,0,0.1), 0 8px 16px rgba(0,0,0,0.08)',
    cardRadius: '12px',
    cardPadding: '24px',
    numberBadgeStyle: 'chip',
    numberBadgeBackground: '#2e7d32',
    numberBadgeColor: '#ffffff',
    questionStyle: {
      color: '#14532d',
      fontFamily: '"Roboto", "Inter", system-ui, sans-serif'
    },
    decorations: { type: 'none' },
    effects: { hover: true }
  },

  {
    name: '💜 Material Purple',
    style: 'material',
    cardBackground: 'linear-gradient(135deg, #ffffff 0%, #faf5ff 100%)',
    cardBorder: 'none',
    cardShadow: '0 2px 4px rgba(0,0,0,0.1), 0 8px 16px rgba(0,0,0,0.08)',
    cardRadius: '12px',
    cardPadding: '24px',
    numberBadgeStyle: 'chip',
    numberBadgeBackground: '#7b1fa2',
    numberBadgeColor: '#ffffff',
    questionStyle: {
      color: '#581c87',
      fontFamily: '"Roboto", "Inter", system-ui, sans-serif'
    },
    decorations: { type: 'none' },
    effects: { hover: true }
  },

  {
    name: '🧡 Material Orange',
    style: 'material',
    cardBackground: 'linear-gradient(135deg, #ffffff 0%, #fff7ed 100%)',
    cardBorder: 'none',
    cardShadow: '0 2px 4px rgba(0,0,0,0.1), 0 8px 16px rgba(0,0,0,0.08)',
    cardRadius: '12px',
    cardPadding: '24px',
    numberBadgeStyle: 'chip',
    numberBadgeBackground: '#f57c00',
    numberBadgeColor: '#ffffff',
    questionStyle: {
      color: '#7c2d12',
      fontFamily: '"Roboto", "Inter", system-ui, sans-serif'
    },
    decorations: { type: 'none' },
    effects: { hover: true }
  },

  {
    name: '🩵 Material Cyan',
    style: 'material',
    cardBackground: 'linear-gradient(135deg, #ffffff 0%, #ecfeff 100%)',
    cardBorder: 'none',
    cardShadow: '0 2px 4px rgba(0,0,0,0.1), 0 8px 16px rgba(0,0,0,0.08)',
    cardRadius: '12px',
    cardPadding: '24px',
    numberBadgeStyle: 'chip',
    numberBadgeBackground: '#00acc1',
    numberBadgeColor: '#ffffff',
    questionStyle: {
      color: '#164e63',
      fontFamily: '"Roboto", "Inter", system-ui, sans-serif'
    },
    decorations: { type: 'none' },
    effects: { hover: true }
  },

  // MATERIAL OUTLINED VARIANTS
  {
    name: '📘 Material Outlined Blue',
    style: 'material-outlined',
    cardBackground: '#ffffff',
    cardBorder: '2px solid #1976d2',
    cardShadow: 'none',
    cardRadius: '8px',
    cardPadding: '20px',
    numberBadgeStyle: 'rounded-square',
    numberBadgeBackground: '#1976d2',
    numberBadgeColor: '#ffffff',
    questionStyle: {
      color: '#0f172a',
      fontFamily: '"Roboto", "Inter", system-ui, sans-serif'
    },
    decorations: { type: 'none' }
  },

  {
    name: '📗 Material Outlined Green',
    style: 'material-outlined',
    cardBackground: '#ffffff',
    cardBorder: '2px solid #2e7d32',
    cardShadow: 'none',
    cardRadius: '8px',
    cardPadding: '20px',
    numberBadgeStyle: 'rounded-square',
    numberBadgeBackground: '#2e7d32',
    numberBadgeColor: '#ffffff',
    questionStyle: {
      color: '#0f172a',
      fontFamily: '"Roboto", "Inter", system-ui, sans-serif'
    },
    decorations: { type: 'none' }
  },

  {
    name: '📕 Material Outlined Red',
    style: 'material-outlined',
    cardBackground: '#ffffff',
    cardBorder: '2px solid #d32f2f',
    cardShadow: 'none',
    cardRadius: '8px',
    cardPadding: '20px',
    numberBadgeStyle: 'rounded-square',
    numberBadgeBackground: '#d32f2f',
    numberBadgeColor: '#ffffff',
    questionStyle: {
      color: '#0f172a',
      fontFamily: '"Roboto", "Inter", system-ui, sans-serif'
    },
    decorations: { type: 'none' }
  },

  // MATERIAL FILLED VARIANTS
  {
    name: '🟦 Material Filled Blue',
    style: 'material-filled',
    cardBackground: '#e3f2fd',
    cardBorder: 'none',
    cardShadow: '0 1px 3px rgba(0,0,0,0.12)',
    cardRadius: '8px',
    cardPadding: '20px',
    numberBadgeStyle: 'circle',
    numberBadgeBackground: '#1565c0',
    numberBadgeColor: '#ffffff',
    questionStyle: {
      color: '#0d47a1',
      fontFamily: '"Roboto", "Inter", system-ui, sans-serif',
      background: 'rgba(255,255,255,0.8)',
      padding: '12px',
      borderRadius: '6px'
    },
    decorations: { type: 'none' }
  },

  {
    name: '🟩 Material Filled Green',
    style: 'material-filled',
    cardBackground: '#e8f5e9',
    cardBorder: 'none',
    cardShadow: '0 1px 3px rgba(0,0,0,0.12)',
    cardRadius: '8px',
    cardPadding: '20px',
    numberBadgeStyle: 'circle',
    numberBadgeBackground: '#2e7d32',
    numberBadgeColor: '#ffffff',
    questionStyle: {
      color: '#1b5e20',
      fontFamily: '"Roboto", "Inter", system-ui, sans-serif',
      background: 'rgba(255,255,255,0.8)',
      padding: '12px',
      borderRadius: '6px'
    },
    decorations: { type: 'none' }
  },

  {
    name: '🟪 Material Filled Purple',
    style: 'material-filled',
    cardBackground: '#f3e5f5',
    cardBorder: 'none',
    cardShadow: '0 1px 3px rgba(0,0,0,0.12)',
    cardRadius: '8px',
    cardPadding: '20px',
    numberBadgeStyle: 'circle',
    numberBadgeBackground: '#6a1b9a',
    numberBadgeColor: '#ffffff',
    questionStyle: {
      color: '#4a148c',
      fontFamily: '"Roboto", "Inter", system-ui, sans-serif',
      background: 'rgba(255,255,255,0.8)',
      padding: '12px',
      borderRadius: '6px'
    },
    decorations: { type: 'none' }
  },

  // MATERIAL ELEVATED (WITH STRONGER SHADOWS)
  {
    name: '📤 Material Elevated Blue',
    style: 'material-elevated',
    cardBackground: '#ffffff',
    cardBorder: 'none',
    cardShadow: '0 4px 6px -1px rgba(0,0,0,0.1), 0 10px 15px -3px rgba(0,0,0,0.1)',
    cardRadius: '16px',
    cardPadding: '28px',
    numberBadgeStyle: 'bubble',
    numberBadgeBackground: '#2196f3',
    numberBadgeColor: '#ffffff',
    questionStyle: {
      color: '#1e293b',
      fontFamily: '"Roboto", "Inter", system-ui, sans-serif'
    },
    decorations: { type: 'subtle-dots' },
    effects: {
      hover: true,
      animation: 'hover-lift'
    }
  },

  {
    name: '📤 Material Elevated Teal',
    style: 'material-elevated',
    cardBackground: '#ffffff',
    cardBorder: 'none',
    cardShadow: '0 4px 6px -1px rgba(0,0,0,0.1), 0 10px 15px -3px rgba(0,0,0,0.1)',
    cardRadius: '16px',
    cardPadding: '28px',
    numberBadgeStyle: 'bubble',
    numberBadgeBackground: '#009688',
    numberBadgeColor: '#ffffff',
    questionStyle: {
      color: '#1e293b',
      fontFamily: '"Roboto", "Inter", system-ui, sans-serif'
    },
    decorations: { type: 'subtle-dots' },
    effects: {
      hover: true,
      animation: 'hover-lift'
    }
  },

  // MATERIAL PASTEL - SOFT COLORS FOR EDUCATION
  {
    name: '🌸 Material Pastel Pink',
    style: 'material-pastel',
    cardBackground: 'linear-gradient(135deg, #fce4ec 0%, #f8bbd0 100%)',
    cardBorder: 'none',
    cardShadow: '0 2px 8px rgba(233,30,99,0.1)',
    cardRadius: '20px',
    cardPadding: '24px',
    numberBadgeStyle: 'chip',
    numberBadgeBackground: '#e91e63',
    numberBadgeColor: '#ffffff',
    questionStyle: {
      color: '#880e4f',
      fontFamily: '"Roboto", "Inter", system-ui, sans-serif'
    },
    decorations: { type: 'none' }
  },

  {
    name: '🌤 Material Pastel Yellow',
    style: 'material-pastel',
    cardBackground: 'linear-gradient(135deg, #fff9c4 0%, #fff59d 100%)',
    cardBorder: 'none',
    cardShadow: '0 2px 8px rgba(255,193,7,0.15)',
    cardRadius: '20px',
    cardPadding: '24px',
    numberBadgeStyle: 'chip',
    numberBadgeBackground: '#ffc107',
    numberBadgeColor: '#000000',
    questionStyle: {
      color: '#5d4037',
      fontFamily: '"Roboto", "Inter", system-ui, sans-serif'
    },
    decorations: { type: 'none' }
  },

  {
    name: '🌿 Material Pastel Mint',
    style: 'material-pastel',
    cardBackground: 'linear-gradient(135deg, #e0f2f1 0%, #b2dfdb 100%)',
    cardBorder: 'none',
    cardShadow: '0 2px 8px rgba(0,150,136,0.15)',
    cardRadius: '20px',
    cardPadding: '24px',
    numberBadgeStyle: 'chip',
    numberBadgeBackground: '#009688',
    numberBadgeColor: '#ffffff',
    questionStyle: {
      color: '#004d40',
      fontFamily: '"Roboto", "Inter", system-ui, sans-serif'
    },
    decorations: { type: 'none' }
  },

  {
    name: '🦄 Material Pastel Lavender',
    style: 'material-pastel',
    cardBackground: 'linear-gradient(135deg, #ede7f6 0%, #d1c4e9 100%)',
    cardBorder: 'none',
    cardShadow: '0 2px 8px rgba(103,58,183,0.15)',
    cardRadius: '20px',
    cardPadding: '24px',
    numberBadgeStyle: 'chip',
    numberBadgeBackground: '#673ab7',
    numberBadgeColor: '#ffffff',
    questionStyle: {
      color: '#311b92',
      fontFamily: '"Roboto", "Inter", system-ui, sans-serif'
    },
    decorations: { type: 'none' }
  },

  // MATERIAL GRADIENT - MODERN GRADIENTS
  {
    name: '🌊 Material Ocean Gradient',
    style: 'material-gradient',
    cardBackground: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    cardBorder: 'none',
    cardShadow: '0 10px 30px rgba(102,126,234,0.3)',
    cardRadius: '24px',
    cardPadding: '28px',
    numberBadgeStyle: 'bubble',
    numberBadgeBackground: 'rgba(255,255,255,0.9)',
    numberBadgeColor: '#764ba2',
    questionStyle: {
      color: '#ffffff',
      fontFamily: '"Roboto", "Inter", system-ui, sans-serif',
      background: 'rgba(255,255,255,0.15)',
      padding: '16px',
      borderRadius: '12px'
    },
    decorations: { type: 'material-waves' }
  },

  {
    name: '🌅 Material Sunset Gradient',
    style: 'material-gradient',
    cardBackground: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    cardBorder: 'none',
    cardShadow: '0 10px 30px rgba(250,112,154,0.3)',
    cardRadius: '24px',
    cardPadding: '28px',
    numberBadgeStyle: 'bubble',
    numberBadgeBackground: 'rgba(255,255,255,0.9)',
    numberBadgeColor: '#fa709a',
    questionStyle: {
      color: '#ffffff',
      fontFamily: '"Roboto", "Inter", system-ui, sans-serif',
      background: 'rgba(255,255,255,0.2)',
      padding: '16px',
      borderRadius: '12px'
    },
    decorations: { type: 'none' }
  },

  {
    name: '🌲 Material Forest Gradient',
    style: 'material-gradient',
    cardBackground: 'linear-gradient(135deg, #0ba360 0%, #3cba92 100%)',
    cardBorder: 'none',
    cardShadow: '0 10px 30px rgba(11,163,96,0.3)',
    cardRadius: '24px',
    cardPadding: '28px',
    numberBadgeStyle: 'bubble',
    numberBadgeBackground: 'rgba(255,255,255,0.9)',
    numberBadgeColor: '#0ba360',
    questionStyle: {
      color: '#ffffff',
      fontFamily: '"Roboto", "Inter", system-ui, sans-serif',
      background: 'rgba(255,255,255,0.2)',
      padding: '16px',
      borderRadius: '12px'
    },
    decorations: { type: 'none' }
  },

  // MATERIAL GLASS - GLASSMORPHISM
  {
    name: '🔷 Material Glass Blue',
    style: 'material-glass',
    cardBackground: 'linear-gradient(135deg, rgba(255,255,255,0.7), rgba(255,255,255,0.3))',
    cardBorder: '1px solid rgba(255,255,255,0.18)',
    cardShadow: '0 8px 32px rgba(31,38,135,0.15)',
    cardRadius: '20px',
    cardPadding: '24px',
    numberBadgeStyle: 'circle',
    numberBadgeBackground: 'rgba(33,150,243,0.9)',
    numberBadgeColor: '#ffffff',
    questionStyle: {
      color: '#1565c0',
      fontFamily: '"Roboto", "Inter", system-ui, sans-serif'
    },
    decorations: { type: 'none' },
    effects: {
      overlay: 'backdrop-filter: blur(4px)'
    }
  },

  {
    name: '💎 Material Glass Purple',
    style: 'material-glass',
    cardBackground: 'linear-gradient(135deg, rgba(237,231,246,0.7), rgba(255,255,255,0.3))',
    cardBorder: '1px solid rgba(255,255,255,0.18)',
    cardShadow: '0 8px 32px rgba(103,58,183,0.15)',
    cardRadius: '20px',
    cardPadding: '24px',
    numberBadgeStyle: 'circle',
    numberBadgeBackground: 'rgba(103,58,183,0.9)',
    numberBadgeColor: '#ffffff',
    questionStyle: {
      color: '#4527a0',
      fontFamily: '"Roboto", "Inter", system-ui, sans-serif'
    },
    decorations: { type: 'none' },
    effects: {
      overlay: 'backdrop-filter: blur(4px)'
    }
  },

  // MATERIAL MINIMAL - ULTRA CLEAN
  {
    name: '⚪ Material Minimal White',
    style: 'material-minimal',
    cardBackground: '#ffffff',
    cardBorder: '1px solid #e0e0e0',
    cardShadow: '0 1px 2px rgba(0,0,0,0.05)',
    cardRadius: '4px',
    cardPadding: '24px',
    numberBadgeStyle: 'square',
    numberBadgeBackground: '#000000',
    numberBadgeColor: '#ffffff',
    questionStyle: {
      color: '#212121',
      fontFamily: '"Roboto Mono", "Courier New", monospace'
    },
    decorations: { type: 'none' }
  },

  {
    name: '⬜ Material Minimal Gray',
    style: 'material-minimal',
    cardBackground: '#fafafa',
    cardBorder: 'none',
    cardShadow: '0 1px 2px rgba(0,0,0,0.05)',
    cardRadius: '4px',
    cardPadding: '24px',
    numberBadgeStyle: 'square',
    numberBadgeBackground: '#424242',
    numberBadgeColor: '#ffffff',
    questionStyle: {
      color: '#424242',
      fontFamily: '"Roboto", "Inter", system-ui, sans-serif'
    },
    decorations: { type: 'subtle-lines' }
  },

  // MATERIAL EDUCATIONAL - SPECIFICALLY FOR TEACHERS
  {
    name: '📚 Material Academic Blue',
    style: 'material',
    cardBackground: 'linear-gradient(135deg, #f0f4ff 0%, #e0e7ff 100%)',
    cardBorder: '2px solid #3f51b5',
    cardShadow: '0 3px 6px rgba(63,81,181,0.16)',
    cardRadius: '12px',
    cardPadding: '24px',
    numberBadgeStyle: 'rounded-square',
    numberBadgeBackground: '#3f51b5',
    numberBadgeColor: '#ffffff',
    questionStyle: {
      color: '#1a237e',
      fontFamily: '"Roboto Slab", "Georgia", serif',
      fontSize: '18px',
      lineHeight: '1.6'
    },
    decorations: { type: 'none' }
  },

  {
    name: '🎓 Material Scholar Green',
    style: 'material',
    cardBackground: 'linear-gradient(135deg, #f1f8e9 0%, #dcedc8 100%)',
    cardBorder: '2px solid #689f38',
    cardShadow: '0 3px 6px rgba(104,159,56,0.16)',
    cardRadius: '12px',
    cardPadding: '24px',
    numberBadgeStyle: 'rounded-square',
    numberBadgeBackground: '#689f38',
    numberBadgeColor: '#ffffff',
    questionStyle: {
      color: '#33691e',
      fontFamily: '"Roboto Slab", "Georgia", serif',
      fontSize: '18px',
      lineHeight: '1.6'
    },
    decorations: { type: 'none' }
  },

  {
    name: '✏️ Material Classroom',
    style: 'material',
    cardBackground: '#fffef7',
    cardBorder: '2px dashed #795548',
    cardShadow: 'none',
    cardRadius: '8px',
    cardPadding: '20px',
    numberBadgeStyle: 'chip',
    numberBadgeBackground: '#795548',
    numberBadgeColor: '#ffffff',
    questionStyle: {
      color: '#3e2723',
      fontFamily: '"Comic Neue", "Comic Sans MS", cursive',
      background: 'linear-gradient(90deg, transparent 0px, transparent 49px, #ffccbc 49px, #ffccbc 51px, transparent 51px)',
      backgroundSize: '50px 100%',
      padding: '10px 10px 10px 60px'
    },
    decorations: { type: 'none' }
  },

  // ANT DESIGN THEMES - CLEAN ENTERPRISE STYLE
  {
    name: '🐜 Ant Design Default',
    style: 'antd',
    cardBackground: '#ffffff',
    cardBorder: '1px solid #d9d9d9',
    cardShadow: '0 1px 2px rgba(0,0,0,0.03), 0 1px 6px -1px rgba(0,0,0,0.02), 0 2px 4px rgba(0,0,0,0.02)',
    cardRadius: '8px',
    cardPadding: '24px',
    numberBadgeStyle: 'rounded-square',
    numberBadgeBackground: '#1890ff',
    numberBadgeColor: '#ffffff',
    questionStyle: {
      color: 'rgba(0,0,0,0.85)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
      fontSize: '16px'
    },
    decorations: { type: 'none' }
  },

  {
    name: '🔵 Ant Blue Primary',
    style: 'antd',
    cardBackground: '#ffffff',
    cardBorder: '1px solid #91d5ff',
    cardShadow: '0 2px 8px rgba(24,144,255,0.08)',
    cardRadius: '8px',
    cardPadding: '24px',
    numberBadgeStyle: 'chip',
    numberBadgeBackground: '#1890ff',
    numberBadgeColor: '#ffffff',
    questionStyle: {
      color: '#002766',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    },
    decorations: { type: 'none' }
  },

  {
    name: '🟢 Ant Success Green',
    style: 'antd',
    cardBackground: '#ffffff',
    cardBorder: '1px solid #b7eb8f',
    cardShadow: '0 2px 8px rgba(82,196,26,0.08)',
    cardRadius: '8px',
    cardPadding: '24px',
    numberBadgeStyle: 'chip',
    numberBadgeBackground: '#52c41a',
    numberBadgeColor: '#ffffff',
    questionStyle: {
      color: '#135200',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    },
    decorations: { type: 'none' }
  },

  {
    name: '⚠️ Ant Warning Gold',
    style: 'antd',
    cardBackground: '#ffffff',
    cardBorder: '1px solid #ffd591',
    cardShadow: '0 2px 8px rgba(250,173,20,0.08)',
    cardRadius: '8px',
    cardPadding: '24px',
    numberBadgeStyle: 'chip',
    numberBadgeBackground: '#faad14',
    numberBadgeColor: '#ffffff',
    questionStyle: {
      color: '#613400',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    },
    decorations: { type: 'none' }
  },

  // ANT DESIGN COLORFUL VARIANTS
  {
    name: '🌈 Ant Colorful Blue',
    style: 'antd-colorful',
    cardBackground: 'linear-gradient(135deg, #e6f7ff 0%, #bae7ff 100%)',
    cardBorder: 'none',
    cardShadow: '0 4px 12px rgba(24,144,255,0.15)',
    cardRadius: '12px',
    cardPadding: '24px',
    numberBadgeStyle: 'bubble',
    numberBadgeBackground: '#0050b3',
    numberBadgeColor: '#ffffff',
    questionStyle: {
      color: '#003a8c',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    },
    decorations: { type: 'subtle-dots' }
  },

  {
    name: '🎨 Ant Colorful Purple',
    style: 'antd-colorful',
    cardBackground: 'linear-gradient(135deg, #f9f0ff 0%, #efdbff 100%)',
    cardBorder: 'none',
    cardShadow: '0 4px 12px rgba(114,46,209,0.15)',
    cardRadius: '12px',
    cardPadding: '24px',
    numberBadgeStyle: 'bubble',
    numberBadgeBackground: '#722ed1',
    numberBadgeColor: '#ffffff',
    questionStyle: {
      color: '#391085',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    },
    decorations: { type: 'none' }
  },

  {
    name: '🌺 Ant Colorful Magenta',
    style: 'antd-colorful',
    cardBackground: 'linear-gradient(135deg, #fff0f6 0%, #ffadd2 100%)',
    cardBorder: 'none',
    cardShadow: '0 4px 12px rgba(235,47,150,0.15)',
    cardRadius: '12px',
    cardPadding: '24px',
    numberBadgeStyle: 'bubble',
    numberBadgeBackground: '#eb2f96',
    numberBadgeColor: '#ffffff',
    questionStyle: {
      color: '#780650',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    },
    decorations: { type: 'none' }
  },

  // ANT DESIGN COMPACT - SPACE EFFICIENT
  {
    name: '📦 Ant Compact Blue',
    style: 'antd-compact',
    cardBackground: '#ffffff',
    cardBorder: '1px solid #d9d9d9',
    cardShadow: '0 1px 2px rgba(0,0,0,0.03)',
    cardRadius: '4px',
    cardPadding: '16px',
    numberBadgeStyle: 'square',
    numberBadgeBackground: '#1890ff',
    numberBadgeColor: '#ffffff',
    questionStyle: {
      color: 'rgba(0,0,0,0.85)',
      fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
      fontSize: '14px'
    },
    decorations: { type: 'none' }
  },

  {
    name: '📐 Ant Compact Gray',
    style: 'antd-compact',
    cardBackground: '#fafafa',
    cardBorder: '1px solid #d9d9d9',
    cardShadow: 'none',
    cardRadius: '4px',
    cardPadding: '16px',
    numberBadgeStyle: 'square',
    numberBadgeBackground: '#595959',
    numberBadgeColor: '#ffffff',
    questionStyle: {
      color: 'rgba(0,0,0,0.85)',
      fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
      fontSize: '14px'
    },
    decorations: { type: 'subtle-lines' }
  },

  // ANT DESIGN BORDERLESS - MODERN CLEAN
  {
    name: '⭕ Ant Borderless White',
    style: 'antd-borderless',
    cardBackground: '#ffffff',
    cardBorder: 'none',
    cardShadow: '0 2px 8px rgba(0,0,0,0.06)',
    cardRadius: '8px',
    cardPadding: '24px',
    numberBadgeStyle: 'circle',
    numberBadgeBackground: '#1890ff',
    numberBadgeColor: '#ffffff',
    questionStyle: {
      color: 'rgba(0,0,0,0.85)',
      fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif'
    },
    decorations: { type: 'none' }
  },

  {
    name: '◽ Ant Borderless Light',
    style: 'antd-borderless',
    cardBackground: '#f5f5f5',
    cardBorder: 'none',
    cardShadow: 'none',
    cardRadius: '8px',
    cardPadding: '24px',
    numberBadgeStyle: 'circle',
    numberBadgeBackground: '#8c8c8c',
    numberBadgeColor: '#ffffff',
    questionStyle: {
      color: 'rgba(0,0,0,0.85)',
      fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif'
    },
    decorations: { type: 'none' }
  },

  // ANT DESIGN GEEK BLUE - TECH FOCUSED
  {
    name: '💻 Ant Geek Blue',
    style: 'antd',
    cardBackground: '#ffffff',
    cardBorder: '1px solid #85a5ff',
    cardShadow: '0 2px 8px rgba(47,84,235,0.08)',
    cardRadius: '8px',
    cardPadding: '24px',
    numberBadgeStyle: 'chip',
    numberBadgeBackground: '#2f54eb',
    numberBadgeColor: '#ffffff',
    questionStyle: {
      color: '#061178',
      fontFamily: '"SF Mono", "Monaco", "Inconsolata", monospace',
      fontSize: '15px'
    },
    decorations: { type: 'none' }
  },

  // ANT DESIGN VOLCANO - WARM AND ENERGETIC
  {
    name: '🌋 Ant Volcano',
    style: 'antd',
    cardBackground: '#ffffff',
    cardBorder: '1px solid #ffbb96',
    cardShadow: '0 2px 8px rgba(250,84,28,0.08)',
    cardRadius: '8px',
    cardPadding: '24px',
    numberBadgeStyle: 'chip',
    numberBadgeBackground: '#fa541c',
    numberBadgeColor: '#ffffff',
    questionStyle: {
      color: '#610b00',
      fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif'
    },
    decorations: { type: 'none' }
  },

  // ANT DESIGN CYAN - FRESH AND MODERN
  {
    name: '💎 Ant Cyan',
    style: 'antd',
    cardBackground: '#ffffff',
    cardBorder: '1px solid #87e8de',
    cardShadow: '0 2px 8px rgba(19,194,194,0.08)',
    cardRadius: '8px',
    cardPadding: '24px',
    numberBadgeStyle: 'chip',
    numberBadgeBackground: '#13c2c2',
    numberBadgeColor: '#ffffff',
    questionStyle: {
      color: '#00474f',
      fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif'
    },
    decorations: { type: 'none' }
  }
];

// Helper function to get theme by index
export function getDiverseThemeByIndex(index: number | string): DiverseCardTheme {
  if (typeof index === 'string' && index === 'auto') {
    // Return a random theme for auto mode
    return diverseCardThemes[Math.floor(Math.random() * diverseCardThemes.length)];
  }
  const numIndex = typeof index === 'number' ? index : parseInt(index, 10);
  return diverseCardThemes[numIndex % diverseCardThemes.length];
}

// Get all theme names for selection
export function getThemeNames(): Array<{ value: number; label: string }> {
  return diverseCardThemes.map((theme, index) => ({
    value: index,
    label: theme.name
  }));
}