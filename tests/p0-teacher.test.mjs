import test from "node:test";
import assert from "node:assert/strict";
import {teacherPrompt} from "../modules/teacher.mjs";
test("Teacher validates input and builds separate prompt",()=>{
 const messages=teacherPrompt({grade:5,subject:"Toán",question:"2 + 3"});
 assert.equal(messages[1].content,"2 + 3");
 assert.match(messages[0].content,/Gợi ý trước lời giải/);
 assert.match(messages[0].content,/bạo hành/);
});
for(const input of [{grade:0,subject:"Toán",question:"x"},{grade:13,subject:"Toán",question:"x"},{grade:5,subject:"invalid",question:"x"},{grade:5,subject:"Toán",question:" "}]) test("reject "+JSON.stringify(input),()=>assert.throws(()=>teacherPrompt(input)));
