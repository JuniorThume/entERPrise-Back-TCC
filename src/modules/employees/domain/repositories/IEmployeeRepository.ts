import { IEmployee } from '../models/IEmployee';

export interface IEmployeeRepository {
  findById(id: number): Promise<IEmployee | null>;
  findAll(): Promise<IEmployee[]>;
  findByRole(role: string): Promise<IEmployee | null>;
  create(employee: IEmployee): Promise<IEmployee>;
  update(employee: IEmployee): Promise<IEmployee>;
  delete(employee: IEmployee): Promise<void>;
}
