import { Credential } from '../../infra/models/Credentials';
import { ICredential } from '../models/ICredential';

export interface ICredentialRepository {
  findById(id: number): Promise<Credential | null>;
  findByUsername(username: string): Promise<Credential | null>;
  findCredential(credential: ICredential): Promise<Credential | null>;
  createCredential(
    username: string,
    password: string
  ): Promise<Credential | null>;
  removeCredential(credential: Credential): Promise<Credential | null>;
  updatePassword(
    creadential: Credential,
    new_password: string
  ): Promise<Credential | null>;
}
