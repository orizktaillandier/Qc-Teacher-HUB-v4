import { NextResponse } from 'next/server'
import { auth } from '../../../../../../auth'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    // Await params in Next.js 15
    const params = await context.params

    // Get the user session
    const session = await auth()

    if (!session || !session.user?.email) {
      return NextResponse.json({
        success: false,
        error: 'Unauthorized - Please sign in'
      }, { status: 401 })
    }

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    })

    if (!user) {
      return NextResponse.json({
        success: false,
        error: 'User not found'
      }, { status: 404 })
    }

    // Check if generation exists and belongs to user
    const generation = await prisma.cardGeneration.findFirst({
      where: {
        id: params.id,
        userId: user.id
      }
    })

    if (!generation) {
      return NextResponse.json({
        success: false,
        error: 'Generation not found or unauthorized'
      }, { status: 404 })
    }

    // Delete the generation
    await prisma.cardGeneration.delete({
      where: {
        id: params.id
      }
    })

    return NextResponse.json({
      success: true,
      message: 'Generation deleted successfully'
    })

  } catch (error) {
    console.error('Delete generation error:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to delete generation'
    }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    // Await params in Next.js 15
    const params = await context.params

    // Get the user session
    const session = await auth()

    if (!session || !session.user?.email) {
      return NextResponse.json({
        success: false,
        error: 'Unauthorized - Please sign in'
      }, { status: 401 })
    }

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    })

    if (!user) {
      return NextResponse.json({
        success: false,
        error: 'User not found'
      }, { status: 404 })
    }

    // Fetch specific generation
    const generation = await prisma.cardGeneration.findFirst({
      where: {
        id: params.id,
        userId: user.id
      }
    })

    if (!generation) {
      return NextResponse.json({
        success: false,
        error: 'Generation not found'
      }, { status: 404 })
    }

    // Parse JSON strings back to objects
    const parsedGeneration = {
      ...generation,
      subNotions: JSON.parse(generation.subNotions),
      textPositions: generation.textPositions ? JSON.parse(generation.textPositions) : null,
      editedTexts: generation.editedTexts ? JSON.parse(generation.editedTexts) : null,
      illustrationTransforms: generation.illustrationTransforms ? JSON.parse(generation.illustrationTransforms) : null
    }

    return NextResponse.json({
      success: true,
      generation: parsedGeneration
    })

  } catch (error) {
    console.error('Fetch generation error:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch generation'
    }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}
