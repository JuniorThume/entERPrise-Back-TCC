export class AppError extends Error {
  public _name: string;
  public _code: number;
  constructor(message: string, code: number, name: string) {
    super(message);
    this._name = name;
    this._code = code;
  }

  public returnAsJSON() {
    return {
      error: this._name,
      code: this._code,
      message: this.message
    };
  }
}
