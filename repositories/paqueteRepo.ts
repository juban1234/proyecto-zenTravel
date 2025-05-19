import db from '../configs/config';

class Paquetes {

    static async createPackage(paquete: any,id_usuario:number) {
        const sql = `CALL crear_paquete_con_nombres(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        const values = [
            id_usuario,
            paquete.nombrePaquete ?? null,
            paquete.descripcion ?? null,
            paquete.imagenUrl ?? null,
            paquete.duracionDias ?? null,
            paquete.fechaInicioDisponible ?? null,
            paquete.descuento ?? null,
            paquete.nombreHotel ?? null,
            paquete.nombreTransporte ?? null,
            paquete.nombreDestino ?? null
        ];

        try {
            const [result]: any = await db.execute(sql, values);
            return result;
        } catch (error) {
            console.error("Error al crear paquete:", error);
            throw error;
        }
    }

    static async calcularPaquete(id_paquete: number) {
        const sql = 'call calcular_precio_paquete(?)';
        const [rows]: any = await db.execute(sql, [id_paquete]);
        return rows[0] || null;
    }

}

export default Paquetes;