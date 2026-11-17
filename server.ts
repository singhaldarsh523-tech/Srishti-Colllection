import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT) || 3000;

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

const ALLOWED_CHAT_MODELS = new Set([
  'gemini-4-hydrogen',
  'gemini-3.1-flash-lite',
]);

const BOUTIQUE_SYSTEM_INSTRUCTION = `You are Srishti, the personal ethnic wear stylist and concierge for Srishti Collection—a women's traditional boutique located at B Blok, 128/2, Kidwai Nagar, Kanpur, Uttar Pradesh 208011 (Phone & WhatsApp: +91 79854 55942).

Core boutique facts you must stick to accurately:
- Four signature product lines (6 curated designs each, priced between ₹4,000 and ₹25,000):
  1. Sarees (Mulberry silk, Dhakai Jamdani, hand-painted Chanderi organza, tissue silk, Patola silk)
  2. Kurtis (Block-print silk, Kantha tussar, Bandhani straight kurtis, Gota-patti A-line, Kasab embroidered, Chikankari/floral)
  3. Salwar Suits (24-panel Zardozi Anarkali, Patiala salwar suit, Jamdani palazzo suit, Zari straight cigarette suit, Mirror-work Sharara, Silk Angarkha)
  4. Unstitched Suits (3-piece dress material sets with kurta length, salwar fabric, and dupatta in Jamdani, Zari silk, Sanganeri Kota-Doria, Bandhej, and Tussar)
- Every product is sourced directly from master weaving & embroidery hubs in Kolkata, Jaipur, and Surat.
- Standard Kurti & Salwar Suit sizing (inches):
  XS (Bust 34", Waist 28", Hip 36"), S (36", 30", 38"), M (38", 32", 40"), L (40", 34", 42"), XL (42", 36", 44").
  Unstitched Suits include generous 2.5m kurta + 2.5m salwar + 2.4m dupatta fabric lengths.
- Shipping & Checkout: Complimentary insured shipping across India on orders over ₹5,000; supports UPI, Cards, Net Banking, and Cash on Delivery (₹100 COD fee).
- Keep responses warm, concise, practical, and helpful (under 140 words unless detailed outfit recommendations are requested). Never invent fake discounts or unrelated policies.`;

interface IncomingChatMessage {
  role: 'user' | 'model';
  text: string;
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '1mb' }));

  app.get('/api/maps-config', (_req, res) => {
    const apiKey =
      process.env.VITE_GOOGLE_MAPS_API_KEY ||
      process.env.GOOGLE_MAPS_API_KEY ||
      '';
    res.json({ apiKey });
  });

  app.post('/api/chat', async (req, res) => {
    try {
      const { messages, message, model } = req.body as {
        messages?: IncomingChatMessage[];
        message?: string;
        model?: string;
      };

      if (!process.env.GEMINI_API_KEY) {
        res.status(500).json({
          error:
            'Gemini API key is not configured. Please check your key in the Settings > Secrets panel.',
        });
        return;
      }

      if (!message || typeof message !== 'string' || !message.trim()) {
        res.status(400).json({ error: 'Message text is required.' });
        return;
      }

      const selectedModel =
        model && ALLOWED_CHAT_MODELS.has(model) ? model : 'gemini-4-hydrogen';

      const history = Array.isArray(messages)
        ? messages
            .filter(
              (m) =>
                (m.role === 'user' || m.role === 'model') &&
                typeof m.text === 'string' &&
                m.text.trim().length > 0
            )
            .map((m) => ({
              role: m.role,
              parts: [{ text: m.text }],
            }))
        : [];

      const chat = ai.chats.create({
        model: selectedModel,
        history,
        config: {
          systemInstruction: BOUTIQUE_SYSTEM_INSTRUCTION,
        },
      });

      const response = await chat.sendMessage({
        message: message.trim(),
      });

      res.json({
        reply: response.text ?? 'I could not generate a response right now. Please try again.',
        model: selectedModel,
      });
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : 'Unable to reach Gemini styling assistant.';
      res.status(500).json({ error: msg });
    }
  });

  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Srishti Collection server listening on port ${PORT}`);
  });
}

startServer();
