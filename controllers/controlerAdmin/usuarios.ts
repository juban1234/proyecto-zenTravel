import { Request, Response } from "express";
import admin from "../../repositories/adminRepo";
import { Usuario } from "../../Dto/User";
import generateHash from "../../Helpers/generateHash";
import generarContrasena from "../../Helpers/generarContraseña";
import { UsuarioEmail } from "../../Helpers/sendRecoveryEmail";


export const EliminarUsuarioPorId = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (!id || isNaN(id)) {
    return res.status(400).json({ error: "ID inválido" });
  }

  try {
    await admin.deleadUserById(id);

    return res.status(200).json({ status: "Usuario eliminado correctamente" });

  } catch (error: any) {
    console.error("❌ Error al eliminar usuario por ID:", error);

    const msg = error?.sqlMessage || error?.message || "";

    if (msg.includes("El usuario no existe")) {
      return res.status(404).json({ error: "El usuario no existe." });
    }

    return res.status(500).json({ error: "Error en el servidor", detalle: msg });
  }
};




export const TraerUsuario = async(req:Request , res:Response) => {
    const Rol = req.params.Rol
    try {
        
        const user = await admin.TraerUser(Rol);
        
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
            status: `${nombre}, su rol fue actualizado a ${rol}`,
            user
        })

    } catch (error) {
        console.error("❌ Error al cambiar los roles del usuario los usuarios:", error);
        return res.status(500).json({ error: "Error en el servidor al momento de cambiar el rol del usuario" });
    }

}

export const newEmpleados = async(req:Request , res:Response) => {
    const {nombre,email,telefono} = req.body;
    let {rol} = req.body;

    const rolesPermitidos = ['cliente','empleado','admin']
    const password = generarContrasena()

    if (!nombre || !email || !telefono || !password) {
        return res.status(401).json({status: `faltan campos por ingresar`})
    }

    rol = rol.toLowerCase();

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

    await UsuarioEmail(email , password)    

    return res.status(200).json({
        status: `el usuario ha sido creado`,
        empleado
    })
    
    } catch (error) {
        console.error("❌ Error al crear los usuarios:", error);
        return res.status(500).json({ error: "Error en el servidor al momento de crear los usuarios" });
    
    }

}

export const Dashboard = async(req:Request , res:Response) => {
    try {
        const resultSets = await admin.infoDashbord();

        res.json({
            totalUsuarios: resultSets[0][0]?.totalUsuarios || 0,
            paquetesActivos: resultSets[1][0]?.paquetesActivos || 0,
            ventasDelMes: resultSets[2][0]?.ventasDelMes || 0,
            reservasPendientes: resultSets[3][0]?.reservasPendientes || 0,
            actividadReciente: resultSets[4] || []
        });
    } catch (error) {
        console.error("❌ Error al obtener dashboard:", error);
        res.status(500).json({ error: "Error en el servidor al obtener datos del dashboard" });
    }
}