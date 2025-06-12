import express from "express";
import verifyToken from "../middleware/verifyToken";
import { reserva,actualizar, Historial , Cancelar } from "../controllers/controllerServis/ReservaControler";

const router = express.Router();

router.post('/Reservations', verifyToken, reserva); // funcional
router.patch('/Update',verifyToken, actualizar) // funcional
router.get('/Historial',verifyToken, Historial); // funcional
router.patch('/reservations/:id_reserva', Cancelar); 


export default router;