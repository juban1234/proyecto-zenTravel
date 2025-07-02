import db from "../configs/config"

class Soporte {
    
    static async SoporteRepo(){
        const sql = `select * from solicitudes_atencion where estado = "NoDisp"`
        const [rows]:any = await db.execute(sql)
        return rows[0]
    }

    static async ActualizarRepo(){
        const sql = `UPDATE solicitudes_atencion 
        SET email = ? 
        WHERE (id_atencion = ?)`

        const values = [
            
        ]

        const [row]: any = await db.execute(sql)

        return row[1]
    }

    static async PuntuacionHotel(data: any){
        const sql = `INSERT INTO resena_hotel (id_usuario, id_hotel, estrellas) VALUES (? , ? , ?);`
        const values = [
            data.id_usuario,
            data.id_hotel,
            data.estrella
        ]
        const [rows]: any = await db.execute(sql,values)
        return rows.affectedRows > 0 
    }
}

export default Soporte;