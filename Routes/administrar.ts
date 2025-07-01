import express from "express";
import { EliminarUsuarios , TraerUsuario , RolUsuario ,newEmpleados} from "../controllers/controlerAdmin/usuarios";
import { verificarRol } from "../middleware/validatorRol";
import { createDestino , createHabitacion, createHotel, createTransporte } from "../controllers/controlerAdmin/paquetes";
import { deleteDestino, deleteHotel, deletePaquete, deleteTransporte } from "../controllers/controlerAdmin/DeleteController";
import { validatorParams } from "../middleware/register-validator";
import { reporte } from "../controllers/controlerAdmin/soporteController";
import { uploadMultiple } from "../configs/multer";

const router = express.Router();

// control de usuarios del sistema
router.patch('User/EditeRol', verificarRol('Admin'),RolUsuario); //funcional
router.delete('/UserDelete/:nombre',verificarRol('Admin'),EliminarUsuarios) //funcional
router.get('/Users/:Rol',verificarRol('Admin','Empleado'),TraerUsuario)
router.post('/CreateUsers',validatorParams,verificarRol('Admin'),newEmpleados)

// control de contenido del sistema
router.post('/CreateDestiny',verificarRol('Admin','Empleado'),createDestino);
router.post('/CreateHotel',verificarRol('Admin','Empleado'),uploadMultiple,createHotel);
router.post('/CreateRoom',verificarRol('Admin','Empleado'),createHabitacion);
router.post ('/CreateTransport',verificarRol('Admin','Empleado'),createTransporte);

// eliminar contenido del sistema
router.delete('/deletePackage/:id_paquete',verificarRol('Admin'),deletePaquete);
router.delete('/deleteDestiny/:id_destino',verificarRol('Admin'),deleteDestino);
router.delete('/deleteHotel/:id_hotel',verificarRol('Admin'),deleteHotel);
router.delete('/deleteTransport/:id_transporte',verificarRol('Admin'),deleteTransporte);

//soporte del sistema
router.get('/Report/Soporte', reporte)
router.patch('/Report/Act/:id')

export default router;
