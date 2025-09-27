'use client';

import React, { useState } from 'react';
import { X, ChevronRight, ChevronDown } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import type { IllustrationTheme } from '@/lib/combined-illustration-service';
import CombinedIllustrationServiceInstance from '@/lib/combined-illustration-service';
import { allCardThemes, getAllThemeByIndex, themeCategories } from '@/lib/all-card-themes';

interface SimpleCustomizationPanelProps {
  isOpen: boolean;
  onToggle: () => void;

  // Page selection
  selectedPageType: 'all' | 'studentCards' | 'studentAnswers' | 'teacherAnswers';
  onPageTypeChange: (type: 'all' | 'studentCards' | 'studentAnswers' | 'teacherAnswers') => void;

  // Font settings
  fontSettings: {
    fontFamily: string;
    fontSize: number;
    isBold: boolean;
    isItalic: boolean;
  };
  onFontSettingsChange: (settings: any) => void;

  // Draggable features
  isDraggableText: boolean;
  onDraggableTextChange: (value: boolean) => void;
  isDraggableIllustrations: boolean;
  onDraggableIllustrationsChange: (value: boolean) => void;

  // Illustration settings
  showIllustrations: boolean;
  onShowIllustrationsChange: (value: boolean) => void;
  characterTheme: IllustrationTheme;
  onCharacterThemeChange: (theme: IllustrationTheme) => void;
  globalCharacterScale: number;
  onGlobalCharacterScaleChange: (scale: number) => void;

  // Visual scales
  visualScale: number;
  onVisualScaleChange: (scale: number) => void;

  // Reset functions
  onResetIllustrationTransforms?: () => void;
  onResetTextPositions?: () => void;
  onApplyIllustrationToLeftPage?: () => void;
  onApplyIllustrationToRightPage?: () => void;

  // Card theme
  selectedCardTheme: 'auto' | number;
  onCardThemeChange: (theme: 'auto' | number) => void;

  // Transparent background
  transparentBackground?: boolean;
  onTransparentBackgroundChange?: (value: boolean) => void;

  // Question container transparency
  questionContainerOpacity?: number;
  onQuestionContainerOpacityChange?: (opacity: number) => void;
}

// Font options
const fontCategories = [
  {
    name: '🎨 Polices Amusantes',
    fonts: [
      { value: '"Fredoka", sans-serif', label: 'Fredoka' },
      { value: '"Bubblegum Sans", cursive', label: 'Bubblegum Sans' },
      { value: '"Comic Sans MS", cursive', label: 'Comic Sans' },
      { value: '"Quicksand", sans-serif', label: 'Quicksand' }
    ]
  },
  {
    name: '✏️ Écriture Manuscrite',
    fonts: [
      { value: '"Kalam", cursive', label: 'Kalam' },
      { value: '"Patrick Hand", cursive', label: 'Patrick Hand' },
      { value: '"Caveat", cursive', label: 'Caveat' },
      { value: '"Schoolbell", cursive', label: 'Schoolbell' }
    ]
  },
  {
    name: '📚 Polices Classiques',
    fonts: [
      { value: 'Arial, sans-serif', label: 'Arial' },
      { value: 'system-ui', label: 'System Default' },
      { value: 'Georgia, serif', label: 'Georgia' },
      { value: 'Verdana, sans-serif', label: 'Verdana' }
    ]
  }
];

