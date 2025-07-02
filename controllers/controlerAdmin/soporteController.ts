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

