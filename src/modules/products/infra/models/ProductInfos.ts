import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IProductInfos } from '../../domain/models/IProductInfos';

@Entity('product_infos')
export class ProductInfo implements IProductInfos {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column()
  quantity!: number;

  @Column('varchar')
  size!: string;

  @Column('varchar')
  color!: string;

  @Column('varchar')
  material!: string;

  @Column('varchar')
  gender!: string;

  @Column('varchar')
  brand!: string;
}
