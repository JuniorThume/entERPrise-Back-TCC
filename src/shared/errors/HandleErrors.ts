import { NextFunction, Request, Response } from 'express';
import { AppError } from './AppError';
import { isCelebrateError } from 'celebrate';
import { status_code } from '../consts/statusCode';
import { NotFound } from './NotFound';
import { BadRequest } from './BadRequest';
import { UnauthorizedError } from './UnauthorizedError';
import { ConflictError } from './ConflictError';

function HandleErrors(
  err: AppError | BadRequest | NotFound | ConflictError | UnauthorizedError,
  request: Request,
  response: Response,
  next: NextFunction // eslint-disable-line
) {
  if (err instanceof AppError) {
    return response.status(err._code).json(err.returnAsJSON());
  } else if (isCelebrateError(err)) {
    return response.status(400).json(err);
  } else {
    return response.status(status_code.INTERNAL_SERVER_ERROR).json({
      error: 'Internal Server Error',
      message: 'Houve algum erro que o servidor não soube lidar',
      err: err
    });
  }
}

export default HandleErrors;
