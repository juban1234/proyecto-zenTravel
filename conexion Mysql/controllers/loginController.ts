import { Request, Response } from "express";
import { buscarUsuarioPorEmail } from "../repositories/usuarioRepo";
// import { validarContraseña } from "../repositories/usuarioRepo";

let login = async(req:Request, res:Response) =>{
    try {
        
        const {email,password} = req.body;
        console.log("datos resividos: " , req.body);

        const login = await buscarUsuarioPorEmail(email);
        console.log("usuario encontrado" , login[0]);

        
        

    } catch (error) {
        console.error("ubo u error desconocido");
    }
}

export default login;