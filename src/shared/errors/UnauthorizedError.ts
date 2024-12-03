import { errors } from '../consts/errors';
import { status_code } from '../consts/statusCode';
import { AppError } from './AppError';

class UnauthorizedError extends AppError {
  constructor(message: string) {
    super(message, status_code.UNAUTHORIZED, errors.Unauthorized);
  }
}

export { UnauthorizedError };
