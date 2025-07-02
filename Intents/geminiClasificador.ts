import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) throw new Error("GEMINI_API_KEY no está definida en el archivo .env");

const ai = new GoogleGenAI({ apiKey });

export const clasificarIntencionConIA = async (pregunta: string): Promise<string> => {
  const prompt = `
Clasifica la intención del usuario en una sola palabra clave basada en su pregunta.
Las posibles categorías son:
- "destinos_playa"
- "destinos_naturaleza"
- "destinos_cultural"
- "hoteles"
- "paquetes"
- "transporte"
- "general"

Ejemplos:
1. "Quiero visitar una playa en Santa Marta" → destinos_playa
2. "Busco un hotel en Medellín" → hoteles
3. "¿Qué paquetes tienen para San Andrés?" → paquetes
4. "Quiero viajar en bus desde Bogotá a Cali" → transporte
5. "Quiero un lugar con historia y arquitectura" → destinos_cultural
6. "Muéstrame naturaleza y montaña" → destinos_naturaleza
7. "¿Qué puedo hacer en Colombia?" → general

Clasifica la siguiente pregunta:
"${pregunta}"

Solo responde con una de las categorías sin explicación.
  `.trim();

  try {
    const result = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    const output = result?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "general";
    return output;
  } catch (error: any) {
    console.error("Error al clasificar intención con IA:", error?.message || error);
    return "general";
  }
};
