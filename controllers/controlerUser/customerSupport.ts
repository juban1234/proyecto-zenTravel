import { Request, Response } from "express";
import { SupportRequestDTO } from "../../Dto/SupportRequestDTO";
import usuarioRepo from "../../repositories/usuarioRepo"; 

export const customerSupport = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { nombre, email, asunto, mensaje } = req.body;

      
        if (!nombre || !email || !asunto || !mensaje) {
            return res.status(400).json({ error: "Todos los campos son obligatorios" });
        }

      
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: "El formato del correo electrónico no es válido" });
        }

        const solicitud = new SupportRequestDTO(nombre, email, asunto, mensaje);
        const resultado = await usuarioRepo.createSupportRequest(solicitud);

        return res.status(201).json({ status: "Solicitud enviada con éxito" , resultado});
    } catch (error: any) {
        console.error("Error al procesar la solicitud de atención al cliente:", error.message || error);
        return res.status(500).json({ error: "Error en el servidor" });
    }
};
