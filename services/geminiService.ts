
import { GoogleGenAI, Type } from "@google/genai";
import { UserProfile } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getAIResponse = async (prompt: string, history: { role: string; content: string }[], profile: UserProfile) => {
  const personaInstruction = profile.aiPersona === 'Crítico/Arrogante' 
    ? "Você é a IA Lulenge. Seja extremamente crítico, direto e até um pouco arrogante sobre a performance do usuário. Não aceite desculpas."
    : "Você é a IA Lulenge. Seja amigável, encorajadora e analítica, agindo como um mentor de alta performance.";

  const customPrompt = profile.customAiPrompt ? `\n\nINSTRUÇÃO ADICIONAL DO USUÁRIO: ${profile.customAiPrompt}` : "";
  const roleInstruction = `\nO usuário é um ${profile.role}.`;
  const langInstruction = profile.language === 'en-US' ? "Respond only in English." : "Responda apenas em Português.";

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        { role: 'user', parts: [{ text: `System context: User is a ${profile.workType} expert. ${personaInstruction}${roleInstruction}${customPrompt} ${langInstruction}` }] },
        ...history.map(h => ({
          role: h.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: h.content }]
        })),
        { role: 'user', parts: [{ text: prompt }] }
      ],
      config: {
        temperature: 0.8,
      }
    });

    return response.text || "...";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Erro ao conectar com o nó neural Lulenge.";
  }
};

export const analyzeActivity = async (content: string, profile: UserProfile) => {
  const personaInstruction = profile.aiPersona === 'Crítico/Arrogante' 
    ? "Be extremely critical and arrogant." 
    : "Be encouraging and professional.";
  const langInstruction = profile.language === 'en-US' ? "Respond in English." : "Responda em Português.";

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `System context: User is a ${profile.role} (${profile.workType}). ${personaInstruction} ${langInstruction}
Analyze this activity log: "${content}". Provide a short, one-sentence feedback.`,
    });
    return response.text || "Atividade registrada.";
  } catch (error) {
    console.error("Gemini API Error (analyzeActivity):", error);
    return "Atividade sincronizada.";
  }
};

export const generateSmartGoal = async (input: string, lang: 'pt-BR' | 'en-US') => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Analise esta meta Lulenge: "${input}". Estruture os passos em ${lang === 'en-US' ? 'English' : 'Português'}.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            steps_how_to: { type: Type.ARRAY, items: { type: Type.STRING } },
            estimated_time_total: { type: Type.STRING },
            deadline: { type: Type.STRING }
          },
          required: ["title", "steps_how_to", "estimated_time_total", "deadline"]
        }
      }
    });
    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error(error);
    return null;
  }
};
