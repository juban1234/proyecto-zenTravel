import express from "express";
import { destino } from "../controllers/controllerProvider/Check-inController";
const router = express.Router();

router.post('/destiny',destino)
router.post('/hotel')
router.post('/transport')
router.post('/package')


export default router;