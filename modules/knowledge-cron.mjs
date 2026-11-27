export async function reviewDueKnowledge(env) {
 if (!env.KNOWLEDGE_DB) throw new Error("Knowledge unavailable");
 const result = await env.KNOWLEDGE_DB.prepare("SELECT id FROM health_knowledge WHERE approval_status = 'approved' AND source_url LIKE 'https://%' AND (review_due_at IS NULL OR review_due_at = '' OR datetime(review_due_at) <= CURRENT_TIMESTAMP) ORDER BY review_due_at LIMIT 20").all();
 return {due:(result.results || []).length};
}
