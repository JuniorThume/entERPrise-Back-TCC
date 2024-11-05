import { Request, Response } from 'express';
import { LoginService } from '../../services/LoginService';
import { container } from 'tsyringe';
import { CreateCredentialService } from '../../services/CreateCredentialService';
import { status_code } from '../../../../shared/consts/statusCode';
import { DeleteCredentialService } from '../../services/DeleteCredentialService';
import { RefreshTokenService } from '../../services/RefreshTokenService';
import { ListCredentialService } from '../../services/ListCredentialService';
import { instanceToInstance } from 'class-transformer';
import { UpdateCredentialService } from '../../services/UpdateCredentialService';

class CredentialController {
  public async login(request: Request, response: Response): Promise<Response> {
    const { username, password } = request.body;

    const loginService = container.resolve(LoginService);
    const token = await loginService.execute({
      username,
      password
    });
    return response.status(status_code.OK).json(token);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { username, password, employee_id } = request.body;

    const createCredentialService = container.resolve(CreateCredentialService);

    const new_credential = await createCredentialService.execute(
      Number(employee_id),
      username,
      password
    );
    return response
      .status(status_code.CREATED)
      .setHeader('Content-Type', 'application/json')
      .json(instanceToInstance(new_credential));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const updateCredentialService = container.resolve(UpdateCredentialService);

    const updated_credential = await updateCredentialService.execute(
      Number(id),
      request.body
    );
    return response
      .status(status_code.OK)
      .setHeader('Content-Type', 'application/json')
      .json(instanceToInstance(updated_credential));
  }

  public async refresh_token(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { access_token } = request.body;

    const refreshTokenService = container.resolve(RefreshTokenService);

    const new_token = await refreshTokenService.execute(access_token);

    return response.status(200).json(new_token);
  }

  public async list(request: Request, response: Response): Promise<Response> {
    const listCredentialService = container.resolve(ListCredentialService);

    const credentials = await listCredentialService.execute();

    return response
      .status(status_code.OK)
      .json(instanceToInstance(credentials));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteCredentialService = container.resolve(DeleteCredentialService);

    await deleteCredentialService.execute(Number(id));

    return response.status(status_code.NO_CONTENT).json({});
  }
}

export { CredentialController };
