import { Request, Response } from "express";

import Usuario from "../Dto/registroDto";
import usuarioServi from "../services/usuarioServi";


let register = async (req: Request, res: Response) => {
    try {
      const {nombre,email,telefono,password } = req.body;
  
      console.log("📩 Recibiendo datos del usuario:", req.body);
  
      const registerUser = await usuarioServi.register(
        new Usuario (nombre,email,telefono,password )
      );
  
      console.log("✅ Usuario registrado con éxito ");
  
      return res.status(201).json({ status: "register ok" });
    } catch (error: any) {
      console.error("❌ Error al registrar usuario:", error);
  
      if (error && error.code == "ER_DUP_ENTRY") {
        return res.status(500).json({ errorInfo: error.sqlMessage });
      }
  
      return res.status(500).json({ error: "Error en el servidor" });
    }
  };
  

export default register;