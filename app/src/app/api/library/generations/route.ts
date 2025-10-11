import { NextResponse } from 'next/server'
import { auth } from '../../../../../auth'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: Request) {
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
    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    })

    if (!user) {
      return NextResponse.json({
        success: false,
        error: 'User not found'
      }, { status: 404 })
    }

    // Fetch user's card generations
    const generations = await prisma.cardGeneration.findMany({
      where: {
        userId: user.id
      },
      orderBy: {
        createdAt: 'desc'
      },
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
        createdAt: true,
        updatedAt: true,
        // Text customizations
        textPositions: true,
        editedTexts: true,
        // Font settings
        fontSize: true,
        isBold: true,
        isItalic: true,
        isUnderline: true,
        textAlign: true,
        textBackground: true,
        // Illustration settings
        selectedCharacter: true,
        selectedMood: true,
        showIllustrations: true,
        illustrationScale: true,
        illustrationColor: true,
        transparentBackground: true,
        illustrationTransforms: true,
        // Advanced theme settings
        themeType: true,
        selectedAdvancedTheme: true,
        selectedDalleTheme: true
      }
    })

    // Parse JSON strings back to objects
    const parsedGenerations = generations.map(gen => ({
      ...gen,
      subNotions: JSON.parse(gen.subNotions),
      textPositions: gen.textPositions ? JSON.parse(gen.textPositions) : null,
      editedTexts: gen.editedTexts ? JSON.parse(gen.editedTexts) : null,
      illustrationTransforms: gen.illustrationTransforms ? JSON.parse(gen.illustrationTransforms) : null
    }))

    return NextResponse.json({
      success: true,
      generations: parsedGenerations
    })

  } catch (error) {
    console.error('Fetch generations error:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch generations'
    }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}
