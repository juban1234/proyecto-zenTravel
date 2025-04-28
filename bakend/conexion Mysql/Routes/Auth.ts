import express from "express";
import { login, register } from "../controllers/controlerUser/controlerUser";
import verifyToken from "../middleware/verifyToken";
import profile from "../controllers/controlerUser/profileController";
import { reserva } from "../controllers/controlerUser/ReservaControler";

const router = express.Router();

router.post('/login', login)// funcional
router.post('/register', register)// funcional
router.post('/reserva', verifyToken, reserva) // proceso de pruebas y reestructuracion  de la base de datos
router.patch('/profile', verifyToken,profile) // funcional



export default router;