import { Request, Response } from "express";
import usuarioServi from "../services/usuarioServi";
import Login from "../Dto/loginDto";
import generateToken from '../Helpers/generateToken';
import dotenv from "dotenv";

dotenv.config();


let login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const login = await usuarioServi.login(new Login(email, password));
    if (login.logged) {
      return res.status(200).json({
        status: login.status,
        token: generateToken({id: login.id}, Number(process.env.KEY_TOKEN) || 0)
      });
    }
    return res.status(401).json({status: login.status});
    
  } catch (error) {
    console.log( error);
  }
}


export default login;