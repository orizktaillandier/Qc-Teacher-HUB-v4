'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Slider } from '@/components/ui/slider'
import {
  ChevronDown,
  Check,
  Type,
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { teacherFonts, fontCategories, getFontsByCategory, type TeacherFont } from '@/lib/fonts/teacher-fonts'

interface FontSelectorProps {
  selectedFont: string
  onFontChange: (font: string) => void
  fontSize: number
  onFontSizeChange: (size: number) => void
  isBold: boolean
  onBoldChange: (bold: boolean) => void
  isItalic: boolean
  onItalicChange: (italic: boolean) => void
  isUnderline: boolean
  onUnderlineChange: (underline: boolean) => void
  textAlign: 'left' | 'center' | 'right'
  onTextAlignChange: (align: 'left' | 'center' | 'right') => void
}

export function FontSelector({
  selectedFont,
  onFontChange,
  fontSize,
  onFontSizeChange,
  isBold,
  onBoldChange,
  isItalic,
  onItalicChange,
  isUnderline,
  onUnderlineChange,
  textAlign,
  onTextAlignChange
}: FontSelectorProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>('playful')

  const currentFont = teacherFonts.find(f => f.value === selectedFont) || teacherFonts[0]
  const categoryFonts = getFontsByCategory(selectedCategory as TeacherFont['category'])

  // Load a single font on demand
  const loadFont = (font: TeacherFont) => {
    const fontName = font.googleFont.replace(/ /g, '+')
    const linkId = `google-font-preview-${font.value}`

    if (document.getElementById(linkId)) {
      return // Already loaded
    }

    const link = document.createElement('link')
    link.id = linkId
    link.rel = 'stylesheet'
    link.href = `https://fonts.googleapis.com/css2?family=${fontName}:wght@400&display=swap`
    document.head.appendChild(link)
  }

  // Load fonts when category changes or when expanded, with delay to avoid blocking
  useEffect(() => {
    if (!isExpanded) return

    // Load each font with a small delay to avoid blocking
    categoryFonts.forEach((font, index) => {
      setTimeout(() => {
        loadFont(font)
      }, index * 50) // 50ms delay between each font
    })
  }, [selectedCategory, isExpanded])

  return (
    <div className="w-full space-y-4">
      {/* Current Font Selection Button */}
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
            "from-blue-500 to-purple-500"
          )}>
            <Type className="h-3.5 w-3.5" />
          </div>
          <div className="flex-1">
            <p className="text-xs text-muted-foreground">Police actuelle</p>
            <p className="text-sm font-medium">{currentFont.name}</p>
          </div>
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </motion.div>
      </Button>

      {/* Expanded Font Selector */}
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
              <div className="grid grid-cols-2 gap-2 mb-4">
                {fontCategories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? 'default' : 'outline'}
                    size="sm"
                    className={cn(
                      "h-9 text-xs",
                      selectedCategory === category.id && "shadow-md"
                    )}
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    <span>{category.name}</span>
                  </Button>
                ))}
              </div>

              {/* Font List */}
              <ScrollArea className="h-[280px] w-full rounded-lg border bg-gray-50/50 dark:bg-gray-900/50">
                <div className="p-1">
                  {categoryFonts.map((font) => {
                    const isSelected = selectedFont === font.value

                    return (
                      <button
                        key={font.value}
                        onMouseEnter={() => loadFont(font)}
                        onClick={() => onFontChange(font.value)}
                        className={cn(
                          "w-full text-left px-3 py-2 rounded-md transition-all text-base hover:bg-gray-100 dark:hover:bg-gray-800",
                          isSelected && "bg-primary/10 text-primary dark:bg-primary/20 font-medium"
                        )}
                        style={{ fontFamily: font.googleFont }}
                      >
                        <div className="flex items-center justify-between">
                          <span>{font.name}</span>
                          {isSelected && (
                            <Check className="h-4 w-4 text-primary" />
                          )}
                        </div>
                      </button>
                    )
                  })}
                </div>
              </ScrollArea>

              {/* Close Button */}
              <div className="mt-3 flex justify-end">
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

      {/* Font Size Control */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium">Taille du texte</label>
          <span className="text-sm text-muted-foreground">{fontSize}px</span>
        </div>
        <Slider
          value={[fontSize]}
          onValueChange={(values) => onFontSizeChange(values[0])}
          min={12}
          max={36}
          step={1}
          className="w-full"
        />
      </div>

      {/* Text Formatting Buttons */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Format du texte</label>
        <div className="flex gap-1">
          <Button
            variant={isBold ? 'default' : 'outline'}
            size="sm"
            className="flex-1 font-bold"
            onClick={() => onBoldChange(!isBold)}
          >
            <Bold className="h-4 w-4 mr-1" />
            Gras
          </Button>
          <Button
            variant={isItalic ? 'default' : 'outline'}
            size="sm"
            className="flex-1 italic"
            onClick={() => onItalicChange(!isItalic)}
          >
            <Italic className="h-4 w-4 mr-1" />
            Italique
          </Button>
          <Button
            variant={isUnderline ? 'default' : 'outline'}
            size="sm"
            className="flex-1 underline"
            onClick={() => onUnderlineChange(!isUnderline)}
          >
            <Underline className="h-4 w-4 mr-1" />
            Souligné
          </Button>
        </div>
      </div>

      {/* Text Alignment */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Alignement</label>
        <div className="flex gap-1">
          <Button
            variant={textAlign === 'left' ? 'default' : 'outline'}
            size="sm"
            className="flex-1"
            onClick={() => onTextAlignChange('left')}
          >
            <AlignLeft className="h-4 w-4" />
          </Button>
          <Button
            variant={textAlign === 'center' ? 'default' : 'outline'}
            size="sm"
            className="flex-1"
            onClick={() => onTextAlignChange('center')}
          >
            <AlignCenter className="h-4 w-4" />
          </Button>
          <Button
            variant={textAlign === 'right' ? 'default' : 'outline'}
            size="sm"
            className="flex-1"
            onClick={() => onTextAlignChange('right')}
          >
            <AlignRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}