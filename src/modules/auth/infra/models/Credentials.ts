import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ICredential } from '../../domain/models/ICredential';

@Entity('credentials')
class Credential implements ICredential {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar')
  username: string;

  @Column('text')
  password: string;
}

export { Credential };
