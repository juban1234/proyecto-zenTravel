import express from "express";
import { informationUser, login, register, SolicitarCambioRol } from "../controllers/controlerUser/controlerUser";
import verifyToken from "../middleware/verifyToken";
import profile from "../controllers/controlerUser/profileController";
import { validatorParams,validator } from "../middleware/register-validator";
import { refreshToken } from "../middleware/refreshToken";
import { customerSupport } from "../controllers/controlerUser/customerSupport";
import { puntuar } from "../controllers/controlerAdmin/soporteController";

const router = express.Router();

router.post('/login', login); // Funcional
router.post('/Register' ,validatorParams, validator, register); // Funcional
router.patch('/Profile',verifyToken,profile); // Funcional
router.post('/CustomerSupport', customerSupport); // funcional
router.get('/InfoUserDTO',verifyToken,informationUser); //funcional
router.post('/RefreshToken', refreshToken) //funcional
router.post('/cambio_rol',SolicitarCambioRol) // solicitar cambio de rol del usuario

// puntuaciones de las reseñas de hotel
router.post('/Report/Calificar', verifyToken ,puntuar  )

export default router;

