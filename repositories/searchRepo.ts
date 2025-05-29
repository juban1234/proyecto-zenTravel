import db from '../configs/config';

class searchRepo {

    static async buscarDestino() {
        const query = `SELECT * FROM DESTINOS`;
        const [rows]: any = await db.execute(query);
        return rows;
    }

    static async buscarHotelPorNombre() {
        const sql = `select * from hotel`;
        const [rows]: any = await db.execute(sql);
        return rows
    }

    static async buscartransportePorNombre() {
        const sql = 'SELECT * FROM Transporte';
        const [rows]: any = await db.execute(sql);
        return rows;
    }

    static async traerHabitaciones(ha: String){
        const sql = `call buscar_habitacion(?)`
        const [rows]: any = await db.execute(sql,[ha]);
        return rows;   
    }
}

export default searchRepo;