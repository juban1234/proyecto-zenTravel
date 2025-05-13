import { Request, Response } from "express";
import { destino } from "../../Dto/destino";
import { Hotel } from "../../Dto/hotelDto"; 
import usuarioRepo from "../../repositories/usuarioRepo";

export const createDestino = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { pais, departamento, nombre, descripcion } = req.body;

        if (!pais || !departamento || !nombre || !descripcion) {
            return res.status(400).json({ message: "Todos los campos son requeridos." });
        }


        const nuevoDestino = new destino(pais, departamento, nombre, descripcion);

        const resultado = await usuarioRepo.createDestino(nuevoDestino);


        const destinoCreado = {
            id: resultado.insertId,
            pais: nuevoDestino.pais,
            departamento: nuevoDestino.departamento,
            nombre: nuevoDestino.nombre,
            descripcion: nuevoDestino.descripcion
        };

        return res.status(201).json({
            message: "Destino creado exitosamente.",
            data: destinoCreado,
        });



    } catch (error) {
        console.error("Error al crear el destino:", error);
        return res.status(500).json({ error: "Error del servidor." });
    }
};

export const createHotel = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { nombre, descripcion, ubicacion, imagenes } = req.body;

        if (!nombre?.trim() || !descripcion?.trim() || !ubicacion?.trim()|| imagenes.length === 0) {
            return res.status(400).json({ message: "Todos los campos son requeridos " });
        }
        const nuevoHotel = new Hotel(nombre, descripcion, ubicacion, imagenes);

      
        const resultado = await usuarioRepo.createHotel(nuevoHotel);

        const hotelCreado = {
            id: resultado.insertId,
            nombre: nuevoHotel.nombre,
            descripcion: nuevoHotel.descripcion,
            ubicacion: nuevoHotel.ubicacion,
            imagenes: nuevoHotel.imagenes,
        };

        return res.status(201).json({
            message: "Hotel creado exitosamente.",
            data: hotelCreado,
        });
    } catch (error) {
        console.error("Error al crear el hotel:", error);
        return res.status(500).json({ message: "Ocurrió un error al intentar crear el hotel. Por favor, intente nuevamente." });
    }
};
