CREATE TABLE IF NOT EXISTS health_knowledge (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  topic TEXT NOT NULL DEFAULT '',
  summary TEXT NOT NULL DEFAULT '',
  body TEXT NOT NULL,
  source_title TEXT NOT NULL DEFAULT '',
  source_organization TEXT NOT NULL DEFAULT '',
  source_url TEXT NOT NULL DEFAULT '',
  published_at TEXT NOT NULL DEFAULT '',
  updated_at TEXT NOT NULL DEFAULT '',
  jurisdiction TEXT NOT NULL DEFAULT 'global',
  evidence_level TEXT NOT NULL DEFAULT 'general_education',
  approval_status TEXT NOT NULL DEFAULT 'draft',
  reviewer TEXT NOT NULL DEFAULT '',
  review_due_at TEXT NOT NULL DEFAULT '',
  tags TEXT NOT NULL DEFAULT '',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  modified_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_health_knowledge_status ON health_knowledge(approval_status);
CREATE INDEX IF NOT EXISTS idx_health_knowledge_topic ON health_knowledge(topic);