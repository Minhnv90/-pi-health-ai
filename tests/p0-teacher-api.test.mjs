import test from "node:test";
import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
const source=(await readFile(new URL("../worker.js",import.meta.url),"utf8")).replace("./modules/teacher.mjs",new URL("../modules/teacher.mjs",import.meta.url).href);
const resolved = source.replace(/(["'])(\.\/modules\/[^"']+)\1/g, (_,q,p)=>q+new URL("../"+p.slice(2),import.meta.url).href+q);
const worker=(await import("data:text/javascript;base64,"+Buffer.from(resolved).toString("base64"))).default;
const valid={grade:5,subject:"Toán",question:"2+3",consent:true};
for(const [name,body,origin,mode,status] of [
["valid",valid,"https://example.test","ok",200],
["no consent",{...valid,consent:false},"https://example.test","ok",400],
["invalid grade",{...valid,grade:13},"https://example.test","ok",400],
["foreign origin",valid,"https://other.test","ok",403],
["empty",valid,"https://example.test","empty",502],
["provider failure",valid,"https://example.test","error",502],
["missing AI",valid,"https://example.test","missing",503]
])test(name,async()=>{
 let calls=0;
 const env={ALLOWED_ORIGINS:"https://example.test",AI_MODEL:"fake"};
 if(mode!=="missing")env.AI={run:async(_,args)=>{calls++;assert.match(args.messages[0].content,/giáo viên AI/);if(mode==="error")throw Error("fake");return {response:mode==="empty"?"":"Gợi ý: cộng hai số"};}};
 const res=await worker.fetch(new Request("https://worker.test/api/teacher",{method:"POST",headers:{Origin:origin,"Content-Type":"application/json"},body:JSON.stringify(body)}),env);
 assert.equal(res.status,status);
 assert.equal(calls,[200,502].includes(status)?1:0);
 if(status===200)assert.equal((await res.json()).mode,"teacher");
});
