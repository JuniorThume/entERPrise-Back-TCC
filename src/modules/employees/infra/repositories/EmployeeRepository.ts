import { Repository } from 'typeorm';
import { IEmployeeRepository } from '../../domain/repositories/IEmployeeRepository';
import { Employee } from '../models/Employee';
import { data_source } from '../../../../shared/typeorm/dataSource';
import { IEmployee } from '../../domain/models/IEmployee';
import { PersonalData } from '../../../personal_data/infra/models/PersonalData';

class EmployeeRepository implements IEmployeeRepository {
  private ormEmployeeRepository: Repository<Employee>;

  constructor() {
    this.ormEmployeeRepository = data_source.getRepository(Employee);
  }

  public async findByPersonalData(
    personal_data: PersonalData
  ): Promise<Employee | null> {
    const finded_personal_data = await this.ormEmployeeRepository.findOneBy({
      personal_data: {
        id: personal_data.id
      }
    });
    return finded_personal_data;
  }

  public async findByName(name: string): Promise<Employee | null> {
    return await this.ormEmployeeRepository.findOneBy({ name });
  }

  public async findById(id: number): Promise<Employee | null> {
    return await this.ormEmployeeRepository.findOne({
      where: { id },
      relations: ['personal_data']
    });
  }

  public async findByRole(role: string): Promise<Employee | null> {
    return await this.ormEmployeeRepository.findOneBy({ role });
  }

  public async findAll(): Promise<Employee[]> {
    return await this.ormEmployeeRepository.find({
      relations: ['personal_data']
    });
  }

  public async create(employee: IEmployee): Promise<Employee> {
    return await this.ormEmployeeRepository.save(employee);
  }

  public async update(
    employee_altered: Employee,
    employee_original: Employee
  ): Promise<Employee> {
    const merged_employee = this.ormEmployeeRepository.merge(
      employee_original,
      employee_altered
    );

    const updated_employee =
      await this.ormEmployeeRepository.save(merged_employee);
    return updated_employee;
  }

  public async delete(employee: IEmployee): Promise<void> {
    await this.ormEmployeeRepository.delete({
      id: employee.id
    });
    return;
  }
}

export { EmployeeRepository };
