import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import { IProductInfos } from '../../domain/interfaces/models/IProductInfos';
import { Product } from './Products';
import { Exclude } from 'class-transformer';

@Entity('product_infos')
class ProductInfo implements IProductInfos {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column()
  quantity!: number;

  @Column('varchar')
  size!: string;

  @Column('varchar')
  color!: string;

  @Column('decimal')
  prize!: number;

  @ManyToOne(() => Product, (product) => product.id)
  @JoinColumn({ name: 'product_id' })
  @Exclude()
  product_id!: Product;
}

export { ProductInfo };
