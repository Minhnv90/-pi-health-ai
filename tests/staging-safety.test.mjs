import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
const worker = readFileSync(new URL("../worker.js", import.meta.url), "utf8");
const staging = readFileSync(new URL("../wrangler.staging.toml", import.meta.url), "utf8");
test("Health staging has isolated D1 and distinct Worker name", () => {
  const output = execFileSync(process.execPath, ["scripts/verify-staging-config.mjs"], { encoding: "utf8" });
  assert.match(output, /validated/);
  assert.match(staging, /health-knowledge-staging/);
  assert.doesNotMatch(staging, /portway-si-knowledge-staging|63a484b4-ab0f-4f9f-a299-78fca28f6755/);
});
test("approved-only knowledge retrieval", () => {
  assert.match(worker, /approval_status = 'approved'/);
});
test("admin upsert requires token and health reviewer for approved records", () => {
  assert.match(worker, /KNOWLEDGE_ADMIN_TOKEN/);
  assert.match(worker, /Approved health records require/);
});
test("health worker retains urgent escalation and no medication dose changes", () => {
  assert.match(worker, /115 in Vietnam/);
  assert.match(worker, /Do not give a dose/);
});
