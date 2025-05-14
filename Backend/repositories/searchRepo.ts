import db from '../configs/config';

class searchRepo {

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

}

export default searchRepo;