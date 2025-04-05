import express  from "express";
import verifyToken from "../middleware/verifyToken";
import reserva from "../controllers/reservaContoller";




const route = express.Router();

route.post('/', verifyToken, reserva)

export default route;