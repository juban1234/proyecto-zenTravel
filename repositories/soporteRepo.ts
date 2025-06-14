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
}

export default Soporte;