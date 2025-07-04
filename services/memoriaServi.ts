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
      "SELECT pregunta, respuesta FROM memoria_usuario WHERE id_usuario = ? ORDER BY fecha DESC LIMIT 10",
      [id_usuario]
    );

    const normalizar = (texto: string) =>
      texto.toLowerCase().replace(/[^\u00C0-\u017Fa-z0-9\s]/gi, '').trim();

    const preguntaNorm = normalizar(pregunta);

    for (const memoria of memorias) {
      const memNorm = normalizar(memoria.pregunta || "");
      if (
        preguntaNorm.includes(memNorm) ||
        memNorm.includes(preguntaNorm)
      ) {
        return memoria.respuesta;
      }
    }

    return null;
  } catch (error) {
    console.error("Error al buscar en memoria:", error);
    return null;
  }
};
