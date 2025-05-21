import { strict } from 'assert';
import db from '../configs/config';
import { Usuario } from '../Dto/User';
import { Destino, Habitacion, Hotel, Transporte } from '../Dto/SearchDto';

class admin {

    static async TraerUser(){
        const sql = `select * from usuario`;
        const [rows]: any = await db.execute(sql);
        return await rows || null;
    }

    static async deleadUser(nombre:String){
        const sql = `call zentravel.Eliminar_usuario(?)`;
        const [rows]: any = await db.execute(sql, [nombre]);
        return rows[0] || null;
    }

    static async editarRoles(nombre: String,rol: String){
        const sql = `call zentravel.actualizar_rol( ? , ?)`
        const value = [nombre,rol]
        return await db.execute(sql,value);
    }

    static async crearUsuarios(empleado: Usuario , rol:String){
       const sql = `INSERT INTO usuario (nombre, email, telefono, password, rol) VALUES (? , ? ,? ,? ,?)`;
       const value = [
        empleado.nombre,
        empleado.email,
        empleado.telefono,
        empleado.password,
        rol]

       return await db.execute(sql,value);
    }

    static async añadirDestino(des: Destino){
        const sql = `insert into destinos (pais,departamento,nombre,descripcion) values (?,?,?,?)`;
        const value = [
            des.pais,
            des.departamento,
            des.nombre,
            des.pais
        ]

        return await db.execute(sql,value)
    }

    static async añadirHotel(hotel: Hotel){
        const sql = `insert into hotel (nombre,descripcion,ubicacion,imagenes) values (?,?,?,?)`;
        const values = [
            hotel.nombre,
            hotel.descripcion,
            hotel.ubicacion,
            hotel.imagenes
        ]
        return await db.execute(sql,values)
    }

    static async añadirTransporte(trans: Transporte){
        const sql = `inser into transporte(tipo,empresa,origen,destino,fecha_salida,
        duracion,precio,capacidad,clase)
        values(?,?,?,?,?,?,?,?,?)`;

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

        return await db.execute(sql,values)
    }

    static async añadirHabitacion( habit: Habitacion){

    }
}

export default admin;
