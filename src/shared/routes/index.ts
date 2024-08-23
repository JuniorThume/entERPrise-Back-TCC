import { Router } from 'express';

const router = Router();

const route1 = router.get('/route1', (req, res) => {
  res.status(200).send('Router 1');
});

const route2 = router.get('/route2', (req, res) => {
  res.status(200).send('Router 2');
});

router.use('/api/v1', [route1, route2]);

router.use((req, res) => {
  res.status(404).send('Not Found');
});

export default router;
