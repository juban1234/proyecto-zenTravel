import { Request, Response } from "express";
import cloudinary from "../../configs/cloudinary"; 
import upload from '../../configs/multer';
import fs from 'fs';
import { promisify } from 'util';
import admin from "../../repositories/adminRepo";
import { Destino, Habitacion, Hotel , Transporte } from "../../Dto/SearchDto";

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
const uploadMultiple = promisify(upload.single('imagen'));
export const createHotel = async (req: Request, res: Response): Promise<Response> => {
  try {
    await uploadMultiple(req, res);

    const nombre = req.body.nombre?.trim();
    const descripcion = req.body.descripcion?.trim();
    const ubicacion = req.body.ubicacion?.trim();
    const estrellas = Number(req.body.estrellas);

    if (!nombre || !descripcion || !ubicacion || isNaN(estrellas)) {
      return res.status(400).json({ message: "Todos los campos son requeridos" });
    }

    if (estrellas < 1 || estrellas > 5) {
      return res.status(400).json({ message: "El número de estrellas debe estar entre 1 y 5" });
    }

    if (!req.files || (req.files as Express.Multer.File[]).length === 0) {
      return res.status(400).json({ message: "Se requiere al menos una imagen" });
    }

    const archivos = req.files as Express.Multer.File[];

    const imagenes: string[] = [];

    for (const archivo of archivos) {
      const resultado = await cloudinary.uploader.upload(archivo.path);
      imagenes.push(resultado.secure_url);
      fs.unlinkSync(archivo.path); 
    }

    const nuevoHotel = new Hotel(nombre, descripcion, ubicacion, imagenes, estrellas);

    const resultado = await admin.añadirHotel(nuevoHotel);

    return res.status(201).json({
      message: "Hotel creado exitosamente.",
      data: resultado,
    });

  } catch (error: any) {
    console.error("Error al crear el hotel:", error.message || error);
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

export const createHabitacion = async(req: Request , res:Response) => {
    const {tipo,numero,precio,nombre_hotel} = req.body;

    try {
        
        const habitacion = await admin.añadirHabitacion(new Habitacion(
            tipo,
            numero,
            precio,
            nombre_hotel
        ))

        return res.status(200).json({
            status: `habitacion agregada correctamente`,
            habitacion
        })

    } catch (error) {
        console.log(`error en el servidor al momento de agregar una habitacion `,error);
        return res.status(500).json({
            status:`error en el servidor al momento de agregar una habitacion`
        })
    }
}
