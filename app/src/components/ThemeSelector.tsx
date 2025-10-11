'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  ChevronDown,
  ChevronUp,
  Check,
  Sparkles,
  Palette,
  Star,
  Wand2
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface ThemeSelectorProps {
  selectedTheme: number
  selectedAdvancedTheme: number | null
  selectedDalleTheme: number | null
  themeType: 'standard' | 'advanced' | 'dalle'
  onThemeChange: (theme: number) => void
  onAdvancedThemeChange: (theme: number | null) => void
  onDalleThemeChange: (theme: number | null) => void
  onThemeTypeChange: (type: 'standard' | 'advanced' | 'dalle') => void
  themes: {
    standard: Array<{ name: string; background?: string; cardBackground?: string }>
    advanced: Array<{ name: string; background?: string }>
    dalle: Array<{ name: string; background?: string }>
  }
}

export function ThemeSelector({
  selectedTheme,
  selectedAdvancedTheme,
  selectedDalleTheme,
  themeType,
  onThemeChange,
  onAdvancedThemeChange,
  onDalleThemeChange,
  onThemeTypeChange,
  themes
}: ThemeSelectorProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [previewType, setPreviewType] = useState<'standard' | 'advanced' | 'dalle'>(themeType)

  // Get current selected theme name
  const getCurrentThemeName = () => {
    if (themeType === 'standard') {
      return selectedTheme === -1 ? '🎲 Thème aléatoire' : themes.standard[selectedTheme]?.name || 'Sélectionner un thème'
    } else if (themeType === 'advanced' && selectedAdvancedTheme !== null) {
      return themes.advanced[selectedAdvancedTheme]?.name || 'Sélectionner un thème'
    } else if (themeType === 'dalle' && selectedDalleTheme !== null) {
      return themes.dalle[selectedDalleTheme]?.name || 'Sélectionner un thème'
    }
    return 'Sélectionner un thème'
  }

  const handleThemeSelect = (type: 'standard' | 'advanced' | 'dalle', index: number) => {
    onThemeTypeChange(type)

    if (type === 'standard') {
      onThemeChange(index)
      onAdvancedThemeChange(null)
      onDalleThemeChange(null)
    } else if (type === 'advanced') {
      onThemeChange(-2)
      onAdvancedThemeChange(index)
      onDalleThemeChange(null)
    } else if (type === 'dalle') {
      onThemeChange(-3)
      onAdvancedThemeChange(null)
      onDalleThemeChange(index)
    }
  }

  const categories = [
    {
      id: 'standard',
      name: 'Standards',
      icon: <Palette className="h-3.5 w-3.5" />,
      themes: themes.standard,
      selectedIndex: selectedTheme,
      color: 'from-gray-400 to-gray-600'
    },
    {
      id: 'advanced',
      name: 'Créatifs',
      icon: <Wand2 className="h-3.5 w-3.5" />,
      themes: themes.advanced,
      selectedIndex: selectedAdvancedTheme,
      color: 'from-blue-500 to-purple-500'
    }
  ]

  const currentCategory = categories.find(c => c.id === themeType)

  return (
    <div className="w-full space-y-3">
      {/* Current Selection Button */}
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
            currentCategory?.color || "from-gray-400 to-gray-600"
          )}>
            {currentCategory?.icon}
          </div>
          <div className="flex-1">
            <p className="text-xs text-muted-foreground">{currentCategory?.name || 'Thème'}</p>
            <p className="text-sm font-medium">{getCurrentThemeName()}</p>
          </div>
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </motion.div>
      </Button>

      {/* Expanded Theme Selector */}
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
              {/* Category Tabs */}
              <div className="flex gap-2 mb-4">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={previewType === category.id ? 'default' : 'outline'}
                    size="sm"
                    className={cn(
                      "flex-1 h-9",
                      previewType === category.id && "shadow-md"
                    )}
                    onClick={() => setPreviewType(category.id as typeof previewType)}
                  >
                    <div className="flex items-center gap-1.5">
                      {category.icon}
                      <span className="text-xs font-medium">{category.name}</span>
                      <span className="text-xs opacity-60">({category.themes.length})</span>
                    </div>
                  </Button>
                ))}
              </div>

              {/* Theme Grid */}
              <ScrollArea className="h-[320px] w-full rounded-lg border bg-gray-50/50 dark:bg-gray-900/50 p-2">
                <div className="grid grid-cols-2 gap-2">
                  {/* Random option for standard themes */}
                  {previewType === 'standard' && (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => handleThemeSelect('standard', -1)}
                      className={cn(
                        "relative rounded-lg border-2 transition-all overflow-hidden",
                        "bg-white dark:bg-gray-900",
                        themeType === 'standard' && selectedTheme === -1
                          ? "border-primary shadow-lg ring-2 ring-primary/20"
                          : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-md"
                      )}
                    >
                      <div className="p-3">
                        <div className="w-full h-20 rounded-md bg-gradient-to-br from-red-400 via-yellow-400 via-green-400 via-blue-400 to-purple-400 mb-2" />
                        <div className="text-center">
                          <p className="text-xs font-semibold">🎲 Aléatoire</p>
                          <p className="text-[10px] text-muted-foreground">Surprise!</p>
                        </div>
                      </div>
                      {themeType === 'standard' && selectedTheme === -1 && (
                        <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full p-1">
                          <Check className="h-3 w-3" />
                        </div>
                      )}
                    </motion.button>
                  )}

                  {/* Theme Cards */}
                  {categories.find(c => c.id === previewType)?.themes.map((theme, index) => {
                    const isSelected =
                      (previewType === 'standard' && themeType === 'standard' && selectedTheme === index) ||
                      (previewType === 'advanced' && themeType === 'advanced' && selectedAdvancedTheme === index) ||
                      (previewType === 'dalle' && themeType === 'dalle' && selectedDalleTheme === index)

                    return (
                      <motion.button
                        key={`${previewType}-${index}`}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => handleThemeSelect(previewType, index)}
                        className={cn(
                          "relative rounded-lg border-2 transition-all overflow-hidden",
                          "bg-white dark:bg-gray-900",
                          isSelected
                            ? "border-primary shadow-lg ring-2 ring-primary/20"
                            : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-md"
                        )}
                      >
                        <div className="p-3">
                          {/* Theme Preview */}
                          <div className="relative w-full h-20 rounded-md overflow-hidden mb-2">
                            {/* Background preview */}
                            <div
                              className="absolute inset-0"
                              style={{
                                background: theme.background ||
                                  (theme as any).gradient ||
                                  ((theme as any).primary && (theme as any).secondary
                                    ? `linear-gradient(135deg, ${(theme as any).primary} 0%, ${(theme as any).secondary} 100%)`
                                    : (theme as any).primary
                                      ? (theme as any).primary
                                      : (theme as any).cardBackground ||
                                        'linear-gradient(135deg, #667eea 0%, #764ba2 100%)')
                              }}
                            />
                            {/* Card preview mockup */}
                            <div className="absolute inset-0 flex items-center justify-center p-3">
                              <div className="bg-white/90 dark:bg-gray-800/90 rounded border-2 border-gray-300 dark:border-gray-600 w-full h-full" />
                            </div>
                            {/* Category badge */}
                            {previewType === 'dalle' && (
                              <div className="absolute top-1 right-1 bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded px-1.5 py-0.5">
                                <span className="text-[9px] font-bold">AI</span>
                              </div>
                            )}
                            {previewType === 'advanced' && (
                              <div className="absolute top-1 right-1 bg-gradient-to-br from-blue-500 to-purple-500 text-white rounded px-1.5 py-0.5">
                                <span className="text-[9px] font-bold">✨</span>
                              </div>
                            )}
                          </div>

                          {/* Theme Name */}
                          <div className="text-center">
                            <p className="text-xs font-semibold truncate px-1">
                              {theme.name.replace(/^[^\w\s]+/, '').trim()}
                            </p>
                          </div>
                        </div>

                        {/* Selected Checkmark */}
                        {isSelected && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute top-2 left-2 bg-primary text-primary-foreground rounded-full p-1"
                          >
                            <Check className="h-3 w-3" />
                          </motion.div>
                        )}
                      </motion.button>
                    )
                  })}
                </div>
              </ScrollArea>

              {/* Footer with stats */}
              <div className="mt-4 pt-3 border-t flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex gap-3">
                  <span className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-gray-400" />
                    {themes.standard.length} standards
                  </span>
                  <span className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                    {themes.advanced.length} créatifs
                  </span>
                </div>
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