// Intents/geminiClasificador.ts
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

export const clasificarIntencionConIA = async (pregunta: string): Promise<string> => {
  try {
    const prompt = `
Clasifica la siguiente intención del usuario en una sola palabra clave y sin justificar.

Categorías disponibles:
- destinos_playa
- destinos_naturaleza
- destinos_cultural
- destinos_general
- hoteles
- paquetes
- transporte

Si la intención no encaja con ninguna de estas, responde solamente: general.

Pregunta: ${pregunta}
`.trim();

    const result = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    const texto = result?.candidates?.[0]?.content?.parts?.[0]?.text?.trim().toLowerCase() || "general";
    
    // --- NUEVA LÍNEA PARA DEPURACIÓN ---
    console.log(`[Clasificador IA] Pregunta: "${pregunta}" -> Intención clasificada: "${texto}"`);
    // ------------------------------------

    return texto.replace(/\s+/g, "_");
  } catch (error) {
    console.error("Error en clasificador IA:", error);
    return "general";
  }
};