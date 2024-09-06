import { Product } from '../../infra/models/Products';

class ProductResponseDTO {
  readonly id: number;
  readonly name: string;
  readonly description: string;
  readonly category: string;
  readonly material: string;
  readonly genre: string;
  readonly brand: string;
  readonly image_url: string;
  constructor(product: Product) {
    Object.assign(this, product);
  }
}

export { ProductResponseDTO };
