'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Sparkles, FileText, Download, Printer, Palette, Bold, Italic, Type } from "lucide-react";
import { PFEQ_STRUCTURE, getNotionsForSubject, getSubNotionsForNotion } from '@/lib/pfeq-structure';
import { FunIllustrations, GradientBackgrounds, PastelGradients } from '@/components/TaskCardThemes';
import { parseQuestionWithVisuals } from '@/components/MathVisuals';
import { CardIllustration } from '@/components/CardIllustration';
import { IllustrationService, type CharacterTheme } from '@/lib/illustration-service';

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

export default function CardsV2Page() {
  const [cardStyle, setCardStyle] = useState<'professional' | 'fun' | 'gradient'>('professional');

  // Font customization states
  const [fontSettings, setFontSettings] = useState({
    fontFamily: 'system-ui',
    fontSize: 21,
    isBold: false,
    isItalic: false
  });

  // Illustration size state (percentage)
  const [illustrationScale, setIllustrationScale] = useState(100);

  // Show/hide illustrations state
  const [showIllustrations, setShowIllustrations] = useState(true);

  // Draggable illustrations state
  const [isDraggableIllustrations, setIsDraggableIllustrations] = useState(false);
  const [transparentBackground, setTransparentBackground] = useState(false);
  const [characterTheme, setCharacterTheme] = useState<CharacterTheme>('random');

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
    // More subtle, professional patterns inspired by educational task cards
    const themes = [
      {
        primary: '#4A7FE6',
        secondary: '#E8F0FF',
        pattern: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(74, 127, 230, 0.15) 35px, rgba(74, 127, 230, 0.15) 70px)`,
        patternType: 'diagonal'
      },
      {
        primary: '#16A085',
        secondary: '#E8F6F3',
        pattern: `repeating-linear-gradient(-45deg, transparent, transparent 35px, rgba(22, 160, 133, 0.15) 35px, rgba(22, 160, 133, 0.15) 70px)`,
        patternType: 'diagonal'
      },
      {
        primary: '#E74C3C',
        secondary: '#FDEDEC',
        pattern: `repeating-linear-gradient(90deg, transparent, transparent 35px, rgba(231, 76, 60, 0.1) 35px, rgba(231, 76, 60, 0.1) 70px)`,
        patternType: 'vertical'
      },
      {
        primary: '#8E44AD',
        secondary: '#F4ECF7',
        pattern: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(142, 68, 173, 0.15) 35px, rgba(142, 68, 173, 0.15) 70px)`,
        patternType: 'diagonal'
      }
    ];

    const theme = themes[index % themes.length];

    // SVG pattern overlay for more sophisticated look
    const svgPattern = (
      <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
        <defs>
          <pattern id={`pattern-${index}`} x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            {theme.patternType === 'diagonal' && (
              <path d="M0,40 L40,0" stroke={theme.primary} strokeWidth="0.5" opacity="0.1" fill="none"/>
            )}
            {theme.patternType === 'vertical' && (
              <line x1="20" y1="0" x2="20" y2="40" stroke={theme.primary} strokeWidth="0.5" opacity="0.1"/>
            )}
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#pattern-${index})`} />
      </svg>
    );

    return (
      <div
        key={index}
        className="relative p-3"
        style={{
          background: theme.pattern,
          backgroundColor: theme.secondary,
          height: '100%',
          boxSizing: 'border-box',
          position: 'relative'
        }}
      >
        {svgPattern}

        {/* Card number in circle - at outer container level */}
        <div
          className="absolute w-10 h-10 rounded-full text-white font-bold text-lg shadow-md"
          style={{
            top: '10px',
            right: '10px',
            backgroundColor: theme.primary,
            fontSize: '18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2
          }}
        >
          {card.number}
        </div>

        {/* White content area */}
        <div
          className="relative bg-white shadow-md"
          style={{
            borderRadius: '12px',
            width: '100%',
            height: '100%',
            border: `2px solid ${theme.primary}`,
            padding: '15px',
            zIndex: 1,
            boxSizing: 'border-box',
            overflow: isDraggableIllustrations ? 'visible' : 'hidden'
          }}
        >


          {/* Main content area */}
          <div style={{ height: '100%', position: 'relative' }}>
            {(() => {
              // Use edited version if available, otherwise original
              const currentCard = editedCards[card.number] || card;
              const { questionText, visuals } = parseQuestionWithVisuals(currentCard.question);

              if (visuals.length > 0) {
                return (
                  <>
                    {/* Question text area - compact when there are visuals */}
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
                      className="text-sm leading-tight text-gray-800 outline-none focus:ring-2 focus:ring-blue-300 rounded px-1"
                      style={{
                        fontFamily: fontSettings.fontFamily,
                        fontSize: `${fontSettings.fontSize}px`,
                        fontWeight: fontSettings.isBold ? 'bold' : 'normal',
                        fontStyle: fontSettings.isItalic ? 'italic' : 'normal'
                      }}
                    >
                      {questionText}
                    </div>

                    {/* Visual area - fills remaining height */}
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
                        maxWidth: '250px',
                        margin: '0 auto',
                        position: 'relative'
                      }}>
                        {visuals}
                      </div>
                    </div>
                  </>
                );
              } else {
                // No visuals - text can use all space
                return (
                  <>
                    <div
                      contentEditable
                      suppressContentEditableWarning
                      onBlur={(e) => {
                        const newText = e.currentTarget.textContent || '';
                        const updatedCard = { ...currentCard, question: newText };
                        setEditedCards(prev => ({ ...prev, [card.number]: updatedCard }));
                      }}
                      className="text-sm leading-snug text-gray-800 outline-none focus:ring-2 focus:ring-blue-300 rounded px-1"
                      style={{
                        fontFamily: fontSettings.fontFamily,
                        fontSize: `${fontSettings.fontSize}px`,
                        fontWeight: fontSettings.isBold ? 'bold' : 'normal',
                        fontStyle: fontSettings.isItalic ? 'italic' : 'normal'
                      }}
                    >
                      {questionText}
                    </div>

                    {/* Add fun illustration if enabled */}
                    {showIllustrations && (
                      <CardIllustration
                        question={questionText}
                        subject={formData.subject}
                        difficulty={currentCard.difficulty as 'easy' | 'medium' | 'hard' | undefined}
                        size={60}
                        showIllustration={showIllustrations}
                        illustrationScale={illustrationScale}
                        themeColor={theme.primary}
                        cardIndex={index}
                        isDraggable={isDraggableIllustrations}
                        initialTransform={illustrationTransforms[index]}
                        onTransformChange={(transform) => handleIllustrationTransformChange(index, transform)}
                        containerBounds={{ width: 520, height: 350 }}
                        transparentBackground={transparentBackground}
                        characterTheme={characterTheme}
                      />
                    )}
                  </>
                );
              }
            })()}
          </div>

        </div>
      </div>
    );
  };

  const renderCardFun = (card: CardData, index: number) => {
    const gradients = PastelGradients;
    const illustrations = Object.values(FunIllustrations);
    const gradient = gradients[index % gradients.length];
    const illustration = illustrations[index % illustrations.length];

    // Extract primary color from gradient for illustration matching
    const funColors = [
      '#ffecd2', // peach
      '#a1c4fd', // light blue
      '#d4fc79', // lime green
      '#cfd9df', // gray
      '#fccb90', // orange
      '#f6d365', // yellow
      '#fbc2eb', // pink
      '#fdcbf1'  // light pink
    ];
    const primaryColor = funColors[index % funColors.length];

    return (
      <div
        key={index}
        className="relative"
        style={{
          background: gradient,
          height: '100%',
          boxSizing: 'border-box',
          borderRadius: '8px',
          padding: '8px',
          overflow: isDraggableIllustrations ? 'visible' : 'hidden'
        }}
      >
        {/* Fun illustration */}
        {illustration}

        {/* White content area with softer corners */}
        <div
          className="relative bg-white shadow-lg"
          style={{
            borderRadius: '20px',
            width: 'calc(100% - 16px)',
            height: 'calc(100% - 16px)',
            padding: '15px',
            border: '2px dashed rgba(0,0,0,0.1)',
            position: 'relative',
            margin: '8px',
            boxSizing: 'border-box',
            overflow: isDraggableIllustrations ? 'visible' : 'hidden'
          }}
        >
          {/* Large card number */}
          <div className="absolute -top-2 -right-2 text-5xl font-black opacity-20">
            {card.number}
          </div>

          {/* Add fun illustration if enabled and no visuals */}
          {showIllustrations && (() => {
            const currentCard = editedCards[card.number] || card;
            const { questionText, visuals } = parseQuestionWithVisuals(currentCard.question);
            return visuals.length === 0 && (
              <CardIllustration
                question={questionText}
                subject={formData.subject}
                difficulty={currentCard.difficulty as 'easy' | 'medium' | 'hard' | undefined}
                size={60}
                showIllustration={showIllustrations}
                illustrationScale={illustrationScale}
                themeColor={primaryColor}
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

          {/* Content with consistent layout */}
          <div style={{ paddingTop: '10px', paddingRight: '35px', height: 'calc(100% - 10px)', position: 'relative' }}>
            {(() => {
                // Use edited version if available, otherwise original
                const currentCard = editedCards[card.number] || card;
                const { questionText, visuals } = parseQuestionWithVisuals(currentCard.question);
                return (
                  <>
                    {/* Question text */}
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
                      className="text-sm leading-snug text-gray-700 outline-none focus:ring-2 focus:ring-blue-300 rounded px-1 block"
                      style={{
                        fontFamily: fontSettings.fontFamily,
                        fontSize: `${fontSettings.fontSize}px`,
                        fontWeight: fontSettings.isBold ? 'bold' : 'normal',
                        fontStyle: fontSettings.isItalic ? 'italic' : 'normal'
                      }}
                    >
                      {questionText}
                    </div>

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
                          transform: `scale(${illustrationScale / 100})`,
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

  const renderCard = (card: CardData, index: number) => {
    if (cardStyle === 'fun' || cardStyle === 'gradient') {
      return renderCardFun(card, index);
    }
    return renderCardProfessional(card, index);
  };

  const renderA4Page = (cards: CardData[], pageNumber: number) => {
    return (
      <div
        key={pageNumber}
        className="bg-white mx-auto relative"
        style={{
          width: '297mm',
          height: '210mm',
          padding: 0,
          pageBreakAfter: 'always',
          position: 'relative',
          overflow: 'hidden'
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
    return (
      <div
        className="bg-white shadow-lg mx-auto p-12"
        style={{
          width: '210mm',
          minHeight: '297mm',
          pageBreakAfter: 'always'
        }}
      >
        <h2 className="text-2xl font-bold text-center mb-8">
          Feuille Réponse - {generatedCards?.metadata.subject}
        </h2>

        <div className="mb-6 flex gap-8">
          <div>Nom: _________________________________</div>
          <div>Date: ________________</div>
        </div>

        <div className="space-y-6">
          {cards.map((card) => (
            <div key={card.number} className="border-b pb-4">
              <div className="font-semibold mb-2">Question {card.number}:</div>
              <div className="h-16 border-b-2 border-dashed border-gray-300"></div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderCorrection = (cards: CardData[]) => {
    return (
      <div
        className="bg-gray-50 shadow-lg mx-auto p-12"
        style={{
          width: '210mm',
          minHeight: '297mm'
        }}
      >
        <h2 className="text-2xl font-bold text-center mb-8">
          Corrigé - {generatedCards?.metadata.subject}
        </h2>

        <div className="space-y-4">
          {cards.map((card) => (
            <div key={card.number} className="bg-white p-4 rounded-lg">
              <div className="font-semibold text-green-700 mb-2">
                Question {card.number}: {card.title}
              </div>
              <div className="text-gray-700">
                {card.answer || 'Réponse à venir...'}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Générateur de Cartes à Tâches V2</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Version avec contrôle de formatage côté client
          </p>
        </div>

        {/* Generation Form */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Paramètres de génération</CardTitle>
            <CardDescription>
              Configurez les paramètres pour générer vos cartes à tâches
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="space-y-2">
                <Label htmlFor="cycle">Cycle</Label>
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
                <Label htmlFor="grade">Année</Label>
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
                <Label htmlFor="subject">Matière</Label>
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
                <Label htmlFor="notion">Notion principale</Label>
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
                <Label htmlFor="subNotion">Sous-notion spécifique</Label>
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
            {/* Font Customization Controls */}
            <Card className="no-print">
              <CardHeader>
                <CardTitle>Personnalisation de la police</CardTitle>
                <CardDescription>
                  Modifiez l'apparence du texte de vos cartes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4 items-center">
                  <div className="flex items-center gap-2">
                    <Type className="h-4 w-4" />
                    <Select
                      value={fontSettings.fontFamily}
                      onValueChange={(value) => setFontSettings(prev => ({ ...prev, fontFamily: value }))}
                    >
                      <SelectTrigger className="w-64">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="max-h-96 overflow-y-auto">
                        {fontCategories.map(category => (
                          <div key={category.name}>
                            <div className="px-2 py-1.5 text-xs font-semibold text-gray-600 bg-gray-100 sticky top-0">
                              {category.name}
                            </div>
                            {category.fonts.map(font => (
                              <SelectItem key={font.value} value={font.value}>
                                <span style={{ fontFamily: font.value, fontSize: '16px' }}>
                                  {font.label}
                                </span>
                              </SelectItem>
                            ))}
                          </div>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center gap-2">
                    <Label htmlFor="fontSize">Taille:</Label>
                    <input
                      id="fontSize"
                      type="range"
                      min="10"
                      max="24"
                      value={fontSettings.fontSize}
                      onChange={(e) => setFontSettings(prev => ({ ...prev, fontSize: parseInt(e.target.value) }))}
                      className="w-24"
                    />
                    <span className="w-12 text-sm">{fontSettings.fontSize}px</span>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant={fontSettings.isBold ? "default" : "outline"}
                      size="sm"
                      onClick={() => setFontSettings(prev => ({ ...prev, isBold: !prev.isBold }))}
                    >
                      <Bold className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={fontSettings.isItalic ? "default" : "outline"}
                      size="sm"
                      onClick={() => setFontSettings(prev => ({ ...prev, isItalic: !prev.isItalic }))}
                    >
                      <Italic className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex items-center gap-2">
                    <Label htmlFor="illustrationSize" className="text-sm">📐 Illustrations:</Label>
                    <input
                      id="illustrationSize"
                      type="range"
                      min="50"
                      max="150"
                      value={illustrationScale}
                      onChange={(e) => setIllustrationScale(parseInt(e.target.value))}
                      className="w-24"
                    />
                    <span className="w-12 text-sm">{illustrationScale}%</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      id="showIllustrations"
                      type="checkbox"
                      checked={showIllustrations}
                      onChange={(e) => setShowIllustrations(e.target.checked)}
                      className="w-4 h-4"
                    />
                    <label htmlFor="showIllustrations" className="text-sm font-medium cursor-pointer">
                      🎨 Afficher les illustrations amusantes
                    </label>
                  </div>

                  {showIllustrations && (
                    <>
                      <div className="flex items-center gap-2">
                        <input
                          id="draggableIllustrations"
                          type="checkbox"
                          checked={isDraggableIllustrations}
                          onChange={(e) => setIsDraggableIllustrations(e.target.checked)}
                          className="w-4 h-4"
                        />
                        <label htmlFor="draggableIllustrations" className="text-sm font-medium cursor-pointer">
                          ✋ Illustrations interactives (glisser, redimensionner, pivoter)
                        </label>
                        {isDraggableIllustrations && Object.keys(illustrationTransforms).length > 0 && (
                          <button
                            onClick={resetIllustrationTransforms}
                            className="ml-2 px-2 py-1 text-xs bg-gray-200 hover:bg-gray-300 rounded"
                            title="Remettre à zéro les positions"
                          >
                            Réinitialiser
                          </button>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <input
                          id="transparentBackground"
                          type="checkbox"
                          checked={transparentBackground}
                          onChange={(e) => setTransparentBackground(e.target.checked)}
                          className="w-4 h-4"
                        />
                        <label htmlFor="transparentBackground" className="text-sm font-medium cursor-pointer">
                          🎯 Fond transparent (sans arrière-plan coloré)
                        </label>
                      </div>

                      <div className="flex items-center gap-2">
                        <label htmlFor="characterTheme" className="text-sm font-medium">
                          🎨 Thème de personnage :
                        </label>
                        <Select value={characterTheme} onValueChange={(value) => setCharacterTheme(value as CharacterTheme)}>
                          <SelectTrigger className="w-[200px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {IllustrationService.getAvailableCharacters().map(character => (
                              <SelectItem key={character.value} value={character.value}>
                                <span>{character.icon} {character.label}</span>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </>
                  )}

                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span>💡 Cliquez sur le texte des cartes pour l'éditer directement</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-between items-center no-print">
              <h2 className="text-2xl font-bold">Cartes générées</h2>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => window.print()}>
                  <Printer className="mr-2 h-4 w-4" />
                  Imprimer
                </Button>
                <Button variant="outline" onClick={() => {
                  const styles = ['professional', 'fun', 'gradient'] as const;
                  const currentIndex = styles.indexOf(cardStyle);
                  const nextIndex = (currentIndex + 1) % styles.length;
                  setCardStyle(styles[nextIndex]);
                }}>
                  <Palette className="mr-2 h-4 w-4" />
                  Style: {cardStyle === 'professional' ? 'Professionnel' : cardStyle === 'fun' ? 'Amusant' : 'Gradient'}
                </Button>
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Télécharger PDF
                </Button>
              </div>
            </div>

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
              <div className="no-print">
                <h3 className="text-lg font-semibold mb-4">Feuille Réponse</h3>
                {renderAnswerSheet(generatedCards.cards)}
              </div>

              {/* Correction */}
              <div className="no-print">
                <h3 className="text-lg font-semibold mb-4">Corrigé</h3>
                {renderCorrection(generatedCards.cards)}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}