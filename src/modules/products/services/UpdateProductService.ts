import { inject, injectable } from 'tsyringe';
import { status_code } from '../../../shared/consts/statusCode';
import { AppError } from '../../../shared/errors/AppError';
import ValidationError from '../../../shared/errors/ValidationError';
import { Product } from '../infra/models/Products';
import { ProductRepository } from '../infra/repositories/ProductRepository';

@injectable()
class UpdateProductService {
  constructor(
    @inject('ProductRepository')
    private productRepository: ProductRepository
  ) {}

  async execute(id: number, product: Product): Promise<Product | null> {
    const productExists = await this.productRepository.findById(id);
    if (!productExists) {
      throw new AppError('Product not found', status_code.NOT_FOUND, {
        status: 'O produto preterido não existe',
        id: id
      });
    }
    if (product.name) {
      const productNameAlreadyExists = await this.productRepository.findByName(
        product.name
      );
      if (
        productNameAlreadyExists &&
        product.name !== productNameAlreadyExists[0].name
      ) {
        throw new ValidationError(
          'O nome definido já pertence a outro produto',
          {
            status: 'Outro produto já possui este nome',
            name: product.name
          }
        );
      }
    }

    if (product.gender) {
      if (!(product.gender in ['Masculino', 'Feminino', 'Unissex'])) {
        throw new ValidationError('Genero invalido', {
          status: 'Invalid gender',
          gender: product.gender
        });
      }
    }

    if (product.image_url) {
      const imageExists = fetch(product.image_url);
      if (!imageExists)
        throw new ValidationError('Imagem not found', {
          status: 'A URL da imagem é inválida',
          image_url: product.image_url
        });
    }

    const productUpdated = await this.productRepository.update(id, product);
    console.log(productUpdated);
    return productUpdated as null;
  }
}

export default UpdateProductService;
