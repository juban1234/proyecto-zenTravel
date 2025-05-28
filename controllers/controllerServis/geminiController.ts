import { Request, Response } from "express";
import { getResponseFromAIZenTravel } from "../../services/geminiServi";

export const PreguntarAI = async (req: Request, res: Response) => {
  try {
    const { pregunta } = req.body;

    if (!pregunta) {
      return res.status(400).json({ error: "Se requiere una pregunta en el cuerpo de la solicitud." });
    }

    const respuesta = await getResponseFromAIZenTravel(pregunta);
    res.status(200).json({ respuesta });

  } catch (error: any) {
    console.error("Error en endpoint:", error?.message || error);
    res.status(500).json({ error: "Error al obtener la respuesta de la IA." });
  }
};
