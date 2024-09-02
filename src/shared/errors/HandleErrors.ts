import { NextFunction, Request, Response } from 'express';
import { AppError } from './AppError';
import ValidationError from './BadRequest';
import { isCelebrateError } from 'celebrate';
import { status_code } from '../consts/statusCode';
import NotFound from './NotFound';
import BadRequest from './BadRequest';

function HandleErrors(
  err: AppError | ValidationError | NotFound,
  request: Request,
  response: Response,
  next: NextFunction // eslint-disable-line
) {
  if (err instanceof AppError) {
    return response.status(err._code).json(err);
  } else if (err instanceof BadRequest) {
    return response.status(err.code).json(err.returnAsJSON());
  } else if (err instanceof NotFound) {
    return response.status(err.code).json(err.returnAsJSON());
  } else if (isCelebrateError(err)) {
    return response.status(400).json(err);
  } else {
    return response.status(status_code.INTERNAL_SERVER_ERROR).json({
      error: 'Internal Server Error',
      message: 'Houve algum erro que o servidor não soube lidar'
    });
  }
}

export default HandleErrors;
