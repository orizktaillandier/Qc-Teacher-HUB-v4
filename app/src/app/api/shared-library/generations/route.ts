import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: Request) {
  try {
    // Parse query parameters for filtering
    const { searchParams } = new URL(request.url)
    const subject = searchParams.get('subject')
    const grade = searchParams.get('grade')
    const cycle = searchParams.get('cycle')

    // Build where clause
    const where: any = {}
    if (subject) where.subject = subject
    if (grade) where.grade = grade
    if (cycle) where.cycle = cycle

    // Fetch all shared generations
    const generations = await prisma.sharedGeneration.findMany({
      where,
      orderBy: {
        sharedAt: 'desc'
      },
      select: {
        id: true,
        authorName: true,
        cycle: true,
        grade: true,
        subject: true,
        notion: true,
        subNotions: true,
        cardCount: true,
        theme: true,
        fontFamily: true,
        cards: true,
        textPositions: true,
        editedTexts: true,
        fontSize: true,
        isBold: true,
        isItalic: true,
        isUnderline: true,
        textAlign: true,
        textBackground: true,
        selectedCharacter: true,
        selectedMood: true,
        showIllustrations: true,
        illustrationScale: true,
        illustrationColor: true,
        transparentBackground: true,
        illustrationTransforms: true,
        themeType: true,
        selectedAdvancedTheme: true,
        selectedDalleTheme: true,
        views: true,
        copies: true,
        sharedAt: true
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
    console.error('Fetch shared generations error:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch shared generations'
    }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}
