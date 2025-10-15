import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/shared-library/generations - Get all shared generations (public, no auth required)
export async function GET(req: NextRequest) {
  try {
    // Get query parameters for filtering/pagination
    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = parseInt(searchParams.get('offset') || '0');
    const subject = searchParams.get('subject');
    const grade = searchParams.get('grade');
    const sortBy = searchParams.get('sortBy') || 'recent'; // recent, popular, views

    // Build query filters
    const where: any = {};

    if (subject) {
      where.subject = subject;
    }

    if (grade) {
      where.grade = grade;
    }

    // Determine sort order
    let orderBy: any;
    switch (sortBy) {
      case 'popular':
        orderBy = { copies: 'desc' };
        break;
      case 'views':
        orderBy = { views: 'desc' };
        break;
      case 'recent':
      default:
        orderBy = { sharedAt: 'desc' };
        break;
    }

    // Get shared generations with pagination
    const [generations, total] = await Promise.all([
      prisma.sharedGeneration.findMany({
        where,
        orderBy,
        take: limit,
        skip: offset,
        select: {
          id: true,
          authorName: true,
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
          views: true,
          copies: true,
          sharedAt: true,
        },
      }),
      prisma.sharedGeneration.count({ where }),
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
      generations: parsedGenerations,
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + limit < total,
      },
    });

  } catch (error) {
    console.error('Error fetching shared generations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch shared generations' },
      { status: 500 }
    );
  }
}
