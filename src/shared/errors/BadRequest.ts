import { errors } from '../consts/errors';
import { status_code } from '../consts/statusCode';

class BadRequest extends Error {
  public code: number;
  public name: string;

  constructor(message: string) {
    super(message);
    this.code = status_code.BAD_REQUEST;
    this.name = errors.BadRequest;
  }

  public returnAsJSON() {
    return {
      error: this.name,
      message: this.message
    };
  }
}

export { BadRequest };
