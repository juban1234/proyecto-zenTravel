import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

export const clasificarIntencionConIA = async (pregunta: string): Promise<string> => {
  try {
    const prompt = `
Clasifica la siguiente intención del usuario en una sola palabra clave y sin justificar. 
Las categorías deben ser en minúsculas y usar guiones bajos si son compuestas.

Categorías disponibles:
- destinos_playa
- destinos_naturaleza
- destinos_cultural
- destinos_generales
- hoteles
- paquetes
- transporte
- sal_del_contexto

Si la intención no encaja estrictamente con ninguna de estas, responde solamente: sal_del_contexto.
No respondas con "general" ni nada similar si no encaja, usa "sal_del_contexto".

Pregunta: ${pregunta}
`.trim();

    const result = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    const texto = result?.candidates?.[0]?.content?.parts?.[0]?.text?.trim().toLowerCase() || "sal_del_contexto";
    return texto.replace(/\s+/g, "_");
  } catch (error) {
    console.error("Error en clasificador IA:", error);
    return "sal_del_contexto";
  }
};