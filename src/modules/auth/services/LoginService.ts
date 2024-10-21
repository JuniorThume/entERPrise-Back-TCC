import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { UnauthorizedError } from '../../../shared/errors/UnauthorizedError';
import { inject, injectable } from 'tsyringe';
import { CredentialRepository } from '../infra/repositories/CredentialRepository';

dotenv.config();

interface ILoginData {
  username: string;
  password: string;
}

@injectable()
class LoginService {
  constructor(
    @inject('CredentialRepository')
    private credentialRepository: CredentialRepository
  ) {}
  private SECRET_KEY = process.env?.SECRET_KEY || 'secret_discreta';

  public async execute({ username, password }: ILoginData): Promise<string> {
    const credentialExist = await this.credentialRepository.findCredential({
      username,
      password
    });

    if (!credentialExist) {
      throw new UnauthorizedError('Credenciais invalidas');
    }
    const token = jwt.sign(
      { user: { id: credentialExist.id, username: credentialExist.username } },
      this.SECRET_KEY,
      {
        expiresIn: '1h'
      }
    );

    return token;
  }
}
export { LoginService };
