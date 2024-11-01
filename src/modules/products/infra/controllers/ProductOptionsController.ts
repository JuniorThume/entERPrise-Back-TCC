import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateProductOptionsService } from '../../services/options/CreateProductOptionsService';
import { status_code } from '../../../../shared/consts/statusCode';
import { RemoveProductOptionsService } from '../../services/options/RemoveProductOptionsService';
import { ShowProductOptionsService } from '../../services/options/ShowProductOptionsService';
import { ListProductOptionsService } from '../../services/options/ListProductOptionsService';
import { UpdateProductOptionsService } from '../../services/options/UpdateProductOptionsService';
import { plainToInstance } from 'class-transformer';
import { ProductOption } from '../models/ProductOptions';

class ProductOptionsController {
  public async insert(request: Request, response: Response): Promise<Response> {
    const product_id = Number(request.params.product_id);
    const infos = request.body;

    const createProductOptionsService = container.resolve(
      CreateProductOptionsService
    );
    const infoCreated = await createProductOptionsService.execute(
      product_id,
      infos
    );

    return response
      .status(status_code.CREATED)
      .json(plainToInstance(ProductOption, infoCreated));
  }

  public async list(request: Request, response: Response): Promise<Response> {
    const infoRepository = container.resolve(ListProductOptionsService);
    const { product_id } = request.params;
    const infos = await infoRepository.execute(Number(product_id));

    return response
      .status(status_code.OK)
      .json(plainToInstance(ProductOption, infos));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { product_id, id } = request.params;

    const showProductOptionsService = container.resolve(
      ShowProductOptionsService
    );
    const info = await showProductOptionsService.execute(
      Number(product_id),
      Number(id)
    );

    return response
      .status(status_code.OK)
      .json(plainToInstance(ProductOption, info));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const product_id = parseInt(request.params.product_id);
    const id = parseInt(request.params.id);
    const changes = request.body;

    const updateProductOptionsService = container.resolve(
      UpdateProductOptionsService
    );

    const infoUpdated = await updateProductOptionsService.execute(
      product_id,
      id,
      changes
    );

    return response
      .status(status_code.CREATED)
      .json(plainToInstance(ProductOption, infoUpdated));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { product_id, id } = request.params;

    const deleteProductOptionsService = container.resolve(
      RemoveProductOptionsService
    );

    await deleteProductOptionsService.execute(Number(product_id), Number(id));

    return response.status(status_code.NO_CONTENT).json();
  }
}

export { ProductOptionsController };
