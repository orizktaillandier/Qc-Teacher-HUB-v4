'use client';

import React from 'react';
import { parseQuestionWithVisuals } from './MathVisuals';

interface CardData {
  number: number;
  title: string;
  question: string;
  answer?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  theme?: string;
}

interface CardDisplayV4Props {
  cards: CardData[];
  displayMode: 'studentCards' | 'answerSheet' | 'corriger';
  theme?: any;
  selectedCardTheme?: 'auto' | number;
  fontSettings?: {
    fontFamily: string;
    fontSize: number;
    fontWeight: number;
    isBold: boolean;
    isItalic: boolean;
    isUnderline: boolean;
    textAlign: 'left' | 'center' | 'right';
  };
}

export function CardDisplayV4({
  cards,
  displayMode,
  theme,
  selectedCardTheme = 'auto',
  fontSettings = {
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    fontSize: 18,
    fontWeight: 400,
    isBold: false,
    isItalic: false,
    isUnderline: false,
    textAlign: 'center' as const
  }
}: CardDisplayV4Props) {

  // Scale for preview (can be adjusted)
  const previewScale = 0.85; // 85% scale to fill more of the container width

  // Render A4 LANDSCAPE page with 2x2 grid (4 cards per page)
  const renderA4LandscapePage = (pageCards: CardData[], pageNumber: number) => {
    return (
      <div
        key={pageNumber}
        className="print-page"
        style={{
          width: '297mm',  // A4 landscape width
          height: '210mm', // A4 landscape height
          pageBreakAfter: 'always',
          position: 'relative',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',  // 2 columns
          gridTemplateRows: '1fr 1fr',      // 2 rows (2x2 grid!)
          gap: '0',
          boxSizing: 'border-box',
          backgroundColor: '#ffffff',
          margin: '0 auto',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Add shadow for visual separation
          border: '1px solid #e5e7eb', // Light border for page definition
        }}
      >
        {/* Render 4 cards in 2x2 grid */}
        {pageCards.map((card, index) => renderTaskCard(card, pageNumber * 4 + index))}

        {/* Cut lines for 2x2 grid */}
        {renderCutLines()}
      </div>
    );
  };

  // Render individual task card
  const renderTaskCard = (card: CardData, globalIndex: number) => {
    const cardTheme = getCardTheme(globalIndex);
    const { questionText, visuals } = parseQuestionWithVisuals(card.question);

    // Check if theme uses nested structure (has pattern)
    const hasPattern = cardTheme?.pattern;
    const isNestedTheme = hasPattern || cardTheme?.secondary;

    if (isNestedTheme) {
      // Nested theme structure with pattern overlay
      return (
        <div
          key={card.number}
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: cardTheme?.secondary || '#ffffff',
            backgroundImage: cardTheme?.pattern || 'none',
            padding: '10px',
            boxSizing: 'border-box',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Card number badge */}
          <div
            style={{
              position: 'absolute',
              top: '8px',
              right: '8px',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: cardTheme?.numberBadgeBackground || cardTheme?.primary || '#3b82f6',
              color: cardTheme?.numberBadgeColor || '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              fontSize: '18px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
              zIndex: 10,
            }}
          >
            {card.number}
          </div>

          {/* Inner white container */}
          <div
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              borderWidth: '2px',
              borderStyle: 'solid',
              borderColor: cardTheme?.primary || '#3b82f6',
              borderRadius: '12px',
              height: '100%',
              width: '100%',
              padding: '20px',
              paddingTop: '35px',
              boxSizing: 'border-box',
              position: 'relative',
            }}
          >
            <p
              style={{
                fontSize: `${fontSettings.fontSize}px`,
                lineHeight: '1.6',
                color: '#1f2937',
                margin: 0,
                fontFamily: fontSettings.fontFamily,
                fontWeight: fontSettings.fontWeight,
                fontStyle: fontSettings.isItalic ? 'italic' : 'normal',
                textDecoration: fontSettings.isUnderline ? 'underline' : 'none',
                textAlign: fontSettings.textAlign,
              }}
            >
              {questionText}
            </p>
            {visuals && visuals.length > 0 && (
              <div style={{ marginTop: '15px', display: 'flex', justifyContent: 'center' }}>
                {visuals}
              </div>
            )}
          </div>
        </div>
      );
    }

    // Regular theme structure
    return (
      <div
        key={card.number}
        style={{
          width: '100%',   // Fill the grid cell completely
          height: '100%',    // Fill the grid cell completely
          padding: '8mm',  // Reduced padding for more content space
          boxSizing: 'border-box',
          position: 'relative',
          overflow: 'hidden',  // Hide overflow for cleaner look
          background: cardTheme?.gradient || cardTheme?.background ||
                     cardTheme?.cardBackground || '#f3f4f6',
          border: 'none',  // No border - cut lines handle separation
        }}
      >
        {/* Card number badge */}
        <div
          style={{
            position: 'absolute',
            top: '8mm',
            right: '8mm',
            width: '12mm',
            height: '12mm',
            borderRadius: cardTheme?.numberBadgeStyle === 'corner' ? '0 0 0 50%' : '50%',
            backgroundColor: cardTheme?.numberBadgeBackground ||
                           cardTheme?.primary || '#3b82f6',
            color: cardTheme?.numberBadgeColor || '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
            fontSize: '16px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          }}
        >
          {card.number}
        </div>

        {/* Question container */}
        <div
          style={{
            backgroundColor: cardTheme?.contentBackground || 'rgba(255, 255, 255, 0.9)',
            borderRadius: '8px',
            padding: '12px',
            height: 'calc(100% - 30mm)',  // Leave space for badge and padding
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            border: cardTheme?.contentBorder || '2px solid rgba(255,255,255,0.5)',
            marginTop: '20mm',  // Space for number badge
            position: 'relative',
            zIndex: 2,
          }}
        >
          <p
            style={{
              fontSize: `${fontSettings.fontSize}px`,
              lineHeight: '1.6',
              color: '#1f2937',
              margin: 0,
              fontFamily: fontSettings.fontFamily,
              fontWeight: fontSettings.fontWeight,
              textAlign: fontSettings.textAlign,
            }}
          >
            {questionText}
          </p>

          {/* Render math visuals if present */}
          {visuals && visuals.length > 0 && (
            <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'center' }}>
              {visuals}
            </div>
          )}
        </div>

        {/* Difficulty indicator */}
        {card.difficulty && (
          <div
            style={{
              position: 'absolute',
              bottom: '8mm',
              left: '10mm',
              display: 'flex',
              gap: '3px',
            }}
          >
            {['easy', 'medium', 'hard'].map((level, idx) => (
              <div
                key={level}
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: idx <= ['easy', 'medium', 'hard'].indexOf(card.difficulty!)
                    ? '#fbbf24'
                    : '#e5e7eb',
                }}
              />
            ))}
          </div>
        )}
      </div>
    );
  };

  // Render cut lines for 2x2 grid
  const renderCutLines = () => {
    return (
      <>
        {/* Vertical cut line (center) */}
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '0',
            bottom: '0',
            width: '0',
            borderLeft: '2px dashed #cccccc',
            pointerEvents: 'none',
            zIndex: 10,
            opacity: 0.5,
          }}
          className="no-print-digital"
        />

        {/* Horizontal cut line (center - only one for 2x2 grid!) */}
        <div
          style={{
            position: 'absolute',
            left: '0',
            right: '0',
            top: '50%',
            height: '0',
            borderTop: '2px dashed #cccccc',
            pointerEvents: 'none',
            zIndex: 10,
            opacity: 0.5,
          }}
          className="no-print-digital"
        />
      </>
    );
  };

  // Get theme for card
  const getCardTheme = (index: number) => {
    if (!theme) return null;

    if (selectedCardTheme === 'auto') {
      // In auto mode, different theme per card
      return theme;
    }
    return theme;
  };

  // Render answer sheet (A4 Landscape)
  const renderAnswerSheet = (cards: CardData[]) => {
    const pages = [];
    const cardsPerPage = 12; // More cards per landscape page

    // Get theme for styling
    const cardTheme = getCardTheme(0);
    const primaryColor = cardTheme?.primary || '#3b82f6';
    const pageBackground = cardTheme?.gradient || cardTheme?.background || cardTheme?.secondary || '#f9fafb';
    const hasPattern = cardTheme?.pattern;

    for (let i = 0; i < cards.length; i += cardsPerPage) {
      const pageCards = cards.slice(i, i + cardsPerPage);
      const pageNumber = Math.floor(i / cardsPerPage);
      const totalPages = Math.ceil(cards.length / cardsPerPage);

      // Calculate optimal grid layout based on number of cards on this page
      const numCards = pageCards.length;
      let columns = 4; // default
      let rows = 3; // default

      if (numCards <= 4) {
        columns = 2;
        rows = 2;
      } else if (numCards <= 6) {
        columns = 3;
        rows = 2;
      } else if (numCards <= 9) {
        columns = 3;
        rows = 3;
      } else {
        columns = 4;
        rows = 3;
      }

      pages.push(
        <div
          key={`answer-${pageNumber}`}
          className="print-page"
          style={{
            width: '297mm',  // A4 landscape width
            height: '210mm', // A4 landscape height
            padding: '12mm',
            boxSizing: 'border-box',
            background: pageBackground,
            backgroundImage: hasPattern ? cardTheme.pattern : undefined,
            pageBreakAfter: 'always',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Header with theme styling - more compact for landscape */}
          <div style={{
            marginBottom: '10mm',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            padding: '10px 15px',
            borderRadius: '8px',
            borderWidth: '2px',
            borderStyle: 'solid',
            borderColor: primaryColor,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexShrink: 0,
          }}>
            <h1 style={{
              fontSize: '20px',
              fontWeight: 'bold',
              margin: 0,
              color: primaryColor,
              fontFamily: fontSettings.fontFamily
            }}>
              Feuille de Réponses {totalPages > 1 ? `(${pageNumber + 1}/${totalPages})` : ''}
            </h1>
            <div style={{ display: 'flex', gap: '25px' }}>
              <div>
                <span style={{ fontSize: '12px', color: '#6b7280' }}>Nom: </span>
                <span style={{
                  borderBottomWidth: '2px',
                  borderBottomStyle: 'dotted',
                  borderBottomColor: primaryColor,
                  display: 'inline-block',
                  width: '180px',
                  marginLeft: '8px'
                }}></span>
              </div>
              <div>
                <span style={{ fontSize: '12px', color: '#6b7280' }}>Date: </span>
                <span style={{
                  borderBottomWidth: '2px',
                  borderBottomStyle: 'dotted',
                  borderBottomColor: primaryColor,
                  display: 'inline-block',
                  width: '100px',
                  marginLeft: '8px'
                }}></span>
              </div>
            </div>
          </div>

          {/* Answer boxes with dynamic grid - fills remaining space */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${columns}, 1fr)`,
            gridTemplateRows: `repeat(${rows}, 1fr)`,
            gap: '10px',
            flex: 1,
            minHeight: 0,
          }}>
            {pageCards.map((card) => (
              <div
                key={card.number}
                style={{
                  borderWidth: '2px',
                  borderStyle: 'solid',
                  borderColor: primaryColor,
                  borderRadius: '8px',
                  padding: '10px',
                  backgroundColor: cardTheme?.contentBackground || 'rgba(255, 255, 255, 0.95)',
                  display: 'flex',
                  flexDirection: 'column',
                  minHeight: 0,
                }}
              >
                {/* Card number and answer space */}
                <div style={{ display: 'flex', gap: '8px', alignItems: 'start', height: '100%' }}>
                  <div
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: cardTheme?.numberBadgeStyle === 'corner' ? '0 0 0 50%' : '50%',
                      backgroundColor: cardTheme?.numberBadgeBackground || primaryColor,
                      color: cardTheme?.numberBadgeColor || '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 'bold',
                      fontSize: '14px',
                      flexShrink: 0,
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    }}
                  >
                    {card.number}
                  </div>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
                    {/* Answer line that fills available space */}
                    <div
                      style={{
                        borderBottomWidth: '2px',
                        borderBottomStyle: 'dotted',
                        borderBottomColor: primaryColor,
                        flex: 1,
                        minHeight: '30px',
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    return <>{pages}</>;
  };

  // Render teacher correction page (A4 Landscape)
  const renderCorrection = (cards: CardData[]) => {
    const pages = [];
    const cardsPerPage = 12;

    // Get theme for styling
    const cardTheme = getCardTheme(0);
    const primaryColor = cardTheme?.primary || '#22c55e';
    const pageBackground = cardTheme?.gradient || cardTheme?.background || cardTheme?.secondary || '#f0fdf4';
    const hasPattern = cardTheme?.pattern;

    for (let i = 0; i < cards.length; i += cardsPerPage) {
      const pageCards = cards.slice(i, i + cardsPerPage);
      const pageNumber = Math.floor(i / cardsPerPage);
      const totalPages = Math.ceil(cards.length / cardsPerPage);

      // Calculate optimal grid layout
      const numCards = pageCards.length;
      let columns = 4;
      let rows = 3;

      if (numCards <= 4) {
        columns = 2;
        rows = 2;
      } else if (numCards <= 6) {
        columns = 3;
        rows = 2;
      } else if (numCards <= 9) {
        columns = 3;
        rows = 3;
      } else {
        columns = 4;
        rows = 3;
      }

      pages.push(
        <div
          key={`corriger-${pageNumber}`}
          className="print-page"
          style={{
            width: '297mm',  // A4 landscape width
            height: '210mm', // A4 landscape height
            padding: '12mm',
            boxSizing: 'border-box',
            background: pageBackground,
            backgroundImage: hasPattern ? cardTheme.pattern : undefined,
            pageBreakAfter: 'always',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Header with theme styling */}
          <div style={{
            marginBottom: '10mm',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            padding: '10px 15px',
            borderRadius: '8px',
            borderWidth: '2px',
            borderStyle: 'solid',
            borderColor: primaryColor,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexShrink: 0,
          }}>
            <h1 style={{
              fontSize: '20px',
              fontWeight: 'bold',
              margin: 0,
              color: primaryColor,
              fontFamily: fontSettings.fontFamily
            }}>
              Corrigé {totalPages > 1 ? `(${pageNumber + 1}/${totalPages})` : ''}
            </h1>
          </div>

          {/* Answer boxes with dynamic grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${columns}, 1fr)`,
            gridTemplateRows: `repeat(${rows}, 1fr)`,
            gap: '10px',
            flex: 1,
            minHeight: 0,
          }}>
            {pageCards.map((card) => (
              <div
                key={card.number}
                style={{
                  borderWidth: '2px',
                  borderStyle: 'solid',
                  borderColor: primaryColor,
                  borderRadius: '8px',
                  padding: '10px',
                  backgroundColor: cardTheme?.contentBackground || 'rgba(255, 255, 255, 0.95)',
                  display: 'flex',
                  flexDirection: 'column',
                  minHeight: 0,
                  overflow: 'hidden',
                }}
              >
                {/* Card number and answer */}
                <div style={{ display: 'flex', gap: '8px', alignItems: 'start', height: '100%', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center', width: '100%' }}>
                    <div
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: cardTheme?.numberBadgeStyle === 'corner' ? '0 0 0 50%' : '50%',
                        backgroundColor: cardTheme?.numberBadgeBackground || primaryColor,
                        color: cardTheme?.numberBadgeColor || '#ffffff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 'bold',
                        fontSize: '14px',
                        flexShrink: 0,
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                      }}
                    >
                      {card.number}
                    </div>
                    <div style={{
                      fontSize: '11px',
                      color: '#6b7280',
                      flex: 1,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}>
                      {card.question}
                    </div>
                  </div>

                  {/* Answer section */}
                  <div
                    style={{
                      backgroundColor: `${primaryColor}10`,
                      borderRadius: '6px',
                      padding: '8px',
                      flex: 1,
                      width: '100%',
                      display: 'flex',
                      alignItems: 'start',
                      gap: '6px',
                      minHeight: 0,
                      overflow: 'auto',
                    }}
                  >
                    <span style={{ color: primaryColor, fontWeight: 'bold', fontSize: '14px', flexShrink: 0 }}>
                      ✓
                    </span>
                    <span style={{
                      color: '#1f2937',
                      fontSize: '21px',
                      wordBreak: 'break-word',
                      fontFamily: fontSettings.fontFamily,
                      fontWeight: fontSettings.fontWeight,
                      fontStyle: fontSettings.isItalic ? 'italic' : 'normal',
                      textDecoration: fontSettings.isUnderline ? 'underline' : 'none',
                    }}>
                      {card.answer || 'Réponse à ajouter'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    return <>{pages}</>;
  };

  // Main render with proper page organization
  if (displayMode === 'studentCards') {
    // Split cards into pages of 4 (2x2 grid)
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
      pages.push(renderA4LandscapePage(pageCards, Math.floor(i / 4)));
    }
    return (
      <div style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '15px', // Reduced space between pages
        paddingBottom: '20px',
      }}>
        {pages.map((page, index) => (
          <div
            key={`page-wrapper-${index}`}
            style={{
              transform: `scale(${previewScale})`,
              transformOrigin: 'top center',
              marginBottom: index < pages.length - 1 ? '10px' : 0, // Reduced additional spacing between scaled pages
            }}
          >
            {page}
          </div>
        ))}
      </div>
    );
  } else if (displayMode === 'answerSheet') {
    return (
      <div style={{
        width: 'max-content',
        minWidth: '100%',
        paddingBottom: '20px'
      }}>
        {renderAnswerSheet(cards)}
      </div>
    );
  } else if (displayMode === 'corriger') {
    return (
      <div style={{
        width: 'max-content',
        minWidth: '100%',
        paddingBottom: '20px'
      }}>
        {renderCorrection(cards)}
      </div>
    );
  }

  return null;
}