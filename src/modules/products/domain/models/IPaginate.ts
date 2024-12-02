import { Product } from '../../infra/models/Products';

export interface IPaginate {
  data?: Product[];
  current_page: number | null;
  next_page?: number | null;
  previous_page?: number | null;
  total_pages: number | null;
}
