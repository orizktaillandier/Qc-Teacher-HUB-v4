import { NextResponse } from 'next/server';
import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'kb_index.sqlite');

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const subjectKey = searchParams.get('subject');
  const cycleKey = searchParams.get('cycle');

  if (!subjectKey || !cycleKey) {
    return NextResponse.json({
      success: false,
      error: 'Missing subject or cycle parameter'
    }, { status: 400 });
  }

  try {
    const db = new Database(dbPath, { readonly: true });

    // Get distinct notions for the specific subject and cycle
    const notions = db.prepare(`
      SELECT DISTINCT notion_key
      FROM knowledge_chunks
      WHERE subject_key = ?
      AND cycle_keys LIKE ?
      ORDER BY notion_key
    `).all(subjectKey, `%${cycleKey}%`);

    db.close();

    return NextResponse.json({
      success: true,
      data: {
        subject: subjectKey,
        cycle: cycleKey,
        notions: notions.map(n => n.notion_key)
      }
    });

  } catch (error) {
    console.error('Error querying notions:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}