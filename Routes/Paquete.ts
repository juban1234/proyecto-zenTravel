import express from "express";
import { buscar ,SearchHotel,SearchTransporteByName,buscar_habitacion} from "../controllers/controllerServis/SearchController";
import { createPackage ,valuePackage,listarPaquetes, traerPaquetes_usuario, actualizarPaquete, Marketing} from "../controllers/controlerUser/packageController";
import verifyToken from "../middleware/verifyToken";
import { verificarRol } from "../middleware/validatorRol";

const router = express.Router();

router.get('/Destiny',buscar); // Funcional
router.get('/Hotel', SearchHotel); // Funcional
router.get('/Transport',SearchTransporteByName); // funcional
router.get('/RoomReservation',buscar_habitacion)

// 📦 Rutas públicas para paquetes
router.get("/Package", listarPaquetes) // Listar todos los paquetes

// 📦 Rutas protegidas para paquetes (requieren autenticación)
router.post("/Create/Package",verificarRol("cliente", "admin", "vendedor"), createPackage) // Crear paquete
router.post("/Calculate/Package",verificarRol("cliente", "admin", "vendedor"), valuePackage) // Calcular precio
router.get("/User/Package", verifyToken, traerPaquetes_usuario) // Listar paquetes por usuario
router.put("/IDPackage", verificarRol("cliente", "admin", "vendedor") ,actualizarPaquete) // Actualizar paquete

// rutas para el marketing
router.post('/Marketing',verificarRol("admin","vendedor"),Marketing)

export default router;