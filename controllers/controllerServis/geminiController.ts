import { Request, Response } from "express";
import { getResponseFromAIZenTravel } from "../../services/geminiServi";

export const ZenIA = async (req: Request, res: Response) => {
  try {
    const { ZenIA } = req.body;
    const id_usuario = (req as any).user?.id;

    if (!ZenIA || !id_usuario) {
      return res.status(400).json({ error: "Faltan parámetros: 'ZenIA' o ID de usuario." });
    }

    const respuesta = await getResponseFromAIZenTravel(ZenIA, id_usuario);

    // Si la respuesta es tipo texto, mándala limpia con res.send
    if (typeof respuesta.datos === "string") {
      return res.status(200).send(respuesta.datos); // 👈 evita escapado de \n, etc.
    }

    // Fallback si viene como estructura (array u objeto)
    return res.status(200).json(respuesta);

  } catch (error: any) {
    console.error("Error en endpoint ZenIA:", error);
    return res.status(500).json({
      tipo: "error",
      datos: "Ocurrió un error interno procesando tu solicitud. Inténtalo nuevamente."
    });
  }
};
