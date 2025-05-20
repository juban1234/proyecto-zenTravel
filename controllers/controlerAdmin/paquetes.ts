import { Request, Response } from "express";
import admin from "../../repositories/adminRepo";
import { Destino } from "../../Dto/SearchDto";

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