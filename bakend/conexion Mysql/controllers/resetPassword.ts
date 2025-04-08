import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import generateHash from "../Helpers/generateHash";
import usuarioRepo from "../repositories/usuarioRepo";

dotenv.config();

const resetPassword = async (req: Request, res: Response) => {
  const { token, newPassword } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.KEY_TOKEN!) as { data: { email: string } };
    const email = decoded.data.email;

    const hashedPassword = await generateHash(newPassword);
    await usuarioRepo.actualizarPassword(email, hashedPassword);

    res.status(200).json({ status: "Contraseña actualizada con éxito" });
  } catch (error) {
    console.error("❌ Token inválido o expirado:", error);
    res.status(403).json({ error: "Token inválido o expirado" });
  }
};

export default resetPassword;
