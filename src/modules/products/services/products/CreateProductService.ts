import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import { Product } from '../../infra/models/Products';
import { IProductRepository } from '../../domain/repositories/IProductRepository';
import { BadRequest } from '../../../../shared/errors/BadRequest';
import { InternalServerError } from '../../../../shared/errors/InternalServerError';

@injectable()
class CreateProductService {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository
  ) {}

  async execute(product: Product): Promise<Product> {
    const productExists = await this.productRepository.findByName(product.name);
    if (productExists) {
      throw new BadRequest('Já existe um produto com este nome');
    }
    if (product.image) {
      const base64Image = product.image.toString();
      product = {
        ...product,
        image: Buffer.from(base64Image, 'base64')
      };
    }
    let newProduct = await this.productRepository.insert(product);
    if (!newProduct) {
      throw new InternalServerError('Erro ao inserir o produto');
    }

    if (newProduct.image) {
      const imageBuffer = newProduct.image;
      newProduct = {
        ...newProduct,
        image: imageBuffer.toString('base64')
      };
    }

    return newProduct;
  }
}

export { CreateProductService };
