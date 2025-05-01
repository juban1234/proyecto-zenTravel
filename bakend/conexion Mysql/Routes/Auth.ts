import express from "express";
import { login, register } from "../controllers/controlerUser/controlerUser";
import verifyToken from "../middleware/verifyToken";
import profile from "../controllers/controlerUser/profileController";
import { reserva } from "../controllers/controlerUser/ReservaControler";
import { buscar,SearchHotelByName,SearchTransporteByName } from "../controllers/controlerUser/SearchController";
import { validatorParams,validator } from "../middleware/register-validator";


const router = express.Router();

// Rutas de autenticación
router.post('/login', login); // Funcional
router.post('/register' ,validatorParams, validator, register); // Funcional
router.patch('/profile', verifyToken, profile); // Funcional


export default router;

