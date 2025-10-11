const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, 'data', 'kb_index.sqlite');
console.log('Opening database at:', dbPath);

const db = new Database(dbPath, { readonly: true });

// Get tables
const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table'").all();
console.log('\nTables in database:', tables);

// Check knowledge_chunks structure
const tableInfo = db.prepare("PRAGMA table_info(knowledge_chunks)").all();
console.log('\nknowledge_chunks table structure:');
tableInfo.forEach(col => {
  console.log(`  ${col.name}: ${col.type}`);
});

// Get sample data to understand values
console.log('\n--- Sample Data ---');

// Get distinct subject keys
const subjects = db.prepare("SELECT DISTINCT subject_key FROM knowledge_chunks LIMIT 10").all();
console.log('\nDistinct subject_keys:', subjects);

// Get distinct notion keys
const notions = db.prepare("SELECT DISTINCT notion_key FROM knowledge_chunks LIMIT 20").all();
console.log('\nDistinct notion_keys (first 20):', notions);

// Get a sample row
const sample = db.prepare("SELECT * FROM knowledge_chunks LIMIT 1").get();
console.log('\nSample row:', sample);

// Check for specific subjects we're looking for
const mathCheck = db.prepare("SELECT COUNT(*) as count FROM knowledge_chunks WHERE subject_key LIKE '%math%'").get();
console.log('\nRows with math in subject_key:', mathCheck.count);

const fractionCheck = db.prepare("SELECT COUNT(*) as count FROM knowledge_chunks WHERE notion_key LIKE '%fraction%'").get();
console.log('Rows with fraction in notion_key:', fractionCheck.count);

db.close();