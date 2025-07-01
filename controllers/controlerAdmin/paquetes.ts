import { Request, Response } from "express";
import cloudinary from "../../configs/cloudinary"; 
import { uploadMultiple } from "../../configs/multer";
import fs from 'fs';
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

interface AuthenticatedRequest extends Request {
    user: { id: string };
    files?: Express.Multer.File[];
}
export const createHotel = async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
    try {
        
        const id_usuario = req.user?.id;

        if (!id_usuario) {
            return res.status(401).json({ error: "Usuario no autenticado" });
        }

        const {
            nombre,
            descripcion,
            ubicacion,
            ciudad,
            estrellas,
        } = req.body;

        const campos = { nombre, descripcion, ubicacion, ciudad, estrellas };

        for (const [campo, valor] of Object.entries(campos)) {
            if (!valor || (typeof valor === 'string' && valor.trim() === '')) {
                return res.status(400).json({ error: `El campo '${campo}' es requerido y no puede estar vacío` });
            }
        }

        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ error: 'Se requiere al menos una imagen' });
        }

        const imagenesUrl: string[] = [];

        for (const file of req.files) {
            try {
                const resultado = await cloudinary.uploader.upload(file.path);
                imagenesUrl.push(resultado.secure_url);
            } finally {
                fs.unlinkSync(file.path);
            }
        }

        const dto = new Hotel(
            nombre,
            descripcion,
            ubicacion,
            ciudad,
            Number(estrellas),
            imagenesUrl
        );

        const idHotel = await admin.añadirHotel(dto);

        return res.status(201).json({
            status: "Hotel creado con éxito",
            idHotel: idHotel
        });

    } catch (error: any) {
        console.error("Error al crear el hotel:", error.message || error);
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
