import { PersonalData } from '../../../personal_data/infra/models/PersonalData';

export interface IEmployee {
  id?: number;
  personal_data_id: PersonalData;
  role: string;
  created_at?: Date;
  updated_at?: Date;
}
