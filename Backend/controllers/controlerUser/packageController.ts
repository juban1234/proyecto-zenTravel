import { Request, Response } from "express";
import Package from "../../Dto/Paquete";
import usuarioRepo from "../../repositories/usuarioRepo";
import cloudinary from '../../configs/cloudinary';
import upload from '../../configs/multer';
import fs from 'fs';
import { promisify } from 'util';

const uploadSingle = promisify(upload.single('imagen'));

export const createPackage = async (req: Request, res: Response): Promise<Response> => {
    try {
        await uploadSingle(req, res);

        const id_usuario = (req as any).user?.id;
        if (!id_usuario) {
            return res.status(401).json({ error: 'Usuario no autenticado' });
        }

        const {
            nombrePaquete,
            descripcion,
            duracionDias,
            fechaInicioDisponible,  
            descuento,
            nombreHotel,
            nombreTransporte,
            nombreDestino,
            categoria,
            incluye,
            noIncluye
        } = req.body;

        if (!req.file) {
            return res.status(400).json({ error: 'La imagen es requerida' });
        }

        const resultado = await cloudinary.uploader.upload(req.file.path);
        const imagenUrl = resultado.secure_url;
        fs.unlinkSync(req.file.path);

        const campos = {
            nombrePaquete,
            descripcion,
            duracionDias,
            fechaInicioDisponible,
            descuento,
            nombreHotel,
            nombreTransporte,
            nombreDestino,
            categoria,
            incluye,
            noIncluye
        };

        for (const [campo, valor] of Object.entries(campos)) {
            if (!valor || (typeof valor === 'string' && valor.trim() === '')) {
                return res.status(400).json({ error: `El campo '${campo}' es requerido y no puede estar vacío` });
            }
        }

        const duracion = parseInt(duracionDias);
        const desc = parseFloat(descuento);
        const fechaInicio = new Date(fechaInicioDisponible);


        if (isNaN(duracion) || duracion <= 0) {
            return res.status(400).json({ error: 'duracionDias debe ser un número entero positivo' });
        }

        if (isNaN(desc) || desc < 0 || desc > 100) {
            return res.status(400).json({ error: 'descuento debe ser un número entre 0 y 100' });
        }

        if (isNaN(fechaInicio.getTime())) {
            return res.status(400).json({ error: 'fechaInicioDisponible no es una fecha válida' });
        }

        const dto = new Package(
            nombrePaquete,
            descripcion,
            imagenUrl,
            duracion,
            fechaInicio,
            desc,
            nombreHotel,
            nombreTransporte,
            nombreDestino,
            categoria,
            incluye,
            noIncluye
        );

        const resultadoDB = await usuarioRepo.createPackage(dto, id_usuario);

        const paqueteCreado = {
            idPaquete: resultadoDB.insertId || resultadoDB.id_paquete || null,
            id_usuario,
            nombrePaquete,
            descripcion,
            imagenUrl,
            duracionDias: duracion,
            fechaInicioDisponible: fechaInicio,
            descuento: desc,
            nombreHotel,
            nombreTransporte,
            nombreDestino,
            categoria,
            incluye,
            noIncluye
        };

        return res.status(201).json({
            status: 'Paquete creado con éxito',
            data: paqueteCreado
        });

   } catch (error: any) {
    console.error('❌ Error al crear el paquete:', error.message || error);
    return res.status(500).json({ error: error.message || 'Error en el servidor' });
}

};

export const valuePackage = async (req: Request, res: Response) => {
    try {
        const { id_paquete } = req.body;  

        if (!id_paquete || isNaN(Number(id_paquete))) {
            return res.status(400).json({ error: "El id_paquete es requerido y debe ser un número válido" });
        }

        const paquete = await usuarioRepo.getPackageById(Number(id_paquete));
        return res.status(200).json({
            status:"Paquete actualizado",
    });
    } catch (error) {
        console.error("Error al calcular el total del paquete:", error);
        return res.status(500).json({ error: "Error en el servidor" });
    }


};

export const actualizarPaquete = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id_paquete } = req.params;
        const {
            nombrePaquete,
            descripcion,
            imagenUrl,
            duracionDias,
            fechaInicio,
            descuento
        } = req.body;

        if (
            !id_paquete ||
            !nombrePaquete ||
            !descripcion ||
            !imagenUrl ||
            !duracionDias ||
            !fechaInicio ||
            !descuento
        ) {
            return res.status(400).json({ error: "Todos los campos son requeridos." });
        }

        const paqueteActualizado = {
            id_paquete: Number(id_paquete),
            nombrePaquete,
            descripcion,
            imagenUrl,
            duracionDias,
            fechaInicio,
            descuento
        };

        const resultado = await usuarioRepo.actualizarPaquete(paqueteActualizado);

        if (resultado.affectedRows === 0) {
            return res.status(404).json({ error: "Paquete no encontrado o no actualizado." });
        }

        return res.status(200).json({ status: "Paquete actualizado con éxito" });
    } catch (error) {
        console.error("Error al actualizar el paquete:", error);
        return res.status(500).json({ error: "Ocurrió un error al actualizar el paquete" });
    }
}







