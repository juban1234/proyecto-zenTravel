import db from '../configs/config';
import bcrypt from "bcryptjs";
import Usuario from '../Dto/registroDto';
import Login from '../Dto/loginDto';
import Reservas from '../Dto/reservasDto';
import UpdateProfileDto from '../Dto/UpdateProfileDto';
import SearchDto from '../Dto/SearchDto';



class usuarioRepo {

  static async createUsuario( usuario:Usuario){

      const sql = 'CALL CrearUsuario(?, ?, ?, ?,"cliente")';
      const values = [usuario.nombre, usuario.email, usuario.telefono,usuario.password];
      return db.execute(sql, values);
  }
    
  static async buscarUsuario(login: Login) {
    const sql = 'call loginUsuario(?)';
    const values = [login.email];
    const [rows]: any = await db.execute(sql, values);

    if (rows.length > 0) {
      const usuario = rows[0][0];
      

      console.log("🔍 Usuario encontrado:", usuario); 


      if (!usuario.password) {
        throw new Error("El usuario no tiene contraseña almacenada");
      }

      // Compara la contraseña ingresada con el hash almacenado
      const isPasswordValid = await bcrypt.compare(login.password, usuario.password);

      if (isPasswordValid) {
        return { logged: true, status: "Successful authentication", id: usuario.id_usuario };
      }

      return { logged: false, status: "Invalid password" };
 
    }
    return { logged: false, status: "Invalid username or password" };

  }

  static async crearReserva(reserva: Reservas) {
    const sql = 'CALL CrearReserva(?, ?, ?, ?)';
    const values = [reserva.id_usuario, reserva.fecha, reserva.estado, reserva.id_paquete];
    return db.execute(sql, values);
  }
  

  static async buscarUsuarioPorEmail(email: string) {
    const [rows]: any = await db.execute('CALL loginUsuario(?)', [email]);
    return rows[0]?.[0] || null;
  }

  static async cambiarContraseña(login: Login) {
    const [result] = await db.execute('CALL actualizar_contraseña(?, ?)', [login.email, login.password]);
    return result;
  }

  static async EditarPerfil(profile: UpdateProfileDto) {
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

   static async buscarDestino(search: SearchDto) {
    let condiciones: string[] = [];
    let valores: any[] = [];

    if (search.nombre) {
      condiciones.push("nombre LIKE ?");
      valores.push(`%${search.nombre}%`);
    }
    if (search.pais) {
      condiciones.push("pais LIKE ?");
      valores.push(`%${search.pais}%`);
    }
    if (search.direccion) {
      condiciones.push("direccion LIKE ?");
      valores.push(`%${search.direccion}%`);
    }
    if (search.descripcion) {
      condiciones.push("descripcion LIKE ?");
      valores.push(`%${search.descripcion}%`);
    }

    if (condiciones.length === 0) {
      return { message: "No se especificaron criterios de búsqueda" };
    }

    const query = `SELECT * FROM Destinos WHERE ${condiciones.join(" AND ")}`;
    const [rows]: any = await db.execute(query, valores);

    return rows;
  }
  

}
export default usuarioRepo;

