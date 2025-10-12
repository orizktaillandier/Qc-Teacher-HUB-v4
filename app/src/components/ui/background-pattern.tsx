"use client"

import Image from "next/image"

interface BackgroundPatternProps {
  variant?: "illustrations" | "minimal" | "geometric"
}

export function BackgroundPattern({ variant = "illustrations" }: BackgroundPatternProps) {
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

  // HIGH IMPACT: More illustrations, bigger sizes, higher opacity
  const illustrations = [
    {
      svg: (
        // Teacher at board illustration
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="20" y="30" width="160" height="100" rx="4" fill="#2C3E50" opacity="0.8"/>
          <rect x="25" y="35" width="150" height="90" rx="2" fill="#34495E"/>
          <text x="40" y="60" fill="#ECF0F1" fontSize="14" fontFamily="Arial">2 + 2 = 4</text>
          <text x="40" y="80" fill="#ECF0F1" fontSize="14" fontFamily="Arial">5 × 3 = 15</text>
          <circle cx="140" cy="60" r="15" stroke="#3498DB" strokeWidth="2" fill="none"/>
          <path d="M 130 95 L 150 95 M 140 85 L 140 105" stroke="#E74C3C" strokeWidth="2"/>
          <circle cx="100" cy="160" r="15" fill="#E67E22"/>
          <rect x="85" y="175" width="30" height="25" rx="5" fill="#3498DB"/>
        </svg>
      ),
      x: "2%",
      y: "8%",
      size: 400,
      opacity: 0.45,
    },
    {
      svg: (
        // Books stack
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="40" y="80" width="50" height="70" rx="3" fill="#E74C3C" opacity="0.9"/>
          <rect x="45" y="85" width="40" height="3" fill="#C0392B"/>
          <rect x="55" y="60" width="50" height="70" rx="3" fill="#3498DB" opacity="0.9"/>
          <rect x="60" y="65" width="40" height="3" fill="#2980B9"/>
          <rect x="70" y="40" width="50" height="70" rx="3" fill="#2ECC71" opacity="0.9"/>
          <rect x="75" y="45" width="40" height="3" fill="#27AE60"/>
          <path d="M 120 120 Q 150 110 180 120 L 180 170 Q 150 160 120 170 Z" fill="#F39C12" opacity="0.9"/>
          <path d="M 120 120 Q 90 110 60 120 L 60 170 Q 90 160 120 170 Z" fill="#E67E22" opacity="0.9"/>
          <line x1="120" y1="120" x2="120" y2="170" stroke="#D35400" strokeWidth="2"/>
        </svg>
      ),
      x: "78%",
      y: "12%",
      size: 380,
      opacity: 0.5,
    },
    {
      svg: (
        // Light bulb
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="100" cy="80" r="35" fill="#F1C40F" opacity="0.9"/>
          <path d="M 85 110 Q 85 120 90 125 L 110 125 Q 115 120 115 110 Z" fill="#E67E22" opacity="0.9"/>
          <rect x="92" y="125" width="16" height="8" rx="2" fill="#95A5A6"/>
          <circle cx="100" cy="135" r="4" fill="#7F8C8D"/>
          <line x1="100" y1="35" x2="100" y2="20" stroke="#F39C12" strokeWidth="3" strokeLinecap="round"/>
          <line x1="135" y1="50" x2="147" y2="38" stroke="#F39C12" strokeWidth="3" strokeLinecap="round"/>
          <line x1="150" y1="80" x2="165" y2="80" stroke="#F39C12" strokeWidth="3" strokeLinecap="round"/>
          <line x1="65" y1="50" x2="53" y2="38" stroke="#F39C12" strokeWidth="3" strokeLinecap="round"/>
          <line x1="50" y1="80" x2="35" y2="80" stroke="#F39C12" strokeWidth="3" strokeLinecap="round"/>
          <path d="M 130 120 L 132 125 L 137 127 L 132 129 L 130 134 L 128 129 L 123 127 L 128 125 Z" fill="#F39C12"/>
          <path d="M 70 110 L 72 115 L 77 117 L 72 119 L 70 124 L 68 119 L 63 117 L 68 115 Z" fill="#F39C12"/>
        </svg>
      ),
      x: "8%",
      y: "52%",
      size: 360,
      opacity: 0.48,
    },
    {
      svg: (
        // Globe
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="100" cy="100" r="60" fill="#3498DB" opacity="0.9"/>
          <path d="M 80 70 Q 90 65 100 70 Q 110 75 115 70 L 115 85 Q 110 90 100 85 Q 90 80 80 85 Z" fill="#2ECC71" opacity="0.9"/>
          <ellipse cx="120" cy="110" rx="15" ry="20" fill="#2ECC71" opacity="0.9"/>
          <path d="M 65 100 Q 70 95 75 100 Q 80 105 75 110 Q 70 115 65 110 Z" fill="#2ECC71" opacity="0.9"/>
          <ellipse cx="100" cy="100" rx="60" ry="20" stroke="#ECF0F1" strokeWidth="1.5" fill="none" opacity="0.5"/>
          <ellipse cx="100" cy="100" rx="60" ry="40" stroke="#ECF0F1" strokeWidth="1.5" fill="none" opacity="0.5"/>
          <line x1="40" y1="100" x2="160" y2="100" stroke="#ECF0F1" strokeWidth="1.5" opacity="0.5"/>
          <line x1="100" y1="160" x2="100" y2="175" stroke="#95A5A6" strokeWidth="3"/>
          <ellipse cx="100" cy="178" rx="20" ry="4" fill="#7F8C8D"/>
        </svg>
      ),
      x: "72%",
      y: "58%",
      size: 420,
      opacity: 0.42,
    },
    {
      svg: (
        // Pencils
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="50" y="80" width="15" height="80" rx="2" fill="#F39C12" transform="rotate(-25 57.5 120)"/>
          <path d="M 45 75 L 57.5 67 L 70 75" fill="#34495E" transform="rotate(-25 57.5 71)"/>
          <rect x="52" y="150" width="11" height="5" fill="#ECF0F1" transform="rotate(-25 57.5 152.5)"/>
          <rect x="80" y="70" width="15" height="90" rx="2" fill="#E74C3C" transform="rotate(15 87.5 115)"/>
          <path d="M 75 65 L 87.5 57 L 100 65" fill="#34495E" transform="rotate(15 87.5 61)"/>
          <rect x="82" y="155" width="11" height="5" fill="#ECF0F1" transform="rotate(15 87.5 157.5)"/>
          <rect x="110" y="75" width="15" height="85" rx="2" fill="#9B59B6"/>
          <path d="M 105 70 L 117.5 62 L 130 70" fill="#34495E"/>
          <rect x="112" y="155" width="11" height="5" fill="#ECF0F1"/>
          <rect x="130" y="100" width="50" height="10" rx="1" fill="#F1C40F" opacity="0.9"/>
          <line x1="135" y1="100" x2="135" y2="110" stroke="#34495E" strokeWidth="1"/>
          <line x1="145" y1="100" x2="145" y2="110" stroke="#34495E" strokeWidth="1"/>
          <line x1="155" y1="100" x2="155" y2="110" stroke="#34495E" strokeWidth="1"/>
          <line x1="165" y1="100" x2="165" y2="110" stroke="#34495E" strokeWidth="1"/>
          <line x1="175" y1="100" x2="175" y2="110" stroke="#34495E" strokeWidth="1"/>
        </svg>
      ),
      x: "38%",
      y: "72%",
      size: 340,
      opacity: 0.5,
    },
    {
      svg: (
        // Apple for teacher
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="100" cy="110" rx="45" ry="50" fill="#E74C3C" opacity="0.9"/>
          <path d="M 100 60 Q 95 40 90 35 Q 85 30 80 35" stroke="#8B4513" strokeWidth="3" fill="none"/>
          <ellipse cx="110" cy="65" rx="12" ry="8" fill="#27AE60" opacity="0.9"/>
          <ellipse cx="90" cy="115" rx="8" ry="10" fill="#C0392B" opacity="0.6"/>
        </svg>
      ),
      x: "45%",
      y: "5%",
      size: 280,
      opacity: 0.45,
    },
    {
      svg: (
        // Graduation cap
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M 100 70 L 160 90 L 100 110 L 40 90 Z" fill="#2C3E50" opacity="0.9"/>
          <path d="M 100 110 L 100 140 L 130 130 L 130 100 Z" fill="#34495E" opacity="0.9"/>
          <rect x="155" y="90" width="8" height="50" rx="4" fill="#F39C12"/>
          <circle cx="159" cy="145" r="6" fill="#F1C40F"/>
        </svg>
      ),
      x: "85%",
      y: "45%",
      size: 320,
      opacity: 0.48,
    },
    {
      svg: (
        // Calculator
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="60" y="40" width="80" height="120" rx="8" fill="#34495E" opacity="0.9"/>
          <rect x="70" y="50" width="60" height="25" rx="4" fill="#16A085"/>
          <rect x="70" y="85" width="12" height="12" rx="2" fill="#ECF0F1"/>
          <rect x="88" y="85" width="12" height="12" rx="2" fill="#ECF0F1"/>
          <rect x="106" y="85" width="12" height="12" rx="2" fill="#ECF0F1"/>
          <rect x="124" y="85" width="12" height="12" rx="2" fill="#E67E22"/>
          <rect x="70" y="103" width="12" height="12" rx="2" fill="#ECF0F1"/>
          <rect x="88" y="103" width="12" height="12" rx="2" fill="#ECF0F1"/>
          <rect x="106" y="103" width="12" height="12" rx="2" fill="#ECF0F1"/>
          <rect x="124" y="103" width="12" height="12" rx="2" fill="#E67E22"/>
          <rect x="70" y="121" width="12" height="12" rx="2" fill="#ECF0F1"/>
          <rect x="88" y="121" width="12" height="12" rx="2" fill="#ECF0F1"/>
          <rect x="106" y="121" width="12" height="12" rx="2" fill="#ECF0F1"/>
          <rect x="124" y="121" width="12" height="30" rx="2" fill="#3498DB"/>
        </svg>
      ),
      x: "20%",
      y: "28%",
      size: 300,
      opacity: 0.46,
    },
    {
      svg: (
        // Trophy/Award
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="70" y="60" width="60" height="50" rx="5" fill="#F1C40F" opacity="0.9"/>
          <path d="M 70 60 Q 50 60 45 80 Q 43 90 50 95 L 70 95" fill="#F39C12" opacity="0.9"/>
          <path d="M 130 60 Q 150 60 155 80 Q 157 90 150 95 L 130 95" fill="#F39C12" opacity="0.9"/>
          <rect x="90" y="110" width="20" height="30" rx="3" fill="#E67E22" opacity="0.9"/>
          <ellipse cx="100" cy="145" rx="25" ry="8" fill="#7F8C8D"/>
          <circle cx="100" cy="75" r="8" fill="#E74C3C"/>
        </svg>
      ),
      x: "60%",
      y: "35%",
      size: 290,
      opacity: 0.5,
    },
    {
      svg: (
        // Microscope
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="80" y="40" width="8" height="60" rx="4" fill="#34495E" transform="rotate(15 84 70)"/>
          <circle cx="95" cy="45" r="12" fill="#3498DB" opacity="0.9"/>
          <circle cx="95" cy="45" r="8" fill="#ECF0F1" opacity="0.6"/>
          <rect x="75" y="100" width="12" height="40" rx="2" fill="#2C3E50"/>
          <ellipse cx="81" cy="145" rx="30" ry="6" fill="#7F8C8D"/>
          <rect x="90" y="120" width="40" height="3" rx="1.5" fill="#95A5A6"/>
        </svg>
      ),
      x: "50%",
      y: "48%",
      size: 270,
      opacity: 0.44,
    },
    {
      svg: (
        // Palette (Art)
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="100" cy="100" rx="50" ry="45" fill="#8B4513" opacity="0.9"/>
          <ellipse cx="130" cy="105" rx="15" ry="20" fill="#F5F5DC" opacity="0.3"/>
          <circle cx="80" cy="85" r="8" fill="#E74C3C"/>
          <circle cx="100" cy="80" r="8" fill="#3498DB"/>
          <circle cx="120" cy="85" r="8" fill="#F1C40F"/>
          <circle cx="85" cy="105" r="8" fill="#2ECC71"/>
          <circle cx="105" cy="110" r="8" fill="#9B59B6"/>
          <circle cx="115" cy="105" r="8" fill="#E67E22"/>
        </svg>
      ),
      x: "32%",
      y: "58%",
      size: 310,
      opacity: 0.47,
    },
    {
      svg: (
        // Atom (Science)
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="100" cy="100" r="8" fill="#E74C3C"/>
          <ellipse cx="100" cy="100" rx="50" ry="20" stroke="#3498DB" strokeWidth="3" fill="none" opacity="0.8" transform="rotate(0 100 100)"/>
          <ellipse cx="100" cy="100" rx="50" ry="20" stroke="#2ECC71" strokeWidth="3" fill="none" opacity="0.8" transform="rotate(60 100 100)"/>
          <ellipse cx="100" cy="100" rx="50" ry="20" stroke="#F39C12" strokeWidth="3" fill="none" opacity="0.8" transform="rotate(120 100 100)"/>
          <circle cx="140" cy="100" r="6" fill="#3498DB"/>
          <circle cx="75" cy="110" r="6" fill="#2ECC71"/>
          <circle cx="110" cy="70" r="6" fill="#F39C12"/>
        </svg>
      ),
      x: "15%",
      y: "75%",
      size: 350,
      opacity: 0.45,
    },
  ]

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {illustrations.map((item, index) => (
        <div
          key={index}
          className="absolute transition-opacity duration-300"
          style={{
            left: item.x,
            top: item.y,
            width: item.size,
            height: item.size,
            opacity: item.opacity,
          }}
        >
          {item.svg}
        </div>
      ))}
    </div>
  )
}
