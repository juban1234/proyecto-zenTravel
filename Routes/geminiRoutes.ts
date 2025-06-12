<<<<<<< HEAD:bakend/conexion Mysql/Routes/geminiRoutes.ts
// geminiRoutes.js
import express from 'express';
import { PreguntarAI } from '../controllers/controlerUser/geminiController';

const router = express.Router();

router.post('/Preguntar', PreguntarAI);

export default router;



=======
import express from "express";
import { ZenIA } from "../controllers/controllerServis/geminiController";

const router = express.Router();

router.post("/ZenIA", ZenIA);

export default router;
>>>>>>> 2c0628f48a0854d72e82f6550a3208e910a80be6:Routes/geminiRoutes.ts
