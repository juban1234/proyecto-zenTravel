import { Request, Response } from "express";
import usuarioServi from "../../services/usuarioServi";


export const createPackage = async (req: Request, res: Response) => {

    try {
        
        
    } catch (error: any) {
        console.error("❌ Error al crear el paquete:", error);
        return res.status(500).json({ error: "Error en el servidor" });
        
    }
}