import { IEmployee } from '../../../employees/domain/models/IEmployee';
import { Credential } from '../../infra/models/Credentials';
import { ICredential } from '../models/ICredential';

export interface ICredentialRepository {
  findById(id: number): Promise<Credential | null>;
  findByUsername(username: string): Promise<Credential | null>;
  findAll(): Promise<Credential[]>;
  findCredential(credential: ICredential): Promise<Credential | null>;
  findByEmployee(employee: IEmployee): Promise<Credential | null>;
  createCredential(
    employee: IEmployee,
    username: string,
    password: string
  ): Promise<Credential | null>;
  removeCredential(credential: Credential): Promise<Credential | null>;
  updateCredential(creadential: Credential): Promise<Credential | null>;
}
