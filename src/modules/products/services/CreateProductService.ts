import ValidationError from '../../../shared/errors/ValidationError';
import { ProductInfo } from '../infra/models/ProductInfos';
import { Product } from '../infra/models/Products';
import { ProductRepository } from '../infra/repositories/ProductRepository';

class CreateProductService {
  productRepository: ProductRepository;
  constructor() {
    this.productRepository = new ProductRepository();
  }

  async execute(
    product: Product,
    productInfo: ProductInfo
  ): Promise<Product | null> {
    const productExists = await this.productRepository.findByName(product.name);
    if (productExists?.length) {
      throw new ValidationError('Já existe um produto com este nome', product);
    }

    const newProduct = this.productRepository.insert(product, productInfo);

    return newProduct;
  }
}

export default CreateProductService;
