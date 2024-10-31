import { inject, injectable } from 'tsyringe';
import { IEmployeeRepository } from '../domain/repositories/IEmployeeRepository';
import { Employee } from '../infra/models/Employee';
import { ConflictError } from '../../../shared/errors/ConflictError';
import { IEmployee } from '../domain/models/IEmployee';
import { InternalServerError } from '../../../shared/errors/InternalServerError';

@injectable()
class UpdateEmployeeService {
  constructor(
    @inject('EmployeeRepository')
    private employeeRepository: IEmployeeRepository
  ) {}

  async execute(id: number, altered_employee: IEmployee): Promise<Employee> {
    const employee_exists = await this.employeeRepository.findById(id);

    if (!employee_exists) {
      throw new ConflictError('Funcionário não encontrado');
    }

    const updated_employee =
      await this.employeeRepository.update(altered_employee);

    if (!updated_employee) {
      throw new InternalServerError(
        'Algo ocorreu e não foi possível atualizar o funcionário'
      );
    }

    return updated_employee;
  }
}

export { UpdateEmployeeService };
