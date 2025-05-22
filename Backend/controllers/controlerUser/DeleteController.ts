import { Request, Response } from "express";   
import usuarioRepo from "../../repositories/usuarioRepo";

export const deletePaquete = async (req: Request, res: Response): Promise<Response> => { 
    try {
       
        const id_paquete = Number(req.params.id_paquete);

        console.log("Datos recibidos:", {id_paquete });

        if (!id_paquete || isNaN(id_paquete)) {
            return res.status(400).json({ error: "ID de paquete no proporcionado o inválido" });
        }

        const resultado = await usuarioRepo.eliminarPaquete(id_paquete);

        if (resultado.affectedRows === 0) {
            return res.status(404).json({ error: "Paquete no encontrado o ya eliminado" });
        }

        console.log("Paquete eliminado con éxito:", resultado);

        return res.status(200).json({ status: "Paquete eliminado con éxito" });

    } catch (error: any) {
        console.error("Error al eliminar paquete:", error);
        return res.status(500).json({ error: "Ocurrió un error al eliminar el paquete" });
    }
}

export const deleteDestino = async (req: Request, res: Response): Promise<Response> => {

     try {
       
        const id_destino = Number(req.params.id_destino);

        console.log("Datos recibidos:", {id_destino});

        if (!id_destino || isNaN(id_destino)) {
            return res.status(400).json({ error: "ID de destino no proporcionado o inválido" });
        }

        const resultado = await usuarioRepo.eliminarDestino(id_destino);

        if (resultado.affectedRows === 0) {
            return res.status(404).json({ error: "Destino no encontrado o ya eliminado" });
        }

        console.log("Destino eliminado con éxito:", resultado);

        return res.status(200).json({ status: "Destino eliminado con éxito" });

    } catch (error: any) {
        console.error("Error al eliminar destino:", error);
        return res.status(500).json({ error: "Ocurrió un error al eliminar el destino" });
    }

   
}

 export const deleteHotel = async (req: Request, res: Response): Promise<Response> => {

    
     try {
       
        const id_hotel = Number(req.params.id_hotel);

        console.log("Datos recibidos:", {id_hotel});

        if (!id_hotel || isNaN(id_hotel)) {
            return res.status(400).json({ error: "ID del hotel no proporcionado o inválido" });
        }

        const resultado = await usuarioRepo.eliminarHotel(id_hotel);

        if (resultado.affectedRows === 0) {
            return res.status(404).json({ error: "Hotel no encontrado o ya eliminado" });
        }

        console.log("Hotel eliminado con éxito:", resultado);

        return res.status(200).json({ status: "Hotel eliminado con éxito" });

    } catch (error: any) {
        console.error("Error al eliminar Hotel:", error);
        return res.status(500).json({ error: "Ocurrió un error al eliminar el Hotel" });
    }

 }