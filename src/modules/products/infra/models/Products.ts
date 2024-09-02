import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProductInfo } from './ProductInfos';
import { IProduct } from '../../domain/models/IProduct';

@Entity('products')
export class Product implements IProduct {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column('varchar')
  name!: string;

  @Column('varchar')
  image_url!: string;

  @Column('varchar')
  description!: string;

  @Column('varchar')
  category!: string;

  @Column('varchar')
  material!: string;

  @Column('varchar')
  gender!: string;

  @Column('varchar')
  brand!: string;

  @OneToMany(() => ProductInfo, (infos) => infos.product_id)
  infos!: ProductInfo[];
}
