import { inject, injectable } from 'tsyringe';
import { IEmployeeRepository } from '../domain/repositories/IEmployeeRepository';
import { Employee } from '../infra/models/Employee';
import { ConflictError } from '../../../shared/errors/ConflictError';
import { InternalServerError } from '../../../shared/errors/InternalServerError';
import { IPersonalDataRepository } from '../../personal_data/domain/repositories/IPersonalDataRepository';
import { PersonalData } from '../../personal_data/infra/models/PersonalData';

interface IChanges {
  name?: string;
  role?: string;
  email?: string;
  phone?: string;
  cpf?: string;
}

interface IEmployeeChanges {
  name?: string;
  role?: string;
}

interface IDataChanges {
  email?: string;
  phone?: string;
  cpf?: string;
}

@injectable()
class UpdateEmployeeService {
  constructor(
    @inject('EmployeeRepository')
    private employeeRepository: IEmployeeRepository,
    @inject('PersonalDataRepository')
    private personalDataRepository: IPersonalDataRepository
  ) {}

  async execute(id: number, changes: IChanges): Promise<Employee> {
    const employee_changes: IEmployeeChanges = {};
    Object.assign(
      employee_changes,
      { name: changes?.name || undefined },
      { role: changes?.role || undefined }
    );
    const personal_data_changes: IDataChanges = {};
    Object.assign(
      personal_data_changes,
      { email: changes?.email || undefined },
      { phone: changes?.phone || undefined },
      { cpf: changes?.cpf || undefined }
    );
    const employee_exists = await this.employeeRepository.findById(id);

    if (!employee_exists) {
      throw new ConflictError('Funcionário não encontrado');
    }

    if (employee_changes.name) {
      if (
        employee_changes.name &&
        employee_changes.name !== employee_exists?.name
      ) {
        const employee_name_exists = await this.employeeRepository.findByName(
          employee_changes.name
        );

        if (employee_name_exists) {
          throw new ConflictError(
            'Este nome já está cadastrado nos dados de outro funcionário!'
          );
        }
      }
    }

    const personal_data_exists = employee_exists.personal_data || null;

    if (
      personal_data_changes.email &&
      personal_data_exists &&
      personal_data_changes.email !== employee_exists.personal_data.email
    ) {
      const email_exists = await this.personalDataRepository.findByEmail(
        personal_data_changes.email
      );

      if (email_exists) {
        throw new ConflictError(
          'Este email já está cadastrado nos dados de outra pessoa'
        );
      }
    }

    if (
      personal_data_changes.cpf &&
      personal_data_exists &&
      personal_data_changes.cpf !== employee_exists.personal_data.cpf
    ) {
      const cpf_exists = await this.personalDataRepository.findByCPF(
        personal_data_changes.cpf
      );

      if (cpf_exists) {
        throw new ConflictError(
          'Este CPF já está cadastrado nos dados de outra pessoa'
        );
      }
    }

    let personal_data: PersonalData;
    if (personal_data_exists) {
      const updated_personal_data = await this.personalDataRepository.update(
        { ...personal_data_changes },
        personal_data_exists
      );
      if (!updated_personal_data)
        throw new InternalServerError('Error ao atualizar dados pessoais');

      personal_data = updated_personal_data;
    } else {
      const new_personal_data = await this.personalDataRepository.create({
        ...personal_data_changes
      });
      if (!new_personal_data)
        throw new InternalServerError('Erro ao cadastrar dados pessoais');

      personal_data = new_personal_data;
    }

    const updated_employee = await this.employeeRepository.update(
      { ...employee_changes, personal_data },
      employee_exists
    );

    if (!updated_employee) {
      throw new InternalServerError(
        'Algo ocorreu e não foi possível atualizar o funcionário'
      );
    }

    return employee_exists;
  }
}

export { UpdateEmployeeService };
