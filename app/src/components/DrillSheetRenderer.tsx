'use client';

import React from 'react';
import type { DrillSheetData, DrillExercise, ExerciseSubPart } from '@/lib/drill-sheet-types';

interface DrillSheetRendererProps {
  drillSheet: DrillSheetData;
  showAnswers?: boolean;
}

export default function DrillSheetRenderer({
  drillSheet,
  showAnswers = false
}: DrillSheetRendererProps) {
  const {
    customTitle,
    cycle,
    grade,
    subject,
    notion,
    subNotions,
    exercises,
    theme = 'simple',
    fontFamily = 'Inter',
    fontSize = 12,
    isBold = false,
    isItalic = false,
    headerStyle,
    customInstructions,
    showDifficulty,
    gridColumns = 1,
    gridRows = 1,
    decorativeBorder = 'none',
    showScoring = false,
    totalPoints
  } = drillSheet;

  // Calculate total points if not provided
  const calculatedTotalPoints = totalPoints || exercises.reduce((sum, ex) => sum + (ex.points || 1), 0);

  // Generate title
  const title = customTitle || `Fiche d'exercices - ${notion}`;

  // Format text with proper fractions
  const formatTextWithFractions = (text: string): React.ReactNode => {
    // Match fractions like 1/2, 3/4, ___/20, etc.
    // Matches any combination of digits and underscores separated by /
    const fractionRegex = /([_\d]+)\/([_\d]+)/g;
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    let match;

    while ((match = fractionRegex.exec(text)) !== null) {
      // Add text before the fraction
      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index));
      }

      // Add the fraction (with horizontal bar)
      const numerator = match[1];
      const denominator = match[2];
      parts.push(
        <span
          key={match.index}
          className="inline-flex flex-col items-center mx-1"
          style={{ verticalAlign: 'middle', fontSize: '0.9em' }}
        >
          <span style={{ borderBottom: '1px solid #000', paddingBottom: '1px' }}>{numerator}</span>
          <span style={{ paddingTop: '1px' }}>{denominator}</span>
        </span>
      );

      lastIndex = match.index + match[0].length;
    }

    // Add remaining text
    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }

    return parts.length > 0 ? <>{parts}</> : text;
  };

  // Strip leading number from question text (e.g., "1. Question text" → "Question text")
  const stripLeadingNumber = (text: string): string => {
    return text.replace(/^\d+\.\s*/, '');
  };

  // Format exercise answer for display
  const formatAnswer = (exercise: DrillExercise): React.ReactNode => {
    if (Array.isArray(exercise.answer)) {
      return formatTextWithFractions(exercise.answer.join(', '));
    }
    return formatTextWithFractions(String(exercise.answer));
  };

  // Get difficulty badge
  const getDifficultyBadge = (difficulty?: string) => {
    if (!difficulty || !showDifficulty) return null;

    const colors = {
      easy: { bg: '#dcfce7', text: '#166534', border: '#86efac' },
      medium: { bg: '#fef9c3', text: '#854d0e', border: '#fde047' },
      hard: { bg: '#fee2e2', text: '#991b1b', border: '#fca5a5' }
    };

    const labels = {
      easy: 'Facile',
      medium: 'Moyen',
      hard: 'Difficile'
    };

    const color = colors[difficulty as keyof typeof colors];

    return (
      <span
        className="text-xs px-2 py-0.5 rounded border"
        style={{
          backgroundColor: color.bg,
          color: color.text,
          borderColor: color.border
        }}
      >
        {labels[difficulty as keyof typeof labels]}
      </span>
    );
  };

  // Render drawing workspace for visual exercises or sub-parts
  const renderDrawingWorkspace = (item: DrillExercise | ExerciseSubPart) => {
    if (!item.requiresDrawing) return null;

    const height = item.workspaceHeight || 150;
    const shapeType = item.drawingShapes || 'square';
    const count = item.drawingCount || 3;

    // Create empty shapes for students to fill in
    const shapes = Array(count).fill(null).map((_, i) => {
      const size = 60;
      const key = `shape-${i}`;

      switch (shapeType) {
        case 'triangle':
          return (
            <svg key={key} width={size} height={size} viewBox="0 0 100 100" style={{ margin: '0 8px' }}>
              <polygon points="50,10 90,90 10,90" fill="none" stroke="#000" strokeWidth="2" />
            </svg>
          );
        case 'circle':
          return (
            <svg key={key} width={size} height={size} viewBox="0 0 100 100" style={{ margin: '0 8px' }}>
              <circle cx="50" cy="50" r="40" fill="none" stroke="#000" strokeWidth="2" />
            </svg>
          );
        case 'star':
          return (
            <svg key={key} width={size} height={size} viewBox="0 0 100 100" style={{ margin: '0 8px' }}>
              <polygon points="50,10 61,40 95,40 68,60 79,90 50,70 21,90 32,60 5,40 39,40" fill="none" stroke="#000" strokeWidth="2" />
            </svg>
          );
        case 'rectangle':
          return (
            <svg key={key} width={size * 1.5} height={size} viewBox="0 0 150 100" style={{ margin: '0 8px' }}>
              <rect x="10" y="20" width="130" height="60" fill="none" stroke="#000" strokeWidth="2" />
            </svg>
          );
        case 'square':
        default:
          return (
            <svg key={key} width={size} height={size} viewBox="0 0 100 100" style={{ margin: '0 8px' }}>
              <rect x="10" y="10" width="80" height="80" fill="none" stroke="#000" strokeWidth="2" />
            </svg>
          );
      }
    });

    return (
      <div
        className="mt-3 p-4 border-2 border-dashed rounded"
        style={{
          minHeight: `${height}px`,
          borderColor: '#d1d5db',
          backgroundColor: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}
      >
        {shapes}
      </div>
    );
  };

  // Get decorative border SVG
  const getDecorativeBorder = () => {
    if (decorativeBorder === 'none') return null;

    // Dotted border - printer-friendly with light dots
    if (decorativeBorder === 'dots') {
      // Full page dimensions
      const pageWidth = 210;
      const pageHeight = 297;
      const borderPadding = 10; // Closer to content area

      // Calculate border position (at padding edge)
      const borderLeft = borderPadding;
      const borderTop = borderPadding;
      const borderRight = pageWidth - borderPadding;
      const borderBottom = pageHeight - borderPadding;
      const borderWidth = borderRight - borderLeft;
      const borderHeight = borderBottom - borderTop;

      const spacing = 4.5;
      const dotsHorizontal = Math.floor(borderWidth / spacing);
      const dotsVertical = Math.floor(borderHeight / spacing);

      return (
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ zIndex: 0 }}
          viewBox={`0 0 ${pageWidth} ${pageHeight}`}
          preserveAspectRatio="none"
        >
          {/* Top dots */}
          {Array(dotsHorizontal).fill(null).map((_, i) => (
            <circle
              key={`top-${i}`}
              cx={borderLeft + i * spacing + spacing/2}
              cy={borderTop}
              r="0.8"
              fill="#999"
            />
          ))}
          {/* Bottom dots */}
          {Array(dotsHorizontal).fill(null).map((_, i) => (
            <circle
              key={`bottom-${i}`}
              cx={borderLeft + i * spacing + spacing/2}
              cy={borderBottom}
              r="0.8"
              fill="#999"
            />
          ))}
          {/* Left dots */}
          {Array(dotsVertical).fill(null).map((_, i) => (
            <circle
              key={`left-${i}`}
              cx={borderLeft}
              cy={borderTop + i * spacing + spacing/2}
              r="0.8"
              fill="#999"
            />
          ))}
          {/* Right dots */}
          {Array(dotsVertical).fill(null).map((_, i) => (
            <circle
              key={`right-${i}`}
              cx={borderRight}
              cy={borderTop + i * spacing + spacing/2}
              r="0.8"
              fill="#999"
            />
          ))}
        </svg>
      );
    }

    // Corner accents - subtle decorative corners
    if (decorativeBorder === 'corners') {
      // Full page dimensions
      const pageWidth = 210;
      const pageHeight = 297;
      const borderPadding = 10;

      // Calculate border position
      const borderLeft = borderPadding;
      const borderTop = borderPadding;
      const borderRight = pageWidth - borderPadding;
      const borderBottom = pageHeight - borderPadding;

      return (
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ zIndex: 0 }}
          viewBox={`0 0 ${pageWidth} ${pageHeight}`}
          preserveAspectRatio="none"
        >
          {/* Top-left corner */}
          <path d={`M ${borderLeft+3} ${borderTop+25} L ${borderLeft+3} ${borderTop+3} L ${borderLeft+25} ${borderTop+3}`} stroke="#666" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <path d={`M ${borderLeft+3} ${borderTop+30} L ${borderLeft+3} ${borderTop+10} L ${borderLeft+10} ${borderTop+3} L ${borderLeft+30} ${borderTop+3}`} stroke="#666" strokeWidth="0.5" fill="none" />

          {/* Top-right corner */}
          <path d={`M ${borderRight-25} ${borderTop+3} L ${borderRight-3} ${borderTop+3} L ${borderRight-3} ${borderTop+25}`} stroke="#666" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <path d={`M ${borderRight-30} ${borderTop+3} L ${borderRight-10} ${borderTop+3} L ${borderRight-3} ${borderTop+10} L ${borderRight-3} ${borderTop+30}`} stroke="#666" strokeWidth="0.5" fill="none" />

          {/* Bottom-left corner */}
          <path d={`M ${borderLeft+3} ${borderBottom-25} L ${borderLeft+3} ${borderBottom-3} L ${borderLeft+25} ${borderBottom-3}`} stroke="#666" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <path d={`M ${borderLeft+3} ${borderBottom-30} L ${borderLeft+3} ${borderBottom-10} L ${borderLeft+10} ${borderBottom-3} L ${borderLeft+30} ${borderBottom-3}`} stroke="#666" strokeWidth="0.5" fill="none" />

          {/* Bottom-right corner */}
          <path d={`M ${borderRight-3} ${borderBottom-25} L ${borderRight-3} ${borderBottom-3} L ${borderRight-25} ${borderBottom-3}`} stroke="#666" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <path d={`M ${borderRight-3} ${borderBottom-30} L ${borderRight-3} ${borderBottom-10} L ${borderRight-10} ${borderBottom-3} L ${borderRight-30} ${borderBottom-3}`} stroke="#666" strokeWidth="0.5" fill="none" />
        </svg>
      );
    }

    // Wavy border - gentle waves along edges
    if (decorativeBorder === 'waves') {
      // Full page dimensions
      const pageWidth = 210;
      const pageHeight = 297;
      const borderPadding = 10;

      // Calculate border position
      const borderLeft = borderPadding;
      const borderTop = borderPadding;
      const borderRight = pageWidth - borderPadding;
      const borderBottom = pageHeight - borderPadding;

      return (
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ zIndex: 0 }}
          viewBox={`0 0 ${pageWidth} ${pageHeight}`}
          preserveAspectRatio="none"
        >
          {/* Top wave */}
          <path
            d={`M ${borderLeft+5} ${borderTop} Q ${borderLeft+15} ${borderTop-2}, ${borderLeft+25} ${borderTop} T ${borderLeft+45} ${borderTop} T ${borderLeft+65} ${borderTop} T ${borderLeft+85} ${borderTop} T ${borderLeft+105} ${borderTop} T ${borderLeft+125} ${borderTop} T ${borderLeft+145} ${borderTop} T ${borderLeft+165} ${borderTop} T ${borderLeft+180} ${borderTop}`}
            stroke="#888"
            strokeWidth="0.8"
            fill="none"
          />
          {/* Bottom wave */}
          <path
            d={`M ${borderLeft+5} ${borderBottom} Q ${borderLeft+15} ${borderBottom+2}, ${borderLeft+25} ${borderBottom} T ${borderLeft+45} ${borderBottom} T ${borderLeft+65} ${borderBottom} T ${borderLeft+85} ${borderBottom} T ${borderLeft+105} ${borderBottom} T ${borderLeft+125} ${borderBottom} T ${borderLeft+145} ${borderBottom} T ${borderLeft+165} ${borderBottom} T ${borderLeft+180} ${borderBottom}`}
            stroke="#888"
            strokeWidth="0.8"
            fill="none"
          />
          {/* Left wave */}
          <path
            d={`M ${borderLeft} ${borderTop+10} Q ${borderLeft-2} ${borderTop+25}, ${borderLeft} ${borderTop+40} T ${borderLeft} ${borderTop+60} T ${borderLeft} ${borderTop+80} T ${borderLeft} ${borderTop+100} T ${borderLeft} ${borderTop+120} T ${borderLeft} ${borderTop+140} T ${borderLeft} ${borderTop+160} T ${borderLeft} ${borderTop+180} T ${borderLeft} ${borderTop+200} T ${borderLeft} ${borderTop+220} T ${borderLeft} ${borderTop+240} T ${borderLeft} ${borderTop+260}`}
            stroke="#888"
            strokeWidth="0.8"
            fill="none"
          />
          {/* Right wave */}
          <path
            d={`M ${borderRight} ${borderTop+10} Q ${borderRight+2} ${borderTop+25}, ${borderRight} ${borderTop+40} T ${borderRight} ${borderTop+60} T ${borderRight} ${borderTop+80} T ${borderRight} ${borderTop+100} T ${borderRight} ${borderTop+120} T ${borderRight} ${borderTop+140} T ${borderRight} ${borderTop+160} T ${borderRight} ${borderTop+180} T ${borderRight} ${borderTop+200} T ${borderRight} ${borderTop+220} T ${borderRight} ${borderTop+240} T ${borderRight} ${borderTop+260}`}
            stroke="#888"
            strokeWidth="0.8"
            fill="none"
          />
        </svg>
      );
    }

    // Maple leaf border - Quebec-themed with small maple leaves in corners
    if (decorativeBorder === 'maple') {
      // Full page dimensions
      const pageWidth = 210;
      const pageHeight = 297;
      const borderPadding = 10;

      // Calculate border position
      const borderLeft = borderPadding;
      const borderTop = borderPadding;
      const borderRight = pageWidth - borderPadding;
      const borderBottom = pageHeight - borderPadding;
      const borderWidth = borderRight - borderLeft;
      const borderHeight = borderBottom - borderTop;

      return (
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ zIndex: 0 }}
          viewBox={`0 0 ${pageWidth} ${pageHeight}`}
          preserveAspectRatio="none"
        >
          {/* Thin border line */}
          <rect x={borderLeft+3} y={borderTop+3} width={borderWidth-6} height={borderHeight-6} stroke="#999" strokeWidth="0.5" fill="none" />
          {/* Top-left maple leaf */}
          <path
            d={`M ${borderLeft+10} ${borderTop+10} l 1 -3 l 1 3 l 3 -1 l -2 2 l 2 2 l -3 -1 l -1 3 l -1 -3 l -3 1 l 2 -2 l -2 -2 z`}
            fill="#ccc"
            stroke="#999"
            strokeWidth="0.3"
          />
          {/* Top-right maple leaf */}
          <path
            d={`M ${borderRight-10} ${borderTop+10} l 1 -3 l 1 3 l 3 -1 l -2 2 l 2 2 l -3 -1 l -1 3 l -1 -3 l -3 1 l 2 -2 l -2 -2 z`}
            fill="#ccc"
            stroke="#999"
            strokeWidth="0.3"
          />
          {/* Bottom-left maple leaf */}
          <path
            d={`M ${borderLeft+10} ${borderBottom-10} l 1 -3 l 1 3 l 3 -1 l -2 2 l 2 2 l -3 -1 l -1 3 l -1 -3 l -3 1 l 2 -2 l -2 -2 z`}
            fill="#ccc"
            stroke="#999"
            strokeWidth="0.3"
          />
          {/* Bottom-right maple leaf */}
          <path
            d={`M ${borderRight-10} ${borderBottom-10} l 1 -3 l 1 3 l 3 -1 l -2 2 l 2 2 l -3 -1 l -1 3 l -1 -3 l -3 1 l 2 -2 l -2 -2 z`}
            fill="#ccc"
            stroke="#999"
            strokeWidth="0.3"
          />
        </svg>
      );
    }

    // Dashed border - classic dashed line perimeter
    if (decorativeBorder === 'dashes') {
      // Full page dimensions
      const pageWidth = 210;
      const pageHeight = 297;
      const borderPadding = 10;

      // Calculate border position
      const borderLeft = borderPadding;
      const borderTop = borderPadding;
      const borderRight = pageWidth - borderPadding;
      const borderBottom = pageHeight - borderPadding;
      const borderWidth = borderRight - borderLeft;
      const borderHeight = borderBottom - borderTop;

      return (
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ zIndex: 0 }}
          viewBox={`0 0 ${pageWidth} ${pageHeight}`}
          preserveAspectRatio="none"
        >
          {/* Dashed rectangle */}
          <rect
            x={borderLeft}
            y={borderTop}
            width={borderWidth}
            height={borderHeight}
            stroke="#888"
            strokeWidth="1"
            fill="none"
            strokeDasharray="5,3"
          />
        </svg>
      );
    }

    // Stars border - small stars in corners
    if (decorativeBorder === 'stars') {
      // Full page dimensions
      const pageWidth = 210;
      const pageHeight = 297;
      const borderPadding = 10;

      // Calculate border position
      const borderLeft = borderPadding;
      const borderTop = borderPadding;
      const borderRight = pageWidth - borderPadding;
      const borderBottom = pageHeight - borderPadding;
      const borderWidth = borderRight - borderLeft;
      const borderHeight = borderBottom - borderTop;

      return (
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ zIndex: 0 }}
          viewBox={`0 0 ${pageWidth} ${pageHeight}`}
          preserveAspectRatio="none"
        >
          {/* Border line */}
          <rect x={borderLeft+3} y={borderTop+3} width={borderWidth-6} height={borderHeight-6} stroke="#999" strokeWidth="0.5" fill="none" />

          {/* Top-left star */}
          <path
            d={`M ${borderLeft+8} ${borderTop+8} l 1.5 4.5 l 4.5 0.5 l -3.5 3 l 1 4.5 l -3.5 -2.5 l -3.5 2.5 l 1 -4.5 l -3.5 -3 l 4.5 -0.5 z`}
            fill="none"
            stroke="#999"
            strokeWidth="0.8"
          />

          {/* Top-right star */}
          <path
            d={`M ${borderRight-8} ${borderTop+8} l 1.5 4.5 l 4.5 0.5 l -3.5 3 l 1 4.5 l -3.5 -2.5 l -3.5 2.5 l 1 -4.5 l -3.5 -3 l 4.5 -0.5 z`}
            fill="none"
            stroke="#999"
            strokeWidth="0.8"
          />

          {/* Bottom-left star */}
          <path
            d={`M ${borderLeft+8} ${borderBottom-8} l 1.5 -4.5 l 4.5 -0.5 l -3.5 -3 l 1 -4.5 l -3.5 2.5 l -3.5 -2.5 l 1 4.5 l -3.5 3 l 4.5 0.5 z`}
            fill="none"
            stroke="#999"
            strokeWidth="0.8"
          />

          {/* Bottom-right star */}
          <path
            d={`M ${borderRight-8} ${borderBottom-8} l 1.5 -4.5 l 4.5 -0.5 l -3.5 -3 l 1 -4.5 l -3.5 2.5 l -3.5 -2.5 l 1 4.5 l -3.5 3 l 4.5 0.5 z`}
            fill="none"
            stroke="#999"
            strokeWidth="0.8"
          />
        </svg>
      );
    }

    // Brackets border - decorative bracket corners
    if (decorativeBorder === 'brackets') {
      // Full page dimensions
      const pageWidth = 210;
      const pageHeight = 297;
      const borderPadding = 10;

      // Calculate border position
      const borderLeft = borderPadding;
      const borderTop = borderPadding;
      const borderRight = pageWidth - borderPadding;
      const borderBottom = pageHeight - borderPadding;

      return (
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ zIndex: 0 }}
          viewBox={`0 0 ${pageWidth} ${pageHeight}`}
          preserveAspectRatio="none"
        >
          {/* Top-left bracket */}
          <path d={`M ${borderLeft+15} ${borderTop+3} L ${borderLeft+3} ${borderTop+3} L ${borderLeft+3} ${borderTop+20}`} stroke="#777" strokeWidth="1.2" fill="none" strokeLinecap="round" />
          <path d={`M ${borderLeft+1} ${borderTop+5} L ${borderLeft+1} ${borderTop+15}`} stroke="#777" strokeWidth="0.6" fill="none" />

          {/* Top-right bracket */}
          <path d={`M ${borderRight-15} ${borderTop+3} L ${borderRight-3} ${borderTop+3} L ${borderRight-3} ${borderTop+20}`} stroke="#777" strokeWidth="1.2" fill="none" strokeLinecap="round" />
          <path d={`M ${borderRight-1} ${borderTop+5} L ${borderRight-1} ${borderTop+15}`} stroke="#777" strokeWidth="0.6" fill="none" />

          {/* Bottom-left bracket */}
          <path d={`M ${borderLeft+15} ${borderBottom-3} L ${borderLeft+3} ${borderBottom-3} L ${borderLeft+3} ${borderBottom-20}`} stroke="#777" strokeWidth="1.2" fill="none" strokeLinecap="round" />
          <path d={`M ${borderLeft+1} ${borderBottom-5} L ${borderLeft+1} ${borderBottom-15}`} stroke="#777" strokeWidth="0.6" fill="none" />

          {/* Bottom-right bracket */}
          <path d={`M ${borderRight-15} ${borderBottom-3} L ${borderRight-3} ${borderBottom-3} L ${borderRight-3} ${borderBottom-20}`} stroke="#777" strokeWidth="1.2" fill="none" strokeLinecap="round" />
          <path d={`M ${borderRight-1} ${borderBottom-5} L ${borderRight-1} ${borderBottom-15}`} stroke="#777" strokeWidth="0.6" fill="none" />

          {/* Small decorative accents at midpoints */}
          <circle cx={pageWidth/2} cy={borderTop+3} r="1" fill="#999" />
          <circle cx={pageWidth/2} cy={borderBottom-3} r="1" fill="#999" />
          <circle cx={borderLeft+3} cy={pageHeight/2} r="1" fill="#999" />
          <circle cx={borderRight-3} cy={pageHeight/2} r="1" fill="#999" />
        </svg>
      );
    }

    // Notebook border - lined paper style with hole punches
    if (decorativeBorder === 'notebook') {
      // Full page dimensions
      const pageWidth = 210;
      const pageHeight = 297;
      const borderPadding = 10;

      // Calculate border position
      const borderLeft = borderPadding;
      const borderTop = borderPadding;
      const borderRight = pageWidth - borderPadding;
      const borderBottom = pageHeight - borderPadding;

      return (
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ zIndex: 0 }}
          viewBox={`0 0 ${pageWidth} ${pageHeight}`}
          preserveAspectRatio="none"
        >
          {/* Red margin line on left */}
          <line x1={borderLeft+20} y1={borderTop+5} x2={borderLeft+20} y2={borderBottom-5} stroke="#e88" strokeWidth="0.8" />

          {/* Hole punches on left margin */}
          {Array(6).fill(null).map((_, i) => (
            <circle
              key={`punch-${i}`}
              cx={borderLeft+8}
              cy={borderTop+25 + i * 40}
              r="2.5"
              fill="none"
              stroke="#ccc"
              strokeWidth="1"
            />
          ))}

          {/* Top line */}
          <line x1={borderLeft+5} y1={borderTop+5} x2={borderRight-5} y2={borderTop+5} stroke="#ddd" strokeWidth="0.5" />

          {/* Bottom line */}
          <line x1={borderLeft+5} y1={borderBottom-5} x2={borderRight-5} y2={borderBottom-5} stroke="#ddd" strokeWidth="0.5" />
        </svg>
      );
    }

    return null;
  };

  // Check if sub-part is "compact" (simple, short question)
  const isSubPartCompact = (subPart: ExerciseSubPart): boolean => {
    return !subPart.choices && !subPart.imageUrl && !subPart.requiresDrawing &&
           subPart.question.length < 80;  // Short questions only
  };

  // Render a sub-part (a, b, c, etc.)
  const renderSubPart = (subPart: ExerciseSubPart, parentNumber: number) => (
    <div key={subPart.letter} className="mb-2">
      <div className="flex items-start gap-2 mb-1">
        {/* Sub-part letter */}
        <span className="font-semibold flex-shrink-0" style={{ color: '#000000' }}>
          {subPart.letter})
        </span>

        {/* Sub-part question */}
        <div className="flex-1" style={{ color: '#000000' }}>
          {formatTextWithFractions(subPart.question)}
        </div>
      </div>

      <div className="ml-6">
        {/* Multiple choice for sub-part */}
          {subPart.choices && subPart.choices.length > 0 && (
            <div className="mt-1 ml-2 space-y-0.5">
              {subPart.choices.map((choice, i) => (
                <div key={i} className="flex items-center gap-1.5 text-sm">
                  <span
                    className="w-5 h-5 border-2 rounded flex items-center justify-center text-xs flex-shrink-0"
                    style={{ borderColor: '#9ca3af', color: '#000000' }}
                  >
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span style={{ color: '#000000' }}>{formatTextWithFractions(choice)}</span>
                </div>
              ))}
            </div>
          )}

          {/* Image for sub-part */}
          {subPart.imageUrl && (
            <div className="mt-1">
              <img
                src={subPart.imageUrl}
                alt={`Illustration pour ${parentNumber}${subPart.letter}`}
                className="max-w-xs border rounded"
              />
            </div>
          )}

          {/* Drawing workspace for sub-part */}
          {!showAnswers && renderDrawingWorkspace(subPart)}

          {/* Answer for sub-part */}
          {showAnswers && (
            <div
              className="mt-1 p-2 border rounded text-sm"
              style={{
                backgroundColor: '#dcfce7',
                borderColor: '#86efac',
                color: '#166534'
              }}
            >
              <strong>Réponse:</strong>{' '}
              {Array.isArray(subPart.answer)
                ? formatTextWithFractions(subPart.answer.join(', '))
                : formatTextWithFractions(String(subPart.answer))}
            </div>
          )}
      </div>
    </div>
  );

  // Dynamic pagination: Estimates exercise heights based on content and fits them to pages
  // ANY question will move to next page if it would overflow
  const groupExercisesForPages = () => {
    const pages: DrillExercise[][] = [];

    // A4 dimensions and available space
    const A4_HEIGHT_MM = 297;
    const PADDING_MM = 15 * 2; // Top + bottom

    // Estimate header height (varies based on content)
    const HEADER_BASE_MM = 35; // Base header with title
    const HEADER_WITH_INSTRUCTIONS_MM = customInstructions ? 30 : 0; // Additional if instructions
    const HEADER_WITH_NAME_DATE_MM = !showAnswers ? 20 : 0; // Additional if name/date fields
    const TOTAL_HEADER_MM = HEADER_BASE_MM + HEADER_WITH_INSTRUCTIONS_MM + HEADER_WITH_NAME_DATE_MM;

    // Estimate footer height
    const FOOTER_MM = showScoring ? 30 : 20;

    // Available height for exercises
    const AVAILABLE_HEIGHT_MM = A4_HEIGHT_MM - PADDING_MM - TOTAL_HEADER_MM - FOOTER_MM;

    // Font size multiplier (larger fonts need more space)
    // 10pt = 1.0x, 12pt = 1.2x, 14pt = 1.4x, 16pt = 1.6x
    const fontMultiplier = fontSize / 10;

    // Estimate height for a single exercise (in mm)
    const estimateExerciseHeight = (exercise: DrillExercise): number => {
      let height = 0;

      // Base question height (question number + difficulty badge + question text)
      // Includes padding and spacing around the question
      height += 15 * fontMultiplier;

      // Add height for context if present (usually 1-4 lines of text)
      if (exercise.context && exercise.context.trim() !== '') {
        const contextLines = Math.ceil(exercise.context.length / 70); // Character count estimate
        height += (8 * contextLines) * fontMultiplier;
      }

      // Multi-part questions: sub-parts are laid out HORIZONTALLY (a, b, c in a row)
      // But they still take vertical space for each row
      if (exercise.isMultiPart && exercise.subParts && exercise.subParts.length > 0) {
        // Estimate 3 sub-parts per row (horizontal layout)
        const rows = Math.ceil(exercise.subParts.length / 3);
        height += (rows * 12) * fontMultiplier;
      }

      // Choices are vertical, each takes one line
      if (exercise.choices && exercise.choices.length > 0) {
        height += (exercise.choices.length * 7) * fontMultiplier;
      }

      // Answer box if showing answers (includes green box + padding)
      if (showAnswers) {
        height += 10 * fontMultiplier;
      }

      // Gap between exercises (0.75rem converted to mm)
      height += 6;

      return height;
    };

    // Paginate exercises based on estimated heights
    let currentPage: DrillExercise[] = [];
    let currentPageHeight = 0;

    for (let i = 0; i < exercises.length; i++) {
      const exercise = exercises[i];
      const exerciseHeight = estimateExerciseHeight(exercise);

      // Check if adding this exercise would exceed available height
      if (currentPageHeight + exerciseHeight > AVAILABLE_HEIGHT_MM && currentPage.length > 0) {
        // Start new page
        pages.push(currentPage);
        currentPage = [exercise];
        currentPageHeight = exerciseHeight;
      } else {
        // Add to current page
        currentPage.push(exercise);
        currentPageHeight += exerciseHeight;
      }
    }

    // Add the last page if it has exercises
    if (currentPage.length > 0) {
      pages.push(currentPage);
    }

    console.log(`📄 Dynamic pagination: ${pages.length} pages created`);
    console.log(`📏 Available height: ${AVAILABLE_HEIGHT_MM.toFixed(1)}mm, Font multiplier: ${fontMultiplier.toFixed(2)}x`);
    pages.forEach((page, idx) => {
      const pageHeight = page.reduce((sum, ex) => sum + estimateExerciseHeight(ex), 0);
      console.log(`   Page ${idx + 1}: ${page.length} exercises (~${pageHeight.toFixed(1)}mm)`);
    });

    return pages;
  };

  const pages = groupExercisesForPages();

  // Render exercise component
  const renderExercise = (exercise: DrillExercise, globalIndex: number) => {
    return (
      <div
        key={globalIndex}
        className="exercise-item p-2 break-inside-avoid"
      >

      {/* Context (if present) */}
      {exercise.context && (
        <div className="mb-2 p-2 rounded text-sm italic" style={{ backgroundColor: '#f9fafb', color: '#000000' }}>
          {formatTextWithFractions(exercise.context)}
        </div>
      )}

      {/* Exercise Question - Number and text on same line */}
      <div className="flex items-start mb-3 gap-2">
        <span className="font-bold flex-shrink-0" style={{ color: '#000000' }}>
          {globalIndex + 1}.
        </span>
        <div className="flex items-start gap-2 flex-1">
          <div className="question flex-1" style={{ color: '#000000' }}>
            {formatTextWithFractions(stripLeadingNumber(exercise.question))}
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            {getDifficultyBadge(exercise.difficulty)}
            {exercise.points && exercise.points > 1 && (
              <span className="text-xs font-semibold" style={{ color: '#6b7280' }}>
                ({exercise.points}pts)
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="mb-3">

        {/* Multiple Choice Options (only if NOT multi-part) */}
        {!exercise.isMultiPart && exercise.choices && exercise.choices.length > 0 && (
          <div className="mt-2 ml-4 space-y-1">
            {exercise.choices.map((choice, i) => (
              <div key={i} className="flex items-center gap-2">
                <span
                  className="w-6 h-6 border-2 rounded flex items-center justify-center text-xs"
                  style={{ borderColor: '#9ca3af', color: '#000000' }}
                >
                  {String.fromCharCode(65 + i)}
                </span>
                <span style={{ color: '#000000' }}>{formatTextWithFractions(choice)}</span>
              </div>
            ))}
          </div>
        )}

        {/* Image if provided (only if NOT multi-part) */}
        {!exercise.isMultiPart && exercise.imageUrl && (
          <div className="mt-2">
            <img
              src={exercise.imageUrl}
              alt={`Illustration pour exercice ${exercise.number}`}
              className="max-w-md border rounded"
            />
          </div>
        )}
      </div>

      {/* Multi-part sub-questions (a, b, c, etc.) */}
      {exercise.isMultiPart && exercise.subParts && exercise.subParts.length > 0 && (
        <div
          className="mt-3 ml-4"
          style={{
            // Use horizontal flex layout if all sub-parts are compact, otherwise stack vertically
            display: exercise.subParts.every(isSubPartCompact) ? 'flex' : 'block',
            flexWrap: exercise.subParts.every(isSubPartCompact) ? 'wrap' : undefined,
            gap: exercise.subParts.every(isSubPartCompact) ? '0.5rem 2rem' : '0',
            alignItems: exercise.subParts.every(isSubPartCompact) ? 'flex-start' : undefined
          }}
        >
          {exercise.subParts.map((subPart) => renderSubPart(subPart, exercise.number))}
        </div>
      )}

      {/* Drawing Workspace for visual exercises (only if NOT multi-part) */}
      {!exercise.isMultiPart && !showAnswers && renderDrawingWorkspace(exercise)}

      {/* Answer Section (only if NOT multi-part, since multi-part shows answers per sub-part) */}
      {!exercise.isMultiPart && showAnswers && (
        <div
          className="answer-section p-3 border rounded"
          style={{
            backgroundColor: '#dcfce7',
            borderColor: '#86efac',
            color: '#166534'
          }}
        >
          <strong>Réponse:</strong>{' '}
          {formatAnswer(exercise)}
        </div>
      )}
      </div>
    );
  };

  return (
    <div className="drill-sheet-container space-y-8">
      {pages.map((pageExercises, pageIndex) => (
        <div
          key={pageIndex}
          className="print-page shadow-lg mx-auto relative"
          style={{
            width: '210mm', // A4 width
            minHeight: '297mm', // Minimum A4 height (allows overflow if needed)
            maxHeight: '297mm', // Maximum A4 height for PDF
            padding: '15mm', // Reduced from 20mm for more content space
            fontFamily: fontFamily,
            fontSize: `${fontSize}pt`,
            fontWeight: isBold ? 700 : 400,
            fontStyle: isItalic ? 'italic' : 'normal',
            pageBreakAfter: pageIndex < pages.length - 1 ? 'always' : 'auto',
            breakAfter: pageIndex < pages.length - 1 ? 'page' : 'auto',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#ffffff',
            color: '#000000',
            overflow: 'hidden' // Prevent overflow from showing, forces pagination
          }}
        >
          {/* Decorative Border */}
          {getDecorativeBorder()}
          {/* Header Section */}
          <div
            className="mb-3 pb-2 border-b-2 p-3 rounded-lg flex-shrink-0 relative"
            style={{
              borderColor: '#d1d5db',
              backgroundColor: '#ffffff',
              color: '#000000',
              zIndex: 1
            }}
          >
            <div className="flex items-start justify-between">
              <h1
                className="text-xl font-bold mb-1"
                style={{ color: '#000000' }}
              >
                {title}
              </h1>
              {pages.length > 1 && (
                <div className="text-sm flex-shrink-0" style={{ color: '#6b7280' }}>
                  Page {pageIndex + 1}/{pages.length}
                </div>
              )}
            </div>

            {pageIndex === 0 && customInstructions && (
              <div
                className="mt-3 p-3 border rounded text-sm"
                style={{
                  backgroundColor: '#dbeafe',
                  borderColor: '#bfdbfe',
                  color: '#000000'
                }}
              >
                <strong>Instructions:</strong> {customInstructions}
              </div>
            )}

            {pageIndex === 0 && !showAnswers && (
              <div className="mt-3 flex justify-between items-center text-sm border-t pt-3" style={{ borderColor: '#d1d5db', color: '#000000' }}>
                <div>
                  <strong>Nom:</strong> _______________________________
                </div>
                <div>
                  <strong>Date:</strong> _______________________________
                </div>
              </div>
            )}
          </div>

          {/* Exercises Section */}
          <div
            className="exercises-container flex-1 relative"
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',  // Reduced from 1.5rem - tighter spacing between exercises
              paddingBottom: '1rem',  // Reduced from 2rem
              zIndex: 1
            }}
          >
            {pageExercises.map((exercise, pageExIndex) => {
              // Calculate global exercise index across all pages
              const globalIndex = pages.slice(0, pageIndex).reduce((sum, page) => sum + page.length, 0) + pageExIndex;
              return renderExercise(exercise, globalIndex);
            })}
          </div>

          {/* Footer */}
          <div className="flex-shrink-0 relative" style={{ zIndex: 1 }}>
            {/* Scoring Footer */}
            {!showAnswers && showScoring && pageIndex === pages.length - 1 && (
              <div
                className="mt-4 pt-4 border-t-2 text-right"
                style={{ borderColor: '#000000' }}
              >
                <div className="text-lg font-semibold" style={{ color: '#000000' }}>
                  Résultat: ____/{calculatedTotalPoints} ______%
                </div>
              </div>
            )}

            {!showAnswers && pageIndex === pages.length - 1 && (
              <div
                className="mt-6 pt-4 border-t text-center text-sm"
                style={{ borderColor: '#d1d5db', color: '#6b7280' }}
              >
                Généré avec Quebec Teacher Hub - Programme de formation de l'école québécoise
              </div>
            )}

            {showAnswers && pageIndex === pages.length - 1 && (
              <div className="mt-6 pt-4 border-t-2 text-center" style={{ borderColor: '#16a34a' }}>
                <div
                  className="p-3 rounded-lg inline-block"
                  style={{ backgroundColor: '#dcfce7' }}
                >
                  <strong style={{ color: '#166534' }}>📝 Corrigé</strong>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
