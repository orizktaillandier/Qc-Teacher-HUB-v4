# V4 Generation Flow Documentation

## Overview
The v4 generation system creates three distinct outputs from generated cards:
1. **Student Cards** - The actual task cards with questions
2. **Answer Sheet** (Feuille de Réponses) - Student worksheet for answers
3. **Corriger** (Teacher Answer Key) - Complete answer key with solutions

## Complete Generation Flow

### 1. Card Generation Process
```
User Selects PFEQ Parameters → API Call → GPT-5 Generates 8 Cards → Display in 3 Formats
```

### 2. Generated Card Structure
Each card contains:
```typescript
interface CardData {
  number: number;           // Card number (1-8)
  title: string;            // Card title
  question: string;         // Question text (may include visual codes)
  answer?: string;          // Answer text
  difficulty?: 'easy' | 'medium' | 'hard';
  theme?: string;           // Theme/notion name
}
```

## Three Display Formats

### 1. STUDENT CARDS (2 pages, 4 cards per page)
**Purpose:** Individual task cards for students to work with

**Layout:**
- **Page Size:** 210mm x 297mm (A4)
- **Cards per Page:** 4 (2x2 grid)
- **Card Size:** ~520px x 350px each
- **Spacing:** 20px between cards

**Card Components:**
- Card number badge (corner or tag style)
- Theme decorations (shapes, lines, dots)
- Question text area (editable)
- Visual elements (math visuals, illustrations)
- Theme-based styling (gradient backgrounds, borders)

**Features:**
- Draggable illustrations
- Editable question text
- Visual codes rendered (triangles, fractions, number lines, etc.)
- Character illustrations for non-visual questions
- Theme-specific decorations

### 2. ANSWER SHEET (2 pages)
**Purpose:** Structured worksheet for students to write answers

**Page 1 Contents:**
- Header: "🎯 Feuille de Réponses 🎯"
- Student Information Box:
  - Name field (👤 Nom: _____________)
  - Date field (📅 Date: _____________)
  - Subject (📚 Matière: [auto-filled])
- Answer boxes for cards 1-4
  - Each box shows:
    - Card number in circle
    - Question text (read-only)
    - Large answer area with lines

**Page 2 Contents:**
- Answer boxes for cards 5-8 (same format as page 1)

**Styling:**
- Theme-matched colors and gradients
- Dotted lines for writing
- Clear numbering system
- Fun decorative elements (stars, sparkles)

### 3. CORRIGER (Teacher Answer Key) (2 pages)
**Purpose:** Complete answer guide for teachers

**Page 1 Contents:**
- Header: "📝 Corrigé - [Subject] (Page 1/2) 📝"
- Cards 1-4 with:
  - Question number in badge
  - Complete question text
  - Full answer with explanations
  - Green-tinted answer areas
  - Checkmarks and success indicators

**Page 2 Contents:**
- Header: "📝 Corrigé - [Subject] (Page 2/2) 📝"
- Cards 5-8 (same format as page 1)

**Styling:**
- Green gradient background (success theme)
- Green borders and accents
- Answer areas highlighted in light green
- Success decorations (checkmarks, stars)

## Theme System

### Theme Application
Themes are applied consistently across all three formats:
- **Student Cards:** Full theme with all decorations
- **Answer Sheet:** Lighter theme, focus on readability
- **Corriger:** Green-tinted version for teacher reference

### Theme Components
```typescript
interface Theme {
  // Colors
  cardBackground: string;      // Main background (gradient or solid)
  cardBorder: string;          // Border style
  primary: string;             // Primary accent color

  // Typography
  fontFamily?: string;
  fontSize?: string;

  // Decorations
  decorations?: {
    type: 'shapes' | 'lines' | 'dots' | 'none';
    elements?: string[];       // Emoji or SVG elements
    pattern?: string;         // Background pattern
  };

  // Number Badge
  numberBadgeStyle: 'circle' | 'corner' | 'tag';
  numberBadgeBackground: string;
  numberBadgeColor: string;

  // Effects
  cardShadow?: string;
  cardRadius?: string;
  effects?: {
    overlay?: string;         // CSS overlay effects
  };

  // Illustrations
  illustration?: string;       // Fun character key
}
```

## Visual Elements System

