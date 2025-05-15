import jwt from 'jsonwebtoken';
import tokenRepo from '../repositories/tokenRepo';
import crypto from 'crypto';


const secretKey = process.env.KEY_TOKEN;
const refreshSecret = process.env.REFRESH_KEY_TOKEN!;

if (!secretKey) {
    throw new Error("Falta la variable KEY_TOKEN en el archivo .env");
  }
  

  export const generateAccessToken = (data: any, minutes = 15) => {
    return jwt.sign({ data }, secretKey, { expiresIn: `${minutes}m` });
  };
  
  export const generateRefreshToken = async (data: any) => {
    const userId = data.id;
    const token = jwt.sign({ data }, refreshSecret, { expiresIn: '7d' });
    tokenRepo.actualizarRefreshToken(userId, token);
    return token;
  };

export const generateTokenPaypal = (): string => {
  return crypto.randomBytes(16).toString('hex'); // 32 caracteres hexadecimales
};
