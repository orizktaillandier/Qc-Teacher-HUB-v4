'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { Navigation } from '@/components/navigation'
import { BackgroundPattern } from '@/components/ui/background-pattern'
import { generateStudentCardsPDF, generateAnswerSheetPDF } from '@/lib/pdf-generation'
import { ProgressiveFilters } from '@/components/ProgressiveFilters'
import { CollapsibleSection } from '@/components/CollapsibleSection'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Sparkles,
  Wand2,
  Download,
  Eye,
  Settings2,
  Palette,
  Type,
  Image,
  Layers,
  RefreshCw,
  Edit3,
  RotateCcw,
  Save,
  Share2,
  ChevronRight,
  GraduationCap,
  BookOpen,
  Calculator,
  Globe,
  Microscope,
  Music,
  Paintbrush,
  Users,
  Heart,
  Check
} from "lucide-react"

// Import PFEQ structure and utilities
import {
  cycles,
  getGradesForCycle,
  getSubjectsForCycle,
  getNotionsForSubjectAndCycle,
  getSubNotions,
  type Cycle,
  type Grade,
  type Subject,
  type Notion,
  type SubNotion
} from '@/lib/pfeq-structure'
import { CardRenderer } from '@/components/CardRenderer'
import { CardDisplayV4 } from '@/components/CardDisplayV4'
import { ThemeSelector } from '@/components/ThemeSelector'
import { FontSelector } from '@/components/FontSelector'
import { KawaiiSelector, type KawaiiMood, phosphorIcons, educationalEmojis, gameIcons } from '@/components/KawaiiSelector'
import { GoogleFontsLoader } from '@/components/GoogleFontsLoader'
import { getFontByValue } from '@/lib/fonts/teacher-fonts'
import { allCardThemes, getAllThemeByIndex } from '@/lib/themes/all-card-themes'
import { advancedCreativeThemes } from '@/lib/themes/advanced-creative-themes'
import { dallePoweredThemes, getStaticImages } from '@/lib/themes/dalle-powered-themes-static'

