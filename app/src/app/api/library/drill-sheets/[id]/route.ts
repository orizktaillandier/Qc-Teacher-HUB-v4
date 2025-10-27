import { NextRequest, NextResponse } from 'next/server';
import { auth } from '../../../../../../auth';
import { prisma } from '@/lib/prisma';

// GET /api/library/drill-sheets/[id] - Get specific drill sheet
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Next.js 15: params is now async
    const { id } = await params;

    // Check authentication
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const drillSheet = await prisma.drillSheetGeneration.findUnique({
      where: {
        id,
        userId: session.user.id // Ensure user owns this drill sheet
      }
    });

    if (!drillSheet) {
      return NextResponse.json(
        { success: false, error: 'Drill sheet not found' },
        { status: 404 }
      );
    }

    // Parse JSON fields
    const parsedDrillSheet = {
      ...drillSheet,
      subNotions: JSON.parse(drillSheet.subNotions || '[]'),
      headerStyle: drillSheet.headerStyle ? JSON.parse(drillSheet.headerStyle) : null,
      exercises: drillSheet.exercises
    };

    return NextResponse.json({
      success: true,
      drillSheet: parsedDrillSheet
    });

  } catch (error) {
    console.error('❌ Error fetching drill sheet:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch drill sheet' },
      { status: 500 }
    );
  }
}

// DELETE /api/library/drill-sheets/[id] - Delete specific drill sheet
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Next.js 15: params is now async
    const { id } = await params;

    // Check authentication
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Verify ownership before deleting
    const drillSheet = await prisma.drillSheetGeneration.findUnique({
      where: {
        id
      }
    });

    if (!drillSheet) {
      return NextResponse.json(
        { success: false, error: 'Drill sheet not found' },
        { status: 404 }
      );
    }

    if (drillSheet.userId !== session.user.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized - you do not own this drill sheet' },
        { status: 403 }
      );
    }

    // Delete the drill sheet
    await prisma.drillSheetGeneration.delete({
      where: {
        id
      }
    });

    console.log(`🗑️ Deleted drill sheet: ${id}`);

    return NextResponse.json({
      success: true,
      message: 'Drill sheet deleted successfully'
    });

  } catch (error) {
    console.error('❌ Error deleting drill sheet:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete drill sheet' },
      { status: 500 }
    );
  }
}
