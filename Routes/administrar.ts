import express from "express";
import { EliminarUsuarios , TraerUsuario , RolUsuario ,newEmpleados} from "../controllers/controlerAdmin/usuarios";
import { verificarRol } from "../middleware/validatorRol";
import { createDestino } from "../controllers/controlerAdmin/paquetes";


const router = express.Router();

// control de usuarios del sistema
router.patch('/aditar', verificarRol("admin"),RolUsuario); //funcional
router.delete('/EliminarUsuarios/:nombre',verificarRol('admin'),EliminarUsuarios) //funcional
router.get('/usuarios',verificarRol('admin','vendedor'),TraerUsuario)
router.post('/crearUsuarios',verificarRol('admin'),newEmpleados)

// control de contenido del sistema
router.post('/createDestino',createDestino);
// router.post('/createHotel',createHotel);
// router.post('/createHabitacion',createHabitacion);
// router.post ('/createTransporte',createTransporte);

export default router;