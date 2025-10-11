# Copy this EXACT prompt to your V5 Claude Code session:

---

I need you to copy ALL theme files from the v4 project to ensure our formatting system works correctly. The v5 project already has some theme files but is missing many critical ones.

## TASK: Complete Theme System Import from V4 to V5

### Current Status:
- V5 has: `all-card-themes.ts`, `original-github-themes.ts`, `teacher-loved-themes.ts` in `/app/src/lib/themes/`
- V5 is MISSING: Many other theme files that are imported by these files

### Step 1: Copy Missing Theme Files to V5

Execute these commands to copy all missing theme files from v4 to v5:

```bash
# Copy all theme files that v5 is missing
cp ../quebec-teacher-hub-v4/app/src/lib/bordered-card-themes.ts app/src/lib/themes/
cp ../quebec-teacher-hub-v4/app/src/lib/card-themes.ts app/src/lib/themes/
cp ../quebec-teacher-hub-v4/app/src/lib/classic-github-themes.ts app/src/lib/themes/
cp ../quebec-teacher-hub-v4/app/src/lib/diverse-card-themes.ts app/src/lib/themes/
cp ../quebec-teacher-hub-v4/app/src/lib/enhanced-themes.ts app/src/lib/themes/
cp ../quebec-teacher-hub-v4/app/src/lib/fun-kid-themes.ts app/src/lib/themes/
cp ../quebec-teacher-hub-v4/app/src/lib/minecraft-pixel-themes.ts app/src/lib/themes/
cp ../quebec-teacher-hub-v4/app/src/lib/pinterest-teacher-themes.ts app/src/lib/themes/
cp ../quebec-teacher-hub-v4/app/src/lib/scrapbook-themes.ts app/src/lib/themes/

# Copy illustration service files (might already exist, use -f to overwrite)
cp -f ../quebec-teacher-hub-v4/app/src/lib/illustration-service.ts app/src/lib/
cp -f ../quebec-teacher-hub-v4/app/src/lib/enhanced-illustration-service.tsx app/src/lib/
cp -f ../quebec-teacher-hub-v4/app/src/lib/simple-illustration-service.tsx app/src/lib/

# Verify combined-illustration-service is up to date
cp -f ../quebec-teacher-hub-v4/app/src/lib/combined-illustration-service.tsx app/src/lib/
```

### Step 2: Copy Essential Components

```bash
# Copy visualization and theme components
cp ../quebec-teacher-hub-v4/app/src/components/MathVisuals.tsx app/src/components/
cp ../quebec-teacher-hub-v4/app/src/components/TaskCardThemes.tsx app/src/components/
cp ../quebec-teacher-hub-v4/app/src/components/SimpleCardIllustration.tsx app/src/components/

# Copy draggable components
cp ../quebec-teacher-hub-v4/app/src/components/DraggableQuestionText.tsx app/src/components/
cp ../quebec-teacher-hub-v4/app/src/components/DraggableIllustration.tsx app/src/components/
cp ../quebec-teacher-hub-v4/app/src/components/DraggableTextBox.tsx app/src/components/

# Copy additional illustration components
cp ../quebec-teacher-hub-v4/app/src/components/CardIllustration.tsx app/src/components/
```

### Step 3: Fix Import Paths in Theme Files

After copying, update the import paths in the theme files since they're now in `/themes/` subdirectory:

1. Open `app/src/lib/themes/all-card-themes.ts` and update imports:
```typescript
// Change from:
import { ... } from './original-github-themes';
// To:
import { ... } from './original-github-themes';

// But for files that are still in lib/, use:
import { ... } from '../illustration-service';
```

2. Check each copied theme file and ensure imports are correct relative to their new location.

### Step 4: Extract Critical Rendering Functions

From `../quebec-teacher-hub-v4/app/src/app/cards-v2/page.tsx`, extract these complete functions and add them to a new file `app/src/lib/card-rendering.ts`:

```typescript
// Create new file: app/src/lib/card-rendering.ts

import { getAllThemeByIndex, themeCategories, FunIllustrations } from './themes/all-card-themes';
import { parseQuestionWithVisuals } from '../components/MathVisuals';
import { SimpleCardIllustration } from '../components/SimpleCardIllustration';
import { DraggableQuestionText } from '../components/DraggableQuestionText';

// Copy these complete functions from v4 cards-v2/page.tsx:
// 1. getBackgroundStyle (lines 40-46)
// 2. renderCardProfessional (lines 539-807)
// 3. renderCardFun (lines 981-1495)
// 4. renderCard dispatcher (lines 1503-1522)
// 5. getNumberBadgeStyles (embedded in renderCardProfessional)

export { renderCard, renderCardProfessional, renderCardFun, getBackgroundStyle };
```

### Step 5: Verify Theme System

Run this verification:

```bash
# Create a test file to verify themes load correctly
cat > test-themes.js << 'EOF'
const themes = require('./app/src/lib/themes/all-card-themes.ts');
console.log('Total themes:', themes.allCardThemes?.length || 'ERROR');
console.log('Theme categories:', Object.keys(themes.themeCategories || {}));
EOF

node test-themes.js
```

Expected output:
- Total themes: 59
- Theme categories: ['professional', 'pastel', 'illustration', 'teacher']

### Step 6: Update Your Card Display Component

In your main card display component, replace the card rendering with:

```typescript
import { renderCard } from '@/lib/card-rendering';

// Replace your current card rendering logic with:
{cards.map((card, index) => renderCard(card, index))}
```

### Step 7: Verify File Structure

After all copies, verify this structure exists:

```bash
ls -la app/src/lib/themes/
# Should show: all theme .ts files

ls -la app/src/components/ | grep -E "(Math|Drag|Simple|Task)"
# Should show: MathVisuals, DraggableQuestionText, SimpleCardIllustration, TaskCardThemes

ls -la app/src/lib/ | grep illustration
# Should show: all illustration service files
```

### IMPORTANT: After copying, check for any import errors and fix them based on the new file locations.

Please execute these steps now and let me know if you encounter any errors.

---