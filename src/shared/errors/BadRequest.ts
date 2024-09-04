import { errors } from '../consts/errors';
import { status_code } from '../consts/statusCode';

class BadRequest extends Error {
  public code: number;
  public name: string;
  public details?: object;

  constructor(message: string, details?: object) {
    super(message);
    this.code = status_code.BAD_REQUEST;
    this.details = details;
    this.name = errors.BadRequest;
  }

  public returnAsJSON() {
    return {
      error: this.name,
      message: this.message,
      details: this.details
    };
  }
}

export { BadRequest };
