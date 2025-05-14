import { Request, Response } from "express";
import usuarioServi from "../../services/usuarioServi";
import { Login ,Usuario } from "../../Dto/User";
import {generateAccessToken,generateRefreshToken} from '../../Helpers/generateToken';
import dotenv from "dotenv";
import usuarioRepo from "../../repositories/usuarioRepo";

dotenv.config();

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const login = await usuarioServi.login(new Login(email, password));
    
    if (login.logged) {
      // Generar ambos tokens
      const payload = { id: login.id, rol: login.rol };
      const AccessToken = generateAccessToken(payload)
      generateRefreshToken(payload);

      return res.status(200).json({
        status: login.status,
        AccessToken
      });
    }

    return res.status(401).json({ status: login.status });

  } catch (error: any) {
    console.error("❌ Error en login:", error);
    return res.status(500).json({ error: "Error en el servidor" });
  }
};

export const register = async (req: Request, res: Response) => {
    try {
      const {nombre,email,telefono,password } = req.body;
  
      console.log("📩 Recibiendo datos del usuario:", req.body);

      const registerUser = await usuarioServi.register(
        new Usuario (nombre,email,telefono,password )
      );
  
      console.log("✅ Usuario registrado con éxito ",registerUser);
  
      return res.status(201).json({ status: "register ok" });
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
      
    console.log("Buscando información del usuario con ID:", id_usuario);

    const userInfo = await usuarioRepo.getUserById(id_usuario);
    if (!userInfo) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    console.log("Información del usuario encontrada:", userInfo);

    return res.status(200).json(userInfo);
  } catch (error: any) {
    console.error("Error al obtener información del usuario:", error);
    return res.status(500).json({ error: "Error en el servidor" });
  }
};


