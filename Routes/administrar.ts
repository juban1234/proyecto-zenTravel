import express from "express";
import { EliminarUsuarios , TraerUsuario , RolUsuario ,newEmpleados,Dashboard} from "../controllers/controlerAdmin/usuarios";
import { verificarRol } from "../middleware/validatorRol";
import { createDestino , createHabitacion, createHotel, createTransporte } from "../controllers/controlerAdmin/paquetes";
import { deleteDestino, deleteHotel, deletePaquete, deleteTransporte } from "../controllers/controlerAdmin/DeleteController";
import { validatorParams } from "../middleware/register-validator";
import { reporte } from "../controllers/controlerAdmin/soporteController";
import { uploadMultiple } from "../configs/multer";

const router = express.Router();

// control de usuarios del sistema
router.patch('User/EditeRol', verificarRol('admin'),RolUsuario); //funcional
router.delete('/UserDelete/:nombre',verificarRol('admin'),EliminarUsuarios) //funcional
router.get('/Users/:Rol',verificarRol('admin','empleado'),TraerUsuario)
router.post('/CreateUsers',validatorParams,verificarRol('admin'),newEmpleados)

// control de contenido del sistema
router.post('/CreateDestiny',verificarRol('admin','empleado'),createDestino);
router.post('/CreateHotel',verificarRol('admin','empleado'),uploadMultiple,createHotel);
router.post('/CreateRoom',verificarRol('admin','empleado'),createHabitacion);
router.post ('/CreateTransport',verificarRol('admin','empleado'),createTransporte);

// eliminar contenido del sistema
router.delete('/deletePackage/:id_paquete',verificarRol('admin'),deletePaquete);
router.delete('/deleteDestiny/:id_destino',verificarRol('admin'),deleteDestino);
router.delete('/deleteHotel/:id_hotel',verificarRol('admin'),deleteHotel);
router.delete('/deleteTransport/:id_transporte',verificarRol('admin'),deleteTransporte);

//soporte del sistema
router.get('/Report/Soporte', reporte)
router.patch('/Report/Act/:id')

//dasbord
router.get('/Info/Dashboard',verificarRol('admin' , 'empleado'),Dashboard)

export default router;
