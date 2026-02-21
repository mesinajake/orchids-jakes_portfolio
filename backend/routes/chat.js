import express from "express";
import { body, validationResult } from "express-validator";
import { Chat } from "../models/schemas.js";

const router = express.Router();

const SYSTEM_PROMPT = `You are Jake Mesina, a Full-Stack Developer and AI Integration Specialist from Calamba, Laguna, Philippines. You are speaking directly to a website visitor, recruiter, or potential employer through your portfolio website's AI assistant.

YOUR BACKGROUND:
- Currently studying BS Information Technology at City College of Calamba (2022-Present)
- Technical proficiency: 82% overall (Node.js 85%, MongoDB 88%, JWT Auth 92%, React 78%, AI Integration 75%, API Integration 86%)
- Specializes in React, Node.js, Express, MongoDB, PostgreSQL, and AI integration (Ollama, LLaMA 3.2, DeepSeek R1)
- Location: Calamba, Laguna, Philippines
- Contact: mesinajake9@gmail.com | +639473492672

YOUR MAJOR PROJECTS:

1. AppliTrak: AI-Powered Job Portal (May 2025 - Present)
   - Enterprise-grade job marketplace with local LLM integration (Ollama + LLaMA 3.2)
   - Reduced resume screening from 5-7 minutes to 30 seconds (90% improvement)
   - Built 60+ REST endpoints with complete RBAC system
   - Designed 8 MongoDB schemas with geospatial indexing
   - Integrated 3 external job APIs with data normalization
   - Zero cloud costs through privacy-first local AI processing
   - 75% AI accuracy in resume-to-job matching

2. K-Wise: AI-Driven Kiosk System (Feb 2025 - Nov 2025)
   - React-based self-service kiosk with real-time AI integration
   - Achieved 3.80/4.0 user satisfaction score and 32% conversion rate
   - Eliminated 85% of manual staff consultations through AI automation
   - Built hybrid AI engine with 3,200+ compatibility rules + DeepSeek R1
   - Reduced average build time from 15 minutes to 2 minutes (87% improvement)
   - Optimized to <300ms UI response time with 99.5% uptime

GUIDELINES:
- Speak in first person as Jake Mesina.
- Keep responses concise (2-4 sentences) unless asked for detail.
- Use concrete metrics when relevant.
- If asked about availability, confirm active interest in full-time opportunities.
- Guide visitors to contact details when useful.`;

const validateChat = [
  body("message").trim().isLength({ min: 1, max: 500 }),
  body("sessionId").trim().isLength({ min: 1, max: 100 }),
];

function getGeminiApiKey() {
  return process.env.GEMINI_API_KEY || null;
}

function getGeminiModel() {
  return process.env.GEMINI_MODEL || process.env.AI_MODEL || "gemini-2.5-flash";
}

function getMaxTokens() {
  return Number.parseInt(process.env.AI_MAX_TOKENS, 10) || 500;
}

function getTemperature() {
  return Number.parseFloat(process.env.AI_TEMPERATURE) || 0.7;
}

function getRecentMessages(chat) {
  return chat.messages.slice(-10);
}

function buildGeminiContents(recentMessages) {
  return recentMessages
    .filter((message) => message.role === "user" || message.role === "assistant")
    .map((message) => ({
      role: message.role === "assistant" ? "model" : "user",
      parts: [{ text: message.content }],
    }));
}

function extractGeminiText(payload) {
  const parts = payload?.candidates?.[0]?.content?.parts;
  if (!Array.isArray(parts)) {
    return "";
  }

  return parts
    .map((part) => part?.text || "")
    .join("")
    .trim();
}

async function callGemini(contents) {
  const apiKey = getGeminiApiKey();
  if (!apiKey) {
    return { ok: false, status: 500, error: "Gemini API key is not configured." };
  }

  const model = getGeminiModel();
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${apiKey}`;

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      systemInstruction: {
        parts: [{ text: SYSTEM_PROMPT }],
      },
      contents: contents.length > 0 ? contents : [{ role: "user", parts: [{ text: "Hello" }] }],
      generationConfig: {
        temperature: getTemperature(),
        maxOutputTokens: getMaxTokens(),
      },
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    return {
      ok: false,
      status: response.status,
      error: `Gemini request failed: ${response.status} ${errorText}`,
    };
  }

  const payload = await response.json();
  const text = extractGeminiText(payload);
  if (!text) {
    return {
      ok: false,
      status: 502,
      error: "Gemini returned an empty response.",
    };
  }

  return { ok: true, text };
}

async function generateAssistantReply(chat) {
  const recentMessages = getRecentMessages(chat);
  const geminiResult = await callGemini(buildGeminiContents(recentMessages));

  if (!geminiResult.ok) {
    return {
      ok: false,
      provider: "gemini",
      status: geminiResult.status,
      error: geminiResult.error,
    };
  }

  return { ok: true, provider: "gemini", reply: geminiResult.text };
}

async function getOrCreateChat(sessionId, req) {
  let chat = await Chat.findOne({ sessionId });

  if (!chat) {
    chat = new Chat({
      sessionId,
      messages: [],
      userAgent: req.get("user-agent"),
      ipAddress: req.ip,
    });
  }

  return chat;
}

router.post("/", validateChat, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { message, sessionId } = req.body;
    const chat = await getOrCreateChat(sessionId, req);

    chat.messages.push({
      role: "user",
      content: message,
      timestamp: new Date(),
    });

    const aiResult = await generateAssistantReply(chat);

    if (!aiResult.ok) {
      return res.status(aiResult.status).json({
        success: false,
        message: aiResult.error,
      });
    }

    chat.messages.push({
      role: "assistant",
      content: aiResult.reply,
      timestamp: new Date(),
    });

    chat.updatedAt = new Date();
    await chat.save();

    return res.json({
      success: true,
      message: aiResult.reply,
      provider: aiResult.provider,
      sessionId: chat.sessionId,
    });
  } catch (error) {
    console.error("Chat error:", error);
    return res.status(500).json({
      success: false,
      message:
        "Sorry, I encountered an error. Please try again or use the contact form to reach out directly.",
    });
  }
});

router.post("/stream", validateChat, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { message, sessionId } = req.body;
    const chat = await getOrCreateChat(sessionId, req);

    chat.messages.push({
      role: "user",
      content: message,
      timestamp: new Date(),
    });

    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    const aiResult = await generateAssistantReply(chat);
    if (!aiResult.ok) {
      res.write(`data: ${JSON.stringify({ error: aiResult.error })}\n\n`);
      res.end();
      return;
    }

    chat.messages.push({
      role: "assistant",
      content: aiResult.reply,
      timestamp: new Date(),
    });
    chat.updatedAt = new Date();
    await chat.save();

    res.write(`data: ${JSON.stringify({ content: aiResult.reply })}\n\n`);
    res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
    res.end();
  } catch (error) {
    console.error("Stream chat error:", error);

    if (!res.headersSent) {
      return res.status(500).json({
        success: false,
        message: "Failed to stream chat response.",
      });
    }

    res.write(`data: ${JSON.stringify({ error: "An error occurred" })}\n\n`);
    res.end();
  }
});

router.get("/history/:sessionId", async (req, res) => {
  try {
    const { sessionId } = req.params;
    const chat = await Chat.findOne({ sessionId });

    if (!chat) {
      return res.json({
        success: true,
        messages: [],
      });
    }

    return res.json({
      success: true,
      messages: chat.messages,
    });
  } catch (error) {
    console.error("Error fetching chat history:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch chat history",
    });
  }
});

export default router;
