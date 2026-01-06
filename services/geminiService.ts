
import { GoogleGenAI, Chat, Type } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";
import { CandidateProfile, EvaluationReport, Message } from "../types";

export class GeminiService {
  private ai: GoogleGenAI;
  private chat: Chat | null = null;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }

  async startInterview(profile: CandidateProfile) {
    this.chat = this.ai.chats.create({
      model: 'gemini-3-pro-preview',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.1, // Near-zero temperature for maximum consistency and cold assessment
      },
    });

    const initialMessage = `Field: ${profile.field}, Specialization: ${profile.specialization}, Level: ${profile.level}. Greet them and ask the first short question immediately.`;
    const response = await this.chat.sendMessage({ message: initialMessage });
    return response.text || "";
  }

  async sendMessage(message: string): Promise<string> {
    if (!this.chat) throw new Error("Chat not initialized");
    const response = await this.chat.sendMessage({ message });
    return response.text || "";
  }

  async generateReport(profile: CandidateProfile, messages: Message[]): Promise<EvaluationReport> {
    const reportPrompt = `AUDIT REPORT:
    1. AI DETECTION: Scrutinize all candidate answers. If any answer contains academic phrasing, perfect structure, or LLM signatures, mark "No Hire" with 100% confidence.
    2. COPY-PASTE CHECK: Does any answer look like it was taken from a textbook or documentation?
    3. REJECTION CRITERIA: AI usage or copying is an automatic failure.
    4. QUALITY: Assess technical accuracy only if human authenticity is verified.
    
    Output JSON format only:
    {
      "technicalCompetency": {
        "strengths": ["string"],
        "weaknesses": ["string"],
        "depth": "Low" | "Medium" | "High"
      },
      "problemSolving": "Blunt assessment of their logic.",
      "communication": "Blunt review of clarity.",
      "redFlags": ["MANDATORY: List any suspicion of AI or copying here"],
      "score": number (1-10),
      "recommendation": "Strong Hire" | "Hire" | "Borderline" | "No Hire",
      "suggestions": "Blunt, un-sugarcoated advice."
    }`;

    const contents = messages.map(m => ({
      role: m.role,
      parts: [{ text: m.text }]
    }));
    contents.push({ role: 'user', parts: [{ text: reportPrompt }] });

    const response = await this.ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            technicalCompetency: {
              type: Type.OBJECT,
              properties: {
                strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
                weaknesses: { type: Type.ARRAY, items: { type: Type.STRING } },
                depth: { type: Type.STRING, enum: ['Low', 'Medium', 'High'] }
              },
              required: ['strengths', 'weaknesses', 'depth']
            },
            problemSolving: { type: Type.STRING },
            communication: { type: Type.STRING },
            redFlags: { type: Type.ARRAY, items: { type: Type.STRING } },
            score: { type: Type.NUMBER },
            recommendation: { type: Type.STRING, enum: ['Strong Hire', 'Hire', 'Borderline', 'No Hire'] },
            suggestions: { type: Type.STRING }
          },
          required: ['technicalCompetency', 'problemSolving', 'communication', 'redFlags', 'score', 'recommendation', 'suggestions']
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("Report generation failed");
    return { profile, ...JSON.parse(text) };
  }
}

export const geminiService = new GeminiService();
