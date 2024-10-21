import { NextFunction, Request, Response } from 'express';
import { UnauthorizedError } from '../../../../shared/errors/UnauthorizedError';
import jwt from 'jsonwebtoken';
const SECRET_KEY = process.env.SECRET_KEY || 'secret_discreta';
export const authMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const token = request.headers.authorization?.split(' ')[1];

  if (!token) {
    throw new UnauthorizedError('Forneça um token válido e tente novamente.');
  }

  const decode = jwt.verify(token, SECRET_KEY);
  if (!decode) {
    throw new UnauthorizedError('Token invalido');
  }

  next();
};
