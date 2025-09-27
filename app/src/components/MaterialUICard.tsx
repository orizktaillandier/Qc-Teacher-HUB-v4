'use client';

import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { SimpleCardIllustration } from './SimpleCardIllustration';
import type { IllustrationTheme } from '@/lib/combined-illustration-service';

interface MaterialUICardProps {
  question: string;
  answer?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  subject?: string;
  theme?: any;
  fontSize?: number;
  showIllustration?: boolean;
  illustrationScale?: number;
  characterTheme?: IllustrationTheme;
  cardIndex?: number;
}

// Material UI theme presets for educational cards
export const materialThemes = {
  // Material Design 3 inspired themes
  'Material Blue': createTheme({
    palette: {
      primary: { main: '#1976d2' },
      secondary: { main: '#90caf9' },
      background: { paper: '#ffffff', default: '#f5f5f5' }
    },
    shape: { borderRadius: 12 },
    shadows: [
      'none',
      '0px 2px 4px -1px rgba(0,0,0,0.06), 0px 4px 6px -1px rgba(0,0,0,0.08)',
      '0px 3px 5px -1px rgba(0,0,0,0.1), 0px 6px 10px 0px rgba(0,0,0,0.08)',
      '0px 3px 5px -1px rgba(0,0,0,0.1), 0px 8px 10px 1px rgba(0,0,0,0.08)',
      '0px 2px 4px -1px rgba(0,0,0,0.12), 0px 10px 14px 1px rgba(0,0,0,0.1)',
    ]
  }),

  'Material Green': createTheme({
    palette: {
      primary: { main: '#388e3c' },
      secondary: { main: '#a5d6a7' },
      background: { paper: '#ffffff', default: '#f1f8e9' }
    },
    shape: { borderRadius: 12 },
  }),

  'Material Purple': createTheme({
    palette: {
      primary: { main: '#7b1fa2' },
      secondary: { main: '#ce93d8' },
      background: { paper: '#ffffff', default: '#fce4ec' }
    },
    shape: { borderRadius: 12 },
  }),

  'Material Teal': createTheme({
    palette: {
      primary: { main: '#00796b' },
      secondary: { main: '#80cbc4' },
      background: { paper: '#ffffff', default: '#e0f2f1' }
    },
    shape: { borderRadius: 12 },
  }),

  'Material Orange': createTheme({
    palette: {
      primary: { main: '#f57c00' },
      secondary: { main: '#ffcc80' },
      background: { paper: '#ffffff', default: '#fff3e0' }
    },
    shape: { borderRadius: 12 },
  }),

  'Material Pink': createTheme({
    palette: {
      primary: { main: '#c2185b' },
      secondary: { main: '#f48fb1' },
      background: { paper: '#ffffff', default: '#fce4ec' }
    },
    shape: { borderRadius: 12 },
  }),

  // Educational Pastels
  'Pastel Blue': createTheme({
    palette: {
      primary: { main: '#64b5f6' },
      secondary: { main: '#bbdefb' },
      background: { paper: '#ffffff', default: '#e3f2fd' }
    },
    shape: { borderRadius: 16 },
    typography: {
      fontFamily: '"Comic Sans MS", "Segoe UI", Roboto, sans-serif'
    }
  }),

  'Pastel Mint': createTheme({
    palette: {
      primary: { main: '#81c784' },
      secondary: { main: '#c8e6c9' },
      background: { paper: '#ffffff', default: '#e8f5e9' }
    },
    shape: { borderRadius: 16 },
  }),

  'Pastel Yellow': createTheme({
    palette: {
      primary: { main: '#ffd54f' },
      secondary: { main: '#fff59d' },
      background: { paper: '#ffffff', default: '#fffde7' }
    },
    shape: { borderRadius: 16 },
  }),

  'Pastel Pink': createTheme({
    palette: {
      primary: { main: '#f48fb1' },
      secondary: { main: '#fce4ec' },
      background: { paper: '#ffffff', default: '#fce4ec' }
    },
    shape: { borderRadius: 16 },
  }),

  // Professional Academic
  'Academic Blue': createTheme({
    palette: {
      primary: { main: '#1565c0' },
      secondary: { main: '#5e92f3' },
      background: { paper: '#ffffff', default: '#f5f5f5' }
    },
    shape: { borderRadius: 4 },
    typography: {
      fontFamily: '"Georgia", "Times New Roman", serif'
    }
  }),

  'Scholar Green': createTheme({
    palette: {
      primary: { main: '#2e7d32' },
      secondary: { main: '#66bb6a' },
      background: { paper: '#ffffff', default: '#f1f8e9' }
    },
    shape: { borderRadius: 4 },
    typography: {
      fontFamily: '"Georgia", "Times New Roman", serif'
    }
  }),

  'Classic Slate': createTheme({
    palette: {
      mode: 'light',
      primary: { main: '#455a64' },
      secondary: { main: '#90a4ae' },
      background: { paper: '#ffffff', default: '#eceff1' }
    },
    shape: { borderRadius: 4 },
  }),

  // Modern Gradient Cards
  'Gradient Ocean': createTheme({
    palette: {
      primary: { main: '#0288d1' },
      secondary: { main: '#4fc3f7' },
      background: { paper: 'linear-gradient(135deg, #e1f5fe 0%, #81d4fa 100%)', default: '#f5f5f5' }
    },
    shape: { borderRadius: 20 },
  }),

  'Gradient Sunset': createTheme({
    palette: {
      primary: { main: '#ff6f00' },
      secondary: { main: '#ffab40' },
      background: { paper: 'linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%)', default: '#f5f5f5' }
    },
    shape: { borderRadius: 20 },
  }),

  'Gradient Forest': createTheme({
    palette: {
      primary: { main: '#2e7d32' },
      secondary: { main: '#66bb6a' },
      background: { paper: 'linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)', default: '#f5f5f5' }
    },
    shape: { borderRadius: 20 },
  }),

  // Minimalist
  'Pure Minimal': createTheme({
    palette: {
      primary: { main: '#000000' },
      secondary: { main: '#757575' },
      background: { paper: '#ffffff', default: '#fafafa' }
    },
    shape: { borderRadius: 0 },
    shadows: ['none', 'none', 'none', 'none', 'none'],
  }),

  'Soft Gray': createTheme({
    palette: {
      primary: { main: '#616161' },
      secondary: { main: '#9e9e9e' },
      background: { paper: '#ffffff', default: '#f5f5f5' }
    },
    shape: { borderRadius: 8 },
    shadows: ['none', '0 1px 3px rgba(0,0,0,0.12)', '0 1px 3px rgba(0,0,0,0.12)'],
  }),
};

