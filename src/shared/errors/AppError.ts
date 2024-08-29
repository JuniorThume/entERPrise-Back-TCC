export class AppError extends Error {
  public _name: string;
  public _code: number;
  public _details: [string | object];
  constructor(message: string, code: number, details: [string | object]) {
    super(message);
    this._name = 'AppError';
    this._code = code;
    this._details = details;
  }
}
