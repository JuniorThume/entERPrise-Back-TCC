import { Router } from 'express';
import ProductRouter from '../../modules/products/infra/routes/product.routes';
import AuthRouter from '../../modules/auth/infra/routes/auth.routes';
import PersonalDataRouter from '../../modules/personal_data/infra/routes/personalData.routes';
import { authMiddleware } from '../../modules/auth/infra/middlewares/auth.middleware';
const router = Router();

router.use('/auth', AuthRouter);
router.use('/products', authMiddleware, ProductRouter);
router.use('/employees/informations', PersonalDataRouter);

export default router;
