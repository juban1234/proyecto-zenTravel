import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const verificarRol = (...rolesPermitidos: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ error: 'Token no proporcionado' });
    }

    const token = authHeader.split(' ')[1];

    try {
      const decoded = jwt.verify(token, process.env.KEY_TOKEN as string) as any;

      const rolUsuario = decoded.data;

      if (!rolesPermitidos.includes(rolUsuario.rol)) {
        console.log(rolUsuario);
        return res.status(403).json({ error: 'Acceso denegado: rol no autorizado' });
        
      }

      (req as any).user = rolUsuario; 

      next();
    } catch (error) {
      return res.status(401).json({ error: 'Token inválido o expirado' });
    }
  };
};
