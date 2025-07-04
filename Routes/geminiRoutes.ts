import express from "express";
import { ZenIA } from "../controllers/controllerServis/geminiController";
import verifyToken from "../middleware/verifyToken";

const router = express.Router();

router.post("/ZenIA", verifyToken,ZenIA);

export default router;