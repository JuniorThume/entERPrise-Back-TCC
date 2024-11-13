import { IEmployee } from '../../../employees/domain/models/IEmployee';
export interface ICredential {
  employee_id?: number;
  employee?: IEmployee;
  username: string;
  password: string;
  created_at?: Date;
  updated_at?: Date;
}
