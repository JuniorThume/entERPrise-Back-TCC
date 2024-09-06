import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import { Product } from '../../infra/models/Products';
import { IProductRepository } from '../../domain/interfaces/repositories/IProductRepository';
import { BadRequest } from '../../../../shared/errors/BadRequest';
import { AppError } from '../../../../shared/errors/AppError';
import { status_code } from '../../../../shared/consts/statusCode';

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

    const newProduct = await this.productRepository.insert(product);

    if (!newProduct) {
      throw new AppError(
        'Erro ao inserir o produto',
        status_code.INTERNAL_SERVER_ERROR
      );
    }

    return newProduct;
  }
}

export { CreateProductService };
