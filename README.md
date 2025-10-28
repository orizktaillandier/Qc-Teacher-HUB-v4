# ProfStudio

Production-ready educational tools for Quebec teachers:
- **Task Card Generator**: Create custom educational cards aligned with PFEQ
- **Drill Sheet Generator (NEW)**: Generate printable exercise worksheets with customizable layouts

## 🚀 Quick Start

```bash
# Navigate to project
cd C:\Users\Olivier\Desktop\quebec-teacher-hub-v5

# Install dependencies (if needed)
cd app
npm install

# Start development server
npm run dev
```

Open http://localhost:3000

## 📚 Documentation

- **[CLAUDE.md](./CLAUDE.md)** - Detailed instructions for Claude Code
- **[PROJECT_STATUS.md](./PROJECT_STATUS.md)** - Current implementation status
- **[MIGRATION_SUMMARY.md](./MIGRATION_SUMMARY.md)** - Migration details from v4

## 🎯 Key Features

### Quebec Creative Studio Design
- **Professional educational illustrations**: 12 custom SVG background illustrations (teacher, books, globe, etc.)
- **Warm & playful aesthetic**: Quebec color palette (Maple Orange, Quebec Blue, Forest Green)
- **Smooth animations**: Framer Motion spring physics for natural, polished interactions
- **Command palette**: Quick navigation with Ctrl+K (Canva-inspired)
- **Glass-morphism effects**: Transparent cards with backdrop blur for modern depth
- **Dark mode support**: Seamless theme switching with system preference detection

### PFEQ-Compliant Generator
- Cascading filters in correct order: Cycle → Grade → Subject → Notion → Sub-notions
- Full Quebec curriculum coverage
- Automatic filter updates based on selections

### Modern Tech Stack
- Next.js 15.5.4 with App Router & Turbopack
- Shadcn/ui components
- Tailwind CSS v4
- React 19.1.0
- TypeScript with strict mode
- Framer Motion for animations

### Quebec-Specific Content
- 59+ authentic Quebec themes
- French language with proper accents
- Local cultural contexts
- 346 curriculum chunks in knowledge base

## 🏗️ Architecture

```
v5/
├── app/          # Next.js application
├── core/         # Business logic & PFEQ structure
├── data/         # SQLite knowledge base
└── docs/         # Documentation
```

## 📝 Current Status

### ✅ v5.0 - Quebec Creative Studio (Oct 12, 2025)
- **UI/UX Redesign**:
  - 12 professional background illustrations
  - Warm color palette with gradients
  - Smooth Framer Motion animations
  - Command palette (Ctrl+K)
  - Glass-morphism card effects
  - Dark mode support
- PFEQ-compliant cascading filters
- Google OAuth authentication
- Card generation with GPT-5/GPT-5-mini
- 120+ illustrations (4 libraries)
- 59+ Quebec themes
- PDF export functionality
- Library system (save/load generations)
- Shared community library
- TypeScript strict mode
- Production build working

### ✅ v5.1 - Drill Sheet Generator (Oct 25, 2025)
- **Complete drill sheet feature** for generating exercise worksheets
- **Knowledge base integration**: Fixed - Now retrieves 14 chunks for fractions (vs 0 before)
- **Pre-generation customization**:
  - Exercise count (5-30 exercises)
  - Difficulty strategy (uniform/progressive/mixed)
  - Show difficulty badges option
  - Include answer key option
- **Post-generation styling**:
  - Theme selection (simple/colorful/minimal)
  - Font family and size (10-16pt)
  - Custom title and instructions
- **Smart features**:
  - **Dynamic height-based pagination**: Automatically adjusts based on content & font size
  - **Space-optimized layout**: Reduced padding, smaller title, tighter spacing
  - **Enhanced fraction formatting**: Handles all formats - `3/5`, `___/20`, `_/24`, etc.
  - **Improved GPT prompt**: Groups questions with same instructions, maintains content coherence
  - Real-time preview updates
  - Dual view: Exercises and Corrigé (answer key)
- **PDF export** with font preservation and CORS-safe Google Fonts handling
- **Database integration** for saving to library

### 🚧 Not Yet Implemented
- Templates page (placeholder only)
- Resources page (placeholder only)
- Image export (PNG/JPG)
- Batch generation
- Drill sheet community sharing

## 🔗 Navigation

- **Landing** (/) - Google OAuth sign-in
- **Home** (/home) - Dashboard with features (auth required)
- **Générateur de Cartes** (/generator) - Task card generator (auth required)
- **Générateur de Fiches** (/drill-generator) - Drill sheet generator (auth required) **NEW**
- **Library** (/library) - Saved generations (auth required)
- **Shared Library** (/shared-library) - Community cards (auth required)
- **Modèles** - Template library (coming soon)
- **Ressources** - Educational resources (coming soon)

## 👨‍💻 Development

This is the v5 production version. Previous versions (v3, v4) should not be modified.

**Important**: When starting a new session, use `./init` to ensure proper environment setup.