#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "${BASH_SOURCE[0]}")/.."
# Keep the staging deployment output path stable and never modify tracked source.
test -f frontend/package.json
test -f frontend/pnpm-lock.yaml
test -f frontend/tsconfig.json
mkdir frontend-opennext
tar --exclude='./node_modules' --exclude='./.next' --exclude='./.open-next' --exclude='./.wrangler' --exclude='./.env*' --exclude='./*.tsbuildinfo' -C frontend -cf - . | tar -C frontend-opennext -xf -
cd frontend-opennext
export NEXT_TELEMETRY_DISABLED=1
corepack enable
corepack prepare pnpm@9.15.9 --activate
pnpm install --frozen-lockfile
pnpm exec tsc --noEmit
pnpm add -D -E @opennextjs/cloudflare@1.20.19 wrangler@4.168.0
printf '%s\n' 'import { defineCloudflareConfig } from "@opennextjs/cloudflare";' 'export default defineCloudflareConfig();' > open-next.config.ts
printf '%s\n' '{"name":"health-si-frontend-staging","main":".open-next/worker.js","compatibility_date":"2026-11-21","compatibility_flags":["nodejs_compat"],"assets":{"directory":".open-next/assets","binding":"ASSETS"}}' > wrangler.jsonc
pnpm exec opennextjs-cloudflare build
test -f .open-next/worker.js
test -d .open-next/assets
pnpm exec wrangler deploy --dry-run --config wrangler.jsonc
