import { check, validationResult, ValidationChain } from 'express-validator';
import { Request, Response, NextFunction } from 'express'; // Necesitas los tipos de Express

export const validatorParams: ValidationChain[] = [
  check('email').isEmail(),
  check('password').isLength({ min: 8, max: 15 }),
  check('nombre').isLength({ min: 1, max: 255 }),
  check('telefono').isMobilePhone('es-CO', { strictMode: false })
];

export function validator(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  next();
}