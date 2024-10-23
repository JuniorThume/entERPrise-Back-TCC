import { Request, Response } from 'express';
import { LoginService } from '../../services/LoginService';
import { container } from 'tsyringe';
import { CreateCredentialService } from '../../services/CreateCredentialService';
import { status_code } from '../../../../shared/consts/statusCode';
import { DeleteCredentialService } from '../../services/DeleteCredentialService';
import { RefreshTokenService } from '../../services/RefreshTokenService';

class AuthController {
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
    const { username, password } = request.body;

    const createCredentialService = container.resolve(CreateCredentialService);

    const new_credential = await createCredentialService.execute(
      username,
      password
    );
    return response.status(status_code.CREATED).json(new_credential);
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

  public async update(request: Request, response: Response): Promise<Response> {
    // const { password, new_password } = request.body;
    // const { id } = request.params;

    // const updateCredentialService = container.resolve()
    return response.status(status_code.OK).json({});
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteCredentialService = container.resolve(DeleteCredentialService);

    await deleteCredentialService.execute(Number(id));

    return response.status(status_code.OK).json({});
  }
}

export { AuthController };
