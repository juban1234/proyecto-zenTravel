import express from "express";
import { PreguntarAI } from "../controllers/controllerServis/geminiController";

const router = express.Router();

router.post("/Preguntar", PreguntarAI);

export default router;
