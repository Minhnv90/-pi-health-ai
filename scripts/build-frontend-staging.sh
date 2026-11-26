#!/usr/bin/env bash
set -euo pipefail
echo 'fb55c72d5f4830a6410b13bea35d93715395072d9763226ee09312391e564d37  frontend-source.zip' | sha256sum -c -
mkdir -p frontend-opennext
unzip -oq frontend-source.zip -d frontend-opennext
cd frontend-opennext
corepack enable
corepack prepare pnpm@9.15.9 --activate
pnpm install --frozen-lockfile
pnpm exec tsc --noEmit
pnpm add -D -E @opennextjs/cloudflare@1.20.19 wrangler@4.168.0
printf '%s\n' 'import { defineCloudflareConfig } from "@opennextjs/cloudflare";' 'export default defineCloudflareConfig();' > open-next.config.ts
printf '%s\n' '{"name":"health-si-frontend-staging","main":".open-next/worker.js","compatibility_date":"2026-11-21","compatibility_flags":["nodejs_compat"],"assets":{"directory":".open-next/assets","binding":"ASSETS"}}' > wrangler.jsonc
pnpm exec opennextjs-cloudflare build
test -f .open-next/worker.js
pnpm exec wrangler deploy --dry-run --config wrangler.jsonc
