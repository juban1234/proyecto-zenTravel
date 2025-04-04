import express  from "express";
import verifyToken from "../middleware/verifyToken";



const route = express.Router();

route.post('/', verifyToken, )

export default route;