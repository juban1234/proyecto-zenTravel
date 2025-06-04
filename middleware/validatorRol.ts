import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const verificarRol = (...rolesPermitidos: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    console.log(authHeader);
    

    if (!authHeader) {
      return res.status(401).json({ error: 'Token no proporcionado' });
    }

    const token = authHeader.split(' ')[1];

    try {
      const decoded = jwt.verify(token, process.env.KEY_TOKEN as string) as { id: number; rol: string };

      console.log("rol: ",decoded.rol );
      

      if (!rolesPermitidos.includes(decoded.rol)) {
        return res.status(403).json({ error: 'Acceso denegado: rol no autorizado' });
      }

      (req as any).user = decoded.id;
      console.log("✅ Token decodificado:", decoded);

      next();
    } catch (error) {
      return res.status(401).json({ error: 'Token inválido o expirado' });
    }
  };
};
