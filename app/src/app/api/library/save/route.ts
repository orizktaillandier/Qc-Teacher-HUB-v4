import { NextRequest, NextResponse } from 'next/server';
import { auth } from '../../../../../auth';
import { prisma } from '@/lib/prisma';

// POST /api/library/save - Save a card generation to user's library
export async function POST(req: NextRequest) {
  try {
    // Check authentication
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await req.json();
    const {
      cycle,
      grade,
      subject,
      notion,
      subNotions = [],
      cardCount,
      theme,
      fontFamily,
      cards,
      // Text customizations
      textPositions,
      editedTexts,
      // Font settings
      fontSize,
      isBold,
      isItalic,
      isUnderline,
      textAlign,
      textBackground,
      // Illustration settings
      selectedCharacter,
      selectedMood,
      showIllustrations,
      illustrationScale,
      illustrationColor,
      transparentBackground,
      illustrationTransforms,
      // Advanced theme settings
      themeType,
      selectedAdvancedTheme,
      selectedDalleTheme,
    } = body;

    // Validate required fields
    if (!cycle || !grade || !subject || !notion || !cards || !Array.isArray(cards)) {
      return NextResponse.json(
        { error: 'Missing required fields: cycle, grade, subject, notion, cards' },
        { status: 400 }
      );
    }

    // Create generation record
    const generation = await prisma.cardGeneration.create({
      data: {
        userId: session.user.id,
        cycle,
        grade,
        subject,
        notion,
        subNotions: JSON.stringify(subNotions),
        cardCount: cards.length,
        theme,
        fontFamily,
        cards: cards, // Prisma Json type
        // Text customizations
        textPositions: textPositions ? JSON.stringify(textPositions) : null,
        editedTexts: editedTexts ? JSON.stringify(editedTexts) : null,
        // Font settings
        fontSize,
        isBold,
        isItalic,
        isUnderline,
        textAlign,
        textBackground,
        // Illustration settings
        selectedCharacter,
        selectedMood,
        showIllustrations,
        illustrationScale,
        illustrationColor,
        transparentBackground,
        illustrationTransforms: illustrationTransforms ? JSON.stringify(illustrationTransforms) : null,
        // Advanced theme settings
        themeType,
        selectedAdvancedTheme,
        selectedDalleTheme,
      },
    });

    return NextResponse.json({
      success: true,
      generationId: generation.id,
    });

  } catch (error) {
    console.error('Error saving generation:', error);
    return NextResponse.json(
      { error: 'Failed to save generation' },
      { status: 500 }
    );
  }
}
