import { NextResponse } from 'next/server';
import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'kb_index.sqlite');

export async function GET() {
  try {
    const db = new Database(dbPath, { readonly: true });

    // First, get all tables
    const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table'").all();

    // Get schema for all tables
    const schemas = tables.map(table => ({
      tableName: table.name,
      schema: db.prepare(`SELECT sql FROM sqlite_master WHERE type='table' AND name='${table.name}'`).get()
    }));

    // If knowledge_chunks table exists, get detailed info
    let chunkInfo = null;
    const chunksTable = tables.find(t => t.name === 'knowledge_chunks');

    if (chunksTable) {
      const sampleChunk = db.prepare("SELECT * FROM knowledge_chunks LIMIT 1").get();
      const subjects = db.prepare("SELECT DISTINCT subject_key FROM knowledge_chunks ORDER BY subject_key").all();
      const notions = db.prepare("SELECT DISTINCT notion_key FROM knowledge_chunks ORDER BY notion_key").all();
      const totalChunks = db.prepare("SELECT COUNT(*) as count FROM knowledge_chunks").get();
      const cycleExample = db.prepare("SELECT cycle_keys FROM knowledge_chunks WHERE cycle_keys IS NOT NULL LIMIT 1").get();

      chunkInfo = {
        sampleChunk: sampleChunk,
        statistics: {
          totalChunks: totalChunks?.count || 0,
          distinctSubjects: subjects.length,
          distinctNotions: notions.length
        },
        availableSubjects: subjects.map(s => s.subject_key),
        availableNotions: notions.map(n => n.notion_key).slice(0, 20),
        cycleExample: cycleExample?.cycle_keys ? JSON.parse(cycleExample.cycle_keys) : null
      };
    }

    db.close();

    return NextResponse.json({
      success: true,
      data: {
        tables: tables.map(t => t.name),
        schemas: schemas,
        chunkInfo: chunkInfo,
        dbPath: dbPath
      }
    });

  } catch (error) {
    console.error('Knowledge base exploration error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      dbPath: dbPath
    }, { status: 500 });
  }
}