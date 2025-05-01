import { Request, Response } from "express";
import { buscarUsuarioPorEmail } from "../repositories/usuarioRepo";
import { validarContraseña } from "../repositories/usuarioRepo";
import { ActualizarPerfil } from "../repositories/usuarioRepo";


let login = async(req:Request, res:Response) =>{
    try {
        
        const {email,password} = req.body;
        console.log("datos resividos: " , req.body);


        const login = await buscarUsuarioPorEmail(email);
        console.log("usuario encontrado" , login[0]);

        
        const validar = await validarContraseña(email,password);
        console.log("contraseña valida", validar);

        const Actualizar = await ActualizarPerfil(email,telefono,estiloVida,nombre);
        console.log("perfil actualizado", Actualizar);
        

    } catch (error) {
        console.error("hubo un error desconocido");
    }
}

export default login;