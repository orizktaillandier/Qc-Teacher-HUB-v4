import { NextRequest, NextResponse } from 'next/server';
import { auth } from '../../../../../auth';
import { prisma } from '@/lib/prisma';

// GET /api/library/generations - Get all generations for the authenticated user
export async function GET(req: NextRequest) {
  try {
    // Check authentication
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get query parameters for filtering/pagination
    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = parseInt(searchParams.get('offset') || '0');
    const subject = searchParams.get('subject');
    const grade = searchParams.get('grade');

    // Build query filters
    const where: any = {
      userId: session.user.id,
    };

    if (subject) {
      where.subject = subject;
    }

    if (grade) {
      where.grade = grade;
    }

    // Get generations with pagination
    const [generations, total] = await Promise.all([
      prisma.cardGeneration.findMany({
        where,
        orderBy: {
          createdAt: 'desc',
        },
        take: limit,
        skip: offset,
        select: {
          id: true,
          cycle: true,
          grade: true,
          subject: true,
          notion: true,
          subNotions: true,
          cardCount: true,
          theme: true,
          fontFamily: true,
          cards: true,
          textPositions: true,
          editedTexts: true,
          fontSize: true,
          isBold: true,
          isItalic: true,
          isUnderline: true,
          textAlign: true,
          textBackground: true,
          selectedCharacter: true,
          selectedMood: true,
          showIllustrations: true,
          illustrationScale: true,
          illustrationColor: true,
          transparentBackground: true,
          illustrationTransforms: true,
          themeType: true,
          selectedAdvancedTheme: true,
          selectedDalleTheme: true,
          createdAt: true,
          updatedAt: true,
        },
      }),
      prisma.cardGeneration.count({ where }),
    ]);

    // Parse JSON strings back to objects
    const parsedGenerations = generations.map(gen => ({
      ...gen,
      subNotions: gen.subNotions ? JSON.parse(gen.subNotions) : [],
      textPositions: gen.textPositions ? JSON.parse(gen.textPositions) : null,
      editedTexts: gen.editedTexts ? JSON.parse(gen.editedTexts) : null,
      illustrationTransforms: gen.illustrationTransforms ? JSON.parse(gen.illustrationTransforms) : null,
    }));

    return NextResponse.json({
      success: true,
      generations: parsedGenerations,
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + limit < total,
      },
    });

  } catch (error) {
    console.error('Error fetching generations:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch generations' },
      { status: 500 }
    );
  }
}
