'use client';

import React from 'react';
import { IllustrationService, type IllustrationConfig, type CharacterTheme } from '@/lib/illustration-service';
import { DraggableIllustration } from './DraggableIllustration';

interface IllustrationTransform {
  x: number;
  y: number;
  scale: number;
  rotation: number;
}

interface CardIllustrationProps {
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
  characterTheme?: CharacterTheme;
}

export const CardIllustration: React.FC<CardIllustrationProps> = ({
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

  // Get appropriate illustration based on content, using cardIndex for deterministic selection
  const illustration = difficulty
    ? IllustrationService.getIllustrationForDifficulty(difficulty, cardIndex, characterTheme)
    : IllustrationService.getIllustrationForQuestion(question, subject, cardIndex, characterTheme);

  if (!illustration) return null;

  const Component = illustration.component;
  const actualSize = (size * illustrationScale) / 100;
  // Use theme color if provided, otherwise use illustration's default color
  const color = themeColor || illustration.color;

  const illustrationElement = (
    <Component
      size={actualSize}
      mood={illustration.mood}
      color={color}
    />
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

interface IllustrationBadgeProps {
  type: 'correct' | 'incorrect' | 'thinking';
  size?: number;
}

export const IllustrationBadge: React.FC<IllustrationBadgeProps> = ({
  type,
  size = 60
}) => {
  let illustration: IllustrationConfig;

  switch (type) {
    case 'correct':
      illustration = IllustrationService.getCelebrationIllustration();
      break;
    case 'incorrect':
      illustration = IllustrationService.getEncouragementIllustration();
      break;
    case 'thinking':
    default:
      illustration = IllustrationService.getIllustrationForDifficulty('medium');
      break;
  }

  const Component = illustration.component;

  return (
    <div
      className="illustration-badge"
      style={{
        display: 'inline-flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '8px',
        borderRadius: '50%',
        background: `${illustration.color}20`,
        border: `2px solid ${illustration.color}`,
        transform: type === 'correct' ? 'scale(1.05)' : 'scale(1)',
        transition: 'transform 0.3s ease-in-out'
      }}
    >
      <Component
        size={size}
        mood={illustration.mood}
        color={illustration.color}
      />
    </div>
  );
};

interface FunBackgroundProps {
  children: React.ReactNode;
  subject?: string;
}

export const FunBackground: React.FC<FunBackgroundProps> = ({
  children,
  subject = ''
}) => {
  const colors = [
    IllustrationService.getRandomKidColor(),
    IllustrationService.getRandomKidColor(),
    IllustrationService.getRandomKidColor()
  ];

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        background: `linear-gradient(135deg,
          ${colors[0]}10 0%,
          ${colors[1]}05 50%,
          ${colors[2]}10 100%)`,
        overflow: 'hidden'
      }}
    >
      {/* Fun floating shapes */}
      <div
        style={{
          position: 'absolute',
          top: '10%',
          left: '5%',
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          background: `${colors[0]}20`,
          transform: 'translateY(0px)',
          transition: 'transform 3s ease-in-out'
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '60%',
          right: '10%',
          width: '80px',
          height: '80px',
          borderRadius: '20px',
          background: `${colors[1]}20`,
          transform: 'rotate(45deg) translateY(0px)',
          transition: 'transform 4s ease-in-out'
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '10%',
          left: '40%',
          width: '120px',
          height: '120px',
          clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
          background: `${colors[2]}20`,
          transform: 'translateY(0px)',
          transition: 'transform 3.5s ease-in-out'
        }}
      />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </div>
    </div>
  );
};