import { Request, Response } from "express";
import usuarioRepo from "../repositories/usuarioRepo";
import generateToken from "../Helpers/generateToken";
import sendRecoveryEmail from "../Helpers/sendRecoveryEmail";

const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    const user = await usuarioRepo.buscarPorEmail(email);

    if (!user) return res.status(404).json({ error: "Usuario no encontrado" });

    const token = generateToken({ email }, 15); // Token de 15 minutos
    await sendRecoveryEmail(email, token);

    res.status(200).json({ status: "Correo de recuperación enviado" });
  } catch (error) {
    console.error("❌ Error:", error);
    res.status(500).json({ error: "Error al enviar el correo" });
  }
};

export default forgotPassword;
