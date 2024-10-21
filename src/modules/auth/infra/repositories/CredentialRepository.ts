import { Repository } from 'typeorm';
import { data_source } from '../../../../shared/typeorm/dataSource';
import { ICredentialRepository } from '../../domain/repositories/ICredentialRepository';
import { Credential } from '../models/Credentials';
import { ICredential } from '../../domain/models/ICredential';

class CredentialRepository implements ICredentialRepository {
  public ormCredentialRepository: Repository<Credential>;
  constructor() {
    this.ormCredentialRepository = data_source.getRepository(Credential);
  }
  public async createCredential(
    username: string,
    password: string
  ): Promise<Credential | null> {
    const new_credential = this.ormCredentialRepository.create({
      username,
      password
    });

    const credential = await this.ormCredentialRepository.save(new_credential);
    if (!credential) return null;

    return credential;
  }

  public async findByUsername(username: string): Promise<Credential | null> {
    return await this.ormCredentialRepository.findOne({
      where: { username: username }
    });
  }

  public async findById(id: number): Promise<Credential | null> {
    return this.ormCredentialRepository.findOne({ where: { id: id } });
  }

  public async findCredential(
    credential: ICredential
  ): Promise<Credential | null> {
    return await this.ormCredentialRepository.findOne({
      where: credential
    });
  }

  public async updatePassword(
    creadential: Credential,
    new_password: string
  ): Promise<Credential | null> {
    creadential.password = new_password;
    return await this.ormCredentialRepository.save(creadential);
  }

  public async removeCredential(
    credential: Credential
  ): Promise<Credential | null> {
    return await this.ormCredentialRepository.remove(credential);
  }
}

export { CredentialRepository };
