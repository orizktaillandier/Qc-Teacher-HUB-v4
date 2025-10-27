# FICHES D'EXERCICES (DRILL SHEETS) - RESEARCH & PLANNING DOCUMENT

**Project:** Quebec Teacher Hub v5 - Drill Sheets Feature
**Date:** January 2025
**Status:** Research Phase - DO NOT IMPLEMENT YET

---

## TABLE OF CONTENTS

1. [Pedagogical Standards & Format](#1-pedagogical-standards--format)
2. [Content Structure by Subject](#2-content-structure-by-subject)
3. [Technical Architecture Plan](#3-technical-architecture-plan)
4. [Data Model Design](#4-data-model-design)
5. [API Endpoint Design](#5-api-endpoint-design)
6. [UI/UX Design](#6-uiux-design)
7. [GPT Prompt Engineering](#7-gpt-prompt-engineering)
8. [PDF Export Strategy](#8-pdf-export-strategy)
9. [Implementation Roadmap](#9-implementation-roadmap)

---

## 1. PEDAGOGICAL STANDARDS & FORMAT

### What is a "Fiche d'exercice"?

A **fiche d'exercice** (drill sheet/practice sheet) is a pedagogical tool that provides:
- **Multiple exercises** on a single concept or skill
- **Repetitive practice** to build mastery
- **Progressive difficulty** (optional)
- **Answer key** for self-assessment or correction
- **PFEQ alignment** to curriculum objectives

### Key Differences from Task Cards

| Aspect | Task Cards (Cartes à tâches) | Drill Sheets (Fiches d'exercices) |
|--------|------------------------------|-----------------------------------|
| **Purpose** | Independent practice, stations, games | Focused practice, homework, assessment |
| **Format** | Individual cards (4 per page, cut apart) | Full page of exercises (NOT cut) |
| **Quantity** | 8-24 cards per set | 10-30 exercises per sheet |
| **Layout** | 2x2 grid, A4 landscape, cut lines | Single column or multi-column, A4 portrait |
| **Answer format** | Separate answer sheet | Answer key on separate page |
| **Difficulty** | Mixed difficulty per set | Progressive or uniform difficulty |
| **Usage** | Centers, pairs, independent work | Whole class, homework, review |

### Standard Format (Based on Research)

#### Page Layout
- **Orientation:** A4 Portrait (210mm × 297mm)
- **Margins:** 20mm all sides
- **Header:** Title, subject, notion, grade level
- **Footer:** Page number, copyright/attribution
- **Sections:** Clear visual separation between exercises

#### Exercises Per Page
- **Mathématiques:** 15-25 exercises (depending on complexity)
- **Français - Grammaire/Orthographe:** 15-20 exercises
- **Français - Lecture:** 5-10 comprehension questions (longer passages)
- **Français - Écriture:** 3-8 writing prompts
- **Science/Univers Social:** 10-15 questions

#### Answer Key Format
- Separate page (NOT on same page as exercises)
- Same header as exercise sheet + "CORRIGÉ" label
- Answers in **bold** or colored text
- Same numbering as exercise sheet
- Optional: Brief explanations for complex answers

### Pedagogical Best Practices

1. **Progressive Difficulty:**
   - Easy → Medium → Hard (optional grouping)
   - OR uniform difficulty for drill practice

2. **Clear Instructions:**
   - Brief, action-oriented (e.g., "Résous les additions suivantes.")
   - Visual examples when needed
   - Consistent verb usage (Résous, Complète, Écris, Identifie, etc.)

3. **Visual Clarity:**
   - Adequate white space between exercises
   - Numbered exercises (1, 2, 3... or a) b) c...)
   - Answer spaces clearly indicated (____, [  ], or lines)
   - Boxes or light shading for sections

4. **Accessibility:**
   - Font size: 12-14pt for primary
   - High contrast (dark text on white/light background)
   - Sans-serif fonts (Arial, Calibri) or dyslexia-friendly fonts
   - Line spacing: 1.5 minimum

---

## 2. CONTENT STRUCTURE BY SUBJECT

### MATHÉMATIQUES

#### Exercise Types by Notion

**Arithmétique / Nombres et opérations:**
- Addition/Soustraction: 20 operations (10+10 or 5+5+5+5 by difficulty)
  - Format: `12 + 8 = ____` or vertical format
- Multiplication/Division: 15-20 operations
- Fractions: 12-15 exercises (simplify, compare, add, subtract)
- Decimaux: 15 exercises (operations, place value, comparison)

**Géométrie:**
- Identify shapes: 8-10 shapes with labels to fill
- Measure angles: 6-8 angle diagrams
- Perimeter/Area: 8-12 calculation problems
- Transformations: 6-8 grid exercises (rotate, reflect, translate)

**Mesure:**
- Unit conversion: 15-20 conversions
- Time problems: 10-12 time calculations
- Money problems: 8-10 scenarios with CAD amounts

**Probabilité et statistiques (Cycle 3 only):**
- Probability calculations: 8-10 problems
- Data interpretation: 5-8 questions based on charts/graphs

#### Format Example (Addition - Cycle 1):

```
NOM: ________________  DATE: ________________

MATHÉMATIQUE - ADDITION (Cycle 1 - 2e année)

CONSIGNE: Résous les additions suivantes.

 1)  5 + 3 = ____      11)  12 + 7 = ____
 2)  8 + 2 = ____      12)  15 + 4 = ____
 3)  6 + 4 = ____      13)  18 + 2 = ____
 ...
20)  9 + 9 = ____
```

### FRANÇAIS - LANGUE D'ENSEIGNEMENT

#### Exercise Types by Notion

**Grammaire:**
- Identify parts of speech: 15-20 words to classify
- Verb conjugation: 12-15 verbs to conjugate
- Agreement (gender/number): 15 sentences to correct
- Sentence analysis: 10 sentences to parse

**Orthographe:**
- Dictée trouvée (fill-in-the-blank text): 15-20 blanks
- Homophones: 15 sentences (choose correct word)
- Plurals: 15-20 words to pluralize
- Spelling patterns: 12-15 words following same pattern

**Lecture - Compréhension:**
- Short text (150-300 words) + 8-12 comprehension questions
- OR 3 short texts + 3-4 questions each
- Question types: literal, inferential, vocabulary, opinion

**Écriture:**
- Writing prompts: 3-5 prompts (choose one)
- Sentence completion: 8-10 sentence starters
- Story sequencing: 6-8 sentences to order
- Descriptive writing: 5-8 adjective/adverb practice

**Lexique:**
- Synonyms/Antonyms: 12-15 word pairs
- Word families: 8-10 root words with derivatives
- Context clues: 10 sentences with vocabulary
- Definitions: 10-12 words to define

#### Format Example (Grammaire - Cycle 2):

```
NOM: ________________  DATE: ________________

FRANÇAIS - GRAMMAIRE (Cycle 2 - 4e année)
Notion: Classes de mots (nom, verbe, adjectif)

CONSIGNE: Indique la classe de mots de chaque mot souligné.
Écris N (nom), V (verbe) ou A (adjectif).

 1) Le chat noir dort sur le sofa.
    noir: ____

 2) Marie mange une pomme rouge.
    mange: ____
    rouge: ____

 ...
```

### SCIENCE ET TECHNOLOGIE

#### Exercise Types

- **Matière:** Properties identification (10-12 items)
- **Énergie:** Energy forms matching (8-10 scenarios)
- **Univers vivant:** Classification exercises (12-15 organisms)
- **Corps humain:** Label diagrams (8-10 body parts/systems)
- **Terre et espace:** True/False + short answer (12-15 questions)

### UNIVERS SOCIAL (Cycle 2-3 only)

#### Exercise Types

- **Géographie:** Map reading, location identification (10-12 questions)
- **Histoire:** Timeline ordering, date matching (8-10 events)
- **Citoyenneté:** Scenario-based questions (8-10 situations)

---

## 3. TECHNICAL ARCHITECTURE PLAN

### Core Principles

1. **Complete Separation:** Drill sheets MUST NOT interfere with existing task card generation
2. **Code Reuse:** Leverage existing components where safe (auth, PFEQ validation, knowledge retrieval)
3. **Parallel Structure:** Mirror task card architecture for consistency
4. **Future-Proof:** Design for additional content types later

### Architecture Overview

```
EXISTING (DO NOT MODIFY):
├── /api/generate-cards         ← Task cards API
├── /api/library/generations    ← Task card library
├── CardGeneration model        ← Task card database
├── /generator page             ← Task card UI
└── CardRenderer component      ← Task card display

NEW (TO BE CREATED):
├── /api/generate-drill-sheets  ← Drill sheets API (NEW)
├── /api/library/drill-sheets   ← Drill sheet library (NEW)
├── DrillSheetGeneration model  ← Drill sheet database (NEW)
├── /drill-generator page       ← Drill sheet UI (NEW)
└── DrillSheetRenderer          ← Drill sheet display (NEW)

SHARED (REUSE SAFELY):
├── KnowledgeRetriever          ← Knowledge base access
├── PFEQ structure              ← Curriculum hierarchy
├── Key mappings                ← Subject/cycle/notion maps
├── Authentication              ← Session validation
└── PDF utilities (adapt)       ← Export functions
```

### File Structure Plan

```
app/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── generate-drill-sheets/
│   │   │   │   └── route.ts                  [NEW]
│   │   │   ├── library/
│   │   │   │   ├── drill-sheets/
│   │   │   │   │   ├── route.ts              [NEW - list]
│   │   │   │   │   └── [id]/route.ts         [NEW - delete]
│   │   │   │   └── save-drill-sheet/
│   │   │   │       └── route.ts              [NEW]
│   │   │   └── shared-library/
│   │   │       └── drill-sheets/
│   │   │           ├── route.ts              [NEW - list shared]
│   │   │           ├── share/route.ts        [NEW]
│   │   │           └── copy/route.ts         [NEW]
│   │   ├── drill-generator/
│   │   │   └── page.tsx                      [NEW]
│   │   └── drill-library/
│   │       └── page.tsx                      [NEW]
│   ├── components/
│   │   ├── DrillSheetRenderer.tsx            [NEW]
│   │   ├── DrillSheetPreview.tsx             [NEW]
│   │   └── DrillSheetFilters.tsx             [NEW]
│   └── lib/
│       ├── drill-sheet-generation.ts         [NEW - PDF export]
│       ├── drill-sheet-types.ts              [NEW - TypeScript types]
│       └── drill-sheet-themes.ts             [NEW - styling]
├── prisma/
│   └── schema.prisma                         [MODIFY - add model]
└── core/
    └── knowledge/
        └── knowledge-retrieval.ts            [REUSE - no changes]
```

---

## 4. DATA MODEL DESIGN

### Prisma Schema - DrillSheetGeneration Model

```prisma
model DrillSheetGeneration {
  id          String   @id @default(cuid())
  userId      String   @map("user_id")

  // PFEQ metadata (same as task cards)
  cycle       String
  grade       String
  subject     String
  notion      String
  subNotions  String   // JSON stringified array

  // Drill sheet specific settings
  exerciseCount     Int      @map("exercise_count")      // 10-30 exercises
  difficulty        String?  // 'uniform', 'progressive', 'mixed'
  includeAnswerKey  Boolean  @default(true) @map("include_answer_key")

  // Styling
  theme             String?  // 'simple', 'colorful', 'minimal'
  fontFamily        String?  @map("font_family")
  fontSize          Int?     @default(12)
  headerStyle       String?  @map("header_style")  // JSON: { color, bold, etc. }

  // THE CRITICAL FIELD - Raw drill sheet data
  exercises   Json     // Array of exercise objects

  // Optional customization (less than task cards)
  customTitle       String?  @map("custom_title")
  customInstructions String? @map("custom_instructions")
  showDifficulty    Boolean? @default(false) @map("show_difficulty")

  // Timestamps
  createdAt   DateTime @default(now()) @map("created_at")
  updatedAt   DateTime @updatedAt @map("updated_at")

  // Relations
  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId])
  @@index([createdAt])
  @@index([subject])
  @@index([notion])
  @@map("drill_sheet_generations")
}

model SharedDrillSheet {
  id          String   @id @default(cuid())

  // Copy all fields from DrillSheetGeneration
  // Plus sharing metadata
  authorName     String?  @map("author_name")
  authorEmail    String?  @map("author_email")
  views          Int      @default(0)
  copies         Int      @default(0)
  sharedAt       DateTime @default(now()) @map("shared_at")

  // ... (rest same as DrillSheetGeneration)

  @@index([sharedAt])
  @@index([subject])
  @@index([views])
  @@map("shared_drill_sheets")
}
```

### Exercise Object Structure (stored in `exercises` JSON field)

#### Math Exercise Example:

```typescript
interface MathExercise {
  number: number;           // Exercise number (1, 2, 3...)
  type: string;            // 'addition', 'subtraction', 'multiplication', etc.
  question: string;        // "12 + 8 = ____" or "Résous: 3/4 + 1/2"
  answer: string | number; // "20" or 1.25
  difficulty?: 'easy' | 'medium' | 'hard';
  workSpace?: boolean;     // Show extra space for work?
  format?: 'horizontal' | 'vertical'; // Layout style
}
```

#### French Exercise Example:

```typescript
interface FrenchExercise {
  number: number;
  type: string;            // 'grammar', 'conjugation', 'spelling', 'comprehension'
  question: string;        // "Conjugue le verbe (avoir) au présent: Je ____"
  answer: string;          // "ai"
  difficulty?: 'easy' | 'medium' | 'hard';
  context?: string;        // For comprehension: text passage
  choices?: string[];      // For multiple choice
}
```

#### Universal Exercise Interface:

```typescript
interface DrillExercise {
  number: number;
  type: string;
  question: string;
  answer: string | number | string[];  // Array for multiple answers
  difficulty?: 'easy' | 'medium' | 'hard';

  // Optional fields depending on exercise type
  context?: string;        // Reading passage, diagram description
  choices?: string[];      // Multiple choice options
  format?: string;         // 'horizontal', 'vertical', 'grid', 'diagram'
  workSpace?: boolean;     // Show extra space for calculations/work
  imageUrl?: string;       // For visual exercises (diagrams, maps)
  metadata?: Record<string, any>;  // Flexible for future needs
}
```

---

## 5. API ENDPOINT DESIGN

### `/api/generate-drill-sheets/route.ts`

**Based on:** `/api/generate-cards/route.ts` (similar structure)

#### Request Body:

```typescript
interface DrillSheetRequest {
  // PFEQ filters (required)
  cycle: string;
  grade: string;
  subject: string;
  notion: string;
  subNotions?: string[];

  // Drill sheet specific
  exerciseCount?: number;   // Default: 15 for math, 12 for french
  difficulty?: 'uniform' | 'progressive' | 'mixed';  // Default: 'uniform'
  includeAnswerKey?: boolean;  // Default: true

  // Optional styling hints (for prompt)
  exerciseTypes?: string[];  // e.g., ['addition', 'subtraction'] for math
}
```

#### Response:

```typescript
interface DrillSheetResponse {
  success: true;
  data: {
    exercises: DrillExercise[];
    metadata: {
      subject: string;
      notion: string;
      subNotions: string[];
      cycle: string;
      grade: string;
      exerciseCount: number;
      difficulty: string;
      generatedAt: string;  // ISO timestamp
      sessionId: string;
      modelUsed: string;    // 'gpt-5' or 'gpt-5-mini'
    }
  }
}
```

#### Processing Flow:

```
1. Validate request fields
   └─> Return 400 if missing required fields

2. Map frontend keys to database keys
   └─> Reuse subjectKeyMapping, cycleKeyMapping, notionKeyMapping
   └─> SAME as generate-cards (ensure consistency)

3. Retrieve PFEQ knowledge
   └─> Call KnowledgeRetriever.retrieve()
   └─> Same parameters as task cards
   └─> Get curriculum-aligned context

4. Select GPT model
   └─> If exerciseCount <= 15: use gpt-5-mini
   └─> If exerciseCount > 15: use gpt-5
   └─> DIFFERENT threshold than task cards (10 vs 15)

5. Build prompt for drill sheet generation
   └─> System prompt: "You are an expert Quebec elementary teacher..."
   └─> Include PFEQ knowledge context
   └─> Specify drill sheet format requirements
   └─> Request JSON output with exercises array

6. Call OpenAI API
   └─> Use response_format: { type: "json_object" }
   └─> Implement fallback logic (same as task cards)

7. Parse and validate response
   └─> Ensure exercises array length matches exerciseCount
   └─> Validate each exercise has required fields
   └─> Return 500 if validation fails

8. Return success response
   └─> Include exercises + metadata
```

### `/api/library/save-drill-sheet/route.ts`

**Similar to:** `/api/library/save/route.ts`

```typescript
POST /api/library/save-drill-sheet
Body: {
  cycle, grade, subject, notion, subNotions,
  exerciseCount, difficulty, includeAnswerKey,
  theme, fontFamily, fontSize,
  exercises: DrillExercise[],
  customTitle?, customInstructions?
}

Response: {
  success: true,
  drillSheetId: string
}
```

### `/api/library/drill-sheets/route.ts`

List user's saved drill sheets (paginated)

```typescript
GET /api/library/drill-sheets?page=1&limit=20

Response: {
  success: true,
  drillSheets: DrillSheetGeneration[],
  total: number,
  page: number,
  pages: number
}
```

### `/api/library/drill-sheets/[id]/route.ts`

```typescript
GET /api/library/drill-sheets/:id
  → Retrieve specific drill sheet

DELETE /api/library/drill-sheets/:id
  → Delete drill sheet (auth check: userId must match)
```

---

## 6. UI/UX DESIGN

### Option A: Separate Page (RECOMMENDED)

**Route:** `/drill-generator`

**Why separate page?**
- ✅ Clear mental model: different content type = different page
- ✅ No risk of breaking existing generator
- ✅ Easier to maintain and test independently
- ✅ Can optimize UI specifically for drill sheets
- ✅ Follows existing pattern: generator vs library vs shared-library

**Navigation:**
- Add "Fiches d'exercices" link in:
  - Navigation bar (next to "Générateur")
  - Home page expandable card (already has "Bientôt" badge)
  - Quick actions section

### Page Structure: `/drill-generator`

```
┌─────────────────────────────────────────────────────────┐
│ Navigation (shared component)                           │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ ┌─ ÉTAPE 1: FILTRES PFEQ ─────────────────────┐       │
│ │ • Cycle → Année → Matière → Notion          │       │
│ │ • Same as task cards (reuse ProgressiveFilters) │   │
│ └──────────────────────────────────────────────┘       │
│                                                         │
│ ┌─ ÉTAPE 2: OPTIONS DE GÉNÉRATION ─────────────┐       │
│ │ Nombre d'exercices: [slider 10-30]           │       │
│ │ Difficulté: ○ Uniforme ○ Progressive ○ Mixte │       │
│ │ ☑ Inclure le corrigé                         │       │
│ └──────────────────────────────────────────────┘       │
│                                                         │
│ [Générer la fiche d'exercices] (button)                │
│                                                         │
│ ┌─ APERÇU & PERSONNALISATION ──────────────────┐       │
│ │ Left sidebar:                                 │       │
│ │ • Theme (Simple, Colorful, Minimal)           │       │
│ │ • Font & size                                 │       │
│ │ • Custom title/instructions                   │       │
│ │                                               │       │
│ │ Center: Preview                               │       │
│ │ • Exercise sheet preview                      │       │
│ │ • Answer key preview (separate tab)           │       │
│ │                                               │       │
│ │ Actions:                                      │       │
│ │ [Enregistrer] [Télécharger PDF] [Régénérer]  │       │
│ └──────────────────────────────────────────────┘       │
└─────────────────────────────────────────────────────────┘
```

### Key Components

**1. DrillSheetFilters (reuse ProgressiveFilters)**
- Same PFEQ cascading filters
- Already validated and working
- No modifications needed

**2. DrillSheetOptions (NEW)**
```tsx
<Card>
  <CardHeader>
    <CardTitle>Options de génération</CardTitle>
  </CardHeader>
  <CardContent>
    <div className="space-y-4">
      <div>
        <label>Nombre d'exercices</label>
        <Slider
          min={10}
          max={30}
          value={exerciseCount}
          onChange={setExerciseCount}
        />
        <span className="text-sm text-muted-foreground">
          {exerciseCount} exercices
        </span>
      </div>

      <div>
        <label>Difficulté</label>
        <RadioGroup value={difficulty} onChange={setDifficulty}>
          <Radio value="uniform">Uniforme</Radio>
          <Radio value="progressive">Progressive (facile → difficile)</Radio>
          <Radio value="mixed">Mixte</Radio>
        </RadioGroup>
      </div>

      <div>
        <Checkbox
          checked={includeAnswerKey}
          onChange={setIncludeAnswerKey}
        >
          Inclure le corrigé
        </Checkbox>
      </div>
    </div>
  </CardContent>
</Card>
```

**3. DrillSheetRenderer (NEW)**
- Displays exercise sheet in A4 portrait format
- Separate tab for answer key
- Clean, minimal design (not decorative like task cards)
- Optimized for printing

**4. Generation Progress (reuse from generator)**
- Same progress bar component
- Adjust messages: "Génération de votre fiche d'exercices..."

### User Flow

```
1. User clicks "Fiches d'exercices" in navigation
   └─> Lands on /drill-generator

2. Completes PFEQ filters (Cycle → Grade → Subject → Notion)
   └─> Same as task cards

3. Sets drill sheet options:
   - Exercise count (slider)
   - Difficulty level (radio buttons)
   - Include answer key (checkbox)

4. Clicks "Générer"
   └─> Shows progress overlay (~30-45 seconds)
   └─> Status messages update

5. Preview appears:
   - Exercise sheet in center
   - Sidebar with styling options
   - Answer key in separate tab

6. User can:
   - Customize theme/font
   - Edit title/instructions
   - Download PDF (2 pages: exercises + answer key)
   - Save to library
   - Regenerate with different options

7. Saved drill sheets accessible via:
   - /drill-library page (NEW)
   - OR unified library with tabs (task cards | drill sheets)
```

---

## 7. GPT PROMPT ENGINEERING

### System Prompt Template

```
You are an expert Quebec elementary school teacher creating practice exercise sheets (fiches d'exercices) aligned with the Programme de formation de l'école québécoise (PFEQ).

Your task is to generate a drill sheet with {exercise_count} exercises for:
- **Cycle:** {cycle}
- **Grade:** {grade}
- **Subject:** {subject}
- **Notion:** {notion}
{sub_notions_list}

## PEDAGOGICAL CONTEXT (PFEQ):

{knowledge_context}

## DRILL SHEET REQUIREMENTS:

1. **Exercise Format:**
   - Each exercise must be clear, concise, and age-appropriate for grade {grade}
   - Use formal French language (vouvoiement for instructions, tutoiement optional in examples)
   - Number exercises sequentially (1, 2, 3...)
   - Provide clear answer spaces (indicated in the question text)

2. **Difficulty Level:** {difficulty}
   {difficulty_instructions}

3. **Exercise Types for {subject} - {notion}:**
   {exercise_type_guidance}

4. **Content Requirements:**
   - All exercises MUST align with PFEQ micro-objectives and evaluation criteria
   - Use Quebec-specific contexts when relevant (e.g., CAD for money, Quebec geography)
   - Vary question formats slightly to maintain engagement
   - Ensure exercises can be completed independently by students

5. **Answer Key:**
   - Provide accurate, complete answers for all exercises
   - For open-ended questions, provide sample/acceptable answers
   - For math, show work/steps if helpful for understanding

## OUTPUT FORMAT:

Respond ONLY with valid JSON in this exact structure:

{
  "title": "string (e.g., 'Fiche d'exercices - Addition')",
  "instructions": "string (brief general instruction for the entire sheet)",
  "exercises": [
    {
      "number": 1,
      "type": "string (e.g., 'addition', 'conjugation')",
      "question": "string (the exercise question with answer space indication)",
      "answer": "string or number (the correct answer)",
      "difficulty": "string (easy|medium|hard)",
      "format": "string (optional: horizontal|vertical|grid)",
      "workSpace": boolean (optional: true if extra work space needed)
    },
    ...
  ]
}

Generate exactly {exercise_count} exercises.
```

### Difficulty-Specific Instructions

```python
difficulty_instructions = {
  'uniform': """
  - All exercises should be at the same difficulty level
  - Choose a difficulty appropriate for typical {grade} students
  - Focus on fundamental practice of the core concept
  """,

  'progressive': """
  - First 1/3 of exercises: Easy (introduce concept, simple applications)
  - Middle 1/3 of exercises: Medium (standard applications, slight variations)
  - Final 1/3 of exercises: Hard (complex applications, multi-step, challenging)
  - Ensure smooth progression between difficulty levels
  """,

  'mixed': """
  - Mix easy, medium, and hard exercises throughout
  - Distribute difficulty evenly (approximately 40% easy, 40% medium, 20% hard)
  - Vary difficulty randomly to keep students engaged
  """
}
```

### Subject-Specific Exercise Type Guidance

#### Mathématiques:

```
Exercise Types for {notion}:
- Arithmetic: Direct calculation problems (e.g., "12 + 8 = ____")
- Word problems: 2-3 sentence scenarios requiring calculation
- Number comparison: Using <, >, = symbols
- Pattern recognition: Complete the sequence
- Measurement: Unit conversion, perimeter, area calculations
- Fractions: Simplification, comparison, operations
- Geometry: Shape identification, angle measurement, transformations

Format preference:
- 70% direct problems (quick practice)
- 30% word problems (application)
- Use both horizontal and vertical formats for operations
```

#### Français - Grammaire:

```
Exercise Types for {notion}:
- Identification: Circle/underline specific parts of speech
- Classification: Sort words into categories (noun, verb, adjective)
- Agreement: Correct gender/number errors in sentences
- Conjugation: Fill in verb forms in present/past/future tense
- Sentence transformation: Change singular→plural, affirmative→negative
- Error correction: Find and fix mistakes in sentences

Format preference:
- Use complete sentences (not isolated words)
- Provide context for vocabulary
- Include diverse sentence structures
```

#### Français - Orthographe:

```
Exercise Types for {notion}:
- Dictée trouvée: Text with blanks to fill (homophones, difficult words)
- Homophone selection: Choose correct word (a/à, ou/où, son/sont)
- Plurals: Write plural form of singular nouns
- Silent letters: Identify words with silent 'h', 'e', etc.
- Spelling patterns: Words following same orthographic rule

Format preference:
- Provide context sentences (not isolated words)
- Group exercises by pattern/rule
- Include common Quebec spellings/vocabulary
```

#### Science et technologie:

```
Exercise Types for {notion}:
- True/False: Statements about scientific concepts
- Matching: Pair terms with definitions
- Labeling: Diagram with blank labels to fill
- Short answer: 1-2 sentence explanations
- Classification: Group items by property/category
- Sequence: Order steps in a process (scientific method, life cycle)

Format preference:
- Use age-appropriate scientific vocabulary
- Include diagrams when helpful
- Focus on PFEQ concepts and evaluation criteria
```

### Example Prompt (Addition - Cycle 1, Grade 2)

```
You are an expert Quebec elementary school teacher creating practice exercise sheets...

Your task is to generate a drill sheet with 20 exercises for:
- **Cycle:** Cycle 1 (1re et 2e année)
- **Grade:** 2e année
- **Subject:** Mathématique
- **Notion:** Arithmétique - Addition

## PEDAGOGICAL CONTEXT (PFEQ):

[PFEQ knowledge chunks about addition for Cycle 1...]

## DRILL SHEET REQUIREMENTS:

1. **Exercise Format:**
   - Clear addition problems with answer space indicated
   - Use numbers 0-20 for Grade 2
   - Both horizontal (5 + 3 = ____) and vertical formats

2. **Difficulty Level:** uniform
   - All exercises should be at the same difficulty level
   - Choose a difficulty appropriate for typical 2e année students

3. **Exercise Types for Mathématique - Arithmétique:**
   - Direct calculation: 15 exercises
   - Simple word problems: 5 exercises
   - Use both horizontal and vertical formats

4. **Content Requirements:**
   - Align with PFEQ micro-objectives for addition in Cycle 1
   - Use Quebec contexts for word problems (e.g., hockey cards, maple syrup bottles)
   - Vary numbers to avoid memorization

5. **Answer Key:**
   - Provide numerical answers for all exercises

## OUTPUT FORMAT:

Respond ONLY with valid JSON...

Generate exactly 20 exercises.
```

---

## 8. PDF EXPORT STRATEGY

### Layout Design

**Page 1: Exercise Sheet**
- **Format:** A4 Portrait (210mm × 297mm)
- **Margins:** 20mm all sides
- **Printable area:** 170mm × 257mm

**Header Section (top 40mm):**
```
┌────────────────────────────────────────────┐
│ NOM: ________________  DATE: _____________ │ ← 15mm height
│                                            │
│ MATHÉMATIQUE - ADDITION (Cycle 1, 2e année)│ ← Title: 18pt bold
│ Notion: Arithmétique                       │ ← Subtitle: 12pt
└────────────────────────────────────────────┘
   ↑ 10mm margin from top
```

**Instructions Section (20mm):**
```
┌────────────────────────────────────────────┐
│ CONSIGNE: Résous les additions suivantes.  │ ← 14pt bold
└────────────────────────────────────────────┘
```

**Exercise Section (rest of page):**
```
┌────────────────────────────────────────────┐
│  1) 5 + 3 = ____       11) 12 + 7 = ____  │
│                                            │
│  2) 8 + 2 = ____       12) 15 + 4 = ____  │
│                                            │
│ ...                                        │
│                                            │
│ 20) 9 + 9 = ____                          │
└────────────────────────────────────────────┘
   ↑ 2-column layout (50% width each)
   ↑ 12-14pt font, adequate line spacing
```

**Footer Section (15mm):**
```
┌────────────────────────────────────────────┐
│    Studio PFEQ - quebec-teacher-hub.ca     │ ← Center, 10pt
│                 Page 1 de 2                │ ← Page number
└────────────────────────────────────────────┘
```

**Page 2: Answer Key**
- Same layout as Page 1
- Title includes "CORRIGÉ" label
- Answers in **bold** or colored text
- Same numbering as exercises

### PDF Generation Method

**Option 1: HTML → Image → PDF (like task cards)**

Pros:
- Reuses existing pdf-generation.ts utilities
- Full control over styling
- Works in browser

Cons:
- Two-step conversion (HTML → PNG → PDF)
- Potential quality loss
- Larger file sizes

**Option 2: Direct PDF Generation (jsPDF + autotable)**

Pros:
- Better text quality (vector, not raster)
- Smaller file sizes
- Faster generation
- Better for text-heavy content

Cons:
- Limited styling options
- More manual positioning code
- Less visual fidelity to preview

**RECOMMENDED: Option 1 (HTML → Image → PDF)**

Why: Consistency with task cards, easier to maintain, full styling control

### Implementation Plan

```typescript
// app/src/lib/drill-sheet-pdf-generation.ts

export async function generateDrillSheetPDF(params: {
  drillSheet: DrillSheetGeneration;
  includeAnswerKey: boolean;
}) {
  const { drillSheet, includeAnswerKey } = params;

  // 1. Setup
  await document.fonts.ready;
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  // 2. Find rendered drill sheet element
  const exerciseSheet = document.querySelector('[data-drill-sheet-exercises]');
  if (!exerciseSheet) throw new Error('Exercise sheet not found');

  // 3. Capture exercise sheet
  const exerciseBlob = await htmlToImage.toPng(exerciseSheet as HTMLElement, {
    quality: 1,
    pixelRatio: 2,
    cacheBust: true
  });

  // 4. Convert to data URL
  const exerciseDataUrl = await blobToDataUrl(exerciseBlob);

  // 5. Add to PDF (page 1)
  pdf.addImage(exerciseDataUrl, 'PNG', 0, 0, 210, 297);

  // 6. If answer key included, add page 2
  if (includeAnswerKey) {
    const answerKey = document.querySelector('[data-drill-sheet-answers]');
    if (answerKey) {
      const answerBlob = await htmlToImage.toPng(answerKey as HTMLElement, {
        quality: 1,
        pixelRatio: 2
      });
      const answerDataUrl = await blobToDataUrl(answerBlob);

      pdf.addPage();
      pdf.addImage(answerDataUrl, 'PNG', 0, 0, 210, 297);
    }
  }

  // 7. Save
  const filename = `fiche-${drillSheet.subject}-${drillSheet.notion}-${YYYYMMDD}.pdf`;
  pdf.save(filename);
}
```

---

## 9. IMPLEMENTATION ROADMAP

### Phase 1: Foundation (DO FIRST)

**Todo Items:**
- [x] Research drill sheet format and pedagogical standards ✓
- [x] Analyze existing task card architecture ✓
- [ ] Create Prisma model for DrillSheetGeneration
- [ ] Run migration: `npx prisma migrate dev --name add_drill_sheets`
- [ ] Create TypeScript types file: `drill-sheet-types.ts`

**Deliverable:** Database ready, types defined

### Phase 2: API Development

**Todo Items:**
- [ ] Create `/api/generate-drill-sheets/route.ts`
  - Copy structure from `/api/generate-cards/route.ts`
  - Reuse key mappings and knowledge retrieval
  - Adapt prompt for drill sheet generation
  - Test with Postman/curl
- [ ] Create `/api/library/save-drill-sheet/route.ts`
- [ ] Create `/api/library/drill-sheets/route.ts` (list)
- [ ] Create `/api/library/drill-sheets/[id]/route.ts` (get/delete)

**Testing:** Test each endpoint independently before UI

**Deliverable:** All API endpoints working and tested

### Phase 3: UI Components

**Todo Items:**
- [ ] Create `DrillSheetRenderer.tsx`
  - Exercise sheet layout (A4 portrait)
  - Answer key layout
  - Print-optimized styles
- [ ] Create `DrillSheetOptions.tsx`
  - Exercise count slider
  - Difficulty radio buttons
  - Answer key checkbox
- [ ] Create drill sheet themes in `drill-sheet-themes.ts`

**Deliverable:** Reusable components built and tested in isolation

### Phase 4: Generator Page

**Todo Items:**
- [ ] Create `/drill-generator/page.tsx`
  - Import ProgressiveFilters (reuse)
  - Add DrillSheetOptions component
  - Implement generation logic
  - Add preview section
  - Add save/download actions
- [ ] Update navigation to include drill sheet link
- [ ] Update home page "Créer du contenu" card
  - Remove "Bientôt" badge from "Fiches d'exercices"
  - Make it clickable → /drill-generator

**Deliverable:** Working drill sheet generator page

### Phase 5: PDF Export

**Todo Items:**
- [ ] Create `drill-sheet-pdf-generation.ts`
  - Implement HTML → Image → PDF pipeline
  - Handle 2-page export (exercises + answers)
  - Add error handling
- [ ] Add download button to drill generator
- [ ] Test PDF output quality and layout

**Deliverable:** PDF export working

### Phase 6: Library Integration

**Todo Items:**
- [ ] Create `/drill-library/page.tsx`
  - List user's saved drill sheets
  - Filter by subject/notion
  - View/download/delete actions
- [ ] Add drill sheets to navigation
- [ ] Update home page library card to show drill sheets

**Optional:** Unified library with tabs (task cards | drill sheets)

**Deliverable:** Library management for drill sheets

### Phase 7: Community Sharing (Optional)

**Todo Items:**
- [ ] Create `/api/shared-library/drill-sheets/route.ts`
- [ ] Create SharedDrillSheet model in Prisma
- [ ] Add share button to drill generator
- [ ] Add drill sheets section to shared library page

**Deliverable:** Community sharing for drill sheets

### Phase 8: Testing & Refinement

**Todo Items:**
- [ ] Test all subjects (Math, Français, Science, Univers Social)
- [ ] Test all cycles and grades
- [ ] Test different exercise counts (10, 15, 20, 30)
- [ ] Test PDF export quality
- [ ] User acceptance testing with real teachers
- [ ] Fix bugs and refine based on feedback

**Deliverable:** Production-ready drill sheet feature

---

## CRITICAL SUCCESS FACTORS

### ✅ DO:

1. **Complete Phase 1 before moving to Phase 2** - Foundation first!
2. **Test API endpoints independently** before building UI
3. **Reuse existing code** where safe (auth, PFEQ, knowledge retrieval)
4. **Keep drill sheets completely separate** from task cards (no shared code that could break existing features)
5. **Follow existing patterns** (same architecture as task cards)
6. **Test thoroughly** after each phase

### ❌ DON'T:

1. **Don't modify existing task card code** unless absolutely necessary
2. **Don't rush** - take time to test each phase
3. **Don't skip migration** - always run Prisma migrations properly
4. **Don't guess at formats** - follow research findings
5. **Don't over-engineer** - start simple, add features later

---

## NEXT STEPS

### Before Implementing:

1. **Review this document** with stakeholders
2. **Get approval** on format, structure, and approach
3. **Clarify any questions** about drill sheet requirements
4. **Set timeline** for each phase

### When Ready to Start:

1. **Create feature branch:** `git checkout -b feature/drill-sheets`
2. **Start with Phase 1** (Prisma model)
3. **Commit frequently** with clear messages
4. **Test thoroughly** at each phase
5. **Update CLAUDE.md** with drill sheet documentation when complete

---

**END OF RESEARCH DOCUMENT**

**Status:** Ready for implementation planning approval
**Last Updated:** January 2025
**Next Action:** Review with stakeholder, get approval to proceed
