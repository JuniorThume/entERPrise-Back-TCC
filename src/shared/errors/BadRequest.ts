import { errors } from '../consts/errors';
import { status_code } from '../consts/statusCode';
import { AppError } from './AppError';

class BadRequest extends AppError {
  constructor(message: string) {
    super(message, status_code.BAD_REQUEST, errors.BadRequest);
  }
}

export { BadRequest };
