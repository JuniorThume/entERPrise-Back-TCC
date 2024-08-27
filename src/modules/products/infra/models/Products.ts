import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import { ProductInfo } from './ProductInfos';
import { IProduct } from '../../domain/models/IProduct';

@Entity('products')
export class Product implements IProduct {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column('varchar')
  name!: string;

  @Column('varchar')
  description!: string;

  @OneToOne(() => ProductInfo)
  @JoinColumn({ name: 'infos_id' })
  infos_id!: ProductInfo;
}
