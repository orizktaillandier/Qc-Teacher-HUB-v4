import { NextRequest, NextResponse } from 'next/server';
import { auth } from '../../../../../auth';
import { prisma } from '@/lib/prisma';

// GET /api/library/drill-sheets - List user's drill sheets with pagination
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

    // Parse query parameters
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '20', 10);
    const subject = searchParams.get('subject') || undefined;
    const notion = searchParams.get('notion') || undefined;

    // Build where clause
    const where: any = {
      userId: session.user.id
    };

    if (subject) {
      where.subject = subject;
    }

    if (notion) {
      where.notion = notion;
    }

    // Calculate pagination
    const skip = (page - 1) * limit;

    // Get total count
    const total = await prisma.drillSheetGeneration.count({ where });

    // Get drill sheets
    const drillSheets = await prisma.drillSheetGeneration.findMany({
      where,
      orderBy: {
        createdAt: 'desc'
      },
      skip,
      take: limit
    });

    // Parse JSON fields
    const parsedDrillSheets = drillSheets.map(ds => ({
      ...ds,
      subNotions: JSON.parse(ds.subNotions || '[]'),
      headerStyle: ds.headerStyle ? JSON.parse(ds.headerStyle) : null,
      exercises: ds.exercises // Already JSON type from Prisma
    }));

    const pages = Math.ceil(total / limit);

    console.log(`📚 Retrieved ${drillSheets.length} drill sheets (page ${page} of ${pages})`);

    return NextResponse.json({
      success: true,
      drillSheets: parsedDrillSheets,
      total,
      page,
      pages
    });

  } catch (error) {
    console.error('❌ Error fetching drill sheets:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch drill sheets' },
      { status: 500 }
    );
  }
}
