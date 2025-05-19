import { Request, Response } from "express";
import admin from "../../repositories/adminRepo";
import { Usuario } from "../../Dto/User";
import generateHash from "../../Helpers/generateHash";


export const EliminarUsuarios = async(req:Request , res:Response) => {
    
    const nombre = req.params.nombre;

    if (!nombre) {
        return res.status(401).json({status: `no ha ingresado el nombre del usuario`});
    }

    try {
        
        const UserDelect = await admin.deleadUser(nombre);

        return res.status(200).json({
            status: "ok usuario eliminado",
            UserDelect
        })

    } catch (error) {

        console.error("❌ Error al eliminar los usuarios:", error);
        return res.status(500).json({ error: "Error en el servidor" });
    }

}

export const TraerUsuario = async(req:Request , res:Response) => {

    try {
        
        const user = await admin.TraerUser();
        return res.status(200).json({
            status: "ok usuario ",
            user
        })

    } catch (error) {
        
        console.error("❌ Error al traer los usuarios:", error);
        return res.status(500).json({ error: "Error en el servidor al momento de traer los usuarios" });
    }   

}

export const RolUsuario = async(req:Request , res:Response) => {
    const {nombre,rol} = req.body;
    if (!nombre || !rol) {
        return res.status(401).json({ status: `faltan campos para ingresar` })
    }
    try {
        
        const user = admin.editarRoles(nombre,rol)
        return res.status(200).json({
            status: `${nombre}, su rol fue actualizado a ${rol}`
        })

    } catch (error) {
        console.error("❌ Error al cambiar los roles del usuario los usuarios:", error);
        return res.status(500).json({ error: "Error en el servidor al momento de cambiar el rol del usuario" });
    }

}

export const newEmpleados = async(req:Request , res:Response) => {
    const {nombre,email,telefono,password,rol} = req.body;

    const rolesPermitidos = ['vendedor','soporte','admin']

    if (!nombre || !email || !telefono || !password) {
        return res.status(401).json({status: `faltan campos por ingresar`})
        
    }

    if (!rolesPermitidos.includes(rol) ) {
        return res.status(402).json({status: `el rol: ${rol} , tipo de rol no valido`})
    }


    const hash = await generateHash(password)

    try {
        
    const empleado = await admin.crearUsuarios(new Usuario(
        nombre,
        email,
        telefono,
        hash
    ), rol)
    
    console.log(empleado);

    return res.status(200).json({
        status: `el usuario a sido creado`,
    })
    
    } catch (error) {
        console.error("❌ Error al crear los usuarios:", error);
        return res.status(500).json({ error: "Error en el servidor al momento de crear los usuarios" });
    
    }

}