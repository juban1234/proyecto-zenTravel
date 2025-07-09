import db from '../configs/config';
import { Usuario } from '../Dto/User';
import { Destino, Habitacion, Hotel, Transporte } from '../Dto/SearchDto';

class admin {

    static async TraerUser(tipoUsuario: string) {
        const sql = `select * from usuario where rol = ?`;
        const value = tipoUsuario;
        const [rows]: any = await db.execute(sql,[value]);
        return await rows || null;
    }

static async deleadUserById(id_usuario: number) {
  const sql = 'CALL zentravel.Eliminar_usuario_por_id(?)';
  const values = [id_usuario];

  try {
    const [rows]: any = await db.execute(sql, values);
    return rows[0] || null;
  } catch (error) {
    console.error("❌ Error en el procedimiento almacenado:", error);
    throw error; 
  }
}

    static async editarRoles(nombre: String, rol: String) {
        const sql = `call zentravel.actualizar_rol( ? , ?)`
        const value = [nombre, rol]
        return await db.execute(sql, value);
    }

    static async crearUsuarios(empleado: Usuario, rol: String) {
        const sql = `INSERT INTO usuario (nombre, email, telefono, password, rol) VALUES (? , ? ,? ,? ,?)`;
        const value = [
            empleado.nombre,
            empleado.email,
            empleado.telefono,
            empleado.password,
            rol]
        const [rows]:any =  await db.execute(sql, value)
        return rows.affectedRows > 0;
    }

    static async añadirDestino(des: Destino) {
        const sql = `insert into destinos (pais,departamento,nombre,descripcion) values (?,?,?,?)`;
        const value = [
            des.pais,
            des.departamento,
            des.nombre,
            des.pais
        ]

        return await db.execute(sql, value)
    }

    static async añadirHotel(hotel: Hotel) {
        const sql = `INSERT INTO hotel (nombre, descripcion, ubicacion, estrellas, imagenes, ciudad, imageneshabitaciones) 
               VALUES (?, ?, ?, ?, ?, ?, ?)`;
        const values = [
            hotel.nombre,
            hotel.descripcion,
            hotel.ubicacion,
            hotel.estrellas,
            hotel.imagenes,
            hotel.ciudad,
          (hotel.imageneshabitaciones)     // ✅ nuevo campo
        ];
        const [result] = await db.execute(sql, values);
        return result;
    }

    static async añadirTransporte(trans: Transporte) {
        const sql = `insert into transporte(tipo,empresa,origen,destino,fecha_salida,duracion,precio,capacidad,clase)values(?,?,?,?,?,?,?,?,?)`;

        const values = [
            trans.tipo,
            trans.empresas,
            trans.origen,
            trans.destino,
            trans.fecha_salida,
            trans.duracion,
            trans.precio,
            trans.capacidad,
            trans.clase
        ]

        return await db.execute(sql, values)
    }

    static async añadirHabitacion(habit: Habitacion) {
        const sql = `CALL agregar_habitacion_hotel(?, ?, ?, ?, ?)`;
        const values = [
            habit.tipo,
            habit.numero,
            habit.precio,
            habit.id_hotel,
            habit.imagen
        ];

        const [rows] = await db.execute(sql, values);
        return rows;
    }


    static async eliminarPaquete(id_paquete: number) {
        const sql = 'DELETE FROM paquete WHERE id_paquete = ?';
        const values = [id_paquete];
        try {
            const [result]: any = await db.execute(sql, values);
            return result;
        } catch (error) {
            console.error("Error al eliminar paquete:", error);
            throw error;
        }

    }

    static async eliminarDestino(id_destino: number) {
        const sql = 'DELETE FROM destinos WHERE id_destino = ?';
        const values = [id_destino];
        try {
            const [result]: any = await db.execute(sql, values);
            return result;
        } catch (error) {
            console.error("Error al eliminar destino:", error);
            throw error;
        }
    }

    static async eliminarHotel(id_hotel: number) {
        const sql = 'DELETE FROM hotel WHERE id_hotel = ?';
        const values = [id_hotel];
        try {
            const [result]: any = await db.execute(sql, values);
            return result;
        } catch (error) {
            console.error("Error al eliminar hotel:", error);
            throw error;
        }
    }

    static async eliminarTransporte(id_transporte: number) {
        const sql = 'DELETE FROM transporte WHERE id_transporte = ?';
        const values = [id_transporte];
        try {
            const [result]: any = await db.execute(sql, values);
            return result;
        } catch (error) {
            console.error("Error al eliminar transporte:", error);
            throw error;
        }
    }

    static async editardestino( id_destino: number, D: any ) {

    let campos: string[] = [];
    let valores: any[] = [];

    if (D.nombre) {
    campos.push("nombre = ?");
    valores.push(D.nombre);
    }

    if (D.pais) {
    campos.push("pais = ?");
    valores.push(D.nombre);
    }

    if (D.departamento) {
    campos.push("departamento = ?");
    valores.push(D.nombre);
    }

    if (D.descripcion) {
    campos.push("descripcion = ?");
    valores.push(D.nombre);
    }

    if (campos.length === 0) {
    throw new Error("No se enviaron campos válidos para actualizar.");
    }

    const sql = `
    UPDATE destinos 
        SET ${campos.join(", ")}
        WHERE id_destino = ?
    `;

    valores.push(id_destino)

    const [result]: any = await db.execute(sql, valores);
    return result.affectedRows > 0;
    }

    static async editarHotel(id_hotel: number, D: any) {
    let campos: string[] = [];
    let valores: any[] = [];

    if (D.nombre) {
        campos.push("nombre = ?");
        valores.push(D.nombre);
    }

    if (D.descripcion) {
        campos.push("descripcion = ?");
        valores.push(D.descripcion);
    }

    if (D.ubicacion) {
        campos.push("ubicacion = ?");
        valores.push(D.ubicacion);
    }

    if (D.imagenes) {
        campos.push("imagenes = ?");
        valores.push(JSON.stringify(D.imagenes));
    }

    if (D.imagenesHabitaciones) {
        campos.push("imageneshabitaciones = ?");
        valores.push(JSON.stringify(D.imagenesHabitaciones));
    }

    if (campos.length === 0) {
        throw new Error("No se enviaron campos válidos para actualizar.");
    }

    const sql = `
        UPDATE hotel 
        SET ${campos.join(", ")}
        WHERE id_hotel = ?
    `;

    valores.push(id_hotel);
    console.log("Valores a actualizar:", valores);

    const [result]: any = await db.execute(sql, valores);
    return result.affectedRows > 0;
    }


    static async infoDashbord(): Promise<any[][]> {
        const [rows] = await db.query("CALL obtenerDashboard()");
        return rows as any[][];
    }

}

export default admin;