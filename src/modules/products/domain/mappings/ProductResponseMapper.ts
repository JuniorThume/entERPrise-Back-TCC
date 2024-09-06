import { Product } from '../../infra/models/Products';
import { ProductResponseDTO } from '../dtos/ProductResponseDTO';

class ProductResponseMapper {
  static response(product: Product): ProductResponseDTO {
    return new ProductResponseDTO(product);
  }
}

export { ProductResponseMapper };
