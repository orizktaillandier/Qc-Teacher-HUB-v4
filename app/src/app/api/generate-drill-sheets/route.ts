import { NextResponse } from 'next/server';
import { KnowledgeRetriever } from '@/lib/knowledge-retrieval';
import OpenAI from 'openai';
import path from 'path';
import type {
  DrillSheetGenerationRequest,
  DrillSheetGenerationResponse,
  DrillSheetErrorResponse,
  DrillExercise
} from '@/lib/drill-sheet-types';

export async function POST(request: Request) {
  try {
    const body: DrillSheetGenerationRequest = await request.json();
    const {
      cycle,
      grade,
      subject,
      notion,
      subNotions = [],
      exerciseCount,
      difficulty = 'uniform',
      includeAnswerKey = true,
      exerciseTypes = []
    } = body;

    console.log('=== DRILL SHEET GENERATION V5 DEBUG ===');
    console.log('Request parameters:', {
      cycle,
      grade,
      subject,
      notion,
      subNotions,
      exerciseCount,
      difficulty,
      includeAnswerKey
    });

    // Validate required fields
    if (!cycle || !grade || !subject || !notion) {
      return NextResponse.json({
        success: false,
        error: 'Missing required fields: cycle, grade, subject, notion'
      } as DrillSheetErrorResponse, { status: 400 });
    }

    // Check for OpenAI API key
    if (!process.env.OPENAI_API_KEY) {
      console.error('❌ OpenAI API key not configured');
      return NextResponse.json({
        success: false,
        error: 'OpenAI API key not configured. Please set OPENAI_API_KEY in your environment variables.'
      } as DrillSheetErrorResponse, { status: 500 });
    }

    // Determine default exercise count based on subject
    const defaultCounts: Record<string, number> = {
      'mathematiques': 20,
      'francais-langue-enseignement': 15,
      'science-et-technologie': 12,
      'univers-social': 12
    };
    const count = exerciseCount || defaultCounts[subject] || 15;

    console.log(`📝 Generating ${count} exercises with ${difficulty} difficulty`);

    // 1. Retrieve relevant knowledge from PFEQ database
    console.log('🔍 Retrieving knowledge...');
    const dbPath = path.join(process.cwd(), '..', 'data', 'kb_index.sqlite');
    const knowledgeRetriever = new KnowledgeRetriever(dbPath);

    // Subject key mapping - Keep mathematiques as PLURAL (most chunks are under plural form)
    const subjectKeyMapping: Record<string, string> = {
      'mathematiques': 'mathematiques',  // Keep plural - database has 43 chunks vs 2 in singular
      'francais-langue-enseignement': 'francais-langue-enseignement',
      'science-et-technologie': 'science-et-technologie',
      'univers-social': 'univers-social'
    };

    const notionKeyMapping: Record<string, string> = {
      // Math notions (for mathematiques PLURAL - database has: operations, geometrie-mesure, nombres-naturels)
      'arithmetique': 'nombres-naturels',  // General arithmetic in natural numbers
      'nombres-naturels': 'nombres-naturels',
      'operations': 'operations',
      'fractions': 'nombres-naturels',  // Fractions content is in nombres-naturels chunks
      'decimaux': 'nombres-naturels',  // Decimals also in natural numbers
      'patterns-algebre': 'operations',  // Patterns/algebra in operations
      'geometrie': 'geometrie-mesure',
      'mesure': 'geometrie-mesure',
      'statistique': 'operations',  // Stats likely in operations
      'probabilite': 'operations',  // Probability in operations
      'resolution-problemes': '',  // Empty = broader search across all math notions

      // French notions
      'lecture': 'francais-lecture-comprehension',
      'ecriture': 'francais-ecriture-redaction',
      'communication-orale': 'francais-communication-orale',
      'grammaire': 'francais-grammaire-orthographe',
      'orthographe': 'francais-grammaire-orthographe',
      'lexique': 'francais-grammaire-orthographe',
      'syntaxe-ponctuation': 'francais-grammaire-orthographe',
      'organisation-texte': 'francais-ecriture-redaction',

      // Science notions
      'matiere': 'univers-materiel',
      'energie': 'univers-materiel',
      'forces-mouvements': 'univers-materiel',
      'lumiere-son': 'univers-materiel',
      'electricite-magnetisme': 'univers-materiel',
      'univers-vivant': 'univers-vivant',
      'animaux': 'univers-vivant',
      'plantes': 'univers-vivant',
      'ecosystemes': 'univers-vivant',
      'corps-humain': 'univers-vivant',
      'terre-espace': 'terre-et-espace',
      'phenomenes-geologiques': 'terre-et-espace',
      'meteorologie': 'terre-et-espace',
      'conception-technologique': 'univers-materiel',
      'materiaux': 'univers-materiel',
      'systemes-mecanismes': 'univers-materiel',

      // Univers social notions
      'geographie': 'univers-social',
      'histoire': 'univers-social',
      'citoyennete': 'univers-social'
    };

    const cycleKeyMapping: Record<string, string> = {
      'cycle1': 'cycle1-primaire',
      'cycle2': 'cycle2-primaire',
      'cycle3': 'cycle3-primaire'
    };

    const dbSubjectKey = subjectKeyMapping[subject] || subject;
    const dbNotionKey = notionKeyMapping[notion] || notion;
    const dbCycleKey = cycleKeyMapping[cycle] || cycle;

    console.log('Mapped keys:', {
      original: { subject, notion, cycle },
      mapped: { dbSubjectKey, dbNotionKey, dbCycleKey }
    });

    // Retrieve knowledge with same logic as task cards
    let knowledge = knowledgeRetriever.retrieveKnowledge({
      subjectKey: dbSubjectKey,
      notionKey: dbNotionKey,
      cycleKeys: [dbCycleKey],
      maxTokens: 8000
    });

    // Fallback to broader search if no chunks found
    if (knowledge.chunks.length === 0) {
      console.log('No chunks found with notion filter, trying broader search...');
      knowledge = knowledgeRetriever.retrieveKnowledge({
        subjectKey: dbSubjectKey,
        notionKey: '',
        cycleKeys: [dbCycleKey],
        maxTokens: 8000
      });
    }

    console.log('📚 Knowledge retrieved:', {
      chunks: knowledge.chunks.length,
      tokens: knowledge.total_tokens,
      files: knowledge.coverage_stats.files_represented
    });

    // 2. Generate session ID
    const sessionId = `drill_v5_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // 3. Generate drill sheet using OpenAI
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const knowledgeContext = knowledgeRetriever.buildKnowledgeContext(knowledge);
    console.log('🤖 Calling GPT for drill sheet generation');

    // DYNAMIC MODEL SELECTION: Use GPT-5-mini for <=15 exercises, GPT-5 for 16+
    const exerciseCountThreshold = 15;
    const smallModel = process.env.AI_MODEL_SMALL || 'gpt-5-mini';
    const largeModel = process.env.AI_MODEL || 'gpt-5';

    let modelUsed = count <= exerciseCountThreshold ? smallModel : largeModel;

    console.log(`🎯 Selected model: ${modelUsed} (${count} exercises, threshold: ${exerciseCountThreshold})`);

    // Build drill sheet prompt
    const drillPrompt = buildDrillSheetPrompt({
      subject,
      notion,
      grade,
      cycle,
      exerciseCount: count,
      difficulty,
      subNotions,
      exerciseTypes,
      knowledgeContext
    });

    const messages = [
      {
        role: 'system' as const,
        content: `Tu es un expert en création de fiches d'exercices (drill sheets) pour le système d'éducation québécois (PFEQ).
Tu génères des données structurées JSON pour ${count} exercices de pratique.
IMPORTANT: Retourne UNIQUEMENT un objet JSON valide, sans texte avant ou après.`
      },
      {
        role: 'user' as const,
        content: drillPrompt
      }
    ];

    let completion;

    try {
      // Try primary model
      try {
        const isNewAPI = openai.responses && typeof openai.responses.create === 'function';

        if (isNewAPI) {
          completion = await (openai as any).responses.create({
            model: modelUsed,
            input: messages,
            text: {
              verbosity: "low",
              format: { type: "json_object" }
            },
            reasoning: { effort: "high" },
            stream: false,
            truncation: "auto"
          });
        } else {
          completion = await openai.chat.completions.create({
            model: modelUsed,
            messages: messages,
            response_format: { type: "json_object" }
          });
        }
      } catch (primaryError: any) {
        console.log('⚠️ Primary model failed:', primaryError.message);
        const fallbackModel = process.env.AI_MODEL_FALLBACK || 'gpt-5-mini';
        console.log(`Trying fallback with ${fallbackModel}...`);
        modelUsed = fallbackModel;

        const isNewAPI = openai.responses && typeof openai.responses.create === 'function';

        if (isNewAPI) {
          completion = await (openai as any).responses.create({
            model: modelUsed,
            input: messages,
            text: {
              verbosity: "low",
              format: { type: "json_object" }
            },
            reasoning: { effort: "minimal" },
            stream: false,
            truncation: "auto"
          });
        } else {
          completion = await openai.chat.completions.create({
            model: modelUsed,
            messages: messages,
            response_format: { type: "json_object" }
          });
        }
      }

      console.log(`✅ ${modelUsed} response received`);

      // Extract generated content
      let generatedContent;
      if (completion.output_text) {
        generatedContent = completion.output_text;
      } else if (completion.choices) {
        generatedContent = completion.choices[0]?.message?.content;
      }

      if (!generatedContent) {
        console.error('No content in response. Full completion:', completion);
        throw new Error('No content generated');
      }

      // Parse JSON response
      let drillData;
      try {
        drillData = JSON.parse(generatedContent);
      } catch (parseError) {
        console.error(`❌ Failed to parse ${modelUsed} JSON:`, parseError);
        throw new Error(`Invalid JSON response from ${modelUsed}`);
      }

      // Validate structure
      if (!drillData.exercises || !Array.isArray(drillData.exercises)) {
        throw new Error('Invalid response structure: missing exercises array');
      }

      // Count TOTAL exercises (including sub-parts of multi-part questions)
      const totalExercises = drillData.exercises.reduce((total: number, exercise: DrillExercise) => {
        if (exercise.isMultiPart && exercise.subParts && Array.isArray(exercise.subParts)) {
          return total + exercise.subParts.length;
        }
        return total + 1;
      }, 0);

      console.log(`📊 Generated ${drillData.exercises.length} questions with ${totalExercises} total exercises`);

      if (totalExercises !== count) {
        console.warn(`⚠️ Expected ${count} exercises, got ${totalExercises}`);
        // Allow slight variation (±2) but warn
        if (Math.abs(totalExercises - count) > 2) {
          throw new Error(`Expected ${count} exercises, got ${totalExercises}`);
        }
      }

      knowledgeRetriever.close();

      // Return successful response
      return NextResponse.json({
        success: true,
        data: {
          exercises: drillData.exercises as DrillExercise[],
          metadata: {
            subject,
            notion,
            subNotions,
            cycle,
            grade,
            exerciseCount: totalExercises,  // Total exercises including sub-parts
            difficulty,
            generatedAt: new Date().toISOString(),
            sessionId,
            modelUsed
          }
        }
      } as DrillSheetGenerationResponse);

    } catch (llmError) {
      console.error('❌ LLM Generation error:', llmError);
      knowledgeRetriever.close();

      return NextResponse.json({
        success: false,
        error: llmError instanceof Error ? llmError.message : 'LLM generation failed',
      } as DrillSheetErrorResponse, { status: 500 });
    }

  } catch (error) {
    console.error('Drill sheet generation V5 error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Drill sheet generation failed'
    } as DrillSheetErrorResponse, { status: 500 });
  }
}

/**
 * Build GPT prompt for drill sheet generation
 */
function buildDrillSheetPrompt(params: {
  subject: string;
  notion: string;
  grade: string;
  cycle: string;
  exerciseCount: number;
  difficulty: string;
  subNotions: string[];
  exerciseTypes: string[];
  knowledgeContext: string;
}): string {
  const {
    subject,
    notion,
    grade,
    cycle,
    exerciseCount,
    difficulty,
    subNotions,
    exerciseTypes,
    knowledgeContext
  } = params;

  const subNotionsContext = subNotions.length > 0
    ? `Focus spécifiquement sur ces sous-notions: ${subNotions.join(', ')}`
    : '';

  const exerciseTypesContext = exerciseTypes.length > 0
    ? `Types d'exercices à privilégier: ${exerciseTypes.join(', ')}`
    : '';

  // Difficulty instructions
  const difficultyInstructions = getDifficultyInstructions(difficulty, exerciseCount);

  // Subject-specific exercise guidance
  const exerciseGuidance = getExerciseGuidanceForSubject(subject, notion);

  return `Crée une fiche d'exercices CRÉATIVE et VARIÉE avec ${exerciseCount} exercices pour ${grade}e année, matière: ${subject}, notion: ${notion}.
${subNotionsContext}
${exerciseTypesContext}

**Important:** Varie les formats, types de questions et approches. Évite la répétition. Sois créatif!

## RÈGLES POUR FICHES D'EXERCICES:

1. **Format d'exercice:**
   - Exercices clairs, concis et adaptés à l'âge (${grade}e année)
   - Français formel pour les consignes
   - Numéroter les questions principales (1, 2, 3...)
   - Les sous-parties utilisent des lettres (a, b, c...)
   - Indiquer l'espace de réponse (____)

2. **Niveau de difficulté:** ${difficulty}
${difficultyInstructions}

3. **Types d'exercices pour ${subject} - ${notion}:**
${exerciseGuidance}

4. **Exigences de contenu:**
   - Aligner avec les objectifs du PFEQ
   - Utiliser des contextes québécois quand pertinent ($ CAD, géographie du Québec)
   - Varier les formats et types de questions
   - Sois créatif et évite la répétition

5. **Corrigé:**
   - Fournir des réponses précises et complètes pour tous les exercices
   - Pour les questions ouvertes, fournir des réponses acceptables
   - Pour les mathématiques, montrer les étapes si utile pour la compréhension

## FORMAT DE SORTIE:

Réponds UNIQUEMENT avec un JSON valide dans cette structure EXACTE:

{
  "title": "Fiche d'exercices - ${notion}",
  "instructions": "Consigne générale brève pour toute la fiche",
  "exercises": [
    // OPTION 1: Question simple (individuelle)
    {
      "number": 1,
      "type": "string (ex: 'addition', 'conjugation')",
      "question": "La question de l'exercice avec indication d'espace de réponse (____)",
      "answer": "Réponse correcte (string ou number)",
      "difficulty": "easy|medium|hard",
      "isMultiPart": false,
      "layout": "compact|full-width"
    },
    // OPTION 2: Question multi-parties (a, b, c, d...) - UTILISE CECI POUR GROUPER DES QUESTIONS SIMILAIRES!
    {
      "number": 2,
      "type": "string",
      "question": "Consigne pour toutes les sous-parties (ex: 'Transcris ces fractions impropres en nombres fractionnaires.')",
      "isMultiPart": true,
      "layout": "full-width",
      "subParts": [
        {"letter": "a", "question": "13/4", "answer": "3 1/4"},
        {"letter": "b", "question": "35/16", "answer": "2 3/16"},
        {"letter": "c", "question": "7/2", "answer": "3 1/2"},
        {"letter": "d", "question": "19/8", "answer": "2 3/8"}
        // ... jusqu'à 8-10 sous-parties maximum
      ]
    }
  ]
}

### 🎯 RÈGLES STRICTES: QUESTIONS MULTI-PARTIES (isMultiPart):

**RÈGLE #1: Quand grouper en multi-partie (OBLIGATOIRE):**
Si tu crées plusieurs exercices avec la MÊME instruction (ex: "Calcule:", "Simplifie:", "Conjugue:"), tu DOIS les grouper comme sous-parties d'UNE SEULE question. Ne crée PAS de questions séparées avec la même instruction!

❌ INCORRECT (questions séparées avec même instruction):
- Question 3: Calcule : 1/4 + 2/4 = ___
- Question 4: Calcule : 7/8 - 1/4 = ___
- Question 6: Calcule : 3/4 - 1/2 = ___

✅ CORRECT (groupées en multi-partie):
- Question 3: Calcule:
  a) 1/4 + 2/4 = ___
  b) 7/8 - 1/4 = ___
  c) 3/4 - 1/2 = ___

**RÈGLE #2: Cohérence des sous-parties (OBLIGATOIRE):**
TOUTES les sous-parties d'une question multi-partie DOIVENT avoir:
- Le MÊME type de question (ne mélange PAS différents types!)
- Le MÊME format de réponse
- La MÊME instruction générale

❌ INCORRECT (mélange de types dans une multi-partie):
- 1. Simplifie ou trouve l'équivalent:
  a) 4/8 = ___  (simplification)
  b) 2/3 = ___/12  (équivalent)
  c) 3/5 et 9/15: Sont-elles équivalentes? (vrai/faux) ← TYPE DIFFÉRENT!
  d) 12/16 = ___  (simplification)

✅ CORRECT (types cohérents):
- 1. Simplifie chaque fraction:
  a) 4/8 = ___
  b) 12/16 = ___
  c) 9/15 = ___
- 2. Trouve l'équivalent:
  a) 2/3 = ___/12
  b) 1/2 = ___/8
- 3. Sont-elles équivalentes? Écris Vrai ou Faux:
  a) 3/5 et 9/15: ___
  b) 2/4 et 1/2: ___

**isMultiPart: true** - Grouper des questions similaires:
- OBLIGATOIRE pour: questions avec la même instruction répétée
- Utile pour: calculs, conversions, conjugaisons, vrai/faux
- Format: "1. [Consigne]  a) ... b) ... c) ..."
- Suggestion: 3-8 sous-parties maximum
- TOUTES les sous-parties doivent être du MÊME type

**isMultiPart: false** - Questions individuelles:
- Utile pour: questions uniques, problèmes complexes, questions à développement
- Format standard numéroté
- Une seule question par numéro

### 🔧 INSTRUCTIONS POUR LA PROPRIÉTÉ "layout":

Le champ "layout" contrôle comment les exercices sont disposés sur la page pour optimiser l'espace:

- **"compact"** (2 exercices par ligne): Pour les questions COURTES et SIMPLES qui nécessitent peu d'espace:
  - Calculs directs (ex: "12 + 8 = ____", "45 - 23 = ____")
  - Fractions simples (ex: "Simplifie 4/8 = ____")
  - Conjugaison (ex: "Conjugue 'aller' à l'imparfait: je ____")
  - Identification courte (ex: "Quel est le déterminant: Le chien dort")
  - Vrai/Faux (ex: "La Terre est ronde. □ Vrai □ Faux")
  - Questions courtes (1 ligne maximum)

- **"full-width"** (1 exercice par ligne): Pour les questions LONGUES ou COMPLEXES qui nécessitent plus d'espace:
  - Problèmes de mots (2+ phrases)
  - Textes de compréhension (lectures avec questions)
  - Questions à développement (réponses longues attendues)
  - Exercices avec images/diagrammes
  - Questions multi-parties (avec sous-parties a, b, c)
  - Exercices nécessitant de l'espace de travail (dessins, calculs complexes)
  - Questions avec choix multiples (4+ options)

**RÈGLE GÉNÉRALE:** Si la question + réponse attendue tiennent sur 1-2 lignes → "compact", sinon → "full-width"

### 📊 COMPTAGE TOTAL D'EXERCICES:

IMPORTANT: Le TOTAL d'exercices doit être EXACTEMENT ${exerciseCount}.

**Comment compter:**
- Questions individuelles: 1 question = 1 exercice
- Questions multi-parties: Chaque sous-partie = 1 exercice

**Exemple pour atteindre ${exerciseCount} exercices:**
- Question 1 avec sous-parties a-h = 8 exercices
- Questions 2-8 individuelles = 7 exercices
- TOTAL = 8 + 7 = 15 exercices ✓

**Le nombre de questions numérotées (1, 2, 3...) peut être différent de ${exerciseCount}!**

Sois créatif avec le format et la variété!

${knowledgeContext ? `## CONTENU PFEQ PERTINENT:\n${knowledgeContext}` : ''}`;
}

/**
 * Get difficulty-specific instructions
 */
function getDifficultyInstructions(difficulty: string, count: number): string {
  switch (difficulty) {
    case 'uniform':
      return `- Même niveau de difficulté pour tous les exercices
- Approprié pour l'année scolaire`;

    case 'progressive':
      return `- Augmenter progressivement la difficulté
- Commencer facile, terminer plus difficile
- Environ un tiers facile, un tiers moyen, un tiers difficile`;

    case 'mixed':
      return `- Mélanger les niveaux de difficulté
- Alterner entre facile, moyen et difficile
- Environ 40% facile, 40% moyen, 20% difficile`;

    default:
      return '- Niveau approprié pour l\'année scolaire';
  }
}

/**
 * Get subject-specific exercise guidance
 */
function getExerciseGuidanceForSubject(subject: string, notion: string): string {
  switch (subject) {
    case 'mathematiques':
      return `Types d'exercices possibles:
- Calculs directs (additions, soustractions, multiplications, divisions)
- Problèmes de mots avec contexte québécois
- Comparaisons de nombres (<, >, =)
- Patterns et suites numériques
- Mesure et conversions d'unités
- Fractions (simplification, comparaison, opérations)
- Géométrie (formes, angles, transformations)

Varie les types et les formats pour maintenir l'engagement.`;

    case 'francais-langue-enseignement':
      return `Types d'exercices possibles:
- Identification de parties du discours
- Classification grammaticale
- Accords (genre, nombre, verbes)
- Conjugaison (présent, passé, futur, imparfait)
- Transformation de phrases
- Correction d'erreurs
- Vocabulaire et synonymes

Utilise des phrases complètes et des contextes réels.`;

    case 'science-et-technologie':
      return `Types d'exercices possibles:
- Vrai/Faux sur concepts scientifiques
- Appariement de termes et définitions
- Étiquetage de diagrammes
- Questions de compréhension courtes
- Classification d'éléments
- Séquences et processus

Adapte le vocabulaire scientifique à l'âge des élèves.`;

    case 'univers-social':
      return `Types d'exercices possibles:
- Identification géographique (carte du Québec/Canada)
- Ordre chronologique d'événements
- Association de dates historiques
- Questions sur la citoyenneté
- Contextes québécois et canadiens

Utilise des exemples pertinents au Québec.`;

    default:
      return `Crée des exercices variés et engageants adaptés à la matière.
Varie les formats et types de questions pour maintenir l'intérêt.`;
  }
}
