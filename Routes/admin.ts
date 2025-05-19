import express from "express";
import { EliminarUsuarios , TraerUsuario , RolUsuario ,newEmpleados} from "../controllers/controlerAdmin/usuarios";
import { verificarRol } from "../middleware/validatorRol";


const router = express.Router();

router.patch('/aditar', verificarRol("admin"),RolUsuario); //funcional
router.delete('/EliminarUsuarios/:nombre',verificarRol('admin'),EliminarUsuarios) //funcional
router.get('/usuarios',verificarRol('admin','vendedor'),TraerUsuario)
router.post('/crearUsuarios',verificarRol('admin'),newEmpleados)

export default router;