import { Request, Response } from "express";
import usuarioRepo from "../../repositories/usuarioRepo";
<<<<<<< HEAD:bakend/conexion Mysql/controllers/controlerUser/ValidatoPassword.ts
import {generateAccessToken,generateRefreshToken} from "../../Helpers/generateToken";
import nodemailer from "nodemailer";
=======
import {generateAccessToken} from "../../Helpers/generateToken";
>>>>>>> 2c0628f48a0854d72e82f6550a3208e910a80be6:controllers/controlerUser/ValidatoPassword.ts
import sendRecoveryEmail from "../../Helpers/sendRecoveryEmail";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import generateHash from "../../Helpers/generateHash";
<<<<<<< HEAD:bakend/conexion Mysql/controllers/controlerUser/ValidatoPassword.ts
import Login from "../../Dto/loginDto";
=======
import { Login } from "../../Dto/User";
>>>>>>> 2c0628f48a0854d72e82f6550a3208e910a80be6:controllers/controlerUser/ValidatoPassword.ts

dotenv.config();


export const validatePassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    console.log("📧 Email recibido:", email); 
    const user = await usuarioRepo.buscarUsuarioPorEmail(email);

    if (!user) {
      return res.status(404).json({ message: "El usuario no existe" });
    }

    // Usamos generateAccessToken con duración de 15 minutos (opcionalmente configurable)
    const token = generateAccessToken({ email }, 15); 
    console.log("🔑 Token generado para recuperación:", token);

    await sendRecoveryEmail(email, token);

    return res.status(200).json({ message: "Correo de recuperación enviado" });
    
  } catch (error: any) {
    console.error("❌ Error en validatePassword:", error);
    return res.status(500).json({ error: "Error en el servidor" });
  }
}

<<<<<<< HEAD:bakend/conexion Mysql/controllers/controlerUser/ValidatoPassword.ts

=======
>>>>>>> 2c0628f48a0854d72e82f6550a3208e910a80be6:controllers/controlerUser/ValidatoPassword.ts
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
