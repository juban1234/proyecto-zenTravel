import express from "express";
import verifyToken from "../middleware/verifyToken";
import { reserva,actualizar } from "../controllers/controllerServis/ReservaControler";

const router = express.Router();

router.post('/reserva', verifyToken, reserva); // funcional
router.patch('/actualizar',verifyToken, actualizar) // 


export default router;