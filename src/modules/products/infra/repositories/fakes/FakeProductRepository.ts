import { DeleteResult, FindManyOptions } from 'typeorm';
import { IProductRepository } from '../../../domain/repositories/IProductRepository';
import { ProductInfo } from '../../models/ProductInfos';
import { Product } from '../../models/Products';

class FakeProductRepository implements IProductRepository {
  private ormProductRepository: Product[] = [];
  private ormInfosRepository: ProductInfo[] = [];

  public async insert(
    product: Product,
    product_info: ProductInfo
  ): Promise<Product | null> {
    this.ormProductRepository.push(product);
    this.ormInfosRepository.push(product_info);

    return product;
  }

  public async update(id: number, product: Product): Promise<Product | null> {
    const index = this.ormProductRepository.findIndex((prod) => prod.id === id);
    this.ormProductRepository[index] = product;
    return product;
  }

  public async delete(id: number): Promise<DeleteResult> {
    const index = this.ormProductRepository.findIndex(
      (product) => product.id === id
    );

    this.ormProductRepository.splice(index, 1);

    return { raw: 0, affected: 1 };
  }

  public async findById(id: number): Promise<Product | null> {
    const index = this.ormProductRepository.findIndex(
      (product) => product.id === id
    );
    return this.ormProductRepository[index];
  }

  public async findByName(name: string): Promise<Product[] | null> {
    const products = this.ormProductRepository.filter((product) =>
      product.name.includes(name)
    );
    return products;
  }

  public async findByDescription(
    description: string
  ): Promise<Product[] | null> {
    const products = this.ormProductRepository.filter((product) =>
      product.description.includes(description)
    );
    return products;
  }

  public async findByFilter(options: FindManyOptions): Promise<Product[] | null> { //eslint-disable-line
    const products = this.ormProductRepository.filter((product) => {
      return product.name.includes('Blu') && product.brand.includes('B');
    });

    return products;
  }
}

export { FakeProductRepository };
