import express from "express";
import { buscar ,SearchHotelByName,SearchTransporteByName} from "../controllers/controllerServis/SearchController";
import verifyToken from "../middleware/verifyToken";
import { createPackage } from "../controllers/controlerUser/packageController";

const router = express.Router();

router.get('/search',buscar); // Funcional
router.get('/hotel/:nombre', SearchHotelByName); // Funcional
router.get('/SearchTransport/:nombre',SearchTransporteByName); // Funcional pruebas, verifica la reestructuración de la base de datos
router.post('/paquetes', createPackage);

export default router;