import { UnauthorizedError } from '../../../shared/errors/UnauthorizedError';
import { inject, injectable } from 'tsyringe';
import { CredentialRepository } from '../infra/repositories/CredentialRepository';
import { generateAccessTokens } from '../../../shared/utils/generateAccessTokens';
import bcrypt from 'bcryptjs';
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
    const credentialExist =
      await this.credentialRepository.findByUsername(username);

    if (!credentialExist) {
      throw new UnauthorizedError('Credenciais invalidas');
    }

    const compare_passwords = await bcrypt.compare(
      password,
      credentialExist.password
    );
    if (!compare_passwords) {
      throw new UnauthorizedError('Credenciais invalidas');
    }
    const token = generateAccessTokens(credentialExist);
    return token;
  }
}
export { LoginService };
