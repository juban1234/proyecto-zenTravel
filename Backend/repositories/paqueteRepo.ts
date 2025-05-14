import db from '../configs/config';

class Paquetes {

    static async createPackage(paquete: any) {
        const sql = `CALL crear_paquete_con_nombres(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        const values = [
            paquete.nombrePaquete,
            paquete.descripcion,
            paquete.precioTotal,
            paquete.imagenUrl,
            paquete.duracionDias,
            paquete.fechaInicioDisponible,
            paquete.descuento,
            paquete.nombreHotel,
            paquete.nombreTransporte,
            paquete.nombreDestino
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