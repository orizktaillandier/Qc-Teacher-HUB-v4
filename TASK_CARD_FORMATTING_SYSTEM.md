# Quebec Teacher Hub v4 - Task Card Formatting System Documentation

## Table of Contents
1. [Overview](#overview)
2. [Card Layout System](#card-layout-system)
3. [Theme System](#theme-system)
4. [Typography & Font System](#typography--font-system)
5. [Visual Elements](#visual-elements)
6. [Customization Controls](#customization-controls)
7. [Print Layout & Cut Lines](#print-layout--cut-lines)
8. [Page-Specific Formatting](#page-specific-formatting)
9. [Implementation Details](#implementation-details)

---

## Overview

The Quebec Teacher Hub v4 task card formatting system is a comprehensive solution for generating and displaying educational task cards with advanced customization options. The system supports multiple themes, dynamic font selection, visual mathematical elements, and print-optimized layouts.

### Core Architecture
- **Framework**: Next.js 15 with React 19
- **Rendering**: Client-side with server-side API generation
- **Styling**: Tailwind CSS + inline styles for dynamic theming
- **Components**: Modular React components with TypeScript

---

## Card Layout System

### Grid Structure
The cards are displayed in a **2x4 grid layout** (2 columns, 4 rows):

```typescript
// File: app/src/app/cards-v2/page.tsx (lines 1495-1554)
const renderA4Page = (cards: CardData[], pageNumber: number) => {
  return (
    <div style={{
      width: '297mm',      // A4 landscape width
      height: '210mm',     // A4 landscape height
      pageBreakAfter: 'always',
      position: 'relative',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',  // 2 columns
      gridTemplateRows: 'repeat(4, 1fr)',  // 4 rows
      gap: '0',
      boxSizing: 'border-box'
    }}>
```

### Card Dimensions
Each card occupies:
- **Width**: 148.5mm (half of A4 landscape width)
- **Height**: 52.5mm (quarter of A4 landscape height)
- **Border**: None between cards for seamless printing
- **Overflow**: Hidden by default, visible when dragging elements

### Cut Lines
Dashed lines indicate where to cut the printed cards:

```css
/* Vertical cut line - center of page */
position: absolute;
left: '50%';
width: '0';
height: '100%';
borderLeft: '2px dashed #ccc';

/* Horizontal cut lines - at 25%, 50%, 75% */
position: absolute;
top: [25%, 50%, 75%];
width: '100%';
borderTop: '2px dashed #ccc';
```

---

## Theme System

### Theme Structure
The application supports **59 themes** organized in 4 categories:

#### 1. Professional Themes (4 themes)
```typescript
// File: app/src/lib/original-github-themes.ts
professionalThemes = [
  {
    name: 'Lignes rouges',
    primary: '#dc2626',
    secondary: '#fef2f2',
    pattern: 'repeating-linear-gradient(...)',
    numberBadgeStyle: 'circle',
    // ... nested structure with inner white container
  }
]
```

#### 2. Pastel Gradient Themes (8 themes)
```typescript
pastelGradientThemes = [
  {
    name: 'Coucher de soleil',
    gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
    cardBorder: '0',
    numberBadgeBackground: '#ff9a56',
    // ... direct gradient application
  }
]
```

#### 3. Fun Illustration Themes (7 themes)
```typescript
illustrationThemes = [
  {
    name: 'Pastèque',
    cardBackground: '#ffffff',
    illustration: 'watermelon',  // SVG illustration key
    numberBadgeStyle: 'bubble',
    // ... includes decorative SVG elements
  }
]
```

#### 4. Teacher-Loved Themes (40 themes)
```typescript
// File: app/src/lib/teacher-loved-themes.ts
teacherLovedThemes = [
  {
    name: 'Carnet scolaire',
    background: '#f8f6f3',
    pattern: 'repeating-linear-gradient(0deg, #e8e6e3 0px, transparent 1px, transparent 29px, #e8e6e3 30px)',
    contentBackground: '#ffffff',
    contentBorder: '2px solid #d4d2cf',
    // ... teacher-specific styling
  }
]
```

### Theme Application Logic

Cards can use either:
- **Auto mode**: Each card gets a different theme (cycles through all themes)
- **Fixed theme**: All cards use the same selected theme

```typescript
// Theme selection logic (lines 515-517)
const theme = selectedCardTheme === 'auto'
  ? getAllThemeByIndex(index)  // Different theme per card
  : getAllThemeByIndex(selectedCardTheme);  // Same theme for all
```

### Theme Rendering Types

1. **Nested Structure** (Professional themes):
   - Outer container with pattern/texture
   - Inner white container for question
   - Border and shadow effects

2. **Direct Application** (Gradient themes):
   - Gradient/color applied directly to card
   - No nested containers
   - Simpler structure

---

## Typography & Font System

### Font Categories
The system includes **60+ Google Fonts** organized by category:

```typescript
// File: app/src/app/cards-v2/page.tsx (lines 317-412)
const fontCategories = [
  {
    name: '🎨 Polices Super Amusantes',
    fonts: [
      { value: '"Fredoka", sans-serif', label: 'Fredoka' },
      { value: '"Bubblegum Sans", cursive', label: 'Bubblegum Sans' },
      { value: '"Comic Sans MS", cursive', label: 'Comic Sans' },
      // ... 15 fun fonts total
    ]
  },
  {
    name: '✏️ Écriture Manuscrite',
    fonts: [
      { value: '"Kalam", cursive', label: 'Kalam' },
      { value: '"Patrick Hand", cursive', label: 'Patrick Hand' },
      // ... 15 handwritten fonts
    ]
  },
  // ... more categories
]
```

### Font Settings Structure
```typescript
interface FontSettings {
  fontFamily: string;      // Font face selection
  fontSize: number;         // 10px to 24px range
  isBold: boolean;         // Bold toggle
  isItalic: boolean;       // Italic toggle
}
```

### Page-Specific Font Settings
Different font settings can be applied to different page types:

```typescript
// Lines 122-127
const [pageFontSettings, setPageFontSettings] = useState({
  all: { ...defaultFontSettings },
  studentCards: { ...defaultFontSettings },    // Task cards
  studentAnswers: { ...defaultFontSettings },  // Answer sheets
  teacherAnswers: { ...defaultFontSettings }   // Correction pages
});
```

---

## Visual Elements

### Mathematical Visualizations
The system supports 9 types of mathematical visual elements:

```typescript
// File: app/src/components/MathVisuals.tsx
// Syntax: [visual:type:params]

[visual:angle:45:100]           // 45-degree angle
[visual:triangle:60:60:x]       // Triangle with unknown angle
[visual:fraction:3:4:3]         // 3/4 fraction with filled parts
[visual:numberline:0:10:3,5,7]  // Number line with markers
[visual:grid:3:4:6]            // 3x4 grid with 6 filled
[visual:clock:3:15]            // Clock showing 3:15
[visual:shape:hexagon:100]     // Geometric shape
[visual:graph:2,4,3,5]         // Bar graph
[visual:triangle-sides:3:4:x]  // Triangle with side measurements
```

### Visual Rendering Properties
- **Scaling**: Global visual scale (50% to 200%)
- **Positioning**: Absolute positioning below question text
- **Responsive**: Uses `preserveAspectRatio="xMidYMid meet"`
- **Container**: Max width 220px, centered

### Character Illustrations
Fun character illustrations for non-mathematical cards:

```typescript
// Illustration themes available:
type IllustrationTheme =
  | 'random'      // Random selection
  | 'animals'     // Animal characters
  | 'robots'      // Robot characters
  | 'monsters'    // Friendly monsters
  | 'space'       // Space themes
  | 'nature';     // Nature elements
```

---

## Customization Controls

### Main Customization Panel
Located in `SimpleCustomizationPanel-simplified.tsx`:

#### Typography Controls
- **Font Family**: Dropdown with 60+ fonts
- **Font Size**: Slider (10px - 24px)
- **Bold Toggle**: Switch control
- **Italic Toggle**: Switch control

#### Theme Controls
- **Theme Selection**: Grid of theme previews
- **Auto/Fixed Mode**: Toggle between varied or uniform themes
- **Question Opacity**: 50% to 100% transparency

#### Interactive Features
- **Draggable Text**: Enable/disable text repositioning
- **Draggable Illustrations**: Enable/disable illustration movement
- **Scale Controls**:
  - Global character scale (50% - 200%)
  - Visual element scale (50% - 200%)

#### Position Management
```typescript
// Illustration position copying
onApplyIllustrationToLeftPage()   // Copy card 1 to all left cards
onApplyIllustrationToRightPage()  // Copy card 2 to all right cards
onResetIllustrationTransforms()   // Reset all positions
```

---

## Print Layout & Cut Lines

### Print Configuration
```css
@media print {
  @page {
    size: A4 landscape;
    margin: 0;
  }
  .print-area {
    visibility: visible;
  }
  .no-print {
    display: none !important;
  }
}
```

### Page Structure
1. **Page 1**: Cards 1-4 (first 4 task cards)
2. **Page 2**: Cards 5-8 (remaining 4 task cards)
3. **Answer Sheet**: 2-page student response form
4. **Correction**: Teacher's answer key

### Cut Line Implementation
```typescript
// Vertical divider (center line)
<div style={{
  position: 'absolute',
  left: '50%',
  top: '0',
  bottom: '0',
  width: '0',
  borderLeft: '2px dashed #ccc'
}} />

// Horizontal dividers (3 lines at 25%, 50%, 75%)
[25, 50, 75].map(percent => (
  <div style={{
    position: 'absolute',
    left: '0',
    right: '0',
    top: `${percent}%`,
    height: '0',
    borderTop: '2px dashed #ccc'
  }} />
))
```

---

## Page-Specific Formatting

### Student Cards (Task Cards)
- Full theme application
- Editable text fields
- Visual elements support
- Character illustrations

### Student Answer Sheet
```typescript
// Lines 1557-2003
const renderAnswerSheet = (cards: CardData[]) => {
  // Simplified theme (lighter colors)
  // Student info section at top
  // Answer boxes with card numbers
  // Lines for written responses
}
```

Features:
- **Student Info Section**: Name, date, class fields
- **Answer Format**: Numbered boxes (1-8)
- **Line Count**: 3-4 lines per answer
- **Theme**: Lighter version of selected theme

### Teacher Correction Page
```typescript
// Lines 2006-2556
const renderCorrection = (cards: CardData[]) => {
  // Green-tinted theme for corrections
  // Complete questions with answers
  // Answer highlighting
}
```

Features:
- **Color Coding**: Green tint for correct answers
- **Full Context**: Shows question + answer
- **Difficulty Indicators**: Visual badges
- **Compact Layout**: All answers on one page

---

## Implementation Details

### Card Rendering Pipeline

1. **Data Generation** (`/api/generate-card-v2`):
   - GPT generates 8 cards with questions
   - Includes visual element codes
   - Returns difficulty levels

2. **Theme Application** (`renderCardProfessional`/`renderCardFun`):
   - Determines theme type
   - Applies nested or direct structure
   - Adds decorative elements

3. **Content Processing**:
   ```typescript
   // Parse question for visuals
   const { questionText, visuals } = parseQuestionWithVisuals(card.question);

   // Apply font settings
   style={{
     fontFamily: pageFontSettings.fontFamily,
     fontSize: `${pageFontSettings.fontSize}px`,
     fontWeight: pageFontSettings.isBold ? 'bold' : 'normal',
     fontStyle: pageFontSettings.isItalic ? 'italic' : 'normal'
   }}
   ```

4. **Interactive Features**:
   - ContentEditable for inline text editing
   - Draggable wrappers for repositioning
   - Transform tracking for illustrations

### State Management

Key state variables:
```typescript
// Theme state
const [selectedCardTheme, setSelectedCardTheme] = useState<'auto' | number>('auto');

// Font state per page type
const [pageFontSettings, setPageFontSettings] = useState({...});

// Visual scaling
const [visualScale, setVisualScale] = useState(100);
const [globalCharacterScale, setGlobalCharacterScale] = useState(100);

// Positioning
const [illustrationTransforms, setIllustrationTransforms] = useState({});
const [textPositions, setTextPositions] = useState({});

// Edited content
const [editedCards, setEditedCards] = useState<Record<number, CardData>>({});
```

### Performance Optimizations

1. **Lazy Loading**: Themes loaded on demand
2. **Memoization**: Complex calculations cached
3. **Batch Updates**: Multiple state changes batched
4. **CSS-in-JS**: Dynamic styles computed once

---

## Key Files Reference

- **Main Interface**: `app/src/app/cards-v2/page.tsx`
- **Theme Definitions**:
  - `app/src/lib/all-card-themes.ts`
  - `app/src/lib/original-github-themes.ts`
  - `app/src/lib/teacher-loved-themes.ts`
- **Visual Components**: `app/src/components/MathVisuals.tsx`
- **Customization Panel**: `app/src/components/SimpleCustomizationPanel-simplified.tsx`
- **Draggable Components**:
  - `app/src/components/DraggableQuestionText.tsx`
  - `app/src/components/DraggableIllustration.tsx`
- **Illustration Service**: `app/src/lib/combined-illustration-service.ts`

---

## Migration Guide for v5

When implementing this formatting system in v5:

1. **Preserve Core Structure**:
   - Maintain 2x4 grid layout
   - Keep A4 landscape orientation
   - Preserve cut line positioning

2. **Theme System**:
   - Import all 59 themes
   - Maintain theme categorization
   - Keep auto/fixed selection modes

3. **Font System**:
   - Include all 60+ Google Fonts
   - Maintain page-specific font settings
   - Preserve font customization controls

4. **Visual Elements**:
   - Implement all 9 math visual types
   - Keep SVG rendering approach
   - Maintain scaling systems

5. **State Management**:
   - Track edited cards separately
   - Maintain transform states for draggables
   - Keep page-specific settings isolated

6. **Print Optimization**:
   - Use CSS @media print rules
   - Maintain page break controls
   - Keep .print-area/.no-print classes

This comprehensive formatting system ensures professional, customizable, and print-ready educational task cards that meet Quebec teacher requirements.