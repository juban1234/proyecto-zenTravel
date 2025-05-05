import jwt from 'jsonwebtoken';

const secretKey = process.env.KEY_TOKEN;
const refreshSecret = process.env.REFRESH_KEY_TOKEN;

if (!secretKey) {
    throw new Error("Falta la variable KEY_TOKEN en el archivo .env");
  }
  
  if (!refreshSecret) {
    throw new Error("Falta la variable REFRESH_KEY_TOKEN en el archivo .env");
  }

export const generateAccessToken = (data: any, minutes = 15) => {
    return jwt.sign({ data }, secretKey, { expiresIn: `${minutes}m` });
  };
  
  export const generateRefreshToken = (data: any) => {
    return jwt.sign({ data }, refreshSecret, { expiresIn: '7d' });
  };