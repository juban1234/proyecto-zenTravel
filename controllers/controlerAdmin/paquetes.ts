import { Request, Response } from "express";
import cloudinary from "../../configs/cloudinary"; 
import upload from "../../configs/multer";
import { promisify } from "util";
import { RequestHandler } from "express";
import fs from 'fs';
import admin from "../../repositories/adminRepo";
import { Destino, Habitacion, Hotel , Transporte } from "../../Dto/SearchDto";
import { AuthenticatedRequest } from "../../Helpers/types";

const uploadSingle = promisify(upload.single('imagen'));

export const createDestino = async(req:Request , res:Response) => {
    
    
    const { pais, departamento, nombre, descripcion } = req.body;
    
    try {

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

export const createHotel: RequestHandler = async (req, res) => {
  const reqAuth = req as AuthenticatedRequest;
  const id_usuario = reqAuth.user?.id;

  try {
    if (!id_usuario) {
      return res.status(401).json({ error: "Usuario no autenticado" });
    }

    const {
      nombre,
      descripcion,
      ubicacion,
      ciudad,
      estrellas
    } = req.body;

    const campos = { nombre, descripcion, ubicacion, ciudad, estrellas };

    for (const [campo, valor] of Object.entries(campos)) {
      if (!valor || (typeof valor === 'string' && valor.trim() === '')) {
        return res.status(400).json({ error: `El campo '${campo}' es requerido y no puede estar vacío` });
      }
    }

    // 🔍 Diagnóstico de archivos recibidos
    console.log("📥 req.files recibido:", reqAuth.files);
    console.log("🔑 Claves en req.files:", Object.keys(reqAuth.files || {}));

    if (!reqAuth.files || Object.keys(reqAuth.files).length === 0) {
      return res.status(400).json({ error: 'Se requieren imágenes del hotel y de las habitaciones' });
    }

    const files = reqAuth.files as {
      imagenes?: Express.Multer.File[];
      imageneshabitaciones?: Express.Multer.File[];
    };

    const imagenesHotel = files.imagenes || [];
    const imagenesHabitaciones = files.imageneshabitaciones || [];

    // Mostrar cuántas imágenes llegaron en cada grupo
    console.log(`🏨 Imágenes del hotel recibidas: ${imagenesHotel.length}`);
    console.log(`🛏️ Imágenes de habitaciones recibidas: ${imagenesHabitaciones.length}`);

    if (imagenesHotel.length === 0) {
      return res.status(400).json({ error: 'Se requiere al menos una imagen del hotel' });
    }

    if (imagenesHabitaciones.length === 0) {
      return res.status(400).json({ error: 'Se requiere al menos una imagen de habitación' });
    }

    const imagenesUrl: string[] = [];
    const imagenesHabitacionesUrl: string[] = [];

    for (const file of imagenesHotel) {
      const resultado = await cloudinary.uploader.upload(file.path);
      imagenesUrl.push(resultado.secure_url);
      fs.unlinkSync(file.path);
    }

    for (const file of imagenesHabitaciones) {
      const resultado = await cloudinary.uploader.upload(file.path);
      imagenesHabitacionesUrl.push(resultado.secure_url);
      fs.unlinkSync(file.path);
    }

    const dto = new Hotel(
      nombre,
      descripcion,
      ubicacion,
      estrellas,
      imagenesUrl,
      ciudad,
      imagenesHabitacionesUrl 
    );

    const idHotel = await admin.añadirHotel(dto);

    return res.status(201).json({
      status: "Hotel creado con éxito",
      idHotel: idHotel
    });

  } catch (error: any) {
    console.error("❌ Error al crear el hotel:", error.message || error);
    return res.status(500).json({ error: "Error en el servidor" });
  }
};

export const createTransporte = async (req: Request , res:Response) => {
    const { tipo ,empresa ,origen ,destino ,salida ,duracion ,presio ,cantidad ,clase } = req.body;

    if (!tipo || !empresa || !origen || !destino || !salida || !duracion || !presio || !cantidad || !clase) {
        return res.status(400).json({
            status: `faltan campos para rellenar`
        })
    }

    try{

        const transporte = await admin.añadirTransporte(new Transporte(
            empresa,tipo,origen,destino,
            salida,duracion,presio,cantidad,destino
        ))

        return res.status(200).json({
            status: `se añadio con exito el transporte`,
            transporte
        })

    }catch(error){
        console.error(`se produjo un error al momento de ingresar el nuevo viaje`,error);
        return res.status(500).json({
            status: `error en el servidor al momento agregar una nuevo viaje`
        })
    }
    
}

export const createHabitacion = async (req: Request, res: Response) => {
    try {
        await uploadSingle(req, res);

        const {
            tipo,
            numero,
            precio,
            id_hotel,
        } = req.body;

        if (!req.file) {
            return res.status(400).json({ error: 'La imagen es requerida' });
        }

        const imagen = await cloudinary.uploader.upload(req.file.path);
        const imagenUrl = imagen.secure_url;

        if (fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }

        const campos = {
            tipo,
            numero,
            precio,
            id_hotel,
            imagenUrl
        };

        for (const [campo, valor] of Object.entries(campos)) {
            if (!valor || (typeof valor === 'string' && valor.trim() === '')) {
                return res.status(400).json({
                    error: `El campo '${campo}' es requerido y no puede estar vacío`
                });
            }
        }
        const dto = new Habitacion(
            tipo,
            numero,
            precio,
            id_hotel,
            imagenUrl
        );

        const resultado = await admin.añadirHabitacion(dto);

        return res.status(201).json({
            status: "Habitación creada con éxito",
            idHabitacion: resultado
        });

    } catch (error: any) {
        console.error("Error al crear la habitación:", error.message || error);
        return res.status(500).json({ error: "Error en el servidor" });
    }
};