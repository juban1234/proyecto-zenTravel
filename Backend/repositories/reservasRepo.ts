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
}
export default reservaRepo;