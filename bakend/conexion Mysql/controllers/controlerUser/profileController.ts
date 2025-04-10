import { Request,Response } from "express";
import usuarioRepo from "../../repositories/usuarioRepo";
import UpdateProfileDto from "../../Dto/UpdateProfileDto";

const profile = async (req: Request, res: Response) => {
  try {
    const { nombre, telefono, estiloVida } = req.body;
    const id_usuario = (req as any).user?.id;

    // Validaciones
    if (!id_usuario) {
      return res.status(401).json({ error: "Usuario no autenticado" });
    }

    if (!nombre || !telefono || !estiloVida) {
      return res.status(400).json({ error: "Faltan datos obligatorios para actualizar el perfil" });
    }

    console.log("📩 Datos del perfil a actualizar:", { id_usuario, nombre, telefono, estiloVida });
    
    const actualizarPerfil = await usuarioRepo.EditarPerfil(
      new UpdateProfileDto(id_usuario,nombre,telefono, estiloVida)
    );
    

    console.log("✅ Perfil actualizado con éxito ", actualizarPerfil);
    return res.status(200).json({ status: "Perfil actualizado con éxito" });

  } catch (error: any) {
    console.error("❌ Error al actualizar el perfil:", error.message, error.stack);
    return res.status(500).json({ errorInfo: error.message });
  }
};
export default profile;