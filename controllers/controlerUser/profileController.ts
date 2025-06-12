import { Request,Response } from "express";
import usuarioRepo from "../../repositories/usuarioRepo";
import {ProfileDto }from "../../Dto/User";

const profile = async (req: Request, res: Response) => {
  try {
    const id_usuario = (req as any).user?.id;
    if (!id_usuario) {
      return res.status(401).json({ error: "Usuario no autenticado" });
    }

    const { nombre, telefono, estiloVida } = req.body;

    if (!nombre && !telefono && !estiloVida ) {
      return res.status(400).json({ error: "No se enviaron campos para actualizar" });
    }

    const dto = new ProfileDto(
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
export default profile;