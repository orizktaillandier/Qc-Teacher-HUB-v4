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
              content: buildStructuredPrompt(knowledge, body, knowledgeContext)
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


function buildStructuredPrompt(knowledge: any, request: CardRequest, knowledgeContext: string): string {
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

IMPORTANT: Les questions doivent être SIMPLES et DIRECTES, sans contexte. Aller droit au but avec des questions pédagogiques claires.

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

Exemples de questions SIMPLES et DIRECTES:
- "Calcule: 45 + 27 = ?"
- "Quel est l'angle manquant? [visual:triangle:50:60:x]"
- "Quelle fraction est représentée? [visual:fraction:2:3:2]"
- "Conjugue le verbe 'finir' au présent, 3e personne du singulier."
- "Identifie l'état de la matière: la vapeur d'eau."

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
- TOUTES les questions doivent être SIMPLES et DIRECTES
- PAS de contexte, PAS de mise en situation
- Questions pédagogiques claires, droit au but
- Difficultés progressives: 2 easy, 3 medium, 3 hard
- Questions alignées PFEQ pour ${request.grade}e année
- Pour les triangles avec angles, utilise [visual:triangle:angle1:angle2:angle3]
- Pour les triangles avec côtés, utilise [visual:triangle-sides:côté1:côté2:côté3:type]
- Réponses claires et concises

${knowledgeContext ? `CONTENU PFEQ PERTINENT:\n${knowledgeContext.substring(0, 2000)}` : ''}`);
}