import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { UnauthorizedError } from '../../../shared/errors/UnauthorizedError';

dotenv.config();

interface ILoginData {
  username: string;
  password: string;
}

class LoginService {
  constructor() {}
  private SECRET_KEY = process.env?.SECRET_KEY || 'secret_discreta';

  public execute({ username, password }: ILoginData): string {
    if (username !== 'Junior' || password.toString() !== '123456') {
      console.log(username, password);
      throw new UnauthorizedError('Credenciais invalidas');
    }
    const token = jwt.sign({ user_id: 10 }, this.SECRET_KEY, {
      expiresIn: '1h'
    });
    return token;
  }
}
export { LoginService };
