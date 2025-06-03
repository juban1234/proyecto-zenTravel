import { Request, Response } from "express";
import usuarioRepo from "../../repositories/usuarioRepo";
import nodemailer from "nodemailer";

export const Marketing = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { nombre, email, mensaje } = req.body;
        if (!nombre || !email || !mensaje) {
            return res.status(400).json({ error: "Todos los campos son obligatorios" });
        }

        const resultado = await usuarioRepo.createMarketing({ nombre, email, mensaje });
        console.log("Datos guardados en la base de datos:", resultado);

        // URL de la imagen en Cloudinary
        const cloudinaryImageUrl = "https://res.cloudinary.com/dscmvgpqd/image/upload/v1748546394/images_m8nuuw.jpg";


        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'zentravelagencia0@gmail.com',
                pass: 'gand dlhk crvv zday',
            }
        });


        const mailOptions = {
            from: 'ortiznicolas656@gmail.com',
            to: email,
            subject: '¡Gracias por interesarte en nuestros servicios!',
            text: `Hola ${nombre},\n\nGracias por ponerte en contacto con nosotros. Te informaremos pronto sobre las promociones especiales y servicios de marketing que tenemos disponibles.\n\n¡Nos encantaría ayudarte a crecer!`,
            html: `<p>Hola <strong>${nombre}</strong>,</p>
                   <p>Gracias por ponerte en contacto con nosotros. Te informaremos pronto sobre las promociones especiales y servicios de marketing que tenemos disponibles.</p>
                   <p><strong>¡Nos encantaría ayudarte a crecer!</strong></p>
                   <p><img src="${cloudinaryImageUrl}" alt="Promoción de Marketing" /></p>`,
        };


        await transporter.sendMail(mailOptions);
        return res.status(201).json({
            message: "Datos de marketing guardados correctamente y correo enviado",
            data: resultado
        });
    } catch (error: any) {
    console.error("Error al procesar la solicitud de marketing:", error);
    if (error.response) {
        console.error("Respuesta del error:", error.response);
    }
    return res.status(500).json({ error: "Error en el servidor", details: error.message || error });
}

    }

