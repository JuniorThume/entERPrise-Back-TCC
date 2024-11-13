import { Router } from 'express';
import { CredentialController } from '../controllers/CredentialController';
import {
  create_credential_validator,
  delete_credential_validator,
  list_credential_validator,
  login_validator,
  refresh_token_validator,
  update_credential_validator
} from '../validation/credentialsValidator';

const routes = Router();
const credentialController = new CredentialController();
routes.post('/login', login_validator, credentialController.login);
routes.post(
  '/refresh-token',
  refresh_token_validator,
  credentialController.refresh_token
);
routes.get('/', list_credential_validator, credentialController.list);
routes.post('/', create_credential_validator, credentialController.create);
routes.put('/:id', update_credential_validator, credentialController.update);
routes.delete('/:id', delete_credential_validator, credentialController.delete);

export default routes;
