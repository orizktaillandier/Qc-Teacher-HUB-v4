// Comprehensive test script for Quebec Teacher Hub v4
const testCases = [
  // CYCLE 1 TESTS
  { cycle: 'cycle1-primaire', grade: '1', subject: 'mathematiques', notion: 'addition-soustraction', name: 'C1-Math-Addition' },
  { cycle: 'cycle1-primaire', grade: '2', subject: 'mathematiques', notion: 'nombres-naturels', name: 'C1-Math-Numbers' },
  { cycle: 'cycle1-primaire', grade: '1', subject: 'francais-langue-enseignement', notion: 'strategies-lecture', name: 'C1-French-Reading' },
  { cycle: 'cycle1-primaire', grade: '2', subject: 'francais-langue-enseignement', notion: 'classes-mots', name: 'C1-French-Grammar' },
  { cycle: 'cycle1-primaire', grade: '1', subject: 'science-et-technologie', notion: 'etats-matiere', name: 'C1-Science-Matter' },

  // CYCLE 2 TESTS
  { cycle: 'cycle2-primaire', grade: '3', subject: 'mathematiques', notion: 'fractions', name: 'C2-Math-Fractions' },
  { cycle: 'cycle2-primaire', grade: '4', subject: 'mathematiques', notion: 'figures-planes', name: 'C2-Math-Geometry' },
  { cycle: 'cycle2-primaire', grade: '3', subject: 'francais-langue-enseignement', notion: 'accord-gn', name: 'C2-French-Accords' },
  { cycle: 'cycle2-primaire', grade: '4', subject: 'science-et-technologie', notion: 'cycle-vie', name: 'C2-Science-LifeCycle' },

  // CYCLE 3 TESTS
  { cycle: 'cycle3-primaire', grade: '5', subject: 'mathematiques', notion: 'angles', name: 'C3-Math-Angles' },
  { cycle: 'cycle3-primaire', grade: '6', subject: 'mathematiques', notion: 'pourcentages', name: 'C3-Math-Percentages' },
  { cycle: 'cycle3-primaire', grade: '5', subject: 'francais-langue-enseignement', notion: 'participe-passe-avoir', name: 'C3-French-Participe' },
  { cycle: 'cycle3-primaire', grade: '6', subject: 'science-et-technologie', notion: 'systeme-solaire', name: 'C3-Science-Solar' }
];

async function testAPI(testCase) {
  console.log(`\n========== Testing: ${testCase.name} ==========`);
  console.log(`Params: Cycle=${testCase.cycle}, Grade=${testCase.grade}, Subject=${testCase.subject}, Notion=${testCase.notion}`);

  try {
    const response = await fetch('http://localhost:3000/api/generate-card-v2', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testCase)
    });

    const data = await response.json();

    if (data.success) {
      console.log('✅ SUCCESS');
      console.log(`- Generated ${data.data.cards.length} cards`);

      // Check for visuals
      const cardsWithVisuals = data.data.cards.filter(card => card.question.includes('[visual:'));
      console.log(`- Cards with visuals: ${cardsWithVisuals.length}/8`);

      // Check question quality
      const sampleQuestion = data.data.cards[0].question;
      console.log(`- Sample question: "${sampleQuestion.substring(0, 80)}..."`);

      // Check for proper French grammar
      const hasProperGrammar = !sampleQuestion.includes('Combien de') || sampleQuestion.includes('Combien y a-t-il');
      console.log(`- Grammar check: ${hasProperGrammar ? '✓' : '✗'}`);

      // Check for angle marking
      if (testCase.notion === 'angles' && sampleQuestion.includes('angle')) {
        const usesQuestionMark = sampleQuestion.includes('?') && !sampleQuestion.includes(' x ');
        console.log(`- Angle marking: ${usesQuestionMark ? '✓ Uses ?' : '✗ Uses x'}`);
      }

    } else {
      console.log('❌ FAILED:', data.error);
    }

  } catch (error) {
    console.log('❌ ERROR:', error.message);
  }
}

async function runAllTests() {
  console.log('🔍 Starting Comprehensive Test Suite');
  console.log('=====================================\n');

  for (const testCase of testCases) {
    await testAPI(testCase);
    // Small delay between tests
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  console.log('\n=====================================');
  console.log('✅ Test Suite Complete');
}

// Run tests
runAllTests();