import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
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

const formatearRespuesta = (tipo: string, datos: any): string => {
  switch (tipo) {
    case "destinos":
      return (datos as any[])
        .map(d => `• ${d.nombre}: ${d.descripcion}`)
        .join("\n\n");

    case "hoteles":
      return (datos as any[])
        .map(h => `• ${h.nombre} en ${h.ciudad} ${h.descripcion} ubicado en ${h.ubicacion} ${h.imagenes}`)
        .join("\n");

    case "paquetes":
      return (
        "✨ Aquí tienes algunos paquetes recomendados:\n\n" +
        (datos as any[])
          .slice(0, 3)
          .map(p =>
            `📦 Paquete: ${p.nombre}\n` +
            `📍 Destino: ${p.destino} desde ${p.origen}\n` +
            `🏨 Hotel: ${extraerNombreHotel(p.descripcion)}\n` +
            `📅 Duración: ${p.duracionDias} días\n` +
            `📆 Fecha de salida: ${formatearFecha(p.fechaInicio)}\n` +
            `💰 Precio: COP ${p.precio.toLocaleString()}\n` +
            `⭐ Calificación: ${p.calificacion}\n` +
            `📌 Estado: ${p.estado}`
          )
          .join("\n\n") +
        `\n\n¿Te gustaría más detalles o ver otros paquetes similares? 🧳`
      );

    case "transporte":
      return (datos as any[])
        .map(t => `• ${t.tipo} con ${t.empresa} de ${t.origen} a ${t.destino} (sale ${new Date(t.salida).toLocaleString()})`)
        .join("\n");

    case "memoria":
    case "ia":
    case "error":
      return datos as string;

    default:
      return typeof datos === "string" ? datos : JSON.stringify(datos, null, 2);
  }
};

const extraerNombreHotel = (descripcion: string): string => {
  const match = descripcion.match(/hotel\s([^\.,\n]+)/i);
  return match ? match[0].trim() : "Hotel incluido";
};

const formatearFecha = (fecha: string | Date): string => {
  const d = new Date(fecha);
  return d.toLocaleDateString("es-CO", { day: "2-digit", month: "short", year: "numeric" });
};

const prompt = `
Eres un asistente experto en turismo, cultura, gastronomía y planificación de viajes en Colombia. 
Responde preguntas relacionadas con lugares turísticos, actividades, historia, tradiciones culturales, música, danza, artesanía, gastronomía y recomendaciones personalizadas de viaje en todo el país.
Ayuda a los usuarios a armar planes de viaje con estimaciones aproximadas de presupuesto por departamento o ciudad colombiana. Incluye sugerencias sobre alojamiento, transporte, alimentación, actividades culturales o recreativas.
Asume que cualquier pregunta que te hagan está relacionada con un interés en viajar por Colombia, incluso si no se menciona explícitamente un lugar o palabra clave. No necesitas justificar tu conocimiento ni mencionar que eres una IA, simplemente responde como un experto en turismo colombiano.
Evita el uso de asteriscos o formatos innecesarios tales como comillas, llaves y todo tipo de formatos que no sean realmente necesarios. Sé claro, útil y directo.
Si la pregunta no está relacionada con turismo , la cultura y demas campos relacionados en Colombia, responde amablemente que tu enfoque es el turismo en Colombia y que no puedes ayudar con esa solicitud, sin ofrecer más detalles ni especular.
`.trim();

export const getResponseFromAIZenTravel = async (
  ZenIA: string,
  id_usuario: number
): Promise<{ tipo: string; datos: any }> => {
  try {
    const respuestaMemoria = await buscarRespuestaPrevia(id_usuario, ZenIA);
    if (respuestaMemoria) {
      const texto = formatearRespuesta("memoria", respuestaMemoria);
      return { tipo: "memoria", datos: texto };
    }

    let tipo = await clasificarIntencionConIA(ZenIA);
    let resultadoBD = await consultarBDPorIntencion(tipo);

    // 👉 Si es 'sal_del_contexto' o no hay datos, responde con IA
    if (tipo === "sal_del_contexto" || !resultadoBD?.datos || resultadoBD.datos.length === 0) {
      const aiResponseContent = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: [{ role: "user", parts: [{ text: `${prompt}\n\nPregunta del usuario: ${ZenIA}` }] }],
      });

      const rawText = aiResponseContent?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Lo siento, mi enfoque es el turismo en Colombia y no puedo ayudarte con esa solicitud.";

      const respuestaLimpia = smartTruncateText(cleanResponseText(rawText), 1500);
      await guardarEnMemoria(id_usuario, "ia", respuestaLimpia, ZenIA);
      const textoIA = formatearRespuesta("ia", respuestaLimpia);
      return { tipo: "ia", datos: textoIA };
    }

    // 👉 Verificación de integridad de datos después de asegurarte que sí hay datos
    if (!resultadoBD || !resultadoBD.tipo || !Array.isArray(resultadoBD.datos)) {
      throw new Error("Respuesta de base de datos malformada");
    }

    // 👉 Si la BD tuvo un resultado válido, lo usas.
    const texto = formatearRespuesta(resultadoBD.tipo, resultadoBD.datos);
    await guardarEnMemoria(id_usuario, resultadoBD.tipo, texto, ZenIA);
    return { tipo: resultadoBD.tipo, datos: texto };  

  } catch (error: any) {
    console.error("🔥 ERROR DETALLADO en getResponse:", error);
      if (error.code === 'ER_BAD_FIELD_ERROR') {
        return { tipo: "error", datos: "Error en los campos al consultar la base de datos" };
      }

    return {
      tipo: "error",
      datos: "Lo siento, ocurrió un error interno al procesar tu solicitud."
    };
  }
};