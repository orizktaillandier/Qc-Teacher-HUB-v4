'use client';

import React, { useState, useEffect } from 'react';
import { parseQuestionWithVisuals } from '@/components/MathVisuals';
import { SimpleCardIllustration } from '@/components/SimpleCardIllustration';
import { EditableQuestionText } from '@/components/EditableQuestionText';
import { getAllThemeByIndex, FunIllustrations } from '@/lib/themes/all-card-themes';
import { advancedCreativeThemes } from '@/lib/themes/advanced-creative-themes';
import { imageIntegratedThemes } from '@/lib/themes/image-integrated-themes';
import { dallePoweredThemes } from '@/lib/themes/dalle-powered-themes-static';
import type { IllustrationTheme } from '@/lib/combined-illustration-service';
import { Clipboard, Check, RotateCcw } from 'lucide-react';

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

interface CardRendererProps {
  cards: CardData[];
  displayMode: 'studentCards' | 'answerSheet' | 'corriger';
  selectedCardTheme?: 'auto' | number;
  selectedAdvancedTheme?: number | null;
  selectedImageTheme?: number | null;
  selectedDalleTheme?: number | null;
  dalleImages?: { [key: string]: string };
  manualScale?: number;

  // Customization options from v4
  showIllustrations?: boolean;
  globalCharacterScale?: number;
  visualScale?: number;
  transparentBackground?: boolean;
  characterTheme?: IllustrationTheme;
  characterMood?: 'sad' | 'shocked' | 'happy' | 'blissful' | 'lovestruck' | 'excited' | 'ko';
  characterColor?: string;
  isDraggableIllustrations?: boolean;
  isDraggableText?: boolean;
  questionContainerOpacity?: number;

  // Font settings
  fontSettings?: {
    fontFamily: string;
    fontSize: number;
    fontWeight: number;
    isBold: boolean;
    isItalic: boolean;
    isUnderline: boolean;
    textAlign: 'left' | 'center' | 'right';
    textBackground: number;
  };

  // Edit handlers
  editedCards?: Record<number, CardData>;
  illustrationTransforms?: Record<number, any>;
  textPositions?: Record<number, any>;
  editedTexts?: Record<number, string>;
  onIllustrationTransformChange?: (index: number, transform: any) => void;
  onTextPositionChange?: (index: number, position: any) => void;
  onTextChange?: (index: number, text: string) => void;
  onEditModeChange?: (index: number, isEditing: boolean) => void;
  onBulkAction?: (action: 'position' | 'size', sourceCardIndex: number) => void;
}

// Helper function for backgrounds
function getBackgroundStyle(bgValue: string | undefined): Record<string, string> {
  if (!bgValue) return { backgroundColor: 'transparent' };
  if (bgValue.includes('gradient') || bgValue.includes('url(')) {
    return { backgroundImage: bgValue };
  }
  return { backgroundColor: bgValue };
}


