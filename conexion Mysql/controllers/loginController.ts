// controllers/loginController.ts
import { Request, Response } from "express";
import { buscarUsuarioPorEmail, validarContraseña } from "../repositories/usuarioRepo";

export const loginController = async (req: Request, res: Response): Promise<Response> => {
    const { email, password } = req.body; // Extraemos el email y la contraseña del cuerpo de la solicitud

    try {
        console.log("📩 Buscando usuario con email:", email);

        // Llamamos al repositorio para buscar al usuario por su email
        const usuario = await buscarUsuarioPorEmail(email);
        
        if (!usuario) {
            return res.status(404).json({ message: "Usuario no encontrado" }); // Si no encontramos el usuario
        }

        // Comparamos la contraseña proporcionada con la almacenada en la base de datos
        const passwordMatch = await validarContraseña(password, usuario.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: "Contraseña incorrecta" }); // Si las contraseñas no coinciden
        }

        // Si la contraseña es correcta, devolvemos una respuesta con el usuario
        return res.status(200).json({ message: "Inicio de sesión exitoso", usuario });

    } catch (error) {
        console.error('Error al procesar la solicitud de login:', error);
        return res.status(500).json({ message: "Error al buscar el usuario" }); // Error interno
    }
};


