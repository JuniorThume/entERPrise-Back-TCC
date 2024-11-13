import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import { IPersonalData } from '../domain/models/IPersonalData';
import { IPersonalDataRepository } from '../domain/repositories/IPersonalDataRepository';
import { ConflictError } from '../../../shared/errors/ConflictError';
import { PersonalData } from '../infra/models/PersonalData';

@injectable()
class CreatePersonalDataService {
  constructor(
    @inject('PersonalDataRepository')
    private personalDataRepository: IPersonalDataRepository
  ) {}

  async execute(persona_data: IPersonalData): Promise<PersonalData> {
    const personal_email_exists = await this.personalDataRepository.findByEmail(
      persona_data.email as string
    );

    if (personal_email_exists) {
      throw new ConflictError('Este email já está cadastrado!');
    }

    const personal_cpf_exists = await this.personalDataRepository.findByCPF(
      persona_data.cpf as string
    );

    if (personal_cpf_exists) {
      throw new ConflictError('Este CPF já está cadastrado!');
    }

    const created_personal_data =
      await this.personalDataRepository.create(persona_data);

    return created_personal_data;
  }
}

export { CreatePersonalDataService };
