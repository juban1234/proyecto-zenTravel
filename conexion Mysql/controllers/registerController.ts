import { Request, Response } from "express";
import { createUsuario } from "../repositories/usuarioRepo";
import Usuario from "../Dto/UsuarioDto";


let register = async (req: Request, res: Response) => {
    try {
        
        const {nombre,email,presupuesto,telefono,estiloVida,password} = req.body;
        console.log("📩 Recibiendo datos del usuario:", req.body);

        const usuario:Usuario = {
            nombre,
            email,
            presupuesto,
            telefono,
            estiloVida,
            password,
        };

        const registerUsuario = await createUsuario.add(usuario);
        console.log("Usuario registrado:", registerUsuario);

        res.status(201).json(registerUsuario);
    } catch (error) {
        console.log(error);
        
    }

}



export default register;