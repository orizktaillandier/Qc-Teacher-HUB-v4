import { NextResponse } from 'next/server';
import Database from 'better-sqlite3';
import path from 'path';

export async function GET() {
  try {
    const dbPath = path.join(process.cwd(), '..', 'data', 'kb_index.sqlite');
    console.log('Opening database at:', dbPath);

    const db = new Database(dbPath, { readonly: true });

    // Get distinct subject keys
    const subjects = db.prepare("SELECT DISTINCT subject_key FROM knowledge_chunks LIMIT 20").all();

    // Get distinct notion keys
    const notions = db.prepare("SELECT DISTINCT notion_key FROM knowledge_chunks LIMIT 30").all();

    // Get sample rows
    const samples = db.prepare("SELECT * FROM knowledge_chunks LIMIT 3").all();

    // Check for math-related content
    const mathCheck = db.prepare("SELECT COUNT(*) as count FROM knowledge_chunks WHERE subject_key LIKE '%math%'").get() as any;
    const fractionCheck = db.prepare("SELECT COUNT(*) as count FROM knowledge_chunks WHERE notion_key LIKE '%fraction%'").get() as any;

    db.close();

    return NextResponse.json({
      subjects,
      notions,
      samples: (samples as any[]).map((s: any) => ({
        ...s,
        chunk_text: s.chunk_text?.substring(0, 100) + '...' // Truncate for readability
      })),
      counts: {
        mathRows: mathCheck.count,
        fractionRows: fractionCheck.count
      }
    });
  } catch (error) {
    console.error('Database debug error:', error);
    return NextResponse.json({
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}