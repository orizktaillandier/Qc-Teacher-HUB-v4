import { NextRequest, NextResponse } from 'next/server';
import { auth } from '../../../../../auth';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    // Check authentication and admin status
    const session = await auth();
    if (!session?.user?.id || session.user.email !== 'qcteachhub@gmail.com') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Fetch stats in parallel
    const [
      totalUsers,
      totalCardGenerations,
      totalDrillSheetGenerations,
      totalFeedback,
      recentActivity,
      userStats
    ] = await Promise.all([
      // Total users
      prisma.user.count(),

      // Total card generations
      prisma.cardGeneration.count(),

      // Total drill sheet generations
      prisma.drillSheetGeneration.count(),

      // Total feedback
      prisma.betaFeedback.count(),

      // Recent activity (last 10 generations)
      prisma.$queryRaw`
        SELECT
          'card' as type,
          cg.id,
          cg.subject,
          cg.notion,
          cg.card_count as count,
          cg.created_at,
          u.name as user_name,
          u.email as user_email
        FROM card_generations cg
        JOIN users u ON cg.user_id = u.id
        UNION ALL
        SELECT
          'drill' as type,
          dg.id,
          dg.subject,
          dg.notion,
          dg.exercise_count as count,
          dg.created_at,
          u.name as user_name,
          u.email as user_email
        FROM drill_sheet_generations dg
        JOIN users u ON dg.user_id = u.id
        ORDER BY created_at DESC
        LIMIT 10
      `,

      // User stats (users with their generation counts)
      prisma.user.findMany({
        select: {
          id: true,
          name: true,
          email: true,
          _count: {
            select: {
              cardGenerations: true,
              drillSheetGenerations: true,
              betaFeedback: true,
            }
          }
        },
        orderBy: {
          cardGenerations: {
            _count: 'desc'
          }
        },
        take: 5
      })
    ]);

    return NextResponse.json({
      stats: {
        totalUsers,
        totalCardGenerations,
        totalDrillSheetGenerations,
        totalGenerations: totalCardGenerations + totalDrillSheetGenerations,
        totalFeedback,
      },
      recentActivity,
      topUsers: userStats.map(user => ({
        name: user.name,
        email: user.email,
        cardGenerations: user._count.cardGenerations,
        drillSheetGenerations: user._count.drillSheetGenerations,
        totalGenerations: user._count.cardGenerations + user._count.drillSheetGenerations,
        feedbackCount: user._count.betaFeedback,
      }))
    });
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    );
  }
}
