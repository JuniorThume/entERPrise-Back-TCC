import { inject, injectable } from 'tsyringe';
import { IEmployeeRepository } from '../domain/repositories/IEmployeeRepository';
import { Employee } from '../infra/models/Employee';
import { ConflictError } from '../../../shared/errors/ConflictError';

@injectable()
class ShowEmployeeService {
  constructor(
    @inject('EmployeeRepository')
    private employeeRepository: IEmployeeRepository
  ) {}

  async execute(id: number): Promise<Employee> {
    const employee_exists = await this.employeeRepository.findById(id);

    if (!employee_exists) {
      throw new ConflictError('Funcionário não encontrado');
    }
    return employee_exists;
  }
}

export { ShowEmployeeService };
