import Reservas from "../Dto/reservasDto";
import db from '../configs/config';

class reservaRepo {
    static async crearReserva(reserva: Reservas) {
        const sql = 'CALL CrearReserva(?, ?, ?)';
        const values = [reserva.id_usuario, reserva.cedula, reserva.id_paquete];
        return db.execute(sql, values);
    }

    static async actualizarReserva(reserva: Reservas){
        
        let campos: string[] = [];
        let valores: any[] = [];

        if (reserva.id_paquete) {
            campos.push("id_paquete = ?");
            valores.push(reserva.id_paquete);
        }

        if (reserva.cedula) {
            campos.push("cedula = ?");
            valores.push(reserva.cedula);
        }
      
        if (campos.length === 0) return { message: "No hay campos para actualizar" };

        const sql = `UPDATE reservas SET ${campos.join(", ")} WHERE id_reservas = ?`;
        
        valores.push(reserva.id_reserva)
        return db.execute(sql,valores);
    }

    static async HistorialReservas(id_usuario: number) {
        const sql = `SELECT * FROM RESERVAS WHERE id_usuario = ? ORDER BY fecha DESC`;
        try {
        const [reservas]: any = await db.execute(sql, [id_usuario]);

        const historial = reservas.map((reserva: any) => {
            return new Reservas(
            reserva.id_reservas,
            reserva.id_usuario,
            reserva.cedula,
            reserva.id_paquete
            );
        });

        return historial;
        } catch (error) {
        console.error('Error al obtener historial de reservas:', error);
        throw error;
        }
    }

    static async CancelarReserva(id_reserva: number) {

    const checkSql = 'SELECT estado FROM reservas WHERE id_reservas = ?';
    const [result]: any = await db.execute(checkSql, [id_reserva]);

    if (result.length === 0) {
        return null; 
    }

    const estado = result[0].estado;
    if (estado !== 'activa') {
        return null; 
    }
    
    const sql = 'UPDATE reservas SET estado = ? WHERE id_reservas = ?';
    const values = ['cancelada', id_reserva];

    try {
        const [updateResult]: any = await db.execute(sql, values);
        return updateResult;
    } catch (error) {
        console.error("Error al cancelar reserva:", error);
        throw error;
    }
    }

}
export default reservaRepo;