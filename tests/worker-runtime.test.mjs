import test from "node:test";
import assert from "node:assert/strict";
import worker from "../worker.js";

const origin = "http://localhost:8788";
const base = "https://health-staging.example";
const env = { ALLOWED_ORIGINS: origin, AI_MODEL: "test-model", AI: { async run(_model, payload) {
  assert.equal(payload.store, false);
  assert.match(payload.messages[0].content, /Never diagnose/);
  return { response: "Thông tin tham khảo, hãy hỏi bác sĩ nếu cần." };
} } };
function post(path, body, headers = {}) {
  return new Request(base + path, { method: "POST", headers: { Origin: origin, "Content-Type": "application/json", ...headers }, body: typeof body === "string" ? body : JSON.stringify(body) });
}
test("status does not claim live AI verification", async () => {
  const res = await worker.fetch(new Request(base + "/api/status"), env);
  const data = await res.json();
  assert.equal(data.service, "Health SI");
  assert.match(data.note, /not tested/);
});
test("rejects Origin not on allowlist", async () => {
  const req = post("/api/health-assist", { consent: true, question: "Đo huyết áp" }, { Origin: "https://unknown.example" });
  assert.equal((await worker.fetch(req, env)).status, 403);
});
test("rejects malformed JSON and missing consent", async () => {
  assert.equal((await worker.fetch(post("/api/health-assist", "{bad"), env)).status, 400);
  assert.equal((await worker.fetch(post("/api/health-assist", { question: "Đo huyết áp" }), env)).status, 400);
});
test("rejects questions longer than 5000 characters", async () => {
  assert.equal((await worker.fetch(post("/api/health-assist", { consent: true, question: "x".repeat(5001) }), env)).status, 400);
});
test("approved health response uses configured mock AI and keeps disclaimer", async () => {
  const res = await worker.fetch(post("/api/health-assist", { consent: true, question: "Chuẩn bị đi khám bác sĩ" }), env);
  assert.equal(res.status, 200);
  const data = await res.json();
  assert.match(data.disclaimer, /không thay thế/);
  assert.ok(data.references.length > 0);
});
test("AI provider failure returns 502 without leaking internals", async () => {
  const res = await worker.fetch(post("/api/health-assist", { consent: true, question: "Giấc ngủ" }), { ...env, AI: { run: async () => { throw Error("private provider token"); } } });
  assert.equal(res.status, 502);
  assert.doesNotMatch(JSON.stringify(await res.json()), /private provider token/);
});
test("Pi verification rejects absent access token without network call", async () => {
  assert.equal((await worker.fetch(post("/api/pi/verify", {}), env)).status, 401);
});
test("knowledge admin endpoint rejects missing token", async () => {
  assert.equal((await worker.fetch(post("/api/admin/knowledge/upsert", { record: { id: "x" } }), env)).status, 401);
});
