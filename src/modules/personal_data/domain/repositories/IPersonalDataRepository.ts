import { IPersonalData } from '../models/IPersonalData';

export interface IPersonalDataRepository {
  findById(id: number): Promise<IPersonalData | null>;
  findByName(name: string): Promise<IPersonalData | null>;
  findByEmail(email: string): Promise<IPersonalData | null>;
  findByCPF(cpf: string): Promise<IPersonalData | null>;
  create(personal_data: IPersonalData): Promise<IPersonalData>;
  update(personal_data: IPersonalData): Promise<IPersonalData>;
  delete(personal_data: IPersonalData): Promise<void>;
}
