import { Request, Response } from "express";
import usuarioRepo from "../repositories/usuarioRepo";
import generateToken from "../Helpers/generateToken";
import nodemailer from "nodemailer";
import sendRecoveryEmail from "../Helpers/sendRecoveryEmail";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import generateHash from "../Helpers/generateHash";
import Login from "../Dto/loginDto";


export const validatePassword = async (req: Request, res: Response) => {
  try {

    const { email } = req.body;
    console.log("📧 Email recibido:", email); 
    const user = await usuarioRepo.buscarUsuarioPorEmail(email);
    if (!user) {
      return res.status(404).json({ message: "El usuario no existe" });
    }

    const token = generateToken({ email }, 15);
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "tucorreo@gmail.com",
        pass: "tu-contraseña-de-aplicacion",
      },
    });

    const resetLink = `http://localhost:10101/reset-password?token=${token}`;

    const mailOptions = {
      from: "Zentravel <tucorreo@gmail.com>",
      to: email,
      subject: "Recuperación de contraseña",
      html: `
        <p>Hola, haz clic en el siguiente enlace para restablecer tu contraseña:</p>
        <a href="${resetLink}">${resetLink}</a>
        <p>Este enlace expirará en 15 minutos.</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({ message: "Correo de recuperación enviado" });
    
  } catch (error: any) {
    console.error("❌ Error en validatePassword:", error);
    return res.status(500).json({ error: "Error en el servidor" }); 
  }

}

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { token } = req.query;
    const { newPassword } = req.body;

    if (!token || !newPassword) {
      return res.status(400).json({ message: "Token y nueva contraseña son requeridos" });
    }

    let payload: any;
    try {
      payload = jwt.verify(token as string, process.env.JWT_SECRET || "secreto");
    } catch (err) {
      return res.status(400).json({ message: "Token inválido o expirado" });
    }

    const email = payload.email;
    const hashedPassword = await generateHash(newPassword);
    await usuarioRepo.EditarPerfil(email, hashedPassword);

    return res.status(200).json({ message: "Contraseña actualizada correctamente" });

  } catch (error) {
    console.error("❌ Error al resetear la contraseña:", error);
    return res.status(500).json({ message: "Error del servidor" });
  }
};
