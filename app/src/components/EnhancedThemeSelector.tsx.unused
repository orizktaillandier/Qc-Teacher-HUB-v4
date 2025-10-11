'use client';

import React, { useState, useEffect } from 'react';
import { enhancedThemes, themeAnimations, EnhancedTheme } from '@/lib/enhanced-themes';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Palette, Shuffle, Sparkles, Grid3x3, Brush, Trees, Rocket, Clock, Pencil, Minimize2 } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface EnhancedThemeSelectorProps {
  selectedTheme: string;
  onThemeChange: (theme: EnhancedTheme) => void;
  showSearch?: boolean;
}

const categoryIcons: Record<string, React.ReactNode> = {
  patterns: <Grid3x3 className="h-4 w-4" />,
  paper: <Pencil className="h-4 w-4" />,
  artistic: <Brush className="h-4 w-4" />,
  nature: <Trees className="h-4 w-4" />,
  space: <Rocket className="h-4 w-4" />,
  tech: <Sparkles className="h-4 w-4" />,
  retro: <Clock className="h-4 w-4" />,
  modern: <Minimize2 className="h-4 w-4" />,
  seasonal: <Trees className="h-4 w-4" />
};

export function EnhancedThemeSelector({ selectedTheme, onThemeChange, showSearch = true }: EnhancedThemeSelectorProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  // Inject animations CSS
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = themeAnimations;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const categories = Array.from(new Set(enhancedThemes.map(t => t.category)));

  const filteredThemes = enhancedThemes.filter(theme => {
    const matchesSearch = theme.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          theme.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'all' || theme.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleRandomTheme = () => {
    const themes = activeCategory === 'all' ? enhancedThemes : enhancedThemes.filter(t => t.category === activeCategory);
    const randomTheme = themes[Math.floor(Math.random() * themes.length)];
    onThemeChange(randomTheme);
  };

  const renderThemeCard = (theme: EnhancedTheme) => {
    const isSelected = theme.id === selectedTheme;

    // Apply the actual theme style to the preview card
    const getCardPreviewStyle = () => {
      const baseStyle: React.CSSProperties = {
        height: '120px',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'all 0.3s ease'
      };

      if (theme.style.type === 'pattern' || theme.style.type === 'geometric') {
        return {
          ...baseStyle,
          background: theme.style.background,
          backgroundSize: 'cover'
        };
      } else if (theme.style.type === 'animated') {
        return {
          ...baseStyle,
          background: theme.style.background,
          animation: theme.style.decorations?.animation
        };
      } else {
        return {
          ...baseStyle,
          background: theme.style.background
        };
      }
    };

    const getInnerCardStyle = (): React.CSSProperties => {
      const style = theme.style.cardStyle || '';
      // Parse CSS string to object (simplified)
      const cssObj: React.CSSProperties = {};

      if (style.includes('border-radius')) {
        const match = style.match(/border-radius:\s*([^;]+)/);
        if (match) cssObj.borderRadius = match[1];
      }
      if (style.includes('border:')) {
        const match = style.match(/border:\s*([^;]+)/);
        if (match) cssObj.border = match[1];
      }
      if (style.includes('transform')) {
        const match = style.match(/transform:\s*([^;]+)/);
        if (match) cssObj.transform = match[1];
      }
      if (style.includes('box-shadow')) {
        const match = style.match(/box-shadow:\s*([^;]+)/);
        if (match) cssObj.boxShadow = match[1];
      }

      return {
        ...cssObj,
        backgroundColor: theme.colors.cardBg,
        padding: '8px',
        margin: '10px',
        height: 'calc(100% - 20px)',
        position: 'relative'
      };
    };

    return (
      <Card
        key={theme.id}
        className={`
          overflow-hidden transition-all duration-300
          ${isSelected ? 'ring-2 ring-blue-500 shadow-lg scale-105' : 'hover:shadow-md hover:scale-102'}
        `}
        onClick={() => onThemeChange(theme)}
      >
        <div style={getCardPreviewStyle()}>
          {/* Mini card preview inside */}
          <div style={getInnerCardStyle()}>
            <p style={{
              color: theme.colors.text,
              fontSize: '10px',
              fontWeight: 'bold',
              marginBottom: '4px'
            }}>
              Carte #{Math.floor(Math.random() * 8) + 1}
            </p>
            <p style={{
              color: theme.colors.text,
              fontSize: '8px',
              opacity: 0.8
            }}>
              Question exemple...
            </p>

            {/* Theme decorations */}
            {theme.style.decorations?.pattern && (
              <div style={{
                position: 'absolute',
                bottom: '4px',
                right: '4px',
                fontSize: '16px',
                opacity: 0.5
              }}>
                {theme.style.decorations.pattern[0]}
              </div>
            )}
          </div>

          {/* Selected indicator */}
          {isSelected && (
            <div className="absolute top-2 right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-md">
              <span className="text-blue-500 font-bold text-sm">✓</span>
            </div>
          )}
        </div>

        <div className="p-3 bg-white">
          <div className="flex items-start justify-between mb-1">
            <h3 className="font-semibold text-sm text-gray-800">
              {theme.name}
            </h3>
            {categoryIcons[theme.category]}
          </div>

          <div className="flex items-center gap-1 mb-1">
            <span className="text-xs text-gray-500 capitalize">
              {theme.style.type}
            </span>
            <span className="text-xs text-gray-400">•</span>
            <span className="text-xs text-gray-500 capitalize">
              {theme.category}
            </span>
          </div>

          {/* Color palette preview */}
          <div className="flex gap-1 mt-2">
            <div
              className="w-5 h-5 rounded-full border border-gray-200"
              style={{ backgroundColor: theme.colors.primary }}
              title="Primaire"
            />
            <div
              className="w-5 h-5 rounded-full border border-gray-200"
              style={{ backgroundColor: theme.colors.secondary }}
              title="Secondaire"
            />
            <div
              className="w-5 h-5 rounded-full border border-gray-200"
              style={{ backgroundColor: theme.colors.accent }}
              title="Accent"
            />
            <div
              className="w-5 h-5 rounded-full border border-gray-200"
              style={{ backgroundColor: theme.colors.cardBg }}
              title="Fond carte"
            />
          </div>
        </div>
      </Card>
    );
  };

  return (
    <div className="w-full space-y-4">
      {/* Header with search and random button */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <Palette className="h-5 w-5 text-gray-600" />
          <h3 className="font-semibold text-lg">Thèmes Avancés</h3>
        </div>

        {showSearch && (
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Rechercher un thème..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-9"
            />
          </div>
        )}

        <Button
          onClick={handleRandomTheme}
          variant="outline"
          size="sm"
          className="gap-2"
        >
          <Shuffle className="h-4 w-4" />
          Aléatoire
        </Button>
      </div>

      {/* Category tabs */}
      <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
        <TabsList className="grid grid-cols-5 lg:grid-cols-10 w-full bg-gray-100">
          <TabsTrigger value="all" className="text-xs">
            Tous
          </TabsTrigger>
          {categories.map(category => (
            <TabsTrigger
              key={category}
              value={category}
              className="text-xs gap-1"
              title={category}
            >
              {categoryIcons[category]}
              <span className="hidden lg:inline capitalize">{category}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={activeCategory} className="mt-4">
          <ScrollArea className="h-[500px] w-full pr-4">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {filteredThemes.map(renderThemeCard)}
            </div>

            {filteredThemes.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                <p>Aucun thème trouvé</p>
                <p className="text-sm mt-2">Essayez une autre recherche ou catégorie</p>
              </div>
            )}
          </ScrollArea>
        </TabsContent>
      </Tabs>

      {/* Current selection info */}
      <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-500">Thème sélectionné:</p>
            <p className="font-semibold text-sm">
              {enhancedThemes.find(t => t.id === selectedTheme)?.name || 'Aucun'}
            </p>
          </div>
          <div className="text-xs text-gray-500">
            {filteredThemes.length} thèmes disponibles
          </div>
        </div>
      </div>
    </div>
  );
}