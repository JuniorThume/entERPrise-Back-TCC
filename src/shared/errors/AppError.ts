import { errors } from '../consts/errors';

export class AppError extends Error {
  public _name: string;
  public _code: number;
  public _details: object;
  constructor(message: string, code: number, details: object) {
    super(message);
    this._name = errors.AppError;
    this._code = code;
    this._details = details;
    // TODO Fazer uma padronização dos retornos de erros para o usuario
  }
}