export default function GeneratorPage() {
  // Helper function to determine the correct character theme
  const getCharacterTheme = (character: string) => {
    // Check if it's a Phosphor icon (starts with 'ph-')
    if (character.startsWith('ph-')) {
      return character
    }

    // Check if it's an emoji (starts with 'emoji-')
    if (character.startsWith('emoji-')) {
      return character
    }

    // Check if it's a Game icon (starts with 'gi-')
    if (character.startsWith('gi-')) {
      return character
    }

    // Otherwise, it's a kawaii character - add the prefix
    return `kawaii-${character}`
  }

  // PFEQ Cascading Filters State
  const [selectedCycle, setSelectedCycle] = useState('')
  const [selectedGrade, setSelectedGrade] = useState('')
  const [selectedSubject, setSelectedSubject] = useState('')
  const [selectedNotion, setSelectedNotion] = useState('')
  const [selectedSubNotions, setSelectedSubNotions] = useState<string[]>([])

  const [filtersCompleted, setFiltersCompleted] = useState(false)

  // Available options based on previous selections
  const [availableGrades, setAvailableGrades] = useState<Grade[]>([])
  const [availableSubjects, setAvailableSubjects] = useState<Subject[]>([])
  const [availableNotions, setAvailableNotions] = useState<Notion[]>([])
  const [availableSubNotions, setAvailableSubNotions] = useState<SubNotion[]>([])

  // Theme and generation state
  const [selectedTheme, setSelectedTheme] = useState(0)
  const [selectedAdvancedTheme, setSelectedAdvancedTheme] = useState<number | null>(null)
  const [selectedDalleTheme, setSelectedDalleTheme] = useState<number | null>(null)
  const [themeType, setThemeType] = useState<'standard' | 'advanced' | 'dalle'>('standard')
  const [dalleImages, setDalleImages] = useState<{ [key: string]: string }>({})
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationProgress, setGenerationProgress] = useState(0)
  const [generationMessage, setGenerationMessage] = useState('')
  const [generatedCards, setGeneratedCards] = useState<any[]>([])
  const [tipIndex, setTipIndex] = useState(0)

  // Font customization state
  const [selectedFont, setSelectedFont] = useState('comic-neue')
  const [fontSize, setFontSize] = useState(18)
  const [isBold, setIsBold] = useState(false)
  const [isItalic, setIsItalic] = useState(false)
  const [isUnderline, setIsUnderline] = useState(false)
  const [textAlign, setTextAlign] = useState<'left' | 'center' | 'right'>('left')
  const [textBackground, setTextBackground] = useState(50) // 0-100 transparency percentage

  // Kawaii character state
  const [selectedCharacter, setSelectedCharacter] = useState('cat')
  const [selectedMood, setSelectedMood] = useState<KawaiiMood>('happy')
  const [showIllustrations, setShowIllustrations] = useState(true)
  const [illustrationScale, setIllustrationScale] = useState(100)
  const [illustrationColor, setIllustrationColor] = useState('#3b82f6')
  const [transparentBackground, setTransparentBackground] = useState(false)

  // Text editing state
  const [isTextEditMode, setIsTextEditMode] = useState(false)
  const [textPositions, setTextPositions] = useState<Record<number, { x: number; y: number; width: number; height: number }>>({})
  const [editedTexts, setEditedTexts] = useState<Record<number, string>>({})
  const [activeEditingCards, setActiveEditingCards] = useState<Set<number>>(new Set())

  // Illustration transform state
  const [illustrationTransforms, setIllustrationTransforms] = useState<Record<number, { x: number; y: number; scale: number; rotation: number }>>({})

  // Print lock state - when true, disables all editing for clean PDF output
  const [isPrintLocked, setIsPrintLocked] = useState(false)
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)

  const tips = [
    "🐙 Le saviez-vous? Les pieuvres ont trois cœurs et le sang bleu!",
    "🍯 Le miel ne se périme jamais. On en a trouvé dans des tombes égyptiennes de 3000 ans!",
    "🌍 La Terre pèse environ 6 000 000 000 000 000 000 000 000 kg",
    "⚡ Un éclair est 5 fois plus chaud que la surface du soleil",
    "🦒 Les girafes et les humains ont le même nombre de vertèbres dans le cou: 7",
    "🍌 Les bananes sont des baies, mais les fraises ne le sont pas!",
    "🎮 Le premier jeu vidéo a été créé en 1958 et s'appelait Tennis for Two",
    "🦴 Un bébé a environ 270 os, mais un adulte n'en a que 206",
    "🌊 L'océan Pacifique est plus grand que toutes les terres émergées réunies",
    "🐝 Une abeille doit visiter 2 millions de fleurs pour faire 500g de miel",
    "🧠 Le cerveau humain contient environ 86 milliards de neurones",
    "🌈 Il est impossible de voir un arc-en-ciel complet à midi",
    "🦘 Les kangourous ne peuvent pas marcher à reculons",
    "🌙 La lune s'éloigne de la Terre de 3,8 cm chaque année",
    "🐢 Les tortues peuvent respirer par leurs fesses!",
    "🍫 Le chocolat était utilisé comme monnaie par les Aztèques",
    "🦋 Les papillons goûtent avec leurs pattes",
    "📚 Le mot le plus long en français a 25 lettres: anticonstitutionnellement",
    "🎨 Les humains peuvent distinguer environ 10 millions de couleurs différentes",
    "🚀 Il faut seulement 8 minutes pour que la lumière du soleil atteigne la Terre"
  ]
  const [displayMode, setDisplayMode] = useState<'studentCards' | 'answerSheet' | 'corriger'>('studentCards')
  const [previewScale, setPreviewScale] = useState([1])
  const [cardCount, setCardCount] = useState(8)

  // Handle filter completion from ProgressiveFilters
  const handleFiltersComplete = async (filters: {
    cycle: string
    grade: string
    subject: string
    notion: string
    subNotions: string[]
    cardCount: number
  }) => {
    setSelectedCycle(filters.cycle)
    setSelectedGrade(filters.grade)
    setSelectedSubject(filters.subject)
    setSelectedNotion(filters.notion)
    setSelectedSubNotions(filters.subNotions)
    setCardCount(filters.cardCount)

    // Start generation immediately
    await handleGenerate(filters.cycle, filters.grade, filters.subject, filters.notion, filters.subNotions, filters.cardCount)

    // Transition to preview UI after generation starts
    setTimeout(() => {
      setFiltersCompleted(true)
    }, 500)
  }

  // Load static DALL-E images when a DALL-E theme is selected
  useEffect(() => {
    if (themeType === 'dalle' && selectedDalleTheme !== null) {
      const images = getStaticImages(selectedDalleTheme);
      console.log('Loading static DALL-E images:', images);
      setDalleImages(images);
    } else {
      setDalleImages({});
    }
  }, [themeType, selectedDalleTheme]);

  // Update font when theme changes (apply default font from theme)
  useEffect(() => {
    if (themeType === 'standard' && selectedTheme >= 0 && selectedTheme < allCardThemes.length) {
      const theme = allCardThemes[selectedTheme];
      if (theme.defaultFont) {
        setSelectedFont(theme.defaultFont);
      }
    }
  }, [selectedTheme, themeType]);

  // Load generation from library if available
  useEffect(() => {
    const loadFromLibrary = () => {
      const viewGeneration = sessionStorage.getItem('viewGeneration');
      if (viewGeneration) {
        try {
          const generation = JSON.parse(viewGeneration);

          // Set all the state from the saved generation
          setSelectedCycle(generation.cycle);
          setSelectedGrade(generation.grade);
          setSelectedSubject(generation.subject);
          setSelectedNotion(generation.notion);
          setSelectedSubNotions(generation.subNotions || []);
          setGeneratedCards(generation.cards);

          // Set theme if available
          if (generation.theme) {
            const themeIndex = parseInt(generation.theme);
            if (!isNaN(themeIndex)) {
              setSelectedTheme(themeIndex);
            }
          }

          // Set font if available
          if (generation.fontFamily) {
            setSelectedFont(generation.fontFamily);
          }

          // Restore text customizations
          if (generation.textPositions) {
            setTextPositions(typeof generation.textPositions === 'string' ? JSON.parse(generation.textPositions) : generation.textPositions);
          }
          if (generation.editedTexts) {
            setEditedTexts(typeof generation.editedTexts === 'string' ? JSON.parse(generation.editedTexts) : generation.editedTexts);
          }

          // Restore font settings
          if (generation.fontSize !== undefined && generation.fontSize !== null) setFontSize(generation.fontSize);
          if (generation.isBold !== undefined && generation.isBold !== null) setIsBold(generation.isBold);
          if (generation.isItalic !== undefined && generation.isItalic !== null) setIsItalic(generation.isItalic);
          if (generation.isUnderline !== undefined && generation.isUnderline !== null) setIsUnderline(generation.isUnderline);
          if (generation.textAlign) setTextAlign(generation.textAlign);
          if (generation.textBackground !== undefined && generation.textBackground !== null) setTextBackground(generation.textBackground);

          // Restore illustration settings
          if (generation.selectedCharacter) setSelectedCharacter(generation.selectedCharacter);
          if (generation.selectedMood) setSelectedMood(generation.selectedMood);
          if (generation.showIllustrations !== undefined && generation.showIllustrations !== null) setShowIllustrations(generation.showIllustrations);
          if (generation.illustrationScale !== undefined && generation.illustrationScale !== null) setIllustrationScale(generation.illustrationScale);
          if (generation.illustrationColor) setIllustrationColor(generation.illustrationColor);
          if (generation.transparentBackground !== undefined && generation.transparentBackground !== null) setTransparentBackground(generation.transparentBackground);
          if (generation.illustrationTransforms) {
            setIllustrationTransforms(typeof generation.illustrationTransforms === 'string' ? JSON.parse(generation.illustrationTransforms) : generation.illustrationTransforms);
          }

          // Restore advanced theme settings
          if (generation.themeType) setThemeType(generation.themeType);
          if (generation.selectedAdvancedTheme !== undefined && generation.selectedAdvancedTheme !== null) setSelectedAdvancedTheme(generation.selectedAdvancedTheme);
          if (generation.selectedDalleTheme !== undefined && generation.selectedDalleTheme !== null) setSelectedDalleTheme(generation.selectedDalleTheme);

          // Mark filters as completed to show the preview
          setFiltersCompleted(true);

          // Clear the sessionStorage
          sessionStorage.removeItem('viewGeneration');

          toast.success('Chargé depuis la bibliothèque!', {
            description: `${generation.cards.length} carte(s) restaurée(s)`
          });
        } catch (error) {
          console.error('Error loading generation from library:', error);
          toast.error('Erreur', {
            description: 'Impossible de charger la génération'
          });
          sessionStorage.removeItem('viewGeneration');
        }
      }
    };

    loadFromLibrary();
  }, []);

  const handleGenerate = async (
    cycleParam?: string,
    gradeParam?: string,
    subjectParam?: string,
    notionParam?: string,
    subNotionsParam?: string[],
    cardCountParam?: number
  ) => {
    setIsGenerating(true)
    setGenerationProgress(0)
    setGenerationMessage('Initialisation...')

    // Slower, more realistic progress animation for ~30-45 second generation
    let startTime = Date.now()
    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime

      setGenerationProgress(prev => {
        // Even slower logarithmic progression
        // 0-15% in first 5 seconds (slower start)
        if (elapsed < 5000) {
          return Math.min(15, (elapsed / 5000) * 15)
        }
        // 15-35% over next 10 seconds (slow steady)
        else if (elapsed < 15000) {
          return Math.min(35, 15 + ((elapsed - 5000) / 10000) * 20)
        }
        // 35-60% over next 10 seconds (middle phase)
        else if (elapsed < 25000) {
          return Math.min(60, 35 + ((elapsed - 15000) / 10000) * 25)
        }
        // 60-85% over next 10 seconds (slowing more)
        else if (elapsed < 35000) {
          return Math.min(85, 60 + ((elapsed - 25000) / 10000) * 25)
        }
        // 85-99% very slowly (crawl to finish)
        else {
          return Math.min(99, 85 + ((elapsed - 35000) / 20000) * 14)
        }
      })
    }, 300) // Update every 300ms for smoother animation

    // Update messages at realistic intervals for slower progress
    const messageTimeouts = [
      setTimeout(() => setGenerationMessage('Connexion au serveur...'), 2000),
      setTimeout(() => setGenerationMessage('Analyse des paramètres...'), 5000),
      setTimeout(() => setGenerationMessage('Génération des questions...'), 9000),
      setTimeout(() => setGenerationMessage('Création du contenu éducatif...'), 14000),
      setTimeout(() => setGenerationMessage('Adaptation pédagogique...'), 19000),
      setTimeout(() => setGenerationMessage('Validation des réponses...'), 24000),
      setTimeout(() => setGenerationMessage('Mise en forme des cartes...'), 29000),
      setTimeout(() => setGenerationMessage('Finalisation...'), 34000),
      setTimeout(() => setGenerationMessage('Presque terminé...'), 38000)
    ]

    // Rotate fun facts every 6 seconds (enough time to read)
    const tipInterval = setInterval(() => {
      setTipIndex(prev => (prev + 1) % tips.length)
    }, 6000)

    try {
      // Use parameters if provided, otherwise use state
      const cycle = cycleParam || selectedCycle
      const grade = gradeParam || selectedGrade
      const subject = subjectParam || selectedSubject
      const notion = notionParam || selectedNotion
      const subNotions = subNotionsParam || selectedSubNotions

      // Use cardCount parameter if provided, otherwise use state or input
      const cardCountInput = document.getElementById('card-count') as HTMLInputElement
      const count = cardCountParam || (cardCountInput ? parseInt(cardCountInput.value || '8') : cardCount)

      // Prepare the request body
      const requestBody = {
        cycle,
        grade,
        subject,
        notion,
        subNotions,
        count
      }

      console.log('Generating cards with:', requestBody)

      // Call the API
      const response = await fetch('/api/generate-cards', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      })

      const data = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to generate cards')
      }

      // Complete the progress
      clearInterval(progressInterval)
      clearInterval(tipInterval)
      messageTimeouts.forEach(timeout => clearTimeout(timeout))
      setGenerationProgress(100)
      setGenerationMessage('Terminé!')

      // Store the generated cards
      console.log('Generated cards:', data.data.cards)
      setGeneratedCards(data.data.cards)

    } catch (error) {
      clearInterval(progressInterval)
      clearInterval(tipInterval)
      messageTimeouts.forEach(timeout => clearTimeout(timeout))
      console.error('Error generating cards:', error)
      toast.error('Erreur lors de la génération', {
        description: error instanceof Error ? error.message : 'Une erreur inconnue est survenue',
        duration: 5000
      })
    } finally {
      setIsGenerating(false)
      // Reset progress after a short delay
      setTimeout(() => {
        setGenerationProgress(0)
        setGenerationMessage('')
      }, 500)
    }
  }


  // Check if generation can proceed
  const canGenerate = selectedCycle && selectedGrade && selectedSubject && selectedNotion

  // Create font settings object for CardRenderer
  const currentFont = getFontByValue(selectedFont)
  const fontSettings = {
    fontFamily: currentFont ? currentFont.googleFont : 'Inter',
    fontSize,
    fontWeight: isBold ? 700 : 400,
    isBold,
    isItalic,
    isUnderline,
    textAlign,
    textBackground
  }

  // Text editing handlers
  const handleTextPositionChange = (cardIndex: number, position: { x: number; y: number; width: number; height: number }) => {
    setTextPositions(prev => ({ ...prev, [cardIndex]: position }))
  }

  const handleTextChange = (cardIndex: number, newText: string) => {
    setEditedTexts(prev => ({ ...prev, [cardIndex]: newText }))
  }

  const handleEditModeChange = (cardIndex: number, isEditing: boolean) => {
    setActiveEditingCards(prev => {
      const newSet = new Set(prev)
      if (isEditing) {
        newSet.add(cardIndex)
      } else {
        newSet.delete(cardIndex)
      }
      return newSet
    })
  }

  const saveAllActiveEdits = () => {
    // Force save all currently active edits by clearing the active editing cards
    setActiveEditingCards(new Set())
  }

  const toggleTextEditMode = () => {
    if (isTextEditMode && activeEditingCards.size > 0) {
      // If turning off edit mode and there are active edits, save them first
      saveAllActiveEdits()
    }
    setIsTextEditMode(!isTextEditMode)
  }

  const handleBulkAction = (action: 'position' | 'size', sourceCardIndex: number) => {
    const sourceCard = generatedCards.find(card => card.number === sourceCardIndex)
    if (!sourceCard) {
      return
    }

    switch (action) {
      case 'position':
        const sourcePosition = textPositions[sourceCardIndex]
        if (sourcePosition) {
          const newPositions = { ...textPositions }
          generatedCards.forEach(card => {
            if (card.number !== sourceCardIndex) {
              // Keep existing size or use defaults if they don't exist
              const existingPosition = newPositions[card.number]
              newPositions[card.number] = {
                x: sourcePosition.x,
                y: sourcePosition.y,
                width: existingPosition?.width || 300,
                height: existingPosition?.height || 100
              }
            }
          })
          setTextPositions(newPositions)
        }
        break

      case 'size':
        const sourceSizePosition = textPositions[sourceCardIndex]
        if (sourceSizePosition) {
          const newPositions = { ...textPositions }
          generatedCards.forEach(card => {
            if (card.number !== sourceCardIndex) {
              // Keep existing position or use defaults if they don't exist
              const existingPosition = newPositions[card.number]
              newPositions[card.number] = {
                x: existingPosition?.x || 20,
                y: existingPosition?.y || 20,
                width: sourceSizePosition.width,
                height: sourceSizePosition.height
              }
            }
          })
          setTextPositions(newPositions)
        }
        break
    }
  }

  // Handle PDF download using browser print
  const handleDownloadPDFSimple = () => {
    // Close edit menu and switch to student cards
    setActiveEditingCards(new Set());
    setIsTextEditMode(false);
    setDisplayMode('studentCards');

    // Add print styles to the page
    const printStyles = document.createElement('style');
    printStyles.innerHTML = `
      @media print {
        @page {
          size: A4 landscape;
          margin: 0;
        }

        /* Hide all UI except cards */
        nav, header, footer, aside, .sidebar, button,
        [role="tablist"], .edit-menu, .controls {
          display: none !important;
        }

        /* Format cards for print - 2x2 grid per page */
        .grid {
          display: grid !important;
          grid-template-columns: repeat(2, 1fr) !important;
          width: 297mm !important;
          gap: 0 !important;
        }

        [data-card-id] {
          width: 148.5mm !important;
          height: 105mm !important;
          page-break-inside: avoid !important;
        }

        /* Page breaks every 4 cards */
        [data-card-id]:nth-child(4n) {
          page-break-after: always;
        }
      }
    `;
    document.head.appendChild(printStyles);

    // Trigger print dialog
    setTimeout(() => {
      window.print();
      // Remove print styles after printing
      setTimeout(() => {
        document.head.removeChild(printStyles);
      }, 1000);
    }, 500);
  };

  // Handle PDF download for student cards
  const handleDownloadPDF = async () => {
    setIsGeneratingPDF(true);
    setIsTextEditMode(false);
    setActiveEditingCards(new Set());
    await new Promise(resolve => setTimeout(resolve, 500));

    const success = await generateStudentCardsPDF({
      selectedSubject,
      generatedCards,
      displayMode: 'studentCards'
    });

    setIsGeneratingPDF(false);
  }

  // Handle PDF download for answer sheet
  const handleDownloadAnswerSheet = async () => {
    setIsGeneratingPDF(true);
    await generateAnswerSheetPDF({
      selectedSubject,
      generatedCards,
      displayMode: 'answerSheet'
    });
    setIsGeneratingPDF(false);
  };

  // Handle PDF download for corrigé
  const handleDownloadCorrige = async () => {
    setIsGeneratingPDF(true);
    await generateAnswerSheetPDF({
      selectedSubject,
      generatedCards,
      displayMode: 'corriger'
    });
    setIsGeneratingPDF(false);
  };

  const resetTextPositions = () => {
    setTextPositions({})
    setEditedTexts({})
  }

  // Illustration transform handlers
  const handleIllustrationTransformChange = (cardIndex: number, transform: { x: number; y: number; scale: number; rotation: number }) => {
    setIllustrationTransforms(prev => ({ ...prev, [cardIndex]: transform }))
  }

  // Save generation to library
  const handleSaveToLibrary = async () => {
    try {
      const response = await fetch('/api/library/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cycle: selectedCycle,
          grade: selectedGrade,
          subject: selectedSubject,
          notion: selectedNotion,
          subNotions: selectedSubNotions,
          cardCount: generatedCards.length,
          theme: selectedTheme.toString(),
          fontFamily: selectedFont,
          cards: generatedCards,
          // Text customizations
          textPositions,
          editedTexts,
          // Font settings
          fontSize,
          isBold,
          isItalic,
          isUnderline,
          textAlign,
          textBackground,
          // Illustration settings
          selectedCharacter,
          selectedMood,
          showIllustrations,
          illustrationScale,
          illustrationColor,
          transparentBackground,
          illustrationTransforms,
          // Advanced theme settings
          themeType,
          selectedAdvancedTheme,
          selectedDalleTheme
        }),
      })

      const data = await response.json()

      if (data.success) {
        toast.success('Sauvegardé!', {
          description: 'Génération ajoutée à votre bibliothèque'
        })
      } else {
        throw new Error(data.error)
      }
    } catch (error) {
      console.error('Error saving to library:', error)
      toast.error('Erreur', {
        description: error instanceof Error ? error.message : 'Impossible de sauvegarder'
      })
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <GoogleFontsLoader fontValue={selectedFont} weight={isBold ? 700 : 400} />
      <Navigation />

      {/* Main Content */}
      <div className="relative pt-20 pb-12 px-4">
        <div className="w-full max-w-full">
          {/* Header - Clean and minimal */}
          <div className="container mx-auto max-w-7xl mb-8">
            <h1 className="text-3xl font-display font-bold mb-2 text-foreground">
              Générateur de Cartes
            </h1>
            <p className="text-muted-foreground">
              Créez des cartes éducatives alignées au PFEQ
            </p>
          </div>

          {/* Progressive Filters - Full width when active */}
          {!filtersCompleted && (
            <motion.div
              className="mb-8"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ProgressiveFilters onFiltersComplete={handleFiltersComplete} />
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
                        <Sparkles className="h-16 w-16 text-primary" />
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
                      <div className="relative">
                        <Progress
                          value={generationProgress}
                          className="w-full h-3"
                        />
                        <motion.div
                          className="absolute top-0 left-0 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
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

                    {/* Fun facts or tips */}
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

          {/* Main Content Grid - Only show after filters completed */}
          {filtersCompleted && (
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Left Panel - Customization */}
              <div className="no-print lg:w-80 flex-shrink-0">
                <Card className="h-fit border shadow-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings2 className="h-5 w-5" />
                      Personnalisation
                    </CardTitle>
                    <CardDescription>
                      Configurez l'apparence et les options de vos cartes
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">

                    {/* Theme Selection */}
                    <CollapsibleSection
                      title="Thèmes"
                      icon={<Palette className="h-4 w-4" />}
                      defaultOpen={false}
                    >
                      <div className="px-6">
                    {/* Theme Selector with visual previews */}
                    <ThemeSelector
                      selectedTheme={selectedTheme}
                      selectedAdvancedTheme={selectedAdvancedTheme}
                      selectedDalleTheme={selectedDalleTheme}
                      themeType={themeType}
                      onThemeChange={setSelectedTheme}
                      onAdvancedThemeChange={setSelectedAdvancedTheme}
                      onDalleThemeChange={setSelectedDalleTheme}
                      onThemeTypeChange={setThemeType}
                      themes={{
                        standard: allCardThemes,
                        advanced: advancedCreativeThemes,
                        dalle: dallePoweredThemes
                      }}
                    />
                      </div>
                    </CollapsibleSection>

                    {/* Font Customization */}
                    <CollapsibleSection
                      title="Police & Texte"
                      icon={<Type className="h-4 w-4" />}
                      defaultOpen={false}
                    >
                      <div className="px-6">
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

                        {/* Text Edition Mode - Moved to Font Section */}
                        <div className="mt-4 pt-4 border-t space-y-4">
                          {/* Toggle Edit Mode */}
                          <div className="flex items-center justify-between">
                            <label className="text-sm font-medium">Mode édition</label>
                            <div className="flex items-center gap-2">
                              <Button
                                variant={isTextEditMode ? "default" : "outline"}
                                size="sm"
                                onClick={toggleTextEditMode}
                                className="flex items-center gap-2"
                              >
                                <Edit3 className="h-4 w-4" />
                                {isTextEditMode ? "Actif" : "Inactif"}
                              </Button>
                            </div>
                          </div>

                          {/* Reset Button */}
                          {isTextEditMode && (
                            <div className="pt-2 border-t">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={resetTextPositions}
                                className="w-full flex items-center gap-2"
                              >
                                <RotateCcw className="h-4 w-4" />
                                Réinitialiser positions
                              </Button>
                            </div>
                          )}

                          {/* Text Background Transparency */}
                          {isTextEditMode && (
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <label className="text-sm font-medium">Transparence du fond</label>
                                <span className="text-xs text-gray-500">{textBackground}%</span>
                              </div>
                              <Slider
                                value={[textBackground]}
                                onValueChange={(value) => setTextBackground(value[0])}
                                max={100}
                                min={0}
                                step={5}
                                className="w-full"
                              />
                              <div className="flex justify-between text-xs text-gray-500">
                                <span>Transparent</span>
                                <span>Opaque</span>
                              </div>
                            </div>
                          )}

                          {/* Instructions */}
                          {isTextEditMode && (
                            <div className="bg-blue-50 dark:bg-blue-950 p-3 rounded-lg border border-blue-200 dark:border-blue-800">
                              <p className="text-sm text-blue-800 dark:text-blue-200">
                                <strong>Mode édition activé:</strong>
                              </p>
                              <ul className="text-xs text-blue-700 dark:text-blue-300 mt-1 space-y-1">
                                <li>• Survolez une carte pour voir les contrôles</li>
                                <li>• Cliquez sur l'icône ✏️ pour éditer le texte</li>
                                <li>• Glissez avec la barre bleue pour déplacer</li>
                                <li>• Utilisez le coin pour redimensionner</li>
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    </CollapsibleSection>

                    {/* Images */}
                    <CollapsibleSection
                      title="Images"
                      icon={<Image className="h-4 w-4" />}
                      defaultOpen={false}
                    >
                      <div className="px-6">
                        <KawaiiSelector
                          selectedCharacter={selectedCharacter}
                          onCharacterChange={setSelectedCharacter}
                          selectedMood={selectedMood}
                          onMoodChange={setSelectedMood}
                          showIllustrations={showIllustrations}
                          onShowIllustrationsChange={setShowIllustrations}
                          illustrationScale={illustrationScale}
                          onIllustrationScaleChange={setIllustrationScale}
                          transparentBackground={transparentBackground}
                          onTransparentBackgroundChange={setTransparentBackground}
                          illustrationColor={illustrationColor}
                          onIllustrationColorChange={setIllustrationColor}
                        />
                      </div>
                    </CollapsibleSection>
                  </CardContent>
                </Card>
              </div>

            {/* Right Panel - Preview and Results */}
            <div className="flex-1 min-w-0">
              <Card className="h-full overflow-hidden border shadow-sm">
                <CardHeader className="no-print">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Eye className="h-5 w-5" />
                      <span className="text-lg font-semibold">Aperçu</span>
                      {generatedCards.length > 0 && (
                        <Badge variant="secondary" className="ml-2">{generatedCards.length} cartes</Badge>
                      )}
                    </div>

                    {/* Configuration and controls row */}
                    {generatedCards.length > 0 && (
                      <div className="flex items-center gap-4">
                        {/* Current configuration */}
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 dark:bg-gray-900/50 rounded-md border border-gray-200 dark:border-gray-700">
                          <div className="text-xs text-gray-600 dark:text-gray-400">
                            <span className="font-medium">{getGradesForCycle(selectedCycle).find(g => g.key === selectedGrade)?.label}</span>
                            <span className="mx-1 text-gray-400">•</span>
                            <span>{getSubjectsForCycle(selectedCycle).find(s => s.key === selectedSubject)?.label}</span>
                            <span className="mx-1 text-gray-400">•</span>
                            <span>{getNotionsForSubjectAndCycle(selectedSubject, selectedCycle).find(n => n.key === selectedNotion)?.label}</span>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 px-2 ml-2"
                            onClick={() => {
                              setFiltersCompleted(false)
                              setSelectedCycle('')
                              setSelectedGrade('')
                              setSelectedSubject('')
                              setSelectedNotion('')
                              setSelectedSubNotions([])
                              setGeneratedCards([])
                            }}
                            title="Modifier les filtres"
                          >
                            <RefreshCw className="h-3 w-3" />
                          </Button>
                        </div>

                        {/* Size slider */}
                        <div className="flex items-center gap-3">
                          <Label htmlFor="preview-scale" className="text-sm font-normal text-slate-600 dark:text-slate-400">
                            Taille:
                          </Label>
                          <Slider
                            id="preview-scale"
                            min={0.3}
                            max={1.5}
                            step={0.1}
                            value={previewScale}
                            onValueChange={setPreviewScale}
                            className="w-32"
                          />
                          <span className="text-sm text-slate-600 dark:text-slate-400 min-w-[3rem]">
                            {Math.round(previewScale[0] * 100)}%
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <Tabs defaultValue="studentCards" className="w-full" onValueChange={(value) => setDisplayMode(value as any)}>
                    <div className="flex items-center justify-between mx-6 mt-0 gap-4">
                      <TabsList className="grid grid-cols-3 flex-1">
                        <TabsTrigger value="studentCards">Cartes Élève</TabsTrigger>
                        <TabsTrigger value="answerSheet">Feuille Réponses</TabsTrigger>
                        <TabsTrigger value="corriger">Corrigé</TabsTrigger>
                      </TabsList>
                      {generatedCards.length > 0 && (
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
                            onClick={() => {
                              if (displayMode === 'studentCards') {
                                handleDownloadPDF();
                              } else if (displayMode === 'answerSheet') {
                                handleDownloadAnswerSheet();
                              } else if (displayMode === 'corriger') {
                                handleDownloadCorrige();
                              }
                            }}
                            size="sm"
                            className="gap-2"
                            variant="default"
                            disabled={isGeneratingPDF}
                          >
                            {isGeneratingPDF ? (
                              <>
                                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                Génération...
                              </>
                            ) : (
                              <>
                                <Download className="h-4 w-4" />
                                Télécharger PDF
                              </>
                            )}
                          </Button>
                        </div>
                      )}
                    </div>

                    <TabsContent value="studentCards" className="mt-6 overflow-auto max-h-[80vh] px-6 pb-6" style={{ overflowX: 'auto' }}>
                      {!isGenerating && generationProgress === 0 && generatedCards.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20 text-center">
                          <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-full mb-4">
                            <GraduationCap className="h-12 w-12 text-slate-400" />
                          </div>
                          <h3 className="text-lg font-semibold mb-2">Prêt à créer!</h3>
                          <p className="text-slate-600 dark:text-slate-400 max-w-sm">
                            Modifiez vos paramètres de filtrage pour générer de nouvelles cartes
                          </p>
                        </div>
                      ) : isGenerating ? (
                        <div className="flex flex-col items-center justify-center py-20">
                          <div className="animate-pulse space-y-4 w-full max-w-md">
                            <div className="h-32 bg-slate-200 dark:bg-slate-700 rounded-lg"></div>
                            <div className="h-32 bg-slate-200 dark:bg-slate-700 rounded-lg"></div>
                          </div>
                        </div>
                      ) : generatedCards.length > 0 ? (
                        <CardRenderer
                          cards={generatedCards}
                          displayMode="studentCards"
                          selectedCardTheme={
                            themeType === 'standard' ? (selectedTheme === -1 ? 'auto' : selectedTheme) :
                            themeType === 'advanced' ? -2 :
                            themeType === 'dalle' ? -3 : -4
                          }
                          selectedAdvancedTheme={themeType === 'advanced' ? selectedAdvancedTheme : null}
                          selectedDalleTheme={themeType === 'dalle' ? selectedDalleTheme : null}
                          dalleImages={dalleImages}
                          showIllustrations={showIllustrations}
                          globalCharacterScale={illustrationScale}
                          visualScale={100}
                          transparentBackground={transparentBackground}
                          characterTheme={getCharacterTheme(selectedCharacter) as any}
                          characterMood={selectedMood}
                          characterColor={illustrationColor}
                          isDraggableIllustrations={!isPrintLocked}
                          manualScale={previewScale[0]}
                          questionContainerOpacity={90}
                          fontSettings={fontSettings}
                          isDraggableText={isTextEditMode}
                          textPositions={textPositions}
                          onTextPositionChange={handleTextPositionChange}
                          editedTexts={editedTexts}
                          onTextChange={handleTextChange}
                          onEditModeChange={handleEditModeChange}
                          onBulkAction={handleBulkAction}
                          illustrationTransforms={illustrationTransforms}
                          onIllustrationTransformChange={handleIllustrationTransformChange}
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center py-20 text-center">
                          <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-full mb-4">
                            <Sparkles className="h-12 w-12 text-slate-400" />
                          </div>
                          <h3 className="text-lg font-semibold mb-2">Cartes générées!</h3>
                          <p className="text-slate-600 dark:text-slate-400 max-w-sm">
                            Vos cartes ont été générées avec succès. Utilisez les boutons ci-dessus pour sauvegarder ou partager.
                          </p>
                        </div>
                      )}
                    </TabsContent>

                    <TabsContent value="answerSheet" className="mt-6 overflow-x-auto overflow-y-auto max-h-[80vh] px-6 pb-6">
                      {generatedCards.length > 0 ? (
                        <CardDisplayV4 cards={generatedCards} displayMode="answerSheet" theme={getAllThemeByIndex(selectedTheme)} selectedCardTheme={selectedTheme === -1 ? 'auto' : selectedTheme} fontSettings={fontSettings} />
                      ) : (
                        <div className="text-center py-20 text-slate-600 dark:text-slate-400">
                          Générez des cartes pour voir la feuille de réponses
                        </div>
                      )}
                    </TabsContent>

                    <TabsContent value="corriger" className="mt-6 overflow-x-auto overflow-y-auto max-h-[80vh] px-6 pb-6">
                      {generatedCards.length > 0 ? (
                        <CardDisplayV4 cards={generatedCards} displayMode="corriger" theme={getAllThemeByIndex(selectedTheme)} selectedCardTheme={selectedTheme === -1 ? 'auto' : selectedTheme} fontSettings={fontSettings} />
                      ) : (
                        <div className="text-center py-20 text-slate-600 dark:text-slate-400">
                          Générez des cartes pour voir le corrigé
                        </div>
                      )}
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </div>
          )}
        </div>
      </div>
    </div>
  )
}