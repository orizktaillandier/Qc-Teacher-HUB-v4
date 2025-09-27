'use client';

import React from 'react';
import CombinedIllustrationServiceInstance, { type IllustrationTheme } from '@/lib/combined-illustration-service';
import { DraggableIllustration } from './DraggableIllustration';

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
  containerBounds?: { width: number; height: number };
  transparentBackground?: boolean;
  characterTheme?: IllustrationTheme;
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
  containerBounds = { width: 400, height: 300 },
  transparentBackground = false,
  characterTheme = 'random'
}) => {
  if (!showIllustration) return null;

  // Get illustration based on theme or smart selection
  const illustration = characterTheme === 'random'
    ? CombinedIllustrationServiceInstance.getSmartIllustration([question, subject], cardIndex)
    : CombinedIllustrationServiceInstance.getThemeIllustration(characterTheme, cardIndex);

  if (!illustration) return null;

  const actualSize = (size * illustrationScale) / 100;
  const color = themeColor || CombinedIllustrationServiceInstance.getThemeColor(characterTheme);

  // Scale down the illustration wrapper to fit the actualSize
  const illustrationElement = (
    <div style={{
      width: actualSize,
      height: actualSize,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      {React.cloneElement(illustration, {
        style: {
          ...illustration.props.style,
          width: '100%',
          height: '100%',
          maxWidth: actualSize,
          maxHeight: actualSize
        }
      })}
    </div>
  );

  if (isDraggable) {
    return (
      <DraggableIllustration
        isDraggable={true}
        initialTransform={initialTransform}
        onTransformChange={onTransformChange}
        containerBounds={containerBounds}
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