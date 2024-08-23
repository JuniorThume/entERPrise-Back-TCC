import express from 'express';
import cors from 'cors';
import routes from './routes/index';
const app = express();

// app.use(express.json());
app.use(cors());
app.get('/', (req, res) => {
  return res.status(200).json({
    message: 'Start Route with TS-NODE-DEV'
  });
});
app.use(routes);

export default app;
