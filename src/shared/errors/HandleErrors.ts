import { NextFunction, Request, Response } from 'express';
import { AppError } from './AppError';

function HandleErrors(
  err: AppError,
  request: Request,
  response: Response,
  next: NextFunction // eslint-disable-line
) {
  if (err instanceof AppError) {
    return response
      .status(err._code)
      .json({ error: err._name, message: err.message, details: err._details });
  } else {
    return response.status(500).json({
      error: 'Internal Server Error',
      message: 'Algo acontece e o servidor nao soube lidar com isso'
    });
  }
}

export default HandleErrors;
