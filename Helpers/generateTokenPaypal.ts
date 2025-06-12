import crypto from 'crypto';

/**
 * Genera un token único para identificar pagos.
 * @returns string
 */
export const generateToken = (): string => {
  return crypto.randomBytes(16).toString('hex'); // 32 caracteres hexadecimales
};
