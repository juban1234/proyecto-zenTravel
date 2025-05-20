import { strict } from 'assert';
import db from '../configs/config';
import { Usuario } from '../Dto/User';

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

    static async añadirDestino(destino: any){
        const sql = `insert into destinos (pais,departamento,nombre,descripcion) values (?,?,?,?)`;
        const value = [
            
        ]
    }

}

export default admin;