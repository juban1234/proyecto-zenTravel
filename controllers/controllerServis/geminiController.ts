import { Request, Response } from "express";
import { getResponseFromAIZenTravel } from "../../services/geminiServi";

export const PreguntarAI = async (req: Request, res: Response): Promise<void> => {
    const { Preguntar } = req.body;

    if (!Preguntar) {
        res.status(400).json({ error: "La pregunta no puede estar vacía." });
        return;
    }

    try {
        // Llama a la función del servicio que contiene toda la lógica de IA y DB
        const respuesta = await getResponseFromAIZenTravel(Preguntar);

        // Si la respuesta del servicio es el mensaje específico de "solo Colombia", envíalo con 200 OK
        if (respuesta === "Lo siento, solo puedo responder preguntas relacionadas con turismo, historia, actividades, cultura, gastronomía y detalles de Colombia y sus departamentos.") {
            res.status(200).json({ respuesta });
        } else {
            // De lo contrario, envía la respuesta de la IA normalmente
            res.status(200).json({ respuesta });
        }

    } catch (error: any) { // Captura cualquier error lanzado desde el servicio
        console.error("Error en el controlador PreguntarAI:", error); // Esto ayuda a depurar en la consola
        res.status(500).json({ error: error.message || "Error al obtener la respuesta de la IA." });
    }
};