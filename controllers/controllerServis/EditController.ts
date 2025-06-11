import { Request, Response } from "express";
import usuarioRepo from "../../repositories/usuarioRepo";
import cloudinary from "../../configs/cloudinary"; 
import upload from '../../configs/multer';
import fs from 'fs';
import { promisify } from 'util';

const uploadSingle = promisify(upload.single('imagen'));

export const Editdestino = async (req: Request, res: Response) => {
  try {
    const id_destino = Number(req.params.id_destino);

    const {
      pais,
      departamento,
      nombre,
      descripcion,
    } = req.body;

    if (
      isNaN(id_destino) ||
      !pais ||
      !departamento ||
      !nombre ||
      !descripcion
    ) {
      return res.status(400).json({
        success: false,
        message: "Todos los campos son requeridos."
      });
    }

    const result = await usuarioRepo.editardestino(id_destino,{
        pais,
      departamento,
      nombre,
      descripcion,
    });

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Destino no encontrado."
      });
    }

    return res.status(200).json({
      success: true,
      message: "Destino editado exitosamente",
      result
    });
  } catch (error: any) {
    console.error("Error al editar destino:", error);
    return res.status(500).json({
      success: false,
      message: "Error al editar el destino",
      error: error.message || "Error del servidor"
    });
  }
}

export const EditarHotel = async (req: Request, res: Response) => {

  try {
    await uploadSingle(req, res);

    const id_hotel = Number(req.params.id_hotel);


    if (!id_hotel) {
      return res.status(401).json({ error: "Usuario no autenticado" });
    }

    const {
      nombre,
      descripcion,
      ubicacion
    } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: 'La imagen es requerida' });
    }

    const imagen = await cloudinary.uploader.upload(req.file.path);
    fs.unlinkSync(req.file.path);

   const campos = {
  nombre: nombre.trim(),
  descripcion: descripcion.trim(),
  ubicacion: ubicacion.trim()
};


    for (const [campo, valor] of Object.entries(campos)) {
      if (!valor || (typeof valor === 'string' && valor.trim() === '')) {
        return res.status(400).json({ error: `El campo '${campo}' es requerido y no puede estar vacío` });
      }
    }

    const resultado = await usuarioRepo.editarHotel(id_hotel, {
      nombre,
      descripcion,
      ubicacion,
      imagenes: [imagen.secure_url]
    });

    if (!resultado) {
      return res.status(404).json({ error: "Hotel no encontrado o no actualizado" });
    }

    return res.status(200).json({
      status: "Hotel editado con éxito",
      hotel: resultado
    });

  } catch (error: any) {
    console.error("Error al editar el hotel:", error.message || error);
    return res.status(500).json({ error: "Error en el servidor" });
  }
}

