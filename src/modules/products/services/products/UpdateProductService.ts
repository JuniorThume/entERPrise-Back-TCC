import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import { status_code } from '../../../../shared/consts/statusCode';
import { AppError } from '../../../../shared/errors/AppError';
import { Product } from '../../infra/models/Products';
import { IProductRepository } from '../../domain/repositories/IProductRepository';
import { BadRequest } from '../../../../shared/errors/BadRequest';

@injectable()
class UpdateProductService {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository
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

      if (productNameAlreadyExists) {
        throw new BadRequest('O nome definido já pertence a outro produto', {
          status: 'Outro produto já possui este nome',
          name: product.name
        });
      }
    }

    if (product.genre) {
      if (!['Masculino', 'Feminino', 'Unissex'].includes(product.genre)) {
        throw new BadRequest('Genero invalido', {
          status: 'Invalid gender',
          genre: product.genre
        });
      }
    }

    if (product.image_url) {
      const imageExists = fetch(product.image_url)
        .then((image) => image)
        .catch(
          () =>
            new BadRequest('A imagem não é válida', { url: product.image_url })
        );
      if (!imageExists)
        throw new BadRequest('Imagem not found', {
          status: 'A URL da imagem é inválida',
          image_url: product.image_url
        });
    }

    const productUpdated = await this.productRepository.update(id, product);

    return productUpdated as null;
  }
}

export { UpdateProductService };
