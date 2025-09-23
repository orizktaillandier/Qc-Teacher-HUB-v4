import { NextResponse } from 'next/server';
import { KnowledgeRetriever } from '@/lib/knowledge-retrieval';
import OpenAI from 'openai';

interface CardRequest {
  cycle: string;
  grade: string;
  subject: string;
  notion: string;
  includeAnswerKey: boolean;
}

interface GeneratedCard {
  questionPages: string[];  // Array of HTML for multiple question cards (1-3)
  answerSheet: string;      // Single HTML page for all student answers (up to 10)
  corriger: string;         // Complete HTML for teacher answer key
}

export async function POST(request: Request) {
  try {
    const body: CardRequest = await request.json();
    const { cycle, grade, subject, notion, includeAnswerKey } = body;

    console.log('=== CARD GENERATION DEBUG ===');
    console.log('Request parameters:', { cycle, grade, subject, notion, includeAnswerKey });

    // Validate required fields
    if (!cycle || !grade || !subject || !notion) {
      console.log('❌ Missing required fields');
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
      sessionId: `card_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    };


    // 4. Generate card using GPT-5 Responses API
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const knowledgeContext = knowledgeRetriever.buildKnowledgeContext(knowledge);
    const modelToUse = process.env.AI_MODEL || 'gpt-5';
    console.log('🤖 Calling GPT-5 with model:', modelToUse);

    try {
      const completion = await openai.chat.completions.create({
        model: modelToUse,
        messages: [
          {
            role: 'system',
            content: `Tu es un expert en création de cartes à tâches pour le système d'éducation québécois (PFEQ). Tu créés du contenu éducatif de haute qualité, parfaitement aligné avec le curriculum québécois.`
          },
          {
            role: 'user',
            content: buildCardPrompt(knowledge, body, varietySeed, knowledgeContext)
          }
        ],
        max_completion_tokens: 8000 // GPT-5 enforces default temperature = 1.0, no sampling controls needed
      });

      console.log('✅ GPT-5 response received, tokens used:', completion.usage?.total_tokens);
      console.log('🔍 Full completion response:', JSON.stringify(completion, null, 2));

      const generatedContent = completion.choices[0]?.message?.content;
      if (!generatedContent) {
        console.log('❌ Empty content from GPT-5. Choices:', completion.choices);
        console.log('❌ Reasoning tokens used:', completion.usage?.completion_tokens_details?.reasoning_tokens);
        throw new Error('No content generated');
      }

      console.log('📝 Raw GPT-5 output (first 500 chars):', generatedContent.substring(0, 500));

      // Parse the JSON response from GPT-5
      let generatedCard;
      try {
        generatedCard = JSON.parse(generatedContent);
      } catch (parseError) {
        console.log('❌ Failed to parse GPT-5 JSON output:', parseError);
        throw new Error('Invalid JSON response from GPT-5');
      }

      console.log('🎯 Parsed card structure:', {
        hasQuestionPages: !!generatedCard.questionPages,
        questionPagesCount: generatedCard.questionPages?.length,
        hasAnswerSheet: !!generatedCard.answerSheet,
        hasCorriger: !!generatedCard.corriger
      });

      // Validate the generated card structure
      if (!generatedCard.questionPages || !Array.isArray(generatedCard.questionPages) || generatedCard.questionPages.length !== 2) {
        throw new Error(`Generated card missing questionPages or wrong count (got ${generatedCard.questionPages?.length}, expected 2 A4 pages with 4 cards each)`);
      }
      if (!generatedCard.answerSheet) {
        throw new Error('Generated card missing answerSheet');
      }
      if (!generatedCard.corriger) {
        throw new Error('Generated card missing corriger');
      }

      knowledgeRetriever.close();
      console.log('✅ Returning GPT-5 generated card with', generatedCard.questionPages.length, 'questions');

      return NextResponse.json({
        success: true,
        data: {
          card: generatedCard,
          metadata: {
            subject,
            notion,
            cycle,
            grade,
            generatedAt: new Date().toISOString(),
            sessionId: varietySeed.sessionId,
            knowledgeUsed: {
              chunks: knowledge.chunks.length,
              tokens: knowledge.total_tokens,
              files: knowledge.coverage_stats.files_represented
            }
          }
        },
        debug: {
          gpt5Used: true,
          tokensUsed: completion.usage?.total_tokens,
          rawOutput: generatedContent
        }
      });

    } catch (llmError) {
      console.error('❌ LLM Generation error:', llmError);
      knowledgeRetriever.close();

      // Return error instead of mock data
      return NextResponse.json({
        success: false,
        error: llmError instanceof Error ? llmError.message : 'LLM generation failed',
        details: {
          subject,
          notion,
          cycle,
          grade,
          errorType: 'llm_generation_error'
        }
      }, { status: 500 });
    }

  } catch (error) {
    console.error('Card generation error:', error);
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
    'pendant une tempête de neige'
  ];
  return contexts[Math.floor(Math.random() * contexts.length)];
}

