import { DeleteResult } from 'typeorm';
import { Product } from '../../../infra/models/Products';
import { IFilterProduct } from '../models/IFilterProduct';

export interface IProductRepository {
  insert(product: Product): Promise<Product | null>;
  update(id: number, product: Product): Promise<Product | null>;
  delete(id: number): Promise<DeleteResult>;
  findByFilter(options: IFilterProduct): Promise<Product[] | null>;
  findById(id: number): Promise<Product | null>;
  findByName(name: string): Promise<Product | null>;
  findByDescription(description: string): Promise<Product[] | null>;
}
