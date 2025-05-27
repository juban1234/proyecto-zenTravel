import express from "express";
import { EliminarUsuarios , TraerUsuario , RolUsuario ,newEmpleados} from "../controllers/controlerAdmin/usuarios";
import { verificarRol } from "../middleware/validatorRol";
import { createDestino , createHabitacion, createHotel, createTransporte } from "../controllers/controlerAdmin/paquetes";
import { deleteDestino, deleteHotel, deletePaquete, deleteTransporte } from "../controllers/controlerAdmin/DeleteController";
import { validatorParams } from "../middleware/register-validator";


const router = express.Router();

// control de usuarios del sistema
router.patch('/aditar', verificarRol("admin"),RolUsuario); //funcional
router.delete('/EliminarUsuarios/:nombre',verificarRol('admin'),EliminarUsuarios) //funcional
router.get('/usuarios',verificarRol('admin','vendedor'),TraerUsuario)
router.post('/crearUsuarios',validatorParams,verificarRol('admin'),newEmpleados)

// control de contenido del sistema
router.post('/createDestino',verificarRol("admin",'vendedor'),createDestino);
router.post('/createHotel',verificarRol("admin",'vendedor'),createHotel);
router.post('/createHabitacion',verificarRol("admin",'vendedor'),createHabitacion);
router.post ('/createTransporte',verificarRol("admin",'vendedor'),createTransporte);

// eliminar contenido del sistema
router.delete('/deletePaquete/:id_paquete',verificarRol('admin'),deletePaquete);
router.delete('/deleteDestino/:id_destino',verificarRol('admin'),deleteDestino);
router.delete('/deleteHotel/:id_hotel',verificarRol('admin'),deleteHotel);
router.delete('/deleteTransporte/:id_transporte',verificarRol('admin'),deleteTransporte);

export default router;