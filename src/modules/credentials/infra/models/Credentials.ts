import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { ICredential } from '../../domain/models/ICredential';
import { Exclude, Expose } from 'class-transformer';
import { Employee } from '../../../employees/infra/models/Employee';

@Entity('credentials')
class Credential implements ICredential {
  @PrimaryColumn()
  @Expose({ groups: ['admin'] })
  employee_id: number;

  @OneToOne(() => Employee)
  @JoinColumn({ name: 'employee_id' })
  employee: Employee;

  @Column('varchar')
  username: string;

  @Exclude()
  @Column('text')
  password: string;

  @Column('timestamp with time zone')
  created_at: Date;

  @Exclude()
  @Expose({ groups: ['admin'] })
  @Column('timestamp with time zone')
  updated_at: Date;
}

export { Credential };
