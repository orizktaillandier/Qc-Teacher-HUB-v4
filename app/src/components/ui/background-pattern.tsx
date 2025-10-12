"use client"

import { BookOpen, Star, Lightbulb, Heart, Sparkles, Award, Target, Zap } from "lucide-react"

interface BackgroundPatternProps {
  variant?: "educational" | "minimal" | "geometric"
}

export function BackgroundPattern({ variant = "educational" }: BackgroundPatternProps) {
  if (variant === "minimal") {
    return null
  }

  if (variant === "geometric") {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.03]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="2" fill="currentColor" className="text-primary" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
      </div>
    )
  }

  // Educational icons pattern
  const icons = [
    { Icon: BookOpen, x: "10%", y: "15%", size: 48, rotation: -15, delay: 0 },
    { Icon: Star, x: "85%", y: "20%", size: 36, rotation: 20, delay: 0.5 },
    { Icon: Lightbulb, x: "20%", y: "75%", size: 40, rotation: 10, delay: 1 },
    { Icon: Heart, x: "75%", y: "65%", size: 32, rotation: -10, delay: 1.5 },
    { Icon: Sparkles, x: "50%", y: "10%", size: 28, rotation: 0, delay: 2 },
    { Icon: Award, x: "90%", y: "80%", size: 44, rotation: 15, delay: 2.5 },
    { Icon: Target, x: "15%", y: "45%", size: 36, rotation: -20, delay: 3 },
    { Icon: Zap, x: "70%", y: "35%", size: 32, rotation: 25, delay: 3.5 },
    { Icon: BookOpen, x: "40%", y: "85%", size: 38, rotation: -5, delay: 4 },
    { Icon: Star, x: "30%", y: "25%", size: 30, rotation: 15, delay: 4.5 },
    { Icon: Lightbulb, x: "80%", y: "50%", size: 34, rotation: -15, delay: 5 },
    { Icon: Heart, x: "5%", y: "85%", size: 28, rotation: 20, delay: 5.5 },
  ]

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {icons.map((item, index) => {
        const { Icon, x, y, size, rotation } = item
        return (
          <div
            key={index}
            className="absolute opacity-[0.04] dark:opacity-[0.06]"
            style={{
              left: x,
              top: y,
              transform: `rotate(${rotation}deg)`,
            }}
          >
            <Icon
              size={size}
              className="text-primary dark:text-secondary"
              strokeWidth={1.5}
            />
          </div>
        )
      })}
    </div>
  )
}
