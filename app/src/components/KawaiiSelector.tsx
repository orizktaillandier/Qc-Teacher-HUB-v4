'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Slider } from '@/components/ui/slider'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ChevronDown,
  Check,
  Image as ImageIcon,
  Smile,
  Frown,
  Heart,
  Zap,
  Star,
  Meh,
  X
} from 'lucide-react'
import * as PhosphorIcons from '@phosphor-icons/react/dist/ssr'
import * as GameIcons from 'react-icons/gi'
import { cn } from '@/lib/utils'
import {
  Ghost,
  IceCream,
  Planet,
  Backpack,
  Cat,
  Mug,
  Browser,
  Chocolate,
  File,
  CreditCard,
  SpeechBubble,
  Astronaut,
  Cyborg,
  Folder,
  HumanCat,
  HumanDinosaur
} from 'react-kawaii'

// Available moods for kawaii characters
export type KawaiiMood = 'sad' | 'shocked' | 'happy' | 'blissful' | 'lovestruck' | 'excited' | 'ko'

// Character definitions
export interface KawaiiCharacter {
  id: string
  name: string
  component: any
  emoji: string
}

export const kawaiiCharacters: KawaiiCharacter[] = [
  { id: 'cat', name: 'Chat', component: Cat, emoji: '🐱' },
  { id: 'ghost', name: 'Fantôme', component: Ghost, emoji: '👻' },
  { id: 'icecream', name: 'Crème glacée', component: IceCream, emoji: '🍦' },
  { id: 'planet', name: 'Planète', component: Planet, emoji: '🪐' },
  { id: 'backpack', name: 'Sac à dos', component: Backpack, emoji: '🎒' },
  { id: 'mug', name: 'Tasse', component: Mug, emoji: '☕' },
  { id: 'browser', name: 'Navigateur', component: Browser, emoji: '💻' },
  { id: 'chocolate', name: 'Chocolat', component: Chocolate, emoji: '🍫' },
  { id: 'file', name: 'Fichier', component: File, emoji: '📄' },
  { id: 'creditcard', name: 'Carte', component: CreditCard, emoji: '💳' },
  { id: 'speechbubble', name: 'Bulle', component: SpeechBubble, emoji: '💬' },
  { id: 'astronaut', name: 'Astronaute', component: Astronaut, emoji: '🚀' },
  { id: 'cyborg', name: 'Cyborg', component: Cyborg, emoji: '🤖' },
  { id: 'folder', name: 'Dossier', component: Folder, emoji: '📁' },
  { id: 'humancat', name: 'Chat Costume', component: HumanCat, emoji: '🐱👤' },
  { id: 'humandinosaur', name: 'Dino Costume', component: HumanDinosaur, emoji: '🦕' }
]

// Mood definitions with icons
export const kawaiiMoods: { id: KawaiiMood; name: string; icon: any; color: string }[] = [
  { id: 'happy', name: 'Heureux', icon: Smile, color: '#22c55e' },
  { id: 'excited', name: 'Excité', icon: Zap, color: '#f59e0b' },
  { id: 'blissful', name: 'Béat', icon: Heart, color: '#ec4899' },
  { id: 'lovestruck', name: 'Amoureux', icon: Star, color: '#ef4444' },
  { id: 'sad', name: 'Triste', icon: Frown, color: '#6b7280' },
  { id: 'shocked', name: 'Choqué', icon: Meh, color: '#8b5cf6' },
  { id: 'ko', name: 'KO', icon: X, color: '#dc2626' }
]

// Icon definition interface
export interface IconDefinition {
  id: string
  name: string
  component: any
  category: string
}

