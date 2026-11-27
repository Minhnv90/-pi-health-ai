import test from 'node:test';
import assert from 'node:assert/strict';
import {preferenceMemory} from '../modules/memory.mjs';
import {teacherPrompt} from '../modules/teacher.mjs';
import {knowledgeMcp} from '../modules/knowledge-mcp.mjs';
test('memory consent, isolation, deletion and TTL',async()=>{
 const map=new Map(); const env={MEMORY_KV:{put:async(k,v,o)=>{assert.equal(o.expirationTtl,2592000);map.set(k,v)},get:async(k)=>JSON.parse(map.get(k)||'null'),delete:async(k)=>map.delete(k)}};
 await assert.rejects(preferenceMemory(env,'a',{action:'save',preferences:{language:'vi'}}));
 await assert.rejects(preferenceMemory(env,'a',{action:'save',consent:true,preferences:{medical:'secret'}}));
 await preferenceMemory(env,'a',{action:'save',consent:true,preferences:{language:'vi'}});
 assert.deepEqual(await preferenceMemory(env,'b',{action:'read'}),{preferences:{}});
 assert.deepEqual(await preferenceMemory(env,'a',{action:'read'}),{preferences:{language:'vi'}});
 await preferenceMemory(env,'a',{action:'delete'});assert.equal(map.size,0);
});
test('teacher validates grade, subject, question',()=>{
 for(const grade of [0,13,1.5])assert.throws(()=>teacherPrompt({grade,subject:'Toán',question:'2+2'}));
 assert.throws(()=>teacherPrompt({grade:1,subject:'invalid',question:'2+2'}));
 assert.throws(()=>teacherPrompt({grade:1,subject:'Toán',question:'x'.repeat(2001)}));
 assert.equal(teacherPrompt({grade:1,subject:'Toán',question:'2+2'})[1].content,'2+2');
});
test('MCP denies invalid token, origin and mutations; filters records',async()=>{
 const env={MCP_READ_TOKEN:'test-only',ALLOWED_ORIGINS:'https://example.com',KNOWLEDGE_DB:{}};
 const req=(method,token='test-only',origin='https://example.com',params={})=>new Request('https://example.com/mcp',{method:'POST',headers:{Authorization:'Bearer '+token,Origin:origin},body:JSON.stringify({jsonrpc:'2.0',id:1,method,params})});
 const search=async()=>[{approval_status:'approved',source_url:'https://example.com',title:'public'},{approval_status:'pending',source_url:'https://example.com',title:'private'}];
 assert.equal((await knowledgeMcp(req('ping','wrong'),env,search)).status,401);
 assert.equal((await knowledgeMcp(req('ping','test-only','https://bad.example'),env,search)).status,403);
 assert.equal((await (await knowledgeMcp(req('tools/call','test-only','https://example.com',{name:'delete',arguments:{query:'x'}}),env,search)).json()).error.code,-32602);
 const out=await (await knowledgeMcp(req('tools/call','test-only','https://example.com',{name:'search_knowledge',arguments:{query:'x'}}),env,search)).json();
 assert.equal(JSON.parse(out.result.content[0].text).records.length,1);
});

import worker from '../worker.js';
test('knowledge search rejects malformed JSON objects',async()=>{for(const body of ['null','[]','{','{}']){const request=new Request('https://worker.example/api/knowledge/search',{method:'POST',headers:{'Content-Type':'application/json',Origin:'https://example.com'},body});const response=await worker.fetch(request,{ALLOWED_ORIGINS:'https://example.com',KNOWLEDGE_DB:{}},{});assert.equal(response.status,400);}});

