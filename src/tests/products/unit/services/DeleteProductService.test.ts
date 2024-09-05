import { ProductInfo } from '../../../../modules/products/infra/models/ProductInfos';
import { Product } from '../../../../modules/products/infra/models/Products';
import { FakeProductRepository } from '../../../../modules/products/infra/repositories/fakes/FakeProductRepository';
import { RemoveProductService } from '../../../../modules/products/services/products/RemoveProductService';
import { NotFound } from '../../../../shared/errors/NotFound';

describe('DeleteProductService', () => {
  const fakeProductRepository = new FakeProductRepository();
  const removeProductService: RemoveProductService = new RemoveProductService(
    fakeProductRepository
  );
  it('Deve remover o produto especificado', async () => {
    const product: Product = {
      id: 1,
      name: 'Teste',
      description: 'Teste',
      category: 'Teste',
      material: 'Teste',
      genre: 'Teste',
      brand: 'Teste',
      image_url: 'Teste',
      infos: []
    };

    const info: ProductInfo = {
      id: 2,
      quantity: 10,
      size: 'M',
      color: 'Teste',
      prize: 100,
      product_id: product as Product
    };

    const prod_created = await fakeProductRepository.insert(product, info);

    await removeProductService.execute(prod_created?.id as number);

    const finded = await fakeProductRepository.findById(
      prod_created?.id as number
    );

    expect(finded).toBeNull();
  });

  it('Deve ser impossível concluir uma remoção de um produto inexistente', async () => {
    try {
      await removeProductService.execute(90);
    } catch (err) {
      expect(err).toBeInstanceOf(NotFound);
      expect(err).toHaveProperty('message');
    }
  });
});
