# Health SI — isolated staging handoff

Repo: Minhnv90/-pi-health-ai. Staging branch: feature/health-staging-safety-20261123.

Staging Worker: `pi-health-ai-staging`. Staging D1: `health-knowledge-staging` with UUID `2b945c69-09da-4e6c-a6ad-d4814b485d3f` (owner-provided in previous project work; verify identity in Cloudflare before remote operations).

All tests are offline and do not prove that Cloudflare Workers AI or remote D1 is working. No remote migrations or deploy have been executed.

## Health data boundaries
- Keep Health SI entirely separate from PortWay SI: no shared D1, token, API route, or cross-project data transfer.
- Knowledge retrieval uses only `approval_status = 'approved'` records.
- Medical education only; emergencies and medication questions must escalate appropriately.
- Do not store patient records or sensitive health details in the public repository.
- Admin token belongs in Cloudflare secrets, never GitHub code.

## Owner-only final steps
1. Verify staging D1 name and UUID in Cloudflare dashboard.
2. Check `health_knowledge` table in the staging D1 using a read-only query.
3. If table is missing, separately approve staging-only migration.
4. Configure staging secrets privately and approve staging deployment separately.
5. Test Workers AI, CORS, Pi verification and clinical safety on staging before considering production.
