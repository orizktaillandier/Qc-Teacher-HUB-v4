# Quebec Teacher Hub v4

**Advanced educational task card generation system for Quebec teachers**

## 🎯 Project Status

**Current Phase**: Task Card Generation System Complete ✅
- Fully functional task card generation with PFEQ alignment
- Mathematical visual components (angles, triangles, fractions, graphs)
- Customizable fonts and text editing
- Print-optimized 2x4 grid layout
- Knowledge base integration from v3

## 🚀 Quick Start

### Development Server
```bash
cd app
npm install
npm run dev
```

The application will be available at `http://localhost:3000` (or auto-selected port).

### Tech Stack
- **Framework**: Next.js 15 + React 19
- **UI Library**: HeroUI (NextUI successor) + shadcn/ui components
- **Build Tool**: Turbopack enabled
- **Styling**: Tailwind CSS + Custom Quebec theme
- **AI Integration**: OpenAI GPT-4o/GPT-5
- **Knowledge Base**: SQLite with 346 PFEQ curriculum chunks

## 📁 Project Structure

```
quebec-teacher-hub-v4/
├── app/                        # Next.js application
│   ├── src/
│   │   ├── app/               # App Router pages
│   │   │   ├── cards-v2/      # Task card generation page
│   │   │   └── api/          # API routes
│   │   │       └── generate-card-v2/  # Card generation endpoint
│   │   ├── components/        # React components
│   │   │   ├── MathVisuals.tsx      # Mathematical visualizations
│   │   │   ├── TaskCardThemes.tsx   # Card theming
│   │   │   ├── CardIllustration.tsx # Kawaii character illustrations
│   │   │   ├── DraggableIllustration.tsx # Draggable/resizable wrapper
│   │   │   └── ui/                  # UI components
│   │   └── lib/              # Core libraries
│   │       ├── knowledge-retrieval.ts # PFEQ knowledge system
│   │       └── illustration-service.ts # Character theme management
│   └── data/
│       └── kb_index.sqlite    # Knowledge base (1.7MB)
├── PROJECT_ROADMAP.md         # Comprehensive documentation
└── README.md                  # This file
```

## 🎨 Key Features

### ✅ Working Features

#### Task Card Generation
- **8 Cards Per Generation**: Standard 2x4 grid layout for printing
- **PFEQ Aligned**: Questions aligned with Quebec curriculum
- **Direct Questions**: Simple, straightforward educational questions (no context)
- **Progressive Difficulty**: Cards increase in difficulty (easy → medium → hard)
- **Multiple Subjects**: Mathematics, French, Science & Technology

#### Mathematical Visualizations
Visual components that render inline with questions:
- **Angles**: `[visual:angle:degrees:size]` - Interactive angle displays
- **Triangles**: `[visual:triangle:angleA:angleB:angleC]` - With angle labels
- **Fractions**: `[visual:fraction:numerator:denominator:filled]` - Visual pie charts
- **Number Lines**: `[visual:numberline:min:max:points]` - With markers
- **Grids**: `[visual:grid:rows:cols:filled]` - For area/multiplication
- **Clocks**: `[visual:clock:hour:minute]` - Analog clock faces
- **Shapes**: `[visual:shape:type:size]` - Geometric shapes
- **Graphs**: `[visual:graph:values]` - Bar graphs

#### Customization Features
- **Font Selection**: 20+ fonts including fun student-friendly options
  - System fonts: Arial, Georgia, Times New Roman
  - Fun fonts: Kalam, Fredoka, Bubblegum Sans, Comic Neue
  - Script fonts: Dancing Script, Pacifico, Satisfy
- **Font Size Control**: Adjustable from 10px to 24px
- **Text Styling**: Bold and italic toggles
- **Inline Editing**: Click any text to edit directly
- **Theme Selection**: Multiple gradient backgrounds

