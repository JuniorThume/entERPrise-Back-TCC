import 'reflect-metadata';
import { DeleteResult } from 'typeorm';
import { inject, injectable } from 'tsyringe';
import { IProductRepository } from '../../domain/repositories/IProductRepository';
import { NotFound } from '../../../../shared/errors/NotFound';
import { InternalServerError } from '../../../../shared/errors/InternalServerError';

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
      throw new InternalServerError('Falha ao remover o produto');
    }

    if (productRemoved.affected === 0) {
      throw new InternalServerError('Produto nao removido');
    }

    return productRemoved;
  }
}

export { RemoveProductService };
