import { errors } from '../consts/errors';
import { status_code } from '../consts/statusCode';
import { AppError } from './AppError';

class ConflictError extends AppError {
  constructor(message: string) {
    super(message, status_code.CONFLICT, errors.Conflict);
  }
}

export { ConflictError };
