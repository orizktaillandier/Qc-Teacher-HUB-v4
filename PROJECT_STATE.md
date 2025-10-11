# Quebec Teacher Hub v5 - Project State Documentation

**Last Updated:** October 11, 2025
**Version:** 5.0
**Status:** ✅ Production Ready

## 🎉 Recent Major Achievements (Oct 11, 2025)

### Authentication & Security
- ✅ Google OAuth integration with NextAuth.js
- ✅ Auth middleware protecting all routes
- ✅ User database model with Prisma
- ✅ Session management across pages

### Database System
- ✅ Prisma ORM fully configured
- ✅ Clean database with proper migrations (dev-new.db)
- ✅ All CRUD operations tested and working
- ✅ Library and sharing functionality operational

### Build & TypeScript
- ✅ Fixed 25+ TypeScript strict mode errors
- ✅ Production build working with Turbopack workaround
- ✅ Added type declarations for react-undraw-illustrations
- ✅ All union type issues resolved

### Export & Features
- ✅ PDF export with html-to-image
- ✅ Personal library system
- ✅ Community sharing system
- ✅ Text positioning and editing

## 📋 Table of Contents
1. [Project Overview](#project-overview)
2. [Current Features](#current-features)
3. [Technical Architecture](#technical-architecture)
4. [Illustration System](#illustration-system)
5. [Known Issues & Challenges](#known-issues--challenges)
6. [Recent Changes](#recent-changes)
7. [Next Steps](#next-steps)

---

## 🎯 Project Overview

Quebec Teacher Hub v5 is an educational card generator for Quebec teachers, fully aligned with PFEQ (Programme de formation de l'école québécoise) curriculum standards. The application generates customized educational flashcards with AI-powered content generation.

### Core Purpose
- Generate PFEQ-compliant educational flashcards
- Support Quebec curriculum hierarchy (Cycles → Grades → Subjects → Notions)
- Provide multiple illustration options for kid-friendly card designs
- Export cards in various formats (PDF, images)

### Technology Stack
- **Framework:** Next.js 15.5.4 with App Router & Turbopack
- **Language:** TypeScript (strict mode)
- **UI Library:** Shadcn/ui (New York style)
- **Styling:** Tailwind CSS v4
- **Theme:** next-themes for dark mode
- **AI:** OpenAI GPT-5 for card generation
- **Database:** SQLite knowledge base (1.7MB, 346 chunks)

---

## ✨ Current Features

### 1. PFEQ Curriculum Integration
**Status:** ✅ Fully Implemented

#### Cascading Filter System
Mandatory hierarchy enforced in this exact order:
1. **Cycle d'apprentissage** (Learning cycle)
2. **Année scolaire** (School year/grade)
3. **Matière** (Subject)
4. **Notion principale** (Main concept)
5. **Sous-notions** (Sub-concepts) - Optional

#### Cycle-Subject Restrictions
- **Univers social:** Only cycles 2-3 (grades 3-6)
- **Fractions:** Start at cycle 2
- **Decimaux:** Only cycle 3
- **Probabilité:** Only cycle 3

#### Implementation Files
- **Data:** `core/pfeq-structure.ts` (14.2KB, complete curriculum)
- **UI:** `app/src/app/generator/page.tsx` (cascading filters)
- **Utilities:** Helper functions for filter dependencies

### 2. Illustration System
**Status:** ✅ Fully Implemented (4 Libraries)

#### Available Libraries

##### **Kawaii Characters** (16 characters)
- **Source:** react-kawaii
- **Prefix:** `kawaii-`
- **Features:**
  - Animated cute characters
  - 7 mood options (happy, sad, excited, blissful, lovestruck, shocked, ko)
  - Customizable colors
- **Characters:** Cat, Ghost, Ice Cream, Planet, Backpack, Mug, Browser, Chocolate, File, Credit Card, Speech Bubble, Astronaut, Cyborg, Folder, Human Cat, Human Dinosaur

##### **Phosphor Icons** (41 icons)
- **Source:** @phosphor-icons/react (SSR compatible)
- **Prefix:** `ph-`
- **Style:** Duotone
- **Categories:** Education, Math & Science, Arts, Rewards, Progress, Feedback, Fun
- **Examples:** Book, Brain, Lightbulb, Trophy, Rocket, Palette

##### **Educational Emoji** (47 emoji)
- **Source:** Native Unicode emoji
- **Prefix:** `emoji-`
- **Features:** Colorful, platform-native rendering
- **Categories:** Education, Math & Science, Arts, Rewards, Feedback, Fun
- **Examples:** 📖 Book, ✏️ Pencil, 🔬 Microscope, 🏆 Trophy, 🎨 Palette

##### **Game Icons** (16 icons)
- **Source:** react-icons/gi
- **Prefix:** `gi-`
- **Features:** Playful, game-themed designs
- **Categories:** Education, Math & Science, Arts, Rewards, Nature, Fun
- **Examples:** Brain, Atom, Rocket, Palette, Trophy, Unicorn, Dragon

#### Illustration Controls
- **Show/Hide:** Toggle illustration visibility
- **Size:** 50-200% scale adjustment (slider)
- **Mood:** 7 options (Kawaii only)
- **Color:** 6 preset colors + custom
- **Background:** Transparent or with background
- **Drag & Drop:** Repositioning (advanced mode)
- **Rotation:** Manual rotation control (advanced mode)
- **Copy Settings:** Apply same transform to all cards

#### Implementation Files
- **Main Component:** `app/src/components/KawaiiSelector.tsx`
- **Rendering:** `app/src/components/SimpleCardIllustration.tsx`
- **Drag System:** `app/src/components/DraggableIllustration.tsx`
- **Helper:** `app/src/app/generator/page.tsx` (getCharacterTheme function)

### 3. Theme System
**Status:** ✅ Fully Implemented (59+ themes)

#### Theme Categories
- **Teacher-Loved Themes:** 916 lines, popular classroom styles
- **Fun Kid Themes:** 800 lines, playful designs
- **Bordered Card Themes:** 424 lines, frame variations
- **Minecraft Pixel Themes:** 419 lines, pixel art style
- **Original GitHub Themes:** 277 lines, classic designs
- **Scrapbook Themes:** 235 lines, handmade aesthetic

#### Theme Files Location
`core/themes/*.ts` (3,134 total lines across 6 files)

### 4. Card Generation System
**Status:** ✅ Operational

#### AI Generation
- **Model:** GPT-5 with structured JSON output
- **Knowledge Base:** SQLite database with PFEQ content
- **Token Budget:** ~5,102 tokens per request
- **Chunk Retrieval:** 7 chunks average per generation
- **Output:** 8 cards per request (configurable)

#### Generation Flow
1. User selects PFEQ filters (cycle, grade, subject, notion)
2. System retrieves relevant knowledge chunks from SQLite
3. GPT-5 generates structured card content
4. Cards rendered with selected theme and illustrations
5. Preview with live editing capabilities

#### API Endpoint
- **Route:** `/api/generate-cards`
- **Method:** POST
- **Response Time:** ~60-75 seconds average
- **Status:** 200 on success

### 5. Card Customization
**Status:** ✅ Fully Implemented

#### Font Selection
- **Provider:** Google Fonts
- **Loader:** `app/src/components/GoogleFontsLoader.tsx`
- **Options:** Teacher-approved fonts collection
- **File:** `app/src/lib/fonts/teacher-fonts.ts`

#### Visual Customization
- **Theme:** 59+ card theme options
- **Font:** Multiple Google Fonts
- **Colors:** Theme-specific + custom
- **Illustrations:** 4 libraries with 120+ options
- **Size:** Adjustable illustration scale
- **Position:** Drag & drop (advanced mode)

### 6. Dark Mode
**Status:** ✅ Fully Implemented

- **Provider:** next-themes
- **Detection:** System preference
- **Toggle:** Available in navigation
- **Persistence:** Saved in localStorage

### 7. Responsive Navigation
**Status:** ✅ Fully Implemented

- **Component:** `app/src/components/navigation.tsx`
- **Features:** Dark mode toggle, responsive menu
- **Routes:** Home, Generator, Templates, Resources

---

## 🏗️ Technical Architecture

### Directory Structure
```
quebec-teacher-hub-v5/
├── app/                          # Next.js application layer
│   ├── src/
│   │   ├── app/                 # App Router pages
│   │   │   ├── generator/       # Main card generator
│   │   │   │   └── page.tsx     # Generator UI + PFEQ filters
│   │   │   └── api/
│   │   │       └── generate-cards/  # AI generation endpoint
│   │   ├── components/          # React components
│   │   │   ├── KawaiiSelector.tsx           # Illustration picker
│   │   │   ├── SimpleCardIllustration.tsx   # Illustration renderer
│   │   │   ├── DraggableIllustration.tsx    # Drag/drop system
│   │   │   ├── CardRenderer.tsx             # Card display logic
│   │   │   ├── ThemeSelector.tsx            # Theme picker
│   │   │   ├── FontSelector.tsx             # Font picker
│   │   │   └── navigation.tsx               # Main nav
│   │   └── lib/                 # Utilities
│   │       ├── fonts/           # Font definitions
│   │       ├── themes/          # Theme system
│   │       └── pfeq-structure.ts    # Curriculum data (symlink)
├── core/                        # Business logic layer
│   ├── pfeq-structure.ts       # Quebec curriculum (14.2KB)
│   ├── themes/                 # 59+ card themes (3,134 lines)
│   └── types/                  # TypeScript interfaces
├── data/                       # Data layer
│   └── kb_index.sqlite        # Knowledge base (1.7MB)
└── package.json               # Dependencies
```

### Key Dependencies
```json
{
  "next": "15.5.4",
  "react": "19.1.0",
  "typescript": "^5",
  "@phosphor-icons/react": "^2.1.7",
  "react-kawaii": "^0.18.0",
  "react-icons": "^5.5.0",
  "framer-motion": "^11.15.0",
  "openai": "^5.23.1"
}
```

### Import Path Strategy
- **From app to core:** Use relative paths
  ```typescript
  // From app/src/app/generator/page.tsx
  import { cycles } from '../../../../../core/pfeq-structure'
  ```
- **Within app layer:** Use `@/` alias
  ```typescript
  import { Button } from '@/components/ui/button'
  ```

---

## 🎨 Illustration System (Detailed)

### Architecture

#### 1. Character Theme Detection
**File:** `app/src/app/generator/page.tsx`

```typescript
const getCharacterTheme = (character: string) => {
  if (character.startsWith('ph-')) return character      // Phosphor
  if (character.startsWith('emoji-')) return character   // Emoji
  if (character.startsWith('gi-')) return character      // Game Icons
  return `kawaii-${character}`                           // Kawaii (default)
}
```

#### 2. Illustration Rendering
**File:** `app/src/components/SimpleCardIllustration.tsx`

**Logic Flow:**
1. Detect character type by ID prefix
2. Find matching icon/character from library arrays
3. Render appropriate component:
   - **Phosphor:** `<IconComp size={size} weight="duotone" color={color} />`
   - **Emoji:** `<span style={{ fontSize: size }}>{emoji}</span>`
   - **Game Icons:** `<IconComp size={size} color={color} />`
   - **Kawaii:** React-kawaii component with mood and color

#### 3. Conditional UI Elements
**File:** `app/src/components/KawaiiSelector.tsx`

**Mood Selector Visibility:**
```typescript
{!selectedCharacter.startsWith('ph-') &&
 !selectedCharacter.startsWith('emoji-') &&
 !selectedCharacter.startsWith('gi-') && (
  <div>Mood Selection UI</div>  // Only for Kawaii
)}
```

### Library-Specific Features

#### Kawaii Characters
- **Mood System:** 7 emotional states
- **Color Customization:** Full color picker
- **Animation:** Smooth transitions
- **Size Range:** 50-200% scale

#### Phosphor Icons
- **Weight:** Duotone (fixed)
- **Color:** Single color customizable
- **SSR Safe:** Server-side rendering compatible

#### Educational Emoji
- **Rendering:** Native platform emoji
- **Categories:** 6 organized groups
- **No Mood:** Emoji are static

#### Game Icons
- **Style:** Outlined, game-themed
- **Color:** Single color customizable
- **Theme:** Playful, kid-friendly

---

## ⚠️ Known Issues & Challenges

### 1. Build/Runtime Issues

#### Turbopack Caching
- **Problem:** Stale code served after file changes
- **Symptoms:** "Export X doesn't exist" errors for deleted code
- **Solution:** Kill and restart dev server
- **Affected:** Icon library changes, import modifications

#### Port Conflicts
- **Problem:** Multiple dev servers running
- **Current:** Running on port 3004 (3000-3003 occupied)
- **Solution:** Kill old processes or use available port

### 2. Icon Library Challenges

#### Incorrect Icon Names
- **Problem:** WebFetch/AI suggestions for non-existent icons
- **Example:** `GiBook`, `GiGoldMedal`, `GiDragon` don't exist
- **Actual:** `GiBookCover`, `GiMedal`, `GiDragonHead` exist
- **Solution:** Verify icon names at https://react-icons.github.io/react-icons/icons/gi/
- **Impact:** Build errors, runtime failures

#### Package Incompatibilities
- **IconPark (@icon-park/react):** Build failures, outdated dependencies
- **Twemoji/OpenMoji:** Integration issues, abandoned packages
- **Solution:** Use native emoji or established libraries

### 3. Type Safety Issues

#### Dynamic Icon Imports
- **Problem:** TypeScript can't verify icon component existence
- **Workaround:** Runtime checks, `any` types for component props
- **Risk:** Runtime errors if icon doesn't exist

### 4. Performance Considerations

#### AI Generation Speed
- **Current:** 60-75 seconds per 8-card batch
- **Bottleneck:** GPT-5 API response time
- **No Current Solution:** Inherent to AI processing

#### Bundle Size
- **react-icons:** Large package (~2MB)
- **Only imports needed:** Using specific icon imports (`react-icons/gi`)
- **Impact:** Acceptable for this use case

---

## 📝 Recent Changes

### Session Summary (October 4, 2025)

#### Icon Library Evolution
1. **Started with:** Lucide + Phosphor
2. **Added then removed:** Heroicons, Tabler Icons (too similar to Phosphor)
3. **Attempted:** IconPark (build failures), Twemoji/OpenMoji (integration issues)
4. **Final solution:** Native Unicode emoji + Game Icons
5. **Current libraries:** Kawaii, Phosphor, Emoji, Game Icons

#### Key Implementations
- ✅ Removed Lucide, Heroicons, Tabler, IconPark
- ✅ Added native emoji list (47 educational emoji)
- ✅ Added Game Icons (16 verified icons)
- ✅ Conditional mood selector (Kawaii only)
- ✅ Updated icon detection logic for all 4 libraries
- ✅ Fixed icon rendering in SimpleCardIllustration.tsx

#### Bug Fixes
- Fixed Turbopack caching issues (multiple restarts)
- Corrected Game Icons import names (WebFetch errors)
- Removed non-existent icon references
- Updated helper functions for new prefixes

---

## 🚀 Next Steps

### Not Yet Implemented

#### 1. Export Functionality
- **PDF Export:** Not implemented
- **Image Export:** Not implemented
- **Batch Export:** Not implemented
- **Print Optimization:** Not implemented

#### 2. Templates System
- **Templates Page:** Placeholder only
- **Template Library:** Not created
- **Template Customization:** Not implemented
- **Template Sharing:** Not implemented

#### 3. Resources Page
- **Resources Page:** Placeholder only
- **PFEQ Documentation:** Not linked
- **Teaching Guides:** Not added
- **Best Practices:** Not documented

#### 4. Advanced Features
- **Card Collections:** Not implemented
- **User Accounts:** Not implemented
- **Card History:** Not implemented
- **Collaborative Editing:** Not implemented
- **Card Analytics:** Not implemented

### Recommended Priorities

#### High Priority
1. **Export to PDF:** Critical for teacher workflow
2. **Image Export:** Alternative to PDF
3. **Template Library:** Reusable card templates
4. **Print Optimization:** Ensure cards print correctly

#### Medium Priority
1. **Card Collections:** Organize generated cards
2. **Resources Page:** Educational content
3. **User Accounts:** Save preferences/cards
4. **Batch Generation:** Multiple card sets

#### Low Priority
1. **Collaborative Features:** Share with colleagues
2. **Analytics:** Track card usage
3. **Advanced Customization:** More design options
4. **Mobile App:** Native mobile experience

---

## 🔧 Development Commands

### Running the Application
```bash
cd app
npm run dev          # Start dev server (Turbopack)
npm run build        # Build for production
npm start            # Start production server
```

### Current Development Server
- **URL:** http://localhost:3004
- **Network:** http://192.168.2.10:3004
- **Environment:** .env.local loaded

### Troubleshooting

#### Turbopack Cache Issues
```bash
# Kill dev server
# Delete .next folder (if needed)
# Restart dev server
npm run dev
```

#### Port Already in Use
```bash
# Find process using port
netstat -ano | findstr :3000

# Kill process by PID
taskkill /PID <PID> /F

# Or let Next.js use next available port
```

---

## 📚 Key Learnings

### What Worked Well
1. **Native Emoji:** Simple, reliable, no dependencies
2. **Phosphor Icons:** Excellent SSR support, comprehensive
3. **Game Icons (react-icons/gi):** Good variety, well-maintained
4. **Conditional UI:** Clean separation of Kawaii-specific features
5. **PFEQ Structure:** Well-organized curriculum data

### What Didn't Work
1. **IconPark:** Build failures, outdated
2. **Twemoji/OpenMoji:** Integration complexity
3. **WebFetch for Icons:** Unreliable icon name suggestions
4. **Multiple Similar Libraries:** Heroicons/Tabler too similar to Phosphor

### Best Practices Established
1. **Always verify icon names** before using from new libraries
2. **Use official icon browser** (react-icons.github.io)
3. **Restart dev server** after major library changes
4. **Keep icon libraries minimal** (avoid redundancy)
5. **Document icon prefixes** clearly for maintenance

---

## 📄 Environment Configuration

### Required Environment Variables
```bash
# .env.local
OPENAI_API_KEY=sk-...           # GPT-5 API access
DATABASE_URL=postgresql://...    # PostgreSQL (if used)
NEXTAUTH_SECRET=...             # NextAuth (if implemented)
```

### Database
- **Type:** SQLite (knowledge base)
- **Location:** `data/kb_index.sqlite`
- **Size:** 1.7MB
- **Chunks:** 346 PFEQ content chunks
- **Usage:** RAG (Retrieval Augmented Generation) for card content

---

## 🎯 Success Metrics

### Current Status
- ✅ **PFEQ Compliance:** 100% curriculum coverage
- ✅ **Illustration Libraries:** 4 distinct options
- ✅ **Theme Variety:** 59+ card themes
- ✅ **AI Generation:** Operational with GPT-5
- ✅ **Dark Mode:** Fully functional
- ✅ **Responsive UI:** Mobile-friendly

### Quality Indicators
- **Type Safety:** TypeScript strict mode
- **Code Quality:** Consistent patterns, documented
- **User Experience:** Intuitive, fast, visually appealing
- **Maintainability:** Well-organized, modular architecture

---

## 📞 Support & Resources

### Documentation
- **PFEQ Structure:** `core/pfeq-structure.ts`
- **Theme System:** `core/themes/*.ts`
- **Component Docs:** Inline comments in components
- **API Docs:** `/api/generate-cards` endpoint

### External Resources
- **Phosphor Icons:** https://phosphoricons.com/
- **Game Icons:** https://react-icons.github.io/react-icons/icons/gi/
- **React Kawaii:** https://react-kawaii.vercel.app/
- **Shadcn/ui:** https://ui.shadcn.com/

---

**Document Version:** 1.0
**Maintained By:** Development Team
**Last Review:** October 4, 2025
