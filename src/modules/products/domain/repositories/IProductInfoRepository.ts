import { DeleteResult, FindManyOptions } from 'typeorm';
import { ProductInfo } from '../../infra/models/ProductInfos';
import { IProductInfos } from '../models/IProductInfos';

export interface IProductInfoRepository {
  insert(product_info: IProductInfos): Promise<ProductInfo | null>;
  update(info: IProductInfos): Promise<ProductInfo | null>;
  delete(id: number): Promise<DeleteResult>;
  findByFilter(options: FindManyOptions): Promise<ProductInfo[] | null>;
  findById(id: number): Promise<ProductInfo | null>;
  findBySize(size: string): Promise<ProductInfo[] | null>;
  checkSize(size: string): Promise<boolean>;
}