// Phosphor Icons - Educational & Kid-Friendly
export const phosphorIcons: IconDefinition[] = [
  // Learning & Education
  { id: 'ph-book', name: 'Livre', component: PhosphorIcons.Book, category: 'Éducation' },
  { id: 'ph-bookopen', name: 'Livre ouvert', component: PhosphorIcons.BookOpen, category: 'Éducation' },
  { id: 'ph-student', name: 'Étudiant', component: PhosphorIcons.Student, category: 'Éducation' },
  { id: 'ph-chalkboard', name: 'Tableau', component: PhosphorIcons.Chalkboard, category: 'Éducation' },
  { id: 'ph-pencil', name: 'Crayon', component: PhosphorIcons.Pencil, category: 'Éducation' },
  { id: 'ph-brain', name: 'Cerveau', component: PhosphorIcons.Brain, category: 'Éducation' },
  { id: 'ph-lightbulb', name: 'Ampoule', component: PhosphorIcons.Lightbulb, category: 'Éducation' },
  { id: 'ph-graduationcap', name: 'Diplôme', component: PhosphorIcons.GraduationCap, category: 'Éducation' },

  // Science & Math
  { id: 'ph-mathoperations', name: 'Maths', component: PhosphorIcons.MathOperations, category: 'Math & Science' },
  { id: 'ph-atom', name: 'Atome', component: PhosphorIcons.Atom, category: 'Math & Science' },
  { id: 'ph-dna', name: 'ADN', component: PhosphorIcons.Dna, category: 'Math & Science' },
  { id: 'ph-planet', name: 'Planète', component: PhosphorIcons.Planet, category: 'Math & Science' },
  { id: 'ph-microscope', name: 'Microscope', component: PhosphorIcons.Microscope, category: 'Math & Science' },
  { id: 'ph-flask', name: 'Fiole', component: PhosphorIcons.Flask, category: 'Math & Science' },

  // Arts & Creativity
  { id: 'ph-paintbrush', name: 'Pinceau', component: PhosphorIcons.PaintBrush, category: 'Arts' },
  { id: 'ph-musicnote', name: 'Note musique', component: PhosphorIcons.MusicNote, category: 'Arts' },
  { id: 'ph-palette', name: 'Palette', component: PhosphorIcons.Palette, category: 'Arts' },

  // Achievement & Motivation
  { id: 'ph-trophy', name: 'Trophée', component: PhosphorIcons.Trophy, category: 'Récompenses' },
  { id: 'ph-medal', name: 'Médaille', component: PhosphorIcons.Medal, category: 'Récompenses' },
  { id: 'ph-crown', name: 'Couronne', component: PhosphorIcons.Crown, category: 'Récompenses' },
  { id: 'ph-star', name: 'Étoile', component: PhosphorIcons.Star, category: 'Récompenses' },
  { id: 'ph-certificate', name: 'Certificat', component: PhosphorIcons.Certificate, category: 'Récompenses' },

  // Goals & Progress
  { id: 'ph-target', name: 'Cible', component: PhosphorIcons.Target, category: 'Progrès' },
  { id: 'ph-rocket', name: 'Fusée', component: PhosphorIcons.Rocket, category: 'Progrès' },
  { id: 'ph-flag', name: 'Drapeau', component: PhosphorIcons.Flag, category: 'Progrès' },
  { id: 'ph-chartline', name: 'Graphique', component: PhosphorIcons.ChartLine, category: 'Progrès' },

  // Feedback
  { id: 'ph-checkcircle', name: 'Correct', component: PhosphorIcons.CheckCircle, category: 'Feedback' },
  { id: 'ph-xcircle', name: 'Incorrect', component: PhosphorIcons.XCircle, category: 'Feedback' },
  { id: 'ph-warning', name: 'Attention', component: PhosphorIcons.Warning, category: 'Feedback' },
  { id: 'ph-question', name: 'Question', component: PhosphorIcons.Question, category: 'Feedback' },
  { id: 'ph-info', name: 'Info', component: PhosphorIcons.Info, category: 'Feedback' },

  // Fun & Animals
  { id: 'ph-heart', name: 'Cœur', component: PhosphorIcons.Heart, category: 'Fun' },
  { id: 'ph-smiley', name: 'Sourire', component: PhosphorIcons.Smiley, category: 'Fun' },
  { id: 'ph-cat', name: 'Chat', component: PhosphorIcons.Cat, category: 'Fun' },
  { id: 'ph-dog', name: 'Chien', component: PhosphorIcons.Dog, category: 'Fun' },
  { id: 'ph-butterfly', name: 'Papillon', component: PhosphorIcons.Butterfly, category: 'Fun' }
]

