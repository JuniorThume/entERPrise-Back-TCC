import { IFilter } from '../domain/models/IFilter';
import { Product } from '../infra/models/Products';
import { ProductRepository } from '../infra/repositories/ProductRepository';

class ShowProductService {
  private productRepository: ProductRepository;
  constructor() {
    this.productRepository = new ProductRepository();
  }

  async execute(filter: IFilter): Promise<Product | null> {
    const product = this.productRepository.findOneByFilter(filter);

    return product;
  }
}

export default ShowProductService;
