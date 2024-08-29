import { Product } from '../infra/models/Products';
import { ProductRepository } from '../infra/repositories/ProductRepository';

class ListProductService {
  private productRepository: ProductRepository;
  constructor() {
    this.productRepository = new ProductRepository();
  }

  async execute(): Promise<Product[]> {
    const products = this.productRepository.findAll();

    return products;
  }
}

export default ListProductService;
