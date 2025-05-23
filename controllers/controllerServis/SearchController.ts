import { Request, Response } from "express";    
import searchRepo from "../../repositories/searchRepo";

export const buscar = async (req: Request, res: Response): Promise<Response> => {
    try {
        const result = await searchRepo.buscarDestino();
        return res.status(200).json({ status: "Búsqueda exitosa", data: result });
    } catch (error) {
        console.error("Error al buscar el destino:", error);
        return res.status(500).json({ errorInfo: "Error al buscar el destino" });
    }
};

export const SearchHotelByName = async (req: Request, res: Response) => {
    
    const nombre = req.params.nombre;

    try {
        const hoteles = await searchRepo.buscarHotelPorNombre(nombre);

        if (!hoteles) {
            return res.status(404).json({ message: "No se encontró ningúna habitacion de hotel ." });
        }

        return res.status(200).json({
            status: `habitaciones encontradas del hotel: ${nombre}`,
            hoteles
        });
    } catch (error) {
        console.error("Error al buscar hotel por nombre:", error);
        return res.status(500).json({ error: "Error del servidor." });
    }
};

export const SearchTransporteByName = async (req: Request, res: Response) => {
    try {

        const transport = await searchRepo.buscartransportePorNombre();

        if (transport.length === 0) {
            return res.status(404).json({ message: "No se encontró ningún Transporte " });
        }

        return res.status(200).json(transport);
    } catch (error) {
        console.error("Error al buscar transporte:", error);
        return res.status(500).json({ error: "Error del servidor." });
    }
};





