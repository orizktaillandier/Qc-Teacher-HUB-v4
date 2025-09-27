// Classic GitHub-style themes from the original version
// These were the professional themes with bordered containers and clean layouts

export interface ClassicGitHubTheme {
  name: string;
  cardBackground: string;
  cardBorder: string;
  cardRadius: string;
  cardShadow: string;
  cardPadding?: string;
  questionStyle?: {
    background: string;
    border: string;
    borderRadius: string;
    padding: string;
    color?: string;
  };
  numberBadgeStyle?: 'circle' | 'square' | 'hexagon' | 'bubble' | 'tag' | 'corner' | 'ribbon';
  numberBadgeBackground?: string;
  numberBadgeColor?: string;
  decorations?: {
    type: 'none' | 'shapes' | 'lines' | 'dots';
    elements?: string[];
  };
}

export const classicGitHubThemes: ClassicGitHubTheme[] = [
  {
    name: '🎯 Classic Professional',
    cardBackground: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
    cardBorder: '2px solid #e1e4e8',
    cardRadius: '8px',
    cardShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
    questionStyle: {
      background: 'rgba(255, 255, 255, 0.95)',
      border: '1px solid #d1d5da',
      borderRadius: '6px',
      padding: '16px',
      color: '#24292e'
    },
    numberBadgeStyle: 'circle',
    numberBadgeBackground: '#0366d6',
    numberBadgeColor: '#ffffff'
  },
  {
    name: '📘 GitHub Blue',
    cardBackground: 'linear-gradient(to bottom, #ffffff 0%, #f6f8fa 100%)',
    cardBorder: '2px solid #0366d6',
    cardRadius: '6px',
    cardShadow: '0 1px 0 rgba(27,31,35,0.04)',
    questionStyle: {
      background: 'rgba(255, 255, 255, 0.98)',
      border: '1px solid #e1e4e8',
      borderRadius: '6px',
      padding: '16px',
      color: '#24292e'
    },
    numberBadgeStyle: 'square',
    numberBadgeBackground: '#0366d6',
    numberBadgeColor: '#ffffff'
  },
  {
    name: '🌿 GitHub Green',
    cardBackground: 'linear-gradient(135deg, #f0fff4 0%, #dcffe4 100%)',
    cardBorder: '2px solid #28a745',
    cardRadius: '6px',
    cardShadow: '0 1px 0 rgba(27,31,35,0.04)',
    questionStyle: {
      background: 'rgba(255, 255, 255, 0.95)',
      border: '1px solid #34d058',
      borderRadius: '6px',
      padding: '16px',
      color: '#165c26'
    },
    numberBadgeStyle: 'bubble',
    numberBadgeBackground: '#28a745',
    numberBadgeColor: '#ffffff'
  },
  {
    name: '🔴 GitHub Red',
    cardBackground: 'linear-gradient(135deg, #ffeef0 0%, #ffe0e6 100%)',
    cardBorder: '2px solid #d73a49',
    cardRadius: '6px',
    cardShadow: '0 1px 0 rgba(27,31,35,0.04)',
    questionStyle: {
      background: 'rgba(255, 255, 255, 0.95)',
      border: '1px solid #f97583',
      borderRadius: '6px',
      padding: '16px',
      color: '#86181d'
    },
    numberBadgeStyle: 'tag',
    numberBadgeBackground: '#d73a49',
    numberBadgeColor: '#ffffff'
  },
  {
    name: '🟣 GitHub Purple',
    cardBackground: 'linear-gradient(135deg, #f5f0ff 0%, #e6dcfd 100%)',
    cardBorder: '2px solid #6f42c1',
    cardRadius: '6px',
    cardShadow: '0 1px 0 rgba(27,31,35,0.04)',
    questionStyle: {
      background: 'rgba(255, 255, 255, 0.95)',
      border: '1px solid #8b7aa8',
      borderRadius: '6px',
      padding: '16px',
      color: '#3a1d6e'
    },
    numberBadgeStyle: 'hexagon',
    numberBadgeBackground: '#6f42c1',
    numberBadgeColor: '#ffffff'
  },
  {
    name: '⚫ GitHub Dark',
    cardBackground: 'linear-gradient(135deg, #24292e 0%, #1b1f23 100%)',
    cardBorder: '2px solid #444d56',
    cardRadius: '6px',
    cardShadow: '0 1px 0 rgba(27,31,35,0.04)',
    questionStyle: {
      background: 'rgba(255, 255, 255, 0.9)',
      border: '1px solid #586069',
      borderRadius: '6px',
      padding: '16px',
      color: '#24292e'
    },
    numberBadgeStyle: 'circle',
    numberBadgeBackground: '#f9826c',
    numberBadgeColor: '#24292e'
  },
  {
    name: '🟠 GitHub Orange',
    cardBackground: 'linear-gradient(135deg, #fff8f3 0%, #ffebda 100%)',
    cardBorder: '2px solid #fb8532',
    cardRadius: '6px',
    cardShadow: '0 1px 0 rgba(27,31,35,0.04)',
    questionStyle: {
      background: 'rgba(255, 255, 255, 0.95)',
      border: '1px solid #ffab70',
      borderRadius: '6px',
      padding: '16px',
      color: '#735c0f'
    },
    numberBadgeStyle: 'bubble',
    numberBadgeBackground: '#fb8532',
    numberBadgeColor: '#ffffff'
  },
  {
    name: '🔵 Clean Minimal',
    cardBackground: '#ffffff',
    cardBorder: '1px solid #e1e4e8',
    cardRadius: '4px',
    cardShadow: 'none',
    questionStyle: {
      background: '#f6f8fa',
      border: 'none',
      borderRadius: '4px',
      padding: '12px',
      color: '#24292e'
    },
    numberBadgeStyle: 'square',
    numberBadgeBackground: '#586069',
    numberBadgeColor: '#ffffff'
  },
  {
    name: '🌊 Ocean Gradient',
    cardBackground: 'linear-gradient(120deg, #89f7fe 0%, #66a6ff 100%)',
    cardBorder: '2px solid #0366d6',
    cardRadius: '8px',
    cardShadow: '0 4px 6px rgba(3, 102, 214, 0.1)',
    questionStyle: {
      background: 'rgba(255, 255, 255, 0.9)',
      border: '2px solid #79b8ff',
      borderRadius: '6px',
      padding: '16px',
      color: '#032f62'
    },
    numberBadgeStyle: 'circle',
    numberBadgeBackground: '#005cc5',
    numberBadgeColor: '#ffffff'
  },
  {
    name: '🍃 Fresh Mint',
    cardBackground: 'linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%)',
    cardBorder: '2px solid #28a745',
    cardRadius: '8px',
    cardShadow: '0 4px 6px rgba(40, 167, 69, 0.1)',
    questionStyle: {
      background: 'rgba(255, 255, 255, 0.9)',
      border: '2px solid #85e89d',
      borderRadius: '6px',
      padding: '16px',
      color: '#144620'
    },
    numberBadgeStyle: 'bubble',
    numberBadgeBackground: '#22863a',
    numberBadgeColor: '#ffffff'
  },
  {
    name: '🌅 Sunset Glow',
    cardBackground: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    cardBorder: '2px solid #f66a0a',
    cardRadius: '8px',
    cardShadow: '0 4px 6px rgba(246, 106, 10, 0.1)',
    questionStyle: {
      background: 'rgba(255, 255, 255, 0.9)',
      border: '2px solid #ffbf79',
      borderRadius: '6px',
      padding: '16px',
      color: '#735c0f'
    },
    numberBadgeStyle: 'tag',
    numberBadgeBackground: '#e36209',
    numberBadgeColor: '#ffffff'
  },
  {
    name: '💜 Lavender Dream',
    cardBackground: 'linear-gradient(135deg, #ddd6f3 0%, #faaca8 100%)',
    cardBorder: '2px solid #6f42c1',
    cardRadius: '8px',
    cardShadow: '0 4px 6px rgba(111, 66, 193, 0.1)',
    questionStyle: {
      background: 'rgba(255, 255, 255, 0.9)',
      border: '2px solid #b392f0',
      borderRadius: '6px',
      padding: '16px',
      color: '#4c2889'
    },
    numberBadgeStyle: 'hexagon',
    numberBadgeBackground: '#553c9a',
    numberBadgeColor: '#ffffff'
  },
  {
    name: '🎨 Creative Canvas',
    cardBackground: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    cardBorder: '2px solid #6b46c1',
    cardRadius: '12px',
    cardShadow: '0 10px 25px rgba(107, 70, 193, 0.2)',
    questionStyle: {
      background: 'rgba(255, 255, 255, 0.95)',
      border: '2px solid #9f7aea',
      borderRadius: '8px',
      padding: '18px',
      color: '#44337a'
    },
    numberBadgeStyle: 'circle',
    numberBadgeBackground: '#805ad5',
    numberBadgeColor: '#ffffff'
  },
  {
    name: '🏫 School Classic',
    cardBackground: 'linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)',
    cardBorder: '3px solid #2c3e50',
    cardRadius: '8px',
    cardShadow: '0 2px 4px rgba(0,0,0,0.1)',
    questionStyle: {
      background: '#ffffff',
      border: '2px solid #34495e',
      borderRadius: '6px',
      padding: '16px',
      color: '#2c3e50'
    },
    numberBadgeStyle: 'square',
    numberBadgeBackground: '#3498db',
    numberBadgeColor: '#ffffff'
  },
  {
    name: '📝 Notebook Paper',
    cardBackground: `
      linear-gradient(to bottom, #ffffff 95%, #e74c3c 95%, #e74c3c 100%),
      repeating-linear-gradient(
        to bottom,
        transparent,
        transparent 24px,
        #bdc3c7 24px,
        #bdc3c7 25px
      )
    `,
    cardBorder: '2px solid #34495e',
    cardRadius: '4px',
    cardShadow: '0 1px 3px rgba(0,0,0,0.12)',
    questionStyle: {
      background: 'transparent',
      border: 'none',
      borderRadius: '0',
      padding: '8px 8px 8px 40px',
      color: '#2c3e50'
    },
    numberBadgeStyle: 'circle',
    numberBadgeBackground: '#e74c3c',
    numberBadgeColor: '#ffffff',
    decorations: {
      type: 'lines',
      elements: ['vertical-red-line']
    }
  }
];

// Helper function to get theme by index
export function getClassicThemeByIndex(index: number): ClassicGitHubTheme {
  return classicGitHubThemes[index % classicGitHubThemes.length];
}