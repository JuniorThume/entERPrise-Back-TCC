import { ProductInfo } from '../../infra/models/ProductInfos';

export interface IProduct {
  id: number;
  name: string;
  description: string;
  infos_id: ProductInfo;
}
