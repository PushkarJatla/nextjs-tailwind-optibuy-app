export const runtime = 'nodejs';

const apiKey = process.env.GEMINI_API_KEY;
const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

export async function POST(req) {
  try {
    const { message } = await req.json();

    const prompt = `
You are a helpful AI shopping assistant. Answer the user's query thoughtfully.

User: "${message}"
`;

    const res = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              { text: prompt }
            ]
          }
        ]
      })
    });

    const data = await res.json();
    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't generate a reply.";

    return new Response(JSON.stringify({ response: reply }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("🔥 AI Chat Error:", error);
    return new Response(JSON.stringify({
      error: error.message || "Internal Server Error"
    }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}


