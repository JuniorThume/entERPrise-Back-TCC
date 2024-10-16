import { Router } from 'express';
import ProductRouter from '../../modules/products/infra/routes/product.routes';
import AuthRouter from '../../modules/auth/infra/routes/auth.routes';
import { authMiddleware } from '../../modules/auth/infra/middlewares/auth.middleware';
const router = Router();

router.use('/auth', AuthRouter);
router.use('/products', authMiddleware, ProductRouter);

export default router;
