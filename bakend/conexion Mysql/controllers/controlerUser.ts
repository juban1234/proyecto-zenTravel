import { Request, Response } from "express";
import usuarioServi from "../services/usuarioServi";
import Login from "../Dto/loginDto";
import Reservas from "../Dto/reservasDto";
import Usuario from "../Dto/registroDto";
import usuarioRepo from "../repositories/usuarioRepo";
import generateToken from '../Helpers/generateToken';
import dotenv from "dotenv";
import UpdateProfileDto from "../Dto/UpdateProfileDto";

dotenv.config();


export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const login = await usuarioServi.login(new Login(email, password));
    
    if (login.logged) {
      return res.status(200).json({
        status: login.status,
        token: generateToken({id: login.id}, 5)
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
  
export const reserva = async (req: Request, res: Response) => {
    try {
      const { fecha, estado, id_paquete } = req.body;
      const id_usuario = (req as any).user.id;
  
      console.log("📩 Recibiendo datos de la reserva:", { id_usuario, fecha, estado, id_paquete });
  
      const HacerReserva = await usuarioRepo.crearReserva(
        new Reservas(fecha, estado, id_usuario, id_paquete)
      );
  
      console.log("✅ Reserva creada con éxito ", HacerReserva);
      return res.status(201).json({ status: "Reserva creada con éxito" });
  
    } catch (error: any) {
      console.error("❌ Error al crear la reserva:", error);
      return res.status(500).json({ errorInfo: "Error al crear la reserva" });
    }
};

export const profile = async (req: Request, res: Response) => {
  try {
    const { nombre, telefono, estiloVida } = req.body;
    const id_usuario = (req as any).user?.id;

    // Validaciones
    if (!id_usuario) {
      return res.status(401).json({ error: "Usuario no autenticado" });
    }

    if (!nombre || !telefono || !estiloVida) {
      return res.status(400).json({ error: "Faltan datos obligatorios para actualizar el perfil" });
    }

    console.log("📩 Datos del perfil a actualizar:", { id_usuario, nombre, telefono, estiloVida });
    
    const actualizarPerfil = await usuarioRepo.EditarPerfil(
      new UpdateProfileDto(id_usuario,nombre,telefono, estiloVida)
    );
    

    console.log("✅ Perfil actualizado con éxito ", actualizarPerfil);
    return res.status(200).json({ status: "Perfil actualizado con éxito" });

  } catch (error: any) {
    console.error("❌ Error al actualizar el perfil:", error.message, error.stack);
    return res.status(500).json({ errorInfo: error.message });
  }
};