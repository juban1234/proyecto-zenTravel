
import { Request, Response } from "express";
import { getResponseFromAIZenTravel } from "../../services/geminiServi";

export const ZenIA = async (req: Request, res: Response) => {
  try {
    const { ZenIA } = req.body;
    const id_usuario = (req as any).user?.id; // 🔐 Extraído del token

    if (!ZenIA) {
      return res.status(400).json({ error: "Se requiere una pregunta." });
    }

    if (!id_usuario) {
      return res.status(401).json({ error: "Usuario no autenticado." });
    }

    const respuesta = await getResponseFromAIZenTravel(ZenIA, id_usuario);
    res.status(200).json({ respuesta });

  } catch (error: any) {
    console.error("Error en endpoint:", error?.message || error);
    res.status(500).json({ error: "Error al obtener la respuesta de la IA." });
  }
};
