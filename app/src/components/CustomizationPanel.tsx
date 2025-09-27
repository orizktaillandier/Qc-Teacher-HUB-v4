'use client';

import React, { useState } from 'react';
import {
  ChevronLeft, ChevronRight, ChevronDown, Palette, Type, Layout, Sparkles,
  Image, Move, Sun, Moon, Download, Upload, RotateCcw, Save,
  Eye, EyeOff, Sliders, Grid3x3, AlignLeft, AlignCenter,
  AlignRight, Bold, Italic, Underline, Strikethrough, Highlighter,
  Minus, Plus, Layers, Zap, Heart, Star, Settings2, Brush,
  PaintBucket, Droplets, Filter, Copy, Clipboard
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { EnhancedThemeSelector } from './EnhancedThemeSelector';
import { enhancedThemes, EnhancedTheme } from '@/lib/enhanced-themes';

interface CustomizationPanelProps {
  isOpen: boolean;
  onToggle: () => void;
  settings: any;
  onSettingsChange: (settings: any) => void;
  selectedTheme: EnhancedTheme;
  onThemeChange: (theme: EnhancedTheme) => void;
  selectedPageType?: 'all' | 'studentCards' | 'studentAnswers' | 'teacherAnswers';
  onPageTypeChange?: (pageType: 'all' | 'studentCards' | 'studentAnswers' | 'teacherAnswers') => void;
}

const fontFamilies = [
  { value: 'default', label: 'Défaut (System)' },
  { value: 'arial', label: 'Arial' },
  { value: 'times', label: 'Times New Roman' },
  { value: 'georgia', label: 'Georgia' },
  { value: 'comic-sans', label: 'Comic Sans MS' },
  { value: 'courier', label: 'Courier New' },
  { value: 'verdana', label: 'Verdana' },
  { value: 'trebuchet', label: 'Trebuchet MS' },
  { value: 'lucida', label: 'Lucida Console' },
  { value: 'impact', label: 'Impact' },
  { value: 'palatino', label: 'Palatino' },
  { value: 'garamond', label: 'Garamond' },
  { value: 'bookman', label: 'Bookman' },
  { value: 'avant-garde', label: 'Avant Garde' }
];

const colorPresets = [
  { name: 'Québec Bleu', colors: ['#0066CC', '#004499', '#002266'] },
  { name: 'Automne', colors: ['#D2691E', '#FF8C00', '#8B4513'] },
  { name: 'Printemps', colors: ['#98FB98', '#90EE90', '#228B22'] },
  { name: 'Hiver', colors: ['#B0E0E6', '#87CEEB', '#4682B4'] },
  { name: 'Arc-en-ciel', colors: ['#FF0000', '#FFA500', '#FFFF00', '#00FF00', '#0000FF', '#4B0082', '#9400D3'] },
  { name: 'Pastel', colors: ['#FFB3BA', '#FFDFBA', '#FFFFBA', '#BAFFC9', '#BAE1FF'] },
  { name: 'Néon', colors: ['#FF10F0', '#00FFF0', '#F0FF00', '#10FF00', '#FF0080'] },
  { name: 'Terre', colors: ['#8B4513', '#A0522D', '#DEB887', '#D2691E', '#CD853F'] }
];

export function CustomizationPanel({
  isOpen,
  onToggle,
  settings,
  onSettingsChange,
  selectedTheme,
  onThemeChange,
  selectedPageType = 'all',
  onPageTypeChange
}: CustomizationPanelProps) {
  const [activeTab, setActiveTab] = useState('typography');
  const [copiedSettings, setCopiedSettings] = useState(false);

  const handleSettingChange = (category: string, key: string, value: any) => {
    onSettingsChange({
      ...settings,
      [category]: {
        ...settings[category],
        [key]: value
      }
    });
  };

  const exportSettings = () => {
    const dataStr = JSON.stringify({ settings, theme: selectedTheme.id }, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = `card-settings-${Date.now()}.json`;

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const importSettings = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const imported = JSON.parse(e.target?.result as string);
          if (imported.settings) {
            onSettingsChange(imported.settings);
          }
          if (imported.theme) {
            const theme = enhancedThemes.find(t => t.id === imported.theme);
            if (theme) onThemeChange(theme);
          }
        } catch (error) {
          console.error('Failed to import settings:', error);
        }
      };
      reader.readAsText(file);
    }
  };

  const copySettingsToClipboard = () => {
    const settingsCode = JSON.stringify({ settings, theme: selectedTheme.id });
    navigator.clipboard.writeText(settingsCode);
    setCopiedSettings(true);
    setTimeout(() => setCopiedSettings(false), 2000);
  };

  const resetSettings = () => {
    onSettingsChange({
      typography: {
        titleSize: 24,
        questionSize: 16,
        answerSize: 14,
        fontFamily: 'default',
        fontWeight: 'normal',
        textTransform: 'none',
        letterSpacing: 0,
        lineHeight: 1.5,
        textDecoration: 'none',
        textShadow: false,
        fontStyle: 'normal'
      },
      layout: {
        cardsPerRow: 2,
        cardSpacing: 20,
        pageMargins: 40,
        cardAlignment: 'center',
        cardOrder: 'default',
        cardRotation: 0,
        perspective: 0
      },
      visual: {
        borderRadius: 12,
        borderWidth: 2,
        borderStyle: 'solid',
        shadowIntensity: 10,
        shadowColor: '#000000',
        glowEffect: false,
        glowColor: '#3b82f6',
        backgroundOpacity: 100,
        blur: 0,
        contrast: 100,
        brightness: 100,
        saturation: 100,
        hueRotate: 0,
        gradientAngle: 45
      },
      animation: {
        enableAnimations: true,
        animationSpeed: 1,
        hoverEffect: 'lift',
        transitionDuration: 300,
        pulseEffect: false,
        bounceEffect: false,
        shakeEffect: false
      },
      advanced: {
        customCSS: '',
        enableGrid: true,
        gridColor: '#e5e5e5',
        snapToGrid: false,
        showRulers: false,
        enableGuides: false
      }
    });
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={onToggle}
        className="fixed right-0 top-1/2 -translate-y-1/2 z-50 bg-blue-600 hover:bg-blue-700 text-white px-3 py-6 rounded-l-lg shadow-lg transition-all duration-200 hover:px-4 flex flex-col items-center gap-2"
      >
        {isOpen ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
        <Settings2 className="h-5 w-5" />
        <span className="text-xs font-semibold" style={{ writingMode: 'vertical-rl' }}>Personnaliser</span>
      </button>

      {/* Customization Panel */}
      <div className={`fixed right-0 top-0 h-screen bg-gray-900 shadow-2xl transition-all duration-300 z-40 border-l border-gray-700 ${
        isOpen ? 'w-96' : 'w-0 overflow-hidden'
      }`}>
        <div className="h-full flex flex-col bg-gray-900">
          {/* Header */}
          <div className="p-4 border-b border-gray-700 bg-gradient-to-r from-gray-800 to-gray-900">
            {/* Page Selector */}
            <div className="mb-3">
              <Label className="text-xs text-gray-400 mb-2 block">Éditer les pages</Label>
              <Select value={selectedPageType} onValueChange={onPageTypeChange as any}>
                <SelectTrigger className="w-full bg-gray-800 border-gray-600 text-gray-200">
                  <SelectValue placeholder="Sélectionner les pages à éditer" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-600">
                  <SelectItem value="all" className="text-gray-200">
                    <div className="flex items-center gap-2">
                      <Layers className="h-4 w-4" />
                      Toutes les pages
                    </div>
                  </SelectItem>
                  <SelectItem value="studentCards" className="text-gray-200">
                    <div className="flex items-center gap-2">
                      <Grid3x3 className="h-4 w-4" />
                      Cartes élèves (avec questions)
                    </div>
                  </SelectItem>
                  <SelectItem value="studentAnswers" className="text-gray-200">
                    <div className="flex items-center gap-2">
                      <AlignLeft className="h-4 w-4" />
                      Feuilles réponses élèves
                    </div>
                  </SelectItem>
                  <SelectItem value="teacherAnswers" className="text-gray-200">
                    <div className="flex items-center gap-2">
                      <Eye className="h-4 w-4" />
                      Corrigé enseignant
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Sliders className="h-5 w-5 text-gray-300" />
                {selectedPageType === 'all' ? 'Toutes les pages' :
                 selectedPageType === 'studentCards' ? 'Cartes élèves' :
                 selectedPageType === 'studentAnswers' ? 'Réponses élèves' :
                 'Corrigé enseignant'}
              </h2>
              <div className="flex gap-1">
                <Button size="icon" variant="ghost" onClick={exportSettings} title="Exporter">
                  <Download className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="ghost" onClick={() => document.getElementById('import-settings')?.click()} title="Importer">
                  <Upload className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="ghost" onClick={copySettingsToClipboard} title="Copier">
                  {copiedSettings ? <Clipboard className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                </Button>
                <Button size="icon" variant="ghost" onClick={resetSettings} title="Réinitialiser">
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <input
              id="import-settings"
              type="file"
              accept=".json"
              onChange={importSettings}
              className="hidden"
            />
          </div>

          {/* Content */}
          <ScrollArea className="flex-1 bg-gray-900">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="w-full grid grid-cols-5 p-1 m-2 bg-gray-800 h-auto">
                <TabsTrigger value="typography" className="flex flex-col items-center justify-center gap-0.5 py-1.5 px-1 h-full">
                  <Type className="h-5 w-5 text-gray-400" />
                  <span className="text-[10px] text-gray-400 leading-tight">Texte</span>
                </TabsTrigger>
                <TabsTrigger value="layout" className="flex flex-col items-center justify-center gap-0.5 py-1.5 px-1 h-full">
                  <Layout className="h-5 w-5 text-gray-400" />
                  <span className="text-[10px] text-gray-400 leading-tight">Mise</span>
                </TabsTrigger>
                <TabsTrigger value="visual" className="flex flex-col items-center justify-center gap-0.5 py-1.5 px-1 h-full">
                  <Sparkles className="h-5 w-5 text-gray-400" />
                  <span className="text-[10px] text-gray-400 leading-tight">Visuel</span>
                </TabsTrigger>
                <TabsTrigger value="animation" className="flex flex-col items-center justify-center gap-0.5 py-1.5 px-1 h-full">
                  <Zap className="h-5 w-5 text-gray-400" />
                  <span className="text-[10px] text-gray-400 leading-tight">Anim</span>
                </TabsTrigger>
                <TabsTrigger value="theme" className="flex flex-col items-center justify-center gap-0.5 py-1.5 px-1 h-full">
                  <Palette className="h-5 w-5 text-gray-400" />
                  <span className="text-[10px] text-gray-400 leading-tight">Thème</span>
                </TabsTrigger>
              </TabsList>

              {/* Typography Tab */}
              <TabsContent value="typography" className="p-4 space-y-4">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="font-size" className="border-gray-700">
                    <AccordionTrigger className="text-gray-200 hover:text-white">Taille de Police</AccordionTrigger>
                    <AccordionContent className="space-y-4">
                      <div>
                        <Label className="text-xs text-gray-400">Titre ({settings?.typography?.titleSize || 24}px)</Label>
                        <Slider
                          value={[settings?.typography?.titleSize || 24]}
                          onValueChange={([v]) => handleSettingChange('typography', 'titleSize', v)}
                          max={48}
                          min={12}
                          step={1}
                        />
                      </div>
                      <div>
                        <Label className="text-xs text-gray-400">Question ({settings?.typography?.questionSize || 16}px)</Label>
                        <Slider
                          value={[settings?.typography?.questionSize || 16]}
                          onValueChange={([v]) => handleSettingChange('typography', 'questionSize', v)}
                          max={32}
                          min={10}
                          step={1}
                        />
                      </div>
                      <div>
                        <Label className="text-xs text-gray-400">Réponse ({settings?.typography?.answerSize || 14}px)</Label>
                        <Slider
                          value={[settings?.typography?.answerSize || 14]}
                          onValueChange={([v]) => handleSettingChange('typography', 'answerSize', v)}
                          max={24}
                          min={8}
                          step={1}
                        />
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="font-family" className="border-gray-700">
                    <AccordionTrigger className="text-gray-200 hover:text-white">Police</AccordionTrigger>
                    <AccordionContent>
                      <Select
                        value={settings?.typography?.fontFamily || 'default'}
                        onValueChange={(v) => handleSettingChange('typography', 'fontFamily', v)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {fontFamilies.map(font => (
                            <SelectItem key={font.value} value={font.value}>
                              {font.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="text-style" className="border-gray-700">
                    <AccordionTrigger className="text-gray-200 hover:text-white">Style de Texte</AccordionTrigger>
                    <AccordionContent className="space-y-3">
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant={settings?.typography?.fontWeight === 'bold' ? 'default' : 'outline'}
                          onClick={() => handleSettingChange('typography', 'fontWeight',
                            settings?.typography?.fontWeight === 'bold' ? 'normal' : 'bold')}
                        >
                          <Bold className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant={settings?.typography?.fontStyle === 'italic' ? 'default' : 'outline'}
                          onClick={() => handleSettingChange('typography', 'fontStyle',
                            settings?.typography?.fontStyle === 'italic' ? 'normal' : 'italic')}
                        >
                          <Italic className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant={settings?.typography?.textDecoration === 'underline' ? 'default' : 'outline'}
                          onClick={() => handleSettingChange('typography', 'textDecoration',
                            settings?.typography?.textDecoration === 'underline' ? 'none' : 'underline')}
                        >
                          <Underline className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant={settings?.typography?.textDecoration === 'line-through' ? 'default' : 'outline'}
                          onClick={() => handleSettingChange('typography', 'textDecoration',
                            settings?.typography?.textDecoration === 'line-through' ? 'none' : 'line-through')}
                        >
                          <Strikethrough className="h-4 w-4" />
                        </Button>
                      </div>

                      <div>
                        <Label className="text-xs text-gray-400">Transformation</Label>
                        <Select
                          value={settings?.typography?.textTransform || 'none'}
                          onValueChange={(v) => handleSettingChange('typography', 'textTransform', v)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="none">Normal</SelectItem>
                            <SelectItem value="uppercase">MAJUSCULES</SelectItem>
                            <SelectItem value="lowercase">minuscules</SelectItem>
                            <SelectItem value="capitalize">Première Lettre</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label className="text-xs text-gray-400">Espacement des lettres ({settings?.typography?.letterSpacing || 0}px)</Label>
                        <Slider
                          value={[settings?.typography?.letterSpacing || 0]}
                          onValueChange={([v]) => handleSettingChange('typography', 'letterSpacing', v)}
                          max={10}
                          min={-2}
                          step={0.5}
                        />
                      </div>

                      <div>
                        <Label className="text-xs text-gray-400">Hauteur de ligne ({settings?.typography?.lineHeight || 1.5})</Label>
                        <Slider
                          value={[settings?.typography?.lineHeight || 1.5]}
                          onValueChange={([v]) => handleSettingChange('typography', 'lineHeight', v)}
                          max={3}
                          min={1}
                          step={0.1}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <Label className="text-xs text-gray-400">Ombre du texte</Label>
                        <Switch
                          checked={settings?.typography?.textShadow || false}
                          onCheckedChange={(v) => handleSettingChange('typography', 'textShadow', v)}
                        />
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </TabsContent>

              {/* Layout Tab */}
              <TabsContent value="layout" className="p-4 space-y-4">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="grid" className="border-gray-700">
                    <AccordionTrigger className="text-gray-200 hover:text-white">Grille & Disposition</AccordionTrigger>
                    <AccordionContent className="space-y-4">
                      <div>
                        <Label className="text-xs text-gray-400">Cartes par ligne ({settings?.layout?.cardsPerRow || 2})</Label>
                        <Slider
                          value={[settings?.layout?.cardsPerRow || 2]}
                          onValueChange={([v]) => handleSettingChange('layout', 'cardsPerRow', v)}
                          max={4}
                          min={1}
                          step={1}
                        />
                      </div>

                      <div>
                        <Label className="text-xs text-gray-400">Espacement ({settings?.layout?.cardSpacing || 20}px)</Label>
                        <Slider
                          value={[settings?.layout?.cardSpacing || 20]}
                          onValueChange={([v]) => handleSettingChange('layout', 'cardSpacing', v)}
                          max={100}
                          min={0}
                          step={5}
                        />
                      </div>

                      <div>
                        <Label className="text-xs text-gray-400">Marges de page ({settings?.layout?.pageMargins || 40}px)</Label>
                        <Slider
                          value={[settings?.layout?.pageMargins || 40]}
                          onValueChange={([v]) => handleSettingChange('layout', 'pageMargins', v)}
                          max={100}
                          min={0}
                          step={5}
                        />
                      </div>

                      <div>
                        <Label className="text-xs text-gray-400">Alignement</Label>
                        <div className="flex gap-2 mt-2">
                          <Button
                            size="sm"
                            variant={settings?.layout?.cardAlignment === 'left' ? 'default' : 'outline'}
                            onClick={() => handleSettingChange('layout', 'cardAlignment', 'left')}
                          >
                            <AlignLeft className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant={settings?.layout?.cardAlignment === 'center' ? 'default' : 'outline'}
                            onClick={() => handleSettingChange('layout', 'cardAlignment', 'center')}
                          >
                            <AlignCenter className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant={settings?.layout?.cardAlignment === 'right' ? 'default' : 'outline'}
                            onClick={() => handleSettingChange('layout', 'cardAlignment', 'right')}
                          >
                            <AlignRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="transform" className="border-gray-700">
                    <AccordionTrigger className="text-gray-200 hover:text-white">Transformation 3D</AccordionTrigger>
                    <AccordionContent className="space-y-4">
                      <div>
                        <Label className="text-xs text-gray-400">Rotation ({settings?.layout?.cardRotation || 0}°)</Label>
                        <Slider
                          value={[settings?.layout?.cardRotation || 0]}
                          onValueChange={([v]) => handleSettingChange('layout', 'cardRotation', v)}
                          max={15}
                          min={-15}
                          step={1}
                        />
                      </div>

                      <div>
                        <Label className="text-xs text-gray-400">Perspective ({settings?.layout?.perspective || 0}px)</Label>
                        <Slider
                          value={[settings?.layout?.perspective || 0]}
                          onValueChange={([v]) => handleSettingChange('layout', 'perspective', v)}
                          max={2000}
                          min={0}
                          step={100}
                        />
                      </div>

                      <div>
                        <Label className="text-xs text-gray-400">Ordre des cartes</Label>
                        <Select
                          value={settings?.layout?.cardOrder || 'default'}
                          onValueChange={(v) => handleSettingChange('layout', 'cardOrder', v)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="default">Par défaut</SelectItem>
                            <SelectItem value="zigzag">Zigzag</SelectItem>
                            <SelectItem value="spiral">Spirale</SelectItem>
                            <SelectItem value="random">Aléatoire</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </TabsContent>

              {/* Visual Tab */}
              <TabsContent value="visual" className="p-4 space-y-4">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="borders" className="border-gray-700">
                    <AccordionTrigger className="text-gray-200 hover:text-white">Bordures</AccordionTrigger>
                    <AccordionContent className="space-y-4">
                      <div>
                        <Label className="text-xs text-gray-400">Rayon ({settings?.visual?.borderRadius || 12}px)</Label>
                        <Slider
                          value={[settings?.visual?.borderRadius || 12]}
                          onValueChange={([v]) => handleSettingChange('visual', 'borderRadius', v)}
                          max={50}
                          min={0}
                          step={1}
                        />
                      </div>

                      <div>
                        <Label className="text-xs text-gray-400">Épaisseur ({settings?.visual?.borderWidth || 2}px)</Label>
                        <Slider
                          value={[settings?.visual?.borderWidth || 2]}
                          onValueChange={([v]) => handleSettingChange('visual', 'borderWidth', v)}
                          max={10}
                          min={0}
                          step={1}
                        />
                      </div>

                      <div>
                        <Label className="text-xs text-gray-400">Style</Label>
                        <Select
                          value={settings?.visual?.borderStyle || 'solid'}
                          onValueChange={(v) => handleSettingChange('visual', 'borderStyle', v)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="solid">Solide</SelectItem>
                            <SelectItem value="dashed">Tirets</SelectItem>
                            <SelectItem value="dotted">Pointillés</SelectItem>
                            <SelectItem value="double">Double</SelectItem>
                            <SelectItem value="groove">Groove</SelectItem>
                            <SelectItem value="ridge">Ridge</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="shadows" className="border-gray-700">
                    <AccordionTrigger className="text-gray-200 hover:text-white">Ombres & Effets</AccordionTrigger>
                    <AccordionContent className="space-y-4">
                      <div>
                        <Label className="text-xs text-gray-400">Intensité de l'ombre ({settings?.visual?.shadowIntensity || 10}%)</Label>
                        <Slider
                          value={[settings?.visual?.shadowIntensity || 10]}
                          onValueChange={([v]) => handleSettingChange('visual', 'shadowIntensity', v)}
                          max={100}
                          min={0}
                          step={5}
                        />
                      </div>

                      <div>
                        <Label className="text-xs text-gray-400">Couleur de l'ombre</Label>
                        <Input
                          type="color"
                          value={settings?.visual?.shadowColor || '#000000'}
                          onChange={(e) => handleSettingChange('visual', 'shadowColor', e.target.value)}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <Label className="text-xs text-gray-400">Effet de lueur</Label>
                        <Switch
                          checked={settings?.visual?.glowEffect || false}
                          onCheckedChange={(v) => handleSettingChange('visual', 'glowEffect', v)}
                        />
                      </div>

                      {settings?.visual?.glowEffect && (
                        <div>
                          <Label className="text-xs text-gray-400">Couleur de lueur</Label>
                          <Input
                            type="color"
                            value={settings?.visual?.glowColor || '#3b82f6'}
                            onChange={(e) => handleSettingChange('visual', 'glowColor', e.target.value)}
                          />
                        </div>
                      )}
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="filters" className="border-gray-700">
                    <AccordionTrigger className="text-gray-200 hover:text-white">Filtres</AccordionTrigger>
                    <AccordionContent className="space-y-4">
                      <div>
                        <Label className="text-xs text-gray-400">Opacité ({settings?.visual?.backgroundOpacity || 100}%)</Label>
                        <Slider
                          value={[settings?.visual?.backgroundOpacity || 100]}
                          onValueChange={([v]) => handleSettingChange('visual', 'backgroundOpacity', v)}
                          max={100}
                          min={0}
                          step={5}
                        />
                      </div>

                      <div>
                        <Label className="text-xs text-gray-400">Flou ({settings?.visual?.blur || 0}px)</Label>
                        <Slider
                          value={[settings?.visual?.blur || 0]}
                          onValueChange={([v]) => handleSettingChange('visual', 'blur', v)}
                          max={20}
                          min={0}
                          step={1}
                        />
                      </div>

                      <div>
                        <Label className="text-xs text-gray-400">Contraste ({settings?.visual?.contrast || 100}%)</Label>
                        <Slider
                          value={[settings?.visual?.contrast || 100]}
                          onValueChange={([v]) => handleSettingChange('visual', 'contrast', v)}
                          max={200}
                          min={50}
                          step={5}
                        />
                      </div>

                      <div>
                        <Label className="text-xs text-gray-400">Luminosité ({settings?.visual?.brightness || 100}%)</Label>
                        <Slider
                          value={[settings?.visual?.brightness || 100]}
                          onValueChange={([v]) => handleSettingChange('visual', 'brightness', v)}
                          max={200}
                          min={50}
                          step={5}
                        />
                      </div>

                      <div>
                        <Label className="text-xs text-gray-400">Saturation ({settings?.visual?.saturation || 100}%)</Label>
                        <Slider
                          value={[settings?.visual?.saturation || 100]}
                          onValueChange={([v]) => handleSettingChange('visual', 'saturation', v)}
                          max={200}
                          min={0}
                          step={5}
                        />
                      </div>

                      <div>
                        <Label className="text-xs text-gray-400">Rotation de teinte ({settings?.visual?.hueRotate || 0}°)</Label>
                        <Slider
                          value={[settings?.visual?.hueRotate || 0]}
                          onValueChange={([v]) => handleSettingChange('visual', 'hueRotate', v)}
                          max={360}
                          min={0}
                          step={10}
                        />
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="colors" className="border-gray-700">
                    <AccordionTrigger className="text-gray-200 hover:text-white">Palettes de Couleurs</AccordionTrigger>
                    <AccordionContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-2">
                        {colorPresets.map((preset) => (
                          <Card
                            key={preset.name}
                            className="p-2 cursor-pointer hover:shadow-md transition-shadow"
                            onClick={() => {
                              // Apply color preset
                              handleSettingChange('visual', 'colorPreset', preset.name);
                            }}
                          >
                            <p className="text-xs font-semibold mb-1">{preset.name}</p>
                            <div className="flex gap-1">
                              {preset.colors.map((color, i) => (
                                <div
                                  key={i}
                                  className="w-4 h-4 rounded"
                                  style={{ backgroundColor: color }}
                                />
                              ))}
                            </div>
                          </Card>
                        ))}
                      </div>

                      <div>
                        <Label className="text-xs text-gray-400">Angle du dégradé ({settings?.visual?.gradientAngle || 45}°)</Label>
                        <Slider
                          value={[settings?.visual?.gradientAngle || 45]}
                          onValueChange={([v]) => handleSettingChange('visual', 'gradientAngle', v)}
                          max={360}
                          min={0}
                          step={15}
                        />
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </TabsContent>

              {/* Animation Tab */}
              <TabsContent value="animation" className="p-4 space-y-4">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="general" className="border-gray-700">
                    <AccordionTrigger className="text-gray-200 hover:text-white">Animations Générales</AccordionTrigger>
                    <AccordionContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label className="text-xs text-gray-400">Activer les animations</Label>
                        <Switch
                          checked={settings?.animation?.enableAnimations || true}
                          onCheckedChange={(v) => handleSettingChange('animation', 'enableAnimations', v)}
                        />
                      </div>

                      <div>
                        <Label className="text-xs text-gray-400">Vitesse ({settings?.animation?.animationSpeed || 1}x)</Label>
                        <Slider
                          value={[settings?.animation?.animationSpeed || 1]}
                          onValueChange={([v]) => handleSettingChange('animation', 'animationSpeed', v)}
                          max={3}
                          min={0.25}
                          step={0.25}
                        />
                      </div>

                      <div>
                        <Label className="text-xs text-gray-400">Durée de transition ({settings?.animation?.transitionDuration || 300}ms)</Label>
                        <Slider
                          value={[settings?.animation?.transitionDuration || 300]}
                          onValueChange={([v]) => handleSettingChange('animation', 'transitionDuration', v)}
                          max={2000}
                          min={0}
                          step={100}
                        />
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="hover" className="border-gray-700">
                    <AccordionTrigger className="text-gray-200 hover:text-white">Effets au Survol</AccordionTrigger>
                    <AccordionContent className="space-y-4">
                      <div>
                        <Label className="text-xs text-gray-400">Type d'effet</Label>
                        <Select
                          value={settings?.animation?.hoverEffect || 'lift'}
                          onValueChange={(v) => handleSettingChange('animation', 'hoverEffect', v)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="none">Aucun</SelectItem>
                            <SelectItem value="lift">Soulèvement</SelectItem>
                            <SelectItem value="grow">Agrandissement</SelectItem>
                            <SelectItem value="shrink">Rétrécissement</SelectItem>
                            <SelectItem value="rotate">Rotation</SelectItem>
                            <SelectItem value="flip">Retournement</SelectItem>
                            <SelectItem value="glow">Lueur</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="special" className="border-gray-700">
                    <AccordionTrigger className="text-gray-200 hover:text-white">Effets Spéciaux</AccordionTrigger>
                    <AccordionContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label className="text-xs text-gray-400">Pulsation</Label>
                        <Switch
                          checked={settings?.animation?.pulseEffect || false}
                          onCheckedChange={(v) => handleSettingChange('animation', 'pulseEffect', v)}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <Label className="text-xs text-gray-400">Rebond</Label>
                        <Switch
                          checked={settings?.animation?.bounceEffect || false}
                          onCheckedChange={(v) => handleSettingChange('animation', 'bounceEffect', v)}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <Label className="text-xs text-gray-400">Tremblement</Label>
                        <Switch
                          checked={settings?.animation?.shakeEffect || false}
                          onCheckedChange={(v) => handleSettingChange('animation', 'shakeEffect', v)}
                        />
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </TabsContent>

              {/* Theme Tab */}
              <TabsContent value="theme" className="p-4">
                <EnhancedThemeSelector
                  selectedTheme={selectedTheme.id}
                  onThemeChange={onThemeChange}
                  showSearch={false}
                />
              </TabsContent>
            </Tabs>
          </ScrollArea>

          {/* Footer */}
          <div className="p-4 border-t border-gray-700 bg-gray-800">
            <div className="flex items-center justify-between">
              <Badge variant="secondary" className="text-xs">
                {Object.keys(settings || {}).reduce((acc, cat) =>
                  acc + Object.keys(settings[cat] || {}).length, 0)} paramètres actifs
              </Badge>
              <Button
                size="sm"
                variant="outline"
                onClick={onToggle}
              >
                Fermer
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}