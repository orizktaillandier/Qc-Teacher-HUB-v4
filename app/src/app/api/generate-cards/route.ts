import { NextResponse } from 'next/server';
import { KnowledgeRetriever } from '@/lib/knowledge-retrieval';
import OpenAI from 'openai';
import path from 'path';

interface CardRequest {
  cycle: string;
  grade: string;
  subject: string;
  notion: string;
  subNotions?: string[];
  count?: number;
}

export async function POST(request: Request) {
  try {
    const body: CardRequest = await request.json();
    const { cycle, grade, subject, notion, subNotions = [], count = 8 } = body;

    console.log('=== CARD GENERATION V5 DEBUG ===');
    console.log('Request parameters:', { cycle, grade, subject, notion, subNotions, count });

    // Validate required fields
    if (!cycle || !grade || !subject || !notion) {
      return NextResponse.json({
        success: false,
        error: 'Missing required fields: cycle, grade, subject, notion'
      }, { status: 400 });
    }

    // Check for OpenAI API key
    if (!process.env.OPENAI_API_KEY) {
      console.error('❌ OpenAI API key not configured');
      return NextResponse.json({
        success: false,
        error: 'OpenAI API key not configured. Please set OPENAI_API_KEY in your environment variables.'
      }, { status: 500 });
    }

    // 1. Retrieve relevant knowledge from our PFEQ database
    console.log('🔍 Retrieving knowledge...');
    // Provide absolute path to the database
    const dbPath = path.join(process.cwd(), '..', 'data', 'kb_index.sqlite');
    const knowledgeRetriever = new KnowledgeRetriever(dbPath);

    // Map frontend keys to database keys
    const subjectKeyMapping: Record<string, string> = {
      'mathematiques': 'mathematiques',  // Keep plural - database has 43 chunks vs 2 in singular
      'francais-langue-enseignement': 'francais-langue-enseignement',
      'science-et-technologie': 'science-et-technologie',
      'univers-social': 'univers-social'
    };

    // Map frontend notion keys to database notion keys
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

      // Univers social notions - all map to single KB key
      'geographie': 'univers-social',
      'histoire': 'univers-social',
      'citoyennete': 'univers-social'
    };

    const dbSubjectKey = subjectKeyMapping[subject] || subject;
    const dbNotionKey = notionKeyMapping[notion] || notion;

    console.log('Mapped keys:', {
      original: { subject, notion },
      mapped: { dbSubjectKey, dbNotionKey }
    });

    // Map cycle key to database format
    const cycleKeyMapping: Record<string, string> = {
      'cycle1': 'cycle1-primaire',
      'cycle2': 'cycle2-primaire',
      'cycle3': 'cycle3-primaire'
    };
    const dbCycleKey = cycleKeyMapping[cycle] || cycle;

    // First try with specific notion mapping
    let knowledge = knowledgeRetriever.retrieveKnowledge({
      subjectKey: dbSubjectKey,
      notionKey: dbNotionKey,
      cycleKeys: [dbCycleKey],
      maxTokens: 8000  // Increased for more comprehensive knowledge
    });

    // If no chunks found with specific notion, try without notion filter
    // This ensures we always have SOME PFEQ knowledge for the subject/cycle
    if (knowledge.chunks.length === 0) {
      console.log('No chunks found with notion filter, trying broader search...');
      knowledge = knowledgeRetriever.retrieveKnowledge({
        subjectKey: dbSubjectKey,
        notionKey: '', // Empty to get any notion for this subject
        cycleKeys: [dbCycleKey],
        maxTokens: 8000
      });
    }

    console.log('📚 Knowledge retrieved:', {
      chunks: knowledge.chunks.length,
      tokens: knowledge.total_tokens,
      files: knowledge.coverage_stats.files_represented
    });

    // 2. Generate variety seed to avoid repetition
    const varietySeed = {
      timestamp: Date.now(),
      sessionId: `card_v5_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    };

    // 3. Generate cards using OpenAI with structured output
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const knowledgeContext = knowledgeRetriever.buildKnowledgeContext(knowledge);
    console.log('🤖 Calling GPT-5 for structured JSON generation');

    // Prepare the prompt with sub-notions if provided
    const subNotionsContext = subNotions.length > 0
      ? `Focus spécifiquement sur ces sous-notions: ${subNotions.join(', ')}`
      : '';

    // DYNAMIC MODEL SELECTION: Use GPT-5-mini for <=10 cards, GPT-5 for 11+ cards
    const cardCountThreshold = parseInt(process.env.AI_CARD_COUNT_THRESHOLD || '10', 10);
    const smallModel = process.env.AI_MODEL_SMALL || 'gpt-5-mini';
    const largeModel = process.env.AI_MODEL || 'gpt-5';

    let completion;
    let modelUsed = count <= cardCountThreshold ? smallModel : largeModel;

    console.log(`🎯 Selected model: ${modelUsed} (${count} cards, threshold: ${cardCountThreshold})`);

    // Build messages array
    const messages = [
      {
        role: 'system' as const,
        content: `Tu es un expert en création de cartes à tâches pour le système d'éducation québécois (PFEQ).
Tu génères des données structurées JSON pour ${count} cartes à tâches.
IMPORTANT: Retourne UNIQUEMENT un objet JSON valide, sans texte avant ou après.`
      },
      {
        role: 'user' as const,
        content: buildStructuredPrompt(knowledge, body, knowledgeContext, subNotionsContext)
      }
    ];

    try {
      try {
        // GPT-5 with NEW API structure based on latest documentation
        console.log('Calling GPT-5 with new API parameters...');

        // Check if we should use the new responses.create method or fallback to chat.completions
        const isNewAPI = openai.responses && typeof openai.responses.create === 'function';

        if (isNewAPI) {
          // NEW GPT-5 API structure
          completion = await (openai as any).responses.create({
            model: modelUsed,
            input: messages,  // Changed from messages to input
            text: {
              verbosity: "medium",  // Control output detail
              format: { type: "json_object" } // Force JSON output moved to text.format
            },
            reasoning: { effort: "medium" }, // Better for educational content
            // NO SAMPLING PARAMETERS - GPT-5 doesn't support temperature, top_p, etc.
            stream: false,
            truncation: "auto"
          });
        } else {
          // Fallback to older API structure if new one not available
          console.log('Using legacy API structure...');
          completion = await openai.chat.completions.create({
            model: modelUsed,
            messages: messages,
            // NO temperature - GPT-5 doesn't support sampling parameters
            response_format: { type: "json_object" } // Force JSON output
          });
        }
      } catch (primaryError: any) {
        console.log('⚠️ Primary model failed:', primaryError.message);
        const fallbackModel = process.env.AI_MODEL_FALLBACK || 'gpt-5-mini';
        console.log(`Trying fallback with ${fallbackModel}...`);
        modelUsed = fallbackModel;

        // Try GPT-5-mini with similar structure
        const isNewAPI = openai.responses && typeof openai.responses.create === 'function';

        if (isNewAPI) {
          completion = await (openai as any).responses.create({
            model: modelUsed,
            input: messages,
            text: {
              verbosity: "low",     // Lower verbosity for mini
              format: { type: "json_object" } // Force JSON output moved to text.format
            },
            reasoning: { effort: "minimal" }, // Faster for fallback
            // NO SAMPLING PARAMETERS - GPT-5 doesn't support temperature, top_p, etc.
            stream: false,
            truncation: "auto"
          });
        } else {
          completion = await openai.chat.completions.create({
            model: modelUsed,
            messages: messages,
            // NO temperature - GPT-5 doesn't support sampling parameters
            response_format: { type: "json_object" }
          });
        }
      }

      console.log(`✅ ${modelUsed} response received`);

      // Handle response based on API version
      let generatedContent;
      if (completion.output_text) {
        // New API structure
        generatedContent = completion.output_text;
      } else if (completion.choices) {
        // Legacy API structure
        generatedContent = completion.choices[0]?.message?.content;
      }

      if (!generatedContent) {
        console.error('No content in response. Full completion:', completion);
        throw new Error('No content generated');
      }

      // Parse the JSON response
      let cardsData;
      try {
        cardsData = JSON.parse(generatedContent);
      } catch (parseError) {
        console.error(`❌ Failed to parse ${modelUsed} JSON:`, parseError);
        throw new Error(`Invalid JSON response from ${modelUsed}`);
      }

      console.log('📊 Generated', cardsData.cards?.length || 0, 'cards');

      // Validate structure
      if (!cardsData.cards || !Array.isArray(cardsData.cards) || cardsData.cards.length !== count) {
        throw new Error(`Expected ${count} cards, got ${cardsData.cards?.length || 0}`);
      }

      knowledgeRetriever.close();

      return NextResponse.json({
        success: true,
        data: {
          cards: cardsData.cards,
          metadata: {
            subject,
            notion,
            subNotions,
            cycle,
            grade,
            generatedAt: new Date().toISOString(),
            sessionId: varietySeed.sessionId,
            modelUsed
          }
        }
      });

    } catch (llmError) {
      console.error('❌ LLM Generation error:', llmError);
      knowledgeRetriever.close();

      // Return error
      return NextResponse.json({
        success: false,
        error: llmError instanceof Error ? llmError.message : 'LLM generation failed',
      }, { status: 500 });
    }

  } catch (error) {
    console.error('Card generation V5 error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Card generation failed'
    }, { status: 500 });
  }
}


function buildStructuredPrompt(
  knowledge: any,
  request: CardRequest,
  knowledgeContext: string,
  subNotionsContext: string
): string {
  // Comprehensive PFEQ notion mapping - ALL subjects and notions from v4
  const notionMapping: Record<string, string> = {
    // === MATHÉMATIQUES - Arithmétique ===
    'arithmetique': 'Arithmétique (sens du nombre, valeur de position)',
    'nombres-naturels': 'Nombres naturels (lecture, écriture, comparaison, valeur de position)',
    'nombres-entiers': 'Nombres entiers (positifs et négatifs)',
    'operations': 'Opérations (addition, soustraction, multiplication, division)',
    'fractions': 'Fractions (équivalentes, comparaison, addition/soustraction)',
    'decimaux': 'Nombres décimaux (lecture, écriture, comparaison)',
    'nombres-decimaux': 'Nombres décimaux (lecture, écriture, comparaison)',
    'pourcentages': 'Pourcentages (calcul, application)',

    // === MATHÉMATIQUES - Opérations ===
    'addition-soustraction': 'Addition et soustraction',
    'multiplication-division': 'Multiplication et division',
    'calcul-mental': 'Calcul mental et stratégies',
    'estimation': 'Estimation et arrondissement',
    'priorite-operations': 'Priorité des opérations',

    // === MATHÉMATIQUES - Patterns et algèbre ===
    'patterns-algebre': 'Patterns et algèbre (régularités, suites, relations)',

    // === MATHÉMATIQUES - Géométrie ===
    'geometrie': 'Géométrie (figures planes, solides, transformations)',
    'figures-planes': 'Figures planes (polygones, cercle, propriétés)',
    'solides': 'Solides (polyèdres, développement)',
    'angles': 'Angles (types, mesure, construction)',
    'symetrie': 'Symétrie et réflexion',
    'transformation': 'Transformations géométriques (rotation, translation)',
    'reperage-espace': 'Repérage dans l\'espace et plan cartésien',

    // === MATHÉMATIQUES - Mesure ===
    'mesure': 'Mesure (longueur, aire, volume, masse, temps)',
    'longueur': 'Longueur et unités de mesure',
    'perimetre': 'Périmètre de figures planes',
    'aire': 'Aire de figures planes (rectangle, triangle, cercle)',
    'volume': 'Volume de solides',
    'masse': 'Masse et unités',
    'temps': 'Temps (lecture, calcul de durée)',
    'temperature': 'Température',
    'angles-mesure': 'Mesure d\'angles en degrés',

    // === MATHÉMATIQUES - Statistique ===
    'statistique': 'Statistique (collecte de données, diagrammes, moyenne)',
    'collecte-donnees': 'Collecte et organisation de données',
    'tableaux': 'Tableaux de données',
    'diagrammes': 'Diagrammes (bandes, pictogrammes, circulaires)',
    'moyenne': 'Moyenne arithmétique',
    'mode': 'Mode statistique',

    // === MATHÉMATIQUES - Probabilité ===
    'probabilite': 'Probabilité (événements, prédiction)',
    'evenements': 'Événements possibles et impossibles',
    'prediction': 'Prédiction et probabilité',
    'equiprobable': 'Événements équiprobables',

    // === MATHÉMATIQUES - Résolution de problèmes ===
    'resolution-problemes': 'Résolution de problèmes',

    // === FRANÇAIS - Lecture ===
    'lecture': 'Lecture (compréhension, stratégies, fluidité)',
    'strategies-lecture': 'Stratégies de lecture (prédiction, inférence, visualisation)',
    'comprehension': 'Compréhension de texte',
    'inference': 'Inférence et déduction',
    'texte-narratif': 'Texte narratif (récit, conte)',
    'texte-descriptif': 'Texte descriptif',
    'texte-informatif': 'Texte informatif et explicatif',

    // === FRANÇAIS - Écriture ===
    'ecriture': 'Écriture (textes variés, processus, conventions)',
    'planification': 'Planification du texte',
    'redaction': 'Rédaction et mise en texte',
    'revision': 'Révision et correction',
    'schema-narratif': 'Schéma narratif (situation initiale, péripéties, dénouement)',
    'paragraphe': 'Structure du paragraphe',
    'organisation-texte': 'Organisation et cohérence du texte',

    // === FRANÇAIS - Communication orale ===
    'communication-orale': 'Communication orale (écoute, prise de parole)',

    // === FRANÇAIS - Grammaire ===
    'grammaire': 'Grammaire (classes de mots, fonctions, accords)',
    'classes-mots': 'Classes de mots (nom, verbe, adjectif, déterminant, pronom)',
    'groupe-nom': 'Groupe du nom et ses expansions',
    'groupe-verbe': 'Groupe du verbe',
    'fonctions': 'Fonctions syntaxiques (sujet, prédicat, complément)',
    'phrase-types': 'Types et formes de phrases',
    'syntaxe-ponctuation': 'Syntaxe et ponctuation',

    // === FRANÇAIS - Conjugaison ===
    'present': 'Présent de l\'indicatif',
    'imparfait': 'Imparfait de l\'indicatif',
    'passe-compose': 'Passé composé',
    'futur-simple': 'Futur simple',
    'conditionnel': 'Conditionnel présent',
    'imperatif': 'Impératif présent',
    'participe': 'Participe passé et présent',

    // === FRANÇAIS - Accords ===
    'accord-gn': 'Accord dans le groupe du nom',
    'accord-sujet-verbe': 'Accord du verbe avec le sujet',
    'participe-passe-etre': 'Accord du participe passé avec être',
    'participe-passe-avoir': 'Accord du participe passé avec avoir',

    // === FRANÇAIS - Orthographe ===
    'orthographe': 'Orthographe (usage, grammaticale, stratégies)',
    'mots-frequents': 'Mots fréquents et vocabulaire',
    'homophones': 'Homophones grammaticaux',
    'accents': 'Accents et signes orthographiques',
    'familles-mots': 'Familles de mots et formation',
    'lexique': 'Lexique et vocabulaire',

    // === SCIENCE - Univers matériel ===
    'matiere': 'La matière (états, transformations, mélanges)',
    'etats-matiere': 'États de la matière (solide, liquide, gaz)',
    'changements-etat': 'Changements d\'état (fusion, évaporation, solidification)',
    'melanges-solutions': 'Mélanges et solutions',
    'forces-mouvements': 'Forces et mouvements',
    'energie': 'L\'énergie (formes, transformation, sources)',
    'lumiere-son': 'Lumière et son',
    'electricite-magnetisme': 'Électricité et magnétisme',
    'conception-technologique': 'Conception technologique',
    'materiaux': 'Matériaux',
    'systemes-mecanismes': 'Systèmes et mécanismes',

    // === SCIENCE - Univers vivant ===
    'univers-vivant': 'L\'univers vivant',
    'besoins-essentiels': 'Besoins essentiels des êtres vivants',
    'cycle-vie': 'Cycle de vie des êtres vivants',
    'chaine-alimentaire': 'Chaîne alimentaire et réseau trophique',
    'habitat': 'Habitat et écosystème',
    'adaptation': 'Adaptation des êtres vivants',
    'animaux': 'Les animaux',
    'plantes': 'Les plantes',
    'ecosystemes': 'Écosystèmes',
    'corps-humain': 'Corps humain',
    'systemes-corps': 'Systèmes du corps humain',

    // === SCIENCE - Terre et espace ===
    'terre-espace': 'Terre et espace',
    'systeme-solaire': 'Système solaire et planètes',
    'rotation-revolution': 'Rotation et révolution de la Terre',
    'saisons': 'Saisons et inclinaison terrestre',
    'cycle-eau': 'Cycle de l\'eau',
    'phenomenes-meteo': 'Phénomènes météorologiques',
    'phenomenes-geologiques': 'Phénomènes géologiques',
    'meteorologie': 'Météorologie',
    'phases-lune': 'Phases de la Lune',
  };

  const notionDisplay = notionMapping[request.notion] || request.notion;
  const count = request.count || 8;

  // Generate difficulty distribution based on count
  const difficultyDistribution = generateDifficultyDistribution(count);

  return `Crée ${count} cartes à tâches pour ${request.grade}e année, matière: ${request.subject}, notion spécifique: ${notionDisplay}.
${subNotionsContext}

IMPORTANT: Les questions doivent être SIMPLES et DIRECTES, sans contexte. Aller droit au but avec des questions pédagogiques claires.

RÈGLES DE FORMULATION - FRANÇAIS SIMPLE ET DIRECT:
- Utiliser le français le plus SIMPLE et NATUREL possible
- ÉVITER les formulations longues et compliquées
- Pour les angles inconnus, utiliser "?" et JAMAIS "x"

FORMULATIONS CORRECTES ET SIMPLES:
• Pour les mesures d'angles:
  ✓ "Un angle plat mesure combien de degrés?"
  ✓ "Quelle est la mesure de cet angle?"
  ✓ "Trouve la mesure de l'angle ?"

• Pour compter des éléments:
  ✓ "Combien de côtés a un hexagone?"
  ✓ "Combien d'angles droits dans un carré?"

• Pour les calculs:
  ✓ "Calcule: 45 + 27"
  ✓ "Quel est le résultat de 8 × 7?"

ÉVITER CES FORMULATIONS LOURDES:
  ✗ "Combien y a-t-il de degrés dans un angle plat?"
  ✗ "Quel est le nombre de degrés dans un angle droit?"
  ✗ "À combien de degrés correspond un angle plat?"
  ✗ "Combien de côtés possède un hexagone?" (trop formel)

TOUJOURS PRIVILÉGIER LA SIMPLICITÉ!

INSTRUCTIONS POUR LES VISUELS (utiliser avec parcimonie - max 25% des cartes):
Pour les questions de mathématiques ou sciences nécessitant des visuels, utilise ces codes:
- [visual:angle:degrés:taille] pour un angle (ex: [visual:angle:45:100])
- [visual:triangle:angleA:angleB:angleC] pour un triangle avec angles (ex: [visual:triangle:50:60:70] ou [visual:triangle:50:60:?] pour angle manquant)
- [visual:triangle-sides:a:b:c:type] pour un triangle avec côtés (ex: [visual:triangle-sides:3:4:5:right])
- [visual:fraction:numérateur:dénominateur:parties_colorées] (ex: [visual:fraction:3:4:3])
- [visual:numberline:min:max:points] - IMPORTANT: min et max doivent englober les nombres de la question, points = nombres à marquer
  Exemples corrects:
  • Pour "Quelle est la différence entre 79 et 34?" → [visual:numberline:30:80:34,79]
  • Pour "Où est le nombre 5?" → [visual:numberline:0:10:5]
  • Pour "Compare 23 et 41" → [visual:numberline:20:45:23,41]
- [visual:grid:lignes:colonnes:remplies] pour une grille (ex: [visual:grid:3:4:6])
- [visual:clock:heure:minutes] pour une horloge (ex: [visual:clock:3:15])
- [visual:shape:type:taille] pour une forme (ex: [visual:shape:hexagon:100])
- [visual:graph:valeurs] pour un graphique (ex: [visual:graph:2,4,3,5])

Exemples de questions SIMPLES et DIRECTES:
- "Calcule: 45 + 27"
- "Quelle est la mesure de l'angle ? [visual:triangle:50:60:?]"
- "Quelle fraction est représentée? [visual:fraction:2:3:2]"
- "Conjugue le verbe 'finir' au présent, 3e personne du singulier."
- "Dans quel état est la vapeur d'eau?"
- "Combien de côtés a un hexagone?"
- "Un angle droit mesure combien de degrés?"
- "Un angle plat mesure combien de degrés?"
- "Trouve la mesure de l'angle ? [visual:triangle:40:70:?]"

Retourne un JSON avec exactement ${count} cartes. Format EXACT:

{
  "cards": [
    {
      "number": 1,
      "title": "Carte ${notionDisplay}",
      "question": "Question simple et directe",
      "answer": "Réponse claire avec explication si nécessaire",
      "difficulty": "${difficultyDistribution[0]}",
      "theme": "${notionDisplay}"
    }
  ]
}

RÈGLES STRICTES:
- ${count} cartes EXACTEMENT, numérotées de 1 à ${count}
- FORMULATION ULTRA SIMPLE:
  • "Combien de côtés a..." PAS "Combien de côtés possède..."
  • "Un angle droit mesure combien de degrés?" PAS "Quelle est la mesure d'un angle droit?"
  • Toujours la forme la plus courte et naturelle
- TOUJOURS utiliser ? pour les angles inconnus, JAMAIS x
- LIMITER les visuels à 25% des cartes (max 2-3 cartes sur 8)
- PAS de contexte, PAS de mise en situation
- Questions pédagogiques claires, droit au but
- Difficultés: ${difficultyDistribution.filter(d => d === 'easy').length} easy, ${difficultyDistribution.filter(d => d === 'medium').length} medium, ${difficultyDistribution.filter(d => d === 'hard').length} hard
- Questions alignées PFEQ pour ${request.grade}e année
- Pour les triangles avec angles, utilise [visual:triangle:angle1:angle2:angle3] avec ? pour l'inconnu
- Pour les triangles avec côtés, utilise [visual:triangle-sides:côté1:côté2:côté3:type]
- Réponses claires et concises

${knowledgeContext ? `CONTENU PFEQ PERTINENT:\n${knowledgeContext}` : ''}`;
}

function generateDifficultyDistribution(count: number): string[] {
  const distribution: string[] = [];
  const easyCount = Math.floor(count * 0.25); // 25% easy
  const hardCount = Math.floor(count * 0.35); // 35% hard
  const mediumCount = count - easyCount - hardCount; // Rest medium

  for (let i = 0; i < easyCount; i++) distribution.push('easy');
  for (let i = 0; i < mediumCount; i++) distribution.push('medium');
  for (let i = 0; i < hardCount; i++) distribution.push('hard');

  return distribution;
}