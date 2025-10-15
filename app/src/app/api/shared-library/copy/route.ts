import { NextRequest, NextResponse } from 'next/server';
import { auth } from '../../../../../auth';
import { prisma } from '@/lib/prisma';

// POST /api/shared-library/copy - Copy a shared generation to user's personal library
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
    const { sharedGenerationId } = body;

    if (!sharedGenerationId) {
      return NextResponse.json(
        { error: 'Missing sharedGenerationId' },
        { status: 400 }
      );
    }

    // Get the shared generation
    const sharedGeneration = await prisma.sharedGeneration.findUnique({
      where: { id: sharedGenerationId },
    });

    if (!sharedGeneration) {
      return NextResponse.json(
        { error: 'Shared generation not found' },
        { status: 404 }
      );
    }

    // Create a copy in user's personal library
    const personalGeneration = await prisma.cardGeneration.create({
      data: {
        userId: session.user.id,
        cycle: sharedGeneration.cycle,
        grade: sharedGeneration.grade,
        subject: sharedGeneration.subject,
        notion: sharedGeneration.notion,
        subNotions: sharedGeneration.subNotions,
        cardCount: sharedGeneration.cardCount,
        theme: sharedGeneration.theme,
        fontFamily: sharedGeneration.fontFamily,
        cards: sharedGeneration.cards,
        textPositions: sharedGeneration.textPositions,
        editedTexts: sharedGeneration.editedTexts,
        fontSize: sharedGeneration.fontSize,
        isBold: sharedGeneration.isBold,
        isItalic: sharedGeneration.isItalic,
        isUnderline: sharedGeneration.isUnderline,
        textAlign: sharedGeneration.textAlign,
        textBackground: sharedGeneration.textBackground,
        selectedCharacter: sharedGeneration.selectedCharacter,
        selectedMood: sharedGeneration.selectedMood,
        showIllustrations: sharedGeneration.showIllustrations,
        illustrationScale: sharedGeneration.illustrationScale,
        illustrationColor: sharedGeneration.illustrationColor,
        transparentBackground: sharedGeneration.transparentBackground,
        illustrationTransforms: sharedGeneration.illustrationTransforms,
        themeType: sharedGeneration.themeType,
        selectedAdvancedTheme: sharedGeneration.selectedAdvancedTheme,
        selectedDalleTheme: sharedGeneration.selectedDalleTheme,
      },
    });

    // Increment the copies counter on the shared generation
    await prisma.sharedGeneration.update({
      where: { id: sharedGenerationId },
      data: {
        copies: {
          increment: 1,
        },
      },
    });

    return NextResponse.json({
      success: true,
      generationId: personalGeneration.id,
    });

  } catch (error) {
    console.error('Error copying shared generation:', error);
    return NextResponse.json(
      { error: 'Failed to copy shared generation' },
      { status: 500 }
    );
  }
}
