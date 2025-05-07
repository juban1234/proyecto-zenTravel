    // services/geminiService.ts
    import { GoogleGenAI } from "@google/genai";
    import dotenv from "dotenv";

    dotenv.config();

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
    throw new Error("API_KEY no está definida en el archivo .env");
    }
    const ai = new GoogleGenAI({ apiKey });

    export const getResponseFromAI = async (Preguntar: string): Promise<string> => {
    try {
        // Realizar la solicitud al modelo Gemini 2.0
        const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: Preguntar,
        });

        // Obtener la respuesta generada
        const rawText = response.text;

        // Limpiar el texto eliminando caracteres no deseados como '*'
        const cleanedText = cleanResponseText(rawText);

        return cleanedText;  // Retornar el texto limpio
    } catch (error) {
        throw new Error("Error al obtener la respuesta de la IA: " + error);
    }
    };

    // Función para limpiar el texto de caracteres no deseados
    
    const cleanResponseText = (text: string): string => {
    // Reemplazar '*' y otros caracteres no deseados
    const withoutAsterisks = text.replace(/\*/g, '');  // Elimina todos los asteriscos
    const withLineBreaks = withoutAsterisks.replace(/(?:\r\n|\r|\n)/g, '\n');  // Asegura que los saltos de línea sean uniformes
    
    return withLineBreaks;
    };
