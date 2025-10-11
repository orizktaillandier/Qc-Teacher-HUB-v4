# V5 Formatting Migration Plan - Direct Copy Strategy

## Critical Corrections
- **Grid Layout**: 2x2 cards per page (NOT 2x4)
- **Pages**: 2 pages of 4 cards each = 8 total cards
- **Orientation**: A4 Landscape (297mm x 210mm)

## Phase 1: Core Formatting Files to Copy

### Theme System Files (Copy ALL to v5)
```
app/src/lib/
├── all-card-themes.ts              # Main theme aggregator
├── original-github-themes.ts       # Professional, pastel, illustration themes
├── teacher-loved-themes.ts         # 40 teacher-specific themes
├── bordered-card-themes.ts         # Bordered/nested themes
├── scrapbook-themes.ts            # Scrapbook style themes
├── fun-kid-themes.ts              # Kid-friendly themes
├── minecraft-pixel-themes.ts      # Pixel art themes
├── pinterest-teacher-themes.ts    # Pinterest-inspired themes
├── classic-github-themes.ts       # Classic GitHub themes
├── diverse-card-themes.ts         # Diverse theme collection
└── enhanced-themes.ts             # Enhanced theme variations
```

### Illustration Service
```
app/src/lib/
└── combined-illustration-service.tsx   # Character illustration system
```

### Visual Components
```
app/src/components/
├── MathVisuals.tsx                 # Math visualization components
├── TaskCardThemes.tsx              # SVG illustrations (watermelon, etc.)
└── SimpleCardIllustration.tsx      # Character illustration wrapper
```

### Draggable Components
```
app/src/components/
├── DraggableQuestionText.tsx       # Draggable text positioning
├── DraggableIllustration.tsx       # Draggable illustration positioning
└── DraggableTextBox.tsx            # Draggable text box component
```

### Customization Panel
```
app/src/components/
├── SimpleCustomizationPanel-simplified.tsx  # Main customization panel
├── EnhancedThemeSelector.tsx              # Theme selection UI
└── ThemeSelector.tsx                       # Additional theme selector
```

## Phase 2: Core Rendering Logic to Extract

### From `app/src/app/cards-v2/page.tsx`

#### 1. Layout Constants (lines 1494-1553)
```typescript
// A4 Page Structure
const renderA4Page = (cards: CardData[], pageNumber: number) => {
  // Width: 297mm, Height: 210mm (landscape)
  // Grid: 2x2 (grid-cols-2 grid-rows-2)
  // Cut lines: 1 vertical at 50%, 1 horizontal at 50%
}
```

#### 2. Card Rendering Functions (lines 510-979)
```typescript
renderCardProfessional()  // Professional theme rendering
renderCardFun()          // Fun theme rendering
```

#### 3. Answer Sheet Rendering (lines 1557-2003)
```typescript
renderAnswerSheet()  // Student answer sheet with 2-page layout
```

#### 4. Correction Page (lines 2006-2556)
```typescript
renderCorrection()   // Teacher correction page with green theme
```

#### 5. Font System (lines 317-412)
```typescript
const fontCategories = [
  // 60+ Google Fonts organized by category
  // Fun, Handwritten, Fantasy, Decorative, Classic
]
```

#### 6. State Management (lines 50-200)
```typescript
// Font settings per page type
const [pageFontSettings, setPageFontSettings] = useState({
  all: { ...defaultFontSettings },
  studentCards: { ...defaultFontSettings },
  studentAnswers: { ...defaultFontSettings },
  teacherAnswers: { ...defaultFontSettings }
});

// Visual scaling
const [globalCharacterScale, setGlobalCharacterScale] = useState(100);
const [visualScale, setVisualScale] = useState(100);

// Theme selection
const [selectedCardTheme, setSelectedCardTheme] = useState<'auto' | number>('auto');

// Draggable states
const [isDraggableText, setIsDraggableText] = useState(false);
const [isDraggableIllustrations, setIsDraggableIllustrations] = useState(false);

// Position tracking
const [illustrationTransforms, setIllustrationTransforms] = useState({});
const [textPositions, setTextPositions] = useState({});
```

## Phase 3: Dependencies to Install in v5

```json
{
  "dependencies": {
    "@headlessui/react": "^2.x",  // For dropdowns/switches
    "@heroicons/react": "^2.x",    // Icons
    "clsx": "^2.x",                // Class utilities
    "lucide-react": "latest"       // Additional icons
  }
}
```

## Phase 4: Migration Steps

