import express from "express";
import { informationUser, login, register } from "../controllers/controlerUser/controlerUser";
import verifyToken from "../middleware/verifyToken";
import profile from "../controllers/controlerUser/profileController";
import { validatorParams,validator } from "../middleware/register-validator";
import { refreshToken } from "../middleware/refreshToken";
import { customerSupport } from "../controllers/controlerUser/customerSupport";
import { verificarRol } from "../middleware/validatorRol";

const router = express.Router();

router.post('/login', login); // Funcional
router.post('/register' ,validatorParams, validator, register); // Funcional
router.patch('/profile',verifyToken,profile); // Funcional
router.post('/customerSupport', customerSupport); // funcional
router.get('/infoUserDTO',verifyToken,informationUser); //funcional
router.post('/refresToken', refreshToken) //funcional

export default router;

