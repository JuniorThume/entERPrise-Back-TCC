import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import { Product } from '../../infra/models/Products';
import { IProductRepository } from '../../domain/repositories/IProductRepository';
import { BadRequest } from '../../../../shared/errors/BadRequest';
import { NotFound } from '../../../../shared/errors/NotFound';

@injectable()
class UpdateProductService {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository
  ) {}

  async execute(id: number, product: Product): Promise<Product | null> {
    const productExists = await this.productRepository.findById(id);
    if (!productExists) {
      throw new NotFound('Produto nao encontrado');
    }

    if (product.name !== productExists.name) {
      const productNameAlreadyExists = await this.productRepository.findByName(
        product.name
      );

      if (productNameAlreadyExists) {
        throw new BadRequest('O nome definido já pertence a outro produto');
      }
    }

    if (product.image) {
      const base64Image = product.image.toString();
      product = {
        ...product,
        image: Buffer.from(base64Image, 'base64')
      };
    }

    if (product.genre) {
      if (
        !['Masculino', 'Feminino', 'Unissex', 'Infantil'].includes(
          product.genre
        )
      ) {
        throw new BadRequest('O genero do produto e invalido');
      }
    }

    const productUpdated = await this.productRepository.update(id, product);

    return productUpdated as null;
  }
}

export { UpdateProductService };
