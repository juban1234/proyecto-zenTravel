import db from '../configs/config';

class searchRepo {

    static async buscarDestino() {
        const query = `SELECT * FROM DESTINOS`;
        const [rows]: any = await db.execute(query);
        return rows;
    }

    static async buscarHoteles() {
        const sql = `select * from hotel`;
        const [rows]: any = await db.execute(sql);
        return rows
    }

    static async buscarHotelesCiudad(ciudad:string){
        const sql = `select * from hotel h where ciudad = ?`
        const [rows]: any = await db.execute(sql,[ciudad])
        return rows
    }

    static async buscartransporte() {
        const sql = `select * from Transporte`
        const [rows]: any = await db.execute(sql)
        return rows
    }

    static async buscartransportePorNombre(origen:string, destino:string) {
        const sql = 'SELECT * FROM Transporte where origen = ? and destino = ?';
        const values = [
            origen,
            destino
        ]
        const [rows]: any = await db.execute(sql,values);
        return rows;
    }

    static async traerHabitaciones(hotel: String){
        const sql = `call buscar_habitacion(?)`

        const [rows]: any = await db.execute(sql,[hotel]);
        return rows[0];   
    }
}

export default searchRepo;
