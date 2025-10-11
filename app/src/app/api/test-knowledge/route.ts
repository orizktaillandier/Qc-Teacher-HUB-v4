import { NextResponse } from 'next/server';
import Database from 'better-sqlite3';
import path from 'path';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const subject = searchParams.get('subject') || 'mathematique';
  const notion = searchParams.get('notion') || '';
  const cycle = searchParams.get('cycle') || 'cycle2-primaire';

  try {
    const dbPath = path.join(process.cwd(), '..', 'data', 'kb_index.sqlite');
    console.log('Opening database at:', dbPath);

    const db = new Database(dbPath, { readonly: true });

    // Test different queries to understand the data
    console.log('\n=== TESTING KNOWLEDGE RETRIEVAL ===');

    // 1. Check total rows
    const totalRows = db.prepare("SELECT COUNT(*) as count FROM knowledge_chunks").get() as any;
    console.log('Total rows in database:', totalRows.count);

    // 2. Get unique subject keys
    const subjects = db.prepare("SELECT DISTINCT subject_key FROM knowledge_chunks").all();
    console.log('\nUnique subjects:', subjects.map((s: any) => s.subject_key));

    // 3. Get unique notion keys
    const notions = db.prepare("SELECT DISTINCT notion_key FROM knowledge_chunks LIMIT 30").all();
    console.log('\nUnique notions (first 30):', notions.map((n: any) => n.notion_key));

    // 4. Get unique cycle keys
    const cycles = db.prepare("SELECT DISTINCT cycle_keys FROM knowledge_chunks LIMIT 10").all();
    console.log('\nUnique cycle_keys (first 10):', cycles.map((c: any) => c.cycle_keys));

    // 5. Test exact query that we use
    const testQuery = db.prepare(`
      SELECT * FROM knowledge_chunks
      WHERE subject_key = ?
      AND notion_key = ?
      AND cycle_keys LIKE ?
      LIMIT 5
    `).all(subject, notion || '%', `%${cycle}%`);

    console.log(`\nTest query (subject='${subject}', notion='${notion || 'ANY'}', cycle='${cycle}'):`);
    console.log('Results found:', testQuery.length);

    if (testQuery.length > 0) {
      const firstResult = testQuery[0] as any;
      console.log('Sample result:', {
        subject_key: firstResult.subject_key,
        notion_key: firstResult.notion_key,
        cycle_keys: firstResult.cycle_keys,
        chunk_text: firstResult.chunk_text?.substring(0, 100) + '...'
      });
    }

    // 6. Try broader query without notion filter
    const broaderQuery = db.prepare(`
      SELECT * FROM knowledge_chunks
      WHERE subject_key = ?
      AND cycle_keys LIKE ?
      LIMIT 5
    `).all(subject, `%${cycle}%`);

    console.log(`\nBroader query (subject='${subject}', cycle='${cycle}', no notion filter):`);
    console.log('Results found:', broaderQuery.length);

    // 7. Check what cycles are stored for math
    const mathCycles = db.prepare(`
      SELECT DISTINCT cycle_keys FROM knowledge_chunks
      WHERE subject_key = 'mathematique'
      LIMIT 10
    `).all();
    console.log('\nCycles available for mathematique:', mathCycles);

    db.close();

    return NextResponse.json({
      totalRows: totalRows.count,
      subjects: subjects.map((s: any) => s.subject_key),
      notions: notions.map((n: any) => n.notion_key),
      cycles: cycles.map((c: any) => c.cycle_keys),
      testQuery: {
        params: { subject, notion: notion || 'ANY', cycle },
        resultsCount: testQuery.length,
        sample: testQuery[0] as any || null
      },
      broaderQuery: {
        resultsCount: broaderQuery.length,
        sample: broaderQuery[0] || null
      },
      mathCycles
    });
  } catch (error) {
    console.error('Knowledge test error:', error);
    return NextResponse.json({
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}