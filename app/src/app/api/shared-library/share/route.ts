import { NextResponse } from 'next/server'
import { auth } from '../../../../../auth'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    // Get the user session
    const session = await auth()

    if (!session || !session.user?.email) {
      return NextResponse.json({
        success: false,
        error: 'Unauthorized - Please sign in'
      }, { status: 401 })
    }

    // Get user from database
    let user = await prisma.user.findUnique({
      where: { email: session.user.email }
    })

    if (!user) {
      // Create user if doesn't exist
      user = await prisma.user.create({
        data: {
          email: session.user.email,
          name: session.user.name,
          image: session.user.image,
        }
      })
    }

    // Parse request body
    const body = await request.json()
    const { generationId } = body

    if (!generationId) {
      return NextResponse.json({
        success: false,
        error: 'Missing generationId'
      }, { status: 400 })
    }

    // Fetch the generation from personal library
    const generation = await prisma.cardGeneration.findFirst({
      where: {
        id: generationId,
        userId: user.id
      }
    })

    if (!generation) {
      return NextResponse.json({
        success: false,
        error: 'Generation not found or unauthorized'
      }, { status: 404 })
    }

    // Check if this generation is already shared by this user
    const existingShared = await prisma.sharedGeneration.findFirst({
      where: {
        userId: user.id,
        cycle: generation.cycle,
        grade: generation.grade,
        subject: generation.subject,
        notion: generation.notion,
        cards: generation.cards as any
      }
    })

    if (existingShared) {
      return NextResponse.json({
        success: false,
        error: 'Cette génération est déjà partagée'
      }, { status: 400 })
    }

    // Create shared generation (copy to shared table)
    const sharedGeneration = await prisma.sharedGeneration.create({
      data: {
        userId: user.id,
        authorName: user.name || 'Utilisateur anonyme',
        authorEmail: user.email,
        cycle: generation.cycle,
        grade: generation.grade,
        subject: generation.subject,
        notion: generation.notion,
        subNotions: generation.subNotions,
        cardCount: generation.cardCount,
        theme: generation.theme,
        fontFamily: generation.fontFamily,
        cards: generation.cards as any,
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
        selectedDalleTheme: generation.selectedDalleTheme
      }
    })

    return NextResponse.json({
      success: true,
      sharedGeneration: {
        id: sharedGeneration.id,
        sharedAt: sharedGeneration.sharedAt
      }
    })

  } catch (error) {
    console.error('Share generation error:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to share generation'
    }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}
