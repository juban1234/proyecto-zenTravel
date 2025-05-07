// geminiRoutes.js
import express from 'express';
import { PreguntarAI } from '../controllers/controlerUser/geminiController';

const router = express.Router();

router.post('/Preguntar', PreguntarAI);

export default router;



