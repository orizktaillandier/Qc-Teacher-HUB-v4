# Quebec Teacher Hub v5

Production-ready educational card generator for Quebec teachers, fully aligned with PFEQ (Programme de formation de l'école québécoise).

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

### PFEQ-Compliant Generator
- Cascading filters in correct order: Cycle → Grade → Subject → Notion → Sub-notions
- Full Quebec curriculum coverage
- Automatic filter updates based on selections

### Modern Tech Stack
- Next.js 15.5.4 with App Router
- Shadcn/ui components
- Tailwind CSS v4
- React 19.1.0
- TypeScript with strict mode

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

## 📝 Current Status (Oct 11, 2025)

✅ **Completed**:
- PFEQ-compliant cascading filters
- Dark mode support
- Responsive navigation
- Google OAuth authentication
- Card generation with GPT-5/GPT-5-mini
- 120+ illustrations (4 libraries: Kawaii, Phosphor, Emoji, Game Icons)
- 59+ Quebec themes
- PDF export functionality
- Library system (save/load generations)
- Shared community library
- TypeScript strict mode (all errors resolved)
- Production build working (with Turbopack workaround)

🚧 **Not Yet Implemented**:
- Templates page (placeholder only)
- Resources page (placeholder only)
- Image export (PNG/JPG)
- Batch generation

## 🔗 Navigation

- **Landing** (/) - Google OAuth sign-in
- **Home** (/home) - Dashboard with features (auth required)
- **Générateur** (/generator) - PFEQ-compliant card generator (auth required)
- **Library** (/library) - Saved generations (auth required)
- **Shared Library** (/shared-library) - Community cards (auth required)
- **Modèles** - Template library (coming soon)
- **Ressources** - Educational resources (coming soon)

## 👨‍💻 Development

This is the v5 production version. Previous versions (v3, v4) should not be modified.

**Important**: When starting a new session, use `./init` to ensure proper environment setup.