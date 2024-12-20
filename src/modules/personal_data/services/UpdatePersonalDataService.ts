import { inject, injectable } from 'tsyringe';
import { IPersonalData } from '../domain/models/IPersonalData';
import { IPersonalDataRepository } from '../domain/repositories/IPersonalDataRepository';
import { NotFound } from '../../../shared/errors/NotFound';
import { ConflictError } from '../../../shared/errors/ConflictError';

@injectable()
class UpdatePersonalDataService {
  constructor(
    @inject('PersonalDataRepository')
    private personalDataRepository: IPersonalDataRepository
  ) {}

  public async execute(persona_data: IPersonalData): Promise<IPersonalData> {
    const personal_data_exists = await this.personalDataRepository.findById(
      persona_data.id as number
    );

    if (!personal_data_exists) {
      throw new NotFound('Dados Pessoais não foram encontrados');
    }
    if (persona_data.email) {
      if (persona_data.email !== personal_data_exists.email) {
        const personal_email_exists =
          await this.personalDataRepository.findByEmail(persona_data.email);
        if (personal_email_exists) {
          throw new ConflictError(
            'Este email já está cadastrado nos dados de outra pessoa'
          );
        }
      }
    }

    const updated_personal_data = await this.personalDataRepository.update(
      persona_data,
      personal_data_exists
    );

    return updated_personal_data;
  }
}

export { UpdatePersonalDataService };
