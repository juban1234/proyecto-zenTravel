import express from "express";
import verifyToken from "../middleware/verifyToken";

const router = express.Router();

router.post('/crearPackage');


export default router;