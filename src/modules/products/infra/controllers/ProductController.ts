import { NextFunction, Request, Response } from 'express';
import CreateProductService from '../../services/CreateProductService';
import RemoveProductService from '../../services/RemoveProductService';
import ShowProductService from '../../services/ShowProductService';
import ListProductService from '../../services/ListProductsService';
import { status_code } from '../../../../shared/consts/statusCode';
import UpdateProductService from '../../services/UpdateProductService';

export class ProductController {
  public async insert(
    request: Request,
    response: Response,
    next: NextFunction //eslint-disable-line 
  ): Promise<Response> {
    const createProductService = new CreateProductService();
    const { product, product_info } = request.body;
    const productCreated = await createProductService.execute(
      product,
      product_info
    );
    // TODO Entender como o express-async-errors funciona

    return response.status(status_code.CREATED).json(productCreated);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const removeProductService = new RemoveProductService();
    await removeProductService.execute(Number(id));

    return response.status(status_code.NO_CONTENT).json();
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const showProductService = new ShowProductService();
    const id: number = Number(request.params.id);
    const product = await showProductService.execute(id);

    return response.status(status_code.OK).json(product);
  }

  public async list(request: Request, response: Response): Promise<Response> {
    const listProductService = new ListProductService();
    const products = await listProductService.execute();

    return response.status(status_code.OK).json(products);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const id = Number(request.params.id);
    const { ...rest } = request.body;
    const updateProductService = new UpdateProductService();
    const productUpdated = await updateProductService.execute(id, rest);

    return response.status(status_code.OK).json(productUpdated);
  }
}
