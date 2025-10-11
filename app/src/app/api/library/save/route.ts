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

    // Get user from database, create if doesn't exist
    let user = await prisma.user.findUnique({
      where: { email: session.user.email }
    }).catch(() => null)

    if (!user) {
      // Create user if doesn't exist
      user = await prisma.user.create({
        data: {
          email: session.user.email,
          name: session.user.name,
          image: session.user.image,
        }
      }).catch(() => null)
    }

    if (!user) {
      return NextResponse.json({
        success: false,
        error: 'Database connection failed - Please check your database configuration'
      }, { status: 500 })
    }

    // Parse request body
    const body = await request.json()
    const {
      cycle,
      grade,
      subject,
      notion,
      subNotions = [],
      cardCount,
      theme,
      fontFamily,
      cards,
      // Text customizations
      textPositions,
      editedTexts,
      // Font settings
      fontSize,
      isBold,
      isItalic,
      isUnderline,
      textAlign,
      textBackground,
      // Illustration settings
      selectedCharacter,
      selectedMood,
      showIllustrations,
      illustrationScale,
      illustrationColor,
      transparentBackground,
      illustrationTransforms,
      // Advanced theme settings
      themeType,
      selectedAdvancedTheme,
      selectedDalleTheme
    } = body

    // Validate required fields
    if (!cycle || !grade || !subject || !notion || !cards || !Array.isArray(cards)) {
      return NextResponse.json({
        success: false,
        error: 'Missing required fields'
      }, { status: 400 })
    }

    // Create card generation record
    const cardGeneration = await prisma.cardGeneration.create({
      data: {
        userId: user.id,
        cycle,
        grade,
        subject,
        notion,
        subNotions: JSON.stringify(subNotions || []),
        cardCount: cardCount || cards.length,
        theme,
        fontFamily,
        cards,
        // Text customizations - stringify objects
        textPositions: textPositions ? JSON.stringify(textPositions) : null,
        editedTexts: editedTexts ? JSON.stringify(editedTexts) : null,
        // Font settings
        fontSize,
        isBold,
        isItalic,
        isUnderline,
        textAlign,
        textBackground,
        // Illustration settings
        selectedCharacter,
        selectedMood,
        showIllustrations,
        illustrationScale,
        illustrationColor,
        transparentBackground,
        illustrationTransforms: illustrationTransforms ? JSON.stringify(illustrationTransforms) : null,
        // Advanced theme settings
        themeType,
        selectedAdvancedTheme,
        selectedDalleTheme
      }
    })

    return NextResponse.json({
      success: true,
      generation: {
        id: cardGeneration.id,
        createdAt: cardGeneration.createdAt
      }
    })

  } catch (error) {
    console.error('Save generation error:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to save generation'
    }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}
