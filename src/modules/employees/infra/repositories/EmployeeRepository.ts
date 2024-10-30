import { Repository } from 'typeorm';
import { IEmployeeRepository } from '../../domain/repositories/IEmployeeRepository';
import { Employee } from '../models/Employee';
import { data_source } from '../../../../shared/typeorm/dataSource';
import { IEmployee } from '../../domain/models/IEmployee';

class EmployeeRepository implements IEmployeeRepository {
  private ormEmployeeRepository: Repository<Employee>;

  constructor() {
    this.ormEmployeeRepository = data_source.getRepository(Employee);
  }

  public async findById(id: number): Promise<IEmployee | null> {
    return await this.ormEmployeeRepository.findOneBy({ id });
  }

  public async findByRole(role: string): Promise<IEmployee | null> {
    return await this.ormEmployeeRepository.findOneBy({ role });
  }

  public async findAll(): Promise<IEmployee[]> {
    return await this.ormEmployeeRepository.find();
  }

  public async create(employee: IEmployee): Promise<IEmployee> {
    return await this.ormEmployeeRepository.save(employee);
  }

  public async update(employee: IEmployee): Promise<IEmployee> {
    return await this.ormEmployeeRepository.save(employee);
  }

  public async delete(employee: IEmployee): Promise<void> {
    await this.ormEmployeeRepository.remove(employee);
  }
}

export { EmployeeRepository };
