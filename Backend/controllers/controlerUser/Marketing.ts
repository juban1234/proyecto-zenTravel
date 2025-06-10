import { Request, Response } from "express";
import usuarioRepo from "../../repositories/usuarioRepo";
import cloudinary from '../../configs/cloudinary';
import upload from '../../configs/multer';
import fs from 'fs';
import { promisify } from 'util';
import nodemailer from "nodemailer";
import { MarketingDTO } from "../../Dto/MarketingDTO";

const uploadSingle = promisify(upload.single('imagen'));

export const Marketing = async (req: Request, res: Response): Promise<Response> => {
    
    try {
        await uploadSingle(req, res);

        const { nombre, email, mensaje } = req.body;

        if (!nombre || !email || !mensaje) {
            return res.status(400).json({ error: "Todos los campos son obligatorios" });
        }

        if (!req.file) {
            return res.status(400).json({ error: 'La imagen es requerida' });
        }

        const resultado = await cloudinary.uploader.upload(req.file.path);
        const imagenUrl = resultado.secure_url;

        fs.unlinkSync(req.file.path);

        const dto = new MarketingDTO(nombre, email, mensaje, imagenUrl);

        const marketingData = await usuarioRepo.createMarketing({
            nombre: dto.nombre,
            email: dto.email,
            mensaje: dto.mensaje,
            imagenurl: dto.imagenUrl
        });

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'zentravelagencia0@gmail.com',
                pass: 'gand dlhk crvv zday',
            }
        });

        const mailOptions = {
            from: 'zentravelagencia0@gmail.com',
            to: dto.email,
            subject: '¡Gracias por interesarte en nuestros servicios!',
            html: `
                <p>Hola <strong>${dto.nombre}</strong>,</p>
                <p>Gracias por ponerte en contacto con nosotros. Te informaremos pronto sobre nuestras promociones y servicios.</p>
                <p><strong>¡Gracias por elegirnos!</strong></p>
                <p><img src="${dto.imagenUrl}" alt="Promoción de Marketing" style="max-width: 100%; height: auto;" /></p>
            `   
        };

        await transporter.sendMail(mailOptions);

        return res.status(201).json({
            message: "Datos guardados y correo enviado correctamente",
            data: marketingData,
            imagenUrl: dto.imagenUrl
        });

    } catch (error: any) {
        console.error("Error al procesar la solicitud de marketing:", error);
        return res.status(500).json({
            error: "Error en el servidor",
            details: error.message || error
        });
    }
};
