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
    const { sharedGenerationId } = body

    if (!sharedGenerationId) {
      return NextResponse.json({
        success: false,
        error: 'Missing sharedGenerationId'
      }, { status: 400 })
    }

    // Fetch the shared generation
    const sharedGeneration = await prisma.sharedGeneration.findUnique({
      where: { id: sharedGenerationId }
    })

    if (!sharedGeneration) {
      return NextResponse.json({
        success: false,
        error: 'Shared generation not found'
      }, { status: 404 })
    }

    // Copy to personal library
    const personalGeneration = await prisma.cardGeneration.create({
      data: {
        userId: user.id,
        cycle: sharedGeneration.cycle,
        grade: sharedGeneration.grade,
        subject: sharedGeneration.subject,
        notion: sharedGeneration.notion,
        subNotions: sharedGeneration.subNotions,
        cardCount: sharedGeneration.cardCount,
        theme: sharedGeneration.theme,
        fontFamily: sharedGeneration.fontFamily,
        cards: sharedGeneration.cards as any,
        textPositions: sharedGeneration.textPositions,
        editedTexts: sharedGeneration.editedTexts,
        fontSize: sharedGeneration.fontSize,
        isBold: sharedGeneration.isBold,
        isItalic: sharedGeneration.isItalic,
        isUnderline: sharedGeneration.isUnderline,
        textAlign: sharedGeneration.textAlign,
        textBackground: sharedGeneration.textBackground,
        selectedCharacter: sharedGeneration.selectedCharacter,
        selectedMood: sharedGeneration.selectedMood,
        showIllustrations: sharedGeneration.showIllustrations,
        illustrationScale: sharedGeneration.illustrationScale,
        illustrationColor: sharedGeneration.illustrationColor,
        transparentBackground: sharedGeneration.transparentBackground,
        illustrationTransforms: sharedGeneration.illustrationTransforms,
        themeType: sharedGeneration.themeType,
        selectedAdvancedTheme: sharedGeneration.selectedAdvancedTheme,
        selectedDalleTheme: sharedGeneration.selectedDalleTheme
      }
    })

    // Increment copy counter
    await prisma.sharedGeneration.update({
      where: { id: sharedGenerationId },
      data: {
        copies: {
          increment: 1
        }
      }
    })

    return NextResponse.json({
      success: true,
      generation: {
        id: personalGeneration.id,
        createdAt: personalGeneration.createdAt
      }
    })

  } catch (error) {
    console.error('Copy shared generation error:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to copy generation'
    }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}
