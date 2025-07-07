import { Request, Response } from "express";
import { getResponseFromAIZenTravel } from "../../services/geminiServi";

export const ZenIA = async (req: Request, res: Response) => {
  try {
    const { ZenIA } = req.body;
    const id_usuario = (req as any).user?.id;
    if (!ZenIA || !id_usuario) {
      return res.status(400).json({ error: "Faltan parámetros ZenIA o id_usuario." });
    }

    const respuesta = await getResponseFromAIZenTravel(ZenIA, id_usuario);

    if (typeof respuesta.datos === "string") {
      return res.status(200).send(respuesta.datos);
    }
    return res.status(200).json(respuesta);

  } catch (error: any) {
    console.error("Error en ZenIA:", error);
    res.status(500).json({ tipo: "error", datos: "Error interno al procesar." });
  }
};
