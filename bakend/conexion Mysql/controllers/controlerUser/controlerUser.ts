import { Request, Response } from "express";
import usuarioServi from "../../services/usuarioServi";
import Login from "../../Dto/loginDto";
import Usuario from "../../Dto/registroDto";
import generateToken from '../../Helpers/generateToken';
import dotenv from "dotenv";

dotenv.config();


export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const login = await usuarioServi.login(new Login(email, password));
    
    if (login.logged) {
      return res.status(200).json({
        status: login.status,
        token: generateToken({id: login.id, rol: login.rol}, 60)
      });
    }

    return res.status(401).json({status: login.status});
    
  } catch (error: any) {
    console.error("❌ Error en login:", error);
    return res.status(500).json({ error: "Error en el servidor" });
  }
}

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
  


