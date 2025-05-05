import { Request, Response } from "express";
import Package from "../../Dto/Paquete";
import usuarioRepo from "../../repositories/usuarioRepo";

export const createPackage = async (req: Request, res: Response) => {
    try {
        const {
            nombrePaquete,
            descripcion,
            precioTotal,
            imagenUrl,
            duracionDias,
            fechaInicioDisponible,
            fechaFinDisponible,
            descuento,
            nombreHotel,
            nombreTransporte,
            nombreDestino
        } = req.body;

        const requiredFields = {
            nombrePaquete,
            descripcion,
            precioTotal,
            imagenUrl,
            duracionDias,
            fechaInicioDisponible,
            fechaFinDisponible,
            descuento,
            nombreHotel,
            nombreTransporte,
            nombreDestino
        };

        for (const [key, value] of Object.entries(requiredFields)) {
            if (value === undefined || value === null || value === "") {
                return res.status(400).json({ error: `El campo ${key} es obligatorio` });
            }
        }

        const newPackage = new Package(
            0, 
            nombrePaquete,
            descripcion,
            precioTotal,
            imagenUrl,
            duracionDias,
            new Date(fechaInicioDisponible),
            new Date(fechaFinDisponible),
            descuento,
            nombreHotel,
            nombreTransporte,
            nombreDestino
        );

        const resultado = await usuarioRepo.createPackage(newPackage);

        if (resultado && resultado.length > 0) {
            const idPaqueteCreado = resultado[0].id_paquete_creado;

            return res.status(201).json({
                status: "Paquete creado exitosamente",
                id_paquete: idPaqueteCreado
            });
        }

        return res.status(400).json({ status: "Error al crear el paquete" });
    } catch (error: any) {
        console.error(" Error al crear el paquete:", error);
        return res.status(500).json({ error: "Error en el servidor" });
    }
};






