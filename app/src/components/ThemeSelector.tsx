import React, { useState } from 'react';
import { CardTheme, cardThemes, themeCategories, getThemesByCategory } from '@/lib/card-themes';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Palette, Shuffle } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface ThemeSelectorProps {
  selectedTheme: string;
  onThemeChange: (themeId: string) => void;
  showSearch?: boolean;
}

export function ThemeSelector({ selectedTheme, onThemeChange, showSearch = true }: ThemeSelectorProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredThemes = cardThemes.filter(theme => {
    const matchesSearch = theme.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          theme.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'all' || theme.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleRandomTheme = () => {
    const themes = activeCategory === 'all' ? cardThemes : getThemesByCategory(activeCategory);
    const randomTheme = themes[Math.floor(Math.random() * themes.length)];
    onThemeChange(randomTheme.id);
  };

  const renderThemeCard = (theme: CardTheme) => {
    const isSelected = theme.id === selectedTheme;

    return (
      <Card
        key={theme.id}
        className={`
          cursor-pointer transition-all duration-200 overflow-hidden
          ${isSelected ? 'ring-2 ring-blue-500 shadow-lg scale-105' : 'hover:shadow-md hover:scale-102'}
        `}
        onClick={() => onThemeChange(theme.id)}
      >
        <div
          className="h-20 relative"
          style={{ background: theme.colors.gradient }}
        >
          {/* Decorative elements */}
          {theme.decorations?.emoji && (
            <div className="absolute inset-0 flex items-center justify-center opacity-30 text-3xl">
              {theme.decorations.emoji[0]}
            </div>
          )}

          {/* Selected indicator */}
          {isSelected && (
            <div className="absolute top-2 right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center">
              <span className="text-blue-500 font-bold text-sm">✓</span>
            </div>
          )}
        </div>

        <div className="p-3 bg-white">
          <div className="flex items-start justify-between mb-1">
            <h3 className="font-semibold text-sm" style={{ color: theme.colors.text }}>
              {theme.name}
            </h3>
            {theme.decorations?.emoji && (
              <span className="text-lg">{theme.decorations.emoji[0]}</span>
            )}
          </div>
          <p className="text-xs text-gray-600 line-clamp-2">
            {theme.description}
          </p>

          {/* Color palette preview */}
          <div className="flex gap-1 mt-2">
            <div
              className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
              style={{ backgroundColor: theme.colors.primary }}
              title="Primaire"
            />
            <div
              className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
              style={{ backgroundColor: theme.colors.secondary }}
              title="Secondaire"
            />
            <div
              className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
              style={{ backgroundColor: theme.colors.accent }}
              title="Accent"
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
          <h3 className="font-semibold text-lg">Thèmes des Cartes</h3>
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
        <TabsList className="grid grid-cols-4 lg:grid-cols-8 w-full bg-gray-100">
          <TabsTrigger value="all" className="text-xs">
            Tous
          </TabsTrigger>
          {themeCategories.map(category => (
            <TabsTrigger
              key={category.id}
              value={category.id}
              className="text-xs"
              title={category.name}
            >
              <span className="hidden sm:inline">{category.name}</span>
              <span className="sm:hidden">{category.icon}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={activeCategory} className="mt-4">
          <ScrollArea className="h-[400px] w-full pr-4">
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
              {cardThemes.find(t => t.id === selectedTheme)?.name || 'Aucun'}
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