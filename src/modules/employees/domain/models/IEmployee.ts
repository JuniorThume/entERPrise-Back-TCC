import { PersonalData } from '../../../personal_data/infra/models/PersonalData';

export interface IEmployee {
  id?: number;
  personal_data: PersonalData;
  role: string;
  name: string;
  created_at?: Date;
  updated_at?: Date;
}
