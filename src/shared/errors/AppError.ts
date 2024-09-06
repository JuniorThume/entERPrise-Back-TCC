import { errors } from '../consts/errors';

export class AppError extends Error {
  public _name: string;
  public _code: number;
  constructor(message: string, code: number) {
    super(message);
    this._name = errors.AppError;
    this._code = code;
  }
}
