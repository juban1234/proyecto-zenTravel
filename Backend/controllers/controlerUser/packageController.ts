import { Request, Response } from "express";
import Package from "../../Dto/Paquete";
import usuarioRepo from "../../repositories/usuarioRepo";

export const createPackage = async (req: Request, res: Response): Promise<Response> => {
    try {
      
        console.log("📩 Datos recibidos:", req.body);

      
        const id_usuario = (req as any).user.id;

        if (!id_usuario) {
            return res.status(401).json({ error: "Usuario no autenticado" });
        }
        
        console.log("ID de usuario autenticado:", id_usuario);

   
        const {
            nombrePaquete,
            descripcion,
            precioTotal,
            imagenUrl,
            duracionDias,
            fechaInicioDisponible,
            fechaFinDisponible,
            descuento,
            nombreHotel,
            nombreTransporte,
            nombreDestino
        } = req.body;

        console.log("Datos de Paquete:", {
            nombrePaquete,
            descripcion,
            precioTotal,
            imagenUrl,
            duracionDias,
            fechaInicioDisponible,
            fechaFinDisponible,
            descuento,
            nombreHotel,
            nombreTransporte,
            nombreDestino
        });

        if (!nombrePaquete || !descripcion || !precioTotal || !imagenUrl || !duracionDias || !fechaInicioDisponible || !fechaFinDisponible || !descuento || !nombreHotel || !nombreTransporte || !nombreDestino) {
            return res.status(400).json({ error: "Uno o más campos están vacíos o indefinidos" });
        }

        // ✅ Validar fechas
        const fechaInicio = new Date(fechaInicioDisponible);
        const fechaFin = new Date(fechaFinDisponible);
        if (isNaN(fechaInicio.getTime()) || isNaN(fechaFin.getTime())) {
            return res.status(400).json({ error: "Las fechas proporcionadas no son válidas" });
        }
        if (fechaInicio >= fechaFin) {
            return res.status(400).json({ error: "La fecha de inicio debe ser anterior a la fecha de fin" });
        }

        // ✅ Crear instancia de Paquete
        const newPackage = new Package(
            id_usuario,                     
            nombrePaquete,
            descripcion,
            precioTotal,
            imagenUrl,
            duracionDias,
            fechaInicio,
            fechaFin,
            descuento,
            nombreHotel,
            nombreTransporte,
            nombreDestino
        );

        // ✅ Enviar a la base de datos
        const resultado = await usuarioRepo.createPackage(newPackage);

        console.log("✅ Reserva creada con éxito ", resultado);
        return res.status(201).json({ status: "paquete creado con éxito" });
    } catch (error: any) {
        console.error("Error al crear el paquete:", error.message || error);
        return res.status(500).json({ error: "Error en el servidor" });
    }
};


export const Destino = async(req: Request, res:Response) =>{
    const {pais,departamento,nombre,descripcio} = req.body;
     console.log("datos del destino recibido", req.body);
     
    

}




