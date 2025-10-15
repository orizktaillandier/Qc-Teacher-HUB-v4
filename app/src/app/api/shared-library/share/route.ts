import { NextRequest, NextResponse } from 'next/server';
import { auth } from '../../../../../auth';
import { prisma } from '@/lib/prisma';

// POST /api/shared-library/share - Share a generation to the community library
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
    const { generationId } = body;

    if (!generationId) {
      return NextResponse.json(
        { error: 'Missing generationId' },
        { status: 400 }
      );
    }

    // Get the generation to share
    const generation = await prisma.cardGeneration.findUnique({
      where: { id: generationId },
    });

    if (!generation) {
      return NextResponse.json(
        { error: 'Generation not found' },
        { status: 404 }
      );
    }

    if (generation.userId !== session.user.id) {
      return NextResponse.json(
        { error: 'Forbidden: You can only share your own generations' },
        { status: 403 }
      );
    }

    // Create shared generation
    const sharedGeneration = await prisma.sharedGeneration.create({
      data: {
        userId: session.user.id,
        authorName: session.user.name,
        authorEmail: session.user.email,
        cycle: generation.cycle,
        grade: generation.grade,
        subject: generation.subject,
        notion: generation.notion,
        subNotions: generation.subNotions,
        cardCount: generation.cardCount,
        theme: generation.theme,
        fontFamily: generation.fontFamily,
        cards: generation.cards,
        textPositions: generation.textPositions,
        editedTexts: generation.editedTexts,
        fontSize: generation.fontSize,
        isBold: generation.isBold,
        isItalic: generation.isItalic,
        isUnderline: generation.isUnderline,
        textAlign: generation.textAlign,
        textBackground: generation.textBackground,
        selectedCharacter: generation.selectedCharacter,
        selectedMood: generation.selectedMood,
        showIllustrations: generation.showIllustrations,
        illustrationScale: generation.illustrationScale,
        illustrationColor: generation.illustrationColor,
        transparentBackground: generation.transparentBackground,
        illustrationTransforms: generation.illustrationTransforms,
        themeType: generation.themeType,
        selectedAdvancedTheme: generation.selectedAdvancedTheme,
        selectedDalleTheme: generation.selectedDalleTheme,
      },
    });

    return NextResponse.json({
      success: true,
      sharedGenerationId: sharedGeneration.id,
    });

  } catch (error) {
    console.error('Error sharing generation:', error);
    return NextResponse.json(
      { error: 'Failed to share generation' },
      { status: 500 }
    );
  }
}
