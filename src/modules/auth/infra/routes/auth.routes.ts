import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';

const routes = Router();
const authController = new AuthController();
routes.post('/', authController.login);
routes.post('/refresh-token', authController.refresh_token);
routes.post('/credentials');
routes.put('/credentials/:id');
routes.delete('/credentials/:id');

export default routes;