### Math Visual Codes
The system parses and renders visual codes in questions:
- `[visual:angle:degrees:size]` - Angle visualization
- `[visual:triangle:a:b:c]` - Triangle with angles
- `[visual:fraction:num:denom:filled]` - Fraction representation
- `[visual:numberline:min:max:points]` - Number line
- `[visual:grid:rows:cols:filled]` - Grid/array
- `[visual:clock:hour:minute]` - Clock face
- `[visual:shape:type:size]` - Geometric shapes
- `[visual:graph:values]` - Simple graphs

### Character Illustrations
When no visual codes are present, the system adds:
- Subject-appropriate characters
- Difficulty-based expressions
- Draggable and scalable
- Theme-matched colors

## Customization Features

### 1. Font Customization
Each page type has independent font settings:
- Font family selection
- Font size (12-36px)
- Bold/Italic toggles
- Applied per page type (all/studentCards/studentAnswers/teacherAnswers)

### 2. Visual Scaling
- **Global Character Scale:** 50-150% for all illustrations
- **Visual Element Scale:** 50-150% for math visuals
- **Individual Illustration Scale:** Per-card adjustment

### 3. Interactive Features
- **Draggable Text:** Reposition question text
- **Draggable Illustrations:** Move character illustrations
- **Editable Questions:** Click to edit question text inline
- **Theme Selection:** Choose from 50+ themes or auto-rotate

### 4. Display Options
- **Show/Hide Illustrations:** Toggle character illustrations
- **Transparent Backgrounds:** For illustrations
- **Question Container Opacity:** 50-100% adjustment

## Print Optimization

### CSS Print Rules
```css
@media print {
  .no-print { display: none; }
  .page-break { page-break-before: always; }

  /* Ensure exact A4 dimensions */
  .print-page {
    width: 210mm;
    height: 297mm;
    margin: 0;
    padding: 10mm;
  }
}
```

### Page Layout
- Each format respects A4 page boundaries
- Automatic page breaks between pages
- Consistent margins and padding
- Print-friendly colors and contrasts

## Implementation Files (v4)

### Core Components
- `/app/src/app/cards-v2/page.tsx` - Main generator interface
- `/app/src/components/MathVisuals.tsx` - Visual element rendering
- `/app/src/components/SimpleCardIllustration.tsx` - Character illustrations
- `/app/src/components/DraggableQuestionText.tsx` - Draggable text
- `/app/src/components/DraggableIllustration.tsx` - Draggable illustrations
- `/app/src/lib/all-card-themes.ts` - Complete theme collection

### Theme Files
- `/core/themes/*.ts` - 59+ theme definitions across 6 categories
- `/app/src/lib/combined-illustration-service.tsx` - Illustration logic

## Key Functions

### Main Rendering Functions
```typescript
// Student cards display
const renderCardFun = (card: CardData, index: number) => { ... }

// Answer sheet generation
const renderAnswerSheet = (cards: CardData[]) => { ... }

// Teacher answer key
const renderCorrection = (cards: CardData[]) => { ... }
```

### Helper Functions
```typescript
// Parse visual codes from question text
parseQuestionWithVisuals(question: string): {
  questionText: string;
  visuals: ReactElement[];
}

// Get theme for card
getAllThemeByIndex(index: number): Theme

// Handle background styles
getBackgroundStyle(bgValue: string): CSSProperties
```

## Migration to V5 - Required Components

### Priority 1 - Core Display
1. Card display component with theme support
2. Answer sheet generator
3. Corriger (answer key) generator
4. Theme system integration

### Priority 2 - Visual Elements
1. Math visual code parser and renderer
2. Basic theme styles (at least 5-10 themes)
3. Print-optimized layouts

### Priority 3 - Enhancements (Later)
1. Draggable elements
2. Font customization panel
3. Character illustrations
4. Full 59+ theme collection
5. Advanced customization options

## Notes for V5 Implementation

1. **Start Simple:** Focus on displaying cards, answer sheet, and corriger first
2. **Use Existing Themes:** Import theme definitions from `/core/themes/`
3. **Maintain PFEQ Compliance:** Keep all educational standards
4. **Print-First Design:** Ensure all outputs are print-ready
5. **Progressive Enhancement:** Add interactive features after core works