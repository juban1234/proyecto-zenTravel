import express from "express";
import { buscar ,SearchHotel,SearchTransporteByName,buscar_habitacion,SearchTranport} from "../controllers/controllerServis/SearchController";
import {PackageController} from "../controllers/controlerUser/packageController";
import { EditController } from "../controllers/controllerServis/EditController";
import verifyToken from "../middleware/verifyToken";
import { verificarRol } from "../middleware/validatorRol";

const router = express.Router();

router.get('/Destiny',buscar); // Funcional
router.get('/Hotel', SearchHotel); // Funcional
router.get('/Transport',SearchTranport)
router.get('/Transport/:origen/:destino',SearchTransporteByName); // funcional
router.get('/RoomReservation/:hotel/:ciudad',buscar_habitacion)

// 📦 Rutas públicas para paquetes
router.get("/", PackageController.listarPaquetes) // Listar todos los paquetes

// 📦 Rutas protegidas para paquetes (requieren autenticación)
router.post("/Create/Package",verificarRol("cliente", 'admin', "empleado"),PackageController.createPackage) // Crear paquete
router.post("/Calculate/Package",verificarRol("cliente", 'admin', "empleado"), PackageController.valuePackage) // Calcular precio
router.get("/User/Package", verifyToken, PackageController.traerPaquetes_usuario) // Listar paquetes por usuario
router.put("/IDPackage/:id", verificarRol("cliente", 'admin', "empleado") ,PackageController.actualizarPaquete) // Actualizar paquete

// rutas para el marketing
router.post('/Marketing',verificarRol('admin', "empleado"),PackageController.Marketing)


//Rutas para editar 
router.put('/EditarDestino/:id_destino', verificarRol('admin', "empleado"),EditController.Editdestino);
router.put('/EditarHotel/:id_hotel',verificarRol('admin', "empleado"),EditController.EditarHotel);


export default router;