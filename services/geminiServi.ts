import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import db from "../configs/config";
import { RowDataPacket } from "mysql2";
import { guardarEnMemoria } from "../services/memoriaServi";
import { detectarIntencion } from "../Intents/geminiIntent";

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

// 🔍 Función para consultar según la intención del usuario
const consultarBDPorIntencion = async (
  intencion: string
): Promise<{ tipo: string; datos: any[] } | null> => {
  switch (intencion) {
    case "destinos_playa":
    case "destinos_naturaleza":
    case "destinos_cultural": {
      const tipo = intencion.split("_")[1];
      const [rows] = await db.query<RowDataPacket[]>(
        "SELECT nombre, descripcion, departamento, pais FROM destinos WHERE tipo = ?",
        [tipo]
      );
      return rows.length ? { tipo: "destinos", datos: rows } : null;
    }

    case "hoteles": {
      const [rows] = await db.query<RowDataPacket[]>(
        "SELECT nombre, ciudad, descripcion FROM hotel"
      );
      return rows.length ? { tipo: "hoteles", datos: rows } : null;
    }

    case "paquetes": {
      const [rows] = await db.query<RowDataPacket[]>(
        "SELECT nombrePaquete AS nombre, descripcion, precioTotal, duracionDias, fechaInicio, categoria, incluye, noIncluye, imagenUrl FROM paquete WHERE estado = 'disponible'"
      );
      return rows.length ? { tipo: "paquetes", datos: rows } : null;
    }

    case "transporte": {
      const [rows] = await db.query<RowDataPacket[]>(
        "SELECT tipo, empresa, origen, destino, fecha_salida, precio FROM transporte"
      );
      return rows.length ? { tipo: "transporte", datos: rows } : null;
    }

    default:
      return null;
  }
};

// 🧠 Consulta tradicional (opcional, aún útil)
const buscarDestinoEnBD = async (pregunta: string): Promise<any[] | string | null> => {
  const preguntaNormalizada = pregunta.toLowerCase();

  if (preguntaNormalizada.includes("destinos") || preguntaNormalizada.includes("lugares")) {
    const [destinos] = await db.query<RowDataPacket[]>("SELECT nombre, descripcion FROM destinos");
    if (destinos.length > 0) {
      return destinos.map((r) => `🌎 ${r.nombre}: ${r.descripcion}`).join("\n\n");
    }
  }

  if (preguntaNormalizada.includes("hotel") || preguntaNormalizada.includes("alojamiento")) {
    const [hoteles] = await db.query<RowDataPacket[]>("SELECT nombre, ciudad FROM hotel");
    if (hoteles.length > 0) {
      return hoteles.map((h) => `🏨 ${h.nombre} en ${h.ciudad}`).join("\n");
    }
  }

  if (preguntaNormalizada.includes("paquete") || preguntaNormalizada.includes("promoción")) {
    const [paquetesResult] = await db.query<any[][]>("CALL listarPaquetes()");
    const paquetes = paquetesResult[0];

    if (paquetes && paquetes.length > 0) {
      return paquetes.map((p: any) => ({
        nombre: p.nombrePaquete,
        descripcion: p.descripcion,
        precio: parseFloat(p.precioTotal),
        imagenUrl: p.imagenURL,
        fechaInicio: p.fechaInicio,
        duracionDias: p.duracionDias,
        estado: p.estado,
        calificacion: p.calificacion || 8.5,
      }));
    }
  }

  return null;
};

// 🚀 Función principal para responder usando IA y memoria
export const getResponseFromAIZenTravel = async (
  ZenIA: string,
  id_usuario: number
): Promise<{ tipo: string; datos: any }> => {
  const intencion = detectarIntencion(ZenIA); // ✅ detecta intención del usuario
  const resultadoBD = await consultarBDPorIntencion(intencion); // ✅ intenta responder con BD

  if (resultadoBD) {
    await guardarEnMemoria(id_usuario, resultadoBD.tipo, JSON.stringify(resultadoBD.datos[0])); // ✅ guarda el resultado
    return resultadoBD;
  }

  // 🔮 Si no hay resultados en la BD, responde la IA con Gemini
  try {
    const promptIA = `
Eres un asistente empático en turismo colombiano. Haz recomendaciones útiles basadas en preferencias previas si están disponibles.

Pregunta del usuario: ${ZenIA}
    `.trim();

    const result = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [{ role: "user", parts: [{ text: promptIA }] }],
    });

    const rawText = result?.candidates?.[0]?.content?.parts?.[0]?.text || "";
    const respuestaLimpia = smartTruncateText(cleanResponseText(rawText), 1500);

    await guardarEnMemoria(id_usuario, "ia", respuestaLimpia); // ✅ guarda también la respuesta de la IA
    return { tipo: "ia", datos: respuestaLimpia };

  } catch (error: any) {
    console.error("Error en Gemini:", error?.message || error);
    throw new Error("Error al obtener la respuesta de la IA.");
  }
};