export const MaterialUICard: React.FC<MaterialUICardProps> = ({
  question,
  answer,
  difficulty,
  subject,
  theme,
  fontSize = 16,
  showIllustration = true,
  illustrationScale = 100,
  characterTheme = 'random',
  cardIndex = 0
}) => {
  const muiTheme = theme && materialThemes[theme as keyof typeof materialThemes]
    ? materialThemes[theme as keyof typeof materialThemes]
    : materialThemes['Material Blue'];

  return (
    <ThemeProvider theme={muiTheme}>
      <Card
        elevation={2}
        sx={{
          minHeight: 200,
          position: 'relative',
          background: muiTheme.palette.background.paper,
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: muiTheme.shadows[4]
          }
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ mb: 2 }}>
            <Typography
              variant="h6"
              component="div"
              sx={{
                fontSize: `${fontSize}px`,
                fontWeight: 500,
                color: muiTheme.palette.primary.main,
                mb: 1
              }}
            >
              {question}
            </Typography>

            {answer && (
              <Typography
                variant="body1"
                sx={{
                  fontSize: `${fontSize - 2}px`,
                  color: muiTheme.palette.text.secondary,
                  mt: 2
                }}
              >
                {answer}
              </Typography>
            )}
          </Box>

          {subject && (
            <Typography
              variant="caption"
              sx={{
                position: 'absolute',
                top: 12,
                right: 12,
                backgroundColor: muiTheme.palette.secondary.main,
                color: muiTheme.palette.getContrastText(muiTheme.palette.secondary.main),
                px: 1.5,
                py: 0.5,
                borderRadius: '12px',
                fontSize: '12px',
                fontWeight: 500
              }}
            >
              {subject}
            </Typography>
          )}

          {difficulty && (
            <Box
              sx={{
                position: 'absolute',
                bottom: 12,
                right: 12,
                display: 'flex',
                gap: 0.5
              }}
            >
              {[...Array(difficulty === 'easy' ? 1 : difficulty === 'medium' ? 2 : 3)].map((_, i) => (
                <Box
                  key={i}
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    backgroundColor: muiTheme.palette.primary.main,
                    opacity: 0.8
                  }}
                />
              ))}
            </Box>
          )}

          {showIllustration && (
            <Box sx={{ position: 'absolute', bottom: 10, left: 10 }}>
              <SimpleCardIllustration
                question={question}
                subject={subject || ''}
                difficulty={difficulty}
                size={80}
                showIllustration={true}
                illustrationScale={illustrationScale}
                themeColor={muiTheme.palette.primary.main}
                cardIndex={cardIndex}
                characterTheme={characterTheme}
              />
            </Box>
          )}
        </CardContent>
      </Card>
    </ThemeProvider>
  );
};