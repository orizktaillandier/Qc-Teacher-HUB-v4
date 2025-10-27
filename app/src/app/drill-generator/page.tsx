'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { Navigation } from '@/components/navigation';
import { ProgressiveFilters } from '@/components/ProgressiveFilters';
import DrillSheetRenderer from '@/components/DrillSheetRenderer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Download,
  Eye,
  RefreshCw,
  Save,
  FileText,
  ListChecks,
  Sparkles
} from 'lucide-react';
import {
  getGradesForCycle,
  getSubjectsForCycle,
  getNotionsForSubjectAndCycle
} from '@/lib/pfeq-structure';
import type {
  DrillExercise,
  DifficultyStrategy,
  DrillSheetTheme,
  DrillSheetData,
  DrillSheetBorder
} from '@/lib/drill-sheet-types';
import { generateDrillSheetPDF } from '@/lib/pdf-generation';
import { FontSelector } from '@/components/FontSelector';
import { GoogleFontsLoader } from '@/components/GoogleFontsLoader';
import { getFontByValue } from '@/lib/fonts/teacher-fonts';

export default function DrillGeneratorPage() {
  // PFEQ Filter State
  const [selectedCycle, setSelectedCycle] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedNotion, setSelectedNotion] = useState('');
  const [selectedSubNotions, setSelectedSubNotions] = useState<string[]>([]);
  const [filtersCompleted, setFiltersCompleted] = useState(false);

  // Drill Sheet Settings
  const [exerciseCount, setExerciseCount] = useState(15);
  const [difficulty, setDifficulty] = useState<DifficultyStrategy>('uniform');
  const [includeAnswerKey, setIncludeAnswerKey] = useState(true);
  const [theme, setTheme] = useState<DrillSheetTheme>('simple');
  const [selectedFont, setSelectedFont] = useState('comic-neue');
  const [fontSize, setFontSize] = useState(12);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [textAlign, setTextAlign] = useState<'left' | 'center' | 'right'>('left');
  const [customTitle, setCustomTitle] = useState('');
  const [customInstructions, setCustomInstructions] = useState('');
  const [showDifficulty, setShowDifficulty] = useState(false);
  // Helper: Get random decorative border (excluding 'none' for more visual interest)
  const getRandomBorder = (): DrillSheetBorder => {
    const borders: DrillSheetBorder[] = ['dots', 'corners', 'waves', 'maple', 'dashes', 'stars', 'brackets', 'notebook'];
    return borders[Math.floor(Math.random() * borders.length)];
  };

  const [gridColumns, setGridColumns] = useState(2);
  const [gridRows, setGridRows] = useState(4);
  const [decorativeBorder, setDecorativeBorder] = useState<DrillSheetBorder>(getRandomBorder());
  const [showScoring, setShowScoring] = useState(false);

  // Preset system
  const [activePreset, setActivePreset] = useState<string | null>(null);

  // Preset configurations
  const presets = {
    standard: {
      name: 'Feuille standard',
      description: 'Professionnel et épuré',
      icon: FileText,
      settings: {
        font: 'inter',
        fontSize: 12,
        bold: false,
        italic: false,
        border: 'corners' as DrillSheetBorder,
        scoring: true
      }
    },
    colorful: {
      name: 'Feuille colorée',
      description: 'Ludique et engageant',
      icon: Sparkles,
      settings: {
        font: 'comic-neue',
        fontSize: 13,
        bold: false,
        italic: false,
        border: 'stars' as DrillSheetBorder,
        scoring: true
      }
    },
    minimal: {
      name: 'Feuille minimaliste',
      description: 'Simple et sobre',
      icon: ListChecks,
      settings: {
        font: 'roboto',
        fontSize: 11,
        bold: false,
        italic: false,
        border: 'dots' as DrillSheetBorder,
        scoring: false
      }
    }
  };

  // Apply preset
  const applyPreset = (presetKey: string) => {
    const preset = presets[presetKey as keyof typeof presets];
    if (!preset) return;

    setSelectedFont(preset.settings.font);
    setFontSize(preset.settings.fontSize);
    setIsBold(preset.settings.bold);
    setIsItalic(preset.settings.italic);
    setDecorativeBorder(preset.settings.border);
    setShowScoring(preset.settings.scoring);
    setActivePreset(presetKey);

    toast.success(`Preset "${preset.name}" appliqué!`);
  };

  // Generation State
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [generationMessage, setGenerationMessage] = useState('');
  const [generatedExercises, setGeneratedExercises] = useState<DrillExercise[]>([]);
  const [generationMetadata, setGenerationMetadata] = useState<any>(null);
  const [displayMode, setDisplayMode] = useState<'exercises' | 'answers'>('exercises');
  const [isExportingPDF, setIsExportingPDF] = useState(false);

  // Tips for progress overlay
  const tips = [
    "📚 La pratique régulière améliore la rétention à long terme",
    "🎯 Les exercices variés stimulent différentes compétences",
    "✏️ Encouragez les élèves à montrer leur démarche",
    "🌟 Chaque erreur est une opportunité d'apprentissage",
    "🧠 L'espacement des révisions renforce la mémorisation",
    "🎨 Personnalisez vos fiches pour captiver vos élèves",
    "📊 Suivez la progression avec des exercices gradués",
    "💡 Variez les formats pour maintenir l'engagement"
  ];
  const [tipIndex, setTipIndex] = useState(0);

  // Update exercise count when subject changes
  useEffect(() => {
    if (selectedSubject) {
      const defaults: Record<string, number> = {
        'mathematiques': 20,
        'francais-langue-enseignement': 15,
        'science-et-technologie': 12,
        'univers-social': 12
      };
      const defaultCount = defaults[selectedSubject] || 15;
      setExerciseCount(defaultCount);
    }
  }, [selectedSubject]);

  // Handle filter completion
  const handleFiltersComplete = async (filters: {
    cycle: string;
    grade: string;
    subject: string;
    notion: string;
    subNotions: string[];
    cardCount: number; // Ignored for drill sheets
    exerciseCount?: number;
    difficulty?: string;
    showDifficulty?: boolean;
    includeAnswerKey?: boolean;
  }) => {
    setSelectedCycle(filters.cycle);
    setSelectedGrade(filters.grade);
    setSelectedSubject(filters.subject);
    setSelectedNotion(filters.notion);
    setSelectedSubNotions(filters.subNotions);

    // Apply drill sheet options if provided
    if (filters.exerciseCount !== undefined) setExerciseCount(filters.exerciseCount);
    if (filters.difficulty) setDifficulty(filters.difficulty as DifficultyStrategy);
    if (filters.showDifficulty !== undefined) setShowDifficulty(filters.showDifficulty);
    if (filters.includeAnswerKey !== undefined) setIncludeAnswerKey(filters.includeAnswerKey);

    // Start generation immediately
    await handleGenerate(
      filters.cycle,
      filters.grade,
      filters.subject,
      filters.notion,
      filters.subNotions
    );

    // Transition to preview UI
    setTimeout(() => {
      setFiltersCompleted(true);
    }, 500);
  };

  // Generate drill sheet
  const handleGenerate = async (
    cycleParam?: string,
    gradeParam?: string,
    subjectParam?: string,
    notionParam?: string,
    subNotionsParam?: string[]
  ) => {
    setIsGenerating(true);
    setGenerationProgress(0);
    setGenerationMessage('Initialisation...');

    // Progress animation
    const startTime = Date.now();
    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;

      setGenerationProgress(prev => {
        if (elapsed < 5000) return Math.min(15, (elapsed / 5000) * 15);
        else if (elapsed < 15000) return Math.min(35, 15 + ((elapsed - 5000) / 10000) * 20);
        else if (elapsed < 25000) return Math.min(60, 35 + ((elapsed - 15000) / 10000) * 25);
        else if (elapsed < 35000) return Math.min(85, 60 + ((elapsed - 25000) / 10000) * 25);
        else return Math.min(99, 85 + ((elapsed - 35000) / 20000) * 14);
      });
    }, 300);

    // Update messages
    const messageTimeouts = [
      setTimeout(() => setGenerationMessage('Connexion au serveur...'), 2000),
      setTimeout(() => setGenerationMessage('Analyse du PFEQ...'), 5000),
      setTimeout(() => setGenerationMessage('Génération des exercices...'), 9000),
      setTimeout(() => setGenerationMessage('Adaptation pédagogique...'), 14000),
      setTimeout(() => setGenerationMessage('Création des questions...'), 19000),
      setTimeout(() => setGenerationMessage('Validation des réponses...'), 24000),
      setTimeout(() => setGenerationMessage('Mise en forme...'), 29000),
      setTimeout(() => setGenerationMessage('Finalisation...'), 34000),
      setTimeout(() => setGenerationMessage('Presque terminé...'), 38000)
    ];

    // Rotate tips
    const tipInterval = setInterval(() => {
      setTipIndex(prev => (prev + 1) % tips.length);
    }, 6000);

    try {
      const cycle = cycleParam || selectedCycle;
      const grade = gradeParam || selectedGrade;
      const subject = subjectParam || selectedSubject;
      const notion = notionParam || selectedNotion;
      const subNotions = subNotionsParam || selectedSubNotions;

      const requestBody = {
        cycle,
        grade,
        subject,
        notion,
        subNotions,
        exerciseCount,
        difficulty,
        includeAnswerKey
      };

      console.log('Generating drill sheet with:', requestBody);

      const response = await fetch('/api/generate-drill-sheets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to generate drill sheet');
      }

      // Complete progress
      clearInterval(progressInterval);
      clearInterval(tipInterval);
      messageTimeouts.forEach(timeout => clearTimeout(timeout));
      setGenerationProgress(100);
      setGenerationMessage('Terminé!');

      // Store generated exercises
      console.log('Generated exercises:', data.data.exercises);
      setGeneratedExercises(data.data.exercises);
      setGenerationMetadata(data.data.metadata);

      toast.success('Fiche d\'exercices générée!', {
        description: `${data.data.exercises.length} exercices créés`
      });

    } catch (error) {
      clearInterval(progressInterval);
      clearInterval(tipInterval);
      messageTimeouts.forEach(timeout => clearTimeout(timeout));
      console.error('Error generating drill sheet:', error);
      toast.error('Erreur lors de la génération', {
        description: error instanceof Error ? error.message : 'Une erreur inconnue est survenue',
        duration: 5000
      });
    } finally {
      setIsGenerating(false);
      setTimeout(() => {
        setGenerationProgress(0);
        setGenerationMessage('');
      }, 500);
    }
  };

  // Save to library
  const handleSaveToLibrary = async () => {
    try {
      const response = await fetch('/api/library/save-drill-sheet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cycle: selectedCycle,
          grade: selectedGrade,
          subject: selectedSubject,
          notion: selectedNotion,
          subNotions: selectedSubNotions,
          exerciseCount,
          difficulty,
          includeAnswerKey,
          theme,
          fontFamily: selectedFont,
          fontSize,
          customTitle,
          customInstructions,
          showDifficulty,
          exercises: generatedExercises
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Sauvegardé!', {
          description: 'Fiche ajoutée à votre bibliothèque'
        });
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error('Error saving drill sheet:', error);
      toast.error('Erreur', {
        description: error instanceof Error ? error.message : 'Impossible de sauvegarder'
      });
    }
  };

  // Export to PDF
  const handleExportPDF = async () => {
    if (generatedExercises.length === 0) {
      toast.error('Aucun exercice à exporter', {
        description: 'Veuillez d\'abord générer des exercices'
      });
      return;
    }

    setIsExportingPDF(true);

    try {
      await generateDrillSheetPDF({
        selectedSubject,
        selectedNotion,
        showAnswers: displayMode === 'answers'
      });
    } catch (error) {
      console.error('Error exporting PDF:', error);
      // Error handling is done inside generateDrillSheetPDF
    } finally {
      setIsExportingPDF(false);
    }
  };

  // Build drill sheet data for renderer
  const currentFont = getFontByValue(selectedFont);
  const drillSheetData: DrillSheetData = generatedExercises.length > 0 ? {
    id: 'preview',
    userId: 'preview',
    cycle: selectedCycle,
    grade: selectedGrade,
    subject: selectedSubject,
    notion: selectedNotion,
    subNotions: selectedSubNotions,
    exerciseCount: generatedExercises.length,
    difficulty,
    includeAnswerKey,
    theme,
    fontFamily: currentFont ? currentFont.googleFont : 'Inter',
    fontSize,
    isBold,
    isItalic,
    customTitle,
    customInstructions,
    showDifficulty,
    gridColumns,
    gridRows,
    decorativeBorder,
    showScoring,
    exercises: generatedExercises,
    createdAt: new Date(),
    updatedAt: new Date()
  } : null as any;

  return (
    <div className="min-h-screen bg-background">
      <GoogleFontsLoader fontValue={selectedFont} weight={isBold ? 700 : 400} />
      <Navigation />

      <div className="relative pt-20 pb-12 px-4">
        <div className="w-full max-w-full">
          {/* Header */}
          <div className="container mx-auto max-w-7xl mb-8">
            <h1 className="text-3xl font-display font-bold mb-2 text-foreground">
              Générateur de Fiches d'Exercices
            </h1>
            <p className="text-muted-foreground">
              Créez des fiches d'exercices alignées au PFEQ
            </p>
          </div>

          {/* Progressive Filters */}
          {!filtersCompleted && (
            <motion.div
              className="mb-8"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ProgressiveFilters
                onFiltersComplete={handleFiltersComplete}
                mode="drillSheet"
              />
            </motion.div>
          )}

          {/* Generation Progress Overlay */}
          {isGenerating && !filtersCompleted && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                transition={{ type: "spring", damping: 25 }}
              >
                <Card className="p-8 max-w-md w-full mx-4 shadow-2xl border-2 border-primary/20">
                  <div className="space-y-6">
                    <div className="flex flex-col items-center space-y-4">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="p-4 rounded-2xl bg-primary/10"
                      >
                        <FileText className="h-16 w-16 text-primary" />
                      </motion.div>
                      <h3 className="text-xl font-display font-semibold">Génération en cours...</h3>
                      <motion.p
                        key={generationMessage}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-sm text-muted-foreground text-center h-5"
                      >
                        {generationMessage}
                      </motion.p>
                    </div>
                    <div className="space-y-3">
                      <div className="relative overflow-hidden rounded-full">
                        <Progress value={generationProgress} className="w-full h-3" />
                        <motion.div
                          className="absolute top-0 left-0 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none"
                          animate={{ x: ["-100%", "200%"] }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                          style={{ width: "30%" }}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <motion.span
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="font-display font-semibold"
                        >
                          {Math.floor(generationProgress)}%
                        </motion.span>
                        <span>
                          {generationProgress < 20 && "Démarrage..."}
                          {generationProgress >= 20 && generationProgress < 50 && "En cours..."}
                          {generationProgress >= 50 && generationProgress < 80 && "Traitement..."}
                          {generationProgress >= 80 && generationProgress < 100 && "Presque terminé..."}
                          {generationProgress === 100 && "✓ Complété"}
                        </span>
                      </div>
                    </div>

                    {/* Tips */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 2 }}
                      className="pt-4 border-t border-border"
                    >
                      <motion.p
                        key={tipIndex}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-sm text-muted-foreground text-center italic font-medium"
                      >
                        {tips[tipIndex]}
                      </motion.p>
                    </motion.div>
                  </div>
                </Card>
              </motion.div>
            </motion.div>
          )}

          {/* Main Content */}
          {filtersCompleted && (
            <div className="container mx-auto max-w-7xl">
              <div className="flex flex-row gap-6">
                {/* Left Sidebar - Styling & Customization Options */}
                <div className="lg:w-80 flex-shrink-0 space-y-4">
                  {/* Quick Presets */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base flex items-center gap-2">
                        <Sparkles className="h-4 w-4 text-primary" />
                        Presets rapides
                      </CardTitle>
                      <CardDescription>Appliquez un style prédéfini</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="grid grid-cols-1 gap-2">
                        {Object.entries(presets).map(([key, preset]) => {
                          const Icon = preset.icon;
                          return (
                            <Button
                              key={key}
                              variant={activePreset === key ? 'default' : 'outline'}
                              className="w-full justify-start h-auto py-3"
                              onClick={() => applyPreset(key)}
                            >
                              <div className="flex items-start gap-3 text-left">
                                <Icon className="h-5 w-5 mt-0.5 flex-shrink-0" />
                                <div className="flex-1 min-w-0">
                                  <div className="font-semibold">{preset.name}</div>
                                  <div className="text-xs text-muted-foreground">{preset.description}</div>
                                </div>
                              </div>
                            </Button>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Advanced Options - Accordion */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Options avancées</CardTitle>
                      <CardDescription>Personnalisez en détail</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                      <Accordion type="single" collapsible={true} defaultValue="police" className="px-6">
                        {/* Police Section */}
                        <AccordionItem value="police">
                          <AccordionTrigger className="text-sm font-semibold">
                            Police
                          </AccordionTrigger>
                          <AccordionContent className="space-y-4 pt-4">
                            {/* Font Selector */}
                            <FontSelector
                              selectedFont={selectedFont}
                              onFontChange={setSelectedFont}
                              fontSize={fontSize}
                              onFontSizeChange={setFontSize}
                              isBold={isBold}
                              onBoldChange={setIsBold}
                              isItalic={isItalic}
                              onItalicChange={setIsItalic}
                              isUnderline={isUnderline}
                              onUnderlineChange={setIsUnderline}
                              textAlign={textAlign}
                              onTextAlignChange={setTextAlign}
                            />
                          </AccordionContent>
                        </AccordionItem>

                        {/* Bordure Section */}
                        <AccordionItem value="bordure">
                          <AccordionTrigger className="text-sm font-semibold">
                            Bordure
                          </AccordionTrigger>
                          <AccordionContent className="space-y-4 pt-4">
                            {/* Decorative Border */}
                            <div className="space-y-2">
                              <Label htmlFor="decorative-border">Bordure décorative</Label>
                              <Select
                                value={decorativeBorder}
                                onValueChange={(value) => setDecorativeBorder(value as DrillSheetBorder)}
                              >
                                <SelectTrigger id="decorative-border">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="none">Aucune - Standard</SelectItem>
                                  <SelectItem value="dots">Points - Subtil et moderne</SelectItem>
                                  <SelectItem value="corners">Coins - Élégant et discret</SelectItem>
                                  <SelectItem value="waves">Vagues - Doux et accueillant</SelectItem>
                                  <SelectItem value="dashes">Tirets - Classique et simple</SelectItem>
                                  <SelectItem value="stars">Étoiles - Ludique et motivant</SelectItem>
                                  <SelectItem value="brackets">Crochets - Professionnel et net</SelectItem>
                                  <SelectItem value="notebook">Cahier - Style papier ligné</SelectItem>
                                </SelectContent>
                              </Select>
                              <p className="text-xs text-muted-foreground">
                                Bordures légères et économes en encre
                              </p>
                            </div>
                          </AccordionContent>
                        </AccordionItem>

                        {/* Personnalisation Section */}
                        <AccordionItem value="personnalisation">
                          <AccordionTrigger className="text-sm font-semibold">
                            Personnalisation
                          </AccordionTrigger>
                          <AccordionContent className="space-y-4 pt-4">
                            {/* Custom Title */}
                            <div className="space-y-2">
                              <Label htmlFor="custom-title">Titre personnalisé (optionnel)</Label>
                              <Input
                                id="custom-title"
                                placeholder="Ex: Révision de fin d'étape"
                                value={customTitle}
                                onChange={(e) => setCustomTitle(e.target.value)}
                              />
                            </div>

                            {/* Custom Instructions */}
                            <div className="space-y-2">
                              <Label htmlFor="custom-instructions">Consignes personnalisées (optionnel)</Label>
                              <Textarea
                                id="custom-instructions"
                                placeholder="Ex: Montrez votre démarche pour chaque problème..."
                                rows={4}
                                value={customInstructions}
                                onChange={(e) => setCustomInstructions(e.target.value)}
                              />
                            </div>

                            {/* Scoring System */}
                            <div className="space-y-2 pt-4 border-t">
                              <div className="flex items-center justify-between">
                                <Label htmlFor="show-scoring" className="cursor-pointer">Afficher le système de pointage</Label>
                                <input
                                  id="show-scoring"
                                  type="checkbox"
                                  checked={showScoring}
                                  onChange={(e) => setShowScoring(e.target.checked)}
                                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer"
                                />
                              </div>
                              <p className="text-xs text-muted-foreground">
                                Ajoute "Résultat: ___/total ___%" en bas de page
                              </p>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </CardContent>
                  </Card>
                </div>

                {/* Right Preview */}
                <div className="flex-1 min-w-0">
                  <Card className="h-full overflow-hidden border shadow-sm">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Eye className="h-5 w-5" />
                        <span className="text-lg font-semibold">Aperçu</span>
                        {generatedExercises.length > 0 && (
                          <Badge variant="secondary" className="ml-2">
                            {generatedExercises.length} exercices
                          </Badge>
                        )}
                      </div>

                      {generatedExercises.length > 0 && (
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 dark:bg-gray-900/50 rounded-md border border-gray-200 dark:border-gray-700">
                            <div className="text-xs text-gray-600 dark:text-gray-400">
                              <span className="font-medium">
                                {getGradesForCycle(selectedCycle).find(g => g.key === selectedGrade)?.label}
                              </span>
                              <span className="mx-1 text-gray-400">•</span>
                              <span>
                                {getSubjectsForCycle(selectedCycle).find(s => s.key === selectedSubject)?.label}
                              </span>
                              <span className="mx-1 text-gray-400">•</span>
                              <span>
                                {getNotionsForSubjectAndCycle(selectedSubject, selectedCycle).find(n => n.key === selectedNotion)?.label}
                              </span>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 px-2 ml-2"
                              onClick={() => {
                                setFiltersCompleted(false);
                                setSelectedCycle('');
                                setSelectedGrade('');
                                setSelectedSubject('');
                                setSelectedNotion('');
                                setSelectedSubNotions([]);
                                setGeneratedExercises([]);
                              }}
                              title="Modifier les filtres"
                            >
                              <RefreshCw className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <Tabs defaultValue="exercises" onValueChange={(value) => setDisplayMode(value as any)}>
                      <div className="flex items-center justify-between mx-6 mt-0 gap-4">
                        <TabsList className="grid grid-cols-2 flex-1">
                          <TabsTrigger value="exercises">Exercices</TabsTrigger>
                          <TabsTrigger value="answers">Corrigé</TabsTrigger>
                        </TabsList>
                        {generatedExercises.length > 0 && (
                          <div className="flex items-center gap-2">
                            <Button
                              onClick={handleSaveToLibrary}
                              size="sm"
                              className="gap-2"
                              variant="outline"
                            >
                              <Save className="h-4 w-4" />
                              Sauvegarder
                            </Button>
                            <Button
                              onClick={handleExportPDF}
                              size="sm"
                              className="gap-2"
                              variant="default"
                              disabled={isExportingPDF}
                            >
                              <Download className={`h-4 w-4 ${isExportingPDF ? 'animate-bounce' : ''}`} />
                              {isExportingPDF ? 'Génération...' : 'Télécharger PDF'}
                            </Button>
                          </div>
                        )}
                      </div>

                      <TabsContent value="exercises" className="mt-6 overflow-auto max-h-[80vh] px-6 pb-6">
                        {generatedExercises.length > 0 ? (
                          <div className="flex justify-center">
                            <DrillSheetRenderer drillSheet={drillSheetData} showAnswers={false} />
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center py-20 text-center">
                            <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-full mb-4">
                              <ListChecks className="h-12 w-12 text-slate-400" />
                            </div>
                            <h3 className="text-lg font-semibold mb-2">Prêt à créer!</h3>
                            <p className="text-slate-600 dark:text-slate-400 max-w-sm">
                              Ajustez vos options et cliquez sur "Générer" pour créer votre fiche
                            </p>
                          </div>
                        )}
                      </TabsContent>

                      <TabsContent value="answers" className="mt-6 overflow-auto max-h-[80vh] px-6 pb-6">
                        {generatedExercises.length > 0 ? (
                          <div className="flex justify-center">
                            <DrillSheetRenderer drillSheet={drillSheetData} showAnswers={true} />
                          </div>
                        ) : (
                          <div className="text-center py-20 text-slate-600 dark:text-slate-400">
                            Générez des exercices pour voir le corrigé
                          </div>
                        )}
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
