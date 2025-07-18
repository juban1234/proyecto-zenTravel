import reservaRepo from "../../repositories/reservasRepo";
import  Reservas  from "../../Dto/reservasDto";
import { Request, Response } from "express";

export const reserva = async (req: Request, res: Response) => {
    try {
      const { cedula, fecha_inicio , fecha_fin ,id_habitacion,observacion } = req.body;
      const id_usuario = (req as any).user.id;
  
      console.log("📩 Recibiendo datos de la reserva:", { id_usuario, cedula, fecha_inicio , fecha_fin ,id_habitacion,observacion });
  
      const campos: any = {
        id_usuario,cedula, fecha_inicio , fecha_fin ,id_habitacion,observacion 
      }

      const HacerReserva = await reservaRepo.crearReserva(campos);

      return res.status(201).json({ status: "Reserva creada con éxito", estado: HacerReserva });
  
    } catch (error: any) {
      console.error("❌ Error al crear la reserva:", error);
      return res.status(500).json({ errorInfo: "Error al crear la reserva" });
    }
};

export const actualizar = async(req: Request, res:Response) => {
    try {
      const id_usuario = (req as any).user?.id;
      if (!id_usuario) {
        return res.status(401).json({ error: "Usuario no autenticado" });
      }
  
      const {id_reserva, cedula,id_paquete } = req.body;
  
      if (!cedula && !id_paquete && !id_reserva ) {
        return res.status(400).json({ error: "No se enviaron campos para actualizar" });
      }
  
      const dto = new Reservas(
        id_reserva,
        id_usuario,      
        cedula,
        id_paquete
      );
  
      const result = await reservaRepo.actualizarReserva(dto);
  
      console.log("✅ Resultado de actualización:", result);
  
      return res.status(200).json({ status: "Reserva actualizado correctamente" });
  
    } catch (error: any) {
      console.error("❌ Error al actualizar Reserva:", error.message);
      return res.status(500).json({ error: error.message });
    }
};

export const Historial = async (req: Request, res: Response): Promise<Response> => {
  try {
    const id_usuario = (req as any).user?.id;

    
    if (!id_usuario || isNaN(Number(id_usuario))) {
      return res.status(400).json({ error: 'El id_usuario es requerido y debe ser un número válido' });
    }

    const historial = await reservaRepo.HistorialReservas(parseInt(id_usuario));

    if (!historial || historial.length === 0) {
      return res.status(404).json({ message: 'No se encontraron reservas para este usuario' });
    }
    
    return res.status(200).json({ historial });
  } catch (error) {
    console.error('Error al obtener historial de reservas:', error);
    return res.status(500).json({ error: 'Error en el servidor' });
  }
};

export const Cancelar = async (req: Request, res: Response) => {
      try {

      const { id_reserva } = req.params;
      if (id_reserva && isNaN(Number(id_reserva))){
        return res.status(400).json({ error: 'El id_reserva es requerido y debe ser un número válido' });
      
      }

      const reserva = await reservaRepo.CancelarReserva(parseInt(id_reserva));
      if (!reserva) {
        return res.status(404).json({ message: 'No se encontró la reserva con el id proporcionado' });
      }

        return res.status(200).json({ message: 'Reserva cancelada exitosamente' });
    
      } catch (error) {

      console.error('Error al cancelar reserva:', error);
      return res.status(500).json({ error: 'Error en el servidor' });
    
    }
}