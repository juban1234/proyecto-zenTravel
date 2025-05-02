import express from "express";
import { buscar ,SearchHotelByName,SearchTransporteByName} from "../controllers/controlerUser/SearchController";
import verifyToken from "../middleware/verifyToken";
import { reserva } from "../controllers/controlerUser";
import { createPackage } from "../controllers/controlerUser/packageController";

const router = express.Router();


router.post('/package')
router.get('/search',buscar); // Funcional
router.get('/hotel/:nombre', SearchHotelByName); // Funcional
router.get('/SearchTransport/:nombre',SearchTransporteByName); // Funcional
router.post('/reserva', verifyToken, reserva); // En pruebas, verifica la reestructuración de la base de datos
router.post('/paquetes', createPackage);
export default router;