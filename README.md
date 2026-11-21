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
