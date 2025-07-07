import { Request, Response } from "express";
import Soporte from "../../repositories/soporteRepo";

export const reporte = async( res:Response) => {
    try {
        
        const result = await Soporte.SoporteRepo()

        if (result == null) {
            return res.status(204).json({status: `no hay reportes por completar`})
        }
        
        return res.status(200).json({
            result
        })

    } catch (error) {
        return res.status(500).json({
            status: `error al momneto de trer los las peticiones de reporte `,
            error
        })
    }
}

export const actualizar = async( req:Request , res:Response) => {
    const id_reporte = req.params.id_atencion
    const { estado , respuesta } = req.body

    if (!estado && !respuesta) {
        return res.status(400).json({message: `no hay campos para actualizar`})
    }

    try {
        
    } catch (error) {
        
    }
}

export const puntuar = async (req: Request, res: Response) => {
  const id_usuario = (req as any).user?.id;

  try {
    const { estrellas, id_hotel } = req.body;

    if (!id_hotel) {
      return res.status(400).json({ error: "El campo 'id_hotel' es obligatorio" });
    }

    const puntuacion = parseFloat(estrellas);

    if (isNaN(puntuacion)) {
      return res.status(400).json({ error: "La puntuación debe ser un número" });
    }

    if (puntuacion < 1 || puntuacion > 5) {
      return res.status(400).json({ error: "La puntuación debe estar entre 1 y 5" });
    }

    const campos = {
      puntuacion,
      id_hotel,
      id_usuario,
    };

    const result = await Soporte.PuntuacionHotel(campos);

    return res.status(201).json({
      status: "Puntuación registrada correctamente",
      promedio: result.promedio // <-- promedio actualizado desde la tabla hotel
    });

  } catch (error) {
    console.error("❌ Error en puntuar:", error);
    return res.status(500).json({
      mensaje: "Error al ingresar la puntuación",
      error: error instanceof Error ? error.message : error
    });
  }
};
