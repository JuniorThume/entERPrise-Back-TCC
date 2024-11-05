import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProductOption } from './ProductOptions';
import { IProduct } from '../../domain/models/IProduct';
import { Exclude } from 'class-transformer';

@Entity('products')
class Product implements IProduct {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar')
  name: string;

  @Column('bytea')
  image: string | Buffer;

  @Column('varchar')
  description: string;

  @Column('varchar')
  category: string;

  @Column('varchar')
  material: string;

  @Column('varchar')
  genre: string;

  @Column('varchar')
  brand: string;

  @OneToMany(() => ProductOption, (options) => options.product_id)
  options: ProductOption[];

  @Exclude()
  @Column('timestamp with time zone')
  created_at: Date;

  @Exclude()
  @Column('timestamp with time zone')
  updated_at: Date;
}

export { Product };
