class ValidationError {
  public code: number;
  public message: string;
  public details: object;

  constructor(message: string, details: object) {
    this.code = 400;
    this.message = message;
    this.details = details;
  }

  public returnAsJSON() {
    return {
      code: this.code,
      message: this.message,
      details: this.details
    };
  }
}

export default ValidationError;
