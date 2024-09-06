import { Product } from '../../infra/models/Products';

export interface IProductInfos {
  id?: number;
  quantity: number;
  size: string;
  color: string;
  prize: number;
  product_id: Product;
}
