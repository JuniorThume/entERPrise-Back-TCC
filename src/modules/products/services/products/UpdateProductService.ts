import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import { status_code } from '../../../../shared/consts/statusCode';
import { AppError } from '../../../../shared/errors/AppError';
import { Product } from '../../infra/models/Products';
import { IProductRepository } from '../../domain/interfaces/repositories/IProductRepository';
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
      throw new AppError('Product not found', status_code.NOT_FOUND);
    }
    if (product.name) {
      const productNameAlreadyExists = await this.productRepository.findByName(
        product.name
      );

      if (productNameAlreadyExists) {
        throw new BadRequest('O nome definido já pertence a outro produto');
      }
    }

    if (product.genre) {
      if (!['Masculino', 'Feminino', 'Unissex'].includes(product.genre)) {
        throw new BadRequest('O genero do produto e invalido');
      }
    }

    if (product.image_url) {
      const imageExists = fetch(product.image_url)
        .then((image) => image)
        .catch(() => new BadRequest('A imagem não é válida'));
      if (!imageExists) throw new BadRequest('Imagem not found');
    }

    const productUpdated = await this.productRepository.update(id, product);

    return productUpdated as null;
  }
}

export { UpdateProductService };
