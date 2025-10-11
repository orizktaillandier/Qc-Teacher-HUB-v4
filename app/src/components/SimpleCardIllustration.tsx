'use client';

import React from 'react';
import CombinedIllustrationServiceInstance, { type IllustrationTheme } from '@/lib/combined-illustration-service';
import { DraggableIllustration } from './DraggableIllustration';
import { phosphorIcons, educationalEmojis, gameIcons } from './KawaiiSelector';

interface IllustrationTransform {
  x: number;
  y: number;
  scale: number;
  rotation: number;
}

interface SimpleCardIllustrationProps {
  question: string;
  subject: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  size?: number;
  showIllustration?: boolean;
  illustrationScale?: number;
  themeColor?: string;
  cardIndex?: number;
  isDraggable?: boolean;
  initialTransform?: IllustrationTransform;
  onTransformChange?: (transform: IllustrationTransform) => void;
  onCopySettings?: (transform: IllustrationTransform) => void;
  containerBounds?: { width: number; height: number };
  transparentBackground?: boolean;
  characterTheme?: IllustrationTheme;
  characterMood?: 'sad' | 'shocked' | 'happy' | 'blissful' | 'lovestruck' | 'excited' | 'ko';
  characterColor?: string;
}

export const SimpleCardIllustration: React.FC<SimpleCardIllustrationProps> = ({
  question,
  subject,
  difficulty,
  size = 120,
  showIllustration = true,
  illustrationScale = 100,
  themeColor,
  cardIndex = 0,
  isDraggable = false,
  initialTransform,
  onTransformChange,
  onCopySettings,
  containerBounds = { width: 400, height: 300 },
  transparentBackground = false,
  characterTheme = 'random',
  characterMood,
  characterColor
}) => {
  if (!showIllustration) return null;

  // Check if it's a Phosphor icon, emoji, or Game icon
  const phosphorIcon = phosphorIcons.find(icon => icon.id === characterTheme);
  const emojiItem = educationalEmojis.find(emoji => emoji.id === characterTheme);
  const gameIcon = gameIcons.find(icon => icon.id === characterTheme);

  let illustration: React.ReactElement | null = null;

  if (phosphorIcon) {
    // Render Phosphor icon
    const IconComp = phosphorIcon.component;
    illustration = <IconComp size={size} weight="duotone" color={characterColor || themeColor} />;
  } else if (emojiItem) {
    // Render emoji as large text
    illustration = <span style={{ fontSize: size, lineHeight: 1 }}>{emojiItem.emoji}</span>;
  } else if (gameIcon) {
    // Render Game icon
    const IconComp = gameIcon.component;
    illustration = <IconComp size={size} color={characterColor || themeColor} />;
  } else {
    // Get illustration based on theme or smart selection (kawaii)
    illustration = characterTheme === 'random'
      ? CombinedIllustrationServiceInstance.getSmartIllustration([question, subject], cardIndex)
      : CombinedIllustrationServiceInstance.getThemeIllustration(characterTheme, cardIndex, characterMood, characterColor);
  }

  if (!illustration) return null;

  const actualSize = (size * illustrationScale) / 100;
  const color = themeColor || CombinedIllustrationServiceInstance.getThemeColor(characterTheme);

  // Check if it's an icon (Phosphor, Game) or emoji - they don't need cloneElement wrapping
  const isIcon = phosphorIcon || emojiItem || gameIcon;

  // Scale down the illustration wrapper to fit the actualSize
  const illustrationElement = (
    <div
      className="illustration-wrapper"
      style={{
        width: `${actualSize}px`,
        height: `${actualSize}px`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0
      }}>
      {isIcon ? illustration : React.cloneElement(illustration as React.ReactElement<any>, {
        style: {
          ...(illustration as any).props?.style,
          width: '100%',
          height: '100%',
          maxWidth: `${actualSize}px`,
          maxHeight: `${actualSize}px`
        }
      })}
    </div>
  );

  // Always use DraggableIllustration if we have transforms to apply
  if (isDraggable || initialTransform) {
    return (
      <DraggableIllustration
        isDraggable={isDraggable}
        initialTransform={initialTransform}
        onTransformChange={onTransformChange}
        onCopySettings={onCopySettings}
        containerBounds={containerBounds}
        baseSize={actualSize}
      >
        <div
          className="card-illustration"
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: transparentBackground ? '0' : '5px',
            borderRadius: transparentBackground ? '0' : '12px',
            background: transparentBackground ? 'transparent' : `${color}15`,
            width: 'fit-content',
            pointerEvents: 'auto'
          }}
        >
          {illustrationElement}
        </div>
      </DraggableIllustration>
    );
  }

  return (
    <div
      className="card-illustration"
      style={{
        position: 'absolute',
        bottom: '10px',
        left: '10px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: transparentBackground ? '0' : '5px',
        borderRadius: transparentBackground ? '0' : '12px',
        background: transparentBackground ? 'transparent' : `${color}15`,
        width: 'fit-content',
        zIndex: 10
      }}
    >
      {illustrationElement}
    </div>
  );
};