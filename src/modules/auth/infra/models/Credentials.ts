import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ICredential } from '../../domain/models/ICredential';
import { Exclude } from 'class-transformer';
import { Employee } from '../../../employees/infra/models/Employee';

@Entity('credentials')
class Credential implements ICredential {
  @PrimaryGeneratedColumn('increment')
  employee_id: Employee;

  @Column('varchar')
  username: string;

  @Exclude()
  @Column('text')
  password: string;

  @Exclude()
  @Column('timestamp with time zone')
  created_at: string;

  @Exclude()
  @Column('timestamp with time zone')
  updated_at: string;
}

export { Credential };
