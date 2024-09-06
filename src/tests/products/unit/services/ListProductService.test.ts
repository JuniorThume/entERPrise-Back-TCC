import { Product } from '../../../../modules/products/infra/models/Products';
import { FakeProductRepository } from '../../../../modules/products/infra/repositories/fakes/FakeProductRepository';
import { ListProductService } from '../../../../modules/products/services/products/ListProductsService';

describe('ListProductService', () => {
  const fakeProductRepository = new FakeProductRepository();
  const listProductService = new ListProductService(fakeProductRepository);

  it('Não deve listar nenhum produto (Não há cadastrados)', async () => {
    const products = await listProductService.execute({});

    expect(products).toBeInstanceOf(Array);
    expect(products).toHaveLength(0);
  });

  describe('Deve listar produtos', () => {
    const product1: Product = {
      id: 1,
      name: 'Test Product 1',
      description: 'Test Description',
      category: 'Test Category',
      material: 'Test Material',
      genre: 'Test Gender',
      brand: 'Test Brand',
      image_url: 'Test Image URL',
      infos: []
    };

    const product2: Product = {
      id: 1,
      name: 'Test Product 2',
      description: 'Test Description',
      category: 'Test Category',
      material: 'Test Material',
      genre: 'Test Gender',
      brand: 'Test Brand',
      image_url: 'Test Image URL',
      infos: []
    };

    it('Deve listar um produto cadastrado', async () => {
      await fakeProductRepository.insert(product1);
      await fakeProductRepository.insert(product2);
      const products = await listProductService.execute({});

      expect(products).toBeInstanceOf(Array);
      expect(products).toHaveLength(2);
    });

    it('Deve listar produtos filtrados por nome', async () => {
      const products = await listProductService.execute({
        name: 'Test Product 1'
      });

      expect(products).toBeInstanceOf(Array);
      expect(products).toHaveLength(1);
    });
  });
});
