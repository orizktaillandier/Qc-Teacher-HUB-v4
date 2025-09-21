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
    const knowledge = knowledgeRetriever.retrieveKnowledge({
      subjectKey: subject,
      notionKey: notion,
      cycleKeys: [cycle],
      maxTokens: 4000
    });

    console.log('📚 Knowledge retrieved:', {
      chunks: knowledge.chunks.length,
      tokens: knowledge.total_tokens,
      files: knowledge.coverage_stats.files_represented
    });

    // 2. Generate variety seed to avoid repetition
    const varietySeed = {
      timestamp: Date.now(),
      randomContext: generateQuebecContext(),
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
              content: buildStructuredPrompt(knowledge, body, varietySeed, knowledgeContext)
            }
          ],
          max_completion_tokens: 8000, // Increased for better generation
          temperature: 0.8, // Add creativity
          response_format: { type: "json_object" } // Force JSON output
        });
      } catch (primaryError) {
        console.log('⚠️ Primary model failed, trying fallback...');
        modelUsed = 'gpt-4o';

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
              content: buildStructuredPrompt(knowledge, body, varietySeed, knowledgeContext)
            }
          ],
          max_tokens: 4000, // GPT-4o uses max_tokens
          temperature: 0.8,
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

function generateQuebecContext(): string {
  const contexts = [
    'dans une cabane à sucre',
    'pendant le Carnaval de Québec',
    'au marché Jean-Talon',
    'lors d\'une partie de hockey',
    'à la Ronde',
    'sur les Plaines d\'Abraham',
    'dans le Vieux-Québec',
    'pendant une tempête de neige',
    'au Centre Bell',
    'au Biodôme de Montréal',
    'lors de la Saint-Jean-Baptiste',
    'à l\'érablière',
    'au Mont-Royal',
    'sur le fleuve Saint-Laurent'
  ];
  return contexts[Math.floor(Math.random() * contexts.length)];
}

function buildStructuredPrompt(knowledge: any, request: CardRequest, varietySeed: any, knowledgeContext: string): string {
  // Map notion to proper PFEQ terminology
  const notionMapping: Record<string, string> = {
    // Mathematics sub-notions
    'nombres-naturels': 'Nombres naturels (lecture, écriture, comparaison, valeur de position)',
    'fractions': 'Fractions (équivalentes, comparaison, addition/soustraction)',
    'nombres-decimaux': 'Nombres décimaux (lecture, écriture, comparaison)',
    'addition-soustraction': 'Addition et soustraction',
    'multiplication-division': 'Multiplication et division',
    'figures-planes': 'Figures planes (polygones, angles, symétrie)',
    'solides': 'Solides (polyèdres, développement)',
    'perimetre': 'Périmètre de figures planes',
    'aire': 'Aire de figures planes (rectangle, triangle)',
    'volume': 'Volume de solides',

    // French sub-notions
    'strategies-lecture': 'Stratégies de lecture (prédiction, inférence)',
    'comprehension': 'Compréhension de texte',
    'classes-mots': 'Classes de mots (nom, verbe, adjectif, déterminant)',
    'groupe-nom': 'Groupe du nom et ses accords',
    'present': 'Conjugaison au présent de l\'indicatif',
    'imparfait': 'Conjugaison à l\'imparfait',
    'accord-gn': 'Accord dans le groupe du nom',
    'accord-sujet-verbe': 'Accord sujet-verbe',

    // Science sub-notions
    'etats-matiere': 'États de la matière (solide, liquide, gaz)',
    'cycle-vie': 'Cycle de vie des êtres vivants',
    'chaine-alimentaire': 'Chaîne alimentaire',
    'systeme-solaire': 'Système solaire',
    'cycle-eau': 'Cycle de l\'eau',

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

IMPORTANT: Les questions doivent être TRÈS SPÉCIFIQUEMENT liées à "${notionDisplay}" selon le PFEQ du Québec.

INSTRUCTIONS POUR LES VISUELS:
Pour les questions de mathématiques ou sciences nécessitant des visuels, utilise ces codes:
- [visual:angle:degrés:taille] pour un angle (ex: [visual:angle:45:100])
- [visual:triangle:angleA:angleB:angleC] pour un triangle avec angles (ex: [visual:triangle:50:60:70] ou [visual:triangle:50:60:x] pour angle manquant)
- [visual:triangle-sides:a:b:c:type] pour un triangle avec côtés (ex: [visual:triangle-sides:3:4:5:right])
- [visual:fraction:numérateur:dénominateur:parties_colorées] (ex: [visual:fraction:3:4:3])
- [visual:numberline:min:max:points] (ex: [visual:numberline:0:10:3,5,7])
- [visual:grid:lignes:colonnes:remplies] pour une grille (ex: [visual:grid:3:4:6])
- [visual:clock:heure:minutes] pour une horloge (ex: [visual:clock:3:15])
- [visual:shape:type:taille] pour une forme (ex: [visual:shape:hexagon:100])
- [visual:graph:valeurs] pour un graphique (ex: [visual:graph:2,4,3,5])

Exemples d'utilisation:
- "Quel est l'angle formé? [visual:angle:60:100]"
- "Quelle fraction est colorée? [visual:fraction:2:3:2]"
- "Trouve l'angle manquant dans ce triangle [visual:triangle:50:60:x]"
- Pour angles inconnus, utilise 'x' au lieu de '?'
- "Place le nombre sur la droite: [visual:numberline:0:20:7]"

Retourne un JSON avec exactement 8 cartes. Voici le format EXACT à suivre:

{
  "cards": [
    {
      "number": 1,
      "title": "Titre de la carte 1",
      "context": "Contexte québécois (ex: ${varietySeed.randomContext})",
      "question": "Question claire sur ${notionDisplay} adaptée au niveau ${request.grade}e année",
      "answer": "Réponse détaillée avec explication",
      "difficulty": "${difficulty[0]}",
      "theme": "${notionDisplay}",
      "icon": "🍁"
    }
  ]
}

Note: Génère 8 cartes au total (numéros 1 à 8) avec le même format

RÈGLES STRICTES:
- 8 cartes EXACTEMENT, numérotées de 1 à 8
- TOUTES les questions doivent porter sur "${notionDisplay}"
- Difficultés progressives: 2 easy, 3 medium, 3 hard
- Contextes québécois variés (Carnaval, érablière, hockey, etc.)
- Questions alignées PFEQ pour ${request.grade}e année
- Pour les triangles avec angles, utilise [visual:triangle:angle1:angle2:angle3]
- Pour les triangles avec côtés, utilise [visual:triangle-sides:côté1:côté2:côté3:type]
- Réponses avec étapes et explications détaillées

${knowledgeContext ? `CONTENU PFEQ PERTINENT:\n${knowledgeContext.substring(0, 2000)}` : ''}`;
}