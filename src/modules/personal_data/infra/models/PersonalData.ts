import { Column, PrimaryGeneratedColumn } from 'typeorm';
import { IPersonalData } from '../../domain/models/IPersonalData';
import { Exclude } from 'class-transformer';

class PersonalData implements IPersonalData {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  cpf: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Exclude()
  @Column()
  created_at: Date;

  @Exclude()
  @Column()
  updated_at: Date;
}
export { PersonalData };
