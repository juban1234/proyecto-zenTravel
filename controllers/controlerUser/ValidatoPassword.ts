import { Request, Response } from "express";
import usuarioRepo from "../../repositories/usuarioRepo";
import {generateAccessToken} from "../../Helpers/generateToken";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import generateHash from "../../Helpers/generateHash";
import { Login } from "../../Dto/User";
import { RecoveryEmail } from "../../Helpers/sendRecoveryEmail";

dotenv.config();


export const validatePassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    console.log("📧 Email recibido:", email); 
    const user = await usuarioRepo.buscarUsuarioPorEmail(email);

    if (!user) {
      return res.status(404).json({ message: "El usuario no existe" });
    }

    const data = user.email
    // Usamos generateAccessToken con duración de 15 minutos (opcionalmente configurable)
    const token = generateAccessToken({ user }, 15); 

    await RecoveryEmail(data, token);

    return res.status(200).json({ message: "Correo de recuperación enviado" });
    
  } catch (error) {
    return res.status(500).json({ 
      status: "Error en el servidor al momento de enviar el correo de recuperacion contraseña",
      error
    });
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
      payload = jwt.verify(token as string, process.env.KEY_TOKEN!);
    } catch (err) {
      return res.status(400).json({ message: "Token inválido o expirado" });
    }

    const email = payload.data.email;
    const hashedPassword = await generateHash(newPassword);

    await usuarioRepo.cambiarContraseña(new Login(email, hashedPassword)); 

    console.log("✅ Contraseña actualizada correctamente");
    return res.status(200).json({ message: "Contraseña actualizada correctamente" });

  } catch (error) {
    console.error("❌ Error al resetear la contraseña:", error);
    return res.status(500).json({ message: "Error del servidor" });
  }
};
