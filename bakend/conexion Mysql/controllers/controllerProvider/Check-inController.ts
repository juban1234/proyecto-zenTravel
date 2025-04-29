import { Request,Response } from "express";
import Destino from "../../Dto/destino";
import Paquetes from "../../repositories/provedorRepo";


export const destino = async(req: Request, res: Response) => {
    try {
        
        const {nombre,descripcion,direccion} = req.body;
        console.log("📩 destino registrado ",req.body);
        
        const registerDestiny = await Paquetes.direccion(new Destino( nombre,direccion,descripcion ));

        console.log("destino registrado ",registerDestiny);
        
        return res.status(201).json({ status: "direccion registrada ok" });

    } catch (error:any) {
        console.error("❌ Error en la generacion de destinos:", error);
        return res.status(500).json({ error: "Error en el servidor" });
    }
}

export const hotel = async(req: Request, res: Response) =>{
    try {
        
    } catch (error:any) {
        console.error("❌ Error en la generacion de hoteles:", error);
        return res.status(500).json({error: "Error en el servidor"});
    }
}