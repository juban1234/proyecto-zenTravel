// controllers/geminiController.ts
import { Request, Response } from "express";
import { getResponseFromAIZenTravel } from '../../services/geminiServices';

export const PreguntarAI = async (req: Request, res: Response): Promise<void> => {
  const { Preguntar } = req.body;
  
  try {
    const respuesta = await getResponseFromAIZenTravel(Preguntar);
    res.json({ respuesta });
  } catch (error) {
    res.status(500).json({ error: "Error al obtener la respuesta de la IA." });
  }
};
