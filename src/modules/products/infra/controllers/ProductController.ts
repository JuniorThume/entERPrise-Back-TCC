import { Request, Response } from 'express';
import { CreateProductService } from '../../services/products/CreateProductService';
import { RemoveProductService } from '../../services/products/RemoveProductService';
import { ShowProductService } from '../../services/products/ShowProductService';
import { ListProductService } from '../../services/products/ListProductsService';
import { status_code } from '../../../../shared/consts/statusCode';
import { UpdateProductService } from '../../services/products/UpdateProductService';
import { container } from 'tsyringe';

class ProductController {
  public async insert(request: Request, response: Response): Promise<Response> {
    const createProductService = container.resolve(CreateProductService);
    const productCreated = await createProductService.execute(request.body);
    return response.status(status_code.CREATED).json(productCreated);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const removeProductService = container.resolve(RemoveProductService);
    await removeProductService.execute(Number(id));

    return response.status(status_code.NO_CONTENT).json();
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const showProductService = container.resolve(ShowProductService);
    const id: number = Number(request.params.id);
    const product = await showProductService.execute(id);

    return response.status(status_code.OK).json(product);
  }

  public async list(request: Request, response: Response): Promise<Response> {
    const filter = request.query;
    const listProductService = container.resolve(ListProductService);
    const products = await listProductService.execute(filter);

    return response.status(status_code.OK).json(products);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const id = Number(request.params.id);
    const { ...rest } = request.body;
    const updateProductService = container.resolve(UpdateProductService);
    const productUpdated = await updateProductService.execute(id, rest);

    return response.status(status_code.OK).json(productUpdated);
  }
}

export { ProductController };
