import db from '../configs/config';
import bcrypt from "bcryptjs";
import {ProfileDto,Login,Usuario} from '../Dto/User';
import { SupportRequestDTO } from '../Dto/SupportRequestDTO';
import { log } from 'console';

class usuarioRepo {

  static async createUsuario( usuario:Usuario){
    const sql = 'CALL CrearUsuario(?, ?, ?, ?)';
    const values = [usuario.nombre, usuario.email, usuario.telefono,usuario.password];
    return db.execute(sql, values);
  }
    
  static async buscarUsuario(login: Login) {
    const sql = 'call loginUsuario(?)';
    const values = [login.email];
    const [rows]: any = await db.execute(sql, values);

    if (rows.length > 0) {
      const usuario = rows[0][0];

      if (!usuario.password) {
        throw new Error("El usuario no tiene contraseña almacenada");
      }

      // Compara la contraseña ingresada con el hash almacenado
      const isPasswordValid = await bcrypt.compare(login.password, usuario.password);

      if (isPasswordValid) {
        return { logged: true, status: "Successful authentication", id: usuario.id_usuario ,rol: usuario.rol};
      }

      return { logged: false, status: "Invalid password" };
 
    }
    return { logged: false, status: "Invalid username or password" };

  }
  
  static async buscarUsuarioPorEmail(email: string) {
    const [rows]: any = await db.execute('CALL loginUsuario(?)', [email]);
    const datos = rows[0][0]
    console.log(datos);
    
    return datos.email;
  }

  static async cambiarContraseña(login: Login) {
    const [result] = await db.execute('CALL actualizar_contraseña(?, ?)', [login.email, login.password]);
    return result;
  }

  static async EditarPerfil(profile: ProfileDto) {
    let campos: string[] = [];
    let valores: any[] = [];
  
    if (profile.nombre) {
      campos.push("nombre = ?");
      valores.push(profile.nombre);
    }
    if (profile.telefono) {
      campos.push("telefono = ?");
      valores.push(profile.telefono);
    }
    if (profile.estiloVida) {
      campos.push("estiloVida = ?");
      valores.push(profile.estiloVida);
    }

    if (campos.length === 0) return { message: "No hay campos para actualizar" };
  
    const query = `UPDATE Usuario SET ${campos.join(", ")} WHERE id_usuario = ?`;
    valores.push(profile.id_usuario);
  
    return db.execute(query, valores);
  }

  static async getUserById(id_usuario: number) {
    const sql = 'SELECT * FROM Usuario WHERE id_usuario = ?';
    const [rows]: any = await db.execute(sql, [id_usuario]);
    return rows[0] || null;
  }

  static async createSupportRequest(solicitud: SupportRequestDTO) {
    const sql = `
        INSERT INTO solicitudes_atencion (nombre, email, asunto, mensaje, fecha)
        VALUES (?, ?, ?, ?, ?)
    `;
    const values = [
        solicitud.getNombre,     
        solicitud.getEmail,      
        solicitud.getAsunto,      
        solicitud.getMensaje,     
        solicitud.getFecha        
    ];
    
    try {
        const [result]: any = await db.execute(sql, values);
        return result;  
    } catch (error) {
        console.error("Error al crear solicitud de soporte:", error);
        throw error;  
    }
  }

}
export default usuarioRepo;
