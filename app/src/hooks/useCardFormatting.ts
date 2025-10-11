'use client';

import { useState } from 'react';
import type { IllustrationTheme } from '@/lib/combined-illustration-service';

// Page type for font customization
export type PageType = 'all' | 'studentCards' | 'studentAnswers' | 'teacherAnswers';

// Font settings interface
interface FontSettings {
  fontFamily: string;
  fontSize: number;
  isBold: boolean;
  isItalic: boolean;
}

// Illustration transform interface
interface IllustrationTransform {
  x: number;
  y: number;
  scale: number;
  rotation: number;
}

// Text position interface
interface TextPosition {
  x: number;
  y: number;
  width: number;
  height: number;
}

// Card data interface
export interface CardData {
  number: number;
  title: string;
  context?: string;
  question: string;
  answer?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  theme?: string;
  icon?: string;
}

export function useCardFormatting() {
  // Default font settings
  const defaultFontSettings: FontSettings = {
    fontFamily: 'system-ui',
    fontSize: 21,
    isBold: false,
    isItalic: false
  };

  // Page type selection
  const [selectedPageType, setSelectedPageType] = useState<PageType>('all');

  // Page-specific font settings
  const [pageFontSettings, setPageFontSettings] = useState({
    all: { ...defaultFontSettings },
    studentCards: { ...defaultFontSettings },
    studentAnswers: { ...defaultFontSettings },
    teacherAnswers: { ...defaultFontSettings }
  });

  // Font settings (for backward compatibility)
  const [fontSettings, setFontSettings] = useState({ ...defaultFontSettings });

  // Visual scaling
  const [globalCharacterScale, setGlobalCharacterScale] = useState(100);
  const [illustrationScale, setIllustrationScale] = useState(100);
  const [visualScale, setVisualScale] = useState(100);

  // Illustration settings
  const [showIllustrations, setShowIllustrations] = useState(true);
  const [isDraggableIllustrations, setIsDraggableIllustrations] = useState(false);
  const [transparentBackground, setTransparentBackground] = useState(false);
  const [characterTheme, setCharacterTheme] = useState<IllustrationTheme>('random');

  // Theme selection
  const [selectedCardTheme, setSelectedCardTheme] = useState<'auto' | number>('auto');

  // Question container opacity
  const [questionContainerOpacity, setQuestionContainerOpacity] = useState(90);

  // Draggable text
  const [isDraggableText, setIsDraggableText] = useState(false);
  const [textPositions, setTextPositions] = useState<Record<number, TextPosition>>({});

  // Illustration transforms
  const [illustrationTransforms, setIllustrationTransforms] = useState<Record<number, IllustrationTransform>>({});

  // Edited cards
  const [editedCards, setEditedCards] = useState<Record<number, CardData>>({});

  // Helper functions
  const getPageFontSettings = (pageType: PageType) => {
    return pageFontSettings[pageType];
  };

  const updatePageFontSettings = (settings: FontSettings) => {
    if (selectedPageType === 'all') {
      // Update all pages when 'all' is selected
      setPageFontSettings({
        all: settings,
        studentCards: settings,
        studentAnswers: settings,
        teacherAnswers: settings
      });
      setFontSettings(settings);
    } else {
      // Update only the selected page type
      setPageFontSettings(prev => ({
        ...prev,
        [selectedPageType]: settings
      }));
      // If editing a specific page, update main font settings to match
      if (selectedPageType === 'studentCards') {
        setFontSettings(settings);
      }
    }
  };

  const handleIllustrationTransformChange = (index: number, transform: IllustrationTransform) => {
    setIllustrationTransforms(prev => ({
      ...prev,
      [index]: transform
    }));
  };

  const handleTextPositionChange = (index: number, position: TextPosition) => {
    setTextPositions(prev => ({
      ...prev,
      [index]: position
    }));
  };

  const updateEditedCard = (cardNumber: number, card: CardData) => {
    setEditedCards(prev => ({
      ...prev,
      [cardNumber]: card
    }));
  };

  return {
    // State values
    selectedPageType,
    pageFontSettings,
    fontSettings,
    globalCharacterScale,
    illustrationScale,
    visualScale,
    showIllustrations,
    isDraggableIllustrations,
    transparentBackground,
    characterTheme,
    selectedCardTheme,
    questionContainerOpacity,
    isDraggableText,
    textPositions,
    illustrationTransforms,
    editedCards,

    // State setters
    setSelectedPageType,
    setPageFontSettings,
    setFontSettings,
    setGlobalCharacterScale,
    setIllustrationScale,
    setVisualScale,
    setShowIllustrations,
    setIsDraggableIllustrations,
    setTransparentBackground,
    setCharacterTheme,
    setSelectedCardTheme,
    setQuestionContainerOpacity,
    setIsDraggableText,
    setTextPositions,
    setIllustrationTransforms,
    setEditedCards,

    // Helper functions
    getPageFontSettings,
    updatePageFontSettings,
    handleIllustrationTransformChange,
    handleTextPositionChange,
    updateEditedCard
  };
}