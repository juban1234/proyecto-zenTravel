import jwt from 'jsonwebtoken';
import { generateAccessToken } from '../Helpers/generateToken';
import { Request, Response, NextFunction } from 'express';

export const refreshToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.body.refreshToken;
  if (!token) return res.status(401).json({ message: 'No token provided' });

  jwt.verify(token, process.env.REFRESH_KEY_TOKEN!, (err: any, decoded: any) => {
    if (err) return res.status(403).json({ message: 'Invalid refresh token' });

    const newAccessToken = generateAccessToken(decoded.data);
    res.json({ accessToken: newAccessToken });
  });
};