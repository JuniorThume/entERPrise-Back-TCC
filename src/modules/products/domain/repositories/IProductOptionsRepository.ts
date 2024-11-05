import { DeleteResult, FindManyOptions } from 'typeorm';
import { ProductOption } from '../../infra/models/ProductOptions';
import { IProductOptions } from '../models/IProductOptions';
import { Product } from '../../infra/models/Products';
import { IFilterOption } from '../models/IFilterOption';

export interface IProductOptionsRepository {
  insert(product_info: IProductOptions): Promise<ProductOption | null>;
  update(info: IProductOptions): Promise<ProductOption | null>;
  delete(id: number): Promise<DeleteResult>;
  findByProduct(
    product: Product,
    filter: IFilterOption
  ): Promise<Product | null>;
  findByFilter(options: FindManyOptions): Promise<ProductOption[]>;
  findById(id: number): Promise<ProductOption | null>;
  findBySize(size: string): Promise<ProductOption[] | null>;
  infoBelongToProduct(product: Product, id: number): Promise<boolean>;
}
