import express from "express";
import { login, register, informationUser } from "../controllers/controlerUser/controlerUser";
import verifyToken from "../middleware/verifyToken";
import profile from "../controllers/controlerUser/profileController";
import { validatorParams, validator } from "../middleware/register-validator";
import { customerSupport } from "../controllers/controlerUser/customerSupport";

const router = express.Router();

// Rutas de autenticación
router.post('/login', login); // Funcional
router.post('/register', validatorParams, validator, register); // Funcional
router.patch('/profile', verifyToken, profile); // Funcional
router.post('/customerSupport', customerSupport);
router.get('/infoUserDTO/',verifyToken,informationUser);


export default router;

