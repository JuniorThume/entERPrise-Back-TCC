import 'reflect-metadata';
import { Repository } from 'typeorm';
import { data_source } from '../../../../shared/typeorm/dataSource';
import { PersonalData } from '../models/PersonalData';
import { IPersonalDataRepository } from '../../domain/repositories/IPersonalDataRepository';
import { IPersonalData } from '../../domain/models/IPersonalData';

class PersonalDataRepository implements IPersonalDataRepository {
  public ormPersonalDataRepository: Repository<PersonalData>;

  constructor() {
    this.ormPersonalDataRepository = data_source.getRepository(PersonalData);
  }

  public async findById(id: number): Promise<PersonalData | null> {
    return await this.ormPersonalDataRepository.findOne({ where: { id: id } });
  }

  public async findByEmail(email: string): Promise<PersonalData | null> {
    return await this.ormPersonalDataRepository.findOneBy({ email });
  }

  public async findByCPF(cpf: string): Promise<PersonalData | null> {
    return await this.ormPersonalDataRepository.findOneBy({ cpf });
  }

  public async create(personal_data: PersonalData): Promise<PersonalData> {
    return await this.ormPersonalDataRepository.save(personal_data);
  }

  public async update(
    personal_data_altered: IPersonalData,
    personal_data_original: PersonalData
  ): Promise<PersonalData> {
    const merged_personal_data = this.ormPersonalDataRepository.merge(
      personal_data_original,
      personal_data_altered
    );

    const updated_personal_data =
      await this.ormPersonalDataRepository.save(merged_personal_data);
    return updated_personal_data;
  }

  public async delete(personal_data: IPersonalData): Promise<void> {
    await this.ormPersonalDataRepository.delete(personal_data);
  }
}

export { PersonalDataRepository };
