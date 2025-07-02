import db from "../configs/config";
import { RowDataPacket } from "mysql2";

export const consultarBDPorIntencion = async (intencion: string): Promise<{ tipo: string; datos: any[] } | null> => {
  try {
    switch (intencion) {
      case "destinos_playa":
      case "destinos_naturaleza":
      case "destinos_cultural": {
        const [destinos] = await db.query<RowDataPacket[]>(`SELECT nombre, descripcion FROM destinos`);
        if (destinos.length > 0) {
          const datos = destinos.map((d) => ({
            nombre: d.nombre,
            descripcion: d.descripcion
          }));
          return { tipo: "destinos", datos };
        }
        break;
      }

      case "hoteles": {
        const [hoteles] = await db.query<RowDataPacket[]>(`SELECT nombre, ciudad FROM hotel`);
        if (hoteles.length > 0) {
          const datos = hoteles.map((h) => ({
            nombre: h.nombre,
            ciudad: h.ciudad
          }));
          return { tipo: "hoteles", datos };
        }
        break;
      }

      case "paquetes": {
        const [paquetesResult] = await db.query<any[][]>(`CALL listarPaquetes()`);
        const paquetes = paquetesResult[0];
        if (paquetes && paquetes.length > 0) {
          const datos = paquetes.map((p: any) => ({
            nombre: p.nombrePaquete,
            descripcion: p.descripcion,
            precio: parseFloat(p.precioTotal),
            imagenUrl: p.imagenURL,
            fechaInicio: p.fechaInicio,
            duracionDias: p.duracionDias,
            estado: p.estado,
            calificacion: p.calificacion || 8.5
          }));
          return { tipo: "paquetes", datos };
        }
        break;
      }

      case "transporte": {
        const [transportes] = await db.query<RowDataPacket[]>(`SELECT tipo, empresa, destino, fecha_salida FROM transporte`);
        
        if (transportes.length > 0) {
          const datos = transportes.map((t) => ({
            tipo: t.tipo,
            empresa: t.empresa,
            destino: t.destino,
            salida: t.fecha_salida
          }));
          return { tipo: "transporte", datos };
        }
        break;
      }

      default:
        return null;
    }
  } catch (error) {
    console.error("Error al consultar BD por intención:", error);
    return null;
  }

  return null;
};
