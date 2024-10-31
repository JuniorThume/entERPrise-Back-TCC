import { inject, injectable } from 'tsyringe';
import { IEmployeeRepository } from '../domain/repositories/IEmployeeRepository';
import { NotFound } from '../../../shared/errors/NotFound';

@injectable()
class DeleteEmployeeService {
  constructor(
    @inject('EmployeeRepository')
    private employeeRepository: IEmployeeRepository
  ) {}

  async execute(id: number): Promise<void> {
    const employee_exists = await this.employeeRepository.findById(id);

    if (!employee_exists) {
      throw new NotFound('Funcionário não encontrado');
    }

    await this.employeeRepository.delete(employee_exists);
    return;
  }
}

export { DeleteEmployeeService };
