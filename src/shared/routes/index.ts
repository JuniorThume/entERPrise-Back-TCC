import { Router } from 'express';
import ProductRouter from '../../modules/products/infra/routes/product.routes';
const router = Router();

router.use('/products', ProductRouter);
router.use('/', (req, res) => {
  res.status(200).json();
});

export default router;
