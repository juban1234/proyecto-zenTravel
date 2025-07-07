import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import db from "../configs/config";
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

// 🔧 Helper que formatea los datos según tipo
const formatearRespuesta = (tipo: string, datos: any): string => {
  switch (tipo) {
    case "destinos":
      return (datos as any[])
        .map(d => `• ${d.nombre}: ${d.descripcion}`)
        .join("\n\n");

    case "hoteles":
      return (datos as any[])
        .map(h => `• ${h.nombre} en ${h.ciudad}`)
        .join("\n");

    case "paquetes":
      return (datos as any[])
        .map(p => `• ${p.nombre}: ${p.descripcion} (COP ${p.precio.toLocaleString()})`)
        .join("\n\n");

    case "transporte":
      return (datos as any[])
        .map(t => `• ${t.tipo} con ${t.empresa} de ${t.origen} a ${t.destino} (sale ${new Date(t.salida).toLocaleString()})`)
        .join("\n");

    case "memoria":
    case "ia":
    case "error":
      // texto ya limpio
      return datos as string;

    default:
      return typeof datos === "string" ? datos : JSON.stringify(datos, null, 2);
  }
};

const prompt =
  "Eres un asistente experto en turismo, cultura, gastronomía y planificación de viajes en Colombia. Responde preguntas relacionadas con lugares turísticos, actividades, historia, tradiciones culturales, música, danza, artesanía, gastronomía y recomendaciones personalizadas de viaje en todo el país."

"Ayuda a los usuarios a armar planes de viaje con estimaciones aproximadas de presupuesto por departamento o ciudad colombiana. Incluye sugerencias sobre alojamiento, transporte, alimentación, actividades culturales o recreativas."

"Asume que cualquier pregunta que te hagan está relacionada con un interés en viajar por Colombia, incluso si no se menciona explícitamente un lugar o palabra clave. No necesitas justificar tu conocimiento ni mencionar que eres una IA, simplemente responde como un experto en turismo colombiano."

"Evita el uso de asteriscos o formatos innecesarios. Sé claro, útil y directo."
  .trim();

export const getResponseFromAIZenTravel = async (
  ZenIA: string,
  id_usuario: number
): Promise<{ tipo: string; datos: any }> => {
  try {
    // 1. Verificar memoria
    const prev = await buscarRespuestaPrevia(id_usuario, ZenIA);
    if (prev) {
      const texto = formatearRespuesta("memoria", prev);
      return { tipo: "memoria", datos: texto };
    }

    // 2. Clasificar e intentar BD
    const tipo = await clasificarIntencionConIA(ZenIA);
    const resultadoBD = await consultarBDPorIntencion(tipo);
    if (resultadoBD && resultadoBD.datos?.length) {
      const texto = formatearRespuesta(resultadoBD.tipo, resultadoBD.datos);
      await guardarEnMemoria(id_usuario, resultadoBD.tipo, texto, ZenIA);
      return { tipo: resultadoBD.tipo, datos: texto };
    }

    // 3. Fallback a Gemini
    const raw = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [{ role: "user", parts: [{ text: `${prompt}\n\nPregunta del usuario: ${ZenIA}` }] }],
    });
    const respuestaIA = smartTruncateText(cleanResponseText(raw?.candidates?.[0]?.content?.parts?.[0]?.text || ""), 1500);
    await guardarEnMemoria(id_usuario, "ia", respuestaIA, ZenIA);

    const textoIA = formatearRespuesta("ia", respuestaIA);
    return { tipo: "ia", datos: textoIA };

  } catch (error: any) {
    console.error("🔥 ERROR DETALLADO en getResponse:", error);
    const mensaje = "Lo siento, ocurrió un error interno al procesar tu solicitud.";
    return { tipo: "error", datos: mensaje };
  }
};
