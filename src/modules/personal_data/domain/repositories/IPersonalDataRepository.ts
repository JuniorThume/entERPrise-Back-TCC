import { PersonalData } from '../../infra/models/PersonalData';
import { IPersonalData } from '../models/IPersonalData';

export interface IPersonalDataRepository {
  findById(id: number): Promise<PersonalData | null>;
  findByEmail(email: string): Promise<PersonalData | null>;
  findByCPF(cpf: string): Promise<PersonalData | null>;
  create(personal_data: IPersonalData): Promise<PersonalData>;
  update(
    personal_data_altered: IPersonalData,
    personal_data_original: PersonalData
  ): Promise<PersonalData>;
  delete(personal_data: IPersonalData): Promise<void>;
}
