// Knowledge Retrieval and Compression System
// Efficiently retrieves and compresses relevant knowledge chunks based on filters

import Database from 'better-sqlite3';
import path from 'path';
// Temporarily disabled tiktoken to avoid WASM issues in development
// import { encoding_for_model } from 'tiktoken';

// Simple token estimation (roughly 4 chars per token)
function estimateTokens(text: string): number {
  return Math.ceil(text.length / 4);
}

interface KnowledgeFilter {
  subjectKey: string;
  notionKey: string;
  cycleKeys: string[];
  maxTokens?: number;
  minRelevanceScore?: number;
}

interface KnowledgeChunk {
  id: string;
  file_path: string;
  subject_key: string;
  notion_key: string;
  cycle_keys: string[];
  micro_targets: string[];
  evaluation_focus: string[];
  chunk_text: string;
  chunk_tokens: number;
  chunk_index: number;
  total_chunks: number;
  relevance_score?: number;
}

interface RetrievedKnowledge {
  chunks: KnowledgeChunk[];
  total_tokens: number;
  compression_ratio: number;
  coverage_stats: {
    files_represented: number;
    micro_targets_covered: string[];
    evaluation_focus_covered: string[];
  };
}

class KnowledgeRetriever {
  private db: Database.Database;

  constructor(dbPath?: string) {
    const defaultPath = path.join(process.cwd(), 'data', 'kb_index.sqlite');
    this.db = new Database(dbPath || defaultPath, { readonly: true });
  }

  /**
   * Retrieve knowledge chunks based on filters
   */
  retrieveKnowledge(filter: KnowledgeFilter): RetrievedKnowledge {
    const chunks = this.queryRelevantChunks(filter);
    const prioritizedChunks = this.prioritizeChunks(chunks, filter);
    const compressedChunks = this.compressToTokenLimit(prioritizedChunks, filter.maxTokens || 4000);

    return {
      chunks: compressedChunks,
      total_tokens: compressedChunks.reduce((sum, chunk) => sum + chunk.chunk_tokens, 0),
      compression_ratio: chunks.length > 0 ? compressedChunks.length / chunks.length : 0,
      coverage_stats: this.calculateCoverageStats(compressedChunks)
    };
  }

  /**
   * Query database for chunks matching filters
   */
  private queryRelevantChunks(filter: KnowledgeFilter): KnowledgeChunk[] {
    let query = `
      SELECT * FROM knowledge_chunks
      WHERE subject_key = ? AND notion_key = ?
    `;
    const params: any[] = [filter.subjectKey, filter.notionKey];

    // Add cycle filter if specified
    if (filter.cycleKeys && filter.cycleKeys.length > 0) {
      const cycleConditions = filter.cycleKeys.map(() => 'cycle_keys LIKE ?').join(' OR ');
      query += ` AND (${cycleConditions})`;
      filter.cycleKeys.forEach(cycleKey => {
        params.push(`%${cycleKey}%`);
      });
    }

    query += ' ORDER BY file_path, chunk_index';

    const stmt = this.db.prepare(query);
    const rawChunks = stmt.all(...params) as any[];

    return rawChunks.map(chunk => ({
      ...chunk,
      cycle_keys: JSON.parse(chunk.cycle_keys),
      micro_targets: JSON.parse(chunk.micro_targets),
      evaluation_focus: JSON.parse(chunk.evaluation_focus)
    }));
  }

  /**
   * Prioritize chunks based on relevance scoring
   */
  private prioritizeChunks(chunks: KnowledgeChunk[], filter: KnowledgeFilter): KnowledgeChunk[] {
    return chunks.map(chunk => ({
      ...chunk,
      relevance_score: this.calculateRelevanceScore(chunk, filter)
    })).sort((a, b) => (b.relevance_score || 0) - (a.relevance_score || 0));
  }

  /**
   * Calculate relevance score for a chunk
   */
  private calculateRelevanceScore(chunk: KnowledgeChunk, filter: KnowledgeFilter): number {
    let score = 0;

    // Base score for exact subject/notion match
    score += 10;

    // Bonus for cycle overlap
    const cycleOverlap = chunk.cycle_keys.filter(key => filter.cycleKeys.includes(key)).length;
    score += cycleOverlap * 5;

    // Bonus for comprehensive chunks (covers multiple targets)
    score += Math.min(chunk.micro_targets.length * 2, 10);
    score += Math.min(chunk.evaluation_focus.length * 2, 8);

    // Penalty for very large chunks (prefer more focused content)
    if (chunk.chunk_tokens > 1000) {
      score -= 3;
    }

    // Bonus for complete files (chunk 0 often has overview content)
    if (chunk.chunk_index === 0) {
      score += 2;
    }

    return score;
  }

