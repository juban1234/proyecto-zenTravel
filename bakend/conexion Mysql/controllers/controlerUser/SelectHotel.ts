import { Request, Response } from "express";
import usuarioRepo from "../../repositories/usuarioRepo";
import dotenv from 'dotenv';
import hotel from "../../Dto/hotelDto";

dotenv.config();

export const SelectHotel = async (req: Request, res: Response) => {
    try {
        const { nombre } = req.params; 

        
        if (!hotel) {
            return res.status(400).json({ message: "El Nombre del hotel es requerido." });
        }

        const hotelDetails = await usuarioRepo.buscarHotelPornombre(nombre);
        if (!hotelDetails) {
            return res.status(404).json({ message: "El hotel no existe." });
        }
        console.log("Detalles del hotel:", hotelDetails); 
        return res.status(200).json({ hotelDetails });

}   catch (error: any) {
        console.error("Error en SelectHotel:", error);
        return res.status(500).json({ error: "Error en el servidor" });
    }
}
