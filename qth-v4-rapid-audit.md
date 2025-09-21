# Quebec Teacher Hub v4 — Rapid Technical Audit

## Project overview

- **Framework**: Next.js 15.5.3, React 19.1.0
- **Language**: TypeScript
- **Node SDK**: openai ^5.22.0
- **Data**: SQLite knowledge base present: `True`

- **Key UI**: `src/components/QuebecTeacherHubInterface.tsx`
- **API routes**:
  - `src/app/api/generate-card/route.ts`
  - `src/app/api/knowledge-explore/route.ts`
  - `src/app/api/notions/route.ts`

## Environment & config

- No obvious env mismatches found in template.

## Generation pipeline

- UI calls `POST /api/generate-card` → server consolidates KB context (SQLite) → calls OpenAI.
- Uses **chat.completions** API in server route.
- Streams/progress: **not implemented** in UI.

## Likely breakpoints / bugs

- ❗ `chat.completions.create` uses `max_tokens`, not `max_completion_tokens`. Current param will be ignored or rejected.
- ❗ Model is set to `'gpt-5'` via `chat.completions`. If your account lacks access or if GPT‑5 requires the **Responses API**, you will get `model_not_found` or similar.
- ❗ `better-sqlite3` native bindings can fail on some serverless hosts; local/dev is fine. Ensure deployment target supports it or swap to file-based/read-only environment.
- ❗ Progressive loading is not implemented (no SSE/stream handling). The UI waits for full JSON then updates.
- ❗ `.next/` build artifacts are included in the archive; remove from repo/package to avoid confusion.

## Minimal fix checklist

- [ ] Add `OPENAI_API_KEY` to `.env.local`. Optionally add `AI_MODEL` (e.g., `gpt-4o` or your allowed model).
- [ ] In `src/app/api/generate-card/route.ts`, if you keep **chat.completions**, rename `max_completion_tokens` → `max_tokens`.
- [ ] If you truly need **GPT‑5**, switch to `client.responses.create({ model: 'gpt-5', input: [...] , max_output_tokens: ... })` per the Node SDK examples.
- [ ] Implement streaming (SSE or fetch streaming) if you want a progressive progress bar. Otherwise the UI will stay at 0% then jump to done.
- [ ] Confirm the SQLite path: `process.cwd()/data/kb_index.sqlite` is correct for your runtime. Bundle the DB for prod or host it elsewhere.
- [ ] Do not ship `.next/` in your archive; rebuild on deployment.

## How to run locally

```bash
cd app
cp .env.example .env.local  # fill in OPENAI_API_KEY and others
pnpm install  # or npm i / yarn
pnpm dev      # or npm run dev
```

## Files referenced in this audit

- `app/package.json`
- `app/src/app/api/generate-card/route.ts`
- `app/src/app/api/notions/route.ts`
- `app/src/app/api/knowledge-explore/route.ts`
- `app/src/components/QuebecTeacherHubInterface.tsx`
- `app/src/lib/knowledge-retrieval.ts`
- `app/data/kb_index.sqlite`