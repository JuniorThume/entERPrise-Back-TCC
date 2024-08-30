import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  return res.status(200).json({ message: 'Start Route with TS-NODE-DEV' });
});

export default router;
