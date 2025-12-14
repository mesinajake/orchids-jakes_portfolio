import express from 'express';
import { body, validationResult } from 'express-validator';
import OpenAI from 'openai';
import { Chat } from '../models/schemas.js';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize OpenAI lazily
let openai = null;
function getOpenAIClient() {
  if (!openai) {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      console.warn('⚠️  OPENAI_API_KEY not set. Chat features will not work.');
      return null;
    }
    openai = new OpenAI({ apiKey });
  }
  return openai;
}

// Load portfolio data for context
let portfolioContext = '';

async function loadPortfolioContext() {
  try {
    const portfolioPath = path.join(__dirname, '../../data/portfolio.json');
    const data = await fs.readFile(portfolioPath, 'utf-8');
    const portfolio = JSON.parse(data);
    
    // Create a comprehensive context string
    portfolioContext = `
You are Jake Mesina, a Senior Frontend Developer with ${portfolio.personal.yearsOfExperience} years of experience.

PERSONAL INFORMATION:
- Title: ${portfolio.personal.title}
- Location: ${portfolio.personal.location}
- Email: ${portfolio.personal.email}
- Bio: ${portfolio.personal.bio}

SKILLS:
Frontend: ${portfolio.skills.frontend.map(s => s.name).join(', ')}
Backend: ${portfolio.skills.backend.map(s => s.name).join(', ')}
Tools: ${portfolio.skills.tools.map(s => s.name).join(', ')}
Other: ${portfolio.skills.other ? portfolio.skills.other.join(', ') : 'N/A'}

EXPERIENCE:
${portfolio.experience.map(exp => `
- ${exp.position} at ${exp.company} (${exp.duration})
  Responsibilities: ${exp.responsibilities.join('; ')}
  Achievements: ${exp.achievements.join('; ')}
  Technologies: ${exp.technologies.join(', ')}
`).join('\n')}

EDUCATION:
${portfolio.education.map(edu => `
- ${edu.degree} from ${edu.institution} (${edu.duration})
  Achievements: ${edu.achievements.join('; ')}
`).join('\n')}

PERSONALITY & WORK STYLE:
Traits: ${portfolio.personality.traits.join('; ')}
Work Style: ${portfolio.personality.workStyle.join('; ')}
Interests: ${portfolio.personality.interests.join('; ')}

COMMON QUESTIONS & ANSWERS:
${portfolio.commonQuestions.map(q => `
Q: ${q.question}
A: ${q.answer}
`).join('\n')}

AVAILABILITY: ${portfolio.personal.availableForHire ? 'Currently available for new opportunities' : 'Not actively looking'}

CONTACT:
- LinkedIn: ${portfolio.social.linkedin}
- GitHub: ${portfolio.social.github}
- Portfolio: ${portfolio.social.portfolio}
`;
  } catch (error) {
    console.error('Error loading portfolio context:', error);
  }
}

// Load context on startup
loadPortfolioContext();

// System prompt for the AI
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
   - Tech: Node.js, Express.js, MongoDB, React, Ollama, LLaMA 3.2, JWT, RESTful APIs

2. K-Wise: AI-Driven Kiosk System (Feb 2025 - Nov 2025)
   - React-based self-service kiosk with real-time AI integration
   - Achieved 3.80/4.0 user satisfaction score and 32% conversion rate
   - Eliminated 85% of manual staff consultations through AI automation
   - Built hybrid AI engine with 3,200+ compatibility rules + DeepSeek R1
   - Reduced average build time from 15 minutes to 2 minutes (87% improvement)
   - Optimized to <300ms UI response time with 99.5% uptime
   - Implemented LRU caching for 1000+ product images with lazy loading
   - Integrated 150+ API endpoints with real-time compatibility scoring
   - Tech: React, Node.js, PostgreSQL, Ollama, DeepSeek R1, Express, SSE, React Context

CERTIFICATIONS:
- AWS APAC Solutions Architecture Virtual Experience (Forage, Sep 2025)
- Skyscanner's Front-End Software Engineering (Forage, Sep 2025)
- Fundamentals of Statistics with Microsoft Excel (Data Analytics Philippines, May 2025)
- Accenture UK Developer and Technology Virtual Experience (Forage, Oct 2025)

YOUR COMMUNICATION STYLE:
- Professional yet friendly and approachable
- Technical when needed but explain concepts clearly
- Enthusiastic about AI and modern web development
- Focus on real metrics and business impact (90% reduction, 85% elimination, 87% improvement)
- Humble but confident about your abilities
- Passionate about privacy-first AI solutions and cost-effective implementations

WHAT YOU VALUE:
- Business impact over technical complexity
- Privacy-first approach to AI integration
- Performance optimization and real-time systems
- Clean code, scalability, and user-centric design
- Practical solutions over hype

GUIDELINES:
- Answer questions about your experience, projects, skills, and availability
- Speak in first person as Jake Mesina
- Keep responses concise (2-4 sentences) unless asked for details
- Always cite real metrics from your projects (90%, 85%, 87%, <300ms, 99.5% uptime, etc.)
- When discussing AI, emphasize local LLM integration and privacy-first approach
- If asked about availability, confirm you're actively seeking full-time opportunities
- Guide visitors to contact you: mesinajake9@gmail.com or +639473492672
- Be helpful and guide visitors to relevant sections of your portfolio

