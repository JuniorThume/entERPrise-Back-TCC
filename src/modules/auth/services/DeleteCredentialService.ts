import { inject, injectable } from 'tsyringe';
import { CredentialRepository } from '../infra/repositories/CredentialRepository';
import { Credential } from '../infra/models/Credentials';
import { NotFound } from '../../../shared/errors/NotFound';

@injectable()
export class DeleteCredentialService {
  constructor(
    @inject('CredentialRepository')
    private credentialRepository: CredentialRepository
  ) {}

  async execute(credential_id: number): Promise<Credential | null> {
    const credentialExists =
      await this.credentialRepository.findById(credential_id);
    if (!credentialExists) {
      throw new NotFound('Credencial não existe');
    }

    return await this.credentialRepository.removeCredential(credentialExists);
  }
}
