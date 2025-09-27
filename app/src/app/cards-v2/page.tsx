'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Sparkles, FileText, Download, Printer, Palette, Bold, Italic, Type, Settings2 } from "lucide-react";
import { PFEQ_STRUCTURE, getNotionsForSubject, getSubNotionsForNotion } from '@/lib/pfeq-structure';
import { SimpleCustomizationPanel } from '@/components/SimpleCustomizationPanel-simplified';
import { parseQuestionWithVisuals } from '@/components/MathVisuals';
import { SimpleCardIllustration } from '@/components/SimpleCardIllustration';
import { DraggableQuestionText } from '@/components/DraggableQuestionText';
import CombinedIllustrationServiceInstance, { type IllustrationTheme } from '@/lib/combined-illustration-service';
import { allCardThemes, getAllThemeByIndex, themeCategories, FunIllustrations } from '@/lib/all-card-themes';

interface CardData {
  number: number;
  title: string;
  context?: string;
  question: string;
  answer?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  theme?: string;
  icon?: string;
}

interface GeneratedCardsData {
  cards: CardData[];
  metadata: {
    subject: string;
    grade: string;
    notion: string;
    cycle: string;
  };
}

// Helper function to handle background properties consistently
function getBackgroundStyle(bgValue: string | undefined): Record<string, string> {
  if (!bgValue) return { backgroundColor: 'transparent' };
  if (bgValue.includes('gradient') || bgValue.includes('url(')) {
    return { backgroundImage: bgValue };
  }
  return { backgroundColor: bgValue };
}