// Educational Emoji List - Fun & Colorful for Kids
interface EmojiDefinition {
  id: string
  name: string
  emoji: string
  category: string
}

export const educationalEmojis: EmojiDefinition[] = [
  // Learning & School
  { id: 'emoji-book', name: 'Livre', emoji: '📖', category: 'Éducation' },
  { id: 'emoji-pencil', name: 'Crayon', emoji: '✏️', category: 'Éducation' },
  { id: 'emoji-pen', name: 'Stylo', emoji: '🖊️', category: 'Éducation' },
  { id: 'emoji-backpack', name: 'Sac d\'école', emoji: '🎒', category: 'Éducation' },
  { id: 'emoji-graduation', name: 'Diplôme', emoji: '🎓', category: 'Éducation' },
  { id: 'emoji-apple', name: 'Pomme', emoji: '🍎', category: 'Éducation' },
  { id: 'emoji-teacher', name: 'Enseignant', emoji: '👨‍🏫', category: 'Éducation' },
  { id: 'emoji-student', name: 'Étudiant', emoji: '🧑‍🎓', category: 'Éducation' },

  // Science & Math
  { id: 'emoji-microscope', name: 'Microscope', emoji: '🔬', category: 'Math & Science' },
  { id: 'emoji-telescope', name: 'Télescope', emoji: '🔭', category: 'Math & Science' },
  { id: 'emoji-dna', name: 'ADN', emoji: '🧬', category: 'Math & Science' },
  { id: 'emoji-magnet', name: 'Aimant', emoji: '🧲', category: 'Math & Science' },
  { id: 'emoji-atom', name: 'Atome', emoji: '⚛️', category: 'Math & Science' },
  { id: 'emoji-robot', name: 'Robot', emoji: '🤖', category: 'Math & Science' },
  { id: 'emoji-rocket', name: 'Fusée', emoji: '🚀', category: 'Math & Science' },
  { id: 'emoji-planet', name: 'Planète', emoji: '🪐', category: 'Math & Science' },
  { id: 'emoji-earth', name: 'Terre', emoji: '🌍', category: 'Math & Science' },
  { id: 'emoji-moon', name: 'Lune', emoji: '🌙', category: 'Math & Science' },

  // Arts & Creativity
  { id: 'emoji-art', name: 'Palette', emoji: '🎨', category: 'Arts' },
  { id: 'emoji-music', name: 'Note musique', emoji: '🎵', category: 'Arts' },
  { id: 'emoji-guitar', name: 'Guitare', emoji: '🎸', category: 'Arts' },
  { id: 'emoji-paint', name: 'Pinceau', emoji: '🖌️', category: 'Arts' },
  { id: 'emoji-camera', name: 'Caméra', emoji: '📷', category: 'Arts' },

  // Achievement & Rewards
  { id: 'emoji-trophy', name: 'Trophée', emoji: '🏆', category: 'Récompenses' },
  { id: 'emoji-medal', name: 'Médaille', emoji: '🏅', category: 'Récompenses' },
  { id: 'emoji-star', name: 'Étoile', emoji: '⭐', category: 'Récompenses' },
  { id: 'emoji-sparkles', name: 'Étincelles', emoji: '✨', category: 'Récompenses' },
  { id: 'emoji-crown', name: 'Couronne', emoji: '👑', category: 'Récompenses' },
  { id: 'emoji-gift', name: 'Cadeau', emoji: '🎁', category: 'Récompenses' },

  // Feedback & Emotions
  { id: 'emoji-check', name: 'Correct', emoji: '✅', category: 'Feedback' },
  { id: 'emoji-x', name: 'Incorrect', emoji: '❌', category: 'Feedback' },
  { id: 'emoji-warning', name: 'Attention', emoji: '⚠️', category: 'Feedback' },
  { id: 'emoji-question', name: 'Question', emoji: '❓', category: 'Feedback' },
  { id: 'emoji-lightbulb', name: 'Idée', emoji: '💡', category: 'Feedback' },
  { id: 'emoji-thumbsup', name: 'Bravo', emoji: '👍', category: 'Feedback' },

  // Fun & Animals
  { id: 'emoji-smile', name: 'Sourire', emoji: '😊', category: 'Fun' },
  { id: 'emoji-heart', name: 'Cœur', emoji: '❤️', category: 'Fun' },
  { id: 'emoji-rainbow', name: 'Arc-en-ciel', emoji: '🌈', category: 'Fun' },
  { id: 'emoji-sun', name: 'Soleil', emoji: '☀️', category: 'Fun' },
  { id: 'emoji-flower', name: 'Fleur', emoji: '🌸', category: 'Fun' },
  { id: 'emoji-tree', name: 'Arbre', emoji: '🌳', category: 'Fun' },
  { id: 'emoji-cat', name: 'Chat', emoji: '🐱', category: 'Fun' },
  { id: 'emoji-dog', name: 'Chien', emoji: '🐶', category: 'Fun' },
  { id: 'emoji-bear', name: 'Ours', emoji: '🐻', category: 'Fun' },
  { id: 'emoji-butterfly', name: 'Papillon', emoji: '🦋', category: 'Fun' }
]

