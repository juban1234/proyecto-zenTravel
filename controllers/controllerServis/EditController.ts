import { Request, Response } from "express";
import usuarioRepo from "../../repositories/usuarioRepo";
import cloudinary from "../../configs/cloudinary"; 
import upload from '../../configs/multer';
import fs from 'fs';
import { promisify } from 'util';

<<<<<<< HEAD
=======
const uploadSingle = promisify(upload.single('imagen'));

>>>>>>> origin
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

<<<<<<< HEAD

const uploadSingle = promisify(upload.single('imagen'));
=======
>>>>>>> origin
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

<<<<<<< HEAD
const uploadMultiple = promisify(upload.array('imagenes', 5));

export const EditarHabitacion = async (req: Request, res: Response) => {
  try {

    await uploadMultiple(req, res);

    const id_habitacion = Number(req.params.id_habitacion);
    if (!id_habitacion || isNaN(id_habitacion)) {
      return res.status(401).json({ error: "ID de habitación inválido o usuario no autenticado" });
    }

    const {
      tipo,
      numero,
      precio,
      disponible,
      id_hotel,
    } = req.body;

    
    const files = req.files as Express.Multer.File[];
    if (!files || files.length === 0) {
      return res.status(400).json({ error: 'Las imágenes son requeridas' });
    }

    
    const imagenes = await Promise.all(
      files.map(async (file) => {
        const uploadedImage = await cloudinary.uploader.upload(file.path);
        fs.unlinkSync(file.path);
        return uploadedImage.secure_url;
      })
    );

    const campos = {
      tipo: tipo?.trim(),
      numero: parseInt(numero),
      precio: parseFloat(precio),
      disponible: disponible.trim(),  
      id_hotel: parseInt(id_hotel),
    };

    for (const [campo, valor] of Object.entries(campos)) {
      if (
        valor === undefined ||
        valor === null ||
        (typeof valor === 'string' && valor.trim() === '') ||
        (typeof valor === 'number' && isNaN(valor))
      ) {
        return res.status(400).json({ error: `El campo '${campo}' es requerido y no puede estar vacío o inválido` });
      }
    }

    const resultado = await usuarioRepo.EditarHabitacion(id_habitacion, {
      tipo: campos.tipo!,
      numero: campos.numero!,
      precio: campos.precio!,
      disponible: campos.disponible!,
      imagenes,
    });

    if (!resultado) {
      return res.status(404).json({ error: "Habitación no encontrada o no actualizada" });
    }

    return res.status(200).json({
      status: "Habitación editada con éxito",
      habitacion: resultado,
    });

  } catch (error: any) {
    console.error("Error al editar la habitación:", error.message || error);
    return res.status(500).json({ error: "Error en el servidor" });
  }
};

    



=======
>>>>>>> origin
