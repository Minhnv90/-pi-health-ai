# Health SI — Knowledge Engine & Community Growth

## Product identity
Health SI is a health education and personal wellbeing information product. It is not a diagnostic tool, medical device, emergency service, or substitute for a licensed clinician.

## Strict data boundary
- Health SI owns its own knowledge base, vector index, content review queue, user health journal, AI configuration, and analytics namespace.
- Never query or import PortWay SI research records, prompts, embeddings, member notes, or private content.
- A shared Pi membership service may provide an opaque account-link reference only. Do not send health records, questions, or journal entries to the other app.
- Health records require explicit, purpose-specific consent, access controls, retention rules, and deletion/export workflows.

## Knowledge domains
1. Prevention and health literacy
2. Nutrition and food safety
3. Sleep and circadian health
4. Physical activity and mobility
5. Mental wellbeing and stress management
6. Common conditions: general education only
7. Medication literacy: general information, no prescribing or dosage changes
8. Screening and preventive care
9. Healthy ageing and family wellbeing
10. How to prepare for a clinician visit

## Knowledge record format
Each approved record should contain:
- id, title, plain-language_summary, body, topic, tags
- source_title, source_url, issuing_organization, author_or_review_team
- published_at, reviewed_at, next_review_at, version
- evidence_level, jurisdiction, intended_audience
- contraindication_or_safety_notes, reviewer_status
- content_license_or_reuse_basis

Do not publish a medical claim without a traceable source and review status. Prefer public health agencies, clinical guidelines, systematic reviews, and peer-reviewed evidence. Show publication and review dates. Flag outdated or conflicting guidance.

## RAG response policy
- Retrieve only Health SI records approved for user-facing use.
- Show source title, organization, date, and link for material medical claims.
- Distinguish established guidance, emerging evidence, and uncertainty.
- Do not diagnose, prescribe, change medication, or infer disease from wearable values.
- For possible emergencies, advise immediate local emergency care.
- If no reliable evidence is retrieved, say so rather than filling gaps.
- Never use PortWay SI documents as fallback context.

## Daily return loop
- Daily Health Brief: one short, source-linked lesson.
- One-minute explainers: answer one common question in plain language.
- Weekly challenge: sleep routine, walking habit, hydration literacy, or meal planning; avoid medical promises.
- Saveable checklists: questions for a clinician, healthy habit planner, medication list template.
- Knowledge quiz: educational questions with explanations, not diagnostic scoring.
- Community contribution: members submit questions or source suggestions; expert/editor review is required before publication.

## Sharing and responsible virality
Every share card contains a clear headline, one useful takeaway, a source/date footer, and the Health SI identity. Add a visible "general education, not personal medical advice" note when appropriate. Do not use fear, miracle-cure language, guaranteed outcomes, fabricated statistics, or shame-based messaging.

Suggested share actions: share a lesson, invite a friend to a free educational challenge, submit a question, and recommend a source. Never reward medical claims, referrals, likes, or impressions without quality controls. Any reward must be funded, budgeted, abuse-resistant, and based on approved contributions or verified paid activity.

## Content cadence
- Daily: 1 brief, 1 short explainer, 1 quiz.
- Weekly: 1 expert-reviewed deep dive, 1 checklist, 1 community Q&A.
- Monthly: review stale records, source links, corrections, and topic demand.

## Quality workflow
Draft → source check → medical/editorial review → safety review → publish → monitor corrections → scheduled re-review.
Maintain an audit trail for edits and corrections. Label user submissions as unverified until reviewed.
