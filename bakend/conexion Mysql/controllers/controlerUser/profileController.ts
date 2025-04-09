import { Request,Response } from "express";

let profile = async (req: Request, res: Response) => {
    try {    
      const idUser = (req as any).user.id;
      console.log("📩 Recibiendo datos del usuario:", idUser);
      
      return res.status(200).json(
        { status: 'Get profile Ok', id: idUser }
      );
    } catch (error: any) {
      return res.status(500).json({ errorInfo: "An unknown error has occurred" }
      );
    }
  }
  
export default profile;