import { Repository } from 'typeorm';
import { IEmployeeRepository } from '../../domain/repositories/IEmployeeRepository';
import { Employee } from '../models/Employee';
import { data_source } from '../../../../shared/typeorm/dataSource';
import { IEmployee } from '../../domain/models/IEmployee';
import { PersonalData } from '../../../personal_data/infra/models/PersonalData';

class EmployeeRepository implements IEmployeeRepository {
  private ormEmployeeRepository: Repository<Employee>;
  private ormPersonalDataRepository: Repository<PersonalData>;

  constructor() {
    this.ormEmployeeRepository = data_source.getRepository(Employee);
    this.ormPersonalDataRepository = data_source.getRepository(PersonalData);
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
    return await this.ormEmployeeRepository.findOneBy({ id });
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

  public async update(employee: IEmployee): Promise<Employee> {
    return await this.ormEmployeeRepository.save(employee);
  }

  public async delete(employee: IEmployee): Promise<void> {
    await this.ormEmployeeRepository.delete(employee);
  }
}

export { EmployeeRepository };
