import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';

const routes = Router();
const authController = new AuthController();
routes.post('/', authController.login);
routes.post('/credentials');
routes.get('/credentials');
routes.delete('/credentials/:id');
routes.put('/credentials/:id');

export default routes;
