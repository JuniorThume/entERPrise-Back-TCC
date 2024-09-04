import 'reflect-metadata';
import { DeleteResult } from 'typeorm';
import { AppError } from '../../../../shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IProductRepository } from '../../domain/repositories/IProductRepository';
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
      throw new NotFound('Produto nao encontrado', {
        status: 'id nao encontrado',
        id: id
      });
    }
    const productRemoved = await this.productRepository.delete(id);
    if (!productRemoved) {
      throw new AppError('Falha ao remover o produto', 500, [
        {
          status: 'falha ao remover o produto',
          id: id
        }
      ]);
    }

    if (productRemoved.affected === 0) {
      throw new AppError('Produto nao removido', 500, [
        {
          status: 'Ocorreu um erro desconhecido ao tentar remover o produto',
          id: id
        }
      ]);
    }

    return productRemoved;
  }
}

export { RemoveProductService };