test('health RAG binds search terms and requires approved HTTPS nonempty records',async()=>{let sql,params;const db={prepare:s=>{sql=s;return {bind:(...p)=>{params=p;return {all:async()=>({results:[{title:'Synthetic nutrition',approval_status:'approved',source_url:'https://example.com/source',body:'Synthetic evidence'}]})}}}}};const request=new Request('https://worker.example/api/knowledge/search',{method:'POST',headers:{'Content-Type':'application/json',Origin:'https://example.com'},body:JSON.stringify({query:'nutrition'})});const response=await worker.fetch(request,{ALLOWED_ORIGINS:'https://example.com',KNOWLEDGE_DB:db},{});assert.equal(response.status,200);assert.equal((await response.json()).count,1);assert.ok(sql.includes("approval_status = 'approved'"));assert.ok(sql.includes("source_url LIKE 'https://%'"));assert.ok(sql.includes("trim(body) <> ''"));assert.ok(params.includes('%nutrition%'));assert.ok(!sql.includes('nutrition'));});

import {memoryContext} from '../modules/memory.mjs';
test('memory context fails closed on identity failure and KV outage',async()=>{const request=new Request('https://example.com',{headers:{Authorization:'Bearer synthetic-test-token'}});const env={MEMORY_KV:{get:async()=>{throw Error('KV unavailable')}}};const identity=async()=>Response.json({uid:'synthetic-user'});assert.equal(await memoryContext(request,env,true,identity),'');assert.equal(await memoryContext(request,env,true,async()=>{throw Error('network outage')}),'');assert.equal(await memoryContext(request,env,true,async()=>new Response('',{status:401})),'');assert.equal(await memoryContext(request,env,false,async()=>{assert.fail('Identity should not be fetched without opt-in')}),'');});

test('Pi verification distinguishes rejection and upstream failure',async()=>{const old=globalThis.fetch;const env={ALLOWED_ORIGINS:'https://example.com'};const request=()=>new Request('https://worker.example/api/pi/verify',{method:'POST',headers:{Origin:'https://example.com',Authorization:'Bearer synthetic-token-long-enough'}});try{globalThis.fetch=async()=>new Response('',{status:401});assert.equal((await worker.fetch(request(),env,{})).status,401);globalThis.fetch=async()=>{throw Error('network unavailable')};assert.equal((await worker.fetch(request(),env,{})).status,502);globalThis.fetch=async()=>Response.json({uid:'synthetic-user'});assert.equal((await worker.fetch(request(),env,{})).status,200);}finally{globalThis.fetch=old;}});
test('storage diagnostics require token and never write',async()=>{let reads=0;const env={ALLOWED_ORIGINS:'https://example.com',MCP_READ_TOKEN:'synthetic-read-token',KNOWLEDGE_DB:{prepare:()=>({first:async()=>({total:1})})},MEMORY_KV:{get:async()=>{reads++;return null},put:async()=>assert.fail('write'),delete:async()=>assert.fail('delete')}};const request=(token)=>new Request('https://worker.example/api/diagnostics/storage',{headers:{Origin:'https://example.com',Authorization:'Bearer '+token}});assert.equal((await worker.fetch(request('wrong'),env,{})).status,401);assert.equal(reads,0);const r=await worker.fetch(request('synthetic-read-token'),env,{});assert.equal(r.status,200);assert.equal((await r.json()).rag_eligible,1);assert.equal(reads,1);});

import {reviewDueKnowledge} from '../modules/knowledge-cron.mjs';
import cronWorker from '../worker.js';
test('Health scheduled review is bounded read-only and fails closed',async()=>{let sql;const e={KNOWLEDGE_DB:{prepare:s=>{sql=s;return {all:async()=>({results:[{id:'synthetic'}]})}}}};assert.deepEqual(await reviewDueKnowledge(e),{due:1});assert.match(sql,/^SELECT /);assert.match(sql,/health_knowledge/);assert.match(sql,/LIMIT 20/);assert.match(sql,/approval_status = 'approved'/);await assert.rejects(reviewDueKnowledge({}));await assert.rejects(reviewDueKnowledge({KNOWLEDGE_DB:{prepare:()=>{throw Error('offline')}}}));let pending;await cronWorker.scheduled({},e,{waitUntil:p=>{pending=p}});await pending;});
