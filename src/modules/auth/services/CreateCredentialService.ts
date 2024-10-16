import { inject, injectable } from 'tsyringe';
import { CredentialRepository } from '../infra/repositories/CredentialRepository';
import { Credential } from '../infra/models/Credentials';
import { ConflictError } from '../../../shared/errors/ConflictError';
import { InternalServerError } from '../../../shared/errors/InternalServerError';

@injectable()
export class CreateCredentialService {
  constructor(
    @inject('CredentialRepository')
    private credentialRepository: CredentialRepository
  ) {}

  async execute(
    username: string,
    password: string
  ): Promise<Credential | null> {
    const usernameExists =
      await this.credentialRepository.findByUsername(username);

    if (usernameExists) {
      throw new ConflictError('Já existe uma credencial com este nome');
    }

    const new_credential = await this.credentialRepository.createCredential(
      username,
      password
    );

    if (!new_credential) {
      throw new InternalServerError(
        'Não foi possivel gravar as novas credenciais, tente novamente.'
      );
    }

    return new_credential;
  }
}