export function SimpleCustomizationPanel({
  isOpen,
  onToggle,
  selectedPageType,
  onPageTypeChange,
  fontSettings,
  onFontSettingsChange,
  isDraggableText,
  onDraggableTextChange,
  isDraggableIllustrations,
  onDraggableIllustrationsChange,
  showIllustrations,
  onShowIllustrationsChange,
  characterTheme,
  onCharacterThemeChange,
  globalCharacterScale,
  onGlobalCharacterScaleChange,
  visualScale,
  onVisualScaleChange,
  onResetIllustrationTransforms,
  onResetTextPositions,
  onApplyIllustrationToLeftPage,
  onApplyIllustrationToRightPage,
  selectedCardTheme,
  onCardThemeChange,
  transparentBackground,
  onTransparentBackgroundChange,
  questionContainerOpacity = 90,
  onQuestionContainerOpacityChange
}: SimpleCustomizationPanelProps) {
  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={onToggle}
        className="fixed right-0 top-1/2 -translate-y-1/2 bg-gray-800 text-white px-2 py-4 rounded-l-lg shadow-lg z-50 hover:bg-gray-700 transition-colors"
      >
        <ChevronRight className={`h-5 w-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Panel */}
      <div className={`fixed right-0 top-0 h-full w-96 bg-gray-900 text-white shadow-2xl transform transition-transform duration-300 z-40 overflow-hidden ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-700">
            <h2 className="text-xl font-bold">Personnalisation</h2>
            <button
              onClick={onToggle}
              className="p-1 hover:bg-gray-800 rounded transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Page Selector */}
          <div className="p-4 border-b border-gray-700 bg-gray-800">
            <Label className="text-sm font-medium mb-2 block text-gray-300">
              Pages à personnaliser
            </Label>
            <Select value={selectedPageType} onValueChange={onPageTypeChange as any}>
              <SelectTrigger className="w-full bg-gray-700 border-gray-600 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-600">
                <SelectItem value="all" className="text-white hover:bg-gray-700">
                  Toutes les pages
                </SelectItem>
                <SelectItem value="studentCards" className="text-white hover:bg-gray-700">
                  Cartes élèves (questions)
                </SelectItem>
                <SelectItem value="studentAnswers" className="text-white hover:bg-gray-700">
                  Feuilles réponses élèves
                </SelectItem>
                <SelectItem value="teacherAnswers" className="text-white hover:bg-gray-700">
                  Corrigé enseignant
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            <Tabs defaultValue="themes" className="w-full">
              <TabsList className="grid w-full grid-cols-4 bg-gray-800">
                <TabsTrigger value="themes" className="data-[state=active]:bg-gray-700">Thèmes</TabsTrigger>
                <TabsTrigger value="font" className="data-[state=active]:bg-gray-700">Police</TabsTrigger>
                <TabsTrigger value="illustrations" className="data-[state=active]:bg-gray-700">Illustrations</TabsTrigger>
                <TabsTrigger value="interactive" className="data-[state=active]:bg-gray-700">Interactif</TabsTrigger>
              </TabsList>

              {/* Themes Tab */}
              <TabsContent value="themes" className="p-4 space-y-4">
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm mb-2 block">Thème des cartes</Label>

                    {/* Current theme display */}
                    <div className="mb-4 p-3 bg-gray-800 rounded-lg">
                      <p className="text-xs text-gray-400 mb-1">Thème actuel:</p>
                      <p className="text-sm text-white font-medium">
                        {selectedCardTheme === 'auto'
                          ? '🎲 Automatique (varie par carte)'
                          : getAllThemeByIndex(selectedCardTheme as number)?.name || 'Sélectionner un thème'
                        }
                      </p>
                    </div>

                    {/* Question Container Transparency Slider */}
                    <div className="mb-4">
                      <Label className="text-sm mb-2 block">
                        Transparence des questions: {questionContainerOpacity}%
                      </Label>
                      <Slider
                        value={[questionContainerOpacity]}
                        onValueChange={([value]) => onQuestionContainerOpacityChange?.(value)}
                        min={50}
                        max={100}
                        step={5}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-gray-400 mt-1">
                        <span>50% (Très transparent)</span>
                        <span>100% (Opaque)</span>
                      </div>
                    </div>

                    <Separator className="my-2" />

                    {/* Theme tiles with preview */}
                    <div className="space-y-4">
                      {/* Auto theme option */}
                      <button
                        onClick={() => onCardThemeChange('auto')}
                        className={`w-full relative group transition-all duration-200 ${
                          selectedCardTheme === 'auto' ? 'ring-2 ring-blue-400' : 'hover:ring-2 hover:ring-gray-600'
                        }`}
                      >
                        <div className="h-16 rounded-lg bg-gradient-to-br from-purple-500 via-pink-500 to-yellow-500 flex items-center justify-center">
                          <span className="text-white text-xl font-bold drop-shadow-lg">🎲 Mode Automatique</span>
                        </div>
                        {selectedCardTheme === 'auto' && (
                          <div className="absolute top-1 right-1 w-3 h-3 bg-blue-400 rounded-full"></div>
                        )}
                      </button>

                      {/* Professional Themes */}
                      <div>
                        <p className="text-xs text-gray-400 font-semibold mb-2">
                          {themeCategories.professional.name}
                        </p>
                        <div className="grid grid-cols-2 gap-2">
                          {themeCategories.professional.themes.map((theme, index) => {
                            const tileStyle: React.CSSProperties = {
                              background: theme.pattern,
                              backgroundColor: theme.secondary,
                              position: 'relative',
                              height: '60px',
                              overflow: 'hidden'
                            };

                            return (
                              <button
                                key={index}
                                onClick={() => onCardThemeChange(index)}
                                className={`relative group transition-all duration-200 ${
                                  selectedCardTheme === index ? 'ring-2 ring-blue-400 scale-95' : 'hover:scale-105'
                                }`}
                              >
                                <div style={tileStyle}>
                                  {/* Mini white question area */}
                                  <div
                                    className="absolute inset-2"
                                    style={{
                                      background: '#ffffff',
                                      border: `2px solid ${theme.primary}`,
                                      borderRadius: '8px'
                                    }}
                                  />

                                  {/* Number badge preview */}
                                  <div
                                    className="absolute top-1 right-1 w-6 h-6 rounded-full"
                                    style={{
                                      backgroundColor: theme.primary,
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center'
                                    }}
                                  >
                                    <span className="text-white text-xs font-bold">1</span>
                                  </div>

                                  {/* Selection indicator */}
                                  {selectedCardTheme === index && (
                                    <div className="absolute bottom-1 left-1 w-3 h-3 bg-blue-400 rounded-full"></div>
                                  )}
                                </div>
                                <div className="text-xs text-gray-300 mt-1 truncate px-1">
                                  {theme.name}
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Pastel Gradient Themes */}
                      <div>
                        <p className="text-xs text-gray-400 font-semibold mb-2 mt-4">
                          {themeCategories.pastel.name}
                        </p>
                        <div className="grid grid-cols-2 gap-2">
                          {themeCategories.pastel.themes.map((theme, localIndex) => {
                            const index = themeCategories.pastel.startIndex + localIndex;
                            const tileStyle: React.CSSProperties = {
                              background: theme.gradient || theme.cardBackground || '#ffffff',
                              position: 'relative',
                              height: '60px',
                              overflow: 'hidden'
                            };

                            return (
                              <button
                                key={index}
                                onClick={() => onCardThemeChange(index)}
                                className={`relative group transition-all duration-200 ${
                                  selectedCardTheme === index ? 'ring-2 ring-blue-400 scale-95' : 'hover:scale-105'
                                }`}
                              >
                                <div style={tileStyle} className="rounded-lg">
                                  {selectedCardTheme === index && (
                                    <div className="absolute top-1 right-1 w-3 h-3 bg-blue-400 rounded-full"></div>
                                  )}
                                </div>
                                <div className="text-xs text-gray-300 mt-1 truncate px-1">
                                  {theme.name}
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Fun Illustration Themes */}
                      <div>
                        <p className="text-xs text-gray-400 font-semibold mb-2 mt-4">
                          {themeCategories.illustration.name}
                        </p>
                        <div className="grid grid-cols-2 gap-2">
                          {themeCategories.illustration.themes.map((theme, localIndex) => {
                            const index = themeCategories.illustration.startIndex + localIndex;
                            const tileStyle: React.CSSProperties = {
                              background: theme.gradient || theme.cardBackground || '#ffffff',
                              position: 'relative',
                              height: '60px',
                              overflow: 'hidden'
                            };

                            return (
                              <button
                                key={index}
                                onClick={() => onCardThemeChange(index)}
                                className={`relative group transition-all duration-200 ${
                                  selectedCardTheme === index ? 'ring-2 ring-blue-400 scale-95' : 'hover:scale-105'
                                }`}
                              >
                                <div style={tileStyle} className="rounded-lg">
                                  {/* Show illustration icon */}
                                  {theme.illustration && (
                                    <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl opacity-50">
                                      {theme.name.split(' ')[0]}
                                    </span>
                                  )}
                                  {selectedCardTheme === index && (
                                    <div className="absolute top-1 right-1 w-3 h-3 bg-blue-400 rounded-full"></div>
                                  )}
                                </div>
                                <div className="text-xs text-gray-300 mt-1 truncate px-1">
                                  {theme.name}
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Teacher Favorites Themes */}
                      <div>
                        <p className="text-xs text-gray-400 font-semibold mb-2 mt-4">
                          {themeCategories.teacher.name}
                        </p>
                        <div className="grid grid-cols-2 gap-2">
                          {themeCategories.teacher.themes.map((theme, localIndex) => {
                            const index = themeCategories.teacher.startIndex + localIndex;
                            const teacherTheme = theme as any;
                            const tileStyle: React.CSSProperties = {
                              background: teacherTheme.background || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                              backgroundImage: teacherTheme.pattern ? `${teacherTheme.pattern}, ${teacherTheme.background}` : undefined,
                              backgroundSize: teacherTheme.pattern ? '10px 10px, cover' : 'cover',
                              position: 'relative',
                              height: '60px',
                              overflow: 'hidden'
                            };

                            return (
                              <button
                                key={index}
                                onClick={() => onCardThemeChange(index)}
                                className={`relative group transition-all duration-200 ${
                                  selectedCardTheme === index ? 'ring-2 ring-blue-400 scale-95' : 'hover:scale-105'
                                }`}
                              >
                                <div style={tileStyle} className="rounded-lg">
                                  {/* Show decorative elements preview */}
                                  {teacherTheme.decorativeElements && (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                      <span className="text-2xl opacity-60">
                                        {teacherTheme.decorativeElements[0]}
                                      </span>
                                    </div>
                                  )}
                                  {/* Inner white area preview */}
                                  <div
                                    className="absolute inset-2 bg-white rounded"
                                    style={{
                                      border: teacherTheme.contentBorder || '2px solid #667eea',
                                      borderStyle: teacherTheme.contentBorderStyle || 'solid',
                                      opacity: 0.9
                                    }}
                                  ></div>
                                  {selectedCardTheme === index && (
                                    <div className="absolute top-1 right-1 w-3 h-3 bg-blue-400 rounded-full z-10"></div>
                                  )}
                                </div>
                                <div className="text-xs text-gray-300 mt-1 truncate px-1">
                                  {theme.name}
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Font Tab */}
              <TabsContent value="font" className="p-4 space-y-4">
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm mb-2 block">Police</Label>
                    <Select
                      value={fontSettings.fontFamily}
                      onValueChange={(value) => onFontSettingsChange({ ...fontSettings, fontFamily: value })}
                    >
                      <SelectTrigger className="w-full bg-gray-800 border-gray-600">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-600 max-h-96">
                        {fontCategories.map(category => (
                          <div key={category.name}>
                            <div className="px-2 py-1 text-xs font-semibold text-gray-400">
                              {category.name}
                            </div>
                            {category.fonts.map(font => (
                              <SelectItem
                                key={font.value}
                                value={font.value}
                                className="text-white hover:bg-gray-700"
                              >
                                <span style={{ fontFamily: font.value }}>
                                  {font.label}
                                </span>
                              </SelectItem>
                            ))}
                          </div>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-sm mb-2 block">
                      Taille: {fontSettings.fontSize}px
                    </Label>
                    <Slider
                      value={[fontSettings.fontSize]}
                      onValueChange={([value]) => onFontSettingsChange({ ...fontSettings, fontSize: value })}
                      min={10}
                      max={30}
                      step={1}
                      className="w-full"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Gras</Label>
                    <Switch
                      checked={fontSettings.isBold}
                      onCheckedChange={(checked) => onFontSettingsChange({ ...fontSettings, isBold: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Italique</Label>
                    <Switch
                      checked={fontSettings.isItalic}
                      onCheckedChange={(checked) => onFontSettingsChange({ ...fontSettings, isItalic: checked })}
                    />
                  </div>
                </div>
              </TabsContent>

              {/* Illustrations Tab */}
              <TabsContent value="illustrations" className="p-4 space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Afficher illustrations</Label>
                    <Switch
                      checked={showIllustrations}
                      onCheckedChange={onShowIllustrationsChange}
                    />
                  </div>

                  {showIllustrations && (
                    <>
                      <Separator className="bg-gray-700" />

                      <div>
                        <Label className="text-sm mb-2 block">Thème personnages</Label>
                        <Select
                          value={characterTheme}
                          onValueChange={onCharacterThemeChange as any}
                        >
                          <SelectTrigger className="w-full bg-gray-800 border-gray-600">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-800 border-gray-600 max-h-96 overflow-y-auto">
                            {CombinedIllustrationServiceInstance.getAvailableThemes().map(theme => (
                              <SelectItem key={theme.value} value={theme.value} className="text-white hover:bg-gray-700">
                                <span>{theme.icon} {theme.label}</span>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label className="text-sm mb-2 block">
                          Taille personnages: {globalCharacterScale}%
                        </Label>
                        <Slider
                          value={[globalCharacterScale]}
                          onValueChange={([value]) => onGlobalCharacterScaleChange(value)}
                          min={50}
                          max={200}
                          step={10}
                          className="w-full"
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <Label className="text-sm">Fond transparent</Label>
                        <Switch
                          checked={transparentBackground || false}
                          onCheckedChange={onTransparentBackgroundChange || (() => {})}
                        />
                      </div>
                    </>
                  )}

                  <Separator className="bg-gray-700" />

                  <div>
                    <Label className="text-sm mb-2 block">
                      Taille éléments visuels: {visualScale}%
                    </Label>
                    <Slider
                      value={[visualScale]}
                      onValueChange={([value]) => onVisualScaleChange(value)}
                      min={50}
                      max={200}
                      step={10}
                      className="w-full"
                    />
                  </div>
                </div>
              </TabsContent>

              {/* Interactive Tab */}
              <TabsContent value="interactive" className="p-4 space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Texte déplaçable</Label>
                    <Switch
                      checked={isDraggableText}
                      onCheckedChange={onDraggableTextChange}
                    />
                  </div>

                  {isDraggableText && onResetTextPositions && (
                    <button
                      onClick={onResetTextPositions}
                      className="w-full px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded text-sm transition-colors"
                    >
                      Réinitialiser positions texte
                    </button>
                  )}

                  <Separator className="bg-gray-700" />

                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Illustrations déplaçables</Label>
                    <Switch
                      checked={isDraggableIllustrations}
                      onCheckedChange={onDraggableIllustrationsChange}
                    />
                  </div>

                  {isDraggableIllustrations && (
                    <div className="space-y-2">
                      {onResetIllustrationTransforms && (
                        <button
                          onClick={onResetIllustrationTransforms}
                          className="w-full px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded text-sm transition-colors"
                        >
                          Réinitialiser toutes les illustrations
                        </button>
                      )}
                      <div className="grid grid-cols-2 gap-2">
                        {onApplyIllustrationToLeftPage && (
                          <button
                            onClick={onApplyIllustrationToLeftPage}
                            className="px-2 py-2 bg-blue-600 hover:bg-blue-500 rounded text-xs transition-colors"
                          >
                            📋 Carte 1 → Gauche
                          </button>
                        )}
                        {onApplyIllustrationToRightPage && (
                          <button
                            onClick={onApplyIllustrationToRightPage}
                            className="px-2 py-2 bg-purple-600 hover:bg-purple-500 rounded text-xs transition-colors"
                          >
                            📋 Carte 2 → Droite
                          </button>
                        )}
                      </div>
                      <div className="text-xs text-gray-400 text-center space-y-1">
                        <p>• Déplacez l'illustration de la carte 1, puis cliquez "Carte 1 → Gauche"</p>
                        <p>• Déplacez l'illustration de la carte 2, puis cliquez "Carte 2 → Droite"</p>
                      </div>
                    </div>
                  )}

                  <div className="mt-4 p-3 bg-gray-800 rounded-lg">
                    <p className="text-xs text-gray-400">
                      Mode interactif: Glissez pour déplacer, utilisez les coins pour redimensionner
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
}