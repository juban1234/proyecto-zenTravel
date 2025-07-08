import db from "../configs/config";
import { RowDataPacket } from "mysql2";

export const guardarEnMemoria = async (
  id_usuario: number,
  tipo: string,
  respuesta: string,
  pregunta: string
): Promise<void> => {
  try {
    await db.query(
      `INSERT INTO memoria_usuario (id_usuario, tipo, respuesta, pregunta) VALUES (?, ?, ?, ?)`,
      [id_usuario, tipo, respuesta, pregunta]
    );
  } catch (error) {
    console.error("Error al guardar en memoria:", error);
  }
};


export const buscarRespuestaPrevia = async (
  id_usuario: number,
  pregunta: string
): Promise<string | null> => {
  try {
    const [memorias] = await db.query<RowDataPacket[]>(
      `SELECT respuesta 
       FROM memoria_usuario 
       WHERE id_usuario = ? AND pregunta = ?
       ORDER BY fecha DESC 
       LIMIT 1`,
      [id_usuario, pregunta]
    );
    if (memorias.length) return memorias[0].respuesta;
    return null;
  } catch (error) {
    console.error("Error al buscar en memoria:", error);
    return null;
  }
};
