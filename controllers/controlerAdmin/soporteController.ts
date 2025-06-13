import { Request, Response } from "express";
import admin from "../../repositories/adminRepo";

export const reporte = async(req:Request , res:Response) => {
    try {
        
        const result = await admin.SoporteRepo()

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