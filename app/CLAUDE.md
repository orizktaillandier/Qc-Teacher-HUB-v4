# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# Quebec Teacher Hub v4 - Educational Task Card Generation System

## Project Overview

Quebec Teacher Hub v4 is a production-ready educational task card generation system for Quebec teachers. It generates PFEQ-aligned task cards with advanced features like mathematical visualizations, customizable fonts, and inline text editing.

## Core Development Commands

### Essential Development Commands
```bash
# Start development server (runs on port 3000 or auto-selected)
npm run dev

# Build and production
npm run build
npm run start

# Code quality
npm run lint
npm run typecheck

# Testing (when configured)
npm test
```

## Architecture Overview

### Tech Stack
- **Framework**: Next.js 15 with App Router and React 19
- **UI Components**: HeroUI (NextUI successor) + shadcn/ui
- **Styling**: Tailwind CSS with Quebec education theme
- **AI Integration**: OpenAI (GPT-4o/GPT-5)
- **Knowledge Base**: SQLite with 346 PFEQ curriculum chunks
- **Build Tool**: Turbopack for fast development

### Key Architectural Features

**Task Card System**:
- 8 cards per generation (2x4 grid layout)
- Direct, simple questions (no context per teacher feedback)
- Progressive difficulty (easy → medium → hard)
- Print-optimized A4 layout

**Visual Components System**:
- Mathematical visualizations using SVG
- Parse syntax: `[visual:type:params]`
- Dynamic scaling with `preserveAspectRatio`
- Centered coordinate system (0,0 origin)

**Customization Features**:
- 20+ Google Fonts including fun student fonts
- Font size control (10px-24px)
- Bold/italic styling toggles
- Inline text editing with contentEditable

## Project Structure

### Core Files and Their Purpose
```
src/
├── app/
│   ├── cards-v2/page.tsx          # Main task card interface
│   └── api/
│       └── generate-card-v2/      # Card generation endpoint
├── components/
│   ├── MathVisuals.tsx           # All visual components
│   ├── TaskCardThemes.tsx        # Card theming/illustrations
│   └── ui/                       # HeroUI/shadcn components
└── lib/
    └── knowledge-retrieval.ts    # PFEQ knowledge system
```

### Important Implementation Details

**MathVisuals.tsx**:
- 8 visual component types (angle, triangle, fraction, etc.)
- SVG-based with dynamic viewBox calculations
- All components use `className="w-full h-full"` and `preserveAspectRatio="xMidYMid meet"`
- Angle labels positioned outside shapes to avoid overlap

**cards-v2/page.tsx**:
- Flexbox layout for proper visual scaling
- Font settings state management
- ContentEditable for inline text editing
- Visual parsing and rendering system

**generate-card-v2/route.ts**:
- Removed Quebec context generation (teacher feedback)
- Direct question prompts: "SIMPLES et DIRECTES"
- Visual code instructions in prompt
- Fallback from GPT-5 to GPT-4o

## Current Features Status

### ✅ Completed Features
1. **Task Card Generation**: Full 8-card generation with PFEQ alignment
2. **Mathematical Visuals**: All 8 types working with proper scaling
3. **Font Customization**: Complete with 20+ fonts
4. **Inline Editing**: Click-to-edit any text
5. **Knowledge Integration**: 346 curriculum chunks from v3
6. **Print Layout**: 2x4 grid optimized for A4
7. **Theme System**: Multiple gradient backgrounds

### 🚧 Pending Features
1. **Answer Sheet**: Separate page for student answers
2. **Corriger**: Teacher's answer key with corrections
3. **PDF Export**: Print-ready PDF generation
4. **Save/Load**: Session persistence
5. **History**: View previously generated cards

## Code Style Guidelines

### Component Development
- Use functional components with TypeScript
- Proper type definitions for all props
- No inline styles - use Tailwind classes
- SVG components must include viewBox and preserveAspectRatio

### State Management
- Use React hooks (useState, useEffect)
- Keep state close to where it's used
- Avoid prop drilling - consider context for deep trees

### API Development
- Validate inputs with proper error messages
- Use try-catch with specific error handling
- Log important steps for debugging
- Return structured JSON responses

## Visual Component Syntax

The system uses a parsing syntax for visual elements:

```
[visual:angle:45:100]              # 45-degree angle
[visual:triangle:50:60:x]          # Triangle with unknown angle
[visual:fraction:3:4:3]            # 3/4 fraction with 3 parts filled
[visual:numberline:0:10:3,5,7]     # Number line with markers
[visual:grid:3:4:6]                # 3x4 grid with 6 filled
[visual:clock:3:15]                # Clock showing 3:15
[visual:shape:hexagon:100]         # Hexagon shape
[visual:graph:2,4,3,5]             # Bar graph with values
```

## Environment Variables

Required in `.env.local`:
```bash
OPENAI_API_KEY=sk-...
AI_MODEL=gpt-4o  # Optional, defaults to gpt-4o
```

## Common Tasks

### Adding a New Visual Component
1. Add case in `renderMathVisual()` switch
2. Create component function with SVG
3. Include viewBox and preserveAspectRatio
4. Test with different container sizes

### Modifying Card Layout
1. Edit grid in `cards-v2/page.tsx`
2. Maintain 2x4 structure for printing
3. Test print preview in multiple browsers

### Updating Prompts
1. Edit `buildStructuredPrompt()` in route.ts
2. Keep instructions simple and direct
3. Include visual code examples
4. Test with different subjects/notions

## Debugging Tips

1. **Visual not scaling**: Check for `preserveAspectRatio="xMidYMid meet"`
2. **Text overflow**: Adjust font size or card padding
3. **Generation errors**: Check console for API errors
4. **Print issues**: Test with browser print preview

## Performance Considerations

- Knowledge retrieval: < 100ms (SQLite optimized)
- Card generation: 3-5 seconds (API dependent)
- Hot reload: < 1 second (Turbopack)
- Build time: Optimized with Next.js 15

## Testing Checklist

Before commits, verify:
- [ ] TypeScript compiles without errors
- [ ] Linting passes
- [ ] Visual components scale properly
- [ ] Print preview looks correct
- [ ] Font changes apply correctly
- [ ] Text editing works inline

This codebase represents a mature educational technology platform specifically designed for Quebec teachers, with deep PFEQ curriculum integration and modern web development practices.