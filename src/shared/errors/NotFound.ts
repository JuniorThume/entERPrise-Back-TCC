import { errors } from '../consts/errors';
import { status_code } from '../consts/statusCode';

class NotFound extends Error {
  public code: number;
  public name: string;
  public details?: object;

  constructor(message: string, details?: object) {
    super(message);
    this.code = status_code.NOT_FOUND;
    this.details = details;
    this.name = errors.NotFound;
  }

  public returnAsJSON() {
    return {
      error: this.name,
      message: this.message,
      details: this.details
    };
  }
}

export { NotFound };
