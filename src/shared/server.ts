import app from './app';
import 'dotenv/config';
import typeorm_connection from './typeorm/connection/index';

try {
  typeorm_connection();
  app.listen(process.env.APP_PORT || 3000);
  console.log(`Server is running on port ${process.env.APP_PORT}`);
} catch (err) {
  console.log(err);
}
