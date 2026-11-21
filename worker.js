const cors = (request, env) => {
  const origin = request.headers.get("Origin") || "";
  const allowed = (env.ALLOWED_ORIGINS || "").split(",").map(x => x.trim()).filter(Boolean);
  if (!origin || !allowed.includes(origin)) return null;
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
    "Vary": "Origin"
  };
};

export default {
  async fetch(request, env) {
    const headers = cors(request, env);
    if (!headers) return new Response("Origin not allowed", { status: 403 });
    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers });
    const url = new URL(request.url);
    if (url.pathname !== "/api/health-assist" || request.method !== "POST") {
      return Response.json({ error: "Not found" }, { status: 404, headers });
    }
    if (!env.AI_CHAT_COMPLETIONS_URL || !env.AI_API_KEY || !env.AI_MODEL) {
      return Response.json({ error: "AI service is not configured." }, { status: 503, headers });
    }
    let body;
    try { body = await request.json(); } catch {
      return Response.json({ error: "Invalid JSON." }, { status: 400, headers });
    }
    if (body.consent !== true) return Response.json({ error: "Explicit consent is required." }, { status: 400, headers });
    const question = typeof body.question === "string" ? body.question.trim() : "";
    if (!question || question.length > 5000) return Response.json({ error: "Question must contain 1–5000 characters." }, { status: 400, headers });
    const system = "You are Health SI, a cautious health-information assistant. You are not a doctor and must not diagnose, prescribe, or claim certainty. Explain general health information, ask for missing context only when necessary, encourage appropriate clinician review, and clearly distinguish general information from urgent warning signs. If the user describes possible emergency symptoms such as severe chest pain, severe difficulty breathing, stroke signs, loss of consciousness, or uncontrolled bleeding, tell them to seek emergency help immediately. Do not infer diagnoses from wearable readings. Do not claim to have accessed medical records or devices. Keep the answer in Vietnamese unless the user writes in another language. State that the response is informational and not a substitute for professional care.";
    try {
      const upstream = await fetch(env.AI_CHAT_COMPLETIONS_URL, {
        method: "POST",
        headers: { "Authorization": "Bearer " + env.AI_API_KEY, "Content-Type": "application/json" },
        body: JSON.stringify({
          model: env.AI_MODEL,
          temperature: 0.2,
          messages: [{ role: "system", content: system }, { role: "user", content: question }]
        })
      });
      if (!upstream.ok) return Response.json({ error: "AI provider returned an error.", provider_status: upstream.status }, { status: 502, headers });
      const data = await upstream.json();
      const answer = data?.choices?.[0]?.message?.content;
      if (typeof answer !== "string" || !answer.trim()) return Response.json({ error: "Empty AI response." }, { status: 502, headers });
      return Response.json({ answer: answer.trim(), disclaimer: "Thông tin tham khảo, không thay thế tư vấn y tế chuyên môn." }, { headers });
    } catch {
      return Response.json({ error: "Could not reach AI provider." }, { status: 502, headers });
    }
  }
};
