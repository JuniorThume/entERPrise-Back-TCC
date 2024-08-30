import { NextFunction, Request, Response } from 'express';
import { AppError } from './AppError';
import ValidationError from './ValidationError';
import { isCelebrateError } from 'celebrate';

function HandleErrors(
  err: AppError | ValidationError,
  request: Request,
  response: Response,
  next: NextFunction // eslint-disable-line
) {
  if (err instanceof AppError) {
    return response.status(err._code).json(err);
  } else if (err instanceof ValidationError) {
    return response.status(err.code).json(err.returnAsJSON());
  } else if (isCelebrateError(err)) {
    return response.status(400).json(err);
  } else {
    return response.status(500).json({
      error: 'Internal Server Error',
      message: 'Houve algum erro que o servidor não soube lidar'
    });
  }
}

export default HandleErrors;
