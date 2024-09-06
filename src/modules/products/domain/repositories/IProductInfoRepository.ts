import { DeleteResult, FindManyOptions } from 'typeorm';
import { ProductInfo } from '../../infra/models/ProductInfos';
import { IProductInfos } from '../models/IProductInfos';
import { Product } from '../../infra/models/Products';

export interface IProductInfoRepository {
  insert(product_info: IProductInfos): Promise<ProductInfo | null>;
  update(info: IProductInfos): Promise<ProductInfo | null>;
  delete(id: number): Promise<DeleteResult>;
  findByFilter(options: FindManyOptions): Promise<ProductInfo[]>;
  findById(id: number): Promise<ProductInfo | null>;
  findBySize(size: string): Promise<ProductInfo[] | null>;
  infoBelongToProduct(product: Product, id: number): Promise<boolean>;
}
