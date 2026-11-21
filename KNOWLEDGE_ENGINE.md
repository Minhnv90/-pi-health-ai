# Health SI Knowledge Engine (D1 MVP)

This repository now includes a separate Cloudflare D1 schema and Worker endpoints for a curated Health SI knowledge base. It is a keyword-search MVP, not a vector database or a substitute for clinical review.

## Data boundary
- Use a dedicated D1 database for Health SI only.
- Never store Health SI journal entries, symptoms, user questions, or identifiable health details in the public knowledge table.
- Only approved educational records are retrieved by the AI.
- Only a trusted administrator may create/update records through the ingestion endpoint.

## Create and migrate the database
From this repository directory:

```bash
npx wrangler d1 create health-si-knowledge
```
Copy the returned database_id into the D1 binding in `wrangler.toml` (uncomment the example binding and replace the placeholder). Then apply the schema:

```bash
npx wrangler d1 execute health-si-knowledge --remote --file=./migrations/0001_knowledge.sql
```

Add the D1 binding to `wrangler.toml`:

```toml
[[d1_databases]]
binding = "KNOWLEDGE_DB"
database_name = "health-si-knowledge"
database_id = "YOUR_D1_DATABASE_ID"
```

## Configure admin ingestion
Generate a long random secret and set it without committing it:

```bash
npx wrangler secret put KNOWLEDGE_ADMIN_TOKEN
```

Deploy the Worker after D1 is bound and the secret is set:

```bash
npx wrangler deploy
```

## API

### Admin upsert
`POST /api/admin/knowledge/upsert`
Header: `Authorization: Bearer YOUR_ADMIN_TOKEN`

Example body:

```json
{
  "record": {
    "id": "who-health-topic-001",
    "title": "Example health education topic",
    "topic": "prevention",
    "summary": "Short plain-language summary.",
    "body": "Reviewed educational content with appropriate scope and caveats.",
    "source_title": "Official guidance title",
    "source_organization": "World Health Organization",
    "source_url": "https://www.who.int/",
    "updated_at": "2026-01-01",
    "jurisdiction": "global",
    "evidence_level": "official_guidance",
    "approval_status": "needs_review",
    "reviewer": "",
    "review_due_at": "2027-01-01",
    "tags": "prevention,health-literacy"
  }
}
```
Use `approved` only after a qualified reviewer has checked source currency, target population, safety notes and wording. The example above is a schema example, not medical guidance.

### Search approved records
`POST /api/knowledge/search`
Body: `{"query":"sleep health"}`
Only `approval_status=approved` records are returned.

The AI assist endpoint automatically retrieves up to five approved matching records and returns their source metadata in `knowledge_sources`. If no records match, the assistant must not claim it used the knowledge base.

## Current limitations
- D1 keyword matching is a starter retrieval method; it is not semantic/vector search.
- No public admin dashboard, bulk importer, reviewer workflow UI, scheduled source freshness check, or vector embeddings exist yet.
- Source URLs and claims still require human verification. A record being stored does not make it medically authoritative.
- Worker code does not persist user prompts, but the configured upstream AI provider and Cloudflare infrastructure may have their own retention policies.
- Add rate limiting, admin audit logs, stronger role separation and a formal clinical review process before public production.
