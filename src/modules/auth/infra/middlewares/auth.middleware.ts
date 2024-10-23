import { NextFunction, Request, Response } from 'express';
import { UnauthorizedError } from '../../../../shared/errors/UnauthorizedError';
import jwt, { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import { SECRET_KEY } from '../../../../shared/consts/secret';
export const authMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const token = request.headers.authorization?.split(' ')[1];

  if (!token) {
    throw new UnauthorizedError('Forneça um token válido e tente novamente.');
  }

  try {
    jwt.verify(token, SECRET_KEY);
    next();
  } catch (err) {
    if (err instanceof TokenExpiredError) {
      throw new UnauthorizedError('Token Expirado');
    } else if (err instanceof JsonWebTokenError) {
      throw new UnauthorizedError('Token inválido');
    }
  }
};
