import express  from "express";
import verifyToken from "../middleware/verifyToken";
import profile from "../controllers/profileController";

const route = express.Router();

route.get('/', verifyToken,profile)

export default route;