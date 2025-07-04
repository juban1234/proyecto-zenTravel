import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();

const apiKey = process.env.GEMINI_API_KEY!;
const ai = new GoogleGenAI({ apiKey });

export const clasificarIntencionConIA = async (pregunta: string): Promise<string> => {
  try {
    const prompt = `
Clasifica la siguiente intención del usuario en una sola palabra clave sin justificar nada.

Usa solo una de las siguientes categorías si es posible:
- destinos_playa
- destinos_naturaleza
- destinos_cultural
- hoteles
- paquetes
- transporte
- destinos_románticos
- destinos_historia
- destinos_montaña
- recomendaciones_personalizadas

Ejemplo:
Pregunta: Quiero ir al mar → Respuesta: destinos_playa
Pregunta: Me gustan los paisajes de montaña → Respuesta: destinos_montaña
Pregunta: Busco algo romántico → Respuesta: destinos_románticos

Pregunta: ${pregunta}
`;

    const result = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    const texto = result?.candidates?.[0]?.content?.parts?.[0]?.text?.trim().toLowerCase() || "general";
    return texto.replace(/\s+/g, "_");
  } catch (error) {
    console.error("Error en clasificador IA:", error);
    return "general";
  }
};