export function CardRenderer({
  cards,
  displayMode,
  selectedCardTheme = 'auto',
  selectedAdvancedTheme = null,
  selectedImageTheme = null,
  selectedDalleTheme = null,
  dalleImages = {},
  manualScale,
  showIllustrations = true,
  globalCharacterScale = 100,
  visualScale = 100,
  transparentBackground = false,
  characterTheme = 'random',
  characterMood,
  characterColor,
  isDraggableIllustrations = false,
  isDraggableText = false,
  questionContainerOpacity = 90,
  fontSettings = {
    fontFamily: 'system-ui',
    fontSize: 21,
    fontWeight: 400,
    isBold: false,
    isItalic: false,
    isUnderline: false,
    textAlign: 'center' as const,
    textBackground: 90
  },
  editedCards = {},
  illustrationTransforms = {},
  textPositions = {},
  editedTexts = {},
  onIllustrationTransformChange = () => {},
  onTextPositionChange = () => {},
  onTextChange = () => {},
  onEditModeChange = () => {},
  onBulkAction = () => {},
}: CardRendererProps) {
  // State for copied character settings
  const [copiedSettings, setCopiedSettings] = useState<{x: number, y: number, scale: number, rotation: number} | null>(null);

  // Handle copying settings from a character
  const handleCopySettings = (transform: {x: number, y: number, scale: number, rotation: number}) => {
    setCopiedSettings(transform);
  };

  // Handle applying copied settings to all cards
  const handleApplyToAllCards = () => {
    if (!copiedSettings) return;

    // Apply the copied settings to all cards by updating their transforms
    cards.forEach((_, index) => {
      onIllustrationTransformChange(index, copiedSettings);
    });
  };

  // Handle resetting all illustration transforms to default
  const handleResetAllTransforms = () => {
    const defaultTransform = { x: 10, y: 10, scale: 1, rotation: 0 };

    // Reset all cards to default transform
    cards.forEach((_, index) => {
      onIllustrationTransformChange(index, defaultTransform);
    });

    // Clear copied settings as well
    setCopiedSettings(null);
  };

  // Render individual card based on theme type
  const renderCard = (card: CardData, index: number) => {
    // Check if using DALL-E powered theme
    if (selectedDalleTheme !== null && dallePoweredThemes[selectedDalleTheme]) {
      return renderCardDallePowered(card, index);
    }

    // Check if using image-integrated theme
    if (selectedImageTheme !== null && imageIntegratedThemes[selectedImageTheme]) {
      return renderCardImageIntegrated(card, index);
    }

    // Check if using advanced theme
    if (selectedAdvancedTheme !== null && advancedCreativeThemes[selectedAdvancedTheme]) {
      return renderCardAdvanced(card, index);
    }

    // If selectedCardTheme is -3, we're in image mode but no theme selected
    if (selectedCardTheme === -3) {
      return renderCardImageIntegrated(card, index);
    }

    // If selectedCardTheme is -2, we're in advanced mode but no theme selected
    if (selectedCardTheme === -2) {
      return renderCardAdvanced(card, index);
    }

    const theme = selectedCardTheme === 'auto'
      ? getAllThemeByIndex(index)
      : getAllThemeByIndex(selectedCardTheme);

    // Determine theme type based on the theme's actual properties
    const isProfessionalTheme = theme.type === 'professional';

    // Use appropriate renderer based on theme type
    if (isProfessionalTheme) {
      return renderCardProfessional(card, index);
    } else {
      // All other themes use the fun renderer which handles all properties
      return renderCardFun(card, index);
    }
  };

  // Professional card renderer (nested structure)
  const renderCardProfessional = (card: CardData, index: number) => {
    const theme = selectedCardTheme === 'auto'
      ? getAllThemeByIndex(index)
      : getAllThemeByIndex(selectedCardTheme);

    const currentCard = editedCards[card.number] || card;
    const { questionText, visuals } = parseQuestionWithVisuals(currentCard.question);

    // Number badge styles
    const getNumberBadgeStyles = () => {
      const bgValue = theme.numberBadgeBackground || '#000';
      const isGradient = bgValue.includes('gradient') || bgValue.includes('url(');

      const baseStyles = {
        position: 'absolute' as const,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...(isGradient
          ? { backgroundImage: bgValue }
          : { backgroundColor: bgValue }
        ),
        color: theme.numberBadgeColor || '#fff',
        fontWeight: 'bold',
        fontSize: '18px',
        zIndex: 10
      };

      switch (theme.numberBadgeStyle as any) {
        case 'circle':
          return { ...baseStyles, width: '40px', height: '40px', borderRadius: '50%', top: '8px', right: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' };
        case 'square':
          return { ...baseStyles, width: '35px', height: '35px', borderRadius: '0px', top: '0', right: '0' };
        case 'hexagon':
          return { ...baseStyles, width: '40px', height: '40px', clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)', top: '8px', right: '8px' };
        case 'star':
          return { ...baseStyles, width: '45px', height: '45px', clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)', top: '8px', right: '8px' };
        case 'diamond':
          return { ...baseStyles, width: '40px', height: '40px', transform: 'rotate(45deg)', borderRadius: '4px', top: '15px', right: '15px' };
        case 'cloud':
          return { ...baseStyles, padding: '8px 16px', borderRadius: '50px', top: '8px', right: '8px', boxShadow: '0 3px 6px rgba(0,0,0,0.15)' };
        case 'bubble':
          return { ...baseStyles, width: '45px', height: '45px', borderRadius: '50%', border: '3px solid white', top: '8px', right: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' };
        case 'tag':
          return { ...baseStyles, padding: '5px 15px', borderRadius: '20px', top: '8px', left: '8px' };
        case 'corner':
          return { ...baseStyles, width: '0', height: '0', borderTop: '60px solid ' + bgValue, borderLeft: '60px solid transparent', top: '0', right: '0', color: 'transparent' };
        case 'ribbon':
          return { ...baseStyles, padding: '5px 20px', top: '20px', left: '-10px', transform: 'rotate(-5deg)' };
        default:
          return { ...baseStyles, width: '40px', height: '40px', borderRadius: '50%', top: '8px', right: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' };
      }
    };

    return (
      <div
        key={index}
        data-card-id={index}
        className="relative"
        style={{
          backgroundColor: theme.cardBackground || theme.secondary || '#ffffff',
          backgroundImage: theme.pattern || 'none',
          border: 'none',
          borderRadius: '0',
          padding: '12px',
          height: '100%',
          width: '100%',
          boxSizing: 'border-box',
          overflow: isDraggableIllustrations || isDraggableText ? 'visible' : 'hidden',
          position: 'relative'
        }}
      >
        {/* Card number badge */}
        <div style={getNumberBadgeStyles()}>
          {theme.numberBadgeStyle === 'corner' ? (
            <span style={{ position: 'absolute', top: '10px', right: '10px', color: theme.numberBadgeColor, fontWeight: 'bold', fontSize: '18px' }}>
              {card.number}
            </span>
          ) : theme.numberBadgeStyle === 'diamond' ? (
            <span style={{ display: 'block', transform: 'rotate(-45deg)' }}>
              {card.number}
            </span>
          ) : (
            card.number
          )}
        </div>

        {/* Inner white container */}
        <div
          style={{
            backgroundColor: `rgba(255, 255, 255, ${questionContainerOpacity / 100})`,
            borderWidth: '2px',
            borderStyle: 'solid',
            borderColor: theme.primary,
            borderRadius: theme.questionStyle?.borderRadius || '12px',
            height: '100%',
            width: '100%',
            padding: '20px',
            paddingTop: '50px',
            boxSizing: 'border-box',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {/* Question text */}
          {isDraggableText ? (
            <EditableQuestionText
              text={editedTexts[card.number] || questionText}
              onTextChange={(newText) => onTextChange(card.number, newText)}
              fontSettings={fontSettings}
              initialPosition={textPositions[card.number]}
              initialSize={textPositions?.[card.number] ? { width: textPositions[card.number].width, height: textPositions[card.number].height } : undefined}
              containerBounds={{ width: 520, height: 350 }}
              onPositionChange={(pos) => onTextPositionChange(card.number, pos)}
              isEditMode={isDraggableText}
              onEditModeChange={(isEditing) => onEditModeChange(card.number, isEditing)}
              onBulkAction={onBulkAction}
              cardIndex={card.number}
            />
          ) : (
            <p style={{
              fontSize: `${fontSettings.fontSize}px`,
              fontFamily: fontSettings.fontFamily,
              fontWeight: fontSettings.fontWeight,
              fontStyle: fontSettings.isItalic ? 'italic' : 'normal',
              textDecoration: fontSettings.isUnderline ? 'underline' : 'none',
              lineHeight: 1.6,
              color: '#1f2937',
              textAlign: fontSettings.textAlign,
              margin: 0,
            }}>
              {questionText}
            </p>
          )}

          {/* Math visuals */}
          {visuals && visuals.length > 0 && (
            <div style={{
              marginTop: '15px',
              display: 'flex',
              justifyContent: 'center',
              transform: `scale(${visualScale / 100})`,
              transformOrigin: 'center'
            }}>
              {visuals}
            </div>
          )}
        </div>

        {/* Fun illustration */}
        {showIllustrations && (
          <SimpleCardIllustration
            question={questionText}
            subject="mathematics"
            difficulty={currentCard.difficulty as any}
            size={60}
            showIllustration={showIllustrations}
            illustrationScale={globalCharacterScale}
            themeColor={theme.numberBadgeBackground || '#3b82f6'}
            cardIndex={index}
            isDraggable={isDraggableIllustrations}
            initialTransform={illustrationTransforms[index]}
            onTransformChange={(transform) => onIllustrationTransformChange(index, transform)}
            containerBounds={{ width: 520, height: 350 }}
            transparentBackground={transparentBackground}
            characterTheme={characterTheme}
            characterMood={characterMood}
            characterColor={characterColor}
            onCopySettings={handleCopySettings}
          />
        )}

      </div>
    );
  };

  // Advanced card renderer with custom shapes and images
  const renderCardAdvanced = (card: CardData, index: number) => {
    if (selectedAdvancedTheme === null || !advancedCreativeThemes[selectedAdvancedTheme]) {
      // Return a simple placeholder card if no advanced theme selected
      return (
        <div
          key={index}
          className="relative"
          style={{
            backgroundColor: '#f8f9fa',
            border: '2px dashed #dee2e6',
            borderRadius: '8px',
            padding: '20px',
            height: '100%',
            width: '100%',
            boxSizing: 'border-box',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column'
          }}
        >
          <p style={{ color: '#6c757d', textAlign: 'center', margin: 0 }}>
            Sélectionnez un thème créatif avancé
          </p>
        </div>
      );
    }
    const theme = advancedCreativeThemes[selectedAdvancedTheme];

    const currentCard = editedCards[card.number] || card;
    const { questionText, visuals } = parseQuestionWithVisuals(currentCard.question);

    // Get number badge styles for advanced themes
    const getAdvancedNumberBadgeStyles = () => {
      const bgValue = theme.numberBadgeBackground || '#000';
      const isGradient = bgValue.includes('gradient') || bgValue.includes('url(');

      const baseStyles = {
        position: 'absolute' as const,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...(isGradient
          ? { backgroundImage: bgValue }
          : { backgroundColor: bgValue }
        ),
        color: theme.numberBadgeColor || '#fff',
        fontWeight: 'bold',
        fontSize: '18px',
        zIndex: 10
      };

      switch (theme.numberBadgeStyle as any) {
        case 'heart':
          return { ...baseStyles, width: '40px', height: '40px', clipPath: 'path("M12,21.35l-1.45-1.32C5.4,15.36,2,12.28,2,8.5 C2,5.42,4.42,3,7.5,3c1.74,0,3.41,0.81,4.5,2.09C13.09,3.81,14.76,3,16.5,3 C19.58,3,22,5.42,22,8.5c0,3.78-3.4,6.86-8.55,11.54L12,21.35z")', top: '8px', right: '8px' };
        case 'shield':
          return { ...baseStyles, width: '40px', height: '45px', clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)', top: '8px', right: '8px' };
        case 'cloud':
          return { ...baseStyles, padding: '8px 16px', borderRadius: '50px', top: '8px', right: '8px', boxShadow: '0 3px 6px rgba(0,0,0,0.15)' };
        default:
          return { ...baseStyles, width: '40px', height: '40px', borderRadius: '50%', top: '8px', right: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' };
      }
    };

    return (
      <div
        key={index}
        data-card-id={index}
        className="relative"
        style={{
          background: theme.background,
          backgroundImage: theme.pattern || 'none',
          border: theme.cardBorder || 'none',
          borderRadius: theme.cardRadius || '0',
          boxShadow: theme.cardShadow || 'none',
          padding: theme.cardPadding || '15px',
          height: '100%',
          width: '100%',
          boxSizing: 'border-box',
          overflow: 'hidden',
          position: 'relative'
        }}
      >
        {/* Theme images */}
        {theme.images?.map((img, imgIndex) => {
          const positionStyles: Record<string, any> = {
            'top-left': { top: '10px', left: '10px' },
            'top-right': { top: '10px', right: '10px' },
            'bottom-left': { bottom: '10px', left: '10px' },
            'bottom-right': { bottom: '10px', right: '10px' },
            'center-left': { top: '50%', left: '10px', transform: `translateY(-50%) rotate(${img.rotation || '0'})` },
            'center-right': { top: '50%', right: '10px', transform: `translateY(-50%) rotate(${img.rotation || '0'})` }
          };

          return (
            <div
              key={imgIndex}
              style={{
                position: 'absolute',
                ...positionStyles[img.position],
                width: img.size,
                height: img.size,
                opacity: img.opacity || 1,
                zIndex: img.zIndex || 1,
                mixBlendMode: img.blend as any || 'normal',
                backgroundImage: `url("${img.url}")`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center'
              }}
            />
          );
        })}

        {/* Card number badge */}
        <div style={getAdvancedNumberBadgeStyles()}>
          {card.number}
        </div>

        {/* Question container with custom shape */}
        <div
          style={{
            ...theme.questionStyle,
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: 'calc(100% - 30px)',
            width: '100%',
            boxSizing: 'border-box'
          }}
        >
          {/* Question text */}
          <p style={{
            fontSize: `${fontSettings.fontSize}px`,
            fontFamily: fontSettings.fontFamily,
            fontWeight: fontSettings.fontWeight,
            fontStyle: fontSettings.isItalic ? 'italic' : 'normal',
            textDecoration: fontSettings.isUnderline ? 'underline' : 'none',
            lineHeight: 1.6,
            color: '#1f2937',
            textAlign: fontSettings.textAlign,
            margin: 0,
            zIndex: 5
          }}>
            {questionText}
          </p>

          {/* Math visuals */}
          {visuals && visuals.length > 0 && (
            <div style={{
              marginTop: '15px',
              display: 'flex',
              justifyContent: 'center',
              transform: `scale(${visualScale / 100})`,
              transformOrigin: 'center',
              zIndex: 5
            }}>
              {visuals}
            </div>
          )}
        </div>

      </div>
    );
  };

  // Fun card renderer (direct application)
  const renderCardFun = (card: CardData, index: number) => {
    const theme = selectedCardTheme === 'auto'
      ? getAllThemeByIndex(index)
      : getAllThemeByIndex(selectedCardTheme);

    const currentCard = editedCards[card.number] || card;
    const { questionText, visuals } = parseQuestionWithVisuals(currentCard.question);
    // Get the background from various possible theme properties
    const gradient = (theme as any).gradient || (theme as any).background || theme.cardBackground || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';

    return (
      <div
        key={index}
        data-card-id={index}
        className="relative"
        style={{
          ...getBackgroundStyle(gradient),
          borderWidth: theme.cardBorder?.match(/\d+px/)?.[0] || '0',
          borderStyle: theme.cardBorder?.match(/(solid|dashed|dotted|double)/)?.[0] || 'none',
          borderColor: theme.cardBorder?.match(/#[a-fA-F0-9]+|rgba?\([^)]+\)/)?.[0] || 'transparent',
          borderRadius: '0',
          boxShadow: theme.cardShadow || 'none',
          padding: theme.cardPadding || '20px',
          height: '100%',
          width: '100%',
          boxSizing: 'border-box',
          overflow: isDraggableIllustrations || isDraggableText ? 'visible' : 'hidden',
        }}
      >
        {/* Card number badge */}
        <div style={{
          position: 'absolute',
          top: '8px',
          right: '8px',
          width: '40px',
          height: '40px',
          borderRadius: (theme as any).numberBadge?.shape === 'square' ? '8px' : '50%',
          backgroundColor: (theme as any).numberBadge?.background || theme.numberBadgeBackground || 'rgba(0,0,0,0.3)',
          color: (theme as any).numberBadge?.color || theme.numberBadgeColor || '#ffffff',
          border: (theme as any).numberBadge?.border || 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 'bold',
          fontSize: '18px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
        }}>
          {card.number}
        </div>

        {/* Decorative elements */}
        {(theme as any).decorations && (theme as any).decorations.type !== 'none' && (
          <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
            {(theme as any).decorations.type === 'shapes' && (theme as any).decorations.elements?.map((el: any, i: number) => (
              <span key={i} className="absolute" style={{
                top: `${20 + i * 30}%`,
                right: `${10 + i * 15}%`,
                fontSize: '24px',
                opacity: 0.2
              }}>{el}</span>
            ))}
          </div>
        )}

        {/* Fun illustration from theme */}
        {(theme as any).illustration && FunIllustrations[(theme as any).illustration] && (
          <div dangerouslySetInnerHTML={{ __html: FunIllustrations[(theme as any).illustration] }} />
        )}

        {/* Question content area */}
        <div style={{
          borderWidth: (theme as any).contentBorder ? (theme as any).contentBorder.match(/\d+/)?.[0] + 'px' : theme.questionStyle?.border ? '2px' : '0',
          borderStyle: (theme as any).contentBorderStyle || (theme.questionStyle?.border ? 'solid' : 'none'),
          borderColor: (theme as any).contentBorder?.match(/#[a-fA-F0-9]+/)?.[0] || theme.primary || '#ffffff',
          borderRadius: (theme as any).borderRadius || theme.questionStyle?.borderRadius || '12px',
          backgroundColor: (theme as any).contentBackground || `rgba(255, 255, 255, ${questionContainerOpacity / 100})`,
          padding: '20px',
          paddingTop: '50px',
          marginTop: '20px',
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          {/* Question text */}
          {isDraggableText ? (
            <EditableQuestionText
              text={editedTexts[card.number] || questionText}
              onTextChange={(newText) => onTextChange(card.number, newText)}
              fontSettings={fontSettings}
              initialPosition={textPositions[card.number]}
              initialSize={textPositions?.[card.number] ? { width: textPositions[card.number].width, height: textPositions[card.number].height } : undefined}
              containerBounds={{ width: 520, height: 350 }}
              onPositionChange={(pos) => onTextPositionChange(card.number, pos)}
              isEditMode={isDraggableText}
              onEditModeChange={(isEditing) => onEditModeChange(card.number, isEditing)}
              onBulkAction={onBulkAction}
              cardIndex={card.number}
            />
          ) : (
            <p style={{
              fontSize: `${fontSettings.fontSize}px`,
              fontFamily: fontSettings.fontFamily,
              fontWeight: fontSettings.fontWeight,
              fontStyle: fontSettings.isItalic ? 'italic' : 'normal',
              textDecoration: fontSettings.isUnderline ? 'underline' : 'none',
              lineHeight: 1.6,
              color: '#1f2937',
              textAlign: fontSettings.textAlign,
              margin: 0,
            }}>
              {questionText}
            </p>
          )}

          {/* Math visuals */}
          {visuals && visuals.length > 0 && (
            <div style={{
              marginTop: '15px',
              display: 'flex',
              justifyContent: 'center',
              transform: `scale(${visualScale / 100})`,
              transformOrigin: 'center'
            }}>
              {visuals}
            </div>
          )}
        </div>

        {/* Fun illustration */}
        {showIllustrations && (
          <SimpleCardIllustration
            question={questionText}
            subject="mathematics"
            difficulty={currentCard.difficulty as any}
            size={60}
            showIllustration={showIllustrations}
            illustrationScale={globalCharacterScale}
            themeColor={theme.numberBadgeBackground || '#3b82f6'}
            cardIndex={index}
            isDraggable={isDraggableIllustrations}
            initialTransform={illustrationTransforms[index]}
            onTransformChange={(transform) => onIllustrationTransformChange(index, transform)}
            containerBounds={{ width: 520, height: 350 }}
            transparentBackground={transparentBackground}
            characterTheme={characterTheme}
            characterMood={characterMood}
            characterColor={characterColor}
            onCopySettings={handleCopySettings}
          />
        )}

      </div>
    );
  };

  // DALL-E powered card renderer
  const renderCardDallePowered = (card: CardData, index: number) => {
    if (selectedDalleTheme === null || !dallePoweredThemes[selectedDalleTheme]) {
      return (
        <div
          key={index}
          className="relative"
          style={{
            backgroundColor: '#f8f9fa',
            border: '2px dashed #dee2e6',
            borderRadius: '8px',
            padding: '20px',
            height: '100%',
            width: '100%',
            boxSizing: 'border-box',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column'
          }}
        >
          <p style={{ color: '#6c757d', textAlign: 'center', margin: 0 }}>
            Sélectionnez un thème DALL-E
          </p>
        </div>
      );
    }

    const theme = dallePoweredThemes[selectedDalleTheme];
    const currentCard = editedCards[card.number] || card;
    const { questionText, visuals } = parseQuestionWithVisuals(currentCard.question);

    return (
      <div
        key={index}
        data-card-id={index}
        className="relative"
        style={{
          background: theme.background,
          border: theme.cardBorder || '2px solid #e2e8f0',
          borderRadius: theme.cardRadius || '16px',
          padding: theme.cardPadding || '24px',
          boxShadow: theme.cardShadow || '0 4px 6px rgba(0, 0, 0, 0.1)',
          height: '100%',
          width: '100%',
          boxSizing: 'border-box',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Render DALL-E static images */}
        {Object.entries(dalleImages).map(([key, imageUrl]) => {
          console.log('Rendering DALL-E image:', key, 'URL:', imageUrl);

          if (!imageUrl) return null;

          // Extract position from key (e.g., "main-1" -> "main")
          const imageType = key.split('-')[0];

          const positionStyles: any = {};
          let size = '120px';
          let opacity = 0.9;
          let zIndex = 2;

          switch (imageType) {
            case 'main':
              positionStyles.bottom = '10px';
              positionStyles.right = '10px';
              size = '150px';
              zIndex = 3;
              break;
            case 'decorative1':
              positionStyles.top = '10px';
              positionStyles.left = '10px';
              size = '100px';
              opacity = 0.8;
              zIndex = 2;
              break;
            case 'decorative2':
              positionStyles.top = '10px';
              positionStyles.right = '10px';
              size = '80px';
              opacity = 0.7;
              zIndex = 1;
              break;
            case 'background':
              positionStyles.top = 0;
              positionStyles.left = 0;
              positionStyles.width = '100%';
              positionStyles.height = '100%';
              opacity = 0.15;
              zIndex = 0;
              break;
          }

          return (
            <div
              key={`dalle-image-${key}`}
              style={{
                position: 'absolute',
                ...positionStyles,
                width: imageType === 'background' ? '100%' : size,
                height: imageType === 'background' ? '100%' : size,
                opacity: opacity,
                zIndex: zIndex
              }}
            >
              <img
                src={imageUrl}
                alt=""
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain'
                }}
              />
            </div>
          );
        })}

        {/* Card Header */}
        <div style={{
          marginBottom: '20px',
          position: 'relative',
          zIndex: 10
        }}>
          <h3 style={{
            fontSize: '18px',
            fontWeight: 'bold',
            color: theme.numberBadgeColor || '#333',
            margin: 0
          }}>
            Carte #{currentCard.number}
          </h3>
        </div>

        {/* Question Content */}
        <div style={{
          backgroundColor: theme.questionStyle?.background || 'rgba(255, 255, 255, 0.95)',
          borderRadius: theme.questionStyle?.borderRadius || '12px',
          padding: theme.questionStyle?.padding || '20px',
          border: theme.questionStyle?.border,
          backdropFilter: theme.questionStyle?.backdropFilter,
          position: 'relative',
          zIndex: 10,
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
        }}>
          {isDraggableText ? (
            <EditableQuestionText
              text={editedTexts?.[card.number] || questionText}
              onTextChange={(text) => onTextChange?.(card.number, text)}
              fontSettings={fontSettings}
              initialPosition={textPositions?.[card.number] ? { x: textPositions[card.number].x, y: textPositions[card.number].y } : undefined}
              initialSize={textPositions?.[card.number] ? { width: textPositions[card.number].width, height: textPositions[card.number].height } : undefined}
              onPositionChange={(position) => onTextPositionChange?.(card.number, position)}
              isEditMode={isDraggableText}
              onEditModeChange={(isEditing) => onEditModeChange?.(card.number, isEditing)}
              onBulkAction={onBulkAction}
              cardIndex={card.number}
            />
          ) : (
            <div style={{
              fontSize: `${fontSettings.fontSize}px`,
              fontFamily: fontSettings.fontFamily,
              fontWeight: fontSettings.fontWeight,
              fontStyle: fontSettings.isItalic ? 'italic' : 'normal',
              textDecoration: fontSettings.isUnderline ? 'underline' : 'none',
              color: '#333',
              textAlign: fontSettings.textAlign
            }}>
              {questionText}
            </div>
          )}

          {/* Render visuals if any */}
          {visuals.length > 0 && (
            <div style={{ marginTop: '15px', display: 'flex', justifyContent: 'center' }}>
              {visuals.map((visual, vIndex) => (
                <div key={vIndex} style={{ margin: '0 5px' }}>
                  {visual}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Answer section for answer sheet mode */}
        {displayMode === 'answerSheet' && currentCard.answer && (
          <div style={{
            marginTop: '15px',
            padding: '12px',
            backgroundColor: 'rgba(240, 240, 240, 0.95)',
            borderRadius: '8px',
            border: '1px solid #ddd',
            position: 'relative',
            zIndex: 10
          }}>
            <strong style={{ color: '#555' }}>Réponse:</strong>
            <div style={{
              marginTop: '8px',
              fontSize: '16px',
              color: '#333'
            }}>
              {currentCard.answer}
            </div>
          </div>
        )}
      </div>
    );
  };

  // Image-integrated card renderer
  const renderCardImageIntegrated = (card: CardData, index: number) => {
    if (selectedImageTheme === null || !imageIntegratedThemes[selectedImageTheme]) {
      // Return a simple placeholder card if no image theme selected
      return (
        <div
          key={index}
          className="relative"
          style={{
            backgroundColor: '#f8f9fa',
            border: '2px dashed #dee2e6',
            borderRadius: '8px',
            padding: '20px',
            height: '100%',
            width: '100%',
            boxSizing: 'border-box',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column'
          }}
        >
          <p style={{ color: '#6c757d', textAlign: 'center', margin: 0 }}>
            Sélectionnez un thème illustré
          </p>
        </div>
      );
    }

    const theme = imageIntegratedThemes[selectedImageTheme];
    const currentCard = editedCards[card.number] || card;
    const { questionText, visuals } = parseQuestionWithVisuals(currentCard.question);

    // Get number badge styles
    const getNumberBadgeStyles = () => {
      const bgValue = theme.numberBadgeBackground || '#000';
      const isGradient = bgValue.includes('gradient');

      const baseStyles = {
        position: 'absolute' as const,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...(isGradient
          ? { backgroundImage: bgValue }
          : { backgroundColor: bgValue }
        ),
        color: theme.numberBadgeColor || '#fff',
        fontWeight: 'bold',
        fontSize: '18px',
        zIndex: 10
      };

      switch (theme.numberBadgeStyle as any) {
        case 'circle':
          return { ...baseStyles, width: '40px', height: '40px', borderRadius: '50%', top: '8px', right: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' };
        case 'square':
          return { ...baseStyles, width: '35px', height: '35px', borderRadius: '0px', top: '0', right: '0' };
        case 'hexagon':
          return { ...baseStyles, width: '40px', height: '40px', clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)', top: '8px', right: '8px' };
        case 'star':
          return { ...baseStyles, width: '45px', height: '45px', clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)', top: '8px', right: '8px' };
        case 'diamond':
          return { ...baseStyles, width: '40px', height: '40px', transform: 'rotate(45deg)', borderRadius: '4px', top: '15px', right: '15px' };
        case 'cloud':
          return { ...baseStyles, padding: '8px 16px', borderRadius: '50px', top: '8px', right: '8px', boxShadow: '0 3px 6px rgba(0,0,0,0.15)' };
        case 'heart':
          return { ...baseStyles, width: '40px', height: '40px', clipPath: 'path("M12,21.35l-1.45-1.32C5.4,15.36,2,12.28,2,8.5 C2,5.42,4.42,3,7.5,3c1.74,0,3.41,0.81,4.5,2.09C13.09,3.81,14.76,3,16.5,3 C19.58,3,22,5.42,22,8.5c0,3.78-3.4,6.86-8.55,11.54L12,21.35z")', top: '8px', right: '8px' };
        case 'shield':
          return { ...baseStyles, width: '40px', height: '45px', clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)', top: '8px', right: '8px' };
        default:
          return { ...baseStyles, width: '40px', height: '40px', borderRadius: '50%', top: '8px', right: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' };
      }
    };

    return (
      <div
        key={index}
        data-card-id={index}
        className="relative"
        style={{
          background: theme.background,
          backgroundImage: theme.pattern || 'none',
          border: theme.cardBorder || 'none',
          borderRadius: theme.cardRadius || '0',
          boxShadow: theme.cardShadow || 'none',
          padding: theme.cardPadding || '15px',
          height: '100%',
          width: '100%',
          boxSizing: 'border-box',
          overflow: 'hidden',
          position: 'relative'
        }}
      >
        {/* Decorative images from theme */}
        {theme.decorativeImages?.map((img, imgIndex) => {
          const positionStyles: Record<string, any> = {
            'top-left': { top: '10px', left: '10px' },
            'top-right': { top: '10px', right: '10px' },
            'bottom-left': { bottom: '10px', left: '10px' },
            'bottom-right': { bottom: '10px', right: '10px' },
            'center-left': { top: '50%', left: '10px', transform: 'translateY(-50%)' },
            'center-right': { top: '50%', right: '10px', transform: 'translateY(-50%)' },
            'floating': { top: '30%', left: '20%', transform: 'translate(-50%, -50%)' }
          };

          const animationStyles = img.animation ? {
            animation: img.animation === 'float' ? 'float 3s ease-in-out infinite' :
                      img.animation === 'float-delayed' ? 'float 3s ease-in-out infinite 1s' :
                      img.animation === 'hover' ? 'hover 2s ease-in-out infinite' :
                      img.animation === 'rotate-slow' ? 'rotate-slow 10s linear infinite' :
                      img.animation === 'bounce-slow' ? 'bounce-slow 2s ease-in-out infinite' : 'none'
          } : {};

          return (
            <img
              key={imgIndex}
              src={img.url}
              alt=""
              style={{
                position: 'absolute',
                ...positionStyles[img.position],
                width: img.size,
                height: 'auto',
                opacity: img.opacity || 1,
                zIndex: img.zIndex || 1,
                ...animationStyles
              }}
            />
          );
        })}

        {/* Card number badge */}
        <div style={getNumberBadgeStyles()}>
          {theme.numberBadgeStyle === 'diamond' ? (
            <span style={{ display: 'block', transform: 'rotate(-45deg)' }}>
              {card.number}
            </span>
          ) : (
            card.number
          )}
        </div>

        {/* Question container */}
        <div
          style={{
            ...theme.questionStyle,
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: 'calc(100% - 30px)',
            width: '100%',
            boxSizing: 'border-box',
            zIndex: 5
          }}
        >
          {/* Question text */}
          <p style={{
            fontSize: `${fontSettings.fontSize}px`,
            fontFamily: fontSettings.fontFamily,
            fontWeight: fontSettings.fontWeight,
            fontStyle: fontSettings.isItalic ? 'italic' : 'normal',
            textDecoration: fontSettings.isUnderline ? 'underline' : 'none',
            lineHeight: 1.6,
            color: '#1f2937',
            textAlign: fontSettings.textAlign,
            margin: 0
          }}>
            {questionText}
          </p>

          {/* Math visuals */}
          {visuals && visuals.length > 0 && (
            <div style={{
              marginTop: '15px',
              display: 'flex',
              justifyContent: 'center',
              transform: `scale(${visualScale / 100})`,
              transformOrigin: 'center'
            }}>
              {visuals}
            </div>
          )}
        </div>
      </div>
    );
  };

  // Render A4 landscape page with 2x2 grid
  const renderA4Page = (pageCards: CardData[], pageNumber: number) => {
    return (
      <div
        key={pageNumber}
        className="print-page mx-auto relative"
        style={{
          width: '297mm',
          height: '210mm',
          padding: 0,
          pageBreakAfter: 'always',
          position: 'relative',
          overflow: 'hidden',
          ...getBackgroundStyle(transparentBackground ? 'transparent' : 'white'),
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e5e7eb',
        }}
      >
        {/* Vertical cut line */}
        <div
          className="cut-line"
          style={{
            position: 'absolute',
            left: '50%',
            top: 0,
            bottom: 0,
            width: '1px',
            borderLeft: '2px dashed #ccc',
            zIndex: 10,
          }}
        />

        {/* Horizontal cut line */}
        <div
          className="cut-line"
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: '50%',
            height: '1px',
            borderTop: '2px dashed #ccc',
            zIndex: 10,
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
          {pageCards.map((card, cardIndexInPage) => {
            const globalIndex = pageNumber * 4 + cardIndexInPage;
            // Calculate row: 0 or 1 for top row, 2 or 3 for bottom row
            const row = Math.floor(cardIndexInPage / 2);
            // Top row (0) should have lower z-index (1), bottom row (1) should have higher z-index (2)
            // This way illustrations from top cards will slide under bottom cards
            const zIndex = row === 0 ? 1 : 2;

            return (
              <div
                key={globalIndex}
                style={{
                  position: 'relative',
                  zIndex: zIndex
                }}
              >
                {renderCard(card, globalIndex)}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // State for responsive scaling
  const [optimalScale, setOptimalScale] = useState(1);

  // Calculate optimal scale based on window size
  useEffect(() => {
    const calculateScale = () => {
      if (typeof window !== 'undefined') {
        // Get container width (accounting for padding and left panel)
        const containerWidth = window.innerWidth - 450; // Subtract left panel width + padding
        // A4 landscape is 297mm ≈ 1122px at 96 DPI
        const a4Width = 1122;
        // Calculate scale to fit width, max 1.5x for readability
        const scale = Math.min(containerWidth / a4Width, 1.5);
        setOptimalScale(Math.max(scale, 0.5)); // Minimum 0.5x scale
      }
    };

    calculateScale();
    window.addEventListener('resize', calculateScale);
    return () => window.removeEventListener('resize', calculateScale);
  }, []);

  // Main render logic
  if (displayMode === 'studentCards') {
    const pages = [];
    for (let i = 0; i < cards.length; i += 4) {
      const pageCards = cards.slice(i, i + 4);
      // Pad with empty cards if needed
      while (pageCards.length < 4) {
        pageCards.push({
          number: pageCards.length + i + 1,
          title: '',
          question: '',
        });
      }
      pages.push(renderA4Page(pageCards, Math.floor(i / 4)));
    }

    return (
      <div style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '30px',
        paddingBottom: '20px',
      }}>
        {pages.map((page, index) => (
          <div
            key={`page-wrapper-${index}`}
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              // Add height based on scale to prevent overlap
              height: `${210 * 3.77 * (manualScale || optimalScale)}px`, // 210mm * 3.77px/mm * scale
              marginBottom: index < pages.length - 1 ? '40px' : 0,
              position: 'relative',
            }}
          >
            <div
              style={{
                transform: `scale(${manualScale || optimalScale})`,
                transformOrigin: 'top center',
                position: 'absolute',
                top: 0,
              }}
            >
              {page}
            </div>
          </div>
        ))}

        {/* Floating Action Buttons */}
        <div style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        }}>
          {/* Apply Settings to All Cards Button */}
          {copiedSettings && (
            <button
              onClick={handleApplyToAllCards}
              style={{
                backgroundColor: '#8b5cf6',
                color: 'white',
                border: 'none',
                borderRadius: '50px',
                padding: '15px 20px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.2s ease',
                minWidth: '0',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#7c3aed';
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#8b5cf6';
                e.currentTarget.style.transform = 'scale(1)';
              }}
              title="Appliquer les paramètres copiés à toutes les cartes"
            >
              <Clipboard size={18} />
              Appliquer à toutes les cartes
            </button>
          )}

          {/* Reset All Transforms Button */}
          {Object.keys(illustrationTransforms).length > 0 && (
            <button
              onClick={handleResetAllTransforms}
              style={{
                backgroundColor: '#ef4444',
                color: 'white',
                border: 'none',
                borderRadius: '50px',
                padding: '15px 20px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.2s ease',
                minWidth: '0',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#dc2626';
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#ef4444';
                e.currentTarget.style.transform = 'scale(1)';
              }}
              title="Réinitialiser toutes les positions des illustrations"
            >
              <RotateCcw size={18} />
              Réinitialiser
            </button>
          )}
        </div>
      </div>
    );
  }

  // TODO: Implement answerSheet and corriger modes
  return <div>Mode not implemented yet: {displayMode}</div>;
}