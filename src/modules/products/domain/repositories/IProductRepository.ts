import { ProductInfo } from '../../infra/models/ProductInfos';
import { Product } from '../../infra/models/Products';
import { IFilter } from '../models/IFilter';

export interface IProductRepository {
  insert(product: Product, product_info: ProductInfo): Promise<Product | null>;
  update(product: Product): Promise<Product>;
  delete(id: number): Promise<void>;
  findAll(): Promise<Product[]>;
  findOneByFilter(filter: IFilter): Promise<Product | null>;
  findById(id: number): Promise<Product | null>;
  findByName(name: string): Promise<Product[] | null>;
  findByDescription(description: string): Promise<Product[] | null>;
}
