import { UnauthorizedError } from '../../../shared/errors/UnauthorizedError';
import { inject, injectable } from 'tsyringe';
import { CredentialRepository } from '../infra/repositories/CredentialRepository';
import { generateAccessTokens } from '../../../shared/utils/generateAccessTokens';

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

  public async execute({ username, password }: ILoginData): Promise<string> {
    const credentialExist = await this.credentialRepository.findCredential({
      username,
      password
    });

    if (!credentialExist) {
      throw new UnauthorizedError('Credenciais invalidas');
    }

    const token = generateAccessTokens(credentialExist);
    return token;
  }
}
export { LoginService };
