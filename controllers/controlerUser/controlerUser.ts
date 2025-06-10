import { Request, Response } from "express";
import usuarioServi from "../../services/usuarioServi";
import { Login ,Usuario } from "../../Dto/User";
import {generateAccessToken,generateRefreshToken,actualizarToken} from '../../Helpers/generateToken';
import dotenv from "dotenv";
import usuarioRepo from "../../repositories/usuarioRepo";
import { emailRol } from "../../Helpers/sendRecoveryEmail";

dotenv.config();

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const loginResult = await usuarioServi.login(new Login(email, password));

    if (!loginResult.logged) {
      return res.status(401).json({ status: loginResult.status });
    }

    const payload = { id: loginResult.id, rol: loginResult.rol };
    const Rol = loginResult.rol;

    // Generar tokens
    const accessToken = generateAccessToken(payload);
    const refreshToken = await generateRefreshToken(payload);

    // Guardar refresh token en BD
    await actualizarToken({ id: payload.id, token: refreshToken });

    return res.status(200).json({
      status: loginResult.status,
      Rol,
      accessToken,
      refreshToken,
    });

  } catch (error) {
    console.error("❌ Error en login:", error);
    return res.status(500).json({ error: "Error en el servidor" });
  }
};

export const register = async (req: Request, res: Response) => {
    try {
      const {nombre,email,telefono,password } = req.body;

      const registerUser = await usuarioServi.register(
        new Usuario (nombre,email,telefono,password )
      );
  
      return res.status(201).json({ 
        status: "register ok" ,
        registerUser
      });

    } catch (error: any) {
      console.error("❌ Error al registrar usuario:", error);
  
      if (error && error.code == "ER_DUP_ENTRY") {
        return res.status(500).json({ errorInfo: error.sqlMessage });
      }
  
      return res.status(500).json({ error: "Error en el servidor" });
    }
};
  
export const informationUser = async (req: Request, res: Response) => {
  try {
    const id_usuario = (req as any).user.id;

    const userInfo = await usuarioRepo.getUserById(id_usuario);
    if (!userInfo) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    return res.status(200).json(userInfo);
  } catch (error: any) {
    console.error("Error al obtener información del usuario:", error);
    return res.status(500).json({ error: "Error en el servidor" });
  }
};

export const SolicitarCambioRol = async (req: Request, res: Response) => {

  const {nombre,email,telefono,asunto,rol} = req.body
  try {

    const dto = {
      nombre,
      email,
      telefono,
      rol
    }

    await emailRol(email,asunto,dto)

    return res.status(200).json({ 
      message: "Correo de recuperación enviado" 
    })

  } catch (error) {
    console.error("❌ Error en enviar el correo:", error);
    return res.status(500).json({ error: "Error en el servidor al momento de enviar el imeil" });
  }

}