  /**
   * Compress chunks to fit within token limit
   */
  private compressToTokenLimit(chunks: KnowledgeChunk[], maxTokens: number): KnowledgeChunk[] {
    const selected: KnowledgeChunk[] = [];
    let totalTokens = 0;

    // Always include highest priority chunks first
    for (const chunk of chunks) {
      if (totalTokens + chunk.chunk_tokens <= maxTokens) {
        selected.push(chunk);
        totalTokens += chunk.chunk_tokens;
      } else {
        // Try to include partial content if possible
        const remainingTokens = maxTokens - totalTokens;
        if (remainingTokens > 100) {
          const truncatedChunk = this.truncateChunk(chunk, remainingTokens);
          if (truncatedChunk) {
            selected.push(truncatedChunk);
            break;
          }
        }
        break;
      }
    }

    return selected;
  }

  /**
   * Truncate chunk to fit remaining tokens
   */
  private truncateChunk(chunk: KnowledgeChunk, maxTokens: number): KnowledgeChunk | null {
    const lines = chunk.chunk_text.split('\n');
    let truncatedText = '';
    let tokenCount = 0;

    for (const line of lines) {
      const lineTokens = estimateTokens(line);
      if (tokenCount + lineTokens > maxTokens - 50) { // Leave buffer for truncation marker
        break;
      }
      truncatedText += (truncatedText ? '\n' : '') + line;
      tokenCount += lineTokens;
    }

    if (truncatedText.length < chunk.chunk_text.length * 0.3) {
      return null; // Don't include if less than 30% of original
    }

    return {
      ...chunk,
      chunk_text: truncatedText + '\n\n[...truncated for token limit]',
      chunk_tokens: estimateTokens(truncatedText) + 10
    };
  }

  /**
   * Calculate coverage statistics
   */
  private calculateCoverageStats(chunks: KnowledgeChunk[]) {
    const files = new Set<string>();
    const microTargets = new Set<string>();
    const evaluationFocus = new Set<string>();

    chunks.forEach(chunk => {
      files.add(chunk.file_path);
      chunk.micro_targets.forEach(target => microTargets.add(target));
      chunk.evaluation_focus.forEach(focus => evaluationFocus.add(focus));
    });

    return {
      files_represented: files.size,
      micro_targets_covered: Array.from(microTargets),
      evaluation_focus_covered: Array.from(evaluationFocus)
    };
  }

  /**
   * Build compressed knowledge context for LLM
   */
  buildKnowledgeContext(retrieved: RetrievedKnowledge, contextTitle?: string): string {
    const title = contextTitle || "CONNAISSANCES CURRICULAIRES PERTINENTES";

    let context = `# ${title}\n\n`;

    // Add coverage summary
    context += `**Couverture**: ${retrieved.chunks.length} sections de connaissances `;
    context += `(${retrieved.total_tokens} tokens, ratio de compression: ${(retrieved.compression_ratio * 100).toFixed(1)}%)\n\n`;

    // Add micro-targets covered
    if (retrieved.coverage_stats.micro_targets_covered.length > 0) {
      context += `**Micro-objectifs couverts**:\n`;
      retrieved.coverage_stats.micro_targets_covered.forEach(target => {
        context += `- ${target}\n`;
      });
      context += '\n';
    }

    // Add evaluation focus
    if (retrieved.coverage_stats.evaluation_focus_covered.length > 0) {
      context += `**Éléments d'évaluation couverts**:\n`;
      retrieved.coverage_stats.evaluation_focus_covered.forEach(focus => {
        context += `- ${focus}\n`;
      });
      context += '\n';
    }

    // Add knowledge chunks
    retrieved.chunks.forEach((chunk, index) => {
      context += `## Section ${index + 1}: ${path.basename(chunk.file_path).replace('.md', '')}\n`;
      context += `*Fichier: ${chunk.file_path} (partie ${chunk.chunk_index + 1}/${chunk.total_chunks})*\n\n`;
      context += chunk.chunk_text + '\n\n';
    });

    return context;
  }

  /**
   * Get knowledge statistics
   */
  getKnowledgeStats() {
    const stats = this.db.prepare(`
      SELECT
        COUNT(*) as total_chunks,
        COUNT(DISTINCT file_path) as total_files,
        COUNT(DISTINCT subject_key) as total_subjects,
        COUNT(DISTINCT notion_key) as total_notions,
        SUM(chunk_tokens) as total_tokens,
        AVG(chunk_tokens) as avg_tokens_per_chunk
      FROM knowledge_chunks
    `).get();

    return stats;
  }

  close() {
    this.db.close();
  }
}

export { KnowledgeRetriever };
export type { KnowledgeFilter, RetrievedKnowledge, KnowledgeChunk };