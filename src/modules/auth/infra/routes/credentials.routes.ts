import { Router } from 'express';
import { CredentialController } from '../controllers/credential.controller';

const routes = Router();
const credentialController = new CredentialController();
routes.post('/', credentialController.login);
routes.post('/refresh-token', credentialController.refresh_token);
routes.get('/credentials', credentialController.list);
routes.post('/credentials', credentialController.create);
routes.put('/credentials/:id', credentialController.update);
routes.delete('/credentials/:id', credentialController.delete);

export default routes;
