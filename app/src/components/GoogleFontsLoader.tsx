'use client'

import { useEffect } from 'react'
import { getFontByValue } from '@/lib/fonts/teacher-fonts'

interface GoogleFontsLoaderProps {
  fontValue: string
  weight?: number
}

export function GoogleFontsLoader({ fontValue, weight = 400 }: GoogleFontsLoaderProps) {
  useEffect(() => {
    const font = getFontByValue(fontValue)
    if (!font) return

    // Create Google Fonts link
    const fontName = font.googleFont.replace(/ /g, '+')
    const weights = font.weights || [400]
    const weightString = weights.join(',')

    const linkId = `google-font-${fontValue}`
    const existingLink = document.getElementById(linkId)

    if (existingLink) {
      return // Font already loaded
    }

    const link = document.createElement('link')
    link.id = linkId
    link.rel = 'stylesheet'
    link.href = `https://fonts.googleapis.com/css2?family=${fontName}:wght@${weightString}&display=swap`

    document.head.appendChild(link)

    return () => {
      // Keep the font loaded even when component unmounts
      // This prevents flashing when switching between fonts
    }
  }, [fontValue])

  return null
}