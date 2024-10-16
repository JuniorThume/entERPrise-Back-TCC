import { Column, Entity } from 'typeorm';
import { ICredential } from '../../domain/models/ICredential';

@Entity('credentials')
class Credential implements ICredential {
  @Column('increment')
  id: number;

  @Column('varchar')
  username: string;

  @Column('text')
  password: string;
}

export { Credential };
