import { errors } from '../consts/errors';
import { status_code } from '../consts/statusCode';

class NotFound extends Error {
  public code: number;
  public name: string;

  constructor(message: string) {
    super(message);
    this.code = status_code.NOT_FOUND;
    this.name = errors.NotFound;
  }

  public returnAsJSON() {
    return {
      error: this.name,
      message: this.message
    };
  }
}

export { NotFound };
