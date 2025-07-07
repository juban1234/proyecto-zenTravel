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

export const SearchHotel = async (req: Request, res: Response) => {
    
    try {
        const hoteles = await searchRepo.buscarHoteles();

        if (!hoteles) {
            return res.status(404).json({ message: "No se encontró ningúna habitacion de hotel ." });
        }

        return res.status(200).json({
            status: `hoteles encontrados`,
            hoteles
        });
    } catch (error) {
        console.error("Error al buscar hotel por nombre:", error);
        return res.status(500).json({ error: "Error del servidor." });
    }
};

export const SearchTranport = async(req: Request, res: Response) => {
    try {
        
        const result = await searchRepo.buscartransporte()
        if(!result) {
            res.status(400).json({ status: `no se encontro ninigun tranporte disponible` })
        }

        return res.status(300).json({
            status: `tranportes encontrados`,
            result
        })

    } catch (error) {
        
    }
}

export const SearchTransporteByName = async (req: Request, res: Response) => {
    try {

        const {origen,destino} = req.params;


        const transport = await searchRepo.buscartransportePorNombre(origen,destino);

        if (transport.length === 0) {
            return res.status(404).json({ message: "No se encontró ningún Transporte " });
        }

        return res.status(200).json(transport);
    } catch (error) {
        console.error("Error al buscar transporte:", error);
        return res.status(500).json({ error: "Error del servidor." });
    }
};

export const buscar_habitacion = async(req: Request, res: Response) => {
   const {hotel} = req.params;

    try {
        const result = await searchRepo.traerHabitaciones(hotel);

        if (!result) {
            return res.status(404).json({ message: "No se encontró ningúna habitacion de hotel ." });
        }

        return res.status(200).json({
            status: `habitaciones del hotel: ${hotel} encontrados`,
            result
        });

    } catch (error) {
        console.error("Error al buscar habitacionel del hotel: ", error);
        return res.status(500).json({ error: "Error del servidor al momento de buscar habitaciones de hotel." });
    }
}




