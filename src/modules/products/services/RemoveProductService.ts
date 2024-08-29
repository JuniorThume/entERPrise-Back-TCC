import { AppError } from '../../../shared/errors/AppError';
import { ProductRepository } from '../infra/repositories/ProductRepository';

class RemoveProductService {
  private productRepository: ProductRepository;
  constructor() {
    this.productRepository = new ProductRepository();
  }

  async execute(id: number): Promise<null> {
    const productExists = await this.productRepository.findById(id);
    if (!productExists) {
      throw new AppError('Produto nao encontrado', 404, [
        { status: 'id nao encontrado', id: id }
      ]);
    }
    const productRemoved = this.productRepository.delete(id);

    if (!productRemoved) {
      throw new AppError('Falha ao remover o produto', 500, [
        { status: 'falha ao remover o produto', id: id }
      ]);
    }

    return null;
  }
}

export default RemoveProductService;
