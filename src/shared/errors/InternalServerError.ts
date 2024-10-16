import { errors } from '../consts/errors';
import { status_code } from '../consts/statusCode';
import { AppError } from './AppError';

class InternalServerError extends AppError {
  constructor(message: string) {
    super(
      message,
      status_code.INTERNAL_SERVER_ERROR,
      errors.InternalServerError
    );
  }
}

export { InternalServerError };
