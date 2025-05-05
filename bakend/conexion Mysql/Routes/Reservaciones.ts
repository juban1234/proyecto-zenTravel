import express from "express";
import verifyToken from "../middleware/verifyToken";
import { reserva } from "../controllers/controllerServis/ReservaControler";

const router = express.Router();

router.post('/reserva', verifyToken, reserva); // funcional
// router


export default router;