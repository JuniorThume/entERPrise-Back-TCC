import { IProduct } from '../../../modules/products/domain/models/IProduct';
import { IProductInfos } from '../../../modules/products/domain/models/IProductInfos';
import { ProductInfo } from '../../../modules/products/infra/models/ProductInfos';
import { Product } from '../../../modules/products/infra/models/Products';
import { FakeProductRepository } from '../../../modules/products/infra/repositories/fakes/FakeProductRepository';
import { CreateProductService } from '../../../modules/products/services/products/CreateProductService';
import { BadRequest } from '../../../shared/errors/BadRequest';

describe('CreateProductService', () => {
  let createProductService: CreateProductService;
  let product_test: IProduct;
  let info_test: IProductInfos;
  beforeAll(() => {
    const fakeProductRepository = new FakeProductRepository();
    createProductService = new CreateProductService(fakeProductRepository);

    product_test = {
      id: 90,
      brand: 'adsadsa',
      category: 'adsadsa',
      description: 'adsadsa',
      gender: 'adsadsa',
      image_url: 'adsadsa',
      material: 'adsadsa',
      name: 'Test Product'
    };

    info_test = {
      id: 190,
      prize: 100,
      color: 'adsadsa',
      quantity: 12,
      size: 'M',
      product_id: product_test as Product
    };
  });
  it('Deve criar um produto', async () => {
    const createdProduct = await createProductService.execute(
      product_test as Product,
      info_test as ProductInfo
    );

    expect(createdProduct).toHaveProperty('id');
    expect(createdProduct?.name).toBe('Test Product');
  });

  it('Não deve permitir inserir dois produtos com o mesmo nome', async () => {
    const productData: IProduct = {
      id: 90,
      brand: 'adsadsa',
      category: 'adsadsa',
      description: 'adsadsa',
      gender: 'adsadsa',
      image_url: 'adsadsa',
      material: 'adsadsa',
      name: 'Test Product'
    };

    const infoData: IProductInfos = {
      id: 190,
      prize: 100,
      color: 'adsadsa',
      quantity: 12,
      size: 'M',
      product_id: productData as Product
    };
    try {
      await createProductService.execute(
        productData as Product,
        infoData as ProductInfo
      );
    } catch (err) {
      expect(err).toBeInstanceOf(BadRequest);
      expect(err).toHaveProperty('message');
    }
  });
});
