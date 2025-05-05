import express from "express";
import { buscar ,SearchHotelByName,SearchTransporteByName} from "../controllers/controllerServis/SearchController";
import verifyToken from "../middleware/verifyToken";
import { createPackage } from "../controllers/controlerUser/packageController";
import { reserva } from "../controllers/controllerServis/ReservaControler";

const router = express.Router();

router.get('/search',buscar); // Funcional
router.get('/hotel/:nombre', SearchHotelByName); // Funcional
router.get('/SearchTransport/:nombre',SearchTransporteByName); // Funcional pruebas, verifica la reestructuración de la base de datos
router.post('/paquetes', createPackage);
router.post('/reserva', verifyToken, reserva); // no funciona debo restructurar la la fun cion de reservas

export default router;