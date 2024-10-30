import { Column, JoinColumn, OneToOne } from 'typeorm';
import { IEmployee } from '../../domain/models/IEmployee';
import { PersonalData } from '../../../personal_data/infra/models/PersonalData';

class Employee implements IEmployee {
  @Column()
  id: number;

  @Column()
  role: string;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

  @OneToOne(() => PersonalData, (personal_data_id) => personal_data_id.id)
  @JoinColumn()
  personal_data_id: number;
}

export { Employee };
