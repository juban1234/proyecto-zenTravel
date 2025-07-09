// src/controllers/AdminController.ts
import { Request, Response } from "express";
import usuarioRepo from "../../repositories/usuarioRepo";
import cloudinary from "../../configs/cloudinary";
import upload from '../../configs/multer';
import fs from 'fs';
import { promisify } from 'util';
import admin from "../../repositories/adminRepo";
import { unlink } from "fs/promises";

const uploadSingle = promisify(upload.single('imagen'));

export class EditController {
  
  static async Editdestino(req: Request, res: Response): Promise<Response> {
    try {
      const id_destino = Number(req.params.id_destino);
      const { pais, departamento, nombre, descripcion } = req.body;

      if (isNaN(id_destino) || !pais || !departamento || !nombre || !descripcion) {
        return res.status(400).json({
          success: false,
          message: "Todos los campos son requeridos."
        });
      }

      const data = {
        pais,
        departamento,
        nombre,
        descripcion,
      }

      const result = await admin.editardestino(id_destino, data );

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

static async EditarHotel(req: Request, res: Response): Promise<Response> {
    try {
      const id_hotel = Number(req.params.id_hotel);
      const { nombre, descripcion, ubicacion } = req.body;

      // if (!id_hotel || !nombre || !descripcion || !ubicacion) {
      //   return res.status(400).json({ error: "Faltan campos obligatorios o ID inválido" });
      // }

      const campos = {
        nombre: nombre?.trim(),
        descripcion: descripcion?.trim(),
        ubicacion: ubicacion?.trim()
      };

      // Acceder a los archivos desde req.files
      const imagenes = (req.files as any)['imagenes'] || [];
      const imagenesHabitaciones = (req.files as any)['imageneshabitaciones'] || [];

      const urlsImagenes: string[] = [];
      const urlsHabitaciones: string[] = [];

      // Subir imágenes generales del hotel
      for (const file of imagenes) {
        const result = await cloudinary.uploader.upload(file.path);
        urlsImagenes.push(result.secure_url);
        await unlink(file.path); // Borra archivo local
      }

      // Subir imágenes de las habitaciones
      for (const file of imagenesHabitaciones) {
        const result = await cloudinary.uploader.upload(file.path);
        urlsHabitaciones.push(result.secure_url);
        await unlink(file.path); // Borra archivo local
      }

      // Armar el objeto para actualizar
      const dataParaActualizar: any = {
        nombre: campos.nombre,
        descripcion: campos.descripcion,
        ubicacion: campos.ubicacion,
      };


      if (urlsImagenes.length > 0) {
        dataParaActualizar.imagenes = urlsImagenes;
      }

      if (urlsHabitaciones.length > 0) {
        dataParaActualizar.imagenesHabitaciones = urlsHabitaciones;
      }



      if(!dataParaActualizar) {
        return res.status(404).json({ error: `faltan los campos`, dataParaActualizar});
      }

      // Actualizar en base de datos
      const resultado = await admin.editarHotel(id_hotel, dataParaActualizar);

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

}
