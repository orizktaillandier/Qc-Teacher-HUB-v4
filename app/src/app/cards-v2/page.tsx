'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Sparkles, FileText, Download, Printer, Palette } from "lucide-react";
import { PFEQ_STRUCTURE, getNotionsForSubject, getSubNotionsForNotion } from '@/lib/pfeq-structure';
import { FunIllustrations, GradientBackgrounds, PastelGradients } from '@/components/TaskCardThemes';
import { parseQuestionWithVisuals } from '@/components/MathVisuals';

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

        {/* White content area */}
        <div
          className="relative bg-white shadow-md"
          style={{
            borderRadius: '12px',
            width: '100%',
            height: '100%',
            border: `2px solid ${theme.primary}`,
            display: 'grid',
            gridTemplateRows: 'auto 1fr auto',
            padding: '15px',
            zIndex: 1,
            gap: '8px'
          }}
        >
          {/* Card number in circle */}
          <div
            className="absolute -top-2 -right-2 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md"
            style={{
              backgroundColor: theme.primary,
              fontSize: '18px'
            }}
          >
            {card.number}
          </div>

          {/* Header section - auto height */}
          <div>
            {card.title && (
              <h3 className="text-base font-bold mb-1" style={{ color: theme.primary }}>
                {card.title}
              </h3>
            )}

          </div>

          {/* Main content area - takes remaining space */}
          <div className="h-full flex flex-col">
            {(() => {
              const { questionText, visuals } = parseQuestionWithVisuals(card.question);

              if (visuals.length > 0) {
                return (
                  <>
                    {/* Question text area - compact when there are visuals */}
                    <div className="text-sm leading-tight text-gray-800 mb-2">
                      {questionText}
                    </div>

                    {/* Visual area - dedicated space with proper aspect ratio */}
                    <div className="flex-grow flex justify-center items-center"
                         style={{
                           minHeight: '150px',
                           maxHeight: '250px',
                           width: '100%',
                           padding: '10px'
                         }}>
                      {visuals}
                    </div>
                  </>
                );
              } else {
                // No visuals - text can use all space
                return (
                  <div className="text-sm leading-snug text-gray-800">
                    {questionText}
                  </div>
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

    return (
      <div
        key={index}
        className="relative p-3"
        style={{
          background: gradient,
          height: '100%',
          boxSizing: 'border-box',
          borderRadius: '8px'
        }}
      >
        {/* Fun illustration */}
        {illustration}

        {/* White content area with softer corners */}
        <div
          className="relative bg-white shadow-lg"
          style={{
            borderRadius: '20px',
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            padding: '20px',
            border: '2px dashed rgba(0,0,0,0.1)'
          }}
        >
          {/* Large card number */}
          <div className="absolute -top-3 -left-3 text-6xl font-black opacity-20">
            {card.number}
          </div>

          {/* Content with consistent layout */}
          <div className="flex flex-col h-full pt-8">
            {/* Header section */}
            <div>
              {card.title && (
                <h3 className="text-lg font-bold mb-2 text-gray-800">
                  {card.title}
                </h3>
              )}

              {card.context && (
                <p className="text-xs mb-2 text-gray-600">
                  {card.context}
                </p>
              )}
            </div>

            {/* Question and visual section - takes remaining space */}
            <div className="flex-grow flex flex-col">
              {(() => {
                const { questionText, visuals } = parseQuestionWithVisuals(card.question);
                return (
                  <>
                    {/* Question text */}
                    <div className="text-sm leading-snug text-gray-700 mb-2">
                      {questionText}
                    </div>

                    {/* Visual area - dedicated space with proper sizing */}
                    {visuals.length > 0 && (
                      <div className="flex-grow flex justify-center items-center"
                           style={{
                             minHeight: '140px',
                             maxHeight: '220px',
                             width: '100%',
                             padding: '8px'
                           }}>
                        {visuals}
                      </div>
                    )}
                  </>
                );
              })()}
            </div>

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