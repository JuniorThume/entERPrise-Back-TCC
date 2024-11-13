import { Repository } from 'typeorm';
import { data_source } from '../../../../shared/typeorm/dataSource';
import { ICredentialRepository } from '../../domain/repositories/ICredentialRepository';
import { Credential } from '../models/Credentials';
import { ICredential } from '../../domain/models/ICredential';
import { IEmployee } from '../../../employees/domain/models/IEmployee';
import bcrypt from 'bcryptjs';

class CredentialRepository implements ICredentialRepository {
  public ormCredentialRepository: Repository<Credential>;
  constructor() {
    this.ormCredentialRepository = data_source.getRepository(Credential);
  }
  public async createCredential(
    employee: IEmployee,
    username: string,
    password: string
  ): Promise<Credential | null> {
    const hash_password = await bcrypt.hash(password, 10);
    const new_credential = this.ormCredentialRepository.create({
      employee_id: employee.id,
      username,
      password: hash_password
    });

    const credential = await this.ormCredentialRepository.save(new_credential);
    if (!credential) return null;

    return credential;
  }

  public async findAll(): Promise<Credential[]> {
    return await this.ormCredentialRepository.find({
      relations: ['employee']
    });
  }

  public async findByEmployee(employee: IEmployee): Promise<Credential | null> {
    return await this.ormCredentialRepository
      .createQueryBuilder('credentials')
      .setFindOptions({ where: { employee_id: employee.id } })
      .getOne();
  }

  public async findByUsername(username: string): Promise<Credential | null> {
    return await this.ormCredentialRepository.findOne({
      where: { username }
    });
  }

  public async findById(id: number): Promise<Credential | null> {
    return this.ormCredentialRepository.findOne({
      where: { employee: { id } }
    });
  }

  public async findCredential(
    credential: ICredential
  ): Promise<Credential | null> {
    return await this.ormCredentialRepository.findOne({
      where: {
        username: credential.username,
        password: credential.password
      }
    });
  }

  public async updateCredential(
    creadential: Credential
  ): Promise<Credential | null> {
    return await this.ormCredentialRepository.save(creadential);
  }

  public async removeCredential(
    credential: Credential
  ): Promise<Credential | null> {
    return await this.ormCredentialRepository.remove(credential);
  }
}

export { CredentialRepository };
