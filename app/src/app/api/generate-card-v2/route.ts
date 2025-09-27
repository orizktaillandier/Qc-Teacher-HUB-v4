import { NextResponse } from 'next/server';
import { KnowledgeRetriever } from '@/lib/knowledge-retrieval';
import OpenAI from 'openai';

interface CardRequest {
  cycle: string;
  grade: string;
  subject: string;
  notion: string;
}

export async function POST(request: Request) {
  try {
    const body: CardRequest = await request.json();
    const { cycle, grade, subject, notion } = body;

    console.log('=== CARD V2 GENERATION DEBUG ===');
    console.log('Request parameters:', { cycle, grade, subject, notion });

    // Validate required fields
    if (!cycle || !grade || !subject || !notion) {
      return NextResponse.json({
        success: false,
        error: 'Missing required fields: cycle, grade, subject, notion'
      }, { status: 400 });
    }

    // 1. Retrieve relevant knowledge from our PFEQ database
    console.log('🔍 Retrieving knowledge...');
    const knowledgeRetriever = new KnowledgeRetriever();

    // Map frontend subject keys to database keys
    const subjectKeyMapping: Record<string, string> = {
      'mathematiques': 'mathematique',  // Database uses singular form
      'francais-langue-enseignement': 'francais-langue-enseignement',
      'science-et-technologie': 'science-et-technologie'
    };

    const dbSubjectKey = subjectKeyMapping[subject] || subject;

    const knowledge = knowledgeRetriever.retrieveKnowledge({
      subjectKey: dbSubjectKey,
      notionKey: notion,
      cycleKeys: [cycle],
      maxTokens: 8000  // Increased from 4000 to get more comprehensive knowledge
    });

    console.log('📚 Knowledge retrieved:', {
      chunks: knowledge.chunks.length,
      tokens: knowledge.total_tokens,
      files: knowledge.coverage_stats.files_represented
    });

    // 2. Generate variety seed to avoid repetition
    const varietySeed = {
      timestamp: Date.now(),
      sessionId: `card_v2_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    };

    // 3. Generate cards using GPT-5 with structured output
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const knowledgeContext = knowledgeRetriever.buildKnowledgeContext(knowledge);
    console.log('🤖 Calling GPT-5 for structured JSON generation');

    // Try with primary model first, then fallback
    let completion;
    let modelUsed = process.env.AI_MODEL || 'gpt-5';

    try {
      try {
        completion = await openai.chat.completions.create({
          model: modelUsed,
          messages: [
            {
              role: 'system',
              content: `Tu es un expert en création de cartes à tâches pour le système d'éducation québécois (PFEQ).
Tu génères des données structurées JSON pour 8 cartes à tâches.
IMPORTANT: Retourne UNIQUEMENT un objet JSON valide, sans texte avant ou après.`
            },
            {
              role: 'user',
              content: buildStructuredPrompt(knowledge, body, knowledgeContext)
            }
          ],
          max_completion_tokens: 8000, // GPT-5 uses max_completion_tokens
          // Temperature omitted - GPT-5 enforces default value of 1.0
          response_format: { type: "json_object" } // Force JSON output
        });
      } catch (primaryError) {
        console.log('⚠️ Primary model failed, trying fallback...');
        modelUsed = 'gpt-5-mini';

        completion = await openai.chat.completions.create({
          model: modelUsed,
          messages: [
            {
              role: 'system',
              content: `Tu es un expert en création de cartes à tâches pour le système d'éducation québécois (PFEQ).
Tu génères des données structurées JSON pour 8 cartes à tâches.
IMPORTANT: Retourne UNIQUEMENT un objet JSON valide, sans texte avant ou après.`
            },
            {
              role: 'user',
              content: buildStructuredPrompt(knowledge, body, knowledgeContext)
            }
          ],
          max_completion_tokens: 4000, // GPT-5-mini uses max_completion_tokens
          // Temperature omitted - GPT-5-mini enforces default value of 1.0
          response_format: { type: "json_object" }
        });
      }

      console.log(`✅ ${modelUsed} response received`);

      const generatedContent = completion.choices[0]?.message?.content;
      if (!generatedContent) {
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
      if (!cardsData.cards || !Array.isArray(cardsData.cards) || cardsData.cards.length !== 8) {
        throw new Error(`Expected 8 cards, got ${cardsData.cards?.length || 0}`);
      }

      knowledgeRetriever.close();

      return NextResponse.json({
        success: true,
        data: {
          cards: cardsData.cards,
          metadata: {
            subject,
            notion,
            cycle,
            grade,
            generatedAt: new Date().toISOString(),
            sessionId: varietySeed.sessionId
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
    console.error('Card generation V2 error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Card generation failed'
    }, { status: 500 });
  }
}


function buildStructuredPrompt(knowledge: any, request: CardRequest, knowledgeContext: string): string {
  // Comprehensive PFEQ notion mapping - ALL subjects and notions
  const notionMapping: Record<string, string> = {
    // === MATHÉMATIQUES - Arithmétique ===
    'nombres-naturels': 'Nombres naturels (lecture, écriture, comparaison, valeur de position)',
    'nombres-entiers': 'Nombres entiers (positifs et négatifs)',
    'fractions': 'Fractions (équivalentes, comparaison, addition/soustraction)',
    'nombres-decimaux': 'Nombres décimaux (lecture, écriture, comparaison)',
    'pourcentages': 'Pourcentages (calcul, application)',

    // === MATHÉMATIQUES - Opérations ===
    'addition-soustraction': 'Addition et soustraction',
    'multiplication-division': 'Multiplication et division',
    'calcul-mental': 'Calcul mental et stratégies',
    'estimation': 'Estimation et arrondissement',
    'priorite-operations': 'Priorité des opérations',

    // === MATHÉMATIQUES - Géométrie ===
    'figures-planes': 'Figures planes (polygones, cercle, propriétés)',
    'solides': 'Solides (polyèdres, développement)',
    'angles': 'Angles (types, mesure, construction)',
    'symetrie': 'Symétrie et réflexion',
    'transformation': 'Transformations géométriques (rotation, translation)',
    'reperage-espace': 'Repérage dans l\'espace et plan cartésien',

    // === MATHÉMATIQUES - Mesure ===
    'longueur': 'Longueur et unités de mesure',
    'perimetre': 'Périmètre de figures planes',
    'aire': 'Aire de figures planes (rectangle, triangle, cercle)',
    'volume': 'Volume de solides',
    'masse': 'Masse et unités',
    'temps': 'Temps (lecture, calcul de durée)',
    'temperature': 'Température',
    'angles-mesure': 'Mesure d\'angles en degrés',

    // === MATHÉMATIQUES - Statistique ===
    'collecte-donnees': 'Collecte et organisation de données',
    'tableaux': 'Tableaux de données',
    'diagrammes': 'Diagrammes (bandes, pictogrammes, circulaires)',
    'moyenne': 'Moyenne arithmétique',
    'mode': 'Mode statistique',

    // === MATHÉMATIQUES - Probabilité ===
    'evenements': 'Événements possibles et impossibles',
    'prediction': 'Prédiction et probabilité',
    'equiprobable': 'Événements équiprobables',

    // === FRANÇAIS - Lecture ===
    'strategies-lecture': 'Stratégies de lecture (prédiction, inférence, visualisation)',
    'comprehension': 'Compréhension de texte',
    'inference': 'Inférence et déduction',
    'texte-narratif': 'Texte narratif (récit, conte)',
    'texte-descriptif': 'Texte descriptif',
    'texte-informatif': 'Texte informatif et explicatif',

    // === FRANÇAIS - Écriture ===
    'planification': 'Planification du texte',
    'redaction': 'Rédaction et mise en texte',
    'revision': 'Révision et correction',
    'schema-narratif': 'Schéma narratif (situation initiale, péripéties, dénouement)',
    'paragraphe': 'Structure du paragraphe',

    // === FRANÇAIS - Grammaire ===
    'classes-mots': 'Classes de mots (nom, verbe, adjectif, déterminant, pronom)',
    'groupe-nom': 'Groupe du nom et ses expansions',
    'groupe-verbe': 'Groupe du verbe',
    'fonctions': 'Fonctions syntaxiques (sujet, prédicat, complément)',
    'phrase-types': 'Types et formes de phrases',

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
    'mots-frequents': 'Mots fréquents et vocabulaire',
    'homophones': 'Homophones grammaticaux',
    'accents': 'Accents et signes orthographiques',
    'familles-mots': 'Familles de mots et formation',

    // === SCIENCE - Univers matériel ===
    'etats-matiere': 'États de la matière (solide, liquide, gaz)',
    'changements-etat': 'Changements d\'état (fusion, évaporation, solidification)',
    'melanges-solutions': 'Mélanges et solutions',
    'forces-mouvements': 'Forces et mouvements',
    'energie': 'Formes d\'énergie et transformations',

    // === SCIENCE - Univers vivant ===
    'besoins-essentiels': 'Besoins essentiels des êtres vivants',
    'cycle-vie': 'Cycle de vie des êtres vivants',
    'chaine-alimentaire': 'Chaîne alimentaire et réseau trophique',
    'habitat': 'Habitat et écosystème',
    'adaptation': 'Adaptation des êtres vivants',
    'systemes-corps': 'Systèmes du corps humain',

    // === SCIENCE - Terre et espace ===
    'systeme-solaire': 'Système solaire et planètes',
    'rotation-revolution': 'Rotation et révolution de la Terre',
    'saisons': 'Saisons et inclinaison terrestre',
    'cycle-eau': 'Cycle de l\'eau',
    'phenomenes-meteo': 'Phénomènes météorologiques',
    'phases-lune': 'Phases de la Lune',

    // Fallback to original notion name
  };

  const notionDisplay = notionMapping[request.notion] || request.notion;

  const subjectExamples = {
    'mathematiques': 'problèmes de calcul, géométrie, mesures, fractions',
    'francais-langue-enseignement': 'grammaire, conjugaison, lecture, vocabulaire',
    'science-et-technologie': 'expériences, observations, phénomènes naturels'
  };

  const difficulty = ['easy', 'easy', 'medium', 'medium', 'medium', 'hard', 'hard', 'hard'];

  return `Crée 8 cartes à tâches pour ${request.grade}e année, matière: ${request.subject}, notion spécifique: ${notionDisplay}.

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

INSTRUCTIONS POUR LES VISUELS:
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

Retourne un JSON avec exactement 8 cartes. Voici le format EXACT à suivre:

{
  "cards": [
    {
      "number": 1,
      "title": "Carte ${notionDisplay}",
      "question": "Question simple et directe sur ${notionDisplay}, niveau ${request.grade}e année",
      "answer": "Réponse claire avec explication si nécessaire",
      "difficulty": "${difficulty[0]}",
      "theme": "${notionDisplay}"
    }
  ]
}

Note: Génère 8 cartes au total (numéros 1 à 8) avec le même format

RÈGLES STRICTES:
- 8 cartes EXACTEMENT, numérotées de 1 à 8
- FORMULATION ULTRA SIMPLE:
  • "Combien de côtés a..." PAS "Combien de côtés possède..."
  • "Un angle droit mesure combien de degrés?" PAS "Quelle est la mesure d'un angle droit?"
  • Toujours la forme la plus courte et naturelle
- TOUJOURS utiliser ? pour les angles inconnus, JAMAIS x
- LIMITER les visuels à 25% des cartes (2-3 cartes sur 8 maximum)
- PAS de contexte, PAS de mise en situation
- Questions pédagogiques claires, droit au but
- Difficultés progressives: 2 easy, 3 medium, 3 hard
- Questions alignées PFEQ pour ${request.grade}e année
- Pour les triangles avec angles, utilise [visual:triangle:angle1:angle2:angle3] avec ? pour l'inconnu
- Pour les triangles avec côtés, utilise [visual:triangle-sides:côté1:côté2:côté3:type]
- Réponses claires et concises

${knowledgeContext ? `CONTENU PFEQ PERTINENT:\n${knowledgeContext}` : ''}`;
}