import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import { Product } from './Products';
import { Exclude } from 'class-transformer';
import { IProductOptions } from '../../domain/models/IProductOptions';

@Entity('product_options')
class ProductOption implements IProductOptions {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('int4')
  quantity: number;

  @Column('varchar')
  size: string;

  @Column('varchar')
  color: string;

  @Column('decimal')
  price: number;

  @Exclude({ toClassOnly: true })
  @ManyToOne(() => Product, (product) => product.id)
  @JoinColumn({ name: 'product_id' })
  product_id: Product;

  @Column('timestamp with time zone')
  created_at: Date;

  @Column('timestamp with time zone')
  updated_at: Date;
}

export { ProductOption };
