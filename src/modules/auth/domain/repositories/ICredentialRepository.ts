import { Credential } from '../../infra/models/Credentials';

export interface ICredentialRepository {
  findById(id: number): Promise<Credential | null>;
  findByUsername(username: string): Promise<Credential | null>;
  findCredential(credential: Credential): Promise<Credential | null>;
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
