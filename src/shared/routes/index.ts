import { Router } from 'express';
import ProductRouter from '../../modules/products/infra/routes/product.routes';
const router = Router();

router.use('/products', ProductRouter);

export default router;
