import { inject, injectable } from 'tsyringe';
import { CredentialRepository } from '../infra/repositories/CredentialRepository';
import { Credential } from '../infra/models/Credentials';
import { ConflictError } from '../../../shared/errors/ConflictError';
import { InternalServerError } from '../../../shared/errors/InternalServerError';
import { EmployeeRepository } from '../../employees/infra/repositories/EmployeeRepository';
import { NotFound } from '../../../shared/errors/NotFound';

@injectable()
export class CreateCredentialService {
  constructor(
    @inject('CredentialRepository')
    private credentialRepository: CredentialRepository,
    @inject('EmployeeRepository')
    private employeeRepository: EmployeeRepository
  ) {}

  async execute(
    employee_id: number,
    username: string,
    password: string
  ): Promise<Credential | null> {
    const employee_exists = await this.employeeRepository.findById(employee_id);

    if (!employee_exists) {
      throw new NotFound('Funcionário não encontrado');
    }

    const employee_already_has_credential =
      await this.credentialRepository.findByEmployee(employee_exists);

    if (employee_already_has_credential) {
      throw new ConflictError('Este usuário já possui uma credencial');
    }

    const username_exists =
      await this.credentialRepository.findByUsername(username);

    if (username_exists) {
      throw new ConflictError('Já existe uma credencial com este nome');
    }

    const new_credential = await this.credentialRepository.createCredential(
      employee_exists,
      username,
      password
    );

    if (!new_credential) {
      throw new InternalServerError(
        'Não foi possivel gravar as novas credenciais, tente novamente.'
      );
    }

    return new_credential;
  }
}
