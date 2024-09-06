import { Product } from '../../infra/models/Products';

export interface IProductInfos {
  id?: number;
  quantity: number;
  size: string;
  color: string;
  price: number;
  product_id: Product;
}
