'use client';

import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Printer, FileText, Check } from "lucide-react";

interface AnswerSheetProps {
  studentName?: string;
  date?: string;
  className?: string;
  showAnswers?: boolean;
  cardCount?: number;
}

export default function AnswerSheetPage() {
  const [showAnswers, setShowAnswers] = useState(false);
  const [studentInfo, setStudentInfo] = useState({
    name: '',
    date: new Date().toLocaleDateString('fr-CA'),
    className: ''
  });

  // Default to 8 cards as per current system
  const cardCount = 8;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-50 print:bg-white">
      {/* Control Panel - Hidden during print */}
      <div className="print:hidden bg-gray-800 text-white p-4 border-b">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <FileText className="h-6 w-6" />
              <h1 className="text-xl font-semibold">Feuille-réponse</h1>
            </div>

            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showAnswers}
                  onChange={(e) => setShowAnswers(e.target.checked)}
                  className="rounded"
                />
                <span>Afficher le corrigé</span>
              </label>

              <Button
                onClick={handlePrint}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Printer className="h-4 w-4 mr-2" />
                Imprimer
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Answer Sheet Content - Optimized for print */}
      <div className="max-w-[210mm] mx-auto p-8 print:p-0 print:max-w-full">
        <div className="bg-white rounded-lg shadow-lg print:shadow-none print:rounded-none p-8 print:p-[20mm]">

          {/* Header Section */}
          <div className="mb-8 print:mb-6">
            <h1 className="text-2xl font-bold text-center mb-6 print:mb-4">
              {showAnswers ? 'Corrigé - Feuille-réponse' : 'Feuille-réponse'}
            </h1>

            {/* Student Information */}
            <div className="border-2 border-gray-400 rounded p-4 print:border-black">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <span className="font-semibold mr-2">Nom:</span>
                  {showAnswers ? (
                    <span className="text-red-600 font-bold">CORRIGÉ</span>
                  ) : (
                    <div className="flex-1 border-b-2 border-dotted border-gray-400 min-h-[24px]"></div>
                  )}
                </div>

                <div className="flex items-center">
                  <span className="font-semibold mr-2">Date:</span>
                  <div className="flex-1 border-b-2 border-dotted border-gray-400 min-h-[24px]"></div>
                </div>
              </div>

              <div className="flex items-center mt-3">
                <span className="font-semibold mr-2">Classe/Groupe:</span>
                <div className="flex-1 border-b-2 border-dotted border-gray-400 min-h-[24px]"></div>
              </div>
            </div>
          </div>

          {/* Answer Grid */}
          <div className="grid grid-cols-2 gap-4 print:gap-3">
            {Array.from({ length: cardCount }, (_, i) => (
              <div
                key={i}
                className="border-2 border-gray-400 rounded p-4 print:border-black print:p-3"
              >
                <div className="flex items-start justify-between mb-2">
                  <span className="font-bold text-lg">Carte {i + 1}</span>
                  {showAnswers && (
                    <Check className="h-5 w-5 text-green-600 print:hidden" />
                  )}
                </div>

                <div className="space-y-2">
                  {/* Answer lines */}
                  {Array.from({ length: 4 }, (_, lineIndex) => (
                    <div
                      key={lineIndex}
                      className="border-b border-gray-300 min-h-[24px] print:border-gray-400"
                    >
                      {showAnswers && lineIndex === 0 && (
                        <span className="text-red-600 text-sm italic">
                          [Réponse ici]
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Footer Section - Score tracking */}
          <div className="mt-8 print:mt-6 border-t-2 border-gray-400 pt-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="flex items-center">
                <span className="font-semibold mr-2">Nombre correct:</span>
                <div className="w-16 border-b-2 border-dotted border-gray-400 text-center">
                  <span className="invisible">00</span>
                </div>
                <span className="ml-1">/ {cardCount}</span>
              </div>

              <div className="flex items-center">
                <span className="font-semibold mr-2">Note:</span>
                <div className="w-16 border-b-2 border-dotted border-gray-400 text-center">
                  <span className="invisible">00</span>
                </div>
                <span className="ml-1">%</span>
              </div>

              <div className="flex items-center">
                <span className="font-semibold mr-2">Vérifié par:</span>
                <div className="flex-1 border-b-2 border-dotted border-gray-400"></div>
              </div>
            </div>
          </div>

          {/* Instructions */}
          {!showAnswers && (
            <div className="mt-6 text-xs text-gray-600 print:text-black">
              <p className="font-semibold">Instructions:</p>
              <ul className="list-disc list-inside mt-1 space-y-1">
                <li>Écris lisiblement tes réponses dans les espaces prévus</li>
                <li>Une seule réponse par carte</li>
                <li>Utilise un crayon à mine ou un stylo bleu ou noir</li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          @page {
            size: A4;
            margin: 0;
          }

          body {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }

          .print\\:hidden {
            display: none !important;
          }

          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
          }
        }
      `}</style>
    </div>
  );
}