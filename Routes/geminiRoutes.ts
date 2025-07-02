import express from "express";
import { ZenIA } from "../controllers/controllerServis/geminiController";

const router = express.Router();

router.post("/ZenIA", ZenIA);

export default router;