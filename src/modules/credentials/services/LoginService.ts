import { UnauthorizedError } from '../../../shared/errors/UnauthorizedError';
import { inject, injectable } from 'tsyringe';
import { CredentialRepository } from '../infra/repositories/CredentialRepository';
import { generateAccessTokens } from '../../../shared/utils/generateAccessTokens';
import bcrypt from 'bcryptjs';
import { EmployeeRepository } from '@modules/employees/infra/repositories/EmployeeRepository';
import { InternalServerError } from '@app/errors/InternalServerError';
interface ILoginData {
  username: string;
  password: string;
}

@injectable()
class LoginService {
  constructor(
    @inject('CredentialRepository')
    private credentialRepository: CredentialRepository,
    @inject('EmployeeRepository')
    private employeeRepository: EmployeeRepository
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

    const employee = await this.employeeRepository.findById(
      credentialExist.employee_id
    );

    if (!employee)
      throw new InternalServerError(
        'Não foi possivel encontrar o funcionário, mesmo sendo uma dependencia direta com a credencial'
      );

    const token = generateAccessTokens(credentialExist, employee);
    return token;
  }
}
export { LoginService };
