import express from "express";
import { buscar ,SearchHotelByName,SearchTransporteByName} from "../controllers/controllerServis/SearchController";
import { createPackage ,valuePackage,listarPaquetes, traerPaquetes_usuario} from "../controllers/controlerUser/packageController";
import verifyToken from "../middleware/verifyToken";
import { verificarRol } from "../middleware/validatorRol";

const router = express.Router();

router.get('/destino',buscar); // Funcional
router.get('/hotel/:nombre', SearchHotelByName); // Funcional
router.get('/Transport',SearchTransporteByName); // funcional
router.post('/create',verifyToken,verificarRol('cliente','admin','vendedor'),createPackage); // funcional
router.get('/paketes',listarPaquetes)
router.get('/pakete',verifyToken,traerPaquetes_usuario)
router.post('/calcularPrecio',valuePackage)

export default router;