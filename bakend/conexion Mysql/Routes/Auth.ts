import express from "express";
import { login, register } from "../controllers/controlerUser/controlerUser";
import verifyToken from "../middleware/verifyToken";
import profile from "../controllers/controlerUser/profileController";
import { reserva } from "../controllers/controlerUser/ReservaControler";

const router = express.Router();

router.post('/login', login)
router.post('/register', register)
router.post('/reserva', verifyToken, reserva)
router.get('/profile', verifyToken,profile)
router.get('/recuperarContraseña',verifyToken)



export default router;