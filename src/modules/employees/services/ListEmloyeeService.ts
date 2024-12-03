import { inject, injectable } from 'tsyringe';
import { IEmployeeRepository } from '../domain/repositories/IEmployeeRepository';
import { Employee } from '../infra/models/Employee';

@injectable()
class ListEmployeeService {
  constructor(
    @inject('EmployeeRepository')
    private employeeRepository: IEmployeeRepository
  ) {}

  async execute(): Promise<Employee[]> {
    const employees = await this.employeeRepository.findAll();
    return employees;
  }
}

export { ListEmployeeService };
