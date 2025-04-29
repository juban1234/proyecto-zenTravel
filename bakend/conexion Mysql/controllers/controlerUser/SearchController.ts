import { Request, Response } from "express";    
import Search from "../../Dto/SearchDto";
import usuarioRepo from "../../repositories/usuarioRepo";

export const buscar = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { nombre = "", pais = "", direccion = "", descripcion = "" } = req.query as {
            nombre?: string;
            pais?: string;
            direccion?: string;
            descripcion?: string;
        };

        const search = new Search(nombre, pais, direccion, descripcion);

        const result = await usuarioRepo.buscarDestino(search);

        return res.status(200).json({ status: "Búsqueda exitosa", data: result });
    } catch (error) {
        console.error("Error al buscar el destino:", error);
        return res.status(500).json({ errorInfo: "Error al buscar el destino" });
    }
};



