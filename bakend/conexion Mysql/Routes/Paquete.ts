import express from "express";
import { buscar ,SearchHotelByName,SearchTransporteByName} from "../controllers/controllerServis/SearchController";
import verifyToken from "../middleware/verifyToken";
import { reserva } from "../controllers/controllerServis/ReservaControler"; 

const router = express.Router();

router.get('/search',buscar); // Funcional
router.get('/hotel/:nombre', SearchHotelByName); // Funcional
router.get('/SearchTransport/:nombre',SearchTransporteByName); // Funcional
router.post('/reserva', verifyToken, reserva); // no funciona debo restructurar la la fun cion de reservas

export default router;