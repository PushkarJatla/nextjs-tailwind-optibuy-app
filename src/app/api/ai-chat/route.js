export const runtime = 'nodejs';

import { OpenAI } from 'openai';


const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
console.log("🔑 OpenAI API Key:", process.env.OPENAI_API_KEY ? "Loaded" : "Not Set");
export async function POST(req) {
  try {
    console.log("💡 Received request");
    const { message } = await req.json();
    console.log("📝 Message received:", message);

    const products = [
      {
        name: "boAt Rockerz 255",
        price: 1999,
        category: "Earphones",
        description: "Wireless, Sweatproof, Bass-heavy",
      },
      {
        name: "Realme Buds Wireless 2 Neo",
        price: 1799,
        category: "Earphones",
        description: "Lightweight, 17hr battery life",
      },
    ];

    const productInfo = products.map(p =>
      `Name: ${p.name}, Price: ₹${p.price}, Category: ${p.category}, Description: ${p.description}`
    ).join("\n");

    const prompt = `
You are a helpful AI shopping assistant. Based on the product list below, help the user:

${productInfo}

User asked: "${message}"
    `;

    console.log("📦 Sending prompt to OpenAI...");
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
    });

    console.log("✅ OpenAI response received");
    const reply = completion.choices?.[0]?.message?.content || "No reply";

    return new Response(JSON.stringify({ response: reply }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
  console.error("🔥 AI API Error:", error);
  return new Response(JSON.stringify({
    error: error.message || "Internal Server Error"
  }), {
    status: 500,
    headers: { "Content-Type": "application/json" }
  });
}

}

// 👇 This disables other methods like GET, PUT, etc., so you don’t get 405
export const GET = () =>
  new Response(JSON.stringify({ error: "Method Not Allowed" }), { status: 405 });
