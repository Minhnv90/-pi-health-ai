# Health SI

Health SI is a Vietnamese-first, static prototype for personal health journaling and preparing a summary to discuss with a licensed clinician.

## Current features
- Pi Browser SDK initialization in sandbox mode and Pi username authentication.
- User-entered health journal stored locally in the current browser only.
- Copyable visit-preparation summary.
- No fabricated wearable readings, automated diagnosis, AI medical advice, or payment flow.

## Run locally
Open `index.html` in a browser, or serve this folder with any static HTTP server.

## Deploy with GitHub Pages
1. Open **Settings → Pages** in this repository.
2. Under **Build and deployment**, select **Deploy from a branch**.
3. Select branch `main` and folder `/ (root)`, then Save.
4. Wait for the Pages URL shown on that screen.

## Pi Browser
- The page loads the Pi SDK from `https://sdk.minepi.com/pi-sdk.js`.
- It currently initializes with `sandbox: true` for safe testing.
- Before production, verify the app in the Pi Developer Portal, configure the approved domain, and change sandbox mode only after testing.
- Do not implement Pi payments in frontend-only code. Payment approval/completion must be validated by a trusted backend using the Pi Platform API.

## Privacy and safety
- Health entries stay in browser localStorage in this prototype. Clearing browser data removes them.
- Do not enter medical record numbers, identity documents, or other sensitive information.
- This app is not a medical device and does not diagnose, treat, or replace professional care.


## AI API backend (Cloudflare Workers)

The isolated API worker is in `worker.js`; configuration is in `wrangler.toml`.
It exposes `POST /api/health-assist` and requires an explicit `consent: true` field.
It does not persist request bodies. Health questions are forwarded to the configured AI provider, so obtain informed consent before sending any personal health information.

### Current Cloudflare Workers AI configuration (staging only)

The Worker calls `env.AI.run(env.AI_MODEL, ...)` via native Cloudflare Workers AI (`[ai] binding = "AI"`). The `AI_MODEL` variable is configured in `wrangler.toml`. The old `AI_CHAT_COMPLETIONS_URL` and `AI_API_KEY` settings are not used. Never commit API tokens or personal health data.

### Safe staging preparation

1. Keep `main`, production Worker and existing data unchanged. This branch is not deployed.
2. Cron `0 */6 * * *` means every six hours (UTC). `scheduled()` is an intentional no-op: it logs only, with no AI, web requests or database writes.
3. Create a new isolated D1 staging database `health-si-staging` in Cloudflare. After creation, replace the placeholder database ID in the commented `[[d1_databases]]` template and uncomment it. Use binding `KNOWLEDGE_DB` (matching `env.KNOWLEDGE_DB`). Never use production database IDs.
4. Review migration SQL and apply only to staging with explicit approval. Do not store actual health records in testing.
5. Test mock AI, explicit consent, emergency symptoms, medication requests, malformed JSON, denied origins, admin authentication and privacy using synthetic examples. Record results before release.
6. A future staging deployment requires a distinct Worker name, isolated bindings and separate approval. Never use a default `wrangler deploy` to replace an existing Worker.

This preparation does not verify model availability, real AI responses, database connectivity or Pi Mainnet.

## Pi identity verification

The Pi login button sends the Pi SDK access token to this app's Worker at `POST /api/pi/verify`. The Worker validates it with the official Pi Platform API `GET https://api.minepi.com/v2/me` and returns only the verified Pioneer UID and username. The access token is not saved in browser localStorage. Enter the deployed Worker URL in this app's API URL field before signing in. Pi documentation describes the verified UID as an identifier for a Pioneer within an app, so do not assume the UID is identical across two separately registered Pi apps. A true shared account needs a central account-linking service: the user must authenticate in both apps, both tokens must be verified server-side, and the linkage must be stored only after explicit user consent. A persistent shared member database/session, reward ledger, and Pi payment/payout flows still need to be built and configured.

## Knowledge engine

See [`KNOWLEDGE_ENGINE.md`](./KNOWLEDGE_ENGINE.md) for the separate Cloudflare D1 schema, migration, admin ingestion API, approved-record search, and deployment instructions. The D1 binding and `KNOWLEDGE_ADMIN_TOKEN` must be configured before knowledge retrieval or ingestion will work.
