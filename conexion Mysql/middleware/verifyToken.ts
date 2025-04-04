import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
dotenv.config();

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ error: 'Token no proporcionado' });
    }

    try {
        const decoded = jwt.verify(token, process.env.KEY_TOKEN!) as { data: { id: number } };
        req.body.id_usuario = decoded.data.id; // Guarda el ID del usuario autenticado
        next();
    } catch (error) {
        return res.status(403).json({ error: 'Token inválido o expirado' });
    }
};

export default verifyToken;
