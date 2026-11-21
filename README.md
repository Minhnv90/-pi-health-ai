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

### Deploy
1. Install Node.js LTS and run `npm install -g wrangler`.
2. Run `npx wrangler login` from this repository folder.
3. Replace the placeholder origin in `wrangler.toml` with the exact deployed Health SI Pages origin.
4. Set secrets (use your chosen OpenAI-compatible chat-completions endpoint and model):
   - `npx wrangler secret put AI_CHAT_COMPLETIONS_URL`
   - `npx wrangler secret put AI_API_KEY`
   - `npx wrangler secret put AI_MODEL`
5. Deploy with `npx wrangler deploy`.

The frontend prototype is not yet wired to this API. After deployment, configure the frontend to call your Worker URL. Do not put provider keys in frontend code or GitHub.


## Pi identity verification

The Pi login button sends the Pi SDK access token to this app's Worker at `POST /api/pi/verify`. The Worker validates it with the official Pi Platform API `GET https://api.minepi.com/v2/me` and returns only the verified Pioneer UID and username. The access token is not saved in browser localStorage. Enter the deployed Worker URL in this app's API URL field before signing in. Pi documentation describes the verified UID as an identifier for a Pioneer within an app, so do not assume the UID is identical across two separately registered Pi apps. A true shared account needs a central account-linking service: the user must authenticate in both apps, both tokens must be verified server-side, and the linkage must be stored only after explicit user consent. A persistent shared member database/session, reward ledger, and Pi payment/payout flows still need to be built and configured.

## Knowledge engine

See [`KNOWLEDGE_ENGINE.md`](./KNOWLEDGE_ENGINE.md) for the separate Cloudflare D1 schema, migration, admin ingestion API, approved-record search, and deployment instructions. The D1 binding and `KNOWLEDGE_ADMIN_TOKEN` must be configured before knowledge retrieval or ingestion will work.
