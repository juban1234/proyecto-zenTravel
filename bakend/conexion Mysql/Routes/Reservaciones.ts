import express from "express";
import verifyToken from "../middleware/verifyToken";
import { reserva,actualizar, Historial } from "../controllers/controllerServis/ReservaControler";

const router = express.Router();

router.post('/Reserva', verifyToken, reserva); // funcional
router.patch('/Actualizar',verifyToken, actualizar) // funcional
router.get('/Historial',verifyToken, Historial); // funcional

export default router;