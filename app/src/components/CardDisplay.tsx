'use client';

import React from 'react';
import { Card } from '@/components/ui/card';

interface CardData {
  number: number;
  title: string;
  question: string;
  answer?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  theme?: string;
}

interface CardDisplayProps {
  cards: CardData[];
  displayMode: 'studentCards' | 'answerSheet' | 'corriger';
  theme?: any;
}

export function CardDisplay({ cards, displayMode, theme }: CardDisplayProps) {
  // Split cards into pages (4 per page for student cards)
  const cardsPerPage = 4;
  const pages = [];
  for (let i = 0; i < cards.length; i += cardsPerPage) {
    pages.push(cards.slice(i, i + cardsPerPage));
  }

  const getCardBackground = () => {
    if (!theme) return 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    return theme.cardBackground || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
  };

  const renderStudentCard = (card: CardData, index: number) => (
    <div
      key={card.number}
      className="relative p-6 rounded-lg shadow-lg"
      style={{
        background: getCardBackground(),
        border: theme?.cardBorder || '2px solid rgba(255,255,255,0.2)',
        minHeight: '350px',
        width: '100%'
      }}
    >
      {/* Card Number Badge */}
      <div
        className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center font-bold text-white shadow-md"
        style={{
          background: theme?.numberBadgeBackground || 'rgba(0,0,0,0.3)'
        }}
      >
        {card.number}
      </div>

      {/* Card Title */}
      {card.title && (
        <h3 className="text-lg font-bold text-white mb-4 pr-12">
          {card.title}
        </h3>
      )}

      {/* Question */}
      <div className="bg-white/90 rounded-lg p-4 mt-4 min-h-[200px]">
        <p className="text-gray-800 text-base leading-relaxed">
          {card.question}
        </p>
      </div>

      {/* Difficulty Indicator */}
      {card.difficulty && (
        <div className="mt-3 flex gap-1">
          {['easy', 'medium', 'hard'].map((level, idx) => (
            <div
              key={level}
              className={`w-2 h-2 rounded-full ${
                idx <= ['easy', 'medium', 'hard'].indexOf(card.difficulty!)
                  ? 'bg-yellow-400'
                  : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );

  const renderAnswerSheetPage = (pageCards: CardData[], pageNumber: number) => (
    <div key={pageNumber} className="print-page bg-white p-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">🎯 Feuille de Réponses 🎯</h1>

        {pageNumber === 0 && (
          <div className="border-2 border-gray-300 rounded-lg p-4 mb-6 max-w-2xl mx-auto">
            <div className="flex justify-between mb-2">
              <div className="flex-1">
                <span className="text-gray-600">👤 Nom: </span>
                <span className="border-b-2 border-dotted border-gray-400 inline-block w-48"></span>
              </div>
              <div className="flex-1">
                <span className="text-gray-600">📅 Date: </span>
                <span className="border-b-2 border-dotted border-gray-400 inline-block w-48"></span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Answer Boxes */}
      <div className="grid grid-cols-1 gap-6">
        {pageCards.map((card) => (
          <div key={card.number} className="border-2 border-gray-300 rounded-lg p-4">
            <div className="flex items-start gap-4 mb-3">
              <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold flex-shrink-0">
                {card.number}
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-600 mb-2">{card.question}</p>
              </div>
            </div>

            {/* Answer Lines */}
            <div className="ml-14 space-y-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="border-b-2 border-dotted border-gray-300 h-6"></div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCorrigerPage = (pageCards: CardData[], pageNumber: number) => (
    <div key={pageNumber} className="print-page bg-gradient-to-br from-green-50 to-green-100 p-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-green-800">
          📝 Corrigé - Page {pageNumber + 1}/{pages.length} 📝
        </h1>
      </div>

      {/* Answer Cards */}
      <div className="grid grid-cols-2 gap-6">
        {pageCards.map((card) => (
          <div key={card.number} className="bg-white border-2 border-green-400 rounded-lg p-4 shadow-md">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center font-bold flex-shrink-0">
                {card.number}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium mb-2">{card.question}</p>
              </div>
            </div>

            {/* Answer Section */}
            <div className="ml-13 bg-green-50 border border-green-200 rounded p-3">
              <div className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <p className="text-green-800">
                  {card.answer || 'Réponse à ajouter'}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      {displayMode === 'studentCards' && pages.map((pageCards, pageIndex) => (
        <div key={pageIndex} className="print-page bg-gray-50 p-8">
          <div className="grid grid-cols-2 gap-5">
            {pageCards.map((card, idx) => renderStudentCard(card, pageIndex * cardsPerPage + idx))}
          </div>
        </div>
      ))}

      {displayMode === 'answerSheet' && pages.map((pageCards, pageIndex) =>
        renderAnswerSheetPage(pageCards, pageIndex)
      )}

      {displayMode === 'corriger' && pages.map((pageCards, pageIndex) =>
        renderCorrigerPage(pageCards, pageIndex)
      )}
    </div>
  );
}