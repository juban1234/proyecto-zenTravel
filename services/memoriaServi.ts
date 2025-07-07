import db from "../configs/config";
import { RowDataPacket } from "mysql2";

// Guarda sólo los campos existentes en memoria_usuario
export const guardarEnMemoria = async (
  id_usuario: number,
  tipo: string,
  respuesta: string
): Promise<void> => {
  try {
    await db.query(
      `INSERT INTO memoria_usuario (id_usuario, tipo, respuesta) VALUES (?, ?, ?)`,
      [id_usuario, tipo, respuesta]
    );
  } catch (error) {
    console.error("Error al guardar en memoria:", error);
  }
};

// Devuelve la última respuesta guardada para ese usuario
export const buscarRespuestaPrevia = async (
  id_usuario: number,
  _pregunta: string
): Promise<string | null> => {
  try {
    const [memorias] = await db.query<RowDataPacket[]>(
      `SELECT respuesta 
       FROM memoria_usuario 
       WHERE id_usuario = ? 
       ORDER BY fecha DESC 
       LIMIT 1`,
      [id_usuario]
    );
    if (memorias.length) return memorias[0].respuesta;
    return null;
  } catch (error) {
    console.error("Error al buscar en memoria:", error);
    return null;
  }
};
