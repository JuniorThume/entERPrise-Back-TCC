import { ProductOption } from '../../infra/models/ProductOptions';

export interface IProduct {
  id?: number;
  code: string;
  image?: string | Buffer;
  name: string;
  description: string;
  category: string;
  material: string;
  genre: string;
  brand: string;
  infos?: ProductOption[];
}
