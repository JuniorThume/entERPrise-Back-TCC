import { PersonalData } from '../../../personal_data/infra/models/PersonalData';
import { Employee } from '../../infra/models/Employee';
import { IEmployee } from '../models/IEmployee';

export interface IEmployeeRepository {
  findById(id: number): Promise<Employee | null>;
  findAll(): Promise<Employee[]>;
  findByName(name: string): Promise<Employee | null>;
  findByRole(role: string): Promise<Employee | null>;
  findByPersonalData(personal_data: PersonalData): Promise<Employee | null>;
  create(employee: IEmployee): Promise<Employee>;
  update(employee: IEmployee): Promise<Employee>;
  delete(employee: IEmployee): Promise<void>;
}
