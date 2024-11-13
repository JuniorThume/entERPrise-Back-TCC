import { Router } from 'express';
import ProductRouter from '../../modules/products/infra/routes/product.routes';
import CredentialRouter from '../../modules/credentials/infra/routes/credentials.routes';
// import PersonalDataRouter from '../../modules/personal_data/infra/routes/personalData.routes';
import EmployeeRouter from '../../modules/employees/infra/routes/employees.routes';
import { authenticationMiddleware } from '../../modules/credentials/infra/middlewares/auth.middleware';
const router = Router();

router.use('/credentials', CredentialRouter);
router.use('/products', authenticationMiddleware, ProductRouter);
router.use('/employees', EmployeeRouter);
// router.use('/employees/informations', PersonalDataRouter);

export default router;
