import db from '../configs/config';
import Package from '../Dto/Paquete';
import { Destino } from '../Dto/SearchDto';



class Paquetes {

    static async createPackage(paquete: any) {
        const sql = `CALL crear_paquete_con_nombres(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        const values = [
            paquete.nombrePaquete,
            paquete.descripcion,
            paquete.precioTotal,
            paquete.imagenUrl,
            paquete.duracionDias,
            paquete.fechaInicioDisponible,
            paquete.fechaFinDisponible,
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

    static async buscarDestino() {
        const query = `SELECT * FROM Destinos`;
        const [rows]: any = await db.execute(query);

        return rows;
    }

    static async buscarHotelPorNombre() {
        const sql = 'SELECT * FROM Hotel WHERE nombre LIKE ?';
        const [rows]: any = await db.execute(sql);
        return rows;
    }

    static async buscartransportePorNombre() {
        const sql = 'SELECT * FROM Transporte';
        const [rows]: any = await db.execute(sql);
        return rows;
    }

    static async direccion(d: Destino) {
        const sql = 'INSERT INTO `zentravel`.`destino` (`nombre`, `direccion`, `descripcion`) VALUES (?, ?, ?)';
        const values = [
            d.nombre,
            d.direccion,
            d.descripcion
        ];
        return db.execute(sql, values);
    }

    static async hotel(P: Package) {

        const sql = 'INSERT INTO `zentravel`.`paquete` (`nombrePaquete`, `descripcion`, `precioTotal`) VALUES (?,?,?);';
        const value = [
            P.nombrePaquete,
            P.descripcion,
            P.precioTotal
        ];

        return db.execute(sql, value);
    }

    static async calcularPaquete(id_paquete: number) {
        const sql = 'call calcular_precio_paquete(?)';
        const [rows]: any = await db.execute(sql, [id_paquete]);
        return rows[0] || null;
    }
}

export default Paquetes;