import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
    throw new Error("GEMINI_API_KEY no está definida en el archivo .env");
}

const ai = new GoogleGenAI({ apiKey });

// Palabras clave generales relacionadas con Colombia para permitir la consulta
const colombiaKeywords = [
    "colombia", "turismo", "viajar", "actividades", "sitios", "lugares",
    "destinos", "visitar", "explorar", "historia", "cultura", "gastronomía",
    "departamento", "región", "municipio", "atracción", "recreación",
    "especificaciones", "detalles", "información", "naturaleza", "paisaje", "reseñas",
    "recomendaciones", "hoteles", "restaurantes", "transporte", "clima", "festividades", "tradiciones",
    "pueblo", "ciudad", "parque", "monumento", "museo", "playa", "montaña",
    "cascada", "senderismo", "aventura", "ciclismo", "caminatas",
    "folclor", "patrimonio cultural", "diversidad cultural", "identidad cultural",
    "expresiones culturales", "cosmovisión", "música", "danza", "artesanía",
    "bailes tradicionales", "instrumentos musicales", "tejidos", "cerámica",
    "platos típicos", "bebidas tradicionales", "fiestas patronales", "carnaval",
    "lenguas indígenas", "dialectos", "creencias", "religión", "vestimenta",
    "trajes típicos", "mitos", "leyendas", "cuentos tradicionales", "arquitectura tradicional",
    // Palabras clave añadidas para planificación y presupuesto
    "plan", "presupuesto", "costo", "precio", "gasto", "viaje", "organizar",
    "alojamiento", "transporte", "comida", "actividad", "excursión", "tour",
    "cuánto cuesta", "aproximado", "estimado"
];

// Verifica si la pregunta contiene palabras clave relacionadas con Colombia
const isColombiaRelated = (text: string): boolean => {
    const lowerText = text.toLowerCase();
    return colombiaKeywords.some(keyword => lowerText.includes(keyword));
};

export const getResponseFromAIZenTravel = async (Preguntar: string): Promise<string> => {
    if (!isColombiaRelated(Preguntar)) {
        return "Lo siento, solo puedo responder preguntas relacionadas con turismo, historia, actividades y detalles de Colombia y sus departamentos.";
    }

    // Instrucción de contexto para enfocar la IA en el turismo colombiano por departamento
    const prompt = `Eres un asistente experto en turismo, historia, actividades recreativas, cultura, gastronomía y **planificación de viajes con estimaciones de presupuesto** para los diferentes departamentos de Colombia. Responde preguntas detalladas sobre los lugares turísticos, actividades para hacer, información relevante, la historia, las tradiciones culturales, la música, la danza, la artesanía, la gastronomía y **ayuda a los usuarios a armar planes de viaje y obtener presupuestos aproximados** para cada departamento colombiano. Proporciona sugerencias y recomendaciones basadas en la cultura local, las festividades, los platos típicos y las experiencias auténticas que los usuarios pueden disfrutar, **incluyendo estimaciones de costos de alojamiento, transporte, alimentación y actividades.** Si la pregunta se centra en un departamento o región específica y solicita un plan o presupuesto, proporciona información detallada sobre ese lugar, incluyendo sus particularidades culturales y **posibles rangos de precios para diferentes aspectos del viaje.**\n\n${Preguntar}`;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: [{ role: "user", parts: [{ text: prompt }] }],
        });

        const rawText = response?.candidates?.[0]?.content?.parts?.[0]?.text || "";
        const cleanedText = cleanResponseText(rawText);

        return cleanedText;
    } catch (error) {
        throw new Error("Error al obtener la respuesta de la IA: " + error);
    }
};

// Limpia el texto de salida eliminando asteriscos y uniformando saltos de línea
const cleanResponseText = (text: string): string => {
    const withoutAsterisks = text.replace(/\*/g, '');
    const withLineBreaks = withoutAsterisks.replace(/(?:\r\n|\r|\n)/g, '\n');
    return withLineBreaks.trim();
};