# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project: Quebec Teacher Hub v5
Educational card generator for Quebec teachers, fully aligned with PFEQ (Programme de formation de l'école québécoise) curriculum standards.

## Commands

```bash
# Development
cd app
npm run dev           # Start development server with Turbopack (http://localhost:3000)
npm run build         # Build for production with Turbopack
npm start            # Start production server

# Testing API endpoints
curl -X POST http://localhost:3000/api/generate-cards \
  -H "Content-Type: application/json" \
  -d '{"cycle":"cycle2-primaire","grade":"3","subject":"mathematiques","notion":"fractions","subNotions":[],"count":8}'
```

## Architecture Overview

### Multi-layer Structure
```
app/                 # Next.js 15.5.4 application layer
├── src/app/        # App Router pages
├── src/components/ # UI components (Shadcn/ui)
└── src/lib/        # Utilities and libraries

core/               # Business logic layer (migrated from v4)
├── pfeq-structure.ts  # Quebec curriculum hierarchy (14.2KB)
├── themes/           # 59+ card themes (3,134 lines)
└── types/           # TypeScript interfaces

data/               # Data layer
└── kb_index.sqlite  # Knowledge base (1.7MB, 346 chunks)
```

### Tech Stack
- Next.js 15.5.4 with App Router & Turbopack
- React 19.1.0, TypeScript (strict mode)
- Shadcn/ui components (New York style)
- Tailwind CSS v4, next-themes for dark mode
- OpenAI GPT-5 API for card generation
- SQLite knowledge base with PFEQ content

## PFEQ Compliance (Critical)

### Mandatory Filter Hierarchy
Must be implemented in this exact order:
1. **Cycle d'apprentissage** → 2. **Année scolaire** → 3. **Matière** → 4. **Notion principale** → 5. **Sous-notions** (optional)

Each filter depends on previous selection. Changing a parent resets all children.

### Cycle-Subject Restrictions
- **Univers social**: Only cycles 2-3 (grades 3-6)
- **Fractions**: Start at cycle 2
- **Decimaux**: Only cycle 3
- **Probabilité**: Only cycle 3

### Key PFEQ Data Mappings
The API uses specific key mappings between frontend and database:
- `mathematiques` → `mathematique` (database uses singular)
- Frontend notion keys map to specific database notion keys (see `app/src/app/api/generate-cards/route.ts`)

## Key Implementation Files

### Generator Page (`app/src/app/generator/page.tsx`)
- PFEQ cascading filters implementation
- Theme and illustration selection
- Card preview and customization
- PDF export functionality
- Text editing and positioning controls

### PFEQ Data (`core/pfeq-structure.ts`)
Complete Quebec curriculum with:
- 3 cycles mapping to 6 grades
- 11 subjects with cycle availability
- Complete notion/sub-notion hierarchy
- Utility functions: `getGradesForCycle`, `getSubjectsForCycle`, `getNotionsForSubjectAndCycle`

### Theme System (`core/themes/*.ts`)
59+ themes across 6 categories:
- teacher-loved-themes.ts (916 lines)
- fun-kid-themes.ts (800 lines)
- bordered-card-themes.ts (424 lines)
- minecraft-pixel-themes.ts (419 lines)
- original-github-themes.ts (277 lines)
- scrapbook-themes.ts (235 lines)

### Illustration System
4 distinct libraries with different prefixes:
- **Kawaii** (`kawaii-`): 16 characters with 7 moods
- **Phosphor Icons** (`ph-`): 41 duotone icons
- **Educational Emoji** (`emoji-`): 47 native emojis
- **Game Icons** (`gi-`): 16 game-themed icons

Character theme detection in `app/src/app/generator/page.tsx`:
```typescript
const getCharacterTheme = (character: string) => {
  if (character.startsWith('ph-')) return character
  if (character.startsWith('emoji-')) return character
  if (character.startsWith('gi-')) return character
  return `kawaii-${character}`
}
```

## API Architecture

### Card Generation (`/api/generate-cards`)
- Accepts: cycle, grade, subject, notion, subNotions, count
- Process:
  1. Maps frontend keys to database keys
  2. Retrieves relevant PFEQ knowledge chunks from SQLite
  3. Calls GPT-5 API with structured JSON output
  4. Returns generated cards with metadata
- Response time: ~60-75 seconds for 8 cards
- Dynamic model selection: GPT-5-mini for ≤10 cards, GPT-5 for 11+ cards

### PDF Generation (`/api/generate-pdf-html`)
- Uses Puppeteer for high-quality PDF rendering
- Handles SVG color conversion (hex to RGB)
- Supports 2x2 card grid per page (A4 landscape)
- Preserves illustrations and custom positioning

## Current Implementation Status

### ✅ Completed
- PFEQ-compliant cascading filters
- Dark mode with system preference
- Responsive navigation
- **Google OAuth authentication** (NextAuth)
- **Auth middleware** protecting routes
- **Prisma database** (SQLite dev, PostgreSQL production)
- Complete theme collection (59+ themes)
- Knowledge base integration
- Illustration system (4 libraries, 120+ options)
- Card generation with GPT-5/GPT-5-mini
- Text editing and positioning
- PDF export functionality (client-side with html-to-image)
- **Library system** (save/load generations)
- **Shared community library**
- **TypeScript strict mode** (all build errors resolved)
- **Production build working** (Turbopack dev + scope hoisting workaround)

### 🚧 Not Yet Implemented
- Templates page (placeholder only)
- Resources page (placeholder only)
- Image export (PNG/JPG)
- Batch generation

## Environment Configuration

Required `.env.local`:
```bash
# AI Configuration
OPENAI_API_KEY=sk-...              # Required for card generation
AI_MODEL=gpt-5                     # Main model (default: gpt-5)
AI_MODEL_SMALL=gpt-5-mini         # Small model for ≤10 cards
AI_MODEL_FALLBACK=gpt-5-mini      # Fallback model
AI_CARD_COUNT_THRESHOLD=10        # Threshold for model selection

# Authentication (Required)
NEXTAUTH_SECRET=...               # Required: Generate with `openssl rand -base64 32`
NEXTAUTH_URL=http://localhost:3000  # Required: Base URL
GOOGLE_CLIENT_ID=...              # Required: Google OAuth client ID
GOOGLE_CLIENT_SECRET=...          # Required: Google OAuth secret

# Database (Optional for production)
DATABASE_URL=postgresql://...      # Optional: PostgreSQL for production
                                  # Dev uses SQLite: prisma/dev-new.db
```

## Import Path Strategy

From app layer to core layer, use relative paths:
```typescript
// From app/src/app/generator/page.tsx to core
import { cycles, grades } from '../../../../../core/pfeq-structure'
```

Within app layer, use `@/` alias:
```typescript
import { Button } from '@/components/ui/button'
```

## Testing the Application

### Authentication Flow
1. Go to http://localhost:3000/
2. Click "Se connecter avec Google"
3. Sign in with Google account
4. Redirected to /home dashboard

### Cascading Filters
1. Navigate to /generator (must be signed in)
2. Select cycle (e.g., "2e cycle primaire")
3. Verify grade options update (should show grades 3-4)
4. Select subject and verify cycle restrictions apply
5. Check notion filtering based on subject/cycle
6. Verify downstream resets when changing parent selection

## Known Issues & Solutions

### Turbopack Caching
If seeing stale code after changes:
```bash
# Kill dev server (Ctrl+C)
# Restart
npm run dev
```

### Port Conflicts
```bash
# Find process using port
netstat -ano | findstr :3000
# Kill process
taskkill /PID <PID> /F
```

### Icon Library Verification
Always verify icon names exist before using:
- Phosphor: https://phosphoricons.com/
- Game Icons: https://react-icons.github.io/react-icons/icons/gi/
- React Kawaii: https://react-kawaii.vercel.app/

## Development Guidelines

### Adding New Features
1. Maintain PFEQ hierarchy compliance
2. Test cascading filter dependencies
3. Ensure dark mode compatibility
4. Verify TypeScript strict mode compliance
5. Test with different card counts (8, 16, 24)

### Code Quality
- TypeScript strict mode enabled
- Use proper type definitions (no `any` unless necessary)
- Follow existing component patterns
- Maintain separation between layers (app/core/data)

### Performance Considerations
- Card generation: ~60-75 seconds (API limitation)
- Use Turbopack for faster development builds
- Lazy load heavy components when possible
- Optimize bundle size with specific imports

## Working Directory
Always work in: `C:\Users\Olivier\Desktop\quebec-teacher-hub-v5`
(v3 and v4 exist but should not be modified)