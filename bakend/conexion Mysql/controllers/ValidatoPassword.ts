import { Request, Response } from "express";
import usuarioRepo from "../repositories/usuarioRepo";
import generateToken from "../Helpers/generateToken";
import sendRecoveryEmail from "../Helpers/sendRecoveryEmail";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import generateHash from "../Helpers/generateHash";
import Usuario from "../Dto/registroDto";
import Login from "../Dto/loginDto";

dotenv.config();


export const forgotPassword = async (req: Request, res: Response) => {
  const { email,password } = req.body;

  try {
    const user = await usuarioRepo.buscarUsuario(new Login(email,password) );

    if (!user) return res.status(404).json({ error: "Usuario no encontrado" });

    const token = generateToken({ email }, 15); // Token de 15 minutos
    await sendRecoveryEmail(email, token);

    res.status(200).json({ status: "Correo de recuperación enviado" });
  } catch (error) {
    console.error("❌ Error:", error);
    res.status(500).json({ error: "Error al enviar el correo" });
  }
};

// export const resetPassword = async (req: Request, res: Response) => {
//   const { token, newPassword } = req.body;

//   try {
//     const decoded = jwt.verify(token, process.env.KEY_TOKEN!) as { data: { email: string } };
//     const email = decoded.data.email;

//     const hashedPassword = await generateHash(newPassword);
//     await usuarioRepo.actualizarPassword(email, hashedPassword);

//     res.status(200).json({ status: "Contraseña actualizada con éxito" });
//   } catch (error) {
//     console.error("❌ Token inválido o expirado:", error);
//     res.status(403).json({ error: "Token inválido o expirado" });
//   }
// };