export default function CardsV2Page() {
  const [showCustomizationPanel, setShowCustomizationPanel] = useState(false);

  // Page type selection for customization
  type PageType = 'all' | 'studentCards' | 'studentAnswers' | 'teacherAnswers';
  const [selectedPageType, setSelectedPageType] = useState<PageType>('all');

  // Default settings template
  const getDefaultSettings = () => ({
    typography: {
      titleSize: 24,
      questionSize: 16,
      answerSize: 14,
      fontFamily: 'default',
      fontWeight: 'normal',
      textTransform: 'none',
      letterSpacing: 0,
      lineHeight: 1.5,
      textDecoration: 'none',
      textShadow: false,
      fontStyle: 'normal'
    },
    layout: {
      cardsPerRow: 2,
      cardSpacing: 20,
      pageMargins: 40,
      cardAlignment: 'center',
      cardOrder: 'default',
      cardRotation: 0,
      perspective: 0
    },
    visual: {
      borderRadius: 12,
      borderWidth: 2,
      borderStyle: 'solid',
      shadowIntensity: 10,
      shadowColor: '#000000',
      glowEffect: false,
      glowColor: '#3b82f6',
      backgroundOpacity: 100,
      blur: 0,
      contrast: 100,
      brightness: 100,
      saturation: 100,
      hueRotate: 0,
      gradientAngle: 45
    },
    animation: {
      enableAnimations: true,
      animationSpeed: 1,
      hoverEffect: 'lift',
      transitionDuration: 300,
      pulseEffect: false,
      bounceEffect: false,
      shakeEffect: false
    },
    advanced: {
      customCSS: '',
      enableGrid: true,
      gridColor: '#e5e5e5',
      snapToGrid: false,
      showRulers: false,
      enableGuides: false
    }
  });

  // Page-specific font settings storage - initialized with default values
  const defaultFontSettings = {
    fontFamily: 'system-ui',
    fontSize: 21,
    isBold: false,
    isItalic: false
  };

  const [pageFontSettings, setPageFontSettings] = useState({
    all: { ...defaultFontSettings },
    studentCards: { ...defaultFontSettings },
    studentAnswers: { ...defaultFontSettings },
    teacherAnswers: { ...defaultFontSettings }
  });

  // Get font settings for a specific page type
  const getPageFontSettings = (pageType: PageType) => {
    return pageFontSettings[pageType];
  };

  // Update font settings for selected page type
  const updatePageFontSettings = (settings: any) => {
    if (selectedPageType === 'all') {
      // Update all pages when 'all' is selected
      setPageFontSettings({
        all: settings,
        studentCards: settings,
        studentAnswers: settings,
        teacherAnswers: settings
      });
      setFontSettings(settings); // Update the main font settings too
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


  // Font customization states (keeping for backward compatibility)
  const [fontSettings, setFontSettings] = useState({ ...defaultFontSettings });

  // Global character illustration size state (percentage) - applies to ALL characters
  const [globalCharacterScale, setGlobalCharacterScale] = useState(100);

  // Individual illustration size adjustment (percentage)
  const [illustrationScale, setIllustrationScale] = useState(100);

  // Global visual/math elements size state (percentage)
  const [visualScale, setVisualScale] = useState(100);

  // Show/hide illustrations state
  const [showIllustrations, setShowIllustrations] = useState(true);

  // Draggable illustrations state
  const [isDraggableIllustrations, setIsDraggableIllustrations] = useState(false);
  const [transparentBackground, setTransparentBackground] = useState(false);
  const [characterTheme, setCharacterTheme] = useState<IllustrationTheme>('random');

  // Card theme state
  const [selectedCardTheme, setSelectedCardTheme] = useState<'auto' | number>('auto');

  // Question container opacity (50-100%)
  const [questionContainerOpacity, setQuestionContainerOpacity] = useState(90);

  // Draggable text state
  const [isDraggableText, setIsDraggableText] = useState(false);
  const [textPositions, setTextPositions] = useState<Record<number, { x: number; y: number; width: number; height: number }>>({});

  // Illustration transforms per card (cardIndex -> transform)
  const [illustrationTransforms, setIllustrationTransforms] = useState<Record<number, {
    x: number;
    y: number;
    scale: number;
    rotation: number;
  }>>({});

  // Editable cards state - stores edited versions of cards
  const [editedCards, setEditedCards] = useState<Record<number, CardData>>({});

  // Helper function to handle illustration transform changes
  const handleIllustrationTransformChange = (cardIndex: number, transform: {
    x: number;
    y: number;
    scale: number;
    rotation: number;
  }) => {
    setIllustrationTransforms(prev => ({
      ...prev,
      [cardIndex]: transform
    }));
  };

  // Helper function to reset illustration transforms
  const resetIllustrationTransforms = () => {
    setIllustrationTransforms({});
  };

  // Helper function to apply card 1 illustration to all left cards (odd numbers: 1, 3, 5, 7)
  const applyIllustrationToLeftPage = () => {
    const sourceTransform = illustrationTransforms[0]; // Card 1 (index 0)

    if (!sourceTransform) {
      alert('Veuillez d\'abord déplacer l\'illustration de la carte 1.');
      return;
    }

    // Create completely new transform objects to ensure React detects the change
    const newTransforms: Record<number, any> = {};

    // Copy all existing transforms
    Object.keys(illustrationTransforms).forEach(key => {
      const idx = Number(key);
      newTransforms[idx] = { ...illustrationTransforms[idx] };
    });

    // Apply to all left cards: indices 0, 2, 4, 6 (cards 1, 3, 5, 7)
    const leftIndices = [0, 2, 4, 6];
    for (const idx of leftIndices) {
      newTransforms[idx] = {
        x: sourceTransform.x,
        y: sourceTransform.y,
        scale: sourceTransform.scale,
        rotation: sourceTransform.rotation
      };
    }

    // Force re-render by briefly toggling draggable state
    setIsDraggableIllustrations(false);
    setIllustrationTransforms(newTransforms);
    setTimeout(() => {
      setIsDraggableIllustrations(true);
    }, 10);

    showSuccessMessage('Position de la carte 1 appliquée à toutes les cartes de gauche!');
  };

  // Helper function to apply card 2 illustration to all right cards (even numbers: 2, 4, 6, 8)
  const applyIllustrationToRightPage = () => {
    const sourceTransform = illustrationTransforms[1]; // Card 2 (index 1)

    if (!sourceTransform) {
      alert('Veuillez d\'abord déplacer l\'illustration de la carte 2.');
      return;
    }

    // Create completely new transform objects to ensure React detects the change
    const newTransforms: Record<number, any> = {};

    // Copy all existing transforms
    Object.keys(illustrationTransforms).forEach(key => {
      const idx = Number(key);
      newTransforms[idx] = { ...illustrationTransforms[idx] };
    });

    // Apply to all right cards: indices 1, 3, 5, 7 (cards 2, 4, 6, 8)
    const rightIndices = [1, 3, 5, 7];
    for (const idx of rightIndices) {
      newTransforms[idx] = {
        x: sourceTransform.x,
        y: sourceTransform.y,
        scale: sourceTransform.scale,
        rotation: sourceTransform.rotation
      };
    }

    // Force re-render by briefly toggling draggable state
    setIsDraggableIllustrations(false);
    setIllustrationTransforms(newTransforms);
    setTimeout(() => {
      setIsDraggableIllustrations(true);
    }, 10);

    showSuccessMessage('Position de la carte 2 appliquée à toutes les cartes de droite!');
  };

  // Helper to show success message
  const showSuccessMessage = (message: string) => {
    const successMessage = document.createElement('div');
    successMessage.textContent = message;
    successMessage.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #10b981;
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      font-weight: bold;
      z-index: 9999;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    `;
    document.body.appendChild(successMessage);
    setTimeout(() => document.body.removeChild(successMessage), 2000);
  };

  // Available fonts organized by category - EXPANDED WITH MORE FUN OPTIONS!
  const fontCategories = [
    {
      name: '🎨 Polices Super Amusantes',
      fonts: [
        { value: '"Fredoka", sans-serif', label: 'Fredoka (Arrondi & Amical)' },
        { value: '"Bubblegum Sans", cursive', label: 'Bubblegum Sans (Bulle de gomme)' },
        { value: '"Baloo 2", cursive', label: 'Baloo (Joueur)' },
        { value: '"Chewy", cursive', label: 'Chewy (Bonbon)' },
        { value: '"Luckiest Guy", cursive', label: 'Luckiest Guy (BD)' },
        { value: '"Boogaloo", cursive', label: 'Boogaloo (Groovy)' },
        { value: '"Modak", cursive', label: 'Modak (Épais & Fun)' },
        { value: '"Titan One", cursive', label: 'Titan One (Héros)' },
        { value: '"Shrikhand", cursive', label: 'Shrikhand (Bollywood)' },
        { value: '"Comfortaa", cursive', label: 'Comfortaa (Moderne & Doux)' },
        { value: '"Quicksand", sans-serif', label: 'Quicksand (Léger & Fun)' },
        { value: '"Mali", cursive', label: 'Mali (Mignon)' },
        { value: '"Sniglet", cursive', label: 'Sniglet (Arrondi)' },
        { value: '"Cherry Cream Soda", cursive', label: 'Cherry Cream Soda' },
        { value: '"Comic Sans MS", cursive', label: 'Comic Sans' },
      ]
    },
    {
      name: '🦄 Polices Fantaisie',
      fonts: [
        { value: '"Creepster", cursive', label: 'Creepster (Halloween)' },
        { value: '"Griffy", cursive', label: 'Griffy (Conte de fées)' },
        { value: '"Mystery Quest", cursive', label: 'Mystery Quest (Mystère)' },
        { value: '"Rye", cursive', label: 'Rye (Western)' },
        { value: '"Pirata One", cursive', label: 'Pirata One (Pirate)' },
        { value: '"Bungee", cursive', label: 'Bungee (Urbain)' },
        { value: '"Bungee Shade", cursive', label: 'Bungee Shade (3D)' },
        { value: '"Rubik Mono One", sans-serif', label: 'Rubik Mono (Pixels)' },
        { value: '"Press Start 2P", cursive', label: 'Press Start (Jeu vidéo)' },
        { value: '"Bangers", cursive', label: 'Bangers (Comics)' },
        { value: '"Freckle Face", cursive', label: 'Freckle Face (Taches de rousseur)' },
        { value: '"Lakki Reddy", cursive', label: 'Lakki Reddy (Indien)' },
      ]
    },
    {
      name: '✏️ Écriture Manuscrite',
      fonts: [
        { value: '"Kalam", cursive', label: 'Kalam (Crayon)' },
        { value: '"Indie Flower", cursive', label: 'Indie Flower (Décontracté)' },
        { value: '"Patrick Hand", cursive', label: 'Patrick Hand (Main écrite)' },
        { value: '"Caveat", cursive', label: 'Caveat (Craie)' },
        { value: '"Architects Daughter", cursive', label: 'Architects Daughter' },
        { value: '"Schoolbell", cursive', label: 'Schoolbell (École)' },
        { value: '"Gloria Hallelujah", cursive', label: 'Gloria Hallelujah' },
        { value: '"Shadows Into Light", cursive', label: 'Shadows Into Light' },
        { value: '"Permanent Marker", cursive', label: 'Permanent Marker (Marqueur)' },
        { value: '"Amatic SC", cursive', label: 'Amatic SC (Tableau)' },
        { value: '"Gochi Hand", cursive', label: 'Gochi Hand (Manga)' },
        { value: '"Rock Salt", cursive', label: 'Rock Salt (Sel gemme)' },
        { value: '"Reenie Beanie", cursive', label: 'Reenie Beanie (Stylo)' },
        { value: '"Covered By Your Grace", cursive', label: 'Covered By Your Grace' },
        { value: '"Just Me Again Down Here", cursive', label: 'Just Me Again (Cahier)' },
      ]
    },
    {
      name: '🎭 Polices Rigolotes',
      fonts: [
        { value: '"Bowlby One", cursive', label: 'Bowlby One (Ballon)' },
        { value: '"Sigmar One", cursive', label: 'Sigmar One (Grosse)' },
        { value: '"Coiny", cursive', label: 'Coiny (Pièce de monnaie)' },
        { value: '"Chango", cursive', label: 'Chango (Mexicain)' },
        { value: '"Lemon", cursive', label: 'Lemon (Citron)' },
        { value: '"Chicle", cursive', label: 'Chicle (Gomme)' },
        { value: '"Ribeye", cursive', label: 'Ribeye (Steak)' },
        { value: '"Wendy One", sans-serif', label: 'Wendy One' },
        { value: '"Flavors", cursive', label: 'Flavors (Saveurs)' },
        { value: '"Emilys Candy", cursive', label: 'Emilys Candy (Bonbons)' },
      ]
    },
    {
      name: '🌟 Polices Décoratives',
      fonts: [
        { value: '"Pacifico", cursive', label: 'Pacifico (Plage)' },
        { value: '"Kaushan Script", cursive', label: 'Kaushan Script (Script)' },
        { value: '"Dancing Script", cursive', label: 'Dancing Script (Danse)' },
        { value: '"Satisfy", cursive', label: 'Satisfy (Élégant)' },
        { value: '"Lobster", cursive', label: 'Lobster (Homard)' },
        { value: '"Righteous", cursive', label: 'Righteous (Justice)' },
        { value: '"Acme", sans-serif', label: 'Acme (Cartoon)' },
        { value: '"Alfaslab One", cursive', label: 'Alfa Slab (Épais)' },
      ]
    },
    {
      name: '📚 Polices Classiques',
      fonts: [
        { value: 'Arial, sans-serif', label: 'Arial' },
        { value: 'Georgia, serif', label: 'Georgia' },
        { value: '"Times New Roman", serif', label: 'Times New Roman' },
        { value: 'Verdana, sans-serif', label: 'Verdana' },
        { value: 'system-ui', label: 'System Default' },
      ]
    }
  ];

  // Flatten fonts for easy access
  const allFonts = fontCategories.flatMap(cat => cat.fonts);
  // Add print styles
  React.useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @media print {
        body * {
          visibility: hidden;
        }
        .print-area, .print-area * {
          visibility: visible;
        }
        .print-area {
          position: absolute;
          left: 0;
          top: 0;
        }
        .no-print {
          display: none !important;
        }
        @page {
          size: A4 landscape;
          margin: 0;
        }
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const [formData, setFormData] = useState({
    cycle: '',
    grade: '',
    subject: '',
    notion: '',
    subNotion: ''
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCards, setGeneratedCards] = useState<GeneratedCardsData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const cycles = [
    { value: 'cycle1-primaire', label: 'Cycle 1 (1re et 2e année)' },
    { value: 'cycle2-primaire', label: 'Cycle 2 (3e et 4e année)' },
    { value: 'cycle3-primaire', label: 'Cycle 3 (5e et 6e année)' },
  ];

  // Use PFEQ structure for subjects
  const subjects = PFEQ_STRUCTURE.map(s => ({ value: s.value, label: s.label }));

  // Get notions based on selected subject
  const notions = formData.subject ? getNotionsForSubject(formData.subject) : [];

  // Get sub-notions based on selected notion and cycle
  const subNotions = formData.notion ? getSubNotionsForNotion(formData.subject, formData.notion, formData.cycle) : [];

  const handleGenerate = async () => {
    setIsGenerating(true);
    setError(null);
    setGeneratedCards(null);

    try {
      // Send sub-notion as the notion if selected, otherwise use main notion
      const requestData = {
        cycle: formData.cycle,
        grade: formData.grade,
        subject: formData.subject,
        notion: formData.subNotion || formData.notion
      };

      const response = await fetch('/api/generate-card-v2', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestData)
      });

      const data = await response.json();

      if (data.success) {
        setGeneratedCards(data.data);
      } else {
        setError(data.error || 'Erreur lors de la génération');
      }
    } catch (err) {
      setError('Erreur de connexion au serveur');
      console.error('Generation error:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const renderCardProfessional = (card: CardData, index: number) => {
    // Use student cards font settings for this card type
    const pageFontSettings = getPageFontSettings('studentCards');

    // Use the new diverse themes
    const theme = selectedCardTheme === 'auto'
      ? getAllThemeByIndex(index)
      : getAllThemeByIndex(selectedCardTheme);

    // All professional themes use the nested structure with pattern overlay
    const themeIndex = selectedCardTheme === 'auto' ? index : selectedCardTheme;
    const isProfessionalTheme = themeIndex >= themeCategories.professional.startIndex &&
                                themeIndex <= themeCategories.professional.endIndex;
    const useNestedStructure = isProfessionalTheme; // Use nested structure for professional themes

    // Apply theme-specific styles
    const getNumberBadgeStyles = () => {
      // Check if numberBadgeBackground is a gradient or solid color
      const bgValue = theme.numberBadgeBackground || '#000';
      const isGradient = bgValue.includes('gradient') || bgValue.includes('url(');

      const baseStyles = {
        position: 'absolute' as const,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        // Use backgroundImage for gradients, backgroundColor for solid colors
        ...(isGradient
          ? { backgroundImage: bgValue }
          : { backgroundColor: bgValue }
        ),
        color: theme.numberBadgeColor || '#fff',
        fontWeight: 'bold',
        fontSize: '18px',
        zIndex: 10
      };

      switch (theme.numberBadgeStyle) {
        case 'circle':
          return { ...baseStyles, width: '40px', height: '40px', borderRadius: '50%', top: '8px', right: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' };
        case 'square':
          return { ...baseStyles, width: '35px', height: '35px', borderRadius: '0px', top: '0', right: '0' };
        case 'hexagon':
          return { ...baseStyles, width: '40px', height: '40px', clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)', top: '8px', right: '8px' };
        case 'bubble':
          return { ...baseStyles, width: '45px', height: '45px', borderRadius: '50%', border: '3px solid white', top: '8px', right: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' };
        case 'tag':
          return { ...baseStyles, padding: '5px 15px', borderRadius: '20px', top: '8px', left: '8px' };
        case 'corner':
          return { ...baseStyles, width: '0', height: '0', borderTop: '60px solid ' + (theme.numberBadgeBackground || '#000'), borderLeft: '60px solid transparent', top: '0', right: '0', color: 'transparent' };
        case 'ribbon':
          return { ...baseStyles, padding: '5px 20px', top: '20px', left: '-10px', transform: 'rotate(-5deg)' };
        default:
          return { ...baseStyles, width: '40px', height: '40px', borderRadius: '50%', top: '8px', right: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' };
      }
    };

    const numberBadgeStyles = getNumberBadgeStyles();

    // For scrapbook, bordered and fun themes, render nested structure
    if (useNestedStructure) {
      return (
        <div
          key={index}
          className="relative"
          style={{
            // Outer container with pattern overlay
            backgroundColor: theme.secondary || '#ffffff',
            backgroundImage: theme.pattern || 'none',
            border: 'none',
            borderRadius: '0',
            padding: '12px',
            height: '100%',
            width: '100%',
            boxSizing: 'border-box',
            overflow: (isDraggableIllustrations || isDraggableText) ? 'visible' : 'hidden',
            position: 'relative'
          }}
        >
          {/* Card number badge - positioned on outer container */}
          <div style={numberBadgeStyles}>
            {theme.numberBadgeStyle === 'corner' ? (
              <span style={{ position: 'absolute', top: '10px', right: '10px', color: theme.numberBadgeColor, fontWeight: 'bold', fontSize: '18px' }}>
                {card.number}
              </span>
            ) : (
              card.number
            )}
          </div>

          {/* Inner white container */}
          <div
            style={{
              backgroundColor: theme.questionStyle?.background ? (theme.questionStyle.background === '#ffffff' ? `rgba(255, 255, 255, ${questionContainerOpacity / 100})` : theme.questionStyle.background) : `rgba(255, 255, 255, ${questionContainerOpacity / 100})`,
              borderWidth: '2px',
              borderStyle: 'solid',
              borderColor: theme.primary,
              borderRadius: theme.questionStyle?.borderRadius || '12px',
              height: '100%',
              width: '100%',
              position: 'relative',
              padding: theme.questionStyle?.padding || '15px',
              boxSizing: 'border-box',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
            }}
          >
        {/* Decorative elements */}
        {theme.decorations && theme.decorations.type !== 'none' && (
            <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
              {theme.decorations.type === 'shapes' && theme.decorations.elements?.map((el, i) => (
                <span key={i} className="absolute" style={{
                  top: `${20 + i * 30}%`,
                  right: `${10 + i * 15}%`,
                  fontSize: '24px',
                  opacity: 0.2
                }}>{el}</span>
              ))}
              {theme.decorations.type === 'lines' && theme.decorations.elements?.includes('vertical-red-line') && (
                <div style={{ position: 'absolute', left: '50px', top: '0', bottom: '0', width: '2px', backgroundColor: '#ff0000' }}></div>
              )}
              {theme.decorations.type === 'dots' && (
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.1) 1px, transparent 1px)',
                  backgroundSize: '20px 20px'
                }}></div>
              )}
            </div>
          )}

        {/* Fun illustration from theme */}
        {theme.illustration && FunIllustrations[theme.illustration] && (
          <div
            dangerouslySetInnerHTML={{ __html: FunIllustrations[theme.illustration] }}
          />
        )}

          {/* Add fun illustration if enabled and no visuals */}
          {showIllustrations && (() => {
            const currentCard = editedCards[card.number] || card;
            const { questionText, visuals } = parseQuestionWithVisuals(currentCard.question);
            return visuals.length === 0 && (
              <SimpleCardIllustration
                question={questionText}
                subject={formData.subject}
                difficulty={currentCard.difficulty as 'easy' | 'medium' | 'hard' | undefined}
                size={60}
                showIllustration={showIllustrations}
                illustrationScale={globalCharacterScale}
                themeColor={theme.numberBadgeBackground || '#3b82f6'}
                cardIndex={index}
                isDraggable={isDraggableIllustrations}
                initialTransform={illustrationTransforms[index]}
                onTransformChange={(transform) => handleIllustrationTransformChange(index, transform)}
                containerBounds={{ width: 520, height: 350 }}
                transparentBackground={transparentBackground}
                characterTheme={characterTheme}
              />
            );
          })()}

          {/* Question content area */}
          <div style={{
            // Only apply non-background styles from theme
            borderWidth: theme.questionStyle?.border ? '2px' : '0',
            borderStyle: theme.questionStyle?.border ? 'solid' : 'none',
            borderColor: theme.questionStyle?.border ? theme.primary : 'transparent',
            borderRadius: theme.questionStyle?.borderRadius || '0',
            padding: theme.questionStyle?.padding || '15px',
            color: theme.questionStyle?.color || '#333333',
            fontFamily: theme.questionStyle?.fontFamily || 'inherit',
            fontSize: theme.questionStyle?.fontSize || 'inherit',
            textShadow: theme.questionStyle?.textShadow || 'none',
            boxShadow: theme.questionStyle?.boxShadow || 'none',
            backdropFilter: theme.questionStyle?.backdropFilter || 'none',
            transform: theme.questionStyle?.transform || 'none',
            // Keep positioning
            position: 'relative',
            zIndex: 1,
            marginTop: theme.numberBadgeStyle === 'tag' ? '30px' : '10px'
          }}>
            {(() => {
                // Use edited version if available, otherwise original
                const currentCard = editedCards[card.number] || card;
                const { questionText, visuals } = parseQuestionWithVisuals(currentCard.question);

                // Apply theme-specific text color if needed
                const textColor = theme.effects?.overlay?.includes('color:')
                  ? theme.effects.overlay.match(/color:\s*([^;]+)/)?.[1] || '#333333'
                  : '#333333';

                const fontOverride = theme.effects?.overlay?.includes('font-family:')
                  ? theme.effects.overlay.match(/font-family:\s*([^;]+)/)?.[1]
                  : undefined;

                const textShadow = theme.effects?.overlay?.includes('text-shadow:')
                  ? theme.effects.overlay.match(/text-shadow:\s*([^;]+)/)?.[1]
                  : undefined;

                return (
                  <>
                    {/* Question text */}
                    <DraggableQuestionText
                      cardNumber={card.number}
                      isDraggable={isDraggableText}
                      initialPosition={textPositions[card.number]}
                      onPositionChange={(cardNum, pos) => {
                        setTextPositions(prev => ({ ...prev, [cardNum]: pos }));
                      }}
                    >
                      <div
                        contentEditable
                        suppressContentEditableWarning
                        onBlur={(e) => {
                          const newText = e.currentTarget.textContent || '';
                          const visualsMatch = currentCard.question.match(/\[visual:.*?\]/g);
                          const updatedQuestion = visualsMatch ? `${newText} ${visualsMatch.join(' ')}` : newText;
                          const updatedCard = { ...currentCard, question: updatedQuestion };
                          setEditedCards(prev => ({ ...prev, [card.number]: updatedCard }));
                        }}
                        className="leading-snug outline-none focus:ring-2 focus:ring-blue-300 rounded px-1 block hover:opacity-80 hover:cursor-text transition-all"
                        style={{
                          fontFamily: fontOverride || pageFontSettings.fontFamily,
                          fontSize: `${pageFontSettings.fontSize}px`,
                          fontWeight: pageFontSettings.isBold ? 'bold' : 'normal',
                          fontStyle: pageFontSettings.isItalic ? 'italic' : 'normal',
                          cursor: 'text',
                          color: textColor,
                          textShadow: textShadow || 'none'
                        }}
                        title="Cliquez pour éditer le texte"
                      >
                        {questionText}
                      </div>
                    </DraggableQuestionText>

                    {/* Visual area - fills remaining height */}
                    {visuals.length > 0 && (
                      <div style={{
                        position: 'absolute',
                        top: '50px',  // Below question text with some spacing
                        left: 0,
                        right: 0,
                        bottom: 0,
                        padding: '10px'
                      }}>
                        <div style={{
                          width: '100%',
                          height: '100%',
                          maxWidth: '220px',
                          margin: '0 auto',
                          position: 'relative',
                          transform: `scale(${visualScale / 100})`,
                          transformOrigin: 'center center'
                        }}>
                          {visuals}
                        </div>
                      </div>
                    )}
                  </>
                );
            })()}
        </div>
          </div>
        </div>
      );
    }

    // Original rendering for non-bordered themes
    return (
      <div
        key={index}
        className="relative"
        style={{
          // Use backgroundImage for gradients, backgroundColor for solid colors
          ...(() => {
            const bgValue = theme.gradient || theme.cardBackground || '#ffffff';
            if (bgValue.includes('gradient') || bgValue.includes('url(')) {
              return { backgroundImage: bgValue };
            } else {
              return { backgroundColor: bgValue };
            }
          })(),
          borderWidth: theme.cardBorder?.match(/\d+px/)?.[0] || '0',
          borderStyle: theme.cardBorder?.match(/(solid|dashed|dotted|double)/)?.[0] || 'none',
          borderColor: theme.cardBorder?.match(/#[a-fA-F0-9]+|rgba?\([^)]+\)/)?.[0] || 'transparent',
          borderRadius: '0',
          boxShadow: theme.cardShadow || 'none',
          padding: theme.cardPadding || '20px',
          height: '100%',
          width: '100%',
          boxSizing: 'border-box',
          overflow: (isDraggableIllustrations || isDraggableText) ? 'visible' : 'hidden',
          ...((theme.effects?.overlay && theme.effects.overlay.includes('backdrop-filter')) ? { backdropFilter: 'blur(4px)' } : {}),
          ...((theme.effects?.overlay && theme.effects.overlay.includes('clip-path')) ? { clipPath: theme.effects.overlay.match(/clip-path: ([^;]+)/)?.[1] } : {})
        }}
      >
        {/* Card number badge */}
        <div style={numberBadgeStyles}>
            {theme.numberBadgeStyle === 'corner' ? (
              <span style={{ position: 'absolute', top: '10px', right: '10px', color: theme.numberBadgeColor, fontWeight: 'bold', fontSize: '18px' }}>
                {card.number}
              </span>
            ) : (
              card.number
            )}
        </div>

        {/* Decorative elements */}
        {theme.decorations && theme.decorations.type !== 'none' && (
            <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
              {theme.decorations.type === 'shapes' && theme.decorations.elements?.map((el, i) => (
                <span key={i} className="absolute" style={{
                  top: `${20 + i * 30}%`,
                  right: `${10 + i * 15}%`,
                  fontSize: '24px',
                  opacity: 0.2
                }}>{el}</span>
              ))}
              {theme.decorations.type === 'lines' && theme.decorations.elements?.includes('vertical-red-line') && (
                <div style={{ position: 'absolute', left: '50px', top: '0', bottom: '0', width: '2px', backgroundColor: '#ff0000' }}></div>
              )}
              {theme.decorations.type === 'dots' && (
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.1) 1px, transparent 1px)',
                  backgroundSize: '20px 20px'
                }}></div>
              )}
            </div>
          )}

        {/* Fun illustration from theme */}
        {theme.illustration && FunIllustrations[theme.illustration] && (
          <div
            dangerouslySetInnerHTML={{ __html: FunIllustrations[theme.illustration] }}
          />
        )}

          {/* Add fun illustration if enabled and no visuals */}
          {showIllustrations && (() => {
            const currentCard = editedCards[card.number] || card;
            const { questionText, visuals } = parseQuestionWithVisuals(currentCard.question);
            return visuals.length === 0 && (
              <SimpleCardIllustration
                question={questionText}
                subject={formData.subject}
                difficulty={currentCard.difficulty as 'easy' | 'medium' | 'hard' | undefined}
                size={60}
                showIllustration={showIllustrations}
                illustrationScale={globalCharacterScale}
                themeColor={theme.numberBadgeBackground || '#3b82f6'}
                cardIndex={index}
                isDraggable={isDraggableIllustrations}
                initialTransform={illustrationTransforms[index]}
                onTransformChange={(transform) => handleIllustrationTransformChange(index, transform)}
                containerBounds={{ width: 520, height: 350 }}
                transparentBackground={transparentBackground}
                characterTheme={characterTheme}
              />
            );
          })()}

          {/* Question content area */}
          <div style={{
            // Only apply non-background styles from theme
            borderWidth: theme.questionStyle?.border ? '2px' : '0',
            borderStyle: theme.questionStyle?.border ? 'solid' : 'none',
            borderColor: theme.questionStyle?.border ? theme.primary : 'transparent',
            borderRadius: theme.questionStyle?.borderRadius || '0',
            padding: theme.questionStyle?.padding || '15px',
            color: theme.questionStyle?.color || '#333333',
            fontFamily: theme.questionStyle?.fontFamily || 'inherit',
            fontSize: theme.questionStyle?.fontSize || 'inherit',
            textShadow: theme.questionStyle?.textShadow || 'none',
            boxShadow: theme.questionStyle?.boxShadow || 'none',
            backdropFilter: theme.questionStyle?.backdropFilter || 'none',
            transform: theme.questionStyle?.transform || 'none',
            // Keep positioning
            position: 'relative',
            zIndex: 1,
            marginTop: theme.numberBadgeStyle === 'tag' ? '30px' : '10px'
          }}>
            {(() => {
                // Use edited version if available, otherwise original
                const currentCard = editedCards[card.number] || card;
                const { questionText, visuals } = parseQuestionWithVisuals(currentCard.question);

                // Apply theme-specific text color if needed
                const textColor = theme.effects?.overlay?.includes('color:')
                  ? theme.effects.overlay.match(/color:\s*([^;]+)/)?.[1] || '#333333'
                  : '#333333';

                const fontOverride = theme.effects?.overlay?.includes('font-family:')
                  ? theme.effects.overlay.match(/font-family:\s*([^;]+)/)?.[1]
                  : undefined;

                const textShadow = theme.effects?.overlay?.includes('text-shadow:')
                  ? theme.effects.overlay.match(/text-shadow:\s*([^;]+)/)?.[1]
                  : undefined;

                return (
                  <>
                    {/* Question text */}
                    <DraggableQuestionText
                      cardNumber={card.number}
                      isDraggable={isDraggableText}
                      initialPosition={textPositions[card.number]}
                      onPositionChange={(cardNum, pos) => {
                        setTextPositions(prev => ({ ...prev, [cardNum]: pos }));
                      }}
                    >
                      <div
                        contentEditable
                        suppressContentEditableWarning
                        onBlur={(e) => {
                          const newText = e.currentTarget.textContent || '';
                          const visualsMatch = currentCard.question.match(/\[visual:.*?\]/g);
                          const updatedQuestion = visualsMatch ? `${newText} ${visualsMatch.join(' ')}` : newText;
                          const updatedCard = { ...currentCard, question: updatedQuestion };
                          setEditedCards(prev => ({ ...prev, [card.number]: updatedCard }));
                        }}
                        className="leading-snug outline-none focus:ring-2 focus:ring-blue-300 rounded px-1 block hover:opacity-80 hover:cursor-text transition-all"
                        style={{
                          fontFamily: fontOverride || pageFontSettings.fontFamily,
                          fontSize: `${pageFontSettings.fontSize}px`,
                          fontWeight: pageFontSettings.isBold ? 'bold' : 'normal',
                          fontStyle: pageFontSettings.isItalic ? 'italic' : 'normal',
                          cursor: 'text',
                          color: textColor,
                          textShadow: textShadow || 'none'
                        }}
                        title="Cliquez pour éditer le texte"
                      >
                        {questionText}
                      </div>
                    </DraggableQuestionText>

                    {/* Visual area - fills remaining height */}
                    {visuals.length > 0 && (
                      <div style={{
                        position: 'absolute',
                        top: '50px',  // Below question text with some spacing
                        left: 0,
                        right: 0,
                        bottom: 0,
                        padding: '10px'
                      }}>
                        <div style={{
                          width: '100%',
                          height: '100%',
                          maxWidth: '220px',
                          margin: '0 auto',
                          position: 'relative',
                          transform: `scale(${visualScale / 100})`,
                          transformOrigin: 'center center'
                        }}>
                          {visuals}
                        </div>
                      </div>
                    )}
                  </>
                );
            })()}
        </div>
      </div>
    );
  };

  const renderCardFun = (card: CardData, index: number) => {
    // Use student cards font settings for this card type
    const pageFontSettings = getPageFontSettings('studentCards');

    // Use the fun/pastel themes
    const theme = selectedCardTheme === 'auto'
      ? getAllThemeByIndex(index)
      : getAllThemeByIndex(selectedCardTheme);

    // Get the gradient background
    const gradient = theme.gradient || theme.cardBackground || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';

    // Get the illustration if it exists
    const illustration = theme.illustration && FunIllustrations[theme.illustration] ? (
      <div
        style={{
          position: 'absolute',
          right: '20px',
          top: '20px',
          width: '80px',
          height: '80px',
          opacity: 0.4,
          zIndex: 1
        }}
        dangerouslySetInnerHTML={{ __html: FunIllustrations[theme.illustration] }}
      />
    ) : null;

    return (
      <div
        key={index}
        className="relative"
        style={{
          backgroundImage: gradient,
          height: '100%',
          boxSizing: 'border-box',
          borderRadius: '0',
          padding: '8px',
          overflow: (isDraggableIllustrations || isDraggableText) ? 'visible' : 'hidden',
          position: 'relative'
        }}
      >
        {/* Card number badge - positioned on outer container */}
        <div
          className="absolute font-bold"
          style={{
            top: '10px',
            right: '10px',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: theme.primary || '#764ba2',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '18px',
            zIndex: 10,
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
          }}
        >
          {card.number}
        </div>

        {/* Fun illustration */}
        {illustration}

        {/* White content area */}
        <div
          className="relative shadow-lg"
          style={{
            backgroundColor: `rgba(255, 255, 255, ${questionContainerOpacity / 100})`,
            borderRadius: '20px',
            width: 'calc(100% - 16px)',
            height: 'calc(100% - 16px)',
            padding: '20px',
            borderWidth: '3px',
            borderStyle: 'solid',
            borderColor: 'rgba(255,255,255,0.8)',
            position: 'relative',
            margin: '8px',
            boxSizing: 'border-box',
            overflow: (isDraggableIllustrations || isDraggableText) ? 'visible' : 'hidden',
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
          }}
        >
          {/* Add fun illustration if enabled and no visuals */}
          {showIllustrations && (() => {
            const currentCard = editedCards[card.number] || card;
            const { questionText, visuals } = parseQuestionWithVisuals(currentCard.question);
            return visuals.length === 0 && (
              <SimpleCardIllustration
                question={questionText}
                subject={formData.subject}
                difficulty={currentCard.difficulty as 'easy' | 'medium' | 'hard' | undefined}
                size={60}
                showIllustration={showIllustrations}
                illustrationScale={globalCharacterScale}
                themeColor={theme.primary || '#764ba2'}
                cardIndex={index}
                isDraggable={isDraggableIllustrations}
                initialTransform={illustrationTransforms[index]}
                onTransformChange={(transform) => handleIllustrationTransformChange(index, transform)}
                containerBounds={{ width: 520, height: 350 }}
                transparentBackground={transparentBackground}
                characterTheme={characterTheme}
              />
            );
          })()}

          {/* Content area */}
          <div style={{
            paddingTop: '10px',
            paddingRight: '50px',
            height: 'calc(100% - 10px)',
            position: 'relative',
            zIndex: 1
          }}>
            {(() => {
              // Use edited version if available, otherwise original
              const currentCard = editedCards[card.number] || card;
              const { questionText, visuals } = parseQuestionWithVisuals(currentCard.question);

              return (
                <>
                  {isDraggableText ? (
                    <DraggableQuestionText
                      cardNumber={card.number}
                      isDraggable={isDraggableText}
                      initialPosition={textPositions[card.number]}
                      onPositionChange={(cardNum, pos) => {
                        setTextPositions(prev => ({ ...prev, [cardNum]: pos }));
                      }}
                    >
                      <div
                        contentEditable
                        suppressContentEditableWarning
                        onBlur={(e) => {
                          const newText = e.currentTarget.textContent || '';
                          const visualsMatch = currentCard.question.match(/\[visual:.*?\]/g);
                          const updatedQuestion = visualsMatch ? `${newText} ${visualsMatch.join(' ')}` : newText;
                          const updatedCard = { ...currentCard, question: updatedQuestion };
                          setEditedCards(prev => ({ ...prev, [card.number]: updatedCard }));
                        }}
                        className="leading-snug outline-none focus:ring-2 focus:ring-blue-300 rounded px-1 block hover:opacity-80 hover:cursor-text transition-all"
                        style={{
                          fontSize: `${pageFontSettings.fontSize}px`,
                          fontFamily: pageFontSettings.fontFamily,
                          fontWeight: pageFontSettings.isBold ? 'bold' : 'normal',
                          fontStyle: pageFontSettings.isItalic ? 'italic' : 'normal',
                          lineHeight: 1.6,
                          color: '#333333',
                          paddingTop: '20px',
                          cursor: 'text'
                        }}
                        title="Cliquez pour éditer le texte"
                      >
                        {questionText}
                      </div>
                    </DraggableQuestionText>
                  ) : (
                    <div
                      style={{
                        fontSize: `${pageFontSettings.fontSize}px`,
                        fontFamily: pageFontSettings.fontFamily,
                        fontWeight: pageFontSettings.isBold ? 'bold' : 'normal',
                        fontStyle: pageFontSettings.isItalic ? 'italic' : 'normal',
                        lineHeight: 1.6,
                        color: '#333333',
                        paddingTop: '20px'
                      }}
                    >
                      <div style={{ minHeight: '100px' }}>
                        {questionText}
                      </div>
                    </div>
                  )}

                  {/* Visual elements if any */}
                  {visuals.length > 0 && (
                    <div style={{ marginTop: '20px' }}>
                      <div style={{
                        display: 'inline-block',
                        margin: '0 auto',
                        position: 'relative',
                        transform: `scale(${visualScale / 100})`,
                        transformOrigin: 'center center'
                      }}>
                        {visuals}
                      </div>
                    </div>
                  )}
                </>
              );
            })()}
          </div>
        </div>
      </div>
    );
  };

  const renderCardTeacher = (card: CardData, index: number) => {
    // Use student cards font settings for this card type
    const pageFontSettings = getPageFontSettings('studentCards');

    // Get the teacher theme
    const theme = selectedCardTheme === 'auto'
      ? getAllThemeByIndex(index)
      : getAllThemeByIndex(selectedCardTheme);

    // Cast to TeacherTheme type
    const teacherTheme = theme as any;

    // Helper to render badge shape
    const renderBadge = () => {
      const badge = teacherTheme.numberBadge;
      const baseStyle: React.CSSProperties = {
        position: 'absolute',
        top: '8px',
        right: '8px',
        width: '40px',
        height: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '20px',
        fontWeight: 'bold',
        color: badge?.color || '#ffffff',
        background: badge?.background || '#ff6b9d',
        zIndex: 10,
        boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
      };

      if (badge?.shape === 'star') {
        return (
          <div
            style={{
              ...baseStyle,
              clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
              border: 'none'
            }}
          >
            {card.number}
          </div>
        );
      } else if (badge?.shape === 'cloud') {
        return (
          <div
            style={{
              ...baseStyle,
              borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
              border: badge?.border || 'none'
            }}
          >
            {card.number}
          </div>
        );
      } else if (badge?.shape === 'hexagon') {
        return (
          <div
            style={{
              ...baseStyle,
              clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
              border: 'none'
            }}
          >
            {card.number}
          </div>
        );
      } else {
        // Circle (default)
        return (
          <div
            style={{
              ...baseStyle,
              borderRadius: '50%',
              border: badge?.border || '3px solid #ffffff'
            }}
          >
            {card.number}
          </div>
        );
      }
    };

    // Render decorative elements
    const renderDecorativeElements = () => {
      if (!teacherTheme.decorativeElements || teacherTheme.decorativeElements.length === 0) return null;

      return teacherTheme.decorativeElements.map((element: string, idx: number) => {
        const positions = [
          { top: '10px', left: '10px' },
          { bottom: '10px', right: '10px' },
          { top: '50%', left: '10px' },
          { bottom: '10px', left: '10px' }
        ];
        const position = positions[idx % positions.length];

        return (
          <div
            key={idx}
            style={{
              position: 'absolute',
              ...position,
              fontSize: '24px',
              opacity: 0.6,
              transform: `rotate(${idx * 15 - 15}deg)`,
              zIndex: 0
            }}
          >
            {element}
          </div>
        );
      });
    };

    return (
      <div
        key={index}
        className="relative"
        style={{
          ...(teacherTheme.pattern ? {
            backgroundImage: `${teacherTheme.pattern}, ${teacherTheme.background || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}`,
            backgroundSize: '20px 20px, cover'
          } : {
            backgroundImage: teacherTheme.background || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
          }),
          height: '100%',
          boxSizing: 'border-box',
          borderRadius: '0',
          padding: '12px',
          overflow: (isDraggableIllustrations || isDraggableText) ? 'visible' : 'hidden',
          position: 'relative',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
        }}
      >
        {/* Number badge - positioned on outer container */}
        {renderBadge()}

        {/* Decorative elements */}
        {renderDecorativeElements()}

        {/* White content area with special border */}
        <div
          className="relative"
          style={{
            backgroundColor: teacherTheme.contentBackground ? (teacherTheme.contentBackground === '#ffffff' ? `rgba(255, 255, 255, ${questionContainerOpacity / 100})` : teacherTheme.contentBackground) : `rgba(255, 255, 255, ${questionContainerOpacity / 100})`,
            borderRadius: teacherTheme.borderRadius || '20px',
            width: 'calc(100% - 24px)',
            height: 'calc(100% - 24px)',
            padding: '24px',
            ...(teacherTheme.contentBorder ? {
              borderWidth: teacherTheme.contentBorder.match(/\d+/)?.[0] || '3',
              borderStyle: teacherTheme.contentBorderStyle || teacherTheme.contentBorder.includes('dashed') ? 'dashed' : 'solid',
              borderColor: teacherTheme.contentBorder.match(/#[a-fA-F0-9]+|rgba?\([^)]+\)/)?.[0] || '#667eea'
            } : {
              borderWidth: '3px',
              borderStyle: 'solid',
              borderColor: '#667eea'
            }),
            position: 'relative',
            margin: '12px',
            boxSizing: 'border-box',
            overflow: (isDraggableIllustrations || isDraggableText) ? 'visible' : 'hidden',
            boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
            zIndex: 1
          }}
        >
          {/* Add fun illustration if enabled */}
          {showIllustrations && (() => {
            const currentCard = editedCards[card.number] || card;
            const { questionText, visuals } = parseQuestionWithVisuals(currentCard.question);
            return visuals.length === 0 && (
              <SimpleCardIllustration
                question={questionText}
                subject={formData.subject}
                difficulty={currentCard.difficulty as 'easy' | 'medium' | 'hard' | undefined}
                size={60}
                showIllustration={showIllustrations}
                illustrationScale={globalCharacterScale}
                themeColor={teacherTheme.numberBadge?.background || '#ff6b9d'}
                cardIndex={index}
                isDraggable={isDraggableIllustrations}
                initialTransform={illustrationTransforms[index]}
                onTransformChange={(transform) => handleIllustrationTransformChange(index, transform)}
                containerBounds={{ width: 520, height: 350 }}
                transparentBackground={transparentBackground}
                characterTheme={characterTheme}
              />
            );
          })()}

          {/* Card content */}
          <div className="h-full flex flex-col relative" style={{ zIndex: 3 }}>

            {/* Context if exists */}
            {card.context && (
              <div
                className="mb-3 text-gray-600 bg-gray-50 p-2 rounded-lg"
                style={{
                  fontSize: `${pageFontSettings.fontSize - 2}px`,
                  fontFamily: pageFontSettings.fontFamily !== 'system-ui' ? pageFontSettings.fontFamily : (teacherTheme.fontFamily || 'inherit'),
                  fontStyle: 'italic'
                }}
              >
                {card.context}
              </div>
            )}

            {/* Question with draggable support */}
            <div className="flex-grow">
              {isDraggableText ? (
                <DraggableQuestionText
                  cardNumber={card.number}
                  isDraggable={isDraggableText}
                  initialPosition={textPositions[card.number]}
                  onPositionChange={(cardNum, pos) => {
                    setTextPositions(prev => ({ ...prev, [cardNum]: pos }));
                  }}
                >
                  <div
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) => {
                      const newText = e.currentTarget.textContent || '';
                      const currentCard = editedCards[card.number] || card;
                      const visualsMatch = currentCard.question.match(/\[visual:.*?\]/g);
                      const updatedQuestion = visualsMatch ? `${newText} ${visualsMatch.join(' ')}` : newText;
                      const updatedCard = { ...currentCard, question: updatedQuestion };
                      setEditedCards(prev => ({ ...prev, [card.number]: updatedCard }));
                    }}
                    className="leading-snug outline-none focus:ring-2 focus:ring-blue-300 rounded px-1 block hover:opacity-80 hover:cursor-text transition-all"
                    style={{
                      fontSize: `${pageFontSettings.fontSize}px`,
                      fontFamily: pageFontSettings.fontFamily !== 'system-ui' ? pageFontSettings.fontFamily : (teacherTheme.fontFamily || 'inherit'),
                      fontWeight: pageFontSettings.isBold ? 'bold' : 'normal',
                      fontStyle: pageFontSettings.isItalic ? 'italic' : 'normal',
                      lineHeight: 1.6,
                      color: '#2d3748',
                      minHeight: '60px',
                      cursor: 'text'
                    }}
                    title="Cliquez pour éditer le texte"
                  >
                    {editedCards[card.number]?.question.replace(/\[visual:.*?\]/g, '').trim() || card.question.replace(/\[visual:.*?\]/g, '').trim()}
                  </div>
                </DraggableQuestionText>
              ) : (
                (() => {
                  const currentCard = editedCards[card.number] || card;
                  const { questionText, visuals } = parseQuestionWithVisuals(currentCard.question);
                  return (
                    <>
                      <p
                        className="text-gray-700"
                        style={{
                          fontSize: `${pageFontSettings.fontSize}px`,
                          fontFamily: pageFontSettings.fontFamily !== 'system-ui' ? pageFontSettings.fontFamily : (teacherTheme.fontFamily || 'inherit'),
                          fontWeight: pageFontSettings.isBold ? 'bold' : 'normal',
                          fontStyle: pageFontSettings.isItalic ? 'italic' : 'normal',
                          lineHeight: 1.6,
                          minHeight: '60px',
                          color: '#2d3748'
                        }}
                      >
                        {questionText}
                      </p>
                      {visuals.length > 0 && (
                        <div
                          style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '10px',
                            marginTop: '15px',
                            justifyContent: 'center'
                          }}
                        >
                          {visuals}
                        </div>
                      )}
                    </>
                  );
                })()
              )}
            </div>

          </div>
        </div>
      </div>
    );
  };

  const renderCard = (card: CardData, index: number) => {
    // Get the current theme
    const theme = selectedCardTheme === 'auto'
      ? getAllThemeByIndex(index)
      : getAllThemeByIndex(selectedCardTheme);

    // Check theme type
    const isProfessionalTheme = theme.type === 'professional';
    const isTeacherTheme = theme.type === 'teacher';

    // Use appropriate renderer
    if (isProfessionalTheme) {
      return renderCardProfessional(card, index);
    } else if (isTeacherTheme) {
      return renderCardTeacher(card, index);
    } else {
      return renderCardFun(card, index);
    }
  };

  const renderA4Page = (cards: CardData[], pageNumber: number) => {
    return (
      <div
        key={pageNumber}
        className="mx-auto relative"
        style={{
          width: '297mm',
          height: '210mm',
          padding: 0,
          pageBreakAfter: 'always',
          position: 'relative',
          overflow: 'hidden',
          ...getBackgroundStyle(transparentBackground ? 'transparent' : 'white')
        }}
      >
        {/* Vertical cut line */}
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: 0,
            bottom: 0,
            width: '1px',
            borderLeft: '2px dashed #ccc',
            zIndex: 10,
            '@media print': {
              borderLeft: '1px dashed #999'
            }
          }}
        />

        {/* Horizontal cut line */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: '50%',
            height: '1px',
            borderTop: '2px dashed #ccc',
            zIndex: 10,
            '@media print': {
              borderTop: '1px dashed #999'
            }
          }}
        />

        {/* Cards grid */}
        <div
          className="grid grid-cols-2 grid-rows-2"
          style={{
            width: '100%',
            height: '100%',
            padding: 0,
            margin: 0
          }}
        >
          {cards.map((card, index) => renderCard(card, pageNumber * 4 + index))}
        </div>
      </div>
    );
  };

  const renderAnswerSheet = (cards: CardData[]) => {
    // Use student answer sheet font settings for this page type
    const pageFontSettings = getPageFontSettings('studentAnswers');

    // Get the selected theme (use first card's theme for consistency)
    const combinedTheme = selectedCardTheme === 'auto'
      ? getAllThemeByIndex(0)
      : getAllThemeByIndex(selectedCardTheme);

    const getThemeStyles = () => {
      // Check if it's a teacher theme
      const isTeacherTheme = combinedTheme.type === 'teacher';
      const teacherTheme = combinedTheme as any;

      if (isTeacherTheme) {
        return {
          pageBackground: teacherTheme.background || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          pattern: teacherTheme.pattern,
          cardBackground: teacherTheme.contentBackground || '#ffffff',
          borderColor: teacherTheme.contentBorder?.match(/#[a-fA-F0-9]+|rgba?\([^)]+\)/)?.[0] || '#e2e8f0',
          headerColor: teacherTheme.numberBadge?.background || '#4A7FE6',
          accentColor: teacherTheme.numberBadge?.background || '#3b82f6',
          numberBg: teacherTheme.contentBackground || '#E8F0FF',
          shadowColor: 'rgba(0, 0, 0, 0.1)',
          fontFamily: pageFontSettings.fontFamily !== 'system-ui' ? pageFontSettings.fontFamily : (teacherTheme.fontFamily || 'inherit'),
          decorativeElements: teacherTheme.decorativeElements
        };
      } else {
        return {
          pageBackground: combinedTheme.cardBackground || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          cardBackground: combinedTheme.cardBackground || '#ffffff',
          borderColor: combinedTheme.cardBorder?.split(' ')[2] || '#e2e8f0',
          headerColor: 'primary' in combinedTheme ? combinedTheme.primary : '#4A7FE6',
          accentColor: 'primary' in combinedTheme ? combinedTheme.primary : '#3b82f6',
          numberBg: combinedTheme.cardBackground || '#E8F0FF',
          shadowColor: combinedTheme.cardShadow || 'rgba(74, 127, 230, 0.2)',
          fontFamily: pageFontSettings.fontFamily || 'inherit'
        };
      }
    };

    const theme = getThemeStyles();

    return (
      <>
        {/* Page 1 - Student Info & Cards 1-4 */}
        <div
          style={{
            width: '210mm',
            height: '297mm',
            pageBreakAfter: 'always',
            backgroundImage: theme.pattern ? `${theme.pattern}, ${theme.pageBackground}` : theme.pageBackground,
            backgroundSize: theme.pattern ? '20px 20px, cover' : 'cover',
            padding: '10mm 8mm',
            position: 'relative',
            margin: '0 auto',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          {/* Decorative elements matching theme style */}
          {combinedTheme.decorations?.pattern && (
            <>
              <div style={{ position: 'absolute', top: '5mm', right: '5mm', fontSize: '40px', opacity: 0.1 }}>🌟</div>
              <div style={{ position: 'absolute', bottom: '5mm', left: '5mm', fontSize: '40px', opacity: 0.1 }}>✨</div>
              <div style={{ position: 'absolute', top: '50%', right: '5mm', fontSize: '35px', opacity: 0.08, transform: 'rotate(20deg)' }}>🎯</div>
            </>
          )}

          {/* Header with Title */}
          <div style={{ textAlign: 'center', marginBottom: '15px' }}>
            <h1 style={{
              color: theme.headerColor,
              fontSize: `${pageFontSettings.fontSize + 16}px`,
              fontWeight: pageFontSettings.isBold ? 'bold' : '600',
              fontStyle: pageFontSettings.isItalic ? 'italic' : 'normal',
              fontFamily: theme.fontFamily || pageFontSettings.fontFamily || 'inherit',
              margin: 0,
              textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
            }}>
              🎯 Feuille de Réponses 🎯
            </h1>
            <p style={{
              color: theme.headerColor,
              fontSize: `${pageFontSettings.fontSize - 2}px`,
              fontFamily: theme.fontFamily || pageFontSettings.fontFamily || 'inherit',
              fontStyle: pageFontSettings.isItalic ? 'italic' : 'normal',
              marginTop: '5px',
              opacity: 0.8
            }}>
              Écris tes réponses clairement dans les cases
            </p>
          </div>

          {/* Student Information Box */}
          <div style={{
            ...getBackgroundStyle(theme.cardBackground),
            borderWidth: theme.cardBorder?.match(/\d+px/)?.[0] || '3px',
            borderStyle: theme.cardBorder?.match(/(solid|dashed|dotted|double)/)?.[0] || 'solid',
            borderColor: theme.cardBorder?.match(/#[a-fA-F0-9]+|rgba?\([^)]+\)/)?.[0] || theme.borderColor,
            borderRadius: theme.cardRadius || '15px',
            padding: '15px 20px',
            marginBottom: '20px',
            boxShadow: `0 4px 10px ${theme.shadowColor}`
          }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{
                  fontWeight: pageFontSettings.isBold ? 'bold' : '600',
                  fontSize: `${pageFontSettings.fontSize}px`,
                  fontFamily: theme.fontFamily || pageFontSettings.fontFamily || 'inherit',
                  fontStyle: pageFontSettings.isItalic ? 'italic' : 'normal',
                  color: theme.headerColor,
                  marginRight: '8px'
                }}>
                  👤 Nom:
                </span>
                <div style={{
                  flex: 1,
                  borderBottom: `2px dotted ${theme.borderColor}`,
                  height: '25px'
                }}></div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{
                  fontWeight: pageFontSettings.isBold ? 'bold' : '600',
                  fontSize: `${pageFontSettings.fontSize}px`,
                  fontFamily: theme.fontFamily || pageFontSettings.fontFamily || 'inherit',
                  fontStyle: pageFontSettings.isItalic ? 'italic' : 'normal',
                  color: theme.headerColor,
                  marginRight: '8px'
                }}>
                  📅 Date:
                </span>
                <div style={{
                  flex: 1,
                  borderBottom: `2px dotted ${theme.borderColor}`,
                  height: '25px'
                }}></div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginTop: '15px' }}>
              <span style={{
                fontWeight: pageFontSettings.isBold ? 'bold' : '600',
                fontSize: `${16}px`,
                fontFamily: theme.fontFamily || pageFontSettings.fontFamily || 'inherit',
                fontStyle: pageFontSettings.isItalic ? 'italic' : 'normal',
                color: theme.headerColor,
                marginRight: '8px'
              }}>
                🏫 Classe:
              </span>
              <div style={{
                flex: 1,
                borderBottom: `2px dotted ${theme.borderColor}`,
                height: '25px'
              }}></div>
            </div>
          </div>

          {/* Cards 1-4 Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '15px',
            flex: 1
          }}>
            {cards.slice(0, 4).map((card) => (
              <div
                key={card.number}
                className="transition-all"
                style={{
                  ...getBackgroundStyle(theme.cardBackground),
                  borderWidth: theme.cardBorder?.match(/\d+px/)?.[0] || '3px',
                  borderStyle: theme.cardBorder?.match(/(solid|dashed|dotted|double)/)?.[0] || 'solid',
                  borderColor: theme.cardBorder?.match(/#[a-fA-F0-9]+|rgba?\([^)]+\)/)?.[0] || theme.borderColor,
                  borderRadius: theme.cardRadius || '20px',
                  padding: `${20}px`,
                  position: 'relative',
                  boxShadow: `0 6px 15px ${theme.shadowColor}`,
                  display: 'flex',
                  flexDirection: 'column',
                  opacity: 1,
                  filter: 'none',
                  transition: `all 300ms`
                }}
              >
                {/* Card Number Badge */}
                <div style={{
                  position: 'absolute',
                  top: '-15px',
                  left: '20px',
                  ...getBackgroundStyle(theme.numberBg),
                  color: theme.headerColor,
                  padding: '8px 20px',
                  borderRadius: `${25}px`,
                  fontSize: `${20}px`,
                  fontWeight: 'bold',
                  fontFamily: theme.fontFamily || pageFontSettings.fontFamily || 'inherit',
                  borderWidth: '3px',
                  borderStyle: 'solid',
                  borderColor: theme.cardBackground,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}>
                  Carte {card.number}
                </div>

                {/* Writing Lines */}
                <div style={{ marginTop: '25px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  {[1, 2, 3, 4, 5, 6].map((line) => (
                    <div
                      key={line}
                      style={{
                        borderBottom: `2px solid ${theme.borderColor}`,
                        height: '28px',
                        opacity: 0.4
                      }}
                    ></div>
                  ))}
                </div>

                {/* Decorative star */}
                <div style={{
                  position: 'absolute',
                  bottom: '10px',
                  right: '10px',
                  fontSize: '20px',
                  opacity: 0.15
                }}>⭐</div>
              </div>
            ))}
          </div>
        </div>

        {/* Page 2 - Cards 5-8 & Score */}
        <div
          style={{
            width: '210mm',
            height: '297mm',
            pageBreakAfter: 'always',
            backgroundImage: theme.pattern ? `${theme.pattern}, ${theme.pageBackground}` : theme.pageBackground,
            backgroundSize: theme.pattern ? '20px 20px, cover' : 'cover',
            padding: '10mm 8mm',
            position: 'relative',
            margin: '0 auto',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          {/* Decorative elements matching theme style */}
          {combinedTheme.decorations?.pattern && (
            <>
              <div style={{ position: 'absolute', top: '5mm', left: '5mm', fontSize: '40px', opacity: 0.1 }}>🎉</div>
              <div style={{ position: 'absolute', bottom: '5mm', right: '5mm', fontSize: '40px', opacity: 0.1 }}>🏆</div>
              <div style={{ position: 'absolute', top: '40%', left: '5mm', fontSize: '35px', opacity: 0.08, transform: 'rotate(-15deg)' }}>📝</div>
            </>
          )}

          {/* Page 2 Header */}
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <h2 style={{
              color: theme.headerColor,
              fontSize: `${pageFontSettings.fontSize + 12}px`,
              fontWeight: pageFontSettings.isBold ? 'bold' : '600',
              fontStyle: pageFontSettings.isItalic ? 'italic' : 'normal',
              fontFamily: theme.fontFamily || pageFontSettings.fontFamily || 'inherit',
              margin: 0
            }}>
              Suite des Réponses
            </h2>
          </div>

          {/* Cards 5-8 Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '15px',
            flex: 1,
            marginBottom: '20px'
          }}>
            {cards.slice(4, 8).map((card) => (
              <div
                key={card.number}
                className="transition-all"
                style={{
                  ...getBackgroundStyle(theme.cardBackground),
                  borderWidth: theme.cardBorder?.match(/\d+px/)?.[0] || '3px',
                  borderStyle: theme.cardBorder?.match(/(solid|dashed|dotted|double)/)?.[0] || 'solid',
                  borderColor: theme.cardBorder?.match(/#[a-fA-F0-9]+|rgba?\([^)]+\)/)?.[0] || theme.borderColor,
                  borderRadius: theme.cardRadius || '20px',
                  padding: `${20}px`,
                  position: 'relative',
                  boxShadow: `0 6px 15px ${theme.shadowColor}`,
                  display: 'flex',
                  flexDirection: 'column',
                  opacity: 1,
                  filter: 'none',
                  transition: `all 300ms`
                }}
              >
                {/* Card Number Badge */}
                <div style={{
                  position: 'absolute',
                  top: '-15px',
                  left: '20px',
                  ...getBackgroundStyle(theme.numberBg),
                  color: theme.headerColor,
                  padding: '8px 20px',
                  borderRadius: `${25}px`,
                  fontSize: `${20}px`,
                  fontWeight: 'bold',
                  fontFamily: theme.fontFamily || pageFontSettings.fontFamily || 'inherit',
                  borderWidth: '3px',
                  borderStyle: 'solid',
                  borderColor: theme.cardBackground,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}>
                  Carte {card.number}
                </div>

                {/* Writing Lines */}
                <div style={{ marginTop: '25px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  {[1, 2, 3, 4, 5, 6].map((line) => (
                    <div
                      key={line}
                      style={{
                        borderBottom: `2px solid ${theme.borderColor}`,
                        height: '28px',
                        opacity: 0.4
                      }}
                    ></div>
                  ))}
                </div>

                {/* Decorative star */}
                <div style={{
                  position: 'absolute',
                  bottom: '10px',
                  right: '10px',
                  fontSize: '20px',
                  opacity: 0.15
                }}>⭐</div>
              </div>
            ))}
          </div>

          {/* Score Section */}
          <div style={{
            ...getBackgroundStyle(theme.cardBackground),
            borderWidth: theme.cardBorder?.match(/\d+px/)?.[0] || '3px',
            borderStyle: theme.cardBorder?.match(/(solid|dashed|dotted|double)/)?.[0] || 'solid',
            borderColor: theme.cardBorder?.match(/#[a-fA-F0-9]+|rgba?\([^)]+\)/)?.[0] || theme.borderColor,
            borderRadius: theme.cardRadius || '20px',
            padding: '20px',
            boxShadow: `0 6px 15px ${theme.shadowColor}`,
            marginTop: 'auto'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '20px',
              alignItems: 'center'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{
                  fontWeight: pageFontSettings.isBold ? 'bold' : '600',
                  fontSize: `${pageFontSettings.fontSize + 2}px`,
                  fontFamily: theme.fontFamily || pageFontSettings.fontFamily || 'inherit',
                  fontStyle: pageFontSettings.isItalic ? 'italic' : 'normal',
                  color: theme.headerColor,
                  marginRight: '10px'
                }}>
                  ✅ Score:
                </span>
                <div style={{
                  width: '60px',
                  borderBottom: `3px solid ${theme.borderColor}`,
                  textAlign: 'center',
                  fontSize: '20px',
                  fontWeight: 'bold'
                }}>___</div>
                <span style={{ marginLeft: '5px', fontSize: '18px', color: theme.headerColor }}>/ 8</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{
                  fontWeight: pageFontSettings.isBold ? 'bold' : '600',
                  fontSize: `${pageFontSettings.fontSize + 2}px`,
                  fontFamily: theme.fontFamily || pageFontSettings.fontFamily || 'inherit',
                  fontStyle: pageFontSettings.isItalic ? 'italic' : 'normal',
                  color: theme.headerColor,
                  marginRight: '10px'
                }}>
                  📊 Note:
                </span>
                <div style={{
                  width: '60px',
                  borderBottom: `3px solid ${theme.borderColor}`,
                  textAlign: 'center',
                  fontSize: '20px',
                  fontWeight: 'bold'
                }}>___</div>
                <span style={{ marginLeft: '5px', fontSize: '18px', color: theme.headerColor }}>%</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{
                  fontWeight: pageFontSettings.isBold ? 'bold' : '600',
                  fontSize: `${pageFontSettings.fontSize + 2}px`,
                  fontFamily: theme.fontFamily || pageFontSettings.fontFamily || 'inherit',
                  fontStyle: pageFontSettings.isItalic ? 'italic' : 'normal',
                  color: theme.headerColor,
                  marginRight: '10px'
                }}>
                  ✍️ Vérifié:
                </span>
                <div style={{
                  flex: 1,
                  maxWidth: '150px',
                  borderBottom: `3px solid ${theme.borderColor}`
                }}></div>
              </div>
            </div>

            {/* Encouragement message */}
            <div style={{
              textAlign: 'center',
              marginTop: '15px',
              padding: '10px',
              ...getBackgroundStyle(theme.pageBackground),
              borderRadius: '10px'
            }}>
              <p style={{
                margin: 0,
                color: theme.headerColor,
                fontSize: '16px',
                fontWeight: 'bold'
              }}>
                🌟 Excellent travail! Continue comme ça! 🌟
              </p>
            </div>
          </div>
        </div>
      </>
    );
  };

  const renderCorrection = (cards: CardData[]) => {
    // Use teacher answer sheet font settings for this page type
    const pageFontSettings = getPageFontSettings('teacherAnswers');

    // Get the selected theme (use first card's theme for consistency)
    const combinedTheme = selectedCardTheme === 'auto'
      ? getAllThemeByIndex(0)
      : getAllThemeByIndex(selectedCardTheme);

    const getThemeStyles = () => {
      const isTeacherTheme = (combinedTheme as any).type === 'teacher';
      const teacherTheme = combinedTheme as any;

      if (isTeacherTheme) {
        return {
          pageBackground: teacherTheme.background,
          pattern: teacherTheme.pattern,
          cardBackground: teacherTheme.contentBackground,
          cardBorder: teacherTheme.contentBorder,
          borderStyle: teacherTheme.contentBorderStyle || 'solid',
          borderColor: teacherTheme.contentBorder?.split(' ')[2] || '#34d399',
          borderRadius: teacherTheme.borderRadius,
          headerColor: teacherTheme.numberBadge?.color || '#10b981',
          answerBg: '#d1fae5', // Keep light green for answers
          correctColor: '#059669', // Keep green for correct answers
          shadowColor: 'rgba(52, 211, 153, 0.2)',
          fontFamily: pageFontSettings.fontFamily !== 'system-ui' ? pageFontSettings.fontFamily : (teacherTheme.fontFamily || 'inherit'),
          decorativeElements: teacherTheme.decorativeElements,
          numberBadge: teacherTheme.numberBadge
        };
      }

      // Original theme styles for non-teacher themes
      return {
        pageBackground: combinedTheme.cardBackground || 'linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%)',
        cardBackground: combinedTheme.cardBackground || 'rgba(255, 255, 255, 0.95)',
        cardBorder: combinedTheme.cardBorder,
        borderStyle: 'solid',
        borderColor: combinedTheme.cardBorder?.split(' ')[2] || '#34d399',
        borderRadius: '0',
        headerColor: 'primary' in combinedTheme ? combinedTheme.primary : '#10b981',
        answerBg: combinedTheme.cardBackground || '#d1fae5',
        correctColor: '#059669',
        shadowColor: combinedTheme.cardShadow || 'rgba(52, 211, 153, 0.2)',
        fontFamily: pageFontSettings.fontFamily || 'inherit',
        decorativeElements: null,
        numberBadge: null
      };
    };

    const theme = getThemeStyles();

    // Split cards into two groups for two pages
    const firstPageCards = cards.slice(0, 4);
    const secondPageCards = cards.slice(4, 8);

    return (
      <>
        {/* Page 1 - Cards 1-4 */}
        <div
          style={{
            width: '210mm',
            height: '297mm',
            backgroundImage: theme.pattern ? `${theme.pattern}, ${theme.pageBackground}` : theme.pageBackground,
            backgroundSize: theme.pattern ? '20px 20px, cover' : 'cover',
            padding: '15mm',
            pageBreakBefore: 'always',
            position: 'relative',
            margin: '0 auto',
            overflow: 'hidden',
            boxSizing: 'border-box'
          }}
        >
          {/* Decorative elements for teacher themes */}
          {theme.decorativeElements && theme.decorativeElements.map((element, idx) => (
            <div
              key={idx}
              style={{
                position: 'absolute',
                fontSize: '60px',
                opacity: 0.1,
                ...(idx === 0 && { top: '10px', right: '20px', transform: 'rotate(15deg)' }),
                ...(idx === 1 && { bottom: '10px', left: '20px', transform: 'rotate(-15deg)' }),
                ...(idx === 2 && { top: '50%', left: '10px', transform: 'translateY(-50%) rotate(25deg)' }),
                ...(idx === 3 && { top: '50%', right: '10px', transform: 'translateY(-50%) rotate(-25deg)' })
              }}
            >
              {element}
            </div>
          ))}
          {!theme.decorativeElements && (
            <>
              <div style={{
                position: 'absolute',
                top: '10px',
                right: '20px',
                fontSize: '60px',
                opacity: 0.1,
                transform: 'rotate(15deg)'
              }}>✓</div>
              <div style={{
                position: 'absolute',
                bottom: '10px',
                left: '20px',
                fontSize: '60px',
                opacity: 0.1,
                transform: 'rotate(-15deg)'
              }}>★</div>
            </>
          )}

          <h2 className="text-3xl font-bold text-center mb-8" style={{
            color: theme.headerColor,
            textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
          }}>
            📝 Corrigé - {generatedCards?.metadata.subject} (Page 1/2) 📝
          </h2>

          <div className="grid grid-cols-2 gap-6">
            {firstPageCards.map((card) => {
              const currentCard = editedCards[card.number] || card;
              const questionText = currentCard.question.replace(/\[visual:.*?\]/g, '').trim();

              return (
                <div
                  key={card.number}
                  className="relative transition-all"
                  style={{
                    backgroundColor: theme.cardBackground,
                    borderWidth: theme.cardBorder?.match(/\d+px/)?.[0] || '2px',
                    borderStyle: theme.borderStyle || theme.cardBorder?.match(/(solid|dashed|dotted|double)/)?.[0] || 'solid',
                    borderColor: theme.cardBorder?.match(/#[a-fA-F0-9]+|rgba?\([^)]+\)/)?.[0] || theme.borderColor,
                    borderRadius: theme.borderRadius,
                    boxShadow: `0 2px 8px ${theme.shadowColor}`,
                    height: '250px',
                    display: 'flex',
                    flexDirection: 'column',
                    padding: `${20}px`,
                    opacity: 1,
                    filter: 'none',
                    transition: `all 300ms`
                  }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div
                      style={{
                        color: theme.headerColor,
                        fontSize: `${pageFontSettings.fontSize + 2}px`,
                        fontWeight: pageFontSettings.isBold ? 'bold' : '600',
                        fontFamily: theme.fontFamily,
                        textAlign: 'left'
                      }}
                    >
                      Carte {card.number}
                    </div>
                    <div style={{
                      ...getBackgroundStyle(theme.correctColor),
                    color: 'white',
                    borderRadius: '50%',
                    width: '24px',
                    height: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '14px',
                    fontWeight: 'bold'
                    }}>✓</div>
                  </div>
                  <div
                    className="mb-2 flex-grow"
                    style={{
                      color: '#6b7280',
                      fontSize: `${pageFontSettings.fontSize - 2}px`,
                      fontWeight: pageFontSettings.isBold ? 'bold' : 'normal',
                      fontStyle: pageFontSettings.isItalic ? 'italic' : 'normal',
                      fontFamily: theme.fontFamily,
                      textAlign: 'left',
                      lineHeight: 1.5,
                      letterSpacing: `${0}px`
                    }}
                  >
                    Q: {questionText}
                  </div>
                  <div
                    className="pt-3 rounded px-3 py-2 mt-auto"
                    style={{
                      borderTop: `${2}px ${'solid'} ${theme.borderColor}`,
                      backgroundColor: theme.answerBg,
                      color: theme.correctColor,
                      fontSize: `${pageFontSettings.fontSize - 2}px`,
                      fontWeight: pageFontSettings.isBold ? 'bold' : 'semibold',
                      fontStyle: pageFontSettings.isItalic ? 'italic' : 'normal',
                      fontFamily: theme.fontFamily,
                      textAlign: 'left'
                    }}
                  >
                    R: {currentCard.answer || 'Réponse à venir...'}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Page 2 - Cards 5-8 */}
        <div
          style={{
            width: '210mm',
            height: '297mm',
            backgroundImage: theme.pattern ? `${theme.pattern}, ${theme.pageBackground}` : theme.pageBackground,
            backgroundSize: theme.pattern ? '20px 20px, cover' : 'cover',
            padding: '15mm',
            pageBreakBefore: 'always',
            position: 'relative',
            margin: '0 auto',
            overflow: 'hidden',
            boxSizing: 'border-box'
          }}
        >
          {/* Decorative elements for teacher themes */}
          {theme.decorativeElements && theme.decorativeElements.map((element, idx) => (
            <div
              key={idx}
              style={{
                position: 'absolute',
                fontSize: '60px',
                opacity: 0.1,
                ...(idx === 0 && { top: '10px', right: '20px', transform: 'rotate(15deg)' }),
                ...(idx === 1 && { bottom: '10px', left: '20px', transform: 'rotate(-15deg)' }),
                ...(idx === 2 && { top: '50%', left: '10px', transform: 'translateY(-50%) rotate(25deg)' }),
                ...(idx === 3 && { top: '50%', right: '10px', transform: 'translateY(-50%) rotate(-25deg)' })
              }}
            >
              {element}
            </div>
          ))}
          {!theme.decorativeElements && (
            <>
              <div style={{
                position: 'absolute',
                top: '10px',
                right: '20px',
                fontSize: '60px',
                opacity: 0.1,
                transform: 'rotate(15deg)'
              }}>✓</div>
              <div style={{
                position: 'absolute',
                bottom: '10px',
                left: '20px',
                fontSize: '60px',
                opacity: 0.1,
                transform: 'rotate(-15deg)'
              }}>★</div>
            </>
          )}

          <h2 className="text-3xl font-bold text-center mb-8" style={{
            color: theme.headerColor,
            textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
          }}>
            📝 Corrigé - {generatedCards?.metadata.subject} (Page 2/2) 📝
          </h2>

          <div className="grid grid-cols-2 gap-6">
            {secondPageCards.map((card) => {
              const currentCard = editedCards[card.number] || card;
              const questionText = currentCard.question.replace(/\[visual:.*?\]/g, '').trim();

              return (
                <div
                  key={card.number}
                  className="relative transition-all"
                  style={{
                    backgroundColor: theme.cardBackground,
                    borderWidth: theme.cardBorder?.match(/\d+px/)?.[0] || '2px',
                    borderStyle: theme.borderStyle || theme.cardBorder?.match(/(solid|dashed|dotted|double)/)?.[0] || 'solid',
                    borderColor: theme.cardBorder?.match(/#[a-fA-F0-9]+|rgba?\([^)]+\)/)?.[0] || theme.borderColor,
                    borderRadius: theme.borderRadius,
                    boxShadow: `0 2px 8px ${theme.shadowColor}`,
                    height: '250px',
                    display: 'flex',
                    flexDirection: 'column',
                    padding: `${20}px`,
                    opacity: 1,
                    filter: 'none',
                    transition: `all 300ms`
                  }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div
                      style={{
                        color: theme.headerColor,
                        fontSize: `${pageFontSettings.fontSize + 2}px`,
                        fontWeight: pageFontSettings.isBold ? 'bold' : '600',
                        fontFamily: theme.fontFamily,
                        textAlign: 'left'
                      }}
                    >
                      Carte {card.number}
                    </div>
                    <div style={{
                      ...getBackgroundStyle(theme.correctColor),
                      color: 'white',
                      borderRadius: '50%',
                      width: '24px',
                      height: '24px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '14px',
                      fontWeight: 'bold'
                    }}>✓</div>
                  </div>
                  <div
                    className="mb-2 flex-grow"
                    style={{
                      color: '#6b7280',
                      fontSize: `${pageFontSettings.fontSize - 2}px`,
                      fontWeight: pageFontSettings.isBold ? 'bold' : 'normal',
                      fontStyle: pageFontSettings.isItalic ? 'italic' : 'normal',
                      fontFamily: theme.fontFamily,
                      textAlign: 'left',
                      lineHeight: 1.5,
                      letterSpacing: `${0}px`
                    }}
                  >
                    Q: {questionText}
                  </div>
                  <div
                    className="pt-3 rounded px-3 py-2 mt-auto"
                    style={{
                      borderTop: `${2}px ${'solid'} ${theme.borderColor}`,
                      backgroundColor: theme.answerBg,
                      color: theme.correctColor,
                      fontSize: `${pageFontSettings.fontSize - 2}px`,
                      fontWeight: pageFontSettings.isBold ? 'bold' : 'semibold',
                      fontStyle: pageFontSettings.isItalic ? 'italic' : 'normal',
                      fontFamily: theme.fontFamily,
                      textAlign: 'left'
                    }}
                  >
                    R: {currentCard.answer || 'Réponse à venir...'}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-auto text-center text-gray-600" style={{ position: 'absolute', bottom: '15mm', left: 0, right: 0 }}>
            <p className="text-sm">© {new Date().getFullYear()} - Généré avec Quebec Teacher Hub</p>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Customization Panel */}
      <SimpleCustomizationPanel
        isOpen={showCustomizationPanel}
        onToggle={() => setShowCustomizationPanel(!showCustomizationPanel)}
        selectedPageType={selectedPageType}
        onPageTypeChange={setSelectedPageType}
        fontSettings={pageFontSettings[selectedPageType]}
        onFontSettingsChange={updatePageFontSettings}
        isDraggableText={isDraggableText}
        onDraggableTextChange={setIsDraggableText}
        isDraggableIllustrations={isDraggableIllustrations}
        onDraggableIllustrationsChange={setIsDraggableIllustrations}
        showIllustrations={showIllustrations}
        onShowIllustrationsChange={setShowIllustrations}
        characterTheme={characterTheme}
        onCharacterThemeChange={setCharacterTheme}
        globalCharacterScale={globalCharacterScale}
        onGlobalCharacterScaleChange={setGlobalCharacterScale}
        visualScale={visualScale}
        onVisualScaleChange={setVisualScale}
        onResetIllustrationTransforms={resetIllustrationTransforms}
        onResetTextPositions={() => setTextPositions({})}
        onApplyIllustrationToLeftPage={applyIllustrationToLeftPage}
        onApplyIllustrationToRightPage={applyIllustrationToRightPage}
        selectedCardTheme={selectedCardTheme}
        onCardThemeChange={setSelectedCardTheme}
        transparentBackground={transparentBackground}
        onTransparentBackgroundChange={setTransparentBackground}
        questionContainerOpacity={questionContainerOpacity}
        onQuestionContainerOpacityChange={setQuestionContainerOpacity}
      />

      {/* Main Content - Adjusted for panel */}
      <div className={`transition-all duration-300 ${showCustomizationPanel ? 'mr-96' : ''}`}>
        <div className="p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Générateur de Cartes à Tâches V2</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Version avec contrôle de formatage côté client
          </p>
        </div>

        {/* Generation Form */}
        <Card className="mb-8 bg-gray-800 text-white border-gray-700">
          <CardHeader>
            <CardTitle>Paramètres de génération</CardTitle>
            <CardDescription className="text-gray-300">
              Configurez les paramètres pour générer vos cartes à tâches
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="space-y-2">
                <Label htmlFor="cycle" className="text-white">Cycle</Label>
                <Select
                  value={formData.cycle}
                  onValueChange={(value) => setFormData({ ...formData, cycle: value, grade: '' })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un cycle" />
                  </SelectTrigger>
                  <SelectContent>
                    {cycles.map((cycle) => (
                      <SelectItem key={cycle.value} value={cycle.value}>
                        {cycle.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="grade" className="text-white">Année</Label>
                <Select
                  value={formData.grade}
                  onValueChange={(value) => setFormData({ ...formData, grade: value })}
                  disabled={!formData.cycle}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner une année" />
                  </SelectTrigger>
                  <SelectContent>
                    {formData.cycle === 'cycle1-primaire' && (
                      <>
                        <SelectItem value="1">1re année</SelectItem>
                        <SelectItem value="2">2e année</SelectItem>
                      </>
                    )}
                    {formData.cycle === 'cycle2-primaire' && (
                      <>
                        <SelectItem value="3">3e année</SelectItem>
                        <SelectItem value="4">4e année</SelectItem>
                      </>
                    )}
                    {formData.cycle === 'cycle3-primaire' && (
                      <>
                        <SelectItem value="5">5e année</SelectItem>
                        <SelectItem value="6">6e année</SelectItem>
                      </>
                    )}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject" className="text-white">Matière</Label>
                <Select
                  value={formData.subject}
                  onValueChange={(value) => setFormData({ ...formData, subject: value, notion: '' })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner une matière" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map((subject) => (
                      <SelectItem key={subject.value} value={subject.value}>
                        {subject.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notion" className="text-white">Notion principale</Label>
                <Select
                  value={formData.notion}
                  onValueChange={(value) => setFormData({ ...formData, notion: value, subNotion: '' })}
                  disabled={!formData.subject}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner une notion" />
                  </SelectTrigger>
                  <SelectContent>
                    {notions.map((notion) => (
                      <SelectItem key={notion.value} value={notion.value}>
                        {notion.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subNotion" className="text-white">Sous-notion spécifique</Label>
                <Select
                  value={formData.subNotion}
                  onValueChange={(value) => setFormData({ ...formData, subNotion: value })}
                  disabled={!formData.notion || subNotions.length === 0}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={subNotions.length === 0 ? "Aucune sous-notion disponible" : "Sélectionner une sous-notion (optionnel)"} />
                  </SelectTrigger>
                  <SelectContent>
                    {subNotions.map((subNotion) => (
                      <SelectItem key={subNotion.value} value={subNotion.value}>
                        {subNotion.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button
              className="mt-6 w-full"
              onClick={handleGenerate}
              disabled={!formData.cycle || !formData.grade || !formData.subject || !formData.notion || isGenerating}
              title={formData.subNotion ? `Générer avec: ${formData.subNotion}` : `Générer avec: ${formData.notion}`}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Génération en cours...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Générer les cartes
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Error Display */}
        {error && (
          <Alert variant="destructive" className="mb-8">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Generated Cards Display */}
        {generatedCards && (
          <div className="space-y-8">
            {/* Tips Section */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 no-print">
              <div className="flex items-center gap-2 text-blue-700">
                <span className="text-lg">💡</span>
                <span className="font-medium">Astuce:</span>
                <span>Cliquez sur le texte des cartes pour l'éditer directement</span>
              </div>
            </div>

            <div className="flex justify-between items-center no-print">
              <h2 className="text-2xl font-bold">Cartes générées</h2>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => window.print()}>
                  <Printer className="mr-2 h-4 w-4" />
                  Imprimer
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    const element = document.querySelector('.answer-sheet-section');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Feuille-réponse
                </Button>
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Télécharger PDF
                </Button>
              </div>
            </div>

            {/* Theme Selector */}

            <div className="print-area">
              {/* Page 1: Cards 1-4 */}
              {generatedCards.cards.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-4 no-print">Page 1 - Cartes 1 à 4</h3>
                  {renderA4Page(generatedCards.cards.slice(0, 4), 0)}
                </div>
              )}

              {/* Page 2: Cards 5-8 */}
              {generatedCards.cards.length > 4 && (
                <div>
                  <h3 className="text-lg font-semibold mb-4 no-print">Page 2 - Cartes 5 à 8</h3>
                  {renderA4Page(generatedCards.cards.slice(4, 8), 1)}
                </div>
              )}

              {/* Answer Sheet */}
              <div className="answer-sheet-section mt-8">
                <h3 className="text-lg font-semibold mb-4 no-print">Feuille-Réponse</h3>
                {renderAnswerSheet(generatedCards.cards)}
              </div>

              {/* Correction */}
              <div className="correction-section mt-8">
                <h3 className="text-lg font-semibold mb-4 no-print">Corrigé</h3>
                {renderCorrection(generatedCards.cards)}
              </div>
            </div>
          </div>
        )}
        </div>
      </div>
    </div>
  );
}