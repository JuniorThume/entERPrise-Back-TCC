import 'reflect-metadata';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IPersonalData } from '../../domain/models/IPersonalData';
import { Exclude } from 'class-transformer';

@Entity('personal_data')
class PersonalData implements IPersonalData {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar')
  cpf: string;

  @Column('varchar')
  name: string;

  @Column('varchar')
  email: string;

  @Column('varchar')
  phone: string;

  @Exclude()
  @Column('timestamp with time zone')
  created_at: Date;

  @Exclude()
  @Column('timestamp with time zone')
  updated_at: Date;
}
export { PersonalData };
