import { inject, injectable } from 'tsyringe';
import { IEmployeeRepository } from '../domain/repositories/IEmployeeRepository';
import { IEmployee } from '../domain/models/IEmployee';
import { Employee } from '../infra/models/Employee';
import { ConflictError } from '../../../shared/errors/ConflictError';
import { NotFound } from '../../../shared/errors/NotFound';
import { IPersonalDataRepository } from '../../personal_data/domain/repositories/IPersonalDataRepository';

@injectable()
class CreateEmployeeService {
  constructor(
    @inject('EmployeeRepository')
    private employeeRepository: IEmployeeRepository,
    @inject('PersonalDataRepository')
    private personalDataRepository: IPersonalDataRepository
  ) {}

  async execute(personal_data_id: number, role: string): Promise<Employee> {
    const personal_data_exists =
      await this.personalDataRepository.findById(personal_data_id);

    if (!personal_data_exists) {
      throw new NotFound('Dados pessoais não encontrados');
    }

    const employee_exists =
      await this.employeeRepository.findByPersonalData(personal_data_exists);

    if (employee_exists) {
      throw new ConflictError(
        'Já existe um funcionário cadastrado com esses dados pessoais'
      );
    }
    const employee: IEmployee = {
      role,
      personal_data_id: personal_data_exists
    };

    const createdEmployee = await this.employeeRepository.create(employee);
    return createdEmployee;
  }
}

export { CreateEmployeeService };
