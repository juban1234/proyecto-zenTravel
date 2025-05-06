import db from '../configs/config';
import bcrypt from "bcryptjs";
import Usuario from '../Dto/registroDto';
import Login from '../Dto/loginDto';
import ProfileDto from '../Dto/ProfileDto';



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
        return { logged: true, status: "Successful authentication", id: usuario.id_usuario ,rol: usuario.rol};
      }

      return { logged: false, status: "Invalid password" };
 
    }
    return { logged: false, status: "Invalid username or password" };

  }
  
  static async buscarUsuarioPorEmail(email: string) {
    const [rows]: any = await db.execute('CALL loginUsuario(?)', [email]);
    return rows[0]?.[0] || null;
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

  static async buscarDestino() {
  // let condiciones: string[] = [];
  // let valores: any[] = [];

  // if (search.nombre) {
  //   condiciones.push("nombre LIKE ?");
  //   valores.push(`%${search.nombre}%`);
  // }
  // if (search.pais) {
  //   condiciones.push("pais LIKE ?");
  //   valores.push(`%${search.pais}%`);
  // }
  // if (search.direccion) {
  //   condiciones.push("direccion LIKE ?");
  //   valores.push(`%${search.direccion}%`);
  // }
  // if (search.descripcion) {
  //   condiciones.push("descripcion LIKE ?");
  //   valores.push(`%${search.descripcion}%`);
  // }

  // if (condiciones.length === 0) {
  //   return { message: "No se especificaron criterios de búsqueda" };
  // }

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

  static async createPackage(paquete: any) { 
    const sql = `
        CALL crear_paquete_con_nombres(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
        paquete.nombrePaquete,           
        paquete.descripcion,             
        paquete.precioTotal,            
        paquete.imagenUrl,              
        paquete.duracionDias,          
        paquete.fechaInicioDisponible, 
        paquete.fechaFinDisponible,    
        paquete.descuento,               
        paquete.nombreHotel,             
        paquete.nombreTransporte,       
        paquete.nombreDestino
    ];
    
    try {
        const [result]: any = await db.execute(sql, values);
        return result;  
    } catch (error) {
        console.error("Error al crear paquete:", error);
        throw error;  
    }
  }

  static async getUserById(id_usuario: number) {
    const sql = 'SELECT * FROM Usuario WHERE id_usuario = ?';
    const [rows]: any = await db.execute(sql, [id_usuario]);
    return rows[0] || null;
  }

}

export default usuarioRepo;

