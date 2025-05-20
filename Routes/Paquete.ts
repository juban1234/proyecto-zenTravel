import express from "express";
import { buscar ,SearchHotelByName,SearchTransporteByName} from "../controllers/controllerServis/SearchController";
import { createPackage ,valuePackage,listarPaquetes} from "../controllers/controlerUser/packageController";
import verifyToken from "../middleware/verifyToken";
import { verificarRol } from "../middleware/validatorRol";

const router = express.Router();

router.get('/destino',buscar); // Funcional
router.get('/hotel', SearchHotelByName); // Funcional
router.get('/Transport',SearchTransporteByName); // funcional
router.post('/create',verifyToken,verificarRol('cliente','admin','vendedor'),createPackage); // funcional
router.patch('/actualizar',);
router.get('/paketes/:id',listarPaquetes)
router.post('/calcularPrecio',valuePackage)

export default router;