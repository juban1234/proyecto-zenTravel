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
