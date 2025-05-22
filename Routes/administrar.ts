import express from "express";
import { EliminarUsuarios , TraerUsuario , RolUsuario ,newEmpleados} from "../controllers/controlerAdmin/usuarios";
import { verificarRol } from "../middleware/validatorRol";
import { createDestino , createHabitacion, createHotel, createTransporte } from "../controllers/controlerAdmin/paquetes";
import { deleteDestino, deleteHotel, deletePaquete, deleteTransporte } from "../controllers/controlerAdmin/DeleteController";


const router = express.Router();

// control de usuarios del sistema
router.patch('/aditar', verificarRol("admin"),RolUsuario); //funcional
router.delete('/EliminarUsuarios/:nombre',verificarRol('admin'),EliminarUsuarios) //funcional
router.get('/usuarios',verificarRol('admin','vendedor'),TraerUsuario)
router.post('/crearUsuarios',verificarRol('admin'),newEmpleados)

// control de contenido del sistema
router.post('/createDestino',verificarRol("admin",'vendedor'),createDestino);
router.post('/createHotel',verificarRol("admin",'vendedor'),createHotel);
router.post('/createHabitacion',verificarRol("admin",'vendedor'),createHabitacion);
router.post ('/createTransporte',verificarRol("admin",'vendedor'),createTransporte);

// eliminar contenido del sistema
router.delete('/deletePaquete/:id_paquete',deletePaquete);
router.delete('/deleteDestino/:id_destino',deleteDestino);
router.delete('/deleteHotel/:id_hotel',deleteHotel);
router.delete('/deleteTransporte/:id_transporte',deleteTransporte);

export default router;