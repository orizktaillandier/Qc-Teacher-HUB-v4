import { NextRequest, NextResponse } from 'next/server';
import { auth } from '../../../../auth';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Parse request body
    const body = await request.json();
    const { feedback, userAgent, currentPage } = body;

    // Validate feedback content
    if (!feedback || typeof feedback !== 'string' || feedback.trim().length === 0) {
      return NextResponse.json(
        { error: 'Feedback content is required' },
        { status: 400 }
      );
    }

    // Create feedback entry in database
    const betaFeedback = await prisma.betaFeedback.create({
      data: {
        userId: session.user.id,
        feedback: feedback.trim(),
        userAgent: userAgent || null,
        currentPage: currentPage || null,
      },
    });

    return NextResponse.json(
      {
        success: true,
        id: betaFeedback.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error saving beta feedback:', error);
    return NextResponse.json(
      { error: 'Failed to save feedback' },
      { status: 500 }
    );
  }
}