function buildCardPrompt(knowledge: any, request: CardRequest, varietySeed: any, knowledgeContext: string): string {
  return `Tu dois créer 8 cartes à tâches pour ${request.subject}, ${request.grade}e année, notion: ${request.notion}.

INSTRUCTIONS CRITIQUES:
1. Créez 8 questions/problèmes DIFFÉRENTS et appropriés au niveau
2. Formatez VOUS-MÊME le HTML complet pour impression
3. Format: 2 pages A4 PAYSAGE (29.7cm x 21cm), 4 cartes par page en grille 2x2
4. IMPORTANT: Designs VARIÉS et PRINTER-FRIENDLY:
   - Fond blanc ou très pâle (pas de gradients lourds)
   - Bordures colorées ou accents colorés SEULEMENT
   - Lignes de découpe pointillées (#999) entre les cartes
   - Numéros visibles (taille 50-60px)
   - Questions lisibles (taille 16-20px)

EXEMPLES DE STYLES (variez pour chaque carte!):
- Carte avec bordure gauche colorée épaisse (4px solid #couleur)
- Carte avec numéro dans un cercle/carré coloré
- Carte avec bordure top colorée
- Carte avec fond blanc et accents colorés minimaux
- Carte avec motif très léger (opacity 0.05 max)

STRUCTURE JSON À RETOURNER:
{
  "questionPages": [
    "<div style='width:29.7cm;height:21cm;margin:0;padding:0;background:white;page-break-after:always'><div style='display:grid;grid-template-columns:50% 50%;grid-template-rows:50% 50%;width:100%;height:100%'>[VOTRE HTML POUR 4 CARTES AVEC STYLES VARIÉS]</div></div>",
    "<div style='width:29.7cm;height:21cm;margin:0;padding:0;background:white'><div style='display:grid;grid-template-columns:50% 50%;grid-template-rows:50% 50%;width:100%;height:100%'>[VOTRE HTML POUR 4 AUTRES CARTES AVEC STYLES DIFFÉRENTS]</div></div>"
  ],
  "answerSheet": "<div style='width:21cm;min-height:29.7cm;padding:3cm;background:white'><h2 style='text-align:center;margin-bottom:30px'>Feuille Réponse - ${request.subject}</h2><div style='font-size:18px;line-height:2.5'>1. _________________________<br>2. _________________________<br>3. _________________________<br>4. _________________________<br>5. _________________________<br>6. _________________________<br>7. _________________________<br>8. _________________________</div></div>",
  "corriger": "<div style='width:21cm;padding:2cm;background:white;border:1px solid #ccc'><h2>Corrigé</h2><div style='font-size:16px;line-height:2'>[VOS 8 RÉPONSES ICI]</div></div>"
}

CRÉEZ LE CONTENU ET LE FORMATAGE COMPLET!
Contexte québécois suggéré: ${varietySeed.randomContext}

CONNAISSANCES CURRICULUM:
${knowledgeContext}`;
}

// Mock function removed - using real GPT-5 generation only