// Game Icons - Fun & Playful for Kids
export const gameIcons: IconDefinition[] = [
  // Learning & Education
  { id: 'gi-brain', name: 'Cerveau', component: GameIcons.GiBrain, category: 'Éducation' },

  // Science & Math
  { id: 'gi-atom', name: 'Atome', component: GameIcons.GiAtom, category: 'Math & Science' },
  { id: 'gi-rocket', name: 'Fusée', component: GameIcons.GiRocket, category: 'Math & Science' },

  // Arts & Music
  { id: 'gi-palette', name: 'Palette', component: GameIcons.GiPalette, category: 'Arts' },
  { id: 'gi-paintbrush', name: 'Pinceau', component: GameIcons.GiPaintBrush, category: 'Arts' },
  { id: 'gi-guitar', name: 'Guitare', component: GameIcons.GiGuitar, category: 'Arts' },
  { id: 'gi-musicalnote', name: 'Note musique', component: GameIcons.GiMusicalNotes, category: 'Arts' },

  // Achievement & Rewards
  { id: 'gi-trophy', name: 'Trophée', component: GameIcons.GiTrophy, category: 'Récompenses' },
  { id: 'gi-medal', name: 'Médaille', component: GameIcons.GiMedal, category: 'Récompenses' },
  { id: 'gi-crown', name: 'Couronne', component: GameIcons.GiCrown, category: 'Récompenses' },

  // Nature & Animals
  { id: 'gi-butterfly', name: 'Papillon', component: GameIcons.GiButterfly, category: 'Nature' },
  { id: 'gi-sun', name: 'Soleil', component: GameIcons.GiSun, category: 'Nature' },
  { id: 'gi-moon', name: 'Lune', component: GameIcons.GiMoon, category: 'Nature' },

  // Fun Characters
  { id: 'gi-unicorn', name: 'Licorne', component: GameIcons.GiUnicorn, category: 'Fun' },
  { id: 'gi-dragonhead', name: 'Dragon', component: GameIcons.GiDragonHead, category: 'Fun' },
  { id: 'gi-wizardface', name: 'Magicien', component: GameIcons.GiWizardFace, category: 'Fun' }
]

interface KawaiiSelectorProps {
  // Character settings
  selectedCharacter: string
  onCharacterChange: (character: string) => void
  selectedMood: KawaiiMood
  onMoodChange: (mood: KawaiiMood) => void

  // Basic controls
  showIllustrations: boolean
  onShowIllustrationsChange: (show: boolean) => void
  illustrationScale: number
  onIllustrationScaleChange: (scale: number) => void
  transparentBackground: boolean
  onTransparentBackgroundChange: (transparent: boolean) => void

  // Advanced controls (optional)
  illustrationColor?: string
  onIllustrationColorChange?: (color: string) => void
}