#### Interactive Illustrations 🎨 NEW!
- **Kawaii Characters**: Fun, educational illustrations using React Kawaii library
- **Character Themes**: 13 different character styles (Cat, Ghost, Planet, Ice Cream, etc.)
- **Consistent Themes**: Option to use the same character across all cards
- **Interactive Controls**:
  - Drag & drop illustrations anywhere on the card
  - Resize illustrations with visual handles
  - Rotate illustrations to any angle
  - Scale illustrations from 50% to 200%
- **Transparent Background**: Option to remove colored background behind characters
- **Smart Positioning**: Illustrations adapt to card layout without overlapping text

#### Knowledge Base Integration
- **346 Curriculum Chunks**: From Quebec PFEQ
- **10 Subjects**: Complete Quebec curriculum coverage
- **Token-Aware Retrieval**: Optimized for AI context windows
- **Sub-100ms Query Times**: SQLite optimized performance

### 📋 Supported Content Types

#### Mathematics
- Nombres naturels (natural numbers)
- Fractions and decimals
- Addition, subtraction, multiplication, division
- Geometry (angles, shapes, perimeter, area)
- Measurement and volume

#### French
- Reading strategies
- Text comprehension
- Grammar (word classes, agreements)
- Conjugation (present, imparfait)
- Vocabulary

#### Science & Technology
- States of matter
- Life cycles
- Food chains
- Solar system
- Water cycle

## 🔧 API Endpoints

### `/api/generate-card-v2`
**POST** - Generate 8 task cards
```json
{
  "cycle": "cycle2-primaire",
  "grade": "3",
  "subject": "mathematiques",
  "notion": "fractions"
}
```

Response includes 8 cards with questions, answers, and visual codes.

## 📚 Development Commands

```bash
# Development
npm run dev          # Start dev server with Turbopack

# Building
npm run build        # Production build
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
npm run typecheck    # TypeScript type checking

# Testing
npm test            # Run tests (when configured)
```

## 📝 Recent Updates

### December 2024 - Interactive Illustrations Release
- ✨ Added React Kawaii character illustrations to task cards
- 🎨 13 different character themes (Cat, Ghost, Planet, Ice Cream, etc.)
- 🔄 Consistent character theme option across all cards
- 🖱️ Drag & drop illustrations with resize and rotate capabilities
- 🎯 Transparent background option for cleaner designs
- 🐛 Fixed illustration randomization on slider adjustments
- ⚡ Improved Turbopack compatibility by removing styled-jsx

## 🎯 Next Steps

### Remaining Features
- [ ] Answer Sheet Generation - Separate page for student answers
- [ ] Corriger (Answer Key) - Teacher's correction guide
- [ ] PDF Export - Print-ready PDF generation
- [ ] Save/Load Sessions - Persist generated cards
- [ ] History Tracking - View previously generated cards

### Polish Items
- [ ] Loading animations during generation
- [ ] Better error handling and user feedback
- [ ] Keyboard shortcuts for common actions
- [ ] Mobile responsive improvements
- [ ] Accessibility enhancements (ARIA labels)

## 🔗 Environment Variables

Create `.env.local` in the `app` directory:

```bash
# OpenAI API
OPENAI_API_KEY=your_openai_api_key

# Optional: Specific model selection
AI_MODEL=gpt-4o  # or gpt-5 when available
```

## 📊 Technical Details

### Performance
- **Generation Time**: 3-5 seconds for 8 cards
- **Hot Reload**: < 1 second with Turbopack
- **Knowledge Retrieval**: < 100ms query time
- **Build Size**: Optimized with Next.js 15

### Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Print Optimization
- A4 paper size (210mm x 297mm)
- 2x4 grid layout
- High contrast for B&W printing
- Proper margins and spacing

## 🐛 Known Issues

1. Some complex mathematical expressions may need manual adjustment
2. Print preview may vary slightly between browsers
3. Very long answers might overflow card boundaries

## 📄 License

Private project for Quebec Teacher Hub

---

**Quebec Teacher Hub v4** - Empowering Quebec educators with AI-powered content generation