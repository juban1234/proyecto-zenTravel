import { Request, Response } from "express";
import Package from "../../Dto/Paquete";
import Paquetes from "../../repositories/paqueteRepo";

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
            imagenUrl,
            duracionDias,
            fechaInicioDisponible,
            fechaFinDisponible,
            descuento,
            nombreHotel,
            nombreTransporte,
            nombreDestino,
            categoria,
            incluye,
            noIncluye
        } = req.body

        if ( !id_usuario || !nombrePaquete || !descripcion || !imagenUrl || !duracionDias || !fechaInicioDisponible || !descuento || !nombreHotel || !nombreTransporte || !nombreDestino) {
            return res.status(400).json({ error: "Uno o más campos están vacíos o indefinidos" });
        }


    const dto = new Package (
      nombrePaquete,
      descripcion,
      imagenUrl,
      duracionDias,
      fechaInicioDisponible,
      fechaFinDisponible,
      descuento,
      nombreHotel,
      nombreTransporte,
      nombreDestino,
      categoria,
      incluye,
      noIncluye
    )

        const resultado = await Paquetes.createPackage(dto,id_usuario);

        console.log("✅ Reserva creada con éxito ", resultado);
        return res.status(201).json({ status: "paquete creado con éxito" });
    } catch (error: any) {
        console.error("Error al crear el paquete:", error.message || error);
        return res.status(500).json({ error: "Error en el servidor" });
    }
};

export const valuePackage = async (req: Request, res: Response) => {
    try {
        const { id_paquete } = req.body;  

        if (!id_paquete || isNaN(Number(id_paquete))) {
            return res.status(400).json({ error: "El id_paquete es requerido y debe ser un número válido" });
        }

        const paquete = await Paquetes.calcularPaquete(Number(id_paquete));

        return res.status(200).json({
            status:"Paquete actualizado",
            paquete
    });
    } catch (error) {
        console.error("Error al calcular el total del paquete:", error);
        return res.status(500).json({ error: "Error en el servidor" });
    }

};

export const listarPaquetes = async(req: Request, res: Response) => {
    
    try{
        const paquetes = await Paquetes.traerPaquetes()

        return res.status(200).json({
            status: `paquetes encontrados`,
            paquetes
        })

    }catch(error){
        console.error("Error al traer los paquete del usaurio: ", error);
        return res.status(500).json({ error: `error en el servidor al momento de buscar los paquetes del usuario` })
    }


}

export const traerPaquetes_usuario = async(req: Request, res: Response) => {
    const id_usuario = (req as any).user ;

    if (!id_usuario) {
        return res.status(400).json({ status: `usuario no encontrado` })
    }

    try{
        const paquetes = await Paquetes.traerPaquetes_usuario(Number(id_usuario))

        return res.status(200).json({
            status: `paquetes en contrados`,
            paquetes
        })

    }catch(error){
        console.error("Error al traer los paquete del usaurio: ", error);
        return res.status(500).json({ error: `error en el servidor al momento de buscar los paquetes del usuario` })
    }
   
}

export const actualizarPaquete = async (req: Request, res: Response) => {
  try {
    const {
      id_paquete,
      nombrePaquete,
      descripcion,
      imagenUrl,
      duracionDias,
      fechaInicioDisponible,
      fechaFinDisponible,
      descuento,
      nombreHotel,
      nombreTransporte,
      nombreDestino,
      categoria,
      incluye,
      noIncluye
      } = req.body

    const dto = new Package (
      nombrePaquete,
      descripcion,
      imagenUrl,
      duracionDias,
      fechaInicioDisponible,
      fechaFinDisponible,
      descuento,
      nombreHotel,
      nombreTransporte,
      nombreDestino,
      categoria,
      incluye,
      noIncluye
      )


    if (!id_paquete || isNaN(Number(id_paquete))) {
      return res.status(400).json({
        success: false,
        message: "ID de paquete inválido",
      })
    }


    const result = await Paquetes.actualizar_package(dto,id_paquete)

    return res.status(200).json({
      success: true,
      message: "Paquete actualizado exitosamente",
      result
    })
  } catch (error: any) {
    console.error("❌ Error al actualizar paquete:", error)
    return res.status(500).json({
      success: false,
      message: "Error al actualizar el paquete"
    })
  }
}

