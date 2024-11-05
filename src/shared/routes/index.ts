import { Router } from 'express';
import ProductRouter from '../../modules/products/infra/routes/product.routes';
import AuthRouter from '../../modules/auth/infra/routes/credentials.routes';
import PersonalDataRouter from '../../modules/personal_data/infra/routes/personalData.routes';
import EmployeeRouter from '../../modules/employees/infra/routes/employees.routes';
import { authenticationMiddleware } from '../../modules/auth/infra/middlewares/auth.middleware';
const router = Router();

router.use('/auth', AuthRouter);
router.use('/products', authenticationMiddleware, ProductRouter);
router.use('/employees/informations', PersonalDataRouter);
router.use('/employees', EmployeeRouter);

export default router;
