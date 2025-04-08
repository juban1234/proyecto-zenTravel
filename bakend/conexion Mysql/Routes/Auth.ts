import express from "express";
import login from "../controllers/loginController";
import register from "../controllers/registerController";
import reserva from "../controllers/reservaContoller";
import verifyToken from "../middleware/verifyToken";
import profile from "../controllers/profileController";

const router = express.Router();

router.post('/login', login)
router.post('/register', register)
router.post('/reserva', verifyToken, reserva)
router.get('/profile', verifyToken,profile)
router.get('/recuperarContraseña',verifyToken)



export default router;