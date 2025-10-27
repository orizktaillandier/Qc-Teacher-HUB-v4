# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project: Quebec Teacher Hub v5
Educational card generator for Quebec teachers, fully aligned with PFEQ (Programme de formation de l'école québécoise) curriculum standards.

**Design Philosophy**: Quebec Creative Studio - A warm, colorful, and professional design language inspired by educational tools like Canva, featuring custom illustrations, smooth animations, and a Quebec-themed color palette.

## Commands

```bash
# Development
cd app
npm run dev           # Start development server with Turbopack (http://localhost:3000)
npm run build         # Build for production with Turbopack
npm start            # Start production server

# Database (Prisma)
npx prisma generate   # Generate Prisma client (runs automatically on npm install)
npx prisma db push    # Push schema changes to database (development)
npx prisma migrate dev # Create and apply migration (production-ready)
npx prisma studio     # Open database GUI

# Testing API endpoints
curl -X POST http://localhost:3000/api/generate-cards \
  -H "Content-Type: application/json" \
  -d '{"cycle":"cycle2-primaire","grade":"3","subject":"mathematiques","notion":"fractions","subNotions":[],"count":8}'

curl -X POST http://localhost:3000/api/generate-drill-sheets \
  -H "Content-Type: application/json" \
  -d '{"cycle":"cycle2-primaire","grade":"3","subject":"mathematiques","notion":"fractions","subNotions":[],"exerciseCount":15,"difficulty":"progressive","includeAnswerKey":true}'
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
- **Frontend**: Next.js 15.5.4 with App Router & Turbopack, React 19.1.0
- **Styling**: Tailwind CSS v4, Shadcn/ui components (New York style), next-themes for dark mode
- **Animations**: Framer Motion for spring animations
- **Authentication**: NextAuth.js v5 with Google OAuth (JWT strategy, no database sessions)
- **Database**: Prisma ORM with PostgreSQL (production) or SQLite (development)
- **AI**: OpenAI GPT-5/GPT-5-mini API for card/drill sheet generation
- **Knowledge Base**: SQLite database with 346 PFEQ content chunks (data/kb_index.sqlite)
- **PDF Export**: Client-side with html-to-image + jsPDF (no server-side rendering)

### Design System
- **Quebec Color Palette**:
  - Primary: Maple Orange (#E67E22) - Warmth and energy
  - Secondary: Quebec Blue (#1976D2) - Trust and professionalism
  - Accent: Forest Green (#27AE60) - Growth and nature
- **Typography**:
  - Display font: Quicksand (warm, friendly headings)
  - Body font: Inter (readable, modern)
- **Border Radius**: 1rem (rounded-2xl) - Warm, approachable feel
- **Animations**: Spring physics (stiffness: 100-300, damping: 12-20)
- **Glass-morphism**: 80-85% opacity + backdrop-blur-md for depth

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
- `mathematiques` → `mathematiques` (keep plural - database has 43 chunks vs 2 in singular)
- `fractions` → `nombres-naturels` (fraction content is indexed under nombres-naturels)
- Frontend notion keys map to specific database notion keys (see `app/src/app/api/generate-cards/route.ts` and `app/src/app/api/generate-drill-sheets/route.ts`)
- **Critical**: Using correct mappings retrieves 14 chunks for fractions vs 0 with wrong mapping

## Key Implementation Files

### Background Pattern Component (`app/src/components/ui/background-pattern.tsx`)
Professional educational illustrations displayed as background:
- **12 custom SVG illustrations**: Teacher at board, books, light bulb, globe, pencils, apple, graduation cap, calculator, trophy, microscope, art palette, atom
- **Inline SVG approach**: No external dependencies, full customization control
- **Strategic positioning**: x/y percentages spread across page
- **Size range**: 270-420px for visual hierarchy
- **Opacity range**: 42-50% for subtle but visible presence
- **Performance**: Inline reduces HTTP requests, GPU-accelerated rendering

Implementation pattern:
```typescript
const illustrations = [
  {
    svg: <svg>...</svg>,
    x: "2%",
    y: "8%",
    size: 400,
    opacity: 0.45
  },
  // ... 11 more
]
```

**Why inline SVG over external files?**
- Eliminates HTTP requests (faster)
- Full control over colors and styling
- No dependency on third-party APIs (Undraw returned 404)
- Easy to customize per theme
- Better tree-shaking in production builds

### Glass-morphism Card Technique
Transparent cards with backdrop blur create depth:
```typescript
className="bg-gradient-to-br from-purple-200/80 to-purple-300/80
  backdrop-blur-md rounded-2xl"
```
- `/80` suffix = 80% opacity (Tailwind arbitrary values)
- `backdrop-blur-md` = blur background for glass effect
- Allows background illustrations to show through

### Generator Page (`app/src/app/generator/page.tsx`)
- PFEQ cascading filters implementation
- Theme and illustration selection
- Card preview and customization
- PDF export functionality
- Text editing and positioning controls

### PFEQ Data (`core/pfeq-structure.ts`)
Complete Quebec curriculum with:
- **3 cycles mapping to 6 grades**:
  - Cycle 1: Grades 1-2 (maternelle-1ère année)
  - Cycle 2: Grades 3-4 (2e-3e année)
  - Cycle 3: Grades 5-6 (4e-5e-6e année)
- **11 subjects with cycle availability**
- **Complete notion/sub-notion hierarchy** for each subject
- **Utility functions**:
  - `getGradesForCycle(cycleKey)`: Returns available grades for a cycle
  - `getSubjectsForCycle(cycleKey)`: Returns subjects available for a cycle
  - `getNotionsForSubjectAndCycle(subject, cycle)`: Returns notions filtered by subject/cycle
  - `getSubNotionsForNotion(subject, notion)`: Returns sub-notions for a notion

**Core Layer Structure** (`core/`):
- `pfeq-structure.ts`: Curriculum data and filter utilities
- `themes/`: 59+ card themes organized by category
- `illustrations/`: Character definitions for all 4 libraries
- `generation/`: Card generation logic and formatting
- `knowledge/`: Knowledge base query utilities
- `types/`: TypeScript interfaces for cards, themes, PFEQ structures
- `services.ts`: Shared business logic services

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

## Drill Sheet Generator Architecture

### Overview
The drill sheet generator creates printable exercise worksheets (fiches d'exercices) aligned with Quebec's PFEQ curriculum. Teachers can customize layout, difficulty, and styling for professional print-ready worksheets.

### Key Components

#### Drill Generator Page (`app/src/app/drill-generator/page.tsx`)
Main page implementing drill sheet generation workflow:
- **Pre-generation phase**: ProgressiveFilters with drill-specific options (exercise count, difficulty, show badges, answer key)
- **Post-generation phase**: Styling sidebar (theme, font, grid layout) + preview with tabs (exercises/corrigé)
- **State management**: 11 state variables for PFEQ filters, drill settings, and generation status
- **Auto-generation**: Starts generation immediately after filter completion
- **Real-time updates**: Grid layout changes reflected instantly in preview

#### Drill Sheet Renderer (`app/src/components/DrillSheetRenderer.tsx`)
Renders exercises with flexible grid layout:
- **Grid system**: CSS Grid with dynamic rows/columns from props
- **Pagination**: Automatic page breaks based on exercisesPerPage (rows × columns)
- **Fraction formatting**: Converts "a/b" to proper stacked fractions with horizontal divider
- **Theme-independent**: Black text on white background for consistent printing
- **Fixed A4 portrait**: 210mm × 297mm pages with proper headers, footers, and page numbers
- **Dual modes**: Exercise view (clean questions) and answer view (green answer boxes)

#### Progressive Filters (`app/src/components/ProgressiveFilters.tsx`)
Shared filter component with mode-based behavior:
- **Mode prop**: `'cards' | 'drillSheet'` determines UI and options
- **Drill-specific options** (step 4): Exercise count slider, difficulty select, show difficulty checkbox, include answer key checkbox
- **Button text**: "Générer la fiche" for drill mode vs "Générer X cartes" for card mode
- **State handling**: Passes drill options to parent via onFiltersComplete callback

#### Type Definitions (`app/src/lib/drill-sheet-types.ts`)
Complete TypeScript interfaces for drill sheets:
- **DrillExercise**: Base interface with question, answer, difficulty, context, choices, format
- **DrillSheetData**: Complete drill sheet structure with PFEQ metadata, settings, styling, grid layout
- **Subject-specific types**: MathExercise, FrenchExercise, ScienceExercise with specialized fields
- **API types**: Request/response interfaces for generation and saving

### Database Schema

#### drill_sheet_generations table
Stores user's generated drill sheets (see `app/prisma/schema.prisma`):
```sql
- id (TEXT, PK)
- user_id (TEXT, FK to users)
- cycle, grade, subject, notion, subNotions (TEXT)
- exercise_count (INTEGER)
- difficulty (TEXT: uniform/progressive/mixed)
- include_answer_key (BOOLEAN)
- theme, font_family, fontSize (styling)
- exercises (Json array) -- Critical field with raw drill sheet data
- custom_title, custom_instructions (TEXT)
- show_difficulty (BOOLEAN)
- created_at, updated_at (TIMESTAMP)
```

**Note**: Grid layout (gridColumns, gridRows) is currently stored in the `exercises` JSON field or managed client-side. Consider adding dedicated columns if persistence is needed.

#### shared_drill_sheets table
For community sharing (not yet implemented):
- Same fields as drill_sheet_generations
- Additional: author_name, author_email, views, copies, shared_at

### API Endpoints

#### `/api/generate-drill-sheets` (POST)
Generates drill sheet exercises using GPT-5 API:
- **Input**: cycle, grade, subject, notion, subNotions, exerciseCount, difficulty, includeAnswerKey
- **Process**:
  1. Maps frontend keys to database keys
  2. Retrieves PFEQ knowledge chunks from SQLite
  3. Constructs specialized prompt for exercise generation
  4. Calls GPT-5 with structured JSON output
  5. Returns exercises array with metadata
- **Response time**: ~60-75 seconds for 15-20 exercises
- **Model selection**: Same as cards (GPT-5-mini for ≤10, GPT-5 for 11+)

#### `/api/library/save-drill-sheet` (POST)
Saves generated drill sheet to user's library:
- **Authentication**: Requires valid session
- **Validation**: Checks required fields and user ownership
- **Storage**: Inserts into drill_sheet_generations table with JSON stringified arrays

#### `/api/library/drill-sheets/[id]` (GET, DELETE)
Retrieves or deletes specific drill sheet:
- **GET**: Returns drill sheet with parsed JSON fields
- **DELETE**: Verifies ownership before deletion

### Grid Layout System

The grid system allows flexible exercise arrangement:

**Configuration**:
- Columns: 1-3 (controlled by slider)
- Rows: 1-4 (controlled by slider)
- Exercises per page: rows × columns

**Implementation**:
```typescript
// CSS Grid in DrillSheetRenderer
style={{
  display: 'grid',
  gridTemplateColumns: `repeat(${gridColumns}, 1fr)`,
  gridTemplateRows: `repeat(${gridRows}, 1fr)`,
  gap: '1rem',
  height: '100%'
}}
```

**Pagination logic**:
```typescript
const exercisesPerPage = gridColumns * gridRows;
const pages: DrillExercise[][] = [];
for (let i = 0; i < exercises.length; i += exercisesPerPage) {
  pages.push(exercises.slice(i, i + exercisesPerPage));
}
```

### Fraction Formatting

Automatic conversion of slash fractions to proper mathematical notation:

**Pattern matching**: `/(\d+)\/(\d+)/g` regex
**Rendering**:
```typescript
<span className="inline-flex flex-col items-center mx-1">
  <span style={{ borderBottom: '1px solid #000' }}>{numerator}</span>
  <span>{denominator}</span>
</span>
```

**Applied to**: Questions, contexts, choices, and answers

### PDF Export

Client-side PDF generation using html-to-image and jsPDF:

**Process**:
1. Find all `.print-page` elements (one per A4 page)
2. Capture each page as PNG using html-to-image
3. Add to jsPDF document in A4 portrait format (210mm × 297mm)
4. Save with filename: `fiche-exercices-{subject}-{notion}-{timestamp}.pdf`

**Features**:
- Preserves grid layout and pagination
- Includes headers with page numbers
- Shows answer key if in corrigé mode
- Maintains font rendering and fraction formatting

## Database & Authentication Architecture

### Authentication System
**NextAuth.js v5 with JWT Strategy** (`app/auth.ts`, `app/auth.config.ts`):
- **Session storage**: JWT tokens (no database sessions required)
- **Provider**: Google OAuth 2.0
- **Session duration**: 30 days
- **Token contents**: User ID, email, name, profile image, Google access token
- **Protected routes**: Middleware in `app/middleware.ts` guards /home, /generator, /drill-generator, /library
- **Sign-in flow**: Landing page → Google OAuth → /home dashboard

**Why JWT instead of database sessions?**
- Faster authentication (no database lookups)
- Better scalability (stateless)
- Simpler deployment (no session storage required)

### Database Architecture
**Prisma ORM** with dual database support:
- **Development**: SQLite (`app/prisma/dev-new.db`)
- **Production**: PostgreSQL (connection via `DATABASE_URL`)
- **Schema**: See `app/prisma/schema.prisma`

**Key Models**:
1. **User**: NextAuth user data (id, email, name, image)
2. **CardGeneration**: User's saved task card generations (PFEQ metadata + cards JSON + styling)
3. **SharedGeneration**: Community-shared task cards (includes views/copies tracking)
4. **DrillSheetGeneration**: User's saved drill sheets (exercises JSON + layout settings)
5. **SharedDrillSheet**: Community drill sheets (not yet implemented)

**Important**: The `exercises` field in DrillSheetGeneration is type `Json` and stores the complete array of exercise objects. Grid layout settings may need dedicated columns if persistence beyond client state is required.

### Knowledge Base
**Separate SQLite database** (`data/kb_index.sqlite`):
- 346 PFEQ curriculum chunks
- Queried via `better-sqlite3` (not Prisma)
- Used for context retrieval during card/drill sheet generation
- See `core/knowledge/` for query utilities

## API Architecture

### Card Generation (`/api/generate-cards`)
- **Accepts**: cycle, grade, subject, notion, subNotions, count
- **Process**:
  1. Maps frontend keys to database keys (e.g., `fractions` → `nombres-naturels`)
  2. Retrieves relevant PFEQ knowledge chunks from SQLite knowledge base
  3. Calls GPT-5 API with structured JSON output format
  4. Returns generated cards with metadata
- **Response time**: ~60-75 seconds for 8 cards
- **Dynamic model selection**: GPT-5-mini for ≤10 cards, GPT-5 for 11+ cards
- **Authentication**: Requires valid session (checks NextAuth token)
- **Knowledge retrieval**: Correctly configured mappings retrieve 14 chunks for fractions

### Drill Sheet Generation (`/api/generate-drill-sheets`)
- **Accepts**: cycle, grade, subject, notion, subNotions, exerciseCount, difficulty, includeAnswerKey
- **Process**: Similar to card generation but generates exercise objects instead
- **Improved GPT prompt**: Enforces strict grouping rules for questions with same instructions
- **Response time**: ~60-75 seconds for 15-20 exercises
- **Output format**: Array of DrillExercise objects with question, answer, difficulty, context
- **Knowledge retrieval**: Uses same corrected mappings as card generation

### PDF Generation (`/api/generate-pdf-html`)
- **Server-side**: Uses Puppeteer for high-quality PDF rendering (task cards only)
- **Client-side**: html-to-image + jsPDF for drill sheets (better grid layout preservation)
- Handles SVG color conversion (hex to RGB)
- Supports 2x2 card grid per page (A4 landscape)
- Preserves illustrations and custom positioning

## Current Implementation Status

### ✅ Completed (v5.0 UI/UX Redesign - Oct 12, 2025)
- **Quebec Creative Studio Design**:
  - 12 professional background illustrations (custom SVG)
  - Warm Quebec color palette throughout
  - Smooth Framer Motion spring animations
  - Command palette with Ctrl+K (Canva-inspired)
  - Glass-morphism card effects (transparent + backdrop blur)
  - Staggered entrance animations for visual hierarchy
  - Hover effects with scale and lift animations
  - Dark mode with seamless transitions
- PFEQ-compliant cascading filters
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

### ✅ Drill Sheet Generator (v5.1 - Oct 25, 2025)
- **Complete drill sheet (fiche d'exercices) generator** aligned with PFEQ
- **Knowledge base integration**: Fixed - Now retrieving 14 chunks for fractions (correct subject/notion key mappings)
- **Pre-generation options**: Exercise count (5-30), difficulty strategy (uniform/progressive/mixed), show difficulty badges, include answer key
- **Post-generation styling**: Theme selection, font family, font size (10-16pt), custom title, custom instructions
- **Dynamic height-based pagination**: Estimates exercise heights based on content and font size, automatically adjusts when font changes
- **Space-optimized layout**: Reduced padding (15mm), smaller title, tighter spacing between questions
- **Enhanced fraction formatting**: Handles all formats - `3/5`, `___/20`, `_/24`, etc. with proper horizontal divider
- **Improved GPT prompt**: Strict rules for grouping questions with same instructions, maintains content coherence across multi-part questions
- **Clean design**: Black text on white background (theme-independent for printing)
- **Dual view modes**: Exercises view (for students) and Corrigé view (answer key)
- **PDF export**: Client-side generation with html-to-image, preserves fonts and fractions, CORS-safe Google Fonts handling
- **Database integration**: Prisma models for drill_sheet_generations and shared_drill_sheets tables
- **Save to library**: Store generated drill sheets for future access
- **Real-time preview**: Pagination adjusts dynamically as styling changes

### 🚧 Not Yet Implemented
- Templates page (placeholder only)
- Resources page (placeholder only)
- Image export (PNG/JPG)
- Batch generation
- Drill sheet sharing to community library

## Environment Configuration

Required `.env.local` (see `app/.env.local`):
```bash
# AI Configuration
OPENAI_API_KEY=sk-...              # Required for card/drill sheet generation
AI_MODEL=gpt-5                     # Main model (default: gpt-5)
AI_MODEL_SMALL=gpt-5-mini         # Small model for ≤10 cards
AI_MODEL_FALLBACK=gpt-5-mini      # Fallback model
AI_CARD_COUNT_THRESHOLD=10        # Threshold for model selection

# Authentication (Required)
NEXTAUTH_SECRET=...               # Required: Generate with `openssl rand -base64 32`
NEXTAUTH_URL=http://localhost:3000  # Required: Base URL (change for production)
GOOGLE_CLIENT_ID=...              # Required: Google OAuth client ID from console.cloud.google.com
GOOGLE_CLIENT_SECRET=...          # Required: Google OAuth secret

# Database
DATABASE_URL=postgresql://...      # PostgreSQL connection string for production
                                  # For local dev, Prisma uses: file:./dev-new.db (SQLite)
                                  # Note: card_generations and drill_sheet_generations tables required
```

**First-time setup**:
1. Copy `app/.env` to `app/.env.local`
2. Add your `OPENAI_API_KEY` and Google OAuth credentials
3. Generate `NEXTAUTH_SECRET`: `openssl rand -base64 32`
4. Run `npx prisma generate` to create Prisma client
5. Run `npx prisma db push` to create database tables

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

### Turbopack Build Errors
**Issue**: "high bits position" error during build
**Solution**: `turbopackScopeHoisting: false` is set in `next.config.ts` as a workaround

### Turbopack Caching
If seeing stale code after changes:
```bash
# Kill dev server (Ctrl+C)
# Delete .next cache
rm -rf app/.next  # or: if exist .next rmdir /s /q .next (Windows)
# Restart
npm run dev
```

### Port Conflicts
```bash
# Find process using port
netstat -ano | findstr :3000
# Kill process
taskkill /PID <PID> /F
# Or use kill-port package
npx kill-port 3000
```

### Prisma Client Issues
**Issue**: "Cannot find module '@prisma/client'"
**Solution**:
```bash
cd app
npx prisma generate
```

**Issue**: Schema changes not reflecting
**Solution**:
```bash
npx prisma db push           # Push changes to dev database
# OR for production migrations:
npx prisma migrate dev --name description_of_change
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
3. **Follow Quebec Creative Studio design language**:
   - Use Quebec color palette (primary/secondary/accent)
   - Add Framer Motion spring animations for interactions
   - Apply glass-morphism effects for cards (80-85% opacity + backdrop-blur-md)
   - Use rounded-2xl for warmth
   - Add hover states with scale-105 transitions
4. Ensure dark mode compatibility
5. Verify TypeScript strict mode compliance
6. Test with different card counts (8, 16, 24)

### Animation Guidelines
- **Use Framer Motion spring physics**: `type: "spring", stiffness: 100-300, damping: 12-20`
- **Stagger children for hierarchy**: `staggerChildren: 0.1, delayChildren: 0.2`
- **Hover effects**: `whileHover: { scale: 1.05, y: -5 }` for lift effect
- **Tap feedback**: `whileTap: { scale: 0.98 }` for tactile response
- **Respect reduced motion**: Framer Motion handles this by default

### Design System Adherence
- **Cards**: Always use gradient backgrounds with 80-85% opacity
- **Borders**: Use color-400 or color-500 for definition
- **Shadows**: Use shadow-xl base, shadow-2xl on hover
- **Icon backgrounds**: white/40 for contrast
- **Text hierarchy**: font-display for headings, regular for body

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

## Project Structure

```
quebec-teacher-hub-v5/
├── app/                          # Next.js application layer
│   ├── src/
│   │   ├── app/                 # App Router pages
│   │   │   ├── api/            # API routes (generate-cards, generate-drill-sheets, library, etc.)
│   │   │   ├── generator/      # Task card generator page
│   │   │   ├── drill-generator/ # Drill sheet generator page (NEW in v5.1)
│   │   │   ├── home/           # Dashboard
│   │   │   ├── library/        # User's saved generations
│   │   │   └── shared-library/ # Community library
│   │   ├── components/         # React components
│   │   │   ├── ui/            # Shadcn/ui components (button, dialog, slider, etc.)
│   │   │   ├── navigation.tsx # Main navigation
│   │   │   ├── ProgressiveFilters.tsx # Shared PFEQ filter component
│   │   │   ├── DrillSheetRenderer.tsx # Drill sheet preview/print
│   │   │   └── DrillSheetOptions.tsx  # Drill customization panel
│   │   └── lib/               # Utilities
│   │       ├── drill-sheet-types.ts  # TypeScript interfaces for drill sheets
│   │       └── pdf-generation.ts     # PDF export utilities
│   ├── prisma/
│   │   ├── schema.prisma      # Database schema (User, CardGeneration, DrillSheetGeneration)
│   │   └── dev-new.db         # SQLite dev database
│   ├── auth.ts                # NextAuth configuration
│   ├── auth.config.ts         # NextAuth providers
│   ├── middleware.ts          # Route protection
│   └── next.config.ts         # Next.js config (turbopackScopeHoisting workaround)
│
├── core/                        # Business logic layer (migrated from v4)
│   ├── pfeq-structure.ts       # Quebec curriculum hierarchy + filter utilities
│   ├── themes/                 # 59+ card themes
│   ├── illustrations/          # Character definitions (Kawaii, Phosphor, Emoji, Game Icons)
│   ├── generation/             # Card generation & formatting logic
│   ├── knowledge/              # Knowledge base query utilities
│   ├── types/                  # Shared TypeScript interfaces
│   └── services.ts             # Business logic services
│
├── data/                        # Data layer
│   └── kb_index.sqlite         # Knowledge base (346 PFEQ chunks, queried via better-sqlite3)
│
├── CLAUDE.md                    # Instructions for Claude Code (this file)
├── README.md                    # Project overview
└── .env.local                   # Environment variables (not in git)
```

## Working Directory
Always work in: `C:\Users\Olivier\Desktop\quebec-teacher-hub-v5`

**Note**: Previous versions (v3, v4) exist in parent directory but should not be modified. This is the production v5 version.