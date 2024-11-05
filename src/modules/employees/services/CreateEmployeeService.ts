import { inject, injectable } from 'tsyringe';
import { IEmployeeRepository } from '../domain/repositories/IEmployeeRepository';
import { IEmployee } from '../domain/models/IEmployee';
import { Employee } from '../infra/models/Employee';
import { ConflictError } from '../../../shared/errors/ConflictError';
import { IPersonalDataRepository } from '../../personal_data/domain/repositories/IPersonalDataRepository';

@injectable()
class CreateEmployeeService {
  constructor(
    @inject('EmployeeRepository')
    private employeeRepository: IEmployeeRepository,
    @inject('PersonalDataRepository')
    private personalDataRepository: IPersonalDataRepository
  ) {}

  async execute(role: string, name: string): Promise<Employee> {
    const employee_exists = await this.employeeRepository.findByName(name);

    if (employee_exists) {
      throw new ConflictError(
        'Já existe um funcionario cadastrado com esse nome!'
      );
    }

    const employee: IEmployee = {
      name,
      role
    };

    const createdEmployee = await this.employeeRepository.create(employee);
    return createdEmployee;
  }
}

export { CreateEmployeeService };
