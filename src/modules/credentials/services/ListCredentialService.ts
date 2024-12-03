import { inject, injectable } from 'tsyringe';
import { CredentialRepository } from '../infra/repositories/CredentialRepository';
import { Credential } from '../infra/models/Credentials';

@injectable()
export class ListCredentialService {
  constructor(
    @inject('CredentialRepository')
    private credentialRepository: CredentialRepository
  ) {}

  async execute(): Promise<Credential[] | null> {
    const credentials = await this.credentialRepository.findAll();

    return credentials;
  }
}
