import { Request, Response } from 'express';
import usuarioRepo from '../../repositories/usuarioRepo'; 

export const obtenerHistorialReservas = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id_usuario } = req.params; 

    
    if (!id_usuario || isNaN(Number(id_usuario))) {
      return res.status(400).json({ error: 'El id_usuario es requerido y debe ser un número válido' });
    }

    const historial = await usuarioRepo.HistorialReservas(parseInt(id_usuario));

    if (!historial || historial.length === 0) {
      return res.status(404).json({ message: 'No se encontraron reservas para este usuario' });
    }
    
    return res.status(200).json({ historial });
  } catch (error) {
    console.error('Error al obtener historial de reservas:', error);
    return res.status(500).json({ error: 'Error en el servidor' });
  }
};


  export const CancelarReserva = async (req: Request, res:  Response): Promise<Response> => {
    try {

      const { id_reserva } = req.params;
      if (id_reserva && isNaN(Number(id_reserva))){
        return res.status(400).json({ error: 'El id_reserva es requerido y debe ser un número válido' });
      
      }

      const reserva = await usuarioRepo.CancelarReserva(parseInt(id_reserva));
      if (!reserva) {
        return res.status(404).json({ message: 'No se encontró la reserva con el id proporcionado' });
      }

        return res.status(200).json({ message: 'Reserva cancelada exitosamente' });
    
      } catch (error) {

      console.error('Error al cancelar reserva:', error);
      return res.status(500).json({ error: 'Error en el servidor' });
    
    }

}
