import express from "express";
import { login, register, reserva } from "../controllers/controlerUser";
import verifyToken from "../middleware/verifyToken";
import { profile } from "../controllers/controlerUser";
import { Router } from 'express';

const router = express.Router();

router.post('/login', login)
router.post('/register', register)
router.post('/reserva', verifyToken, reserva)
router.patch('/profile', verifyToken,profile)
router.get('/recuperarContraseña',verifyToken)



export default router;

