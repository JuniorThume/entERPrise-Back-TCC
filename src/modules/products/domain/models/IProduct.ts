import { ProductInfo } from '../../infra/models/ProductInfos';

export interface IProduct {
  id?: number;
  image?: string | Buffer;
  name: string;
  description: string;
  category: string;
  material: string;
  genre: string;
  brand: string;
  infos?: ProductInfo[];
}
