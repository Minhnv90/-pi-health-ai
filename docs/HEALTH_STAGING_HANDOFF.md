# Health SI — isolated staging handoff

Repo: Minhnv90/-pi-health-ai. Staging branch: feature/health-staging-safety-20261123.

Staging Worker: `pi-health-ai-staging`. Staging D1: `health-knowledge-staging` with a deliberately invalid placeholder UUID. The previously proposed UUID was not verified as a real staging database and must not be used. Keep the placeholder in Git. Never commit a real staging D1 UUID; use an ignored local configuration after separate approval.

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

## Step 1 staging (owner only, after approval)
Copy `wrangler.staging.toml` to `wrangler.staging.local.toml`, remove the entire D1 block, retain rate limit namespace 2091, and use the integrated PR #1 + PR #2 test branch. Run `npx wrangler deploy -c wrangler.staging.local.toml` only after approval. Serve a disposable frontend copy on localhost:8788 with its API_BASE pointing only to verified staging. Do not commit that frontend change. Use synthetic data. D1 setup above is deferred to the knowledge step. Offline tests do not count toward the 17 staging checks.
