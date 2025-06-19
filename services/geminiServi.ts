import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("GEMINI_API_KEY no está definida en el archivo .env");
}

const ai = new GoogleGenAI({ apiKey });

const smartTruncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  let endIndex = text.lastIndexOf('.', maxLength);
  if (endIndex === -1) endIndex = text.lastIndexOf(' ', maxLength);
  if (endIndex === -1 || endIndex < maxLength * 0.5) endIndex = maxLength;
  return text.substring(0, endIndex).trim() + '...';
};

const cleanResponseText = (text: string): string => {
  const withoutAsterisks = text.replace(/\*/g, '');
  return withoutAsterisks.replace(/(?:\r\n|\r|\n)/g, '\n').trim();
};

export const getResponseFromAIZenTravel = async (ZenIA: string): Promise<string> => {
  const prompt = `
Eres un asistente experto en turismo, cultura, gastronomía y planificación de viajes en Colombia. 
Responde preguntas relacionadas con lugares turísticos, actividades, historia, tradiciones culturales, música, danza, artesanía, gastronomía y recomendaciones personalizadas de viaje en todo el país.

Ayuda a los usuarios a armar planes de viaje con estimaciones aproximadas de presupuesto por departamento o ciudad colombiana. Incluye sugerencias sobre alojamiento, transporte, alimentación, actividades culturales o recreativas.

Asume que cualquier pregunta que te hagan está relacionada con un interés en viajar por Colombia, incluso si no se menciona explícitamente un lugar o palabra clave. No necesitas justificar tu conocimiento ni mencionar que eres una IA, simplemente responde como un experto en turismo colombiano.

Evita el uso de asteriscos o formatos innecesarios. Sé claro, útil y directo.
`.trim();

  try {
    const result = await ai.models.generateContent({
      model: "gemini-2.0-flash", // Puedes ajustar según disponibilidad
      contents: [{ role: "user", parts: [{ text: `${prompt}\n\nPregunta del usuario: ${ZenIA}` }] }],
    });

    const rawText = result?.candidates?.[0]?.content?.parts?.[0]?.text || "";
    return smartTruncateText(cleanResponseText(rawText), 1500);

  } catch (error: any) {
    console.error("Error en Gemini:", error?.message || error);
    throw new Error("Error al obtener la respuesta de la IA.");
  }
};
