import db from "../configs/config";
import { RowDataPacket } from "mysql2";

// 💾 Guarda lo que el usuario preguntó y lo que recibió
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
    console.error("❌ Error al guardar en memoria:", error);
  }
};

// 🔍 Recuperar historial (opcional)
export const obtenerHistorialUsuario = async (
  id_usuario: number
): Promise<{ tipo: string; respuesta: string; fecha: string }[]> => {
  try {
    const [rows] = await db.query<RowDataPacket[]>(
      `SELECT tipo, respuesta, fecha FROM memoria_usuario WHERE id_usuario = ? ORDER BY fecha DESC`,
      [id_usuario]
    );

    return rows as any;
  } catch (error) {
    console.error("❌ Error al obtener historial del usuario:", error);
    return [];
  }
};
