import { NextRequest, NextResponse } from 'next/server';
import { auth } from '../../../../../../auth';
import { prisma } from '@/lib/prisma';

// DELETE /api/library/generations/[id] - Delete a specific generation
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Check authentication
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id } = await params;

    // Verify ownership and delete
    const generation = await prisma.cardGeneration.findUnique({
      where: { id },
      select: { userId: true },
    });

    if (!generation) {
      return NextResponse.json(
        { error: 'Generation not found' },
        { status: 404 }
      );
    }

    if (generation.userId !== session.user.id) {
      return NextResponse.json(
        { error: 'Forbidden: You can only delete your own generations' },
        { status: 403 }
      );
    }

    await prisma.cardGeneration.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: 'Generation deleted successfully',
    });

  } catch (error) {
    console.error('Error deleting generation:', error);
    return NextResponse.json(
      { error: 'Failed to delete generation' },
      { status: 500 }
    );
  }
}
