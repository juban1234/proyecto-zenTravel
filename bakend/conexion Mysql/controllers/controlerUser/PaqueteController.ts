import { Request,Response } from "express";

export const destino = async(req: Request, res: Response) =>{
    try {
        
        const {nombre,descripcion,direccion} = req.body;

    } catch (error:any) {
        console.error("❌ Error en la generacion de destinos:", error);
        return res.status(500).json({ error: "Error en el servidor" });
    }
}

