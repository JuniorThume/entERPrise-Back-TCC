import jwt, { JwtPayload } from 'jsonwebtoken';
import { UnauthorizedError } from '../../../shared/errors/UnauthorizedError';
import { inject, injectable } from 'tsyringe';
import { CredentialRepository } from '../infra/repositories/CredentialRepository';
import { SECRET_KEY } from '../../../shared/consts/secret';
import { NotFound } from '../../../shared/errors/NotFound';
import { generateAccessTokens } from '../../../shared/utils/generateAccessTokens';
import { EmployeeRepository } from '@modules/employees/infra/repositories/EmployeeRepository';

type IPayload = JwtPayload & { user: { id: number; username: string } };

@injectable()
class RefreshTokenService {
  constructor(
    @inject('CredentialRepository')
    private credentialRepository: CredentialRepository,
    @inject('EmployeeRepository')
    private employeeRepository: EmployeeRepository
  ) {}

  public async execute(token: string): Promise<string> {
    if (!token) {
      throw new UnauthorizedError('Token não informado');
    }

    try {
      jwt.verify(token, SECRET_KEY);
    } catch (err) {
      const credential_id = jwt.decode(token) as IPayload;
      const credential = await this.credentialRepository.findById(
        credential_id.user.id
      );

      if (!credential) {
        throw new NotFound('Credenciais não encontrada');
      }
      const employee = await this.employeeRepository.findById(
        credential.employee_id
      );

      if (!employee) {
        throw new NotFound('Funcionário não encontrado');
      }

      const new_token = generateAccessTokens(credential, employee);
      return new_token;
    }
    throw new UnauthorizedError('Token atual ainda é valido');
  }
}
export { RefreshTokenService };
