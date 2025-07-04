import { Request, Response } from "express";
import { getResponseFromAIZenTravel } from "../../services/geminiServi";

export const ZenIA = async (req: Request, res: Response) => {
  try {
    const id_usuario = (req as any).user.id;
    const { ZenIA } = req.body;

    console.log(id_usuario);
    

    if (!ZenIA || !id_usuario) {
      return res.status(400).json({ error: "Se requieren 'ZenIA' y 'id_usuario' en el cuerpo de la solicitud." });
    }

    const respuesta = await getResponseFromAIZenTravel(ZenIA, id_usuario);
    res.status(200).json({ respuesta });

  } catch (error: any) {
    console.error("Error en endpoint:", error?.message || error);
    res.status(500).json({ error: "Error al obtener la respuesta de la IA." });
  }
};
