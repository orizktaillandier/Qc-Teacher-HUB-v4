const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  try {
    // Get all card generations
    const generations = await prisma.cardGeneration.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    console.log('\n=== DATABASE CHECK ===')
    console.log(`Total generations: ${generations.length}`)
    console.log('\nGenerations by user:')

    const userGroups = {}
    generations.forEach(gen => {
      const userId = gen.userId
      if (!userGroups[userId]) {
        userGroups[userId] = {
          user: gen.user,
          count: 0,
          generations: []
        }
      }
      userGroups[userId].count++
      userGroups[userId].generations.push({
        id: gen.id,
        subject: gen.subject,
        notion: gen.notion,
        cardCount: gen.cardCount,
        createdAt: gen.createdAt
      })
    })

    Object.entries(userGroups).forEach(([userId, data]) => {
      console.log(`\n${data.user.name || data.user.email} (${userId}):`)
      console.log(`  Total: ${data.count} generations`)
      data.generations.forEach(gen => {
        console.log(`  - ${gen.subject} / ${gen.notion} (${gen.cardCount} cards) - ${gen.createdAt.toLocaleString()}`)
      })
    })

  } catch (error) {
    console.error('Error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main()
