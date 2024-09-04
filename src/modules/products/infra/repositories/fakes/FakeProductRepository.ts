import { DeleteResult } from 'typeorm';
import { IProductRepository } from '../../../domain/repositories/IProductRepository';
import { ProductInfo } from '../../models/ProductInfos';
import { Product } from '../../models/Products';
import { IFilterProduct } from '../../../domain/models/IFilterProduct';

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
    return this.ormProductRepository[index] || null;
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

  public async findByFilter(
    options: IFilterProduct
  ): Promise<Product[] | null> {
    let productsFiltered = this.ormProductRepository;
    if (Object.keys(options).length === 0) {
      return this.ormProductRepository;
    }
    if (options.name !== undefined) {
      productsFiltered = productsFiltered.filter((product) =>
        product.name.includes(options?.name as string)
      );
    }

    if (options.description !== undefined) {
      productsFiltered = productsFiltered.filter((product) =>
        product.description.includes(options?.description as string)
      );
    }

    if (options.brand !== undefined) {
      productsFiltered = productsFiltered.filter((product) =>
        product.brand.includes(options?.brand as string)
      );
    }

    if (options.gender !== undefined) {
      productsFiltered = productsFiltered.filter((product) =>
        product.gender.includes(options?.gender as string)
      );
    }

    if (options.material !== undefined) {
      productsFiltered = productsFiltered.filter((product) =>
        product.material.includes(options?.material as string)
      );
    }

    if (options.category !== undefined) {
      productsFiltered = productsFiltered.filter((product) =>
        product.category.includes(options?.category as string)
      );
    }

    return productsFiltered;
  }
}

export { FakeProductRepository };
