import { inject, injectable } from 'tsyringe';
import { CredentialRepository } from '../infra/repositories/CredentialRepository';
import { Credential } from '../infra/models/Credentials';
import { ConflictError } from '../../../shared/errors/ConflictError';
import { EmployeeRepository } from '../../employees/infra/repositories/EmployeeRepository';
import { NotFound } from '../../../shared/errors/NotFound';
import bcrypt from 'bcrypt';
import { BadRequest } from '../../../shared/errors/BadRequest';
import { InternalServerError } from '../../../shared/errors/InternalServerError';

interface IBody {
  username?: string;
  old_password?: string;
  new_password?: string;
}

@injectable()
export class UpdateCredentialService {
  constructor(
    @inject('CredentialRepository')
    private credentialRepository: CredentialRepository,
    @inject('EmployeeRepository')
    private employeeRepository: EmployeeRepository
  ) {}

  async execute(employee_id: number, body: IBody): Promise<Credential | null> {
    if (!body) {
      throw new BadRequest('Nada a ser atualizado');
    }

    const employee_exists = await this.employeeRepository.findById(employee_id);
    if (!employee_exists) {
      throw new NotFound('Funcionário não encontrado');
    }

    const credential_exists =
      await this.credentialRepository.findByEmployee(employee_exists);

    if (!credential_exists) {
      throw new NotFound('Credencial não encontrada');
    }

    if (body.username && body.username !== credential_exists.username) {
      const username_already_exists =
        await this.credentialRepository.findByUsername(body.username);
      if (username_already_exists) {
        throw new ConflictError(
          'Já existe uma credencial com este nome de usuário'
        );
      }
      if (!body.old_password) {
        throw new BadRequest('É necessário informar a senha');
      }
    }

    if (body.old_password) {
      if (
        !(await bcrypt.compare(body.old_password, credential_exists.password))
      ) {
        throw new BadRequest('A senha está incorreta');
      }
      if (body.new_password) {
        if (
          await bcrypt.compare(body.new_password, credential_exists.password)
        ) {
          throw new BadRequest('A nova senha não pode ser igual à antiga');
        }
      }
    }

    const credential_changes =
      this.credentialRepository.ormCredentialRepository.create({
        employee_id,
        username: body.username || undefined,
        password: body.new_password
          ? bcrypt.hashSync(body.new_password, 10)
          : undefined
      });

    const updated_credential =
      await this.credentialRepository.updateCredential(credential_changes);

    if (!updated_credential) {
      throw new InternalServerError('Não foi possivel atualizar a credencial');
    }
    return updated_credential;
  }
}
