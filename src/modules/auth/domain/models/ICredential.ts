import { IEmployee } from '../../../employees/domain/models/IEmployee';

export interface ICredential {
  employee_id?: IEmployee;
  username: string;
  password: string;
}