export function KawaiiSelector({
  selectedCharacter,
  onCharacterChange,
  selectedMood,
  onMoodChange,
  showIllustrations,
  onShowIllustrationsChange,
  illustrationScale,
  onIllustrationScaleChange,
  transparentBackground,
  onTransparentBackgroundChange,
  illustrationColor = '#3b82f6',
  onIllustrationColorChange
}: KawaiiSelectorProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [showAdvanced, setShowAdvanced] = useState(false)

  const currentCharacter = kawaiiCharacters.find(c => c.id === selectedCharacter) || kawaiiCharacters[0]
  const currentMood = kawaiiMoods.find(m => m.id === selectedMood) || kawaiiMoods[0]

  // Get the character component for preview
  const CharacterComponent = currentCharacter.component

  return (
    <div className="w-full space-y-4">
      {/* Current Character Selection Button */}
      <Button
        variant="outline"
        className={cn(
          "w-full justify-between text-left font-normal h-auto py-2",
          isExpanded && "ring-2 ring-primary"
        )}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3 flex-1">
          <div className={cn(
            "w-8 h-8 rounded-lg bg-gradient-to-br flex items-center justify-center text-white",
            "from-purple-500 to-pink-500"
          )}>
            <ImageIcon className="h-3.5 w-3.5" />
          </div>
          <div className="flex-1">
            <p className="text-xs text-muted-foreground">Personnage actuel</p>
            <p className="text-sm font-medium">{currentCharacter.emoji} {currentCharacter.name}</p>
          </div>
          {/* Mini character preview */}
          <div className="w-8 h-8 flex items-center justify-center">
            <CharacterComponent size={24} mood={selectedMood} color={illustrationColor} />
          </div>
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </motion.div>
      </Button>

      {/* Expanded Kawaii Selector */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <Card className="p-4 border-2">
              {/* Library Tabs */}
              <Tabs defaultValue="kawaii" className="w-full">
                <TabsList className="grid w-full grid-cols-4 mb-4">
                  <TabsTrigger value="kawaii">Kawaii</TabsTrigger>
                  <TabsTrigger value="phosphor">Phosphor</TabsTrigger>
                  <TabsTrigger value="emoji">Emoji</TabsTrigger>
                  <TabsTrigger value="game">Game</TabsTrigger>
                </TabsList>
                {/* Kawaii Characters Tab */}
                <TabsContent value="kawaii">
                  <div className="space-y-3 mb-4">
                    <h4 className="text-sm font-medium">Choisir un personnage kawaii</h4>
                    <ScrollArea className="h-[200px] w-full rounded-lg border bg-gray-50/50 dark:bg-gray-900/50">
                      <div className="p-2 grid grid-cols-2 gap-2">
                        {kawaiiCharacters.map((character) => {
                          const isSelected = selectedCharacter === character.id
                          const CharComp = character.component

                          return (
                            <button
                              key={character.id}
                              onClick={() => onCharacterChange(character.id)}
                              className={cn(
                                "p-3 rounded-md transition-all border flex flex-col items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-800",
                                isSelected && "bg-primary/10 border-primary text-primary dark:bg-primary/20 font-medium"
                              )}
                            >
                              <CharComp size={32} mood={selectedMood} color={illustrationColor} />
                              <span className="text-xs text-center">{character.emoji} {character.name}</span>
                              {isSelected && (
                                <Check className="h-3 w-3 text-primary" />
                              )}
                            </button>
                          )
                        })}
                      </div>
                    </ScrollArea>
                  </div>
                </TabsContent>

                {/* Phosphor Icons Tab */}
                <TabsContent value="phosphor">
                  <div className="space-y-3 mb-4">
                    <h4 className="text-sm font-medium">Icônes Phosphor ({phosphorIcons.length} icônes)</h4>
                    <ScrollArea className="h-[300px] w-full rounded-lg border bg-gray-50/50 dark:bg-gray-900/50">
                      <div className="p-2">
                        {/* Group by category */}
                        {Array.from(new Set(phosphorIcons.map(icon => icon.category))).map(category => {
                          const categoryIcons = phosphorIcons.filter(icon => icon.category === category)
                          return (
                            <div key={category} className="mb-4">
                              <h5 className="text-xs font-medium text-muted-foreground mb-2 px-2">{category}</h5>
                              <div className="grid grid-cols-3 gap-2">
                                {categoryIcons.map((icon) => {
                                  const isSelected = selectedCharacter === icon.id
                                  const IconComp = icon.component

                                  return (
                                    <button
                                      key={icon.id}
                                      onClick={() => onCharacterChange(icon.id)}
                                      className={cn(
                                        "p-3 rounded-md transition-all border flex flex-col items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-800",
                                        isSelected && "bg-primary/10 border-primary text-primary dark:bg-primary/20 font-medium"
                                      )}
                                    >
                                      <IconComp size={28} weight="duotone" color={illustrationColor} />
                                      <span className="text-xs text-center">{icon.name}</span>
                                      {isSelected && (
                                        <Check className="h-3 w-3 text-primary" />
                                      )}
                                    </button>
                                  )
                                })}
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </ScrollArea>
                  </div>
                </TabsContent>

                {/* Emoji Tab - Colorful Educational Emoji */}
                <TabsContent value="emoji">
                  <div className="space-y-3 mb-4">
                    <h4 className="text-sm font-medium">Emoji colorés ({educationalEmojis.length} emoji)</h4>
                    <ScrollArea className="h-[300px] w-full rounded-lg border bg-gray-50/50 dark:bg-gray-900/50">
                      <div className="p-2">
                        {/* Group by category */}
                        {Array.from(new Set(educationalEmojis.map(emoji => emoji.category))).map(category => {
                          const categoryEmojis = educationalEmojis.filter(emoji => emoji.category === category)
                          return (
                            <div key={category} className="mb-4">
                              <h5 className="text-xs font-medium text-muted-foreground mb-2 px-2">{category}</h5>
                              <div className="grid grid-cols-4 gap-2">
                                {categoryEmojis.map((emojiItem) => {
                                  const isSelected = selectedCharacter === emojiItem.id

                                  return (
                                    <button
                                      key={emojiItem.id}
                                      onClick={() => onCharacterChange(emojiItem.id)}
                                      className={cn(
                                        "p-3 rounded-md transition-all border flex flex-col items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-800",
                                        isSelected && "bg-primary/10 border-primary text-primary dark:bg-primary/20 font-medium"
                                      )}
                                    >
                                      <span className="text-2xl">{emojiItem.emoji}</span>
                                      <span className="text-xs text-center">{emojiItem.name}</span>
                                      {isSelected && (
                                        <Check className="h-3 w-3 text-primary" />
                                      )}
                                    </button>
                                  )
                                })}
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </ScrollArea>
                  </div>
                </TabsContent>

                {/* Game Icons Tab - Fun & Playful */}
                <TabsContent value="game">
                  <div className="space-y-3 mb-4">
                    <h4 className="text-sm font-medium">Game Icons ludiques ({gameIcons.length} icônes)</h4>
                    <ScrollArea className="h-[300px] w-full rounded-lg border bg-gray-50/50 dark:bg-gray-900/50">
                      <div className="p-2">
                        {/* Group by category */}
                        {Array.from(new Set(gameIcons.map(icon => icon.category))).map(category => {
                          const categoryIcons = gameIcons.filter(icon => icon.category === category)
                          return (
                            <div key={category} className="mb-4">
                              <h5 className="text-xs font-medium text-muted-foreground mb-2 px-2">{category}</h5>
                              <div className="grid grid-cols-3 gap-2">
                                {categoryIcons.map((icon) => {
                                  const isSelected = selectedCharacter === icon.id
                                  const IconComp = icon.component

                                  return (
                                    <button
                                      key={icon.id}
                                      onClick={() => onCharacterChange(icon.id)}
                                      className={cn(
                                        "p-3 rounded-md transition-all border flex flex-col items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-800",
                                        isSelected && "bg-primary/10 border-primary text-primary dark:bg-primary/20 font-medium"
                                      )}
                                    >
                                      <IconComp size={28} color={illustrationColor} />
                                      <span className="text-xs text-center">{icon.name}</span>
                                      {isSelected && (
                                        <Check className="h-3 w-3 text-primary" />
                                      )}
                                    </button>
                                  )
                                })}
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </ScrollArea>
                  </div>
                </TabsContent>
              </Tabs>

              {/* Color Selection */}
              {onIllustrationColorChange && (
                <div className="space-y-3 mb-4">
                  <h4 className="text-sm font-medium">Couleur du personnage</h4>
                  <div className="flex gap-2 justify-center">
                    {['#3b82f6', '#ef4444', '#22c55e', '#f59e0b', '#8b5cf6', '#ec4899'].map((color) => (
                      <button
                        key={color}
                        onClick={() => onIllustrationColorChange(color)}
                        className={cn(
                          "w-8 h-8 rounded-full border-2 transition-all",
                          illustrationColor === color ? "border-gray-900 dark:border-gray-100 scale-110" : "border-gray-300"
                        )}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Mood Selection - Only for Kawaii characters */}
              {!selectedCharacter.startsWith('ph-') &&
               !selectedCharacter.startsWith('emoji-') &&
               !selectedCharacter.startsWith('gi-') && (
                <div className="space-y-3 mb-4">
                  <h4 className="text-sm font-medium">Humeur du personnage</h4>
                  <div className="grid grid-cols-4 gap-2">
                    {kawaiiMoods.map((mood) => {
                      const isSelected = selectedMood === mood.id
                      const IconComponent = mood.icon

                      return (
                        <button
                          key={mood.id}
                          onClick={() => onMoodChange(mood.id)}
                          className={cn(
                            "p-2 rounded-md transition-all border flex flex-col items-center gap-1 hover:bg-gray-100 dark:hover:bg-gray-800",
                            isSelected && "bg-primary/10 border-primary text-primary dark:bg-primary/20"
                          )}
                        >
                          <IconComponent className="h-4 w-4" style={{ color: mood.color }} />
                          <span className="text-xs">{mood.name}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Basic Controls */}
              <div className="space-y-4 mb-4 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                <h4 className="text-sm font-medium">Contrôles de base</h4>

                {/* Show/Hide Toggle */}
                <div className="flex items-center justify-between">
                  <label className="text-sm">Afficher les illustrations</label>
                  <Button
                    variant={showIllustrations ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => onShowIllustrationsChange(!showIllustrations)}
                  >
                    {showIllustrations ? 'Visible' : 'Masqué'}
                  </Button>
                </div>

                {/* Size Control */}
                {showIllustrations && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-sm">Taille du personnage</label>
                      <span className="text-sm text-muted-foreground">{illustrationScale}%</span>
                    </div>
                    <Slider
                      value={[illustrationScale]}
                      onValueChange={(values) => onIllustrationScaleChange(values[0])}
                      min={50}
                      max={200}
                      step={10}
                      className="w-full"
                    />
                  </div>
                )}

                {/* Background Removal Toggle */}
                {showIllustrations && (
                  <div className="flex items-center justify-between">
                    <label className="text-sm">Arrière-plan transparent</label>
                    <Button
                      variant={transparentBackground ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => onTransparentBackgroundChange(!transparentBackground)}
                    >
                      {transparentBackground ? 'Transparent' : 'Avec fond'}
                    </Button>
                  </div>
                )}
              </div>

              {/* Advanced Controls Toggle */}
              <div className="space-y-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className="w-full justify-between"
                >
                  <span>Contrôles avancés</span>
                  <ChevronDown className={cn(
                    "h-4 w-4 transition-transform",
                    showAdvanced && "rotate-180"
                  )} />
                </Button>

                {/* Advanced Controls */}
                <AnimatePresence>
                  {showAdvanced && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg"
                    >
                      <h5 className="text-sm font-medium text-muted-foreground">Personnalisation avancée</h5>


                      {/* Drag and Resize Info */}
                      <div className="text-xs text-muted-foreground bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-200 dark:border-blue-800">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span className="font-medium text-blue-700 dark:text-blue-300">Contrôles directs</span>
                        </div>
                        <ul className="space-y-1 text-blue-600 dark:text-blue-400">
                          <li>• Cliquez et glissez pour déplacer</li>
                          <li>• Molette de la souris pour redimensionner</li>
                          <li>• Shift + molette pour faire pivoter</li>
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Close Button */}
              <div className="mt-4 flex justify-end">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 text-xs"
                  onClick={() => setIsExpanded(false)}
                >
                  Fermer
                </Button>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}