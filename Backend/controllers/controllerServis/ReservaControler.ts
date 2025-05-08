import usuarioRepo from "../../repositories/usuarioRepo";
import  Reservas  from "../../Dto/reservasDto";
import { Request, Response } from "express";

export const reserva = async (req: Request, res: Response) => {
    try {
      const { cedula, id_paquete } = req.body;
      const id_usuario = (req as any).user.id;
  
      console.log("📩 Recibiendo datos de la reserva:", { id_usuario, cedula, id_paquete });
  
      const HacerReserva = await usuarioRepo.crearReserva(
        new Reservas( cedula, id_usuario, id_paquete)
      );

      console.log("✅ Reserva creada con éxito ", HacerReserva);
      return res.status(201).json({ status: "Reserva creada con éxito" });
  
    } catch (error: any) {
      console.error("❌ Error al crear la reserva:", error);
      return res.status(500).json({ errorInfo: "Error al crear la reserva" });
    }
};
