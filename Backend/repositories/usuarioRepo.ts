import db from '../configs/config';
import bcrypt from "bcryptjs";
import Usuario from '../Dto/registroDto';
import Login from '../Dto/loginDto';
import Reservas from '../Dto/reservasDto';
import UpdateProfileDto from '../Dto/UpdateProfileDto';
import SearchDto from '../Dto/SearchDto';
import { HistorialReservasDTO } from '../Dto/HistorialReservasDTO';
import Package from '../Dto/Paquete';
import { SupportRequestDTO } from '../Dto/SupportRequestDTO';
import { destino } from '../Dto/destino';
import { Hotel } from "../Dto/hotelDto"; 
import { HabitacionDTO } from '../Dto/HabitacionDTO';
import { TransporteDTO } from '../Dto/TransporteDTO';

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

  static async crearReserva(reserva: Reservas) {
    const sql = 'CALL CrearReserva(?, ?, ?)';
    const values = [reserva.id_usuario, reserva.cedula, reserva.id_paquete];
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


static async buscarHotelPorNombre(nombre: string) {
  const sql = 'SELECT * FROM Hotel WHERE nombre LIKE ?';
  const values = [`%${nombre}%`]; 
  const [rows]: any = await db.execute(sql, values);
  return rows;
}

static async buscartransportePorNombre(nombre: string) {
  const sql = 'SELECT * FROM Transporte WHERE empresa LIKE ?';
  const values = [`%${nombre}%`]; 
  const [rows]: any = await db.execute(sql, values);
  return rows;
}


static async createPackage(paquete: Package) { 
  const sql = `
      CALL crear_paquete_con_nombres(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const values = [
      paquete.id_usuario,
      paquete.nombrePaquete,           
      paquete.descripcion,                        
      paquete.imagenUrl,              
      paquete.duracionDias,          
      paquete.fechaInicioDisponible, 
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
  static async HistorialReservas(id_usuario: number) {
    const sql = `SELECT * FROM RESERVAS WHERE id_usuario = ? ORDER BY fecha DESC`;
    try {
      const [reservas]: any = await db.execute(sql, [id_usuario]);

      const historial = reservas.map((reserva: any) => {
        return new HistorialReservasDTO(
          reserva.id_reservas,
          reserva.fecha,
          reserva.estado,
          reserva.id_usuario,
          reserva.id_paquete
        );
      });

      return historial;
    } catch (error) {
      console.error('Error al obtener historial de reservas:', error);
      throw error;
    }
  }

  static async getUserById(id_usuario: number) {
    const sql = 'SELECT * FROM Usuario WHERE id_usuario = ?';
    const [rows]: any = await db.execute(sql, [id_usuario]);
    return rows[0] || null;
  }

  static async getPackageById(id_paquete: number) {
    const sql = 'call calcular_precio_paquete(?)';

    const [rows]: any = await db.execute(sql, [id_paquete]);
    return rows[0] || null;
  }

  static async UsuariosMarketing(){
    const sql = 'SELECT nombre, email FROM Usuario WHERE rol = "cliente"';
    const [rows]: any = await db.execute(sql);
    return rows[0] || null;
  }

static async createDestino(destino: destino) {
    const sql = 'INSERT INTO Destinos (pais,departamento,nombre,descripcion) VALUES (?, ?, ?, ?)';
    const values = [destino.pais, destino.departamento, destino.nombre, destino.descripcion];
    try {
      const [result]: any = await db.execute(sql, values);
      return result;
    } catch (error) {
      console.error("Error al crear destino:", error);
      throw error;
    }
  }

  static async createHotel(hotel: Hotel) {
    const sql = `
      INSERT INTO Hotel (nombre, descripcion, ubicacion) 
      VALUES (?, ?, ?)
    `;
    const values = [
      hotel.nombre,
      hotel.descripcion,
      hotel.ubicacion, 
    ];
    try {
      const [result]: any = await db.execute(sql, values);
      return result;
    } catch (error) {
      console.error("Error al crear hotel:", error);
      throw error;
    }
  }

  static async createHabitacion(habitacion: HabitacionDTO) {
    const sql = `
      INSERT INTO Habitacion (tipo,numero,precio,disponible) 
      VALUES (?, ?, ?, ?)
    `;
    const values = [
      habitacion.tipo,
      habitacion.numero,
      habitacion.precio,
      habitacion.disponible,
    ];
    try {
      const [result]: any = await db.execute(sql, values);
      return result;
    } catch (error) {
      console.error("Error al crear hotel:", error);
      throw error;
    }
  }

   static async createTransporte(transporte: TransporteDTO) {
  const sql = `
    INSERT INTO Transporte (
      tipo, empresa, origen, destino,
      fecha_salida, fecha_llegada,
      duracion, precio, capacidad, clase
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    transporte.tipo,
    transporte.empresa,
    transporte.origen,
    transporte.destino,
    transporte.fechaSalida,
    transporte.fechaLlegada,
    transporte.duracion,
    transporte.precio,
    transporte.capacidad,
    transporte.clase
  ];

  try {
    const [result]: any = await db.execute(sql, values);
    return result;
  } catch (error) {
    console.error("Error al crear transporte:", error);
    throw error;
  }
}

static async CancelarReserva(id_reserva: number) {

  const checkSql = 'SELECT estado FROM reservas WHERE id_reservas = ?';
  const [result]: any = await db.execute(checkSql, [id_reserva]);

  if (result.length === 0) {
    return null; 
  }

  const estado = result[0].estado;
  if (estado !== 'activa') {
    return null; 
  }
  
  const sql = 'UPDATE reservas SET estado = ? WHERE id_reservas = ?';
  const values = ['cancelada', id_reserva];

  try {
    const [updateResult]: any = await db.execute(sql, values);
    return updateResult;
  } catch (error) {
    console.error("Error al cancelar reserva:", error);
    throw error;
  }
}

static async buscarHabitacionesPorIdHotel (id_hotel: number) {
 
  const sql = 'SELECT * FROM Habitacion WHERE id_hotel = ?';
  const [rows]: any = await db.execute(sql, [id_hotel]);
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
}

export default usuarioRepo;

