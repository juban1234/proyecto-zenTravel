import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
dotenv.config();

interface JwtPayload {
    data: { id: number };
    exp: number;
    iat: number;
}

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    // Buscar token en el header o en el cuerpo de la petición
    const token = req.header('Authorization')?.split(" ")[1] || req.body.token;

    if (!token) {
        return res.status(401).json({ error: 'No se ha enviado un token' });
    }

    try {
        if (!process.env.KEY_TOKEN) {
            return res.status(500).json({ error: 'Error en la configuración del servidor: KEY_TOKEN no está definida' });
        }

        const verified = jwt.verify(token, process.env.KEY_TOKEN) as JwtPayload;
        req.body.user = verified.data; // Guardamos el usuario autenticado

        next(); // Pasamos al siguiente middleware/ruta

    } catch (error) {
        return res.status(403).json({ status: 'Token inválido o expirado' });
    }
};

export default verifyToken;

