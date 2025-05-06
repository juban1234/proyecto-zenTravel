import express from "express";
import { buscar ,SearchHotelByName,SearchTransporteByName} from "../controllers/controllerServis/SearchController";
import { createPackage } from "../controllers/controlerUser/packageController";

const router = express.Router();

router.get('/destino',buscar); // Funcional
router.get('/hotel/', SearchHotelByName); // Funcional
router.get('/Transport',SearchTransporteByName); // funcional
router.post('/paquetes', createPackage); // funcional

export default router;