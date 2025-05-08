import { Request, Response } from "express";    
import usuarioRepo from "../../repositories/usuarioRepo";

export const buscar = async (req: Request, res: Response): Promise<Response> => {
    try {
        // const { nombre = "", pais = "", direccion = "", descripcion = "" } = req.query as {
        //     nombre?: string;
        //     pais?: string;
        //     direccion?: string;
        //     descripcion?: string;
        // };

        // const search = new Search(nombre, pais, direccion, descripcion);

        const result = await usuarioRepo.buscarDestino();

        return res.status(200).json({ status: "Búsqueda exitosa", data: result });
    } catch (error) {
        console.error("Error al buscar el destino:", error);
        return res.status(500).json({ errorInfo: "Error al buscar el destino" });
    }
};

export const SearchHotelByName = async (req: Request, res: Response) => {
    try {

        // const { nombre } = req.params;

        // if (!nombre || nombre.trim() === "") {
        //     return res.status(400).json({ message: "El nombre del hotel es requerido." });
        // }

        const hoteles = await usuarioRepo.buscarHotelPorNombre();

        if (hoteles.length === 0) {
            return res.status(404).json({ message: "No se encontró ningún hotel." });
        }

        return res.status(200).json(hoteles);
    } catch (error) {
        console.error("Error al buscar hotel por nombre:", error);
        return res.status(500).json({ error: "Error del servidor." });
    }
};

export const SearchTransporteByName = async (req: Request, res: Response) => {
    try {

        // const { nombre } = req.params;

        // if (!nombre || nombre.trim() === "") {
        //     return res.status(400).json({ message: "El nombre del Transporte es requerido." });
        // }

        const transport = await usuarioRepo.buscartransportePorNombre();

        if (transport.length === 0) {
            return res.status(404).json({ message: "No se encontró ningún Transporte " });
        }

        return res.status(200).json(transport);
    } catch (error) {
        console.error("Error al buscar transporte:", error);
        return res.status(500).json({ error: "Error del servidor." });
    }
};





