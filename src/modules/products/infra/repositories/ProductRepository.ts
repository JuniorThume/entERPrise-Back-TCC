import { DeleteResult, FindManyOptions, Like, Repository } from 'typeorm';
import { Product } from '../models/Products';
import { data_source } from '@typeorm/dataSource';
import { IProductRepository } from '../../domain/repositories/IProductRepository';
import { ProductOption } from '../models/ProductOptions';
import { IFilterProduct } from '../../domain/models/IFilterProduct';
import { IPaginate } from '../../domain/models/IPaginate';

export class ProductRepository implements IProductRepository {
  public ormProductRepository: Repository<Product>;
  public ormOptionsRepository: Repository<ProductOption>;
  constructor() {
    this.ormProductRepository = data_source.getRepository(Product);
    this.ormOptionsRepository = data_source.getRepository(ProductOption);
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
        material: filter.material ? Like(`%${filter?.material}%`) : null,
        brand: filter.brand ? Like(`%${filter?.brand}%`) : null,
        category: filter.category ? Like(`%${filter?.category}%`) : null
      },
      relations: ['options']
    };

    const [products, total_products] = await this.ormProductRepository
      .createQueryBuilder('products')
      .setFindOptions(options)
      .skip(skip)
      .take(limit)
      .getManyAndCount();
    console.log(products);

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
      relations: ['options']
    });

    return product;
  }

  public async findByName(name: string): Promise<Product | null> {
    const product = await this.ormProductRepository.findOne({
      where: { name: name },
      relations: ['options']
    });

    return product;
  }

  public async findByDescription(
    description: string
  ): Promise<Product[] | null> {
    const product = await this.ormProductRepository.find({
      where: { description: Like(`%${description}%`) },
      relations: ['options']
    });
    return product;
  }
}