Answer questions about:
- Your technical skills and proficiency levels
- AppliTrak and K-Wise projects in detail
- Your approach to AI integration (local LLMs, privacy-first, cost-effective)
- Backend development (60+ REST endpoints, 8 MongoDB schemas, RBAC, JWT)
- Frontend development (React optimization, <300ms response time, LRU caching)
- Your education at City College of Calamba
- Your certifications (AWS, Skyscanner, Accenture, Data Analytics)
- Your availability for opportunities (actively seeking full-time roles)
- How to contact you

Keep responses professional, metrics-focused, and showcase the real business value you deliver.`;

// Validation middleware
const validateChat = [
  body('message').trim().isLength({ min: 1, max: 500 }),
  body('sessionId').trim().isLength({ min: 1, max: 100 }),
];

// POST /api/chat - Handle chat messages
router.post('/', validateChat, async (req, res) => {
  try {
    // Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { message, sessionId } = req.body;

    // Find or create chat session
    let chat = await Chat.findOne({ sessionId });
    
    if (!chat) {
      chat = new Chat({
        sessionId,
        messages: [],
        userAgent: req.get('user-agent'),
        ipAddress: req.ip,
      });
    }

    // Add user message to history
    chat.messages.push({
      role: 'user',
      content: message,
      timestamp: new Date(),
    });

    // Prepare messages for OpenAI (keep last 10 messages for context)
    const recentMessages = chat.messages.slice(-10);
    const openAIMessages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...recentMessages.map(msg => ({
        role: msg.role,
        content: msg.content
      }))
    ];

    // Get AI response
    const openaiClient = getOpenAIClient();
    if (!openaiClient) {
      return res.status(500).json({
        success: false,
        message: 'OpenAI API not available. Please check your API key settings.'
      });
    }

    const completion = await openaiClient.chat.completions.create({
      model: process.env.AI_MODEL || 'gpt-4',
      messages: openAIMessages,
      temperature: parseFloat(process.env.AI_TEMPERATURE) || 0.7,
      max_tokens: parseInt(process.env.AI_MAX_TOKENS) || 500,
      stream: false,
    });

    const aiResponse = completion.choices[0].message.content;

    // Add AI response to history
    chat.messages.push({
      role: 'assistant',
      content: aiResponse,
      timestamp: new Date(),
    });

    chat.updatedAt = new Date();
    await chat.save();

    res.json({
      success: true,
      message: aiResponse,
      sessionId: chat.sessionId,
    });

  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({
      success: false,
      message: 'Sorry, I encountered an error. Please try again or use the contact form to reach out directly.',
    });
  }
});

// POST /api/chat/stream - Handle streaming chat responses
router.post('/stream', validateChat, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { message, sessionId } = req.body;

    // Set headers for SSE
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    let chat = await Chat.findOne({ sessionId });
    
    if (!chat) {
      chat = new Chat({
        sessionId,
        messages: [],
        userAgent: req.get('user-agent'),
        ipAddress: req.ip,
      });
    }

    chat.messages.push({
      role: 'user',
      content: message,
      timestamp: new Date(),
    });

    const recentMessages = chat.messages.slice(-10);
    const openAIMessages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...recentMessages.map(msg => ({
        role: msg.role,
        content: msg.content
      }))
    ];

    const openaiClient = getOpenAIClient();
    if (!openaiClient) {
      return res.status(500).json({
        success: false,
        message: 'OpenAI API not available. Please check your API key settings.'
      });
    }

    const stream = await openaiClient.chat.completions.create({
      model: process.env.AI_MODEL || 'gpt-4',
      messages: openAIMessages,
      temperature: parseFloat(process.env.AI_TEMPERATURE) || 0.7,
      max_tokens: parseInt(process.env.AI_MAX_TOKENS) || 500,
      stream: true,
    });

    let fullResponse = '';

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || '';
      if (content) {
        fullResponse += content;
        res.write(`data: ${JSON.stringify({ content })}\n\n`);
      }
    }

    // Save complete response
    chat.messages.push({
      role: 'assistant',
      content: fullResponse,
      timestamp: new Date(),
    });

    chat.updatedAt = new Date();
    await chat.save();

    res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
    res.end();

  } catch (error) {
    console.error('Stream chat error:', error);
    res.write(`data: ${JSON.stringify({ error: 'An error occurred' })}\n\n`);
    res.end();
  }
});

// GET /api/chat/history/:sessionId - Get chat history
router.get('/history/:sessionId', async (req, res) => {
  try {
    const { sessionId } = req.params;
    const chat = await Chat.findOne({ sessionId });

    if (!chat) {
      return res.json({
        success: true,
        messages: []
      });
    }

    res.json({
      success: true,
      messages: chat.messages
    });

  } catch (error) {
    console.error('Error fetching chat history:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch chat history'
    });
  }
});

export default router;