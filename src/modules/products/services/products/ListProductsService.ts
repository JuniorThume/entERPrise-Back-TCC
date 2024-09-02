import { FindManyOptions, Like } from 'typeorm';
import { IFilterProduct } from '../../domain/models/IFilterProduct';
import { Product } from '../../infra/models/Products';
import { ProductRepository } from '../../infra/repositories/ProductRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
class ListProductService {
  constructor(
    @inject('ProductRepository')
    private productRepository: ProductRepository
  ) {}

  async execute(filter: IFilterProduct): Promise<Product[] | null> {
    const options: FindManyOptions = {
      where: {
        name: filter.name ? Like(`%${filter?.name}%`) : null,
        description: filter.description
          ? Like(`%${filter?.description}%`)
          : null,
        material: filter.material ? Like(`%${filter?.material}%`) : null,
        brand: filter.brand ? Like(`%${filter?.brand}%`) : null,
        category: filter.category ? Like(`%${filter?.category}%`) : null
      }
    };
    const products = await this.productRepository.findByFilter(options);
    return products;
  }
}

export default ListProductService;
