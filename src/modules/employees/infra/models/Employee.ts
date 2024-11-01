import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import { IEmployee } from '../../domain/models/IEmployee';
import { PersonalData } from '../../../personal_data/infra/models/PersonalData';
import { Exclude } from 'class-transformer';

@Entity('employees')
class Employee implements IEmployee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  name: string;

  @Column('varchar')
  role: string;

  @Exclude()
  @Column('timestamp with time zone')
  created_at: Date;

  @Exclude()
  @Column('timestamp with time zone')
  updated_at: Date;

  // @Exclude({ toClassOnly: true })
  @OneToOne(() => PersonalData, (personal_data) => personal_data.id)
  @JoinColumn({ name: 'personal_data' })
  personal_data: PersonalData;
}

export { Employee };
