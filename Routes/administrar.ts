import express from "express";
import { EliminarUsuarios , TraerUsuario , RolUsuario ,newEmpleados} from "../controllers/controlerAdmin/usuarios";
import { verificarRol } from "../middleware/validatorRol";
import { createDestino , createHabitacion, createHotel, createTransporte } from "../controllers/controlerAdmin/paquetes";
import { deleteDestino, deleteHotel, deletePaquete, deleteTransporte } from "../controllers/controlerAdmin/DeleteController";
import { validatorParams } from "../middleware/register-validator";

const router = express.Router();

// control de usuarios del sistema
router.patch('/Edite', verificarRol("admin"),RolUsuario); //funcional
router.delete('/UserDelete/:nombre',verificarRol('admin'),EliminarUsuarios) //funcional
router.get('/Users',verificarRol('admin','vendedor'),TraerUsuario)
router.post('/CreateUsers',validatorParams,verificarRol('admin'),newEmpleados)

// control de contenido del sistema
router.post('/CreateDestiny',verificarRol("admin",'vendedor'),createDestino);
router.post('/CreateHotel',verificarRol("admin",'vendedor'),createHotel);
router.post('/CreateRoom',verificarRol("admin",'vendedor'),createHabitacion);
router.post ('/CreateTransport',verificarRol("admin",'vendedor'),createTransporte);

// eliminar contenido del sistema
router.delete('/deletePackage/:id_paquete',verificarRol('admin'),deletePaquete);
router.delete('/deleteDestiny/:id_destino',verificarRol('admin'),deleteDestino);
router.delete('/deleteHotel/:id_hotel',verificarRol('admin'),deleteHotel);
router.delete('/deleteTransport/:id_transporte',verificarRol('admin'),deleteTransporte);

export default router;