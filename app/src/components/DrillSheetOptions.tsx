'use client';

import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import type {
  DifficultyStrategy,
  DrillSheetTheme,
  DefaultExerciseCounts
} from '@/lib/drill-sheet-types';
import { ExerciseCountRanges } from '@/lib/drill-sheet-types';

interface DrillSheetOptionsProps {
  // Current values
  exerciseCount: number;
  difficulty: DifficultyStrategy;
  includeAnswerKey: boolean;
  theme: DrillSheetTheme;
  fontFamily: string;
  fontSize: number;
  customTitle: string;
  customInstructions: string;
  showDifficulty: boolean;

  // Subject for determining exercise count range
  selectedSubject: string | null;

  // Callbacks
  onExerciseCountChange: (count: number) => void;
  onDifficultyChange: (difficulty: DifficultyStrategy) => void;
  onIncludeAnswerKeyChange: (include: boolean) => void;
  onThemeChange: (theme: DrillSheetTheme) => void;
  onFontFamilyChange: (font: string) => void;
  onFontSizeChange: (size: number) => void;
  onCustomTitleChange: (title: string) => void;
  onCustomInstructionsChange: (instructions: string) => void;
  onShowDifficultyChange: (show: boolean) => void;
}

export default function DrillSheetOptions({
  exerciseCount,
  difficulty,
  includeAnswerKey,
  theme,
  fontFamily,
  fontSize,
  customTitle,
  customInstructions,
  showDifficulty,
  selectedSubject,
  onExerciseCountChange,
  onDifficultyChange,
  onIncludeAnswerKeyChange,
  onThemeChange,
  onFontFamilyChange,
  onFontSizeChange,
  onCustomTitleChange,
  onCustomInstructionsChange,
  onShowDifficultyChange
}: DrillSheetOptionsProps) {
  // Get exercise count range based on subject
  const getExerciseCountRange = () => {
    const ranges: typeof ExerciseCountRanges = {
      'mathematiques': { min: 10, max: 30 },
      'francais-langue-enseignement': { min: 10, max: 25 },
      'science-et-technologie': { min: 8, max: 20 },
      'univers-social': { min: 8, max: 20 }
    };

    if (selectedSubject && ranges[selectedSubject as keyof typeof ranges]) {
      return ranges[selectedSubject as keyof typeof ranges];
    }

    return { min: 8, max: 30 }; // Default range
  };

  const range = getExerciseCountRange();

  return (
    <div className="space-y-6">
      {/* Basic Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Paramètres de base</CardTitle>
          <CardDescription>
            Configurez le nombre d'exercices et le niveau de difficulté
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Exercise Count */}
          <div className="space-y-2">
            <Label htmlFor="exerciseCount">
              Nombre d'exercices: <strong>{exerciseCount}</strong>
            </Label>
            <div className="flex items-center gap-4">
              <Input
                id="exerciseCount"
                type="range"
                min={range.min}
                max={range.max}
                value={exerciseCount}
                onChange={(e) => onExerciseCountChange(parseInt(e.target.value))}
                className="flex-1"
              />
              <Input
                type="number"
                min={range.min}
                max={range.max}
                value={exerciseCount}
                onChange={(e) => onExerciseCountChange(parseInt(e.target.value))}
                className="w-20"
              />
            </div>
            <p className="text-xs text-gray-500">
              Plage recommandée: {range.min}-{range.max} exercices
            </p>
          </div>

          {/* Difficulty Strategy */}
          <div className="space-y-2">
            <Label htmlFor="difficulty">Stratégie de difficulté</Label>
            <Select value={difficulty} onValueChange={(value) => onDifficultyChange(value as DifficultyStrategy)}>
              <SelectTrigger id="difficulty">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="uniform">Uniforme - Même niveau partout</SelectItem>
                <SelectItem value="progressive">Progressive - Du facile au difficile</SelectItem>
                <SelectItem value="mixed">Mixte - Variété de niveaux</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-gray-500">
              {difficulty === 'uniform' && 'Tous les exercices auront le même niveau de difficulté'}
              {difficulty === 'progressive' && 'Les exercices deviennent progressivement plus difficiles'}
              {difficulty === 'mixed' && 'Mélange d\'exercices faciles, moyens et difficiles'}
            </p>
          </div>

          {/* Show Difficulty Badges */}
          <div className="flex items-center gap-2">
            <Checkbox
              id="showDifficulty"
              checked={showDifficulty}
              onCheckedChange={(checked) => onShowDifficultyChange(checked === true)}
            />
            <Label htmlFor="showDifficulty" className="cursor-pointer">
              Afficher les badges de difficulté
            </Label>
          </div>

          {/* Include Answer Key */}
          <div className="flex items-center gap-2">
            <Checkbox
              id="includeAnswerKey"
              checked={includeAnswerKey}
              onCheckedChange={(checked) => onIncludeAnswerKeyChange(checked === true)}
            />
            <Label htmlFor="includeAnswerKey" className="cursor-pointer">
              Inclure le corrigé
            </Label>
          </div>
        </CardContent>
      </Card>

      {/* Styling Options */}
      <Card>
        <CardHeader>
          <CardTitle>Apparence</CardTitle>
          <CardDescription>
            Personnalisez le style de votre fiche d'exercices
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Theme */}
          <div className="space-y-2">
            <Label htmlFor="theme">Thème visuel</Label>
            <Select value={theme} onValueChange={(value) => onThemeChange(value as DrillSheetTheme)}>
              <SelectTrigger id="theme">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="simple">Simple - Style classique</SelectItem>
                <SelectItem value="colorful">Coloré - Avec couleurs vives</SelectItem>
                <SelectItem value="minimal">Minimal - Épuré et sobre</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Font Family */}
          <div className="space-y-2">
            <Label htmlFor="fontFamily">Police de caractères</Label>
            <Select value={fontFamily} onValueChange={onFontFamilyChange}>
              <SelectTrigger id="fontFamily">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Inter">Inter - Moderne et lisible</SelectItem>
                <SelectItem value="Arial">Arial - Standard</SelectItem>
                <SelectItem value="Georgia">Georgia - Avec sérifs</SelectItem>
                <SelectItem value="Comic Sans MS">Comic Sans MS - Ludique</SelectItem>
                <SelectItem value="Courier New">Courier New - Monospace</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Font Size */}
          <div className="space-y-2">
            <Label htmlFor="fontSize">
              Taille de police: <strong>{fontSize}pt</strong>
            </Label>
            <div className="flex items-center gap-4">
              <Input
                id="fontSize"
                type="range"
                min={10}
                max={16}
                value={fontSize}
                onChange={(e) => onFontSizeChange(parseInt(e.target.value))}
                className="flex-1"
              />
              <Input
                type="number"
                min={10}
                max={16}
                value={fontSize}
                onChange={(e) => onFontSizeChange(parseInt(e.target.value))}
                className="w-20"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Customization */}
      <Card>
        <CardHeader>
          <CardTitle>Personnalisation</CardTitle>
          <CardDescription>
            Ajoutez votre touche personnelle
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Custom Title */}
          <div className="space-y-2">
            <Label htmlFor="customTitle">Titre personnalisé (optionnel)</Label>
            <Input
              id="customTitle"
              type="text"
              placeholder="Ex: Révision de fin d'année"
              value={customTitle}
              onChange={(e) => onCustomTitleChange(e.target.value)}
            />
            <p className="text-xs text-gray-500">
              Laissez vide pour utiliser le titre par défaut
            </p>
          </div>

          {/* Custom Instructions */}
          <div className="space-y-2">
            <Label htmlFor="customInstructions">Instructions personnalisées (optionnel)</Label>
            <Textarea
              id="customInstructions"
              placeholder="Ex: Complétez tous les exercices en utilisant un crayon à mine. Vous avez 45 minutes."
              value={customInstructions}
              onChange={(e) => onCustomInstructionsChange(e.target.value)}
              rows={3}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
