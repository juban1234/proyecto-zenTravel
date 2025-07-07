import { Request, Response } from "express";
import { getResponseFromAIZenTravel } from "../../services/geminiServi";

export const ZenIA = async (req: Request, res: Response) => {
  try {
    const { ZenIA } = req.body;
    const id_usuario = (req as any).user?.id;

    if (!ZenIA || !id_usuario) {
      return res.status(400).json({ error: "Faltan parámetros requeridos." });
    }

    const respuesta = await getResponseFromAIZenTravel(ZenIA, id_usuario);

    // Enviar solo texto si es tipo IA o memoria
    if (typeof respuesta.datos === "string") {
      return res.status(200).send(respuesta.datos);
    }

    // Si llegara como objeto estructurado
    return res.status(200).json({
      tipo: respuesta.tipo,
      datos: respuesta.datos
    });

  } catch (error: any) {
    console.error("Error en ZenIA:", error);
    return res.status(500).json({
      tipo: "error",
      datos: "Error interno al procesar la solicitud."
    });
  }
};
