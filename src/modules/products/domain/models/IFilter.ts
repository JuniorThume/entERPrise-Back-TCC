import { ProductInfo } from '../../infra/models/ProductInfos';

export interface IFilter {
  id?: number;
  name?: string;
  description?: string;
  infos_id?: ProductInfo;
}
