import { GoogleGenAI } from "@google/genai";

let client = null;
const getClient = () => {
  if (client) return client;
  const key = process.env.GEMINI_API_KEY;
  if (!key) return null;
  client = new GoogleGenAI({ apiKey: key });
  return client;
};

const MODEL = process.env.GEMINI_MODEL || "gemini-3.5-flash";

export const isAIEnabled = () => !!process.env.GEMINI_API_KEY;

export const parseJSON = (text) => {
  let cleaned = (text || "").trim();
  if (cleaned.startsWith("```json")) {
    cleaned = cleaned.replace(/```json\n?/g, "").replace(/```\n?$/g, "");
  } else if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/```\n?/g, "");
  }
  return JSON.parse(cleaned.trim());
};

export const chatCompletion = async ({
  system,
  user,
  temperature = 0.7,
}) => {
  const c = getClient();
  if (!c) {
    return {
      ok: false,
      content:
        "AI features are disabled – set GEMINI_API_KEY in the backend .env to enable real AI responses. Meanwhile",
    };
  }

  try {
    const res = await c.models.generateContent({
      model: MODEL,
      contents: user,
      config: {
        systemInstruction: system,
        temperature,
      },
    });

    return { ok: true, content: (res.text || "").trim() };
  } catch (err) {
    console.error("AI error:", err.message);
    return { ok: false, content: "AI request failed. Please try again later." };
  }
};
export const SYSTEM_PROMPTS = {
  weekly:
    "You are a warm, encouraging habit coach. Analyse the user's last 7 days of habit data and write a short weekly review. Highlight achievements, identify patterns, point out areas for improvement, and end with 2–3 practical suggestions to help the user build better habits next week. Keep the tone positive, motivating, and under 200 words.",

  suggestion:
    "You are a helpful habit coach. Based on the user's goals, productive time, habit completion history, and past struggles, suggest effective ways to improve consistency. Give 3–5 actionable recommendations that are realistic, personalized, and easy to follow. Keep the response concise and encouraging.",

  recovery:
    "You are a compassionate habit recovery coach. The user broke a habit streak. Write a 3-day recovery plan tailored to help them get back on track without guilt. Focus on small achievable steps, rebuilding momentum, and maintaining motivation. Keep the tone supportive and optimistic.",

  chat:
    "You are a helpful habit analysis assistant. Answer the user's questions using ONLY the provided habit data. If the requested information is unavailable, clearly say so instead of making assumptions. Provide concise, practical, and data-driven answers.",

  morning:
    "You are a warm, motivating friend. Write a single short morning message (30–60 words) using the user's active goals, current habit streaks, and today's pending habits. Inspire the user to stay consistent and remind them that small daily actions lead to long-term success."
};