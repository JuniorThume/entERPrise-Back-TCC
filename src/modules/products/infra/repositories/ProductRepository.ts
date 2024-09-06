import { DeleteResult, FindManyOptions, Like, Repository } from 'typeorm';
import { Product } from '../models/Products';
import { data_source } from '../../../../shared/typeorm/dataSource';
import { IProductRepository } from '../../domain/interfaces/repositories/IProductRepository';
import { ProductInfo } from '../models/ProductInfos';
import { IFilterProduct } from '../../domain/interfaces/models/IFilterProduct';

export class ProductRepository implements IProductRepository {
  public ormProductRepository: Repository<Product>;
  public ormInfosRepository: Repository<ProductInfo>;
  constructor() {
    this.ormProductRepository = data_source.getRepository(Product);
    this.ormInfosRepository = data_source.getRepository(ProductInfo);
  }

  async insert(product: Product): Promise<Product | null> {
    const productCreated = await this.ormProductRepository.save(product);
    if (!productCreated) {
      return null;
    }

    return productCreated;
  }

  async update(id: number, product: Product): Promise<Product | null> {
    const _product = await this.ormProductRepository.findOne({
      where: {
        id: id
      }
    });

    if (!_product) {
      return null;
    }

    this.ormProductRepository.merge(_product, product);
    const productUpdated = await this.ormProductRepository.save(_product);
    return productUpdated;
  }

  async delete(id: number): Promise<DeleteResult> {
    const productRemoved = await this.ormProductRepository.delete({ id: id });

    return productRemoved;
  }

  async findByFilter(filter: IFilterProduct): Promise<Product[] | null> {
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

    Object.assign(options, { relations: ['infos'] });
    const product = await this.ormProductRepository.find(options);

    return product;
  }

  async findById(product_id: number): Promise<Product | null> {
    const product = await this.ormProductRepository.findOne({
      where: { id: product_id }
    });

    return product;
  }

  async findByName(name: string): Promise<Product | null> {
    const product = await this.ormProductRepository.findOne({
      where: { name: name },
      relations: ['infos']
    });

    return product;
  }

  async findByDescription(description: string): Promise<Product[] | null> {
    const product = await this.ormProductRepository.find({
      where: { description: Like(`%${description}%`) },
      relations: ['infos']
    });
    return product;
  }
}
