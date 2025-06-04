import { Request, Response } from "express";
import Package from "../../Dto/Paquete";
import Paquetes from "../../repositories/paqueteRepo";
import nodemailer from "nodemailer";

export const createPackage = async (req: Request, res: Response): Promise<Response> => {
    try {
        const id_usuario = (req as any).user.id;

        console.log("📩 Datos recibidos:", req.body);
        

        if (!id_usuario) {
            return res.status(401).json({ error: "Usuario no autenticado" });
        }
        
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
            noIncluye,
            cantidad
        } = req.body

        if ( !id_usuario || !nombrePaquete || !descripcion || !imagenUrl || !duracionDias || !fechaInicioDisponible || !descuento || !nombreHotel || !nombreTransporte || !nombreDestino || !categoria || !incluye || !noIncluye) {
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

    const resultado = await Paquetes.createPackage(dto,cantidad, id_usuario);

    return res.status(201).json({ 
        status: "Paquete creado con éxito", 
        idPaquete: resultado 
    });

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
    const id_usuario = (req as any).user.id ;

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

    const id_paquete = Number(req.params.id)

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

export const Marketing = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { nombre, email, mensaje } = req.body;
        if (!nombre || !email || !mensaje) {
            return res.status(400).json({ error: "Todos los campos son obligatorios" });
        }

        const resultado = await Paquetes.createMarketing({ nombre, email, mensaje });
        console.log("Datos guardados en la base de datos:", resultado);

        // URL de la imagen en Cloudinary
        const cloudinaryImageUrl = "https://res.cloudinary.com/dscmvgpqd/image/upload/v1748546394/images_m8nuuw.jpg";


        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'zentravelagencia0@gmail.com',
                pass: 'gand dlhk crvv zday',
            }
        });


            const mailOptions = {
                from: 'ortiznicolas656@gmail.com',
                to: email,
                subject: '¡Gracias por interesarte en nuestros servicios!',
                text: `Hola ${nombre},\n\nGracias por ponerte en contacto con nosotros. Te informaremos pronto sobre las promociones especiales y servicios de marketing que tenemos disponibles.\n\n¡Nos encantaría ayudarte a crecer!`,
                html: `<p>Hola <strong>${nombre}</strong>,</p>
                    <p>Gracias por ponerte en contacto con nosotros. Te informaremos pronto sobre las promociones especiales y servicios de marketing que tenemos disponibles.</p>
                    <p><strong>¡Nos encantaría ayudarte a crecer!</strong></p>
                    <p><img src="${cloudinaryImageUrl}" alt="Promoción de Marketing" /></p>`,
            };


            await transporter.sendMail(mailOptions);
            return res.status(201).json({
                message: "Datos de marketing guardados correctamente y correo enviado",
                data: resultado
            });
        } catch (error: any) {
        console.error("Error al procesar la solicitud de marketing:", error);
        if (error.response) {
            console.error("Respuesta del error:", error.response);
        }
        return res.status(500).json({ error: "Error en el servidor", details: error.message || error });
    }

}

