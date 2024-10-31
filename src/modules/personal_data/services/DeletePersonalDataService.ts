import { inject, injectable } from 'tsyringe';
import { IPersonalDataRepository } from '../domain/repositories/IPersonalDataRepository';
import { NotFound } from '../../../shared/errors/NotFound';

@injectable()
class DeletePersonalDataService {
  constructor(
    @inject('PersonalDataRepository')
    private personalDataRepository: IPersonalDataRepository
  ) {}

  public async execute(id: number): Promise<void> {
    const personal_data_exists = await this.personalDataRepository.findById(id);

    if (!personal_data_exists) {
      throw new NotFound('Dados Pessoais não foram encontrados');
    }

    await this.personalDataRepository.delete(personal_data_exists);

    return;
  }
}

export { DeletePersonalDataService };
