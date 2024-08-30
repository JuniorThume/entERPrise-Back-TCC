import ValidationError from '../../../shared/errors/ValidationError';
import { Product } from '../infra/models/Products';
import { ProductRepository } from '../infra/repositories/ProductRepository';

class ShowProductService {
  private productRepository: ProductRepository;
  constructor() {
    this.productRepository = new ProductRepository();
  }

  async execute(id: number): Promise<Product | null> {
    const product = await this.productRepository.findById(id);
    if (!product) {
      throw new ValidationError('Produto nao encontrado', {
        status: 'Nao foi possivel encontrar o produto preterido',
        id: id
      });
    }

    return product;
  }
}

export default ShowProductService;
