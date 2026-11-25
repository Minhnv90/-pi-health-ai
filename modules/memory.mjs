const allowed=["grade","subject","language"];
const values={"grade":["1","2","3","4","5","6","7","8","9","10","11","12"],"subject":["math","language","science","history","other"],"language":["vi","en"]};
export async function preferenceMemory(env,verifiedUid,input){
 if(!env.MEMORY_KV) throw Error("Memory unavailable");
 if(typeof verifiedUid!=="string"||!verifiedUid||verifiedUid.length>256) throw Error("Verified identity required");
 const key="health:preferences:v1:"+encodeURIComponent(verifiedUid);
 if(input?.action==="delete"){await env.MEMORY_KV.delete(key);return {deleted:true};}
 if(input?.action==="read")return {preferences:await env.MEMORY_KV.get(key,"json")||{}};
 if(input?.action!=="save"||input.consent!==true)throw Error("Explicit consent required");
 const preferences=input.preferences;
 if(!preferences||typeof preferences!=="object"||Array.isArray(preferences))throw Error("Invalid preferences");
 const clean={};
 for(const [k,v] of Object.entries(preferences)){
 if(!allowed.includes(k)||typeof v!=="string"||!values[k].includes(v))throw Error("Unsupported preference");
 clean[k]=v;
 }
 await env.MEMORY_KV.put(key,JSON.stringify(clean),{expirationTtl:2592000});
 return {saved:true,preferences:clean};
}
