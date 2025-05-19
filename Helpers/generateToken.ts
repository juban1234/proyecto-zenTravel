import jwt from 'jsonwebtoken';
import tokenRepo from '../repositories/tokenRepo';
import crypto from 'crypto';

const secretKey = process.env.KEY_TOKEN;
const refreshSecret = process.env.REFRESH_KEY_TOKEN;

if (!secretKey || !refreshSecret) {
  throw new Error("Faltan las variables KEY_TOKEN o REFRESH_KEY_TOKEN en el archivo .env");
}

export const generateAccessToken = (data: any, minutes = 15): string => {
  return jwt.sign({ data }, secretKey!, { expiresIn: `${minutes}m` });
};

export const generateRefreshToken = async (data: any): Promise<string> => {
  return jwt.sign({ data }, refreshSecret!, { expiresIn: '7d' });
};

export const generateTokenPaypal = (): string => {
  return crypto.randomBytes(16).toString('hex');
};

export const actualizarToken = async (data: { id: number, token: string }): Promise<void> => {
  const { id, token } = data;

  if (!id || !token) {
    throw new Error("Faltan datos necesarios para actualizar el token");
  }

  try {
    await tokenRepo.actualizarRefreshToken(id, token);
  } catch (error) {
    console.error("Error al actualizar el token:", error);
    throw error;
  }
};
