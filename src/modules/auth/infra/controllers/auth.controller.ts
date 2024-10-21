import { Request, Response } from 'express';
import { LoginService } from '../../services/LoginService';
import { container } from 'tsyringe';
import { CreateCredentialService } from '../../services/CreateCredentialService';
import { status_code } from '../../../../shared/consts/statusCode';

class AuthController {
  public async login(request: Request, response: Response): Promise<Response> {
    const { username, password } = request.body;

    const loginService = container.resolve(LoginService);
    const token = await loginService.execute({ username, password });
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

  public async update(request: Request, response: Response): Promise<Response> {
    const { password } = request.body;
    const { id } = request.params;

    return response.status(status_code.OK).json({});
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    return response.status(status_code.OK).json({});
  }
}

export { AuthController };
