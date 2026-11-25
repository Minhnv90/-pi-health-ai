import test from "node:test";
import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
const teacherUrl = new URL("../modules/teacher.mjs", import.meta.url).href;
const source = (await readFile(new URL("../worker.js", import.meta.url), "utf8")).replace("./modules/teacher.mjs", teacherUrl);
const worker = (await import("data:text/javascript;base64," + Buffer.from(source).toString("base64"))).default;
test("approved RAG reaches AI, draft excluded, citations distinguished", async () => {
  let messages;
  const env = {ALLOWED_ORIGINS:"https://example.test", AI_MODEL:"fake", AI:{run:async (_, args)=>{messages=args.messages;return {response:"Thông tin tham khảo [N1]"};}}, KNOWLEDGE_DB:{prepare(sql){assert.match(sql,/approval_status = 'approved'/);return {bind(){return {all:async()=>({results:[{approval_status:"approved",title:"Test",body:"FAKE_APPROVED_MARKER",source_url:"https://example.test/source"},{approval_status:"draft",body:"FAKE_DRAFT_MARKER",source_url:"https://example.test/draft"}]})};}};}}};
  const res=await worker.fetch(new Request("https://worker.test/api/health-assist",{method:"POST",headers:{Origin:"https://example.test","Content-Type":"application/json"},body:JSON.stringify({consent:true,question:"Thông tin sức khỏe giả lập"})}),env);
  assert.equal(res.status,200);
  assert.match(messages[0].content,/FAKE_APPROVED_MARKER/);
  assert.doesNotMatch(messages[0].content,/FAKE_DRAFT_MARKER/);
  const data=await res.json();
  assert.equal(data.knowledge_count,1);
  assert.equal(data.knowledge_sources[0].cited,true);
});
