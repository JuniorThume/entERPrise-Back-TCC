import { DeleteResult, FindManyOptions, Like, Repository } from 'typeorm';
import { Product } from '../models/Products';
import { data_source } from '../../../../shared/typeorm/dataSource';
import { IProductRepository } from '../../domain/repositories/IProductRepository';
import { ProductInfo } from '../models/ProductInfos';
import { IFilterProduct } from '../../domain/models/IFilterProduct';
import { IPaginate } from '../../domain/models/IPaginate';

export class ProductRepository implements IProductRepository {
  public ormProductRepository: Repository<Product>;
  public ormInfosRepository: Repository<ProductInfo>;
  constructor() {
    this.ormProductRepository = data_source.getRepository(Product);
    this.ormInfosRepository = data_source.getRepository(ProductInfo);
  }

  public async insert(product: Product): Promise<Product | null> {
    const productCreated = await this.ormProductRepository.save(product);
    if (!productCreated) {
      return null;
    }

    return productCreated;
  }

  public async update(id: number, product: Product): Promise<Product | null> {
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

  public async delete(id: number): Promise<DeleteResult> {
    const productRemoved = await this.ormProductRepository.delete({ id: id });

    return productRemoved;
  }

  public async findByFilter(
    filter: IFilterProduct,
    limit: number,
    page: number
  ): Promise<IPaginate> {
    const skip = (page - 1) * limit;
    const options: FindManyOptions = {
      where: {
        name: filter.name ? Like(`%${filter?.name}%`) : null,
        description: filter.description
          ? Like(`%${filter?.description}%`)
          : null,
        material: filter.material ? Like(`%${filter?.material}%`) : null,
        brand: filter.brand ? Like(`%${filter?.brand}%`) : null,
        category: filter.category ? Like(`%${filter?.category}%`) : null
      },
      relations: ['infos']
    };

    const [products, total_products] = await this.ormProductRepository
      .createQueryBuilder('products')
      .setFindOptions(options)
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    const total_pages = Math.ceil(total_products / limit);
    const result: IPaginate = {
      data: products,
      current_page: page,
      total_pages,
      next_page: page < total_pages ? page + 1 : null,
      previous_page: page > 1 ? page - 1 : null
    };

    return result;
  }

  public async findById(product_id: number): Promise<Product | null> {
    const product = await this.ormProductRepository.findOne({
      where: { id: product_id },
      relations: ['infos']
    });

    return product;
  }

  public async findByName(name: string): Promise<Product | null> {
    const product = await this.ormProductRepository.findOne({
      where: { name: name },
      relations: ['infos']
    });

    return product;
  }

  public async findByDescription(
    description: string
  ): Promise<Product[] | null> {
    const product = await this.ormProductRepository.find({
      where: { description: Like(`%${description}%`) },
      relations: ['infos']
    });
    return product;
  }
}
