import db from "../configs/config";
import { RowDataPacket } from "mysql2";

const mapearIntencion = (intencion: string): string => {
  const sinonimos: { [key: string]: string } = {
    destinos_romanticos: "romantico",
    destinos_historia: "historia",
    destinos_montana: "naturaleza",
    recomendaciones_personalizadas: "paquetes"
  };
  return sinonimos[intencion] || intencion;
};

export const consultarBDPorIntencion = async (
  intencion: string
): Promise<{ tipo: string; datos: any[] } | null> => {
  try {
    const intencionFinal = mapearIntencion(intencion);

    switch (intencionFinal) {
      case "destinos_playa":
      case "destinos_naturaleza":
      case "destinos_cultural":
        // Aquí podrías poner lógica en el futuro
        break;

      case "hoteles": {
        const [hoteles] = await db.query<RowDataPacket[]>(
          `SELECT nombre, ciudad, descripcion, ubicacion, imagenes FROM hotel`
        );
        if (hoteles.length > 0) {
          const datos = hoteles.map((h) => ({
            nombre: h.nombre,
            ciudad: h.ciudad,
            descripcion: h.descripcion,
            ubicacion: h.ubicacion,
            imagenes: h.imagenes
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
            calificacion: p.calificacion || 8.5,
            destino: p.nombre_destino,
            origen: p.nombre_transporte,
            creador: p.nombre_usuario
          }));
          return { tipo: "paquetes", datos };
        }
        break;
      }

      case "transporte": {
        const [transportes] = await db.query<RowDataPacket[]>(
          `SELECT tipo, empresa, origen, destino, fecha_salida FROM transporte`
        );
        if (transportes.length > 0) {
          const datos = transportes.map((t) => ({
            tipo: t.tipo,
            empresa: t.empresa,
            origen: t.origen,
            destino: t.destino,
            salida: t.fecha_salida
          }));
          return { tipo: "transporte", datos };
        }
        break;
      }

      case "aventura":
      case "relajacion":
      case "romantico":
      case "naturaleza":
      case "historia":
      case "cultural":
      case "gastronomia":
      case "playa":
      case "viaje_pareja":
      case "viaje_familiar":
      case "viaje_solo": {
        const [paquetesResult] = await db.query<any[][]>(`CALL listarPaquetes()`);
        const paquetes = paquetesResult[0];
        const categoria = intencionFinal;

        const filtrados = paquetes.filter(
          (p: any) =>
            p.categoria?.toLowerCase().includes(categoria) ||
            p.descripcion?.toLowerCase().includes(categoria)
        );

        if (filtrados.length > 0) {
          const datos = filtrados.map((p: any) => ({
            nombre: p.nombrePaquete,
            descripcion: p.descripcion,
            precio: parseFloat(p.precioTotal),
            imagenUrl: p.imagenURL,
            fechaInicio: p.fechaInicio,
            duracionDias: p.duracionDias,
            estado: p.estado,
            calificacion: p.calificacion || 8.5,
            destino: p.nombre_destino,
            origen: p.nombre_transporte,
            creador: p.nombre_usuario
          }));
          return { tipo: "paquetes", datos };
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
