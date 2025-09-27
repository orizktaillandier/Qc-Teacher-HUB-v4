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
import { allCardThemes, themeCategories } from '@/lib/all-card-themes';

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

  // Card theme
  selectedCardTheme: 'auto' | number;
  onCardThemeChange: (theme: 'auto' | number) => void;

  // Transparent background
  transparentBackground?: boolean;
  onTransparentBackgroundChange?: (value: boolean) => void;
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
  selectedCardTheme,
  onCardThemeChange,
  transparentBackground,
  onTransparentBackgroundChange
}: SimpleCustomizationPanelProps) {
  // Track which theme categories are expanded
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    professional: true,
    pastel: false,
    illustration: false
  });

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

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
            <Tabs defaultValue="font" className="w-full">
              <TabsList className="grid w-full grid-cols-4 bg-gray-800">
                <TabsTrigger value="font" className="data-[state=active]:bg-gray-700">Police</TabsTrigger>
                <TabsTrigger value="themes" className="data-[state=active]:bg-gray-700">Thèmes</TabsTrigger>
                <TabsTrigger value="illustrations" className="data-[state=active]:bg-gray-700">Illustrations</TabsTrigger>
                <TabsTrigger value="interactive" className="data-[state=active]:bg-gray-700">Interactif</TabsTrigger>
              </TabsList>

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
                          : allCardThemes[selectedCardTheme as number]?.name || 'Sélectionner un thème'
                        }
                      </p>
                    </div>

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
                        <button
                          onClick={() => toggleCategory('professional')}
                          className="flex items-center justify-between w-full text-left text-xs text-gray-400 font-semibold mb-2 hover:text-gray-300 transition-colors"
                        >
                          <span>{themeCategories.professional.name}</span>
                          {expandedCategories.professional ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                        </button>
                        {expandedCategories.professional && (
                          <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto pr-1">
                            {themeCategories.professional.themes.map((theme, localIndex) => {
                              const index = themeCategories.professional.startIndex + localIndex;
                              const tileStyle: React.CSSProperties = {
                                background: theme.cardBackground || '#ffffff',
                                border: theme.cardBorder || '1px solid #e0e0e0',
                                borderRadius: theme.cardRadius || '8px',
                                boxShadow: theme.cardShadow || 'none',
                                height: '60px',
                                position: 'relative',
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
                                    {/* Mini question area preview */}
                                    {theme.questionStyle && (
                                      <div
                                        className="absolute inset-2"
                                        style={{
                                          background: theme.questionStyle.background || 'transparent',
                                          border: theme.questionStyle.border || 'none',
                                          borderRadius: theme.questionStyle.borderRadius || '0',
                                          opacity: 0.7
                                        }}
                                      />
                                    )}

                                    {/* Selection indicator */}
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
                        )}
                      </div>

                      {/* Pastel Gradient Themes */}
                      <div>
                        <button
                          onClick={() => toggleCategory('pastel')}
                          className="flex items-center justify-between w-full text-left text-xs text-gray-400 font-semibold mb-2 hover:text-gray-300 transition-colors"
                        >
                          <span>{themeCategories.pastel.name}</span>
                          {expandedCategories.pastel ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                        </button>
                        {expandedCategories.pastel && (
                          <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto pr-1">
                            {themeCategories.pastel.themes.map((theme, localIndex) => {
                              const index = themeCategories.pastel.startIndex + localIndex;
                              const tileStyle: React.CSSProperties = {
                                background: theme.cardBackground || '#ffffff',
                                border: theme.cardBorder || '1px solid #e0e0e0',
                                borderRadius: theme.cardRadius || '8px',
                                boxShadow: theme.cardShadow || 'none',
                                height: '60px',
                                position: 'relative',
                                overflow: 'hidden',
                                backgroundSize: theme.backgroundPattern ? '32px 32px' : 'auto',
                                backgroundPosition: 'center'
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
                                    {/* Pixel art preview if available */}
                                    {theme.pixelArt && (
                                      <div
                                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                                        style={{
                                          width: '4px',
                                          height: '4px',
                                          ...theme.pixelArt as any
                                        }}
                                      />
                                    )}

                                    {/* Selection indicator */}
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
                        )}
                      </div>

                      {/* Fun Illustration Themes */}
                      <div>
                        <button
                          onClick={() => toggleCategory('illustration')}
                          className="flex items-center justify-between w-full text-left text-xs text-gray-400 font-semibold mb-2 hover:text-gray-300 transition-colors"
                        >
                          <span>{themeCategories.illustration.name}</span>
                          {expandedCategories.illustration ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                        </button>
                        {expandedCategories.illustration && (
                          <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto pr-1">
                            {themeCategories.illustration.themes.map((theme, localIndex) => {
                              const index = themeCategories.illustration.startIndex + localIndex;
                              const tileStyle: React.CSSProperties = {
                                background: theme.cardBackground || '#ffffff',
                                border: theme.cardBorder || '1px solid #e0e0e0',
                                borderRadius: theme.cardRadius || '8px',
                                boxShadow: theme.cardShadow || 'none',
                                height: '60px',
                                position: 'relative',
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
                                    {/* Decorative element preview */}
                                    {theme.decorativeElement && (
                                      <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl opacity-30">
                                        {theme.decorativeElement}
                                      </span>
                                    )}

                                    {/* Mini question area preview */}
                                    {theme.questionStyle && (
                                      <div
                                        className="absolute inset-2"
                                        style={{
                                          background: theme.questionStyle.background || 'transparent',
                                          border: theme.questionStyle.border || 'none',
                                          borderRadius: theme.questionStyle.borderRadius || '0',
                                          opacity: 0.7
                                        }}
                                      />
                                    )}

                                    {/* Selection indicator */}
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
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Theme preview */}
                  <div className="p-4 bg-gray-800 rounded-lg">
                    <Label className="text-sm mb-2 block">Aperçu du thème sélectionné</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {/* Auto theme tile preview */}
                      {selectedCardTheme === 'auto' && (
                        <div className="col-span-2">
                          <div className="h-24 rounded-lg bg-gradient-to-br from-purple-500 via-pink-500 to-yellow-500 flex items-center justify-center">
                            <span className="text-white text-2xl font-bold drop-shadow-lg">🎲 Mode Automatique</span>
                          </div>
                          <p className="text-xs text-gray-400 mt-2">Les thèmes varient automatiquement pour chaque carte</p>
                        </div>
                      )}

                      {/* Selected theme preview */}
                      {selectedCardTheme !== 'auto' && (
                        <div className="col-span-2">
                          {(() => {
                            const theme = allCardThemes[selectedCardTheme as number];
                            const tileStyle: React.CSSProperties = {
                              background: theme.cardBackground || '#ffffff',
                              border: theme.cardBorder || '1px solid #e0e0e0',
                              borderRadius: theme.cardRadius || '8px',
                              boxShadow: theme.cardShadow || 'none',
                              height: '100px',
                              padding: '12px',
                              position: 'relative',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            };

                            return (
                              <div>
                                <div style={tileStyle}>
                                  {/* Decorative elements */}
                                  {theme.decorations?.elements?.slice(0, 3).map((el, i) => (
                                    <span
                                      key={i}
                                      className="absolute text-2xl opacity-30"
                                      style={{
                                        [['top', 'bottom', 'top'][i]]: '10px',
                                        [['left', 'right', 'right'][i]]: '10px'
                                      }}
                                    >
                                      {el}
                                    </span>
                                  ))}

                                  {/* Question area preview */}
                                  {theme.questionStyle && (
                                    <div
                                      className="absolute inset-4"
                                      style={{
                                        background: theme.questionStyle.background || 'transparent',
                                        border: theme.questionStyle.border || 'none',
                                        borderRadius: theme.questionStyle.borderRadius || '0',
                                        opacity: 0.8
                                      }}
                                    ></div>
                                  )}

                                  <span className="text-lg font-bold z-10 relative">
                                    {theme.name}
                                  </span>
                                </div>
                                <p className="text-xs text-gray-400 mt-2">
                                  Thème: {theme.name}
                                </p>
                              </div>
                            );
                          })()}
                        </div>
                      )}
                    </div>
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

                  {isDraggableIllustrations && onResetIllustrationTransforms && (
                    <button
                      onClick={onResetIllustrationTransforms}
                      className="w-full px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded text-sm transition-colors"
                    >
                      Réinitialiser illustrations
                    </button>
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