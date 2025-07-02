import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import db from "../configs/config";
import { RowDataPacket } from "mysql2";
import { guardarEnMemoria, buscarRespuestaPrevia } from "../services/memoriaServi";
import { clasificarIntencionConIA } from "../Intents/geminiClasificador";
import { consultarBDPorIntencion } from "../Intents/geminiIntent";

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) throw new Error("GEMINI_API_KEY no está definida en el archivo .env");

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

const prompt = `
Eres un asistente experto en turismo, cultura, gastronomía y planificación de viajes en Colombia. 
Responde preguntas relacionadas con lugares turísticos, actividades, historia, tradiciones culturales, música, danza, artesanía, gastronomía y recomendaciones personalizadas de viaje en todo el país.

Ayuda a los usuarios a armar planes de viaje con estimaciones aproximadas de presupuesto por departamento o ciudad colombiana. Incluye sugerencias sobre alojamiento, transporte, alimentación, actividades culturales o recreativas.

Asume que cualquier pregunta que te hagan está relacionada con un interés en viajar por Colombia, incluso si no se menciona explícitamente un lugar o palabra clave. No necesitas justificar tu conocimiento ni mencionar que eres una IA, simplemente responde como un experto en turismo colombiano.

Evita el uso de asteriscos o formatos innecesarios. Sé claro, útil y directo.
`.trim();

// 🔮 Lógica principal
export const getResponseFromAIZenTravel = async (
  ZenIA: string,
  id_usuario: number
): Promise<{ tipo: string; datos: any }> => {
  try {
    console.log("📝 Pregunta:", ZenIA);
    console.log("👤 Usuario:", id_usuario);

    // 1. Verificar si ya se respondió algo similar
    const respuestaPrev = await buscarRespuestaPrevia(id_usuario, ZenIA);
    if (respuestaPrev) {
      console.log("📦 Respuesta desde memoria");
      return { tipo: "memoria", datos: respuestaPrev };
    }

    // 2. Clasificar intención
    const tipoDestino = await clasificarIntencionConIA(ZenIA);
    console.log("🎯 Intención detectada por IA:", tipoDestino);

    // 3. Buscar en la base de datos según la intención
    const resultadoBD = await consultarBDPorIntencion(tipoDestino);
    console.log("📊 Resultado BD:", resultadoBD);

    if (resultadoBD && resultadoBD.datos && resultadoBD.datos.length > 0) {
      await guardarEnMemoria(id_usuario, resultadoBD.tipo, JSON.stringify(resultadoBD.datos[0]), ZenIA);
      return resultadoBD;
    }

    // 4. Si no hay datos en BD, usar Gemini
    console.log("🤖 Consultando a Gemini...");
    const result = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `${prompt}\n\nPregunta del usuario: ${ZenIA}`,
            },
          ],
        },
      ],
    });

    const rawText = result?.candidates?.[0]?.content?.parts?.[0]?.text || "";
    const respuestaLimpia = smartTruncateText(cleanResponseText(rawText), 1500);

    await guardarEnMemoria(id_usuario, "ia", respuestaLimpia, ZenIA);
    return { tipo: "ia", datos: respuestaLimpia };

  } catch (error: any) {
    console.error("🔥 ERROR DETALLADO:", error);
    return {
      tipo: "error",
      datos: "Lo siento, ocurrió un error interno al procesar tu solicitud. Intenta con otra pregunta o más detalles."
    };
  }
};
