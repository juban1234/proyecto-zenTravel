import db from "../configs/config";

export const buscarDestinoEnBD = async (pregunta: string): Promise<string | null> => {
  try {
    const [rows]: any = await db.query(
      `SELECT nombre, descripcion FROM destinos 
       WHERE LOWER(nombre) LIKE CONCAT('%', ?, '%') 
       OR LOWER(descripcion) LIKE CONCAT('%', ?, '%') 
       LIMIT 1`,
      [pregunta.toLowerCase(), pregunta.toLowerCase()]
    );

    if (rows.length > 0) {
      return `📍 ${rows[0].nombre}: ${rows[0].descripcion}`;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error al consultar la BD:", error);
    return null;
  }
};