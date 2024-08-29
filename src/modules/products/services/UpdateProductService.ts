import { AppError } from '../../../shared/errors/AppError';
import { Product } from '../infra/models/Products';
import { ProductRepository } from '../infra/repositories/ProductRepository';

class UpdateProductService {
  private productRepository: ProductRepository;
  constructor() {
    this.productRepository = new ProductRepository();
  }

  async execute(id: number, product: Product): Promise<Product | null> {
    const productExists = await this.productRepository.findById(id);
    if (!productExists) {
      throw new AppError('Product not found', 404, [
        { status: 'product not found', id: id }
      ]);
    }

    const productNameAlreadyExists = await this.productRepository.findByName(
      product.name
    );
    if (
      productNameAlreadyExists &&
      product.name !== productNameAlreadyExists[0].name
    ) {
      throw new Error('O nome definido já pertence a outro produto');
    }

    if (!(product.gender in ['Masculino', 'Feminino'])) {
      throw new Error('Genero invalido');
    }

    const productUpdated = this.productRepository.update(product);

    return productUpdated;
  }
}

export default UpdateProductService;