### Step 1: Direct File Copy
```bash
# From v4 project root, copy theme files
cp -r app/src/lib/*themes*.ts ../v5/app/src/lib/
cp app/src/lib/combined-illustration-service.tsx ../v5/app/src/lib/

# Copy visual components
cp app/src/components/MathVisuals.tsx ../v5/app/src/components/
cp app/src/components/TaskCardThemes.tsx ../v5/app/src/components/
cp app/src/components/SimpleCardIllustration.tsx ../v5/app/src/components/

# Copy draggable components
cp app/src/components/Draggable*.tsx ../v5/app/src/components/

# Copy customization panel
cp app/src/components/SimpleCustomizationPanel-simplified.tsx ../v5/app/src/components/
```

### Step 2: Extract Core Functions
From `cards-v2/page.tsx`, extract these functions into a new file `v5/lib/card-formatting.ts`:

1. `renderA4Page()` - Complete page layout
2. `renderCardProfessional()` - Professional card rendering
3. `renderCardFun()` - Fun card rendering
4. `renderAnswerSheet()` - Answer sheet logic
5. `renderCorrection()` - Correction page logic
6. `fontCategories` - Font definitions array

### Step 3: Create Formatting Hook
Create `v5/hooks/useCardFormatting.ts`:

```typescript
export function useCardFormatting() {
  // All state management from v4 lines 50-200
  // Font settings, scaling, themes, positions

  return {
    // State values
    pageFontSettings,
    globalCharacterScale,
    visualScale,
    selectedCardTheme,

    // State setters
    setPageFontSettings,
    setGlobalCharacterScale,
    setVisualScale,
    setSelectedCardTheme,

    // Rendering functions
    renderA4Page,
    renderAnswerSheet,
    renderCorrection
  };
}
```

### Step 4: Print Styles
Add to v5 global CSS or page component:

```css
@media print {
  body * { visibility: hidden; }
  .print-area, .print-area * { visibility: visible; }
  .print-area { position: absolute; left: 0; top: 0; }
  .no-print { display: none !important; }
  @page {
    size: A4 landscape;
    margin: 0;
  }
}
```

## Phase 5: Integration Points

### Required Props for Card Rendering
```typescript
interface CardData {
  number: number;
  title: string;
  context?: string;
  question: string;
  answer?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  theme?: string;
  icon?: string;
}
```

### Essential Functions to Import
```typescript
import { getAllThemeByIndex } from '@/lib/all-card-themes';
import { parseQuestionWithVisuals } from '@/components/MathVisuals';
import { SimpleCardIllustration } from '@/components/SimpleCardIllustration';
import { DraggableQuestionText } from '@/components/DraggableQuestionText';
```

## Phase 6: Testing Checklist

After migration, verify:

- [ ] 2x2 grid layout displays correctly (4 cards per page)
- [ ] Cut lines appear at 50% vertical and 50% horizontal
- [ ] All 59 themes render properly
- [ ] Font selection works for all page types
- [ ] Draggable text/illustrations function
- [ ] Visual math elements scale correctly
- [ ] Answer sheet has proper 2-page layout
- [ ] Correction page has green theme
- [ ] Print preview shows A4 landscape
- [ ] No console errors

## Critical Details to Preserve

1. **Grid is 2x2** (not 2x4) - 4 cards per A4 page
2. **Two pages total** for 8 cards (Page 1: cards 1-4, Page 2: cards 5-8)
3. **Theme structure varies** - some use nested divs, others direct application
4. **Font settings are page-specific** - different fonts for cards vs answer sheets
5. **Cut lines are CSS borders** - not separate elements
6. **Visual elements use SVG** with viewBox and preserveAspectRatio
7. **Opacity control** for question containers (50-100%)
8. **ContentEditable** for inline text editing

## Files NOT to Copy (v4-specific)
- Navigation components
- API routes (unless needed)
- Database files
- Build configuration
- Node modules

## Final Integration in v5

```typescript
// In your v5 card display component
import { useCardFormatting } from '@/hooks/useCardFormatting';
import { SimpleCustomizationPanel } from '@/components/SimpleCustomizationPanel-simplified';

export function CardDisplay({ cards }) {
  const formatting = useCardFormatting();

  return (
    <>
      <SimpleCustomizationPanel {...formatting} />
      <div className="print-area">
        {formatting.renderA4Page(cards.slice(0, 4), 0)}
        {formatting.renderA4Page(cards.slice(4, 8), 1)}
        {formatting.renderAnswerSheet(cards)}
        {formatting.renderCorrection(cards)}
      </div>
    </>
  );
}
```

This plan ensures a direct, safe migration of the formatting system while preserving all functionality.