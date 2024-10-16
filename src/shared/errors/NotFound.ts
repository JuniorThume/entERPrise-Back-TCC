import { errors } from '../consts/errors';
import { status_code } from '../consts/statusCode';
import { AppError } from './AppError';

class NotFound extends AppError {
  constructor(message: string) {
    super(message, status_code.NOT_FOUND, errors.NotFound);
  }
}

export { NotFound };
