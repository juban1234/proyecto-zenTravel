import { Request, Response } from "express";
import { createUsuario } from "../repositories/usuarioRepo";


let register = async (req: Request, res: Response) => {
    try {
        
        const {nombre,email,presupuesto,telefono,estiloVida,password} = req.body;
        console.log("📩 Recibiendo datos del usuario:", req.body);

        const registerUsuario = await createUsuario(nombre,email,presupuesto,telefono,estiloVida,password);
        console.log("Usuario registrado:", registerUsuario);

        res.status(201).json({message: "Usuario registrado con éxito"});
    } catch (error) {
        console.log(error);
        
    }

}



export default register;