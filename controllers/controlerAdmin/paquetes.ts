import { Request, Response } from "express";
import admin from "../../repositories/adminRepo";
import { Destino, Hotel , Transporte } from "../../Dto/SearchDto";

export const createDestino = async(req:Request , res:Response) => {
        try {
        const { pais, departamento, nombre, descripcion } = req.body;

        if (!pais || !departamento || !nombre || !descripcion) {
            return res.status(400).json({ message: "Todos los campos son requeridos." });
        }


        const nuevoDestino = new Destino(pais, departamento, nombre, descripcion);

        const resultado = await admin.añadirDestino(nuevoDestino);


        const destinoCreado = {
            pais: nuevoDestino.pais,
            departamento: nuevoDestino.departamento,
            nombre: nuevoDestino.nombre,
            descripcion: nuevoDestino.descripcion
        };

        return res.status(201).json({
            message: "Destino creado exitosamente.",
            data: destinoCreado,
            resultado
        });


    } catch (error) {
        console.error("Error al crear el destino:", error);
        return res.status(500).json({ error: "Error del servidor." });
    }

}

export const createHotel = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { nombre, descripcion, ubicacion, imagenes } = req.body;

        if (!nombre?.trim() || !descripcion?.trim() || !ubicacion?.trim()|| imagenes.length === 0) {
            return res.status(400).json({ message: "Todos los campos son requeridos " });
        }
        const nuevoHotel = new Hotel(nombre, descripcion, ubicacion, imagenes);

        const resultado = await admin.añadirHotel(nuevoHotel);


        return res.status(201).json({
            message: "Hotel creado exitosamente.",
            data: resultado,
        });
    } catch (error) {
        console.error("Error al crear el hotel:", error);
        return res.status(500).json({ message: "Ocurrió un error al intentar crear el hotel. Por favor, intente nuevamente." });
    }
};

export const createTransporte = async (req: Request , res:Response) => {
    const { tipo ,empresa ,origen ,destino ,salida ,duracion ,presio ,cantidad ,clase } = req.body;

    if (!tipo || !empresa || !origen || !destino || !salida || !duracion || !presio || !cantidad || !clase) {
        return res.status(400).json({
            status: `faltan campos para rellenar`
        })
    }

    const transporte = await admin.añadirTransporte(new Transporte(
        empresa,tipo,origen,destino,
        salida,duracion,presio,cantidad,destino
    ))

}

export const createHabitacion = async(req: Request , res:Response) => {

}
