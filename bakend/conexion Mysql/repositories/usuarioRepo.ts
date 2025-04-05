import db from '../configs/config';
import bcrypt from "bcryptjs";
import Usuario from '../Dto/UsuarioDto';
import Login from '../Dto/loginDto';
import Reservas from '../Dto/reservasDto';



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
      
      console.log("🔍 Usuario encontrado:", usuario); // Verifica que la contraseña se esté recuperando correctamente

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
  
}
export default usuarioRepo;

