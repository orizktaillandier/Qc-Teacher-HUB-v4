import { NextRequest, NextResponse } from 'next/server';
import { auth } from '../../../../../auth';
import { prisma } from '@/lib/prisma';
import type { SaveDrillSheetRequest, SaveDrillSheetResponse } from '@/lib/drill-sheet-types';

// POST /api/library/save-drill-sheet - Save a drill sheet generation to user's library
export async function POST(req: NextRequest) {
  try {
    // Check authentication
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body: SaveDrillSheetRequest = await req.json();
    const {
      cycle,
      grade,
      subject,
      notion,
      subNotions = [],
      exerciseCount,
      difficulty,
      includeAnswerKey,
      theme,
      fontFamily,
      fontSize,
      headerStyle,
      exercises,
      customTitle,
      customInstructions,
      showDifficulty
    } = body;

    console.log('📝 Saving drill sheet to library:', {
      userId: session.user.id,
      subject,
      notion,
      exerciseCount: exercises.length
    });

    // Validate required fields
    if (!cycle || !grade || !subject || !notion || !exercises || !Array.isArray(exercises)) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: cycle, grade, subject, notion, exercises' },
        { status: 400 }
      );
    }

    if (exercises.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Exercises array cannot be empty' },
        { status: 400 }
      );
    }

    // Create drill sheet generation record
    const drillSheet = await prisma.drillSheetGeneration.create({
      data: {
        userId: session.user.id,
        // PFEQ metadata
        cycle,
        grade,
        subject,
        notion,
        subNotions: JSON.stringify(subNotions),
        // Drill sheet settings
        exerciseCount: exercises.length,
        difficulty: difficulty || 'uniform',
        includeAnswerKey: includeAnswerKey !== undefined ? includeAnswerKey : true,
        // Styling
        theme: theme || 'simple',
        fontFamily,
        fontSize: fontSize || 12,
        headerStyle: headerStyle ? JSON.stringify(headerStyle) : null,
        // Generated content
        exercises: exercises as any, // Prisma Json type - cast to satisfy TypeScript
        // Optional customization
        customTitle,
        customInstructions,
        showDifficulty: showDifficulty || false
      },
    });

    console.log('✅ Drill sheet saved successfully:', drillSheet.id);

    return NextResponse.json({
      success: true,
      drillSheetId: drillSheet.id,
    } as SaveDrillSheetResponse);

  } catch (error) {
    console.error('❌ Error saving drill sheet:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to save drill sheet' },
      { status: 500 }
    );
  }
}
