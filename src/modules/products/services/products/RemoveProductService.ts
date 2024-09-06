import 'reflect-metadata';
import { DeleteResult } from 'typeorm';
import { AppError } from '../../../../shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IProductRepository } from '../../domain/interfaces/repositories/IProductRepository';
import { NotFound } from '../../../../shared/errors/NotFound';

@injectable()
class RemoveProductService {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository
  ) {}

  async execute(id: number): Promise<DeleteResult> {
    const productExists = await this.productRepository.findById(id);
    if (!productExists) {
      throw new NotFound('Produto nao encontrado');
    }
    const productRemoved = await this.productRepository.delete(id);
    if (!productRemoved) {
      throw new AppError('Falha ao remover o produto', 500);
    }

    if (productRemoved.affected === 0) {
      throw new AppError('Produto nao removido', 500);
    }

    return productRemoved;
  }
}

export { RemoveProductService };
