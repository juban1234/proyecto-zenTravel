import express from "express";
import { login, register } from "../controllers/controlerUser/controlerUser";
import verifyToken from "../middleware/verifyToken";
import profile from "../controllers/controlerUser/profileController";
import { reserva } from "../controllers/controlerUser/ReservaControler";
import { buscar } from "../controllers/controlerUser/SearchController"; // Verifica que el controlador esté correctamente implementado

const router = express.Router();

// Rutas de autenticación
router.post('/login', login); // Funcional
router.post('/register', register); // Funcional
router.post('/reserva', verifyToken, reserva); // En pruebas, verifica la reestructuración de la base de datos
router.patch('/profile', verifyToken, profile); // Funcional
router.get('/search',buscar);


export default router;

