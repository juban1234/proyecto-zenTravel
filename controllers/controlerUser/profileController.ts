import { Request,Response } from "express";
import usuarioRepo from "../../repositories/usuarioRepo";
<<<<<<< HEAD:bakend/conexion Mysql/controllers/controlerUser/profileController.ts
import UpdateProfileDto from "../../Dto/UpdateProfileDto";
=======
import {ProfileDto }from "../../Dto/User";
>>>>>>> 2c0628f48a0854d72e82f6550a3208e910a80be6:controllers/controlerUser/profileController.ts

const profile = async (req: Request, res: Response) => {
  try {
    const id_usuario = (req as any).user?.id;
    if (!id_usuario) {
      return res.status(401).json({ error: "Usuario no autenticado" });
    }

<<<<<<< HEAD:bakend/conexion Mysql/controllers/controlerUser/profileController.ts
    const { nombre, telefono, estiloVida, presupuesto } = req.body;

    if (!nombre && !telefono && !estiloVida && presupuesto === undefined) {
      return res.status(400).json({ error: "No se enviaron campos para actualizar" });
    }

    const dto = new UpdateProfileDto(
=======
    const { nombre, telefono, estiloVida } = req.body;

    if (!nombre && !telefono && !estiloVida ) {
      return res.status(400).json({ error: "No se enviaron campos para actualizar" });
    }

    const dto = new ProfileDto(
>>>>>>> 2c0628f48a0854d72e82f6550a3208e910a80be6:controllers/controlerUser/profileController.ts
      id_usuario,
      nombre,
      telefono,
      estiloVida
    );

    const result = await usuarioRepo.EditarPerfil(dto);

    console.log("✅ Resultado de actualización:", result);

    return res.status(200).json({ status: "Perfil actualizado correctamente" });

  } catch (error: any) {
    console.error("❌ Error al actualizar perfil:", error.message);
    return res.status(500).json({ error: error.message });
  }
};
<<<<<<< HEAD:bakend/conexion Mysql/controllers/controlerUser/profileController.ts
=======

>>>>>>> 2c0628f48a0854d72e82f6550a3208e910a80be6:controllers/controlerUser/profileController.ts
export default profile;