CREATE INDEX IF NOT EXISTS idx_health_knowledge_approved_modified ON health_knowledge(approval_status, modified_at DESC);
