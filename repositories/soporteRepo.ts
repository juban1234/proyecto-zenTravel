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

    static async PuntuacionHotel(data: any) {
  const insertSql = 
    `INSERT INTO resena_hotel (id_usuario, id_hotel, estrellas)
    VALUES (?, ?, ?);`
  
  const insertValues = [
    data.id_usuario,
    data.id_hotel,
    data.puntuacion
  ];

  const [insertResult]: any = await db.execute(insertSql, insertValues);

  if (insertResult.affectedRows === 0) {
    throw new Error("No se pudo registrar la puntuación.");
  }

  const selectSql = 
   ` SELECT estrellas
    FROM hotel
    WHERE id_hotel = ?;`
  
  const [selectRows]: any = await db.execute(selectSql, [data.id_hotel]);

  const nuevoPromedio = selectRows?.[0]?.estrellas || 0;

  return {
    promedio: nuevoPromedio
  };
}
}

export default Soporte;