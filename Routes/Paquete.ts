import express from "express";
import { buscar ,SearchHotel,SearchTransporteByName,buscar_habitacion} from "../controllers/controllerServis/SearchController";
import { createPackage ,valuePackage,listarPaquetes, traerPaquetes_usuario, actualizarPaquete} from "../controllers/controlerUser/packageController";
import verifyToken from "../middleware/verifyToken";
import { verificarRol } from "../middleware/validatorRol";

const router = express.Router();

router.get('/destino',buscar); // Funcional
router.get('/hotel', SearchHotel); // Funcional
router.get('/Transport',SearchTransporteByName); // funcional
router.get('/habitacion/:hotel',buscar_habitacion)

// 📦 Rutas públicas para paquetes
router.get("/paquetes", listarPaquetes) // Listar todos los paquetes

// 📦 Rutas protegidas para paquetes (requieren autenticación)
router.post("/paquetes/create",verificarRol("cliente", "admin", "vendedor"), createPackage) // Crear paquete
router.post("/paquetes/calcular",verificarRol("cliente", "admin", "vendedor"), verifyToken,  valuePackage) // Calcular precio
router.get("/paquetes/usuario", verifyToken, traerPaquetes_usuario) // Listar paquetes por usuario
router.put("/paquetes/:id", verificarRol("cliente", "admin", "vendedor") ,verifyToken, actualizarPaquete) // Actualizar paquete

export default router;