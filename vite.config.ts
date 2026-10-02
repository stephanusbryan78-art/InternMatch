import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, Plugin } from 'vite';

function geminiApiPlugin(): Plugin {
  return {
    name: 'gemini-api-endpoint',
    configureServer(server) {
      server.middlewares.use('/api/ai/career-assistant', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.end(JSON.stringify({ error: 'Method not allowed' }));
          return;
        }

        let body = '';
        req.on('data', chunk => {
          body += chunk;
        });
        req.on('end', async () => {
          try {
            const { message, context, mode } = JSON.parse(body || '{}');
            const apiKey = process.env.GEMINI_API_KEY;

            if (apiKey) {
              const { GoogleGenAI } = await import('@google/genai');
              const ai = new GoogleGenAI();

              const systemInstruction = `You are InternMatch AI Career Assistant, an expert career copilot and mentor built into InternMatch for vocational students (SMK), polytechnic students, and early-career vocational graduates.
InternMatch Core Philosophy: DISCOVER → MATCH → WORK → PROVE → GROW.
Your functions:
1. CV & Portfolio Review: actionable critique, bullet point enhancements.
2. Interview Preparation: realistic mock questions for SMK/vocational roles (Technical, Soft Skills, Situational).
3. Skill Gap Analysis: identifying exact skills needed for target opportunities.
4. Profile Improvement: recommendations to boost profile completion & reputation.
5. Opportunity Guidance: helping talent understand match scores and why an opportunity fits them.

User Context:
${JSON.stringify(context || {})}

Guidelines:
- Provide highly practical, structured advice with bullet points and bold highlights.
- Maintain an encouraging, empowering tone.
- Respond in Indonesian (Bahasa Indonesia) by default (or English if prompted in English).`;

              const response = await ai.models.generateContent({
                model: 'gemini-3.8-flash',
                contents: message || 'Bantu saya meninjau profil dan karier vokasi saya.',
                config: {
                  systemInstruction,
                },
              });

              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ reply: response.text }));
              return;
            }

            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ fallback: true, message: 'No GEMINI_API_KEY configured, using local mentor engine.' }));
          } catch (err: any) {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ fallback: true, error: err?.message || 'Server error' }));
          }
        });
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), geminiApiPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(process.cwd(), '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